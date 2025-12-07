# 📞 How to Get Your Twilio Phone Number

## Quick Steps (2 minutes)

### Step 1: Go to Twilio Console
Open: **https://www.twilio.com/console/phone-numbers/incoming**

### Step 2: Sign In
- Use your Twilio account credentials
- If you don't have an account, create one at https://www.twilio.com/try-twilio

### Step 3: Find Your Phone Number
You should see a list of your phone numbers. Look for:
- A number in format like: **+1 (XXX) XXX-XXXX**
- Example: **+1 (206) 555-0199**

### Step 4: Copy the Number
Click on the phone number to view details. Copy it in **E.164 format** (with plus sign):
- ✅ Correct: `+12065550199`
- ❌ Wrong: `206-555-0199` or `(206) 555-0199`

### Step 5: Update Your .env File
Open: `a:\EmpowerHer-App\server\.env`

Find this line:
```env
TWILIO_FROM_NUMBER=+1234567890
```

Replace `+1234567890` with your actual number:
```env
TWILIO_FROM_NUMBER=+12065550199
```

### Step 6: Restart Backend Server
```bash
# Stop the server (Ctrl+C in terminal)
# Then restart it
npm start
```

---

## Detailed Instructions

### If You Don't Have a Twilio Account

1. Go to: https://www.twilio.com/try-twilio
2. Sign up with email
3. Verify email address
4. Add payment method (optional for testing)
5. You'll get a trial phone number automatically

### If You Have Multiple Phone Numbers

In Twilio Console (https://www.twilio.com/console/phone-numbers/incoming):
- See list of all your numbers
- Choose the one you want to use for this app
- Click on it to see details

### Finding Your Number in Console

1. Login at: https://www.twilio.com/console
2. Click **"Phone Numbers"** in left menu
3. Click **"Active Numbers"** or **"Incoming Phone Numbers"**
4. You'll see your number(s) listed
5. Format it as: `+1 (206) 555-0199` → `+12065550199`

---

## Phone Number Format (E.164)

Your Twilio number must be in **E.164 format**:

**Format:** `+[Country Code][Phone Number]`

**Examples:**
- USA: `+12065550199` (country code: 1)
- UK: `+442071838750` (country code: 44)
- India: `+919876543210` (country code: 91)
- Canada: `+14165550199` (country code: 1)

**How to Convert:**
- Take: `(206) 555-0199`
- Remove spaces: `2065550199`
- Remove dashes: `2065550199`
- Add +1: `+12065550199`

---

## Update .env File

### Current Content:
```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+1234567890
PORT=5000
```

### Updated (Example):
```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+12065550199
PORT=5000
```

### After Updating:
1. Save the file
2. Restart backend server: `npm start`
3. Server will reinitialize with new number
4. Ready to test calls!

---

## Verify It's Correct

After updating `.env`, restart server and look for:

```
🚀 EmpowerHer SOS Server running on port 5000
Twilio configured: true
Twilio Account: Configured
```

If you see this, your number is correctly configured! ✅

---

## Test Your Number

Once configured, you can test by:

1. Opening app at http://localhost:8081
2. Adding a contact with YOUR phone number (e.g., +12125551234)
3. Clicking SOS button
4. Your phone should receive a call from your Twilio number!

---

## Common Issues

### "Number Not Found"
- Make sure you're logged into correct Twilio account
- Check you have an active number (not just trial)
- Number should show in "Active Numbers" list

### "Invalid Format"
- Remove all special characters
- Must start with +
- Must include country code
- Example: `+12065550199` (good) vs `206-555-0199` (bad)

### "Calls Not Working"
- Verify `TWILIO_FROM_NUMBER` matches exactly
- Restart backend server after updating
- Check backend is running on port 5000
- Try calling from different browser tab to test

---

## Get Help

- Twilio Console: https://www.twilio.com/console
- Twilio Numbers Page: https://www.twilio.com/console/phone-numbers/incoming
- Twilio Support: https://support.twilio.com

---

## Summary

1. **Get Number:** https://www.twilio.com/console/phone-numbers/incoming
2. **Copy Format:** `+12065550199` (E.164)
3. **Update .env:** Replace `TWILIO_FROM_NUMBER` value
4. **Restart Server:** `npm start`
5. **Test:** Click SOS button in app
6. **Success:** Phone receives call! 📞

---

**Need Help?** Check the detailed instructions above or visit Twilio support at https://support.twilio.com
