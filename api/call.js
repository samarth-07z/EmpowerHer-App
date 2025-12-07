// api/call.js - Vercel Serverless Function for Twilio Calls

const twilio = require('twilio');

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function handler(req, res) {
  // Enable CORS for all requests
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumbers, message, userName } = req.body;

    // Validate request
    if (!phoneNumbers || !Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      return res.status(400).json({ error: 'phoneNumbers array is required' });
    }

    if (!TWILIO_FROM_NUMBER) {
      return res.status(500).json({ error: 'TWILIO_FROM_NUMBER not configured' });
    }

    const callResults = [];

    // Place calls to all provided phone numbers
    for (const phoneNumber of phoneNumbers) {
      try {
        // Normalize phone number to E.164 format
        let formattedPhone = phoneNumber.trim();

        // If it already has +, keep it
        if (formattedPhone.startsWith('+')) {
          formattedPhone = formattedPhone.replace(/\D/g, '');
          formattedPhone = `+${formattedPhone}`;
        } else {
          // Remove all non-digit characters
          formattedPhone = formattedPhone.replace(/\D/g, '');

          // If it's a US number without country code (10 digits), add +1
          if (formattedPhone.length === 10) {
            formattedPhone = `+1${formattedPhone}`;
          } else if (formattedPhone.length === 12 && formattedPhone.startsWith('91')) {
            // Indian number with 91 prefix (91 + 10 digit number)
            formattedPhone = `+${formattedPhone}`;
          } else if (formattedPhone.length === 11 && !formattedPhone.startsWith('1')) {
            // Assume country code at start
            formattedPhone = `+${formattedPhone}`;
          } else if (!formattedPhone.startsWith('+')) {
            // Default: add +
            formattedPhone = `+${formattedPhone}`;
          }
        }

        console.log(`📞 Formatting phone: ${phoneNumber} → ${formattedPhone}`);

        // Generate TwiML message for voice call
        const twimlMessage = `Hello ${userName || 'there'}, this is an automated emergency call from EmpowerHer. ${message || 'Someone has triggered an SOS alert and needs immediate assistance.'}`;

        // Create call using Twilio
        const call = await twilioClient.calls.create({
          from: TWILIO_FROM_NUMBER,
          to: formattedPhone,
          twiml: `<Response><Say voice="alice">${escapeXml(twimlMessage)}</Say></Response>`,
        });

        // Store success result
        callResults.push({
          phone: phoneNumber,
          status: 'initiated',
          callSid: call.sid,
        });

        console.log(`✅ Call initiated to ${phoneNumber} (${formattedPhone}), SID: ${call.sid}`);
      } catch (e) {
        console.error(`❌ Failed to call ${phoneNumber}:`, e.message);
        console.error('Full error details:', {
          code: e.code,
          message: e.message,
          status: e.status,
          details: e.details,
        });

        // Store error result
        callResults.push({
          phone: phoneNumber,
          status: 'failed',
          error: e.message,
          code: e.code,
        });
      }
    }

    // Return results
    res.status(200).json({
      success: true,
      message: 'Call requests processed',
      results: callResults,
    });
  } catch (e) {
    console.error('Call endpoint error:', e);
    res.status(500).json({ error: e.message });
  }
}
