// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="fixed top-[1vh]  w-full z-50 bg-white shadow-md px-[5%]  md:min-h-screen md:bg-gray-50 md:px-4 md:flex md:items-center md:justify-center">
      <div className="w-full max-w-md">
        <SignUp appearance={{ elements: { card: 'shadow-lg' } }} />
      </div>
    </div>
  )
}