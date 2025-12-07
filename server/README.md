# EmpowerHer SOS Server

A Node.js + Express + Twilio backend server for the EmpowerHer app. Handles emergency SOS calls to contacts using the Twilio API.

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Create `.env` file

Create a `.env` file in the `server/` directory with your Twilio credentials:

```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+1234567890
PORT=5000
```

### 3. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

## API Endpoints

### POST `/call`

Initiates emergency calls to one or more phone numbers using Twilio.

**Request body:**
```json
{
  "phoneNumbers": ["+15551234567", "+15559876543"],
  "message": "Optional custom message",
  "userName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Call requests processed",
  "results": [
    {
      "phone": "+15551234567",
      "status": "initiated",
      "callSid": "CA1234567890abcdef"
    }
  ]
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "EmpowerHer SOS Server running"
}
```

## Environment Variables

- `TWILIO_ACCOUNT_SID` - Your Twilio Account SID
- `TWILIO_AUTH_TOKEN` - Your Twilio Auth Token
- `TWILIO_FROM_NUMBER` - Your Twilio phone number (must be in E.164 format, e.g., +1234567890)
- `PORT` - Server port (default: 5000)

## Notes

- Phone numbers are automatically normalized to E.164 format
- The server uses TwiML to generate voice messages for calls
- All calls are logged to the console
- CORS is enabled for local development

## Testing with cURL

```bash
curl -X POST http://localhost:5000/call \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumbers": ["+15551234567"],
    "message": "This is a test SOS call",
    "userName": "Test User"
  }'
```
