# HearMeOut - Backend Development Guide

## Technology Stack
- **Language**: Golang
- **Database**: PostgreSQL
- **ORM**: Prisma
- **WebSocket**: gorilla/websocket
- **Auth**: Neon Auth integration
- **Deployment**: Vercel (or any Go-compatible hosting)

## Project Structure

```
backend/
├── cmd/
│   └── server/
│       └── main.go                 # Application entry point
├── internal/
│   ├── auth/
│   │   ├── handler.go             # Auth endpoints
│   │   ├── middleware.go          # JWT verification
│   │   └── neon.go                # Neon Auth integration
│   ├── matching/
│   │   ├── handler.go             # Matching endpoints
│   │   ├── queue.go               # Queue management
│   │   └── notifier.go            # Timer-based notifications
│   ├── chat/
│   │   ├── handler.go             # Chat endpoints
│   │   ├── websocket.go           # WebSocket hub
│   │   └── message.go             # Message handling
│   ├── user/
│   │   ├── handler.go             # User management
│   │   └── service.go             # Business logic
│   └── database/
│       ├── client.go              # Prisma client
│       └── migrations/            # Database migrations
├── pkg/
│   ├── config/
│   │   └── config.go              # Configuration
│   ├── logger/
│   │   └── logger.go              # Logging
│   └── utils/
│       └── response.go            # Response helpers
├── prisma/
│   └── schema.prisma              # Database schema
├── .env.example
├── go.mod
├── go.sum
└── README.md
```

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(uuid())
  email         String?  @unique
  passwordHash  String?
  role          UserRole @default(BOTH)
  isAnonymous   Boolean  @default(false)
  status        UserStatus @default(OFFLINE)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  sentMessages     Message[]       @relation("SentMessages")
  sessions         ChatSession[]   @relation("UserSessions")
  matchingQueue    MatchingQueue[]
  preferences      UserPreferences?
  
  @@map("users")
}

enum UserRole {
  SPEAKER
  LISTENER
  BOTH
}

enum UserStatus {
  ONLINE
  OFFLINE
  BUSY
  IN_CHAT
}

model UserPreferences {
  id                    String  @id @default(uuid())
  userId                String  @unique
  user                  User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  matchNotifications    Boolean @default(true)
  messageSounds         Boolean @default(true)
  
  @@map("user_preferences")
}

model ChatSession {
  id              String          @id @default(uuid())
  speakerId       String
  listenerId      String
  deletionPolicy  DeletionPolicy  @default(DELETE_24H)
  status          SessionStatus   @default(ACTIVE)
  createdAt       DateTime        @default(now())
  closedAt        DateTime?
  expiresAt       DateTime?       // For DELETE_24H policy
  
  // Relations
  messages        Message[]
  participants    User[]          @relation("UserSessions")
  
  @@map("chat_sessions")
}

enum DeletionPolicy {
  DELETE_24H
  DELETE_ON_CLOSE
  SAVE_FOREVER
}

enum SessionStatus {
  ACTIVE
  CLOSED
  EXPIRED
}

model Message {
  id          String      @id @default(uuid())
  sessionId   String
  session     ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  senderId    String
  sender      User        @relation("SentMessages", fields: [senderId], references: [id])
  content     String
  type        MessageType @default(TEXT)
  audioUrl    String?
  createdAt   DateTime    @default(now())
  deletedAt   DateTime?
  
  // Relations
  reactions   MessageReaction[]
  
  @@index([sessionId, createdAt])
  @@map("messages")
}

enum MessageType {
  TEXT
  AUDIO
  SYSTEM
}

model MessageReaction {
  id        String   @id @default(uuid())
  messageId String
  message   Message  @relation(fields: [messageId], references: [id], onDelete: Cascade)
  userId    String
  emoji     String
  createdAt DateTime @default(now())
  
  @@unique([messageId, userId])
  @@map("message_reactions")
}

model MatchingQueue {
  id          String        @id @default(uuid())
  userId      String
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  role        UserRole
  status      QueueStatus   @default(WAITING)
  timerDuration TimerDuration?
  expiresAt   DateTime?
  createdAt   DateTime      @default(now())
  
  @@index([status, createdAt])
  @@map("matching_queue")
}

enum QueueStatus {
  WAITING
  NOTIFIED
  MATCHED
  EXPIRED
  CANCELLED
}

