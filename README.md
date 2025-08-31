# 🚀 EmpowerHer - Women Safety & Empowerment Platform

<div align="center">

![EmpowerHer Logo](https://img.shields.io/badge/EmpowerHer-Women%20Safety%20%26%20Empowerment-FF69B4?style=for-the-badge&logo=heart&logoColor=white)

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge)](https://github.com/yourusername/empowerher)
[![Contributions](https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge)](https://github.com/yourusername/empowerher)

*A comprehensive platform designed to empower women through safety features, wellness tracking, STEM learning, community support, and rewards.*

</div>

---

## 🌟 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Installation](#️-installation)
- [📱 How to Use](#-how-to-use)
- [🔧 Technical Details](#-technical-details)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Features

### 🚨 **Emergency SOS System**
<div align="center">

![SOS Feature](https://img.shields.io/badge/Feature-Emergency%20SOS-red?style=for-the-badge&logo=shield-check&logoColor=white)

</div>

- **🆘 One-tap Emergency SOS** with haptic feedback
- **📱 WhatsApp Integration** for instant emergency messages
- **📍 Live Location Sharing** with Google Maps integration
- **👥 Emergency Contacts Management** (add, edit, delete)
- **📞 Automatic Emergency Services** calling on mobile devices

### 🗺️ **Safety Map & Navigation**
<div align="center">

![Safety Map](https://img.shields.io/badge/Feature-Safety%20Map-blue?style=for-the-badge&logo=map&logoColor=white)

</div>

- **🌍 Interactive Safety Map** with real-time location tracking
- **🚨 Safety Reports** (mark safe/unsafe areas)
- **🏥 Safe Zone Markers** (police stations, hospitals, cafes)
- **📍 User Location Tracking** and reporting
- **🔍 Search & Navigation** to safe locations

### 🏆 **Rewards & Leaderboard System**
<div align="center">

![Rewards](https://img.shields.io/badge/Feature-Rewards%20%26%20Leaderboard-yellow?style=for-the-badge&logo=trophy&logoColor=white)

</div>

- **🏅 Top 10 Users Leaderboard** with rankings
- **💎 Double Rewards** for top performers
- **🎖️ Visual Badges & Trophies** for achievements
- **🎁 Voucher & Reward Redemption** system
- **📊 Points Tracking** and history

### 🧠 **STEM Learning & Development**
<div align="center">

![STEM Learning](https://img.shields.io/badge/Feature-STEM%20Learning-purple?style=for-the-badge&logo=book-open&logoColor=white)

</div>

- **📚 Interactive Learning Modules** in various subjects
- **🎯 Skill Development** and certification
- **📈 Progress Tracking** and achievements
- **🏆 Learning Challenges** and competitions
- **📱 Mobile-friendly** learning experience

### 💪 **Wellness & Health Tracking**
<div align="center">

![Wellness](https://img.shields.io/badge/Feature-Wellness%20Tracking-green?style=for-the-badge&logo=heart&logoColor=white)

</div>

- **❤️ Health & Wellness Logging**
- **📊 Progress Visualization** and trends
- **🎯 Goal Setting** and achievement tracking
- **📱 Daily Reminders** and notifications
- **📈 Wellness Streaks** and statistics

### 👥 **Community & Support**
<div align="center">

![Community](https://img.shields.io/badge/Feature-Community%20Support-orange?style=for-the-badge&logo=users&logoColor=white)

</div>

- **🤝 Mentor-Mentee Connections**
- **💬 Discussion Forums** and support groups
- **📢 Community Announcements** and events
- **🌟 Success Stories** and inspiration
- **🔗 Networking Opportunities**

---

## 🚀 Quick Start

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Now-brightgreen?style=for-the-badge&logo=play-circle&logoColor=white)](https://your-demo-link.com)
[![Get Started](https://img.shields.io/badge/Get%20Started-5%20min%20setup-blue?style=for-the-badge&logo=rocket&logoColor=white)](#️-installation)

</div>

---

## 🛠️ Installation

### 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** with geolocation support

### 🚀 Setup Steps

#### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/empowerher.git
cd empowerher
```

#### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

#### 3. **Set up Google Maps API** (Optional)
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing one
- Enable **Maps JavaScript API**
- Create API credentials
- Replace `YOUR_GOOGLE_MAPS_API_KEY` in `src/pages/Safety.tsx`

#### 4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

#### 5. **Open Your Browser**
Navigate to `http://localhost:8082` (or the port shown in terminal)

---

## 📱 How to Use

### 🚨 **Emergency SOS System**

#### **Adding Emergency Contacts**
1. **Navigate to Safety page** or click the contacts button
2. **Click "Add Emergency Contact"**
3. **Fill in details**: Name, Phone, Relationship
4. **Save contact** - it's automatically stored locally

#### **Activating SOS**
1. **Press the red SOS button** (bottom-right corner)
2. **Allow location access** when prompted
3. **WhatsApp messages** are sent to all emergency contacts
4. **Emergency services** are called automatically on mobile

### 🗺️ **Safety Map Features**

#### **Viewing Safety Reports**
1. **Navigate to Safety page**
2. **Interactive map** shows safe/unsafe areas
3. **Green markers** = safe zones
4. **Red markers** = unsafe areas

#### **Reporting Safety Status**
1. **Use "Mark Safe"** or "Report Unsafe" buttons
2. **Your location** is automatically marked
3. **Reports are added** to community safety feed

### 🏆 **Rewards & Leaderboard**

#### **Viewing Leaderboard**
1. **Navigate to Rewards page**
2. **See top 10 users** with rankings
3. **Top 10 users** get double rewards

#### **Redeeming Rewards**
1. **Browse available vouchers** and rewards
2. **Use your points** to redeem items
3. **Track redemption history**

---

## 🔧 Technical Details

### 🏗️ **Tech Stack**

<div align="center">

![Tech Stack](https://img.shields.io/badge/Tech%20Stack-Modern%20Web%20Technologies-blue?style=for-the-badge)

</div>

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | Frontend framework |
| **TypeScript** | 5.8.3 | Type safety & development |
| **Vite** | 5.4.19 | Build tool & dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **React Router** | 6.30.1 | Client-side routing |
| **Lucide React** | 0.462.0 | Icon library |
| **Google Maps API** | Latest | Maps & location services |

### 🎨 **Design System**

- **Glassmorphism UI** with modern aesthetics
- **Responsive Design** for all device sizes
- **Dark Theme** with purple accent colors
- **Smooth Animations** and transitions
- **Accessibility Features** for inclusive design

### 📱 **Key Components**

- **`Navigation.tsx`** - Main navigation with centered branding
- **`SOSButton.tsx`** - Emergency SOS functionality with contacts
- **`EmergencyContacts.tsx`** - Contact management modal
- **`Safety.tsx`** - Interactive safety map and reports
- **`Index.tsx`** - Dashboard with quick actions and stats

---

## 📁 Project Structure

```
empowerher/
├── 📁 public/                 # Static assets
│   ├── 📁 icons/             # App icons and images
│   └── index.html            # Main HTML file
├── 📁 src/                   # Source code
│   ├── 📁 components/        # Reusable components
│   │   ├── SOSButton.tsx     # Emergency SOS system
│   │   ├── EmergencyContacts.tsx # Contact management
│   │   ├── Navigation.tsx    # Main navigation
│   │   └── Footer.tsx        # App footer
│   ├── 📁 pages/             # Page components
│   │   ├── Index.tsx         # Dashboard
│   │   ├── Safety.tsx        # Safety map & reports
│   │   ├── Health.tsx        # Wellness tracking
│   │   ├── STEM.tsx          # Learning modules
│   │   ├── Community.tsx     # Community features
│   │   └── Rewards.tsx       # Rewards & leaderboard
│   ├── 📁 styles/            # Global styles
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App entry point
│   └── index.css             # Global CSS
├── 📁 node_modules/          # Dependencies
├── package.json              # Project configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── README.md                 # This file
```

---

## 🤝 Contributing

<div align="center">

[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge&logo=github&logoColor=white)](CONTRIBUTING.md)

</div>

We welcome contributions from the community! Here's how you can help:

### 🚀 **Ways to Contribute**

1. **🐛 Report Bugs** - Create detailed bug reports
2. **💡 Suggest Features** - Propose new ideas
3. **📝 Improve Documentation** - Help with docs and guides
4. **🎨 Enhance UI/UX** - Improve design and user experience
5. **🔧 Fix Issues** - Submit pull requests for bug fixes
6. **🧪 Add Tests** - Improve test coverage
7. **🌍 Localization** - Add support for more languages

### 📋 **Contribution Guidelines**

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### 📝 **Code Standards**

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

---

## 📄 License

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

<div align="center">

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/yourusername/empowerher)

</div>

### 🌟 **Special Thanks To**

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Google Maps API** for location services
- **Open Source Community** for inspiration and support

### 🤝 **Community Support**

- **GitHub Issues** for bug reports and feature requests
- **Discussions** for community engagement
- **Contributors** who help improve the project
- **Users** who provide valuable feedback

---

<div align="center">

## 🌟 **Star the Repository**

If you find this project helpful, please give it a ⭐ star on GitHub!

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/empowerher?style=social)](https://github.com/yourusername/empowerher)

## 📞 **Get in Touch**

[![Email](https://img.shields.io/badge/Email-Contact%20Us-blue?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)
[![Twitter](https://img.shields.io/badge/Twitter-Follow%20Us-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect%20With%20Us-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)

---

**Built with ❤️ for women's safety and empowerment**

*EmpowerHer - Making the world safer, one woman at a time*

</div>
