# 🚨 EmpowerHer SOS System Architecture

## System Overview Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         EMPOWERHER APP ARCHITECTURE                       │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                      FRONTEND (React + Vite)                        │  │
│  │                   http://localhost:5173                            │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │            RED SOS BUTTON (Bottom Right)                   │ │  │
│  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │  │
│  │  │                                                          │ │  │
│  │  │   1️⃣  CLICK → Haptic feedback (vibration)             │ │  │
│  │  │   2️⃣  GET Location → GPS coordinates fetched          │ │  │
│  │  │   3️⃣  ENCRYPT Contacts → Load from localStorage       │ │  │
│  │  │   4️⃣  WHATSAPP → Send message to each contact        │ │  │
│  │  │   5️⃣  TIMER → Shows "Calling X contacts... (5s)"     │ │  │
│  │  │   6️⃣  BACKEND → POST to /call endpoint               │ │  │
│  │  │   7️⃣  TWILIO → Voice calls initiated                 │ │  │
│  │  │   8️⃣  WAIT → Timer counts for 30 seconds             │ │  │
│  │  │   9️⃣  ALERT → Success message shown                  │ │  │
│  │  │                                                          │ │  │
│  │  └──────────────────────────────────────────────────────────┘ │  │
│  │                                                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │         EMERGENCY CONTACTS MODAL                           │ │  │
│  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │  │
│  │  │                                                          │ │  │
│  │  │  📱 Add/Edit/Delete Emergency Contacts                 │ │  │
│  │  │  🔐 AES-GCM 256-bit Encryption                         │ │  │
│  │  │  📍 Auto-detect Police Stations (3km radius)           │ │  │
│  │  │  💾 Encrypted Storage in localStorage                  │ │  │
│  │  │                                                          │ │  │
│  │  │  Contact Format:                                        │ │  │
│  │  │  ┌────────────────────────────────────────────────┐    │ │  │
│  │  │  │ Name:         Mom                              │    │ │  │
│  │  │  │ Phone:        +15551234567  [ENCRYPTED]        │    │ │  │
│  │  │  │ Relationship: Parent                           │    │ │  │
│  │  │  └────────────────────────────────────────────────┘    │ │  │
│  │  │                                                          │ │  │
│  │  └──────────────────────────────────────────────────────────┘ │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                 ⬇️                                        │
│                         INTERNET / NETWORK                                │
│                                 ⬇️                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                  BACKEND SERVER (Express.js)                       │  │
│  │                 http://localhost:5000                             │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │  GET /health  (Server Status Check)                        │ │  │
│  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │  │
│  │  │  Returns: { "status": "ok" }                           │ │  │
│  │  └──────────────────────────────────────────────────────────┘ │  │
│  │                                                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │  POST /call  (Emergency Calling Endpoint)                  │ │  │
│  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │  │
│  │  │                                                          │ │  │
│  │  │  INPUT:                                                │ │  │
│  │  │  {                                                      │ │  │
│  │  │    "phoneNumbers": ["+15551234567", "+919876543210"],│ │  │
│  │  │    "message": "Emergency SOS alert at location...",  │ │  │
│  │  │    "userName": "User"                                │ │  │
│  │  │  }                                                      │ │  │
│  │  │                                                          │ │  │
│  │  │  PROCESSING:                                           │ │  │
│  │  │  1. Load Twilio Client (Init with Account SID/Token) │ │  │
│  │  │  2. Normalize phone to E.164 (+country + digits)    │ │  │
│  │  │  3. Generate TwiML (Voice prompt XML)               │ │  │
│  │  │  4. Call twilio.calls.create()                      │ │  │
│  │  │  5. Return callSid (tracking ID)                    │ │  │
│  │  │                                                          │ │  │
│  │  │  OUTPUT:                                               │ │  │
│  │  │  {                                                      │ │  │
│  │  │    "success": true,                                   │ │  │
│  │  │    "results": [                                       │ │  │
│  │  │      {                                                │ │  │
│  │  │        "phone": "+15551234567",                      │ │  │
│  │  │        "status": "initiated",                        │ │  │
│  │  │        "callSid": "CA1234567890abcdef..."           │ │  │
│  │  │      }                                                │ │  │
│  │  │    ]                                                  │ │  │
│  │  │  }                                                      │ │  │
│  │  │                                                          │ │  │
│  │  └──────────────────────────────────────────────────────────┘ │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                 ⬇️                                        │
│                    TWILIO VOICE INFRASTRUCTURE                           │
│                                 ⬇️                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                        PHONE NETWORK                              │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │                                                                     │  │
│  │  📱 Mom's Phone               📱 Dad's Phone       📱 Police      │  │
│  │  ┌──────────────────┐        ┌──────────────────┐  ┌────────────┐ │  │
│  │  │ RING RING!       │        │ RING RING!       │  │ RING RING! │ │  │
│  │  │ Emergency SOS    │        │ Emergency SOS    │  │ Emergency  │ │  │
│  │  │ "Emergency alert"│        │ "Emergency alert"│  │ "Alert"    │ │  │
│  │  │ Location: ...    │        │ Location: ...    │  │ Location.. │ │  │
│  │  └──────────────────┘        └──────────────────┘  └────────────┘ │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
                        USER CLICKS SOS BUTTON
                               |
                               v
                    ┌──────────────────────┐
                    │ Request Geolocation  │
                    │ (Browser Permission) │
                    └──────────────────────┘
                               |
                               v
                    ┌──────────────────────┐
                    │ Load Encrypted       │
                    │ Contacts from        │
                    │ localStorage         │
                    └──────────────────────┘
                               |
                               v
                    ┌──────────────────────┐
                    │ Decrypt Contacts     │
                    │ (AES-GCM with        │
                    │  Session Key)        │
                    └──────────────────────┘
                               |
                    ┌──────────┴───────────┐
                    |                      |
                    v                      v
        ┌─────────────────────┐  ┌──────────────────┐
        │ Send WhatsApp SOS   │  │ Start Calling    │
        │ to Each Contact     │  │ Timer Display    │
        │ (Manual Link)       │  │ "Calling X... 0s"│
        └─────────────────────┘  └──────────────────┘
                    |                      |
                    |                      v
                    |         ┌──────────────────────────┐
                    |         │ POST to /call Endpoint   │
                    |         │ with phoneNumbers array  │
                    |         └──────────────────────────┘
                    |                      |
                    |                      v
                    |         ┌──────────────────────────┐
                    |         │ Backend Normalizes Phone │
                    |         │ Numbers to E.164 Format  │
                    |         └──────────────────────────┘
                    |                      |
                    |                      v
                    |         ┌──────────────────────────┐
                    |         │ For Each Phone Number:   │
                    |         │ 1. Generate TwiML        │
                    |         │ 2. Create Twilio Call    │
                    |         │ 3. Get callSid           │
                    |         └──────────────────────────┘
                    |                      |
                    |                      v
                    |         ┌──────────────────────────┐
                    |         │ Return Results with      │
                    |         │ Call SIDs & Status       │
                    |         └──────────────────────────┘
                    |                      |
                    |                      v
                    |         ┌──────────────────────────┐
                    |         │ Timer Continues Counting │
                    |         │ "Calling 3... (1s)"      │
                    |         │ "Calling 3... (2s)"      │
                    |         │ ... (30s total)          │
                    |         └──────────────────────────┘
                    |                      |
                    |                      v
                    |         ┌──────────────────────────┐
                    |         │ Contacts Receive Calls   │
                    |         │ Voice: "Emergency alert" │
                    |         │ Location info played     │
                    |         └──────────────────────────┘
                    |                      |
                    └──────────┬───────────┘
                               v
                    ┌──────────────────────┐
                    │ Timer Completes      │
                    │ (After 30 seconds)   │
                    │ Show Success Alert   │
                    │ Re-enable SOS Button │
                    └──────────────────────┘