enum TimerDuration {
  TEN_MIN
  TWO_HR
  TEN_HR
}
```

## API Endpoints

### Authentication
```
POST   /api/auth/signup          # Register new user
POST   /api/auth/login           # Login user
POST   /api/auth/logout          # Logout user
GET    /api/auth/me              # Get current user
POST   /api/auth/guest           # Create anonymous guest session
```

### User Management
```
GET    /api/users/me             # Get current user details
PATCH  /api/users/me/role        # Update user role
PATCH  /api/users/me/preferences # Update preferences
DELETE /api/users/me             # Delete account
```

### Matching
```
POST   /api/matching/join        # Join matching queue
DELETE /api/matching/leave       # Leave matching queue
POST   /api/matching/notify      # Send listener notification with timer
GET    /api/matching/status      # Check queue status
```

### Chat
```
GET    /api/chat/sessions        # Get user's chat sessions
GET    /api/chat/sessions/:id    # Get session details
POST   /api/chat/sessions        # Create new chat session
PATCH  /api/chat/sessions/:id    # Update session (e.g., close)
DELETE /api/chat/sessions/:id    # Delete session

GET    /api/chat/sessions/:id/messages  # Get messages
POST   /api/chat/sessions/:id/messages  # Send message
POST   /api/chat/messages/:id/reactions # Add emoji reaction

POST   /api/chat/upload/audio    # Upload audio message
```

### WebSocket
```
WS     /ws                       # WebSocket connection for real-time chat
```

## WebSocket Message Protocol

### Client → Server
```json
{
  "type": "join_session",
  "data": {
    "sessionId": "uuid"
  }
}

{
  "type": "send_message",
  "data": {
    "sessionId": "uuid",
    "content": "Hello",
    "type": "text"
  }
}

{
  "type": "typing",
  "data": {
    "sessionId": "uuid",
    "isTyping": true
  }
}

