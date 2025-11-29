import { useEffect, useRef, useCallback } from 'react'
import { WebSocketClient, getWebSocketClient } from '@/lib/websocket'

type MessageHandler = (data: any) => void

export function useWebSocket() {
  const wsRef = useRef<WebSocketClient | null>(null)
  const handlersRef = useRef<Map<string, MessageHandler[]>>(new Map())

  useEffect(() => {
    // Initialize WebSocket client
    wsRef.current = getWebSocketClient()
    
    // Connect
    wsRef.current.connect().catch((error) => {
      console.error('Failed to connect to WebSocket:', error)
    })

    // Cleanup on unmount
    return () => {
      // Remove all handlers
      handlersRef.current.forEach((handlers, type) => {
        handlers.forEach((handler) => {
          wsRef.current?.off(type, handler)
        })
      })
      handlersRef.current.clear()
    }
  }, [])

  const on = useCallback((type: string, handler: MessageHandler) => {
    if (!handlersRef.current.has(type)) {
      handlersRef.current.set(type, [])
    }
    handlersRef.current.get(type)?.push(handler)
    wsRef.current?.on(type, handler)
  }, [])

  const off = useCallback((type: string, handler: MessageHandler) => {
    const handlers = handlersRef.current.get(type)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
    wsRef.current?.off(type, handler)
  }, [])

  const send = useCallback((type: string, data: any) => {
    wsRef.current?.send(type, data)
  }, [])

  const isConnected = useCallback(() => {
    return wsRef.current?.isConnected() || false
  }, [])

  return { on, off, send, isConnected }
}
