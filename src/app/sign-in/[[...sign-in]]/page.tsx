import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              // Outer card container
              card: `
                shadow-lg bg-white rounded-xl
                px-6 py-8
                flex flex-col gap-6
              `,

              // Root inner wrapper
              rootBox: 'flex flex-col gap-6',

              // Header styles
              headerTitle: 'text-2xl font-bold text-center',
              headerSubtitle: 'text-muted-foreground text-sm text-center',

              // Form field styles
              formFieldLabel: 'text-sm font-medium text-gray-700',
              formFieldInput:
                'border border-gray-300 rounded-md px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500',

              // Primary button
              formButtonPrimary:
                'w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium',

              // Divider text
              dividerText:
                'bg-background px-2 text-sm text-muted-foreground relative z-10',

              // Social buttons
              socialButtonsBlockButton:
                'w-full border rounded-md py-2 hover:bg-gray-50 flex items-center gap-2 justify-center',

              // Footer
              footer: 'text-sm text-center',
            },
            layout: {
              socialButtonsPlacement: 'bottom',
              socialButtonsVariant: 'blockButton',
            },
            variables: {
              colorPrimary: '#4F46E5', // Indigo
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
      </div>
    </main>
  )
}