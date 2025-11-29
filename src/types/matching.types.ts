export type MatchingStatus = 'waiting' | 'matched' | 'cancelled' | 'expired'

export type TimerDuration = '10min' | '2hr' | '10hr'

export interface MatchingQueue {
  id: string
  userId: string
  role: 'speaker' | 'listener'
  status: MatchingStatus
  timerDuration?: TimerDuration
  expiresAt?: Date
  joinedAt: Date
}

export interface MatchNotification {
  id: string
  recipientId: string
  speakerId: string
  message: string
  createdAt: Date
  expiresAt: Date
  isRead: boolean
  accepted?: boolean
}

export interface Match {
  speakerId: string
  listenerId: string
  chatSessionId: string
  matchedAt: Date
}
