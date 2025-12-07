# 🎯 Twilio Number - Quick Reference

## TL;DR (30 Seconds)

1. Go to: **https://www.twilio.com/console/phone-numbers/incoming**
2. Copy your number (format: `+12065550199`)
3. Edit `server/.env`:
   ```env
   TWILIO_FROM_NUMBER=+12065550199
   ```
4. Restart server: `npm start`
5. Done! ✅

---

## Where to Find It

### Direct Link
```
https://www.twilio.com/console/phone-numbers/incoming
```

### Step-by-Step in Console
1. Login to https://www.twilio.com/console
2. Left menu → **Phone Numbers**
3. Click **Active Numbers** or **Incoming Phone Numbers**
4. See your number(s) in the list
5. Click to view details

---

## What It Looks Like

**In Twilio Console:**
```
+1 (206) 555-0199
United States
SMS, Voice, MMS
```

**In Your .env File:**
```env
TWILIO_FROM_NUMBER=+12065550199
```

---

## Format Conversion

| Display | E.164 Format |
|---------|--------------|
| +1 (206) 555-0199 | +12065550199 |
| +44 20 7183 8750 | +442071838750 |
| +91 98765 43210 | +919876543210 |

**Rule:** Remove all spaces and dashes, keep the +

---

## Update Steps

### 1. Open File
```
a:\EmpowerHer-App\server\.env
```

### 2. Find Line
```env
TWILIO_FROM_NUMBER=+1234567890
```

### 3. Replace
```env
TWILIO_FROM_NUMBER=+12065550199
```

### 4. Save
- Ctrl+S or File → Save

### 5. Restart Server
```powershell
cd a:\EmpowerHer-App\server
npm start
```

---

## Verify

After restart, you should see:
```
✅ 🚀 EmpowerHer SOS Server running on port 5000
✅ Twilio configured: true
✅ Twilio Account: Configured
```

---

## Test It

1. Open: http://localhost:8081
2. Add contact with your phone number
3. Click SOS button
4. Your phone receives call ✅

---

## Help Links

- **Get Number:** https://www.twilio.com/console/phone-numbers/incoming
- **Twilio Console:** https://www.twilio.com/console
- **Support:** https://support.twilio.com
- **Docs:** https://www.twilio.com/docs

---

**Time:** 2 minutes
**Difficulty:** Easy ⭐
**Status:** Ready!