```

---

## Storage Architecture

```
┌─────────────────────────────────────────────────────────┐
│              CLIENT-SIDE DATA STORAGE                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  localStorage (Persistent - Survives Reload)   │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                                                 │   │
│  │  Key: "emergencyContacts_encrypted"            │   │
│  │  Value: Base64-encoded AES-GCM ciphertext      │   │
│  │  ┌─────────────────────────────────────────┐  │   │
│  │  │ U2FsdGVkX1+7v...base64...encrypted... │  │   │
│  │  │ This is NOT readable as plaintext      │  │   │
│  │  └─────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │  When Accessed:                                │   │
│  │  1. Retrieve ciphertext from localStorage     │   │
│  │  2. Decode Base64                             │   │
│  │  3. Extract IV (first 12 bytes)               │   │
│  │  4. Extract Auth Tag (last 16 bytes)          │   │
│  │  5. Decrypt remaining bytes with Key + IV     │   │
│  │  6. Load contacts into memory (RAM)           │   │
│  │  7. Display in UI                             │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  sessionStorage (Tab-Scoped - Cleared on Close)│   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                                                 │   │
│  │  Key: "emergencyContacts_key_b64"              │   │
│  │  Value: Base64-encoded 256-bit encryption key │   │
│  │  ┌─────────────────────────────────────────┐  │   │
│  │  │ y3nK7pQ2m8vL9zX4wJ5kL6qM7rN8sO... │  │   │
│  │  │ (Random 256-bit key as Base64)       │  │   │
│  │  └─────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │  Lifecycle:                                    │   │
│  │  ✅ Created on first app load                 │   │
│  │  ✅ Survives page reload (in same tab)        │   │
│  │  ✅ Cleared when tab is closed                │   │
│  │  ✅ NOT accessible from other tabs            │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  RAM (Volatile - Lost on Page Refresh)         │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                                                 │   │
│  │  State Variables (React):                      │   │
│  │  • contacts[] (decrypted contact objects)      │   │
│  │  • location (GPS coordinates)                  │   │
│  │  • callingTimer (integer: 0-30)                │   │
│  │  • isCallingContacts (boolean)                 │   │
│  │                                                 │   │
│  │  Note: Plaintext data never persisted          │   │
│  │        Cleared on page refresh                 │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Encryption Process

