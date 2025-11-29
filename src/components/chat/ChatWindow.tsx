'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, Smile, MoreVertical, AlertCircle } from 'lucide-react'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Card } from '@/components/ui'
import { toast } from 'sonner'
import type { DeletionPolicy } from '@/types/chat.types'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  onSendAudio: (audioBlob: Blob) => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, onSendAudio, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const emojis = ['😊', '😢', '❤️', '👍', '🙏', '💪', '🤗', '😔', '😌', '🌟']

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        onSendAudio(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full mb-2 left-0 bg-card border border-border rounded-lg shadow-lg p-3">
          <div className="grid grid-cols-5 gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="text-2xl hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          disabled={disabled}
        >
          <Smile className="w-5 h-5" />
        </Button>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-muted border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground disabled:opacity-50"
        />

        {isRecording ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={stopRecording}
            className="animate-pulse"
          >
            <Mic className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={startRecording}
            disabled={disabled}
          >
            <Mic className="w-5 h-5" />
          </Button>
        )}

        <Button
          size="sm"
          onClick={handleSend}
          disabled={!message.trim() || disabled}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

interface Message {
  id: string
  senderId: string
  content: string
  type: 'text' | 'audio'
  timestamp: Date
  audioUrl?: string
}

interface MessageListProps {
  messages: Message[]
  currentUserId: string
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No messages yet. Say hello! 👋</p>
        </div>
      ) : (
        messages.map((msg) => {
          const isOwn = msg.senderId === currentUserId
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  isOwn
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {msg.type === 'text' ? (
                  <p className="whitespace-pre-wrap wrap-break-words">{msg.content}</p>
                ) : (
                  <audio controls src={msg.audioUrl} className="max-w-full" />
                )}
                <div
                  className={`text-xs mt-1 ${
                    isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          )
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [showDeletionModal, setShowDeletionModal] = useState(true)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [deletionPolicy, setDeletionPolicy] = useState<DeletionPolicy | null>(null)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const currentUserId = 'user-1' // TODO: Get from auth context

  const deletionPolicies: { value: DeletionPolicy; title: string; description: string }[] = [
    {
      value: 'delete_24h',
      title: '24 Hour Delete',
      description: 'Messages automatically delete after 24 hours (like Snapchat)'
    },
    {
      value: 'delete_on_close',
      title: 'Delete on Close',
      description: 'All messages are permanently deleted when you close the chat'
    },
    {
      value: 'save_forever',
      title: 'Save Forever',
      description: 'Keep all messages until you manually delete them'
    }
  ]

  const handleSelectDeletionPolicy = (policy: DeletionPolicy) => {
    setDeletionPolicy(policy)
    setDeletionPolicy(policy)
    setShowDeletionModal(false)
    setShowWarningModal(true)
  }

  const handleStartChat = () => {
    setShowWarningModal(false)
    toast.success( 'Chat started! Remember to stay safe.')
  }

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content,
      type: 'text',
      timestamp: new Date()
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendAudio = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob)
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: '[Audio Message]',
      type: 'audio',
      timestamp: new Date(),
      audioUrl
    }
    setMessages((prev) => [...prev, newMessage])
    toast.success( 'Audio message sent')
  }

  const handleEndChat = () => {
    if (deletionPolicy === 'delete_on_close') {
      toast.info( 'Chat ended. All messages have been deleted.')
    } else {
      toast.info( 'Chat ended.')
    }
    // TODO: Navigate back to dashboard
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold">L</span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Anonymous Listener</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettingsModal(true)}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={handleEndChat}>
            End Chat
          </Button>
        </div>
      </header>

      {/* Deletion Policy Info Banner */}
      {deletionPolicy && (
        <div className="bg-blue-500/10 border-b border-blue-500/20 px-4 py-2">
          <p className="text-sm text-foreground text-center">
            <span className="font-medium">Deletion Policy: </span>
            {deletionPolicies.find((p) => p.value === deletionPolicy)?.title}
          </p>
        </div>
      )}

      {/* Messages */}
      <MessageList messages={messages} currentUserId={currentUserId} />

      {/* Input */}
      <div className="border-t border-border p-4 bg-card">
        <MessageInput
          onSendMessage={handleSendMessage}
          onSendAudio={handleSendAudio}
          disabled={!deletionPolicy}
        />
      </div>

      {/* Deletion Policy Modal */}
      <Dialog open={showDeletionModal} onOpenChange={() => {}}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Choose Deletion Policy</DialogTitle>
          </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select how you want your messages to be handled
          </p>

          <div className="space-y-3">
            {deletionPolicies.map((policy) => (
              <Card
                key={policy.value}
                className="p-4 cursor-pointer hover:border-primary transition-all"
                onClick={() => handleSelectDeletionPolicy(policy.value)}
              >
                <h4 className="font-medium text-foreground">{policy.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{policy.description}</p>
              </Card>
            ))}
          </div>
        </div>
        </DialogContent>
      </Dialog>

      {/* Safety Warning Modal */}
      <Dialog open={showWarningModal} onOpenChange={() => {}}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Safety First</DialogTitle>
          </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Important Safety Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Never share your real name, address, or phone number</li>
                <li>Don't share social media handles or email addresses</li>
                <li>Keep the conversation anonymous and safe</li>
                <li>Report any inappropriate behavior immediately</li>
                <li>If you're in crisis, contact local emergency services</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button onClick={handleStartChat} className="w-full">
              I Understand, Start Chat
            </Button>
          </div>
        </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Settings</DialogTitle>
          </DialogHeader>
        <div className="space-y-4">
          <Card className="p-4">
            <h4 className="font-medium text-foreground mb-2">Deletion Policy</h4>
            <p className="text-sm text-muted-foreground">
              {deletionPolicies.find((p) => p.value === deletionPolicy)?.description}
            </p>
          </Card>

          <Button variant="outline" className="w-full" disabled>
            Report User
          </Button>

          <Button variant="destructive" onClick={handleEndChat} className="w-full">
            End Chat
          </Button>
        </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
