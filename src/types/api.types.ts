export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: any
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Auth
export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  role?: 'speaker' | 'listener' | 'both'
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    role: string
  }
  token: string
  refreshToken: string
}

// Matching
export interface JoinMatchingRequest {
  role: 'speaker' | 'listener'
  timerDuration?: '10min' | '2hr' | '10hr'
}

export interface MatchingResponse {
  queueId: string
  position: number
  estimatedWaitTime?: number
}

// Chat
export interface SendMessageRequest {
  chatSessionId: string
  content: string
  type: 'text' | 'audio'
  audioUrl?: string
  audioDuration?: number
}

export interface ChatHistoryParams extends PaginationParams {
  chatSessionId: string
}
