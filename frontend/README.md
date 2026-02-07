# 🪙 CoinOracle

CoinOracle is a high-performance, real-time cryptocurrency tracking platform built with **Next.js 15**, **Tailwind CSS**, and **CoinGecko API**. It provides users with live pricing, deep market analytics, and interactive charts.

![CoinOracle Mockup](https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop)

## 🚀 Key Features

- **Real-time Price Stream**: Powered by WebSockets for instant price updates across the platform.
- **Advanced Coin Details**: Comprehensive statistics including 24h, 7d, 30d, and 1y price performance.
- **Live Analysis Charts**: Interactive candlestick charts using `lightweight-charts`.
- **Global Search**: Modal-based search system to quickly find and track any asset.
- **Dynamic Dashboard**: Responsive individual asset views with built-in BTC/USD converters and live trade feeds.
- **Modern UI/UX**: Premium aesthetic with dark-mode focus, glassmorphism, and smooth transitions.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Data Source**: CoinGecko API & WebSockets
- **Charting**: TradingView Lightweight Charts
- **Icons**: Lucide React
- **Types**: TypeScript

## 📦 Project Structure

```text
├── app/                  # Next.js App Router (Pages & Routes)
├── components/           # UI Components (Atomic Design)
│   ├── coin/             # Asset-specific components
│   ├── home/             # Landing page modules
│   ├── Header/           # Navigation & Search Modal
│   └── ui/               # Reusable primitives (Buttons, Inputs)
├── lib/                  # Utility functions & custom hooks
├── public/               # Static assets
└── types/                # Global TypeScript definitions
```

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js 18+
- CoinGecko API Key (Demo or Pro)

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=your_api_key_here
```

### 3. Installation
```bash
npm install
```

### 4. Running the App
```bash
npm run dev
```

## 📄 License
MIT License - Created for educational and demonstration purposes.
