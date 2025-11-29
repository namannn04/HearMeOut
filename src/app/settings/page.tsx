import type { Metadata } from 'next'
import { Settings } from '@/components/common/Settings'

export const metadata: Metadata = {
  title: 'Settings - HearMeOut',
  description: 'Manage your HearMeOut preferences',
}

export default function SettingsPage() {
  return <Settings />
}
