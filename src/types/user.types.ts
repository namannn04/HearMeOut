export type UserRole = 'speaker' | 'listener' | 'both'

export type UserStatus = 'online' | 'offline' | 'in_chat' | 'matching'

export interface User {
  id: string
  email?: string
  role: UserRole
  status: UserStatus
  isAnonymous: boolean
  createdAt: Date
  lastActive: Date
}

export interface UserPreferences {
  chatDeletionPolicy: 'delete_24h' | 'delete_on_close' | 'save_forever'
  enableNotifications: boolean
  enableAudio: boolean
  autoAcceptMatches: boolean
}
