# 🧪 Quick Testing Guide

## ✅ Both Servers Running

- **Backend:** http://localhost:5000 (Express.js + Twilio)
- **Frontend:** http://localhost:8081 (React + Vite)

---

## 🎯 Quick Test (2 Minutes)

### Step 1: Open in Browser
```
http://localhost:8081
```

### Step 2: Click Red SOS Button
- Location: Bottom-right corner
- Should show "Emergency SOS" tooltip on hover

### Step 3: Allow Location Access
- Browser will prompt for permission
- Click "Allow"

### Step 4: Add Emergency Contact
1. Click "Manage Contacts" button
2. Enter contact details:
   - **Name:** Test Contact
   - **Phone:** +15551234567 (or your number)
   - **Relationship:** Test
3. Click "Add Contact"
4. Contact should appear in the list

### Step 5: Trigger SOS
1. Click red SOS button again
2. **Watch for:**
   - ✅ WhatsApp link opens in new tab
   - ✅ "Calling 1 contact... (0s)" appears on screen
   - ✅ Timer counts: 1s, 2s, 3s... 30s
   - ✅ Timer disappears after 30s
   - ✅ Success alert shows

### Step 6: Check Console Logs
1. Press **F12** (DevTools)
2. Go to **Console** tab
3. Look for:
   ```
   🚨 SOS BUTTON PRESSED - DEBUGGING ACTIVATED
   Current contacts state: [...]
   Current location: {lat: X, lng: Y}
   🚀 Server call response: {...}
   ```

---

## 📝 What to Verify

### Frontend
- [x] Red SOS button visible
- [x] Button changes on click
- [x] Modal opens for contacts
- [x] Contacts can be added/deleted
- [x] Timer appears when clicking SOS
- [x] Timer counts 0-30 seconds
- [x] Location permission works
- [x] WhatsApp opens with message

### Backend
- [x] Server responds to `/health` check
- [x] Accepts POST to `/call` endpoint
- [x] Logs show processed contacts
- [x] Returns call SIDs

### Security
- [x] Contacts encrypted in localStorage
- [x] Can't see plaintext phone numbers
- [x] Timer state managed correctly
- [x] No credentials in frontend code

---

## 🐛 Debug Checklist

### If WhatsApp Doesn't Open
- ✅ Ensure WhatsApp Web or Desktop installed
- ✅ Check browser doesn't block popups
- ✅ Link should format as: `https://api.whatsapp.com/send?phone=...`

### If Timer Doesn't Appear
- ✅ Check console (F12) for errors
- ✅ Look for "SOS BUTTON PRESSED" message
- ✅ Verify contacts are added

### If Location Won't Work
- ✅ Click "Allow" on browser permission prompt
- ✅ HTTPS required for production (HTTP OK locally)
- ✅ Check browser location settings

### If Backend Not Responding
- ✅ Verify `npm start` is running in server folder
- ✅ Check port 5000 is available
- ✅ Look for "🚀 Server running on port 5000" message

---

## 📊 Expected Console Output

When you click SOS button:

```javascript
// 1. SOS Activation
🚨 SOS BUTTON PRESSED - DEBUGGING ACTIVATED
Current contacts state: Array(1)
  0: {id: "1234567890", name: "Test Contact", phone: "+15551234567", ...}
Current location: {lat: 40.7128, lng: -74.0060}
Number of contacts: 1

// 2. WhatsApp Sending
SOS ACTIVATED - Sending to 1 emergency contacts
Sending WhatsApp SOS to: Test Contact (+15551234567)

// 3. Backend Response
🚀 Server call response: {
  success: true,
  results: [
    {
      phone: "+15551234567",
      status: "initiated",
      callSid: "CA1234567890abcdef..."
    }
  ]
}
```

---

## 🎬 Test Scenarios

### Scenario A: No Contacts
1. Click SOS button
2. ✅ Should show alert: "No emergency contacts found"
3. ✅ Modal should open

### Scenario B: One Contact
1. Add one contact
2. Click SOS button
3. ✅ Timer shows "Calling 1 contact..."
4. ✅ WhatsApp opens

### Scenario C: Multiple Contacts
1. Add 3 contacts
2. Click SOS button
3. ✅ Timer shows "Calling 3 contacts..."
4. ✅ Console logs all 3

### Scenario D: Page Reload
1. Add contact
2. Refresh page (F5)
3. ✅ Contact still there (encrypted storage)
4. ✅ SOS works again

---

## 🔍 Live Monitoring

### Watch Backend Logs
```
Terminal 1: cd server && npm start
Watch for:
✅ "Twilio configured: true"
✅ "🚀 Server running on port 5000"
✅ "POST /call" requests come through
```

### Watch Frontend Logs
```
Terminal 2: npm run dev
Watch for:
✅ "VITE ready in XXX ms"
✅ "Local: http://localhost:8081"
✅ Hot reload when files change
```

### Watch Browser Console
```
DevTools (F12) → Console
Watch for:
✅ "SOS BUTTON PRESSED"
✅ "Server call response"
✅ Location coordinates
```

---

## ✨ Success Criteria

**Test Passes If:**
- [x] Both servers start without errors
- [x] Frontend loads in browser
- [x] SOS button visible and clickable
- [x] Can add emergency contact
- [x] Clicking SOS shows timer
- [x] Timer counts from 0 to 30
- [x] Console shows debug logs
- [x] WhatsApp link opens (or appears)
- [x] No JavaScript errors in console
- [x] Backend responds to health check

---

## 🎉 You're Ready!

Everything is running and ready to test. 

**Open your browser:** http://localhost:8081

Start testing the EmpowerHer SOS feature! 🚀

---

**Test Guide Created:** 2024-12-06
**Status:** ✅ READY TO TEST