```
┌─────────────────────────────────────────────────────────┐
│            AES-GCM 256-BIT ENCRYPTION                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ENCRYPTION PROCESS:                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│  Input: Contact Object                                 │
│  ┌───────────────────────────────┐                     │
│  │ {                              │                     │
│  │   id: "123456",                │ PLAINTEXT           │
│  │   name: "Mom",                 │                     │
│  │   phone: "+15551234567",       │ (Never stored)      │
│  │   relationship: "Parent"       │                     │
│  │ }                              │                     │
│  └───────────────────────────────┘                     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 1. Generate Random 12-byte IV               │     │
│  │    IV = crypto.getRandomValues(12 bytes)   │     │
│  │    Example: [0x45, 0x23, 0x18, ...]        │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 2. Import Encryption Key                    │     │
│  │    From sessionStorage as Base64            │     │
│  │    Decode to 256-bit (32 bytes)             │     │
│  │    Create WebCrypto Key Object              │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 3. Encrypt Contact Data                     │     │
│  │    crypto.subtle.encrypt(                   │     │
│  │      algorithm: "AES-GCM",                  │     │
│  │      key: encryptionKey,                    │     │
│  │      iv: IV,                                │     │
│  │      data: contactJSON                      │     │
│  │    )                                         │     │
│  │    Output: Encrypted data + Auth Tag        │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 4. Combine IV + Encrypted Data + Auth Tag   │     │
│  │    Combined = IV (12) + Data (X) + Tag (16) │     │
│  │    Total size = 12 + X + 16 bytes           │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 5. Encode to Base64                         │     │
│  │    base64(IV + Data + Tag)                  │     │
│  │    Result: Readable ASCII string            │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 6. Store in localStorage                    │     │
│  │    localStorage[                            │     │
│  │      "emergencyContacts_encrypted"          │     │
│  │    ] = base64CiphertextString               │     │
│  │                                             │     │
│  │    Example:                                 │     │
│  │    "RTU2MNhaMzE4LTEySFEyNHhDcC..." │     │
│  │    (Much longer, no plaintext visible)      │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  ─────────────────────────────────────────────────   │
│                                                         │
│  DECRYPTION PROCESS:                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│  Input: Ciphertext String from localStorage           │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 1. Retrieve Ciphertext from localStorage     │     │
│  │    ciphertext = localStorage[...]           │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 2. Decode from Base64                       │     │
│  │    bytes = base64Decode(ciphertext)         │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 3. Extract Components                       │     │
│  │    IV = bytes[0:12]     (first 12 bytes)    │     │
│  │    Data = bytes[12:-16] (middle bytes)      │     │
│  │    Tag = bytes[-16:]    (last 16 bytes)     │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 4. Decrypt with Key + IV                    │     │
│  │    crypto.subtle.decrypt(                   │     │
│  │      algorithm: "AES-GCM",                  │     │
│  │      key: encryptionKey,                    │     │
│  │      iv: IV,                                │     │
│  │      data: Data + Tag                       │     │
│  │    )                                         │     │
│  │    Output: Plaintext JSON                   │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │ 5. Parse JSON                               │     │
│  │    contacts = JSON.parse(plaintext)         │     │
│  │    Load into React State                    │     │
│  └──────────────────────────────────────────────┘     │
│           |                                             │
│           v                                             │
│  Output: Contact Objects (In Memory/UI)               │
│  ┌───────────────────────────────┐                     │
│  │ [{                              │                     │
│  │   id: "123456",                │ ACCESSIBLE          │
│  │   name: "Mom",                 │ (Only in RAM)       │
│  │   phone: "+15551234567",       │                     │
│  │   relationship: "Parent"       │ (Never persisted)   │
│  │ }, ...]                        │                     │
│  └───────────────────────────────┘                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Twilio Calling Flow

```
┌──────────────────────────────────────────────────────────┐
│         TWILIO VOICE CALL PROCESS                        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  STEP 1: Backend Receives POST /call             │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                   │   │
│  │  Frontend sends:                                 │   │
│  │  {                                               │   │
│  │    phoneNumbers: ["+15551234567", "+919..."],│   │
│  │    message: "Emergency SOS alert...",        │   │
│  │    userName: "User"                          │   │
│  │  }                                               │   │
│  └──────────────────────────────────────────────────┘   │
│           |                                              │
│           v                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  STEP 2: Initialize Twilio Client               │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                   │   │
│  │  const twilio = require('twilio')(             │   │
│  │    process.env.TWILIO_ACCOUNT_SID,            │   │
│  │    process.env.TWILIO_AUTH_TOKEN              │   │
│  │  );                                             │   │
│  │                                                   │   │
│  │  Client authenticated with Twilio               │   │
│  │  Ready to make calls                            │   │
│  └──────────────────────────────────────────────────┘   │
│           |                                              │
│           v                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  STEP 3: For Each Phone Number                  │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                   │   │
│  │  a) Normalize to E.164                          │   │
│  │     "+1 555-123-4567" → "+15551234567"         │   │
│  │     "9876543210" → "+919876543210"             │   │
│  │                                                   │   │
│  │  b) Create TwiML Voice Response                 │   │
│  │     ```                                          │   │
│  │     <?xml version="1.0" encoding="UTF-8"?>    │   │
│  │     <Response>                                  │   │
│  │       <Say voice="alice">                       │   │
│  │         Emergency SOS alert from User.          │   │
│  │         Emergency at location:                  │   │
│  │         https://maps.google.com/?q=40...       │   │
│  │       </Say>                                    │   │
│  │     </Response>                                 │   │
│  │     ```                                          │   │
│  │                                                   │   │
│  │  c) Create Twilio Call                          │   │
│  │     twilio.calls.create({                       │   │
│  │       from: "+1234567890",  // Your Twilio #  │   │
│  │       to: "+15551234567",   // Recipient      │   │
│  │       twiml: xmlString      // Voice prompt   │   │
│  │     })                                          │   │
│  │                                                   │   │
│  │  d) Get Call SID                                │   │
│  │     callSid = "CA1234567890abcdef..."          │   │
│  │     (Unique ID to track this call)             │   │
│  │                                                   │   │
│  │  e) Return Result                               │   │
│  │     {                                            │   │
│  │       phone: "+15551234567",                    │   │
│  │       status: "initiated",                      │   │
│  │       callSid: "CA1234567890abcdef..."         │   │
│  │     }                                            │   │
│  │                                                   │   │
│  └──────────────────────────────────────────────────┘   │
│           |                                              │
│           v                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  STEP 4: Return Results to Frontend             │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                   │   │
│  │  {                                               │   │
│  │    success: true,                               │   │
│  │    results: [                                   │   │
│  │      {                                           │   │
│  │        phone: "+15551234567",                   │   │
│  │        status: "initiated",                     │   │
│  │        callSid: "CA1234567890abcdef..."        │   │
│  │      },                                          │   │
│  │      {                                           │   │
│  │        phone: "+919876543210",                  │   │
│  │        status: "initiated",                     │   │
│  │        callSid: "CA9876543210fedcba..."        │   │
│  │      }                                           │   │
│  │    ]                                             │   │
│  │  }                                               │   │
│  │                                                   │   │
│  │  Frontend receives response                      │   │
│  │  Logs call SIDs to console                      │   │
│  │  Timer continues counting                       │   │
│  │                                                   │   │
│  └──────────────────────────────────────────────────┘   │
│           |                                              │
│           v                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  STEP 5: Twilio Routes Calls to Recipients      │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                   │   │
│  │  Twilio Infrastructure:                          │   │
│  │  1. Looks up phone number in global network     │   │
│  │  2. Routes call through nearest carrier         │   │
│  │  3. Recipient's phone RINGS                     │   │
│  │  4. When answered, plays TwiML response         │   │
│  │  5. Caller hears: "Emergency SOS alert..."     │   │
│  │  6. Caller hears: Location details              │   │
│  │  7. Call ends                                    │   │
│  │                                                   │   │
│  │  Recipient's Experience:                         │   │
│  │  "RING RING!" (incoming call)                   │   │
│  │  "Emergency SOS alert from User..."             │   │
│  │  "Emergency at location: maps.google.com..."    │   │
│  │                                                   │   │
│  └──────────────────────────────────────────────────┘   │
│           |                                              │
│           v                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  STEP 6: Frontend Timer Completes               │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                   │   │
│  │  After 30 seconds:                               │   │
│  │  • clearInterval(timerInterval)                 │   │
│  │  • setIsCallingContacts(false)                  │   │
│  │  • alert("Emergency contacts called!")          │   │
│  │  • Button re-enabled                            │   │
│  │                                                   │   │
│  │  Timer disappears from UI                       │   │
│  │  SOS button ready for next press                │   │
│  │                                                   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│         PRODUCTION DEPLOYMENT STRUCTURE                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  CLIENT (Web Browser)                          │    │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │    │
│  │                                                 │    │
│  │  Frontend: React + Vite                        │    │
│  │  Hosting: CDN / Static Host                    │    │
│  │  URL: https://empowerher-app.com              │    │
│  │                                                 │    │
│  │  Loads:                                        │    │
│  │  • index.html                                  │    │
│  │  • app-DKiDUDp5.css (84.66 kB)                │    │
│  │  • app-DmGlOLVU.js (394.28 kB)                │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│              |              |                            │
│              | HTTPS        | HTTPS                      │
│              v              v                            │
│  ┌──────────────────┐  ┌──────────────────────────────┐ │
│  │ Browser APIs     │  │ Backend API Server           │ │
│  │ • Geolocation    │  │ Node.js + Express.js         │ │
│  │ • localStorage   │  │ Hosting: Azure / AWS / GCP   │ │
│  │ • sessionStorage │  │ URL: https://api.empower... │ │
│  │ • WebCrypto      │  │                              │ │
│  │ • Fetch API      │  │ Endpoints:                   │ │
│  │                  │  │ • GET /health                │ │
│  │                  │  │ • POST /call                 │ │
│  │                  │  │                              │ │
│  │                  │  │ Environment:                 │ │
│  │                  │  │ .env file with:              │ │
│  │                  │  │ • TWILIO_ACCOUNT_SID         │ │
│  │                  │  │ • TWILIO_AUTH_TOKEN          │ │
│  │                  │  │ • TWILIO_FROM_NUMBER         │ │
│  │                  │  │ • PORT                       │ │
│  │                  │  │ • NODE_ENV=production        │ │
│  └──────────────────┘  └──────────────────────────────┘ │
│              |                     |                     │
│              |                     | HTTPS              │
│              |                     v                     │
│              |          ┌──────────────────────────┐    │
│              |          │ Twilio API               │    │
│              |          │ https://api.twilio.com   │    │
│              |          │                          │    │
│              |          │ Authenticated with:      │    │
│              |          │ • Account SID            │    │
│              |          │ • Auth Token             │    │
│              |          │                          │    │
│              |          │ Returns:                 │    │
│              |          │ • Call SIDs              │    │
│              |          │ • Status updates         │    │
│              └─────────→└──────────────────────────┘    │
│                                  |                      │
│                                  | Phone calls         │
│                                  v                      │
│                        ┌──────────────────┐             │
│                        │ Public Phone     │             │
│                        │ Network          │             │
│                        │ (Carriers)       │             │
│                        │                  │             │
│                        │ Routes to:       │             │
│                        │ • Recipient 1    │             │
│                        │ • Recipient 2    │             │
│                        │ • Police Dept    │             │
│                        │ • etc.           │             │
│                        └──────────────────┘             │
│                                  |                      │
│                    ┌─────────────┼─────────────┐        │
│                    v             v             v        │
│              📱 Mom's Phone  📱 Dad's Phone  📱 Police  │
│              RING!           RING!            RING!     │
│                                                         │
└──────────────────────────────────────────────────────────┘
```

---

**Architecture Diagram Generated:** $(date)
**System Status:** ✅ READY FOR DEPLOYMENT
