export type MessageType = 'text' | 'audio' | 'system'

export type ChatStatus = 'active' | 'ended' | 'waiting' | 'expired'

export type DeletionPolicy = 'delete_24h' | 'delete_on_close' | 'save_forever'

export interface Message {
  id: string
  chatSessionId: string
  senderId: string
  content: string
  type: MessageType
  audioUrl?: string
  audioDuration?: number
  reactions: MessageReaction[]
  createdAt: Date
  readAt?: Date
  willDeleteAt?: Date
}

export interface MessageReaction {
  emoji: string
  userId: string
  createdAt: Date
}

export interface ChatSession {
  id: string
  speakerId: string
  listenerId: string
  status: ChatStatus
  deletionPolicy: DeletionPolicy
  startedAt: Date
  endedAt?: Date
  messages: Message[]
}

export interface TypingIndicator {
  userId: string
  isTyping: boolean
  chatSessionId: string
}
