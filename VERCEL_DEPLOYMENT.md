# 🚀 Deploying EmpowerHer on Vercel

<div align="center">

**Complete guide to deploy both frontend and backend on Vercel**

</div>

---

## ⚡ Quick Deployment (15 minutes)

### Option 1: Frontend Only (Recommended for Testing)

If you just want to test the live location feature without calling:

**Step 1: Push to GitHub**
```bash
cd a:\EmpowerHer-App
git add .
git commit -m "Deploy to Vercel"
git push origin feature/live-map-and-safe-zones
```

**Step 2: Deploy Frontend on Vercel**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Select your `EmpowerHer-App` repository
5. Click "Deploy"

✅ Your frontend is live at `https://your-project.vercel.app`

**Live Location will work** (no backend needed for maps)  
❌ SOS calling won't work (needs backend)

---

### Option 2: Full Stack (Frontend + Backend)

Deploy both on Vercel for complete functionality.

---

## 📋 Prerequisites

- [x] Vercel account (https://vercel.com)
- [x] GitHub account with EmpowerHer-App
- [x] Twilio credentials (optional, for calling)

---

## 🔧 Backend Deployment on Vercel

### Step 1: Create Vercel Backend Service

Vercel doesn't support long-running Node.js servers. Instead, use **Vercel Serverless Functions**.

**Create `api/call.js` file:**

```bash
# In project root, create api folder
mkdir -p api
```

**Create `api/call.js`:**

```javascript
// api/call.js
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
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumbers, message, userName } = req.body;

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
        let formattedPhone = phoneNumber.trim();

        if (formattedPhone.startsWith('+')) {
          formattedPhone = formattedPhone.replace(/\D/g, '');
          formattedPhone = `+${formattedPhone}`;
        } else {
          formattedPhone = formattedPhone.replace(/\D/g, '');

          if (formattedPhone.length === 10) {
            formattedPhone = `+1${formattedPhone}`;
          } else if (formattedPhone.length === 12 && formattedPhone.startsWith('91')) {
            formattedPhone = `+${formattedPhone}`;
          } else if (formattedPhone.length === 11 && !formattedPhone.startsWith('1')) {
            formattedPhone = `+${formattedPhone}`;
          } else if (!formattedPhone.startsWith('+')) {
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
        });
        callResults.push({
          phone: phoneNumber,
          status: 'failed',
          error: e.message,
          code: e.code,
        });
      }
    }

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
```

### Step 2: Update Frontend to Use Vercel Backend

**Create `vercel.json`:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SERVER_URL": "https://your-project.vercel.app/api"
  }
}
```

**Update `src/components/SOSButton.tsx` (line 289):**

Change from:
```tsx
const SERVER_URL = (window as any).EMPOWERHER_SERVER_URL || 'http://localhost:5000';
```

To:
```tsx
const SERVER_URL = import.meta.env.VITE_SERVER_URL || (window as any).EMPOWERHER_SERVER_URL || 'http://localhost:5000';
```

Also update in `src/pages/Safety.tsx` if using backend there.

### Step 3: Deploy to Vercel

**Deploy with Environment Variables:**

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add these variables:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_FROM_NUMBER=+1234567890
   STABILITY_API_KEY=your_stability_api_key
   VITE_SERVER_URL=https://your-project.vercel.app/api
   ```
5. Click "Deploy" (or push to main branch)

---

## 🌐 Fix Live Location on Vercel

The live location feature requires HTTPS (Vercel provides this automatically).

### Issue: Geolocation Permission on HTTPS

**Solution:** Ensure users allow location access

**In browser console, users may see:**
```
⚠️ "Geolocation request denied"
```

**To fix:**
1. Check browser location permissions
2. For Chrome: Settings → Privacy → Site settings → Location
3. Ensure EmpowerHer.vercel.app has "Allow" permission

### Issue: Map Not Loading

**Solution:** Update map tile URLs if blocked

**In `src/pages/Safety.tsx`, check the Leaflet tile layer:**

```tsx
// This should work on Vercel:
(window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19,
}).addTo(map.current);
```

---

## 🚨 Fix SOS Calling on Vercel

### Issue: Backend Endpoint Returns 404

**Verify your endpoint:**
```bash
curl https://your-project.vercel.app/api/call \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"phoneNumbers": ["+1234567890"]}'
```

### Issue: CORS Errors

The `api/call.js` already has CORS headers. If still failing:

1. Check browser DevTools Network tab
2. Look for CORS error headers
3. Verify `VITE_SERVER_URL` environment variable is set correctly

### Issue: Twilio Says "Invalid Phone Number"

The phone number must be:
- ✅ In E.164 format: `+1234567890`
- ✅ Verified in Twilio account
- ✅ Full country code included

Example formats:
```
US:     +12065550199
India:  +917411249290
UK:     +441632960000
```

---

## 📋 Deployment Checklist

### Frontend
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] VITE_SERVER_URL environment variable set
- [ ] Build successful (no errors)
- [ ] App loads at https://your-project.vercel.app

### Backend
- [ ] `api/call.js` created with Twilio SDK
- [ ] Twilio environment variables set in Vercel
- [ ] Test endpoint: `curl https://your-project.vercel.app/api/call`
- [ ] CORS headers working

### Live Location
- [ ] Map loads on Vercel URL
- [ ] Geolocation permission requested
- [ ] Blue marker shows current location
- [ ] Safe zones appear within 3km

### SOS Calling
- [ ] Phone numbers verified in Twilio
- [ ] Twilio credentials set in Vercel env vars
- [ ] SOS button triggers calls successfully
- [ ] Timer shows "Calling X contacts..."

---

## 🔗 Alternative: Deploy Backend Separately

If Vercel serverless functions don't work, use:

### Option A: Render.com (Free Tier)
1. Push `server/` folder to GitHub
2. Go to https://render.com
3. Create "New Web Service"
4. Connect GitHub repo
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables
8. Deploy

Then update `VITE_SERVER_URL` to your Render URL.

### Option B: Railway.app
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select your repo
4. Connect `server/` folder
5. Add environment variables
6. Deploy

---

## 🐛 Troubleshooting Deployment

### Build Fails: "Module not found"

```bash
# Ensure all dependencies installed
npm install
cd server && npm install && cd ..

# Rebuild and push
npm run build
git push
```

### 404 Error on /api/call

```bash
# Check Vercel file structure
# Should have: api/call.js in root directory

# Verify with:
curl https://your-project.vercel.app/api/call -v
```

### Geolocation Always Fails

```javascript
// Add this to debug in browser console
navigator.geolocation.getCurrentPosition(
  pos => console.log('✅ Location:', pos),
  err => console.error('❌ Error:', err.message)
);
```

### Twilio Calls Fail Silently

```bash
# Check Vercel function logs:
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Functions" tab
4. Click "/api/call"
5. View logs for errors
```

---

## 🎉 Your App is Live!

Once deployed:
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-project.vercel.app/api/call`
- Live Location: ✅ Working with HTTPS
- SOS Calling: ✅ Working with Twilio

**Share your live app with others!**

---

## 📚 Further Reading

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Twilio Node.js SDK](https://www.twilio.com/docs/libraries/node)
- [Leaflet on HTTPS](https://leafletjs.com/faq.html)

