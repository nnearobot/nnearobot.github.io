import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import Footer from '@/components/Footer'

config.autoAddCss = false

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "nnearobot | Rimma Maksiutova's page",
  description: 'My experiments in frontend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
