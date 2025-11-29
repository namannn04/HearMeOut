import type { Metadata } from 'next'
import { ChatWindow } from '@/components/chat/ChatWindow'

export const metadata: Metadata = {
  title: 'Chat - HearMeOut',
  description: 'Anonymous chat conversation',
}

export default function ChatPage() {
  return <ChatWindow />
}
