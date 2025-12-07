# 📱 Twilio Phone Number Setup - Visual Guide

## 🎯 5-Minute Setup

### What You Need
- Twilio Account (free trial available)
- Your Twilio phone number
- Text editor to update `.env` file

---

## Step-by-Step Guide

### STEP 1: Open Twilio Console
```
URL: https://www.twilio.com/console/phone-numbers/incoming
```

**What you'll see:**
- List of phone numbers associated with your account
- Each number shows country, type, and capabilities

---

### STEP 2: Find Your Phone Number

**Location in Console:**
```
Left Sidebar → Phone Numbers → Active Numbers
                                ↓
              (You'll see a table with your numbers)
```

**Your Number Will Look Like:**
```
+1 (206) 555-0199     USA - SMS, Voice, MMS
+44 207 1838 750      UK - SMS, Voice, MMS
+91 98765 43210       India - SMS, Voice
```

---

### STEP 3: Copy the Number

**Two Format Options:**

Display Format (shown in console):
```
+1 (206) 555-0199
```

E.164 Format (needed for .env):
```
+12065550199
```

**Conversion Rule:**
```
+1 (206) 555-0199
├─ Remove spaces → +1206 555 0199
├─ Remove dashes → +12065550199
└─ Done! ✅
```

---

### STEP 4: Update Your .env File

**File Location:**
```
a:\EmpowerHer-App\server\.env
```

**Before:**
```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+1234567890      ← REPLACE THIS
PORT=5000
```

**After (Example):**
```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+12065550199     ← YOUR ACTUAL NUMBER
PORT=5000
```

**Steps to Update:**
1. Open file: `server/.env` in your text editor
2. Find line: `TWILIO_FROM_NUMBER=+1234567890`
3. Replace: `+1234567890` with your number (e.g., `+12065550199`)
4. Save file (Ctrl+S)

---

### STEP 5: Restart Backend Server

**Terminal:**
```powershell
cd a:\EmpowerHer-App\server
npm start
```

**Look for:**
```
🚀 EmpowerHer SOS Server running on port 5000
Twilio configured: true
Twilio Account: Configured
```

✅ If you see this, you're ready!

---

## 🔍 Verify Your Number

### In Twilio Console

**Check These Details:**
- ✅ Number Status: "Active"
- ✅ Capabilities: SMS, Voice (MMS optional)
- ✅ Account: Your account name
- ✅ Format: E.164 with + sign

### In Your .env File

**Verify:**
```bash
# Open terminal in server folder
type .env

# You should see:
TWILIO_FROM_NUMBER=+12065550199
```

### Test the Connection

**Method 1: Health Check**
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing
Write-Host $response.Content
```

**Expected Response:**
```json
{"status":"ok","message":"EmpowerHer SOS Server running"}
```

---

## 📋 Common Phone Formats by Country

| Country | Example Display | E.164 Format | Country Code |
|---------|-----------------|--------------|--------------|
| USA | (206) 555-0199 | +12065550199 | +1 |
| UK | 020 7183 8750 | +442071838750 | +44 |
| India | 98765 43210 | +919876543210 | +91 |
| Canada | (416) 555-0199 | +14165550199 | +1 |
| Australia | 02 1234 5678 | +61212345678 | +61 |
| France | 01 23 45 67 89 | +33123456789 | +33 |

---

## ❌ Common Mistakes to Avoid

### ❌ Wrong: Using Display Format
```
TWILIO_FROM_NUMBER=(206) 555-0199  ← WRONG! Has parentheses
TWILIO_FROM_NUMBER=206-555-0199    ← WRONG! Has dashes
TWILIO_FROM_NUMBER=2065550199      ← WRONG! Missing country code
```

### ✅ Correct: Using E.164 Format
```
TWILIO_FROM_NUMBER=+12065550199    ← CORRECT!
TWILIO_FROM_NUMBER=+442071838750   ← CORRECT!
TWILIO_FROM_NUMBER=+919876543210   ← CORRECT!
```

---

## 🧪 Test Your Setup

### Full Test Sequence

**1. Check Backend Running:**
```powershell
# In server terminal, you should see:
🚀 EmpowerHer SOS Server running on port 5000
Twilio configured: true
Twilio Account: Configured
```

**2. Open App in Browser:**
```
http://localhost:8081
```

**3. Add Test Contact:**
- Click SOS button
- Click "Manage Contacts"
- Add contact with **your phone number** (e.g., +12065550199)
- Click "Add"

**4. Trigger SOS:**
- Click SOS button again
- Allow location access
- Watch timer appear: "Calling 1 contact... (0s)"
- Check console (F12) for logs

**5. Verify:**
- ✅ Timer counts 1s, 2s, 3s... 30s
- ✅ Console shows "🚀 Server call response:"
- ✅ Response includes call SID (if number valid)

---

## 📊 Quick Checklist

**Before Testing:**
- [ ] Have Twilio account created
- [ ] Found your phone number in console
- [ ] Copied number in E.164 format
- [ ] Updated `.env` file
- [ ] Saved `.env` file
- [ ] Restarted backend server (`npm start`)
- [ ] Verified "Twilio configured: true" appears

**When Testing:**
- [ ] Backend running on port 5000
- [ ] Frontend running on port 8081
- [ ] App loads in browser
- [ ] Can add contact
- [ ] Can trigger SOS
- [ ] Timer appears
- [ ] Console shows logs

---

## 🆘 Troubleshooting

### Server Won't Start
```
Error: Cannot find module 'twilio'
→ Run: cd server && npm install
```

### "Twilio configured: false"
```
→ Check .env file exists
→ Verify TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are correct
→ Check TWILIO_FROM_NUMBER format (+12065550199)
```

### Calls Not Working
```
→ Verify number format: must be +[country code][number]
→ Check number is active in Twilio console
→ Restart server after changing .env
→ Try with different phone number
```

### App Won't Load
```
→ Check frontend running: http://localhost:8081
→ Check backend running: http://localhost:5000/health
→ Clear browser cache: Ctrl+Shift+Delete
→ Try different browser
```

---

## 📞 Support Links

- **Twilio Console:** https://www.twilio.com/console
- **Phone Numbers:** https://www.twilio.com/console/phone-numbers/incoming
- **Twilio Support:** https://support.twilio.com
- **Twilio Docs:** https://www.twilio.com/docs

---

## ✨ You're Ready!

Once you've:
1. ✅ Copied your Twilio number
2. ✅ Updated `.env` file
3. ✅ Restarted server

Your app is ready to test! Open **http://localhost:8081** and click the SOS button! 🚀

---

**Setup Time:** ~5 minutes
**Status:** Ready to Deploy
**Next:** Test the app at http://localhost:8081
