require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Twilio credentials from environment
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER;

// Initialize Twilio client
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

console.log('Twilio configured:', !!TWILIO_ACCOUNT_SID && !!TWILIO_AUTH_TOKEN);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'EmpowerHer SOS Server running' });
});

// Call endpoint - initiates calls to emergency contacts
app.post('/call', async (req, res) => {
  try {
    const { phoneNumbers, message, userName } = req.body;
    
    console.log('📥 Received call request:', {
      phoneNumbers,
      message,
      userName,
    });

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

        const twimlMessage = `Hello ${userName || 'there'}, this is an automated emergency call from EmpowerHer. ${message || 'Someone has triggered an SOS alert and needs immediate assistance.'}`;

        const call = await twilioClient.calls.create({
          from: TWILIO_FROM_NUMBER,
          to: formattedPhone,
          twiml: `<Response><Say voice="alice">${escapeXml(twimlMessage)}</Say></Response>`,
        });

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
        callResults.push({
          phone: phoneNumber,
          status: 'failed',
          error: e.message,
          code: e.code,
        });
      }
    }

    res.json({
      success: true,
      message: 'Call requests processed',
      results: callResults,
    });
  } catch (e) {
    console.error('Call endpoint error:', e);
    res.status(500).json({ error: e.message });
  }
});

// Helper function to escape XML special characters
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 EmpowerHer SOS Server running on port ${PORT}`);
  console.log(`Twilio Account: ${TWILIO_ACCOUNT_SID ? 'Configured' : 'Not configured'}`);
});
