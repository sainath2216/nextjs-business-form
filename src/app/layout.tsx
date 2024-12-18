import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { FormHeader } from '@/components/layout/form-header'
import { NavigationGuard } from '@/components/navigation/navigation-guard'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-purple-600">
          <NavigationGuard />
          <div className="max-w-4xl mx-auto p-6">
            <FormHeader />
            <main className="mt-6 bg-white rounded-lg shadow-lg p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}