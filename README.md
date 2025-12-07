# 🚀 EmpowerHer - Women Safety App

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: Web](https://img.shields.io/badge/Platform-Web-blue.svg)](https://github.com/samarth-07z/EmpowerHer-App)
[![Build: Passing](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/samarth-07z/EmpowerHer-App)
[![Node: 18+](https://img.shields.io/badge/Node-18+-green.svg)](https://nodejs.org/)

**Your comprehensive safety toolkit with real-time location tracking, emergency SOS, and safe zone detection**

[🌐 Features](#-features) • [📋 Requirements](#-requirements) • [⚡ Quick Start](#-quick-start) • [🔧 Setup Guide](#-setup-guide) • [🚨 SOS Usage](#-sos-usage) • [🐛 Troubleshooting](#-troubleshooting)

</div>

---

## 📱 Features

### 🎯 Core Features
- **🚨 Emergency SOS Button** - One-click emergency alert with location sharing
- **📍 Live Location Map** - Real-time Leaflet map showing your current position
- **🏥 Nearby Safe Zones** - Auto-detect police stations, hospitals, cafes within 3km
- **☎️ Twilio Voice Calls** - Automated emergency calls to contacts
- **💬 WhatsApp Integration** - Send SOS messages with location link
- **🔐 Encrypted Contacts** - AES-GCM-256 encryption for phone numbers
- **🗺️ Google Maps Navigation** - Get directions to safe zones

### 🎨 Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Twilio SDK
- **Maps**: Leaflet (OpenStreetMap) + Google Maps API
- **Encryption**: Web Crypto API (AES-GCM-256)
- **Location**: Geolocation API + Overpass API (OpenStreetMap)

---

## 📋 Requirements

### Before You Start

✅ **System Requirements:**
- **OS**: Windows, macOS, or Linux
- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: v2.0 or higher ([Download](https://git-scm.com/))

✅ **Browser Requirements:**
- Chrome/Edge 90+, Firefox 88+, Safari 14+
- Geolocation enabled
- JavaScript enabled

✅ **Twilio Account** (for emergency calling):
- Free trial account: https://www.twilio.com/try-twilio
- Twilio Account SID
- Twilio Auth Token
- Twilio Phone Number (+1234567890)

### Verify Your Setup

```bash
# Check Node.js version
node --version    # Should be v18.0.0 or higher

# Check npm version
npm --version     # Should be v9.0.0 or higher

# Check Git version
git --version     # Should be v2.0 or higher
```

---

## ⚡ Quick Start (5 Minutes)

### Step 1️⃣: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/samarth-07z/EmpowerHer-App.git

# Navigate to project directory
cd EmpowerHer-App
```

### Step 2️⃣: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 3️⃣: Configure Twilio (Optional - for calling feature)

```bash
# Create .env file in server folder
cd server

# Copy the example file
cp .env.example .env

# Edit .env with your Twilio credentials
# TWILIO_ACCOUNT_SID=your_account_sid
# TWILIO_AUTH_TOKEN=your_auth_token
# TWILIO_FROM_NUMBER=your_twilio_number

cd ..
```

### Step 4️⃣: Run Both Servers

**Terminal 1 - Frontend (port 8080):**
```bash
npm run dev
```

**Terminal 2 - Backend (port 5000):**
```bash
cd server
npm start
```

### Step 5️⃣: Open in Browser

```
http://localhost:8080
```

✅ **Done!** Your EmpowerHer app is running! 🎉

---

## 🔧 Setup Guide (Detailed)

### A. Installation

#### 1. Clone the Repository

```bash
# HTTPS (recommended)
git clone https://github.com/samarth-07z/EmpowerHer-App.git

# or SSH (if you have SSH key configured)
git clone git@github.com:samarth-07z/EmpowerHer-App.git

# Navigate to the directory
cd EmpowerHer-App
```

**Directory Structure After Cloning:**
```
EmpowerHer-App/
├── src/                    # React components
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities
├── server/               # Backend Express server
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env.example     # Template for credentials
├── package.json         # Frontend dependencies
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind CSS config
└── README.md           # This file!
```

#### 2. Install Frontend Dependencies

```bash
# From project root
npm install

# What gets installed:
# ✓ react@18
# ✓ vite (build tool)
# ✓ tailwind css (styling)
# ✓ typescript (type safety)
# ✓ react-router (routing)
# ... and 40+ more packages
```

#### 3. Install Backend Dependencies

```bash
# Navigate to server directory
cd server

# Install backend packages
npm install

# What gets installed:
# ✓ express (web framework)
# ✓ twilio (voice/SMS SDK)
# ✓ cors (cross-origin requests)
# ✓ body-parser (request parsing)
# ✓ dotenv (environment variables)
# ... and 137+ more packages

# Return to root
cd ..
```

### B. Configuration

#### Frontend Configuration ✅ (No setup needed!)

The frontend works out of the box. It will:
- Auto-connect to `http://localhost:5000` (backend)
- Request geolocation permission automatically
- Use free OpenStreetMap tiles for maps

#### Backend Configuration (Optional - for calling)

Only needed if you want emergency calling to work.

**Step 1: Create Twilio Account**
1. Go to https://www.twilio.com/try-twilio
2. Sign up (free trial)
3. Verify your phone number
4. Get your credentials:
   - Account SID (starts with `AC...`)
   - Auth Token (starts with `SK...`)
   - Phone Number (e.g., `+12065550199`)

**Step 2: Create `.env` File**

```bash
cd server
cp .env.example .env
```

**Step 3: Edit `.env` with Your Credentials**

```bash
# On Windows (PowerShell)
notepad .env

# On macOS/Linux
nano .env
# or
vim .env
```

**Example `.env` Content:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM_NUMBER=+12065550199
STABILITY_API_KEY=your_stability_api_key_here
PORT=5000
```

⚠️ **IMPORTANT**: Never commit `.env` to git! It's already in `.gitignore`.

---

## 🚀 Running the Application

### Development Mode

**Terminal 1: Frontend Development Server**
```bash
# From project root
npm run dev

# Output:
# ✓ Vite v5.4.19 ready in 302 ms
# ➜  Local:   http://localhost:8080/
# ➜  Network: http://192.168.x.x:8080/
# ➜  press h + enter to show help
```

**Terminal 2: Backend Server**
```bash
# From project root
cd server
npm start

# Output:
# Twilio configured: true
# 🚀 EmpowerHer SOS Server running on port 5000
# Twilio Account: Configured
```

**Open Browser:**
```
http://localhost:8080
```

### Production Build

```bash
# Build frontend
npm run build

# Creates `dist/` folder with optimized files
# Size: ~200KB (gzipped)

# Then deploy to your server
```

---

## 🚨 SOS Usage Guide

### Adding Emergency Contacts

1. Click **"Safety Hub"** in navigation
2. Click **"Manage Contacts"** button (top right)
3. Click **"Add Nearby Police Stations"** (optional - auto-detects)
4. Or manually add contact:
   - **Name**: Contact name
   - **Phone**: Full number with country code (e.g., `+917411249290`)
   - **Relationship**: Relation to you
5. Click **"Add Contact"**

### Triggering SOS

1. Click the **large red SOS button** in the center
2. **Allow location access** when prompted
3. The app will:
   - 📍 Get your location
   - 💬 Send WhatsApp message to all contacts with location link
   - ☎️ Call all contacts with auto-generated SOS message
   - ⏱️ Show "Calling X contacts... (5s)" timer for 30 seconds

### Your Safety Options

| Feature | What Happens |
|---------|-------------|
| **Mark Safe** | Records current location as safe |
| **Report Unsafe** | Reports suspicious location to authorities |
| **Get Directions** | Opens Google Maps to that safe zone |
| **Refresh Location** | Updates your position on the map |

---

## 🗺️ Map Features

### Live Location Map

- **Blue Dot**: Your current location
- **Zoom Controls**: Scroll mouse wheel or use +/- buttons
- **Pan**: Click and drag to move around
- **Click Marker**: See exact coordinates

### Nearby Safe Zones

Auto-detected within 3km radius:
- 🚔 **Police Stations** (Blue)
- 🏥 **Hospitals** (Red)
- ☕ **Cafes** (Green - women-friendly spaces)
- 🚒 **Fire Stations** (Orange)
- 🏘️ **Community Centers** (Purple)

Click **"Get Directions"** on any zone to navigate using Google Maps.

---

## 🔒 Security Features

### Encryption

Your emergency contact phone numbers are:
- ✅ Encrypted with **AES-GCM-256** (military-grade)
- ✅ Never stored as plaintext
- ✅ Key stored in session storage (cleared when tab closes)
- ✅ Survives page refresh (session key persists)

**Example Flow:**
```
Contact Phone: +917411249290
    ↓
AES-GCM Encryption
    ↓
Ciphertext: AF3X4K92...
    ↓
Stored in localStorage
```

### Privacy

- ✅ No data sent to third-party servers (except Twilio for calls)
- ✅ Location only shared when you click SOS
- ✅ `.env` credentials never committed to git
- ✅ All maps use free, open-source data

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using port 8080
netstat -ano | findstr ":8080"  # Windows
lsof -i :8080                   # macOS/Linux

# Kill the process (Windows)
taskkill /PID <process_id> /F

# Kill the process (macOS/Linux)
kill -9 <process_id>
```

### Geolocation Not Working

```
✓ Check browser permissions
✓ Make sure HTTPS is enabled (or localhost)
✓ Clear browser cache (Ctrl+Shift+Delete)
✓ Check browser console (F12) for errors
```

### Twilio Calls Not Working

```
✓ Verify .env credentials are correct
✓ Check that phone number is verified in Twilio
✓ Ensure trial account limits not exceeded
✓ Check backend logs in terminal
```

### Dependencies Issues

```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install

# Or update npm
npm install -g npm@latest
```

### Cannot Find Module Error

```bash
# Make sure you ran npm install in both folders
npm install              # Frontend
cd server && npm install # Backend
cd ..
```

---

## 📚 API Documentation

### Frontend Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check backend health |
| `/call` | POST | Initiate emergency calls |

### GET /health

**Request:**
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "EmpowerHer SOS Server running"
}
```

### POST /call

**Request:**
```bash
curl -X POST http://localhost:5000/call \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumbers": ["+917411249290", "+919876543210"],
    "message": "Emergency SOS alert at location: ...",
    "userName": "User"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Call requests processed",
  "results": [
    {
      "phone": "+917411249290",
      "status": "initiated",
      "callSid": "CA1234567890abcdef"
    }
  ]
}
```

---

## 🤝 Contributing

Want to help make EmpowerHer better?

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Use **TypeScript** for type safety
- Follow **React Hooks** patterns
- Use **Tailwind CSS** for styling
- Keep components under 200 lines
- Add JSDoc comments for functions

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Useful Links

| Link | Purpose |
|------|---------|
| [Twilio Console](https://www.twilio.com/console) | Manage Twilio account |
| [OpenStreetMap](https://www.openstreetmap.org/) | View map data |
| [Leaflet Docs](https://leafletjs.com/) | Map library documentation |
| [React Docs](https://react.dev/) | React framework docs |
| [Vite Docs](https://vitejs.dev/) | Build tool documentation |

---

## 👥 Support

**Having Issues?**

1. **Check** the [Troubleshooting](#-troubleshooting) section above
2. **Search** existing [GitHub Issues](https://github.com/samarth-07z/EmpowerHer-App/issues)
3. **Open** a new issue with:
   - Clear description of problem
   - Steps to reproduce
   - Screenshots/error messages
   - Your OS and Node.js version

**Email Support:** support@empowerher.app

---

## 📊 Project Status

- ✅ Frontend: Production Ready
- ✅ Maps: Production Ready
- ✅ Safe Zones Detection: Production Ready
- ✅ Twilio Integration: Production Ready (requires credentials)
- ✅ Documentation: Complete

---

<div align="center">

### 🌟 Made with ❤️ for Women's Safety

**If you found this helpful, please ⭐ star the repository!**

[⬆ Back to Top](#-empowerher---women-safety-app)

</div>
