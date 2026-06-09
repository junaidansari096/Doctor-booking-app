# DoctorApp 🩺

A professional, feature-rich Doctor Booking Application built using **React Native (New Architecture / Fabric)**.

---

## 🚀 Key Deliverables & Direct Links
* 📂 **Standalone Offline Installer**: [Download Standalone Android APK (DoctorApp-standalone.apk)](./DoctorApp-standalone.apk)
* 📄 **Daily Status Report**: [View Day 3 Daily Report PDF (day3_daily_report.pdf)](./day3_daily_report.pdf)

---

## 📱 Features

### **Day 3: Search & Discovery Dashboard (Current)**
* **Home Dashboard (`HomeScreen.js`)**:
  * **Header Greeting & Location**: Renders greeting for patient ("Good morning, John Doe") and location row showing "Pune, India".
  * **Logout Integration**: Clean top-right logout action button that resets navigation and clears stack state.
  * **Real-time Search Bar**: Fully responsive text search that filters doctors by name or speciality in real-time.
  * **Speciality Filter Chips**: Horizontal scrollable list containing 7 specialties (General Physician, Cardiologist, Dermatologist, Neurologist, Orthopedic, Pediatrician, ENT Specialist). Tapping a chip filters the list; tapping again deselects it.
  * **Dynamic Doctor Cards List**: A FlatList displaying matching doctor entries with their rates, rating, experience, and availability.
* **Reusable Doctor Card (`DoctorCard.js`)**:
  * Visual avatar container displaying the doctor's name initials dynamically (e.g. "PS" for Priya Sharma).
  * Informational layout: Specialty, hospital name, fee rate, experience, rating (⭐), and a green "Available Today" badge indicator.
* **Doctor Profile Details (`DoctorProfileScreen.js`)**:
  * Displays details passed dynamically via routing parameters.
  * Layout includes stats metrics (Experience years, Patients treated, Rating stars), consultation rates, about description, and a full-width blue "Book Appointment" CTA button.

### **Day 2: Authentication Flow**
* **Splash Screen (`SplashScreen.js`)**: Modern greeting screen introducing branding.
* **Login & Registration Screens (`LoginScreen.js`, `RegisterScreen.js`)**: Completed forms with inline error validations, input masks, password visibility toggles, and proper hardware keyboard dismissals.

---

## 🛠️ Tech Stack & Architecture
* **Framework**: React Native 0.85.3 (New Architecture / Fabric Enabled)
* **Navigation**: `@react-navigation/native-stack` (Native performance screens stack)
* **Layout & Styling**: Vanilla React Native Stylesheets (for premium pixel-perfect designs, shadow rendering, and high-fidelity elevation metrics)

---

## 📦 How to Run and Install

### **Option A: Install the Standalone APK (Recommended)**
1. Copy [DoctorApp-standalone.apk](./DoctorApp-standalone.apk) to your Android device or drag and drop it onto an Android Emulator.
2. Install and launch the application. **No computer connection or Metro bundler is required!**

### **Option B: Run in Development Mode**
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the Metro packager server:
   ```bash
   npm start
   ```
3. Run the application on a connected device/emulator:
   ```bash
   npm run android
   ```
