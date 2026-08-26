import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-body' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-code' })

export const metadata: Metadata = {
  title: 'Himanshu Kumar — Full-Stack Developer',
  description: 'Portfolio of Himanshu Kumar, a full-stack developer and Data Science student building practical digital products.',
  generator: 'v0.app',
  openGraph: { title: 'Himanshu Kumar — Full-Stack Developer', description: 'Building useful things with thoughtful code.', type: 'website' },
}
export const viewport: Viewport = { colorScheme: 'dark light', themeColor: '#111214' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark"><body className={`${geist.variable} ${geistMono.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
