# 🚨 EmpowerHer SOS - Quick Reference Card

## 🚀 QUICK START (2 Minutes)

### Terminal 1: Start Backend
```powershell
cd a:\EmpowerHer-App\server
npm start
```
Wait for: `🚀 Server running on port 5000`

### Terminal 2: Start Frontend
```powershell
cd a:\EmpowerHer-App
npm run dev
```
Wait for: `http://localhost:5173`

### Browser: Open App
```
http://localhost:5173
```

## 🎯 HOW TO USE

1. **Click Red SOS Button** (bottom right corner)
2. **Allow Location Access** (when prompted)
3. **Add Emergency Contacts** (click "Manage Contacts")
4. **Press SOS Again** → WhatsApp + Twilio calling starts
5. **Watch Timer** showing "Calling X contacts... (Ys)"

## ✅ VERIFICATION CHECKLIST

- [ ] Backend server running (`npm start` in server/)
- [ ] Frontend running (`npm run dev`)
- [ ] Browser shows app at http://localhost:5173
- [ ] Red SOS button visible bottom-right
- [ ] Can add emergency contact
- [ ] Console shows debug logs on SOS press (F12)
- [ ] Timer appears when calling

## ⚙️ BEFORE FIRST USE

**CRITICAL:** Update Twilio phone number in `server/.env`:
```env
TWILIO_FROM_NUMBER=+1234567890  ← Replace with YOUR Twilio number
```

Find your number at: https://www.twilio.com/console/phone-numbers/incoming

## 📝 KEY FILES

| File | Purpose |
|------|---------|
| `src/components/SOSButton.tsx` | Main SOS button logic + Twilio integration |
| `server/server.js` | Backend API for calling |
| `server/.env` | Twilio credentials (KEEP SECURE) |
| `src/components/EmergencyContacts.tsx` | Contact management + encryption |

## 📱 WHAT HAPPENS ON SOS CLICK

1. 📍 Gets your GPS location
2. 💬 Sends WhatsApp message to all contacts
3. 📞 Calls backend to initiate Twilio calls
4. ⏱️ Shows timer: "Calling 3 contacts... (5s)"
5. 🔊 Contacts receive voice call with location
6. ✅ Success message after 30 seconds

## 🔒 SECURITY

- Phone numbers stored encrypted (AES-GCM 256-bit)
- Encryption key cleared when you close the tab
- Twilio credentials never exposed to browser
- All communication via secure backend

## 🐛 DEBUG

Open Developer Tools: **F12**

**Look for in Console:**
```
🚨 SOS BUTTON PRESSED - DEBUGGING ACTIVATED
🚀 Server call response: {...}
🔍 Contact 1: {...}
```

**Check Network Tab** (F12 → Network)
- Look for POST request to `/call`
- Should show 200 status code
- Response contains call SIDs

## 🚨 IF CALLS NOT WORKING

1. **Check `TWILIO_FROM_NUMBER`** in `server/.env`
   - Must be your actual Twilio number
   - Format: +1234567890

2. **Verify backend running**
   ```powershell
   curl http://localhost:5000/health
   ```
   Should return: `{"status":"ok","message":"..."}`

3. **Check phone numbers in contacts**
   - Must start with country code (+1, +91, etc.)
   - Must be valid, receivable numbers

4. **Look at server console output**
   - Check for Twilio errors
   - Look for "Rate limit exceeded"

## 💾 STORAGE

- **Encrypted Contacts** - localStorage (survives page reload)
- **Encryption Key** - sessionStorage (cleared when tab closes)
- **Location Data** - RAM only (never stored)

## 📞 PHONE NUMBER FORMAT

Must use E.164 format:
- ✅ +15551234567
- ✅ +919876543210
- ✅ +442071838750
- ❌ (555) 123-4567
- ❌ 555-123-4567

## 🌍 FEATURES

✅ Emergency SOS button with vibration feedback
✅ Encrypted contact storage (AES-GCM)
✅ WhatsApp message alerts with location link
✅ Twilio voice calls to multiple contacts
✅ Calling timer display (real-time)
✅ Auto-detect nearby police stations
✅ GPS location integration
✅ Responsive mobile UI

## 📊 EXPECTED OUTPUT

### Browser Console (F12)
```
🚨 SOS BUTTON PRESSED - DEBUGGING ACTIVATED
Current contacts state: Array(3)
  0: {id: "1234567890", name: "Mom", phone: "+15551234567", ...}
  1: {id: "1234567891", name: "Dad", phone: "+15551234568", ...}
  2: {id: "1234567892", name: "Police", phone: "+15559999999", ...}
Current location: {lat: 40.7128, lng: -74.0060}
Sending WhatsApp SOS to: Mom (+15551234567)
Sending WhatsApp SOS to: Dad (+15551234568)
🚀 Server call response: {
  success: true,
  results: [
    {phone: "+15551234567", status: "initiated", callSid: "CA1234..."},
    {phone: "+15551234568", status: "initiated", callSid: "CA5678..."}
  ]
}
```

### UI Display
```
🔴 Calling 3 contacts... (8s)
```
[SOS Button showing pulse animation]

## 🎓 TROUBLESHOOTING BY SYMPTOM

| Symptom | Fix |
|---------|-----|
| "No emergency contacts found" alert | Click SOS, then add contacts in modal |
| Timer shows "Calling 0 contacts" | No contacts added yet |
| WhatsApp Web won't open | Install WhatsApp Desktop or use WhatsApp Web |
| Backend won't start | Port 5000 in use. Run: `netstat -ano \| findstr :5000` |
| Calls fail silently | Check TWILIO_FROM_NUMBER in .env |
| Geolocation timeout | Enable location in browser settings |
| Build errors | Run `npm install` to ensure all dependencies |

## 🔧 USEFUL COMMANDS

```powershell
# Start backend
cd server; npm start

# Start frontend
npm run dev

# Build frontend for production
npm run build

# Test backend health
curl http://localhost:5000/health

# Test calling endpoint
curl -X POST http://localhost:5000/call `
  -H "Content-Type: application/json" `
  -d '{"phoneNumbers":["+15551234567"],"userName":"Test"}'

# View Twilio credentials (in .env)
type server\.env
```

## 📍 IMPORTANT LINKS

- **Twilio Console:** https://www.twilio.com/console
- **Twilio Phone Numbers:** https://www.twilio.com/console/phone-numbers/incoming
- **Local App:** http://localhost:5173
- **Backend Health:** http://localhost:5000/health

---

**Status:** ✅ READY TO USE
**Last Updated:** $(date)
**Backend:** ✅ Running
**Frontend:** ✅ Running
**Twilio:** ✅ Configured