{
  "type": "leave_session",
  "data": {
    "sessionId": "uuid"
  }
}
```

### Server → Client
```json
{
  "type": "message",
  "data": {
    "id": "uuid",
    "sessionId": "uuid",
    "senderId": "uuid",
    "content": "Hello",
    "type": "text",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}

{
  "type": "typing",
  "data": {
    "sessionId": "uuid",
    "userId": "uuid",
    "isTyping": true
  }
}

{
  "type": "match_found",
  "data": {
    "sessionId": "uuid",
    "matchedUserId": "uuid",
    "role": "listener"
  }
}

{
  "type": "user_joined",
  "data": {
    "sessionId": "uuid",
    "userId": "uuid"
  }
}

{
  "type": "user_left",
  "data": {
    "sessionId": "uuid",
    "userId": "uuid"
  }
}
```

## Environment Variables

```env
# .env.example

# Server
PORT=8080
ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/hearmeout

# Neon Auth
NEON_AUTH_API_KEY=your_neon_auth_api_key
NEON_AUTH_PROJECT_ID=your_project_id

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h

# WebSocket
WS_ALLOWED_ORIGINS=http://localhost:3000,https://hearmeout.vercel.app

# AWS S3 (for audio messages)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=hearmeout-audio
AWS_REGION=us-east-1

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://hearmeout.vercel.app
```

## Implementation Steps

### 1. Initialize Go Project
```bash
mkdir backend && cd backend
go mod init github.com/yourusername/hearmeout-backend
go get -u github.com/gorilla/mux
go get -u github.com/gorilla/websocket
go get -u github.com/golang-jwt/jwt/v5
go get -u github.com/joho/godotenv
```

### 2. Setup Prisma
```bash
npm install -g prisma
prisma init
# Edit prisma/schema.prisma (use schema above)
prisma generate
prisma migrate dev --name init
```

### 3. Matching Algorithm Logic
```go
// internal/matching/queue.go

type MatchingService struct {
    db *prisma.Client
}

func (s *MatchingService) FindMatch(userId string, role UserRole) (*Match, error) {
    // 1. Search for available users with opposite role
    oppositeRole := getOppositeRole(role)
    
    // 2. Find user in queue with opposite role and status WAITING
    match, err := s.db.MatchingQueue.FindFirst(
        prisma.MatchingQueue.Role.Equals(oppositeRole),
        prisma.MatchingQueue.Status.Equals(QueueStatusWAITING),
    ).OrderBy(
        prisma.MatchingQueue.CreatedAt.Order(prisma.SortOrderAsc),
    ).Exec(ctx)
    
    // 3. If match found, create chat session
    if match != nil {
        session := s.createChatSession(userId, match.UserId)
        return session, nil
    }
    
    // 4. If no match, return nil (will trigger notification flow)
    return nil, nil
}

func (s *MatchingService) SendNotification(userId string, timerDuration TimerDuration) error {
    // Calculate expiration time
    expiresAt := calculateExpiration(timerDuration)
    
    // Update queue entry
    _, err := s.db.MatchingQueue.UpdateOne(
        prisma.MatchingQueue.UserID.Equals(userId),
    ).SetData(
        prisma.MatchingQueue.Status.Set(QueueStatusNOTIFIED),
        prisma.MatchingQueue.TimerDuration.Set(timerDuration),
        prisma.MatchingQueue.ExpiresAt.Set(expiresAt),
    ).Exec(ctx)
    
    // TODO: Send push notification to listeners
    
    return err
}
```

### 4. Deletion Policy Cron Job
```go
// internal/chat/cleanup.go

func (s *ChatService) StartCleanupWorker() {
    ticker := time.NewTicker(1 * time.Hour)
    
    go func() {
        for range ticker.C {
            s.cleanupExpiredSessions()
        }
    }()
}

func (s *ChatService) cleanupExpiredSessions() {
    // Delete messages from sessions with DELETE_24H policy that have expired
    now := time.Now()
    
    sessions, _ := s.db.ChatSession.FindMany(
        prisma.ChatSession.DeletionPolicy.Equals(DeletionPolicyDELETE24H),
        prisma.ChatSession.ExpiresAt.Lte(now),
    ).Exec(ctx)
    
    for _, session := range sessions {
        s.db.Message.DeleteMany(
            prisma.Message.SessionID.Equals(session.ID),
        ).Exec(ctx)
        
        s.db.ChatSession.Delete(
            prisma.ChatSession.ID.Equals(session.ID),
        ).Exec(ctx)
    }
}
```

## Frontend Integration Points

### 1. Update `.env.local` in Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
NEXT_PUBLIC_NEON_AUTH_CLIENT_ID=your_client_id
```

### 2. Connect AuthContext to Neon Auth
Update `src/contexts/AuthContext.tsx` to call backend auth endpoints.

### 3. Connect Chat to WebSocket
Update `src/components/chat/ChatWindow.tsx` to use `useWebSocket` hook.

## Deployment

### Backend (Railway/Render/Fly.io)
```bash
# Dockerfile
FROM golang:1.21-alpine
WORKDIR /app
COPY . .
RUN go build -o server cmd/server/main.go
EXPOSE 8080
CMD ["./server"]
```

### Frontend (Vercel)
Already configured. Just push to GitHub and connect to Vercel.

## Testing Checklist

- [ ] User registration and login
- [ ] Anonymous guest access
- [ ] Role selection and switching
- [ ] Speaker joins queue → instant match with listener
- [ ] Speaker joins queue → no listener → notification sent
- [ ] Timer expiration (10min, 2hr, 10hr)
- [ ] Real-time messaging (text)
- [ ] Audio message recording and playback
- [ ] Emoji reactions
- [ ] Deletion policy: 24h auto-delete
- [ ] Deletion policy: delete on close
- [ ] Deletion policy: save forever
- [ ] WebSocket reconnection
- [ ] Theme persistence
- [ ] Mobile responsiveness

## Next Steps for Integration

1. **Set up Neon Auth**:
   - Create Neon project
   - Get API keys
   - Update frontend `.env.local`
   - Implement auth integration in `AuthContext.tsx`

2. **Deploy Backend**:
   - Set up PostgreSQL database (Neon, Supabase, or Railway)
   - Deploy Go backend (Railway, Render, or Fly.io)
   - Update frontend API URL

3. **Connect WebSocket**:
   - Test WebSocket connection
   - Implement real-time message sync
   - Add typing indicators

4. **Audio Storage**:
   - Set up AWS S3 or Cloudinary
   - Implement audio upload/download

5. **Push Notifications** (Optional):
   - Integrate Firebase Cloud Messaging
   - Send notifications when matches are found

6. **Monitoring**:
   - Add logging (Sentry, LogRocket)
   - Set up analytics (PostHog, Mixpanel)
