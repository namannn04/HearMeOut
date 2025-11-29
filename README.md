# HearMeOut - Anonymous Mental Health Support Platform

A Next.js-based anonymous platform connecting Speakers (who need emotional support) with Listeners (who want to help). Features real-time chat, smart matching, and privacy-focused deletion policies.

## 🌟 Features

### Core Functionality
- **Role-Based System**: Choose to be a Speaker, Listener, or Both
- **Smart Matching**: Instant matching or timer-based notifications (10min, 2hr, 10hr)
- **Anonymous Chat**: 100% anonymous text and audio messaging
- **Flexible Privacy**: 3 deletion policies (24h auto-delete, delete on close, save forever)
- **Real-Time Communication**: WebSocket-powered live chat
- **Emoji Reactions**: Express emotions quickly with emoji reactions

### User Experience
- **Dark/Light Theme**: Professional theme system with #fdf7f1 warm background
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Custom CSS animations for polished UX
- **Toast Notifications**: Real-time feedback for user actions
- **Safety First**: Built-in safety warnings and privacy reminders

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme system
- **State Management**: React Context API
- **Real-Time**: WebSocket client with auto-reconnection
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

### Backend (Planned)
- **Language**: Golang
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: Neon Auth

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/hearmeout.git
cd hearmeout
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
NEXT_PUBLIC_NEON_AUTH_CLIENT_ID=your_neon_auth_client_id
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Theme System

- **Light Mode**: #fdf7f1 background (warm cream/beige)
- **Dark Mode**: Deep purple/black tones
- **Custom Animations**: fadeInUp, slideInLeft, pulse-soft
- **OKLCH Colors**: Modern color space for better gradients

Toggle theme using the Sun/Moon icon in the navbar.

## 📱 Key Pages

- `/` - Landing page with hero, features, how it works
- `/auth/login` - Login form
- `/auth/signup` - Registration form
- `/onboarding` - Role selection (Speaker/Listener/Both)
- `/dashboard` - Main hub with role-specific actions
- `/speaker/queue` - Matching queue with timer selection
- `/chat/[sessionId]` - Real-time chat interface
- `/settings` - User preferences and account management

## 🔐 Authentication Flow

1. User registers/logs in via Neon Auth
2. Or continues as anonymous guest
3. Selects role (Speaker/Listener/Both)
4. Access dashboard

**Note**: Auth UI is complete, but requires Neon Auth API integration in `src/contexts/AuthContext.tsx`.

## 💬 Chat Flow

### Speaker Journey
1. Click "Start Sharing" on dashboard
2. Join matching queue
3. **If listener available**: Instant match → Chat starts
4. **If no listener**: Select timer (10min/2hr/10hr) → Notification sent
5. Select deletion policy (24h/on-close/save forever)
6. Read safety warning → Start chatting

### Listener Journey
1. Click "Start Listening" on dashboard
2. Join listener queue
3. Receive match notification
4. Accept match → Chat starts
5. Select deletion policy
6. Start chatting

## 🧩 UI Components

All components in `src/components/ui/`:

- **Button**: 5 variants, 3 sizes, loading state
- **Input**: Label, error, helper text support
- **Modal**: Backdrop, close button, multiple sizes
- **Card**: With header, title, description
- **Badge**: 4 variants (success, warning, danger, info)
- **Avatar**: Status indicators
- **Toast**: Notification system

Import via:
```tsx
import { Button, Card, Modal } from '@/components/ui'
```

## 🔌 WebSocket Integration

Frontend WebSocket client is complete (`src/lib/websocket.ts` and `src/hooks/useWebSocket.ts`).

Backend required - See `BACKEND_GUIDE.md` for Golang WebSocket server implementation.

## 🗄️ Backend Integration

Complete backend guide available in `BACKEND_GUIDE.md`:
- Golang project structure
- PostgreSQL + Prisma schema
- API endpoints
- WebSocket protocol
- Matching algorithm
- Deletion policies
- Deployment

## 🚢 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Backend
See `BACKEND_GUIDE.md` for deployment steps.

## 📋 Status

- [x] Complete frontend UI
- [x] Authentication pages (needs API integration)
- [x] Role selection & onboarding
- [x] Dashboard
- [x] Matching queue
- [x] Chat interface
- [x] Settings page
- [x] WebSocket client
- [ ] Integrate Neon Auth API
- [ ] Build Golang backend
- [ ] Connect WebSocket
- [ ] Audio message storage

## 🆘 Crisis Support

If you're experiencing a mental health crisis:
- **US**: 988
- **UK**: 116 123
- **India**: 1860 2662 345

---

**Made with ❤️ for mental health awareness**
