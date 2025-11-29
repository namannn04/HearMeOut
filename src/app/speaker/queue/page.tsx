import type { Metadata } from 'next'
import { MatchingQueue } from '@/components/matching/MatchingQueue'

export const metadata: Metadata = {
  title: 'Finding a Listener - HearMeOut',
  description: 'Connecting you with someone who cares',
}

export default function SpeakerQueuePage() {
  return <MatchingQueue />
}
