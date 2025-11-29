import type { Metadata } from 'next'
import { Dashboard } from '@/components/dashboard/Dashboard'

export const metadata: Metadata = {
  title: 'Dashboard - HearMeOut',
  description: 'Your HearMeOut dashboard',
}

export default function DashboardPage() {
  return <Dashboard />
}
