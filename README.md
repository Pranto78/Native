# 🍪 Oreo — Subscription Manager

> **Take control of every subscription. All in one place.**

Oreo is a sleek, mobile-first subscription management app built with React Native and Expo. Track recurring expenses, manage plans, and get insights into your spending — all wrapped in a clean, fast UI.

---




## ✨ Features

- 🔐 **Secure Authentication** — Powered by [Clerk](https://clerk.com) with social login, email/password, and MFA support
- 📊 **Spending Insights** — Visual breakdowns via bar and pie charts to understand where your money goes
- 🔔 **Renewal Reminders** — Never miss a billing cycle again
- 💳 **Subscription Cards** — Add, edit, and cancel subscriptions with a single tap
- 🚀 **Onboarding Flow** — Smooth guided setup for new users
- 📈 **PostHog Analytics** — Product analytics and event tracking built in
- 🌙 **Dark Mode Ready** — Styled with NativeWind v5 for effortless theming

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) |
| Runtime | [Expo SDK 54](https://expo.dev/) |
| Navigation | [Expo Router](https://expo.github.io/router/) (file-based) |
| Styling | [NativeWind v5](https://www.nativewind.dev/) (Tailwind CSS for RN) |
| Auth | [Clerk](https://clerk.com/) |
| Analytics | [PostHog](https://posthog.com/) |
| Language | TypeScript |

---

## 📁 Project Structure

```
Oreo/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx          # Auth stack layout
│   │   ├── sign_in.tsx          # Sign in screen
│   │   └── sign_up.tsx          # Sign up screen
│   ├── (home)/                  # Home tab group
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab bar layout
│   │   ├── index.tsx            # Dashboard / Home
│   │   ├── insights.tsx         # Spending insights
│   │   ├── settings.tsx         # User settings
│   │   └── subscriptions.tsx    # All subscriptions
│   └── subscription/
│       ├── _layout.tsx
│       ├── index.tsx
│       └── onboarding.tsx
├── components/
│   ├── BarChart.tsx
│   ├── CreateSubscriptionModal.tsx
│   ├── ListHeading.tsx
│   ├── PieChart.tsx
│   ├── SubscriptionCard.tsx
│   ├── Toast.tsx
│   └── UpcomingSubscriptionCard.tsx
├── constants/                   # App-wide constants & theme tokens
├── assets/                      # Images, fonts, icons
├── app-example/                 # Example screens for reference
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- iOS Simulator / Android Emulator **or** the [Expo Go](https://expo.dev/go) app

### 1. Clone the repository

```bash
git clone https://github.com/your-username/oreo.git
cd oreo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# PostHog
EXPO_PUBLIC_POSTHOG_API_KEY=your_posthog_api_key
EXPO_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

> ⚠️ Never commit your `.env.local` file. It's listed in `.gitignore` by default.

### 4. Start the development server

```bash
npx expo start --clear
```

Then press:
- `a` — open on Android emulator
- `i` — open on iOS simulator
- `w` — open in browser (limited support)
- Scan the QR code with Expo Go on your device

---

## 🔑 Service Setup

### Clerk (Authentication)

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your **Publishable Key** into `.env.local`
4. Enable the sign-in methods you want (Email, Google, Apple, etc.)

### PostHog (Analytics)

1. Create an account at [posthog.com](https://posthog.com)
2. Create a new project
3. Copy your **API Key** and **Host** into `.env.local`
4. Events will begin flowing automatically on first app launch

---

## 🎨 Styling with NativeWind v5

This project uses **NativeWind v5** which brings the full Tailwind CSS v4 experience to React Native.

```tsx
// Example component using NativeWind
<View className="flex-1 items-center justify-center bg-background">
  <Text className="text-2xl font-bold text-foreground">Hello Oreo!</Text>
</View>
```

Custom theme tokens are configured in `tailwind.config.js` and `global.css`.

---

## 📦 Building for Production

### EAS Build (recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Local Build

```bash
# Android
npx expo run:android --variant release

# iOS
npx expo run:ios --configuration Release
```

---



## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ☕ and 🍪 by the Oreo team
</p>
