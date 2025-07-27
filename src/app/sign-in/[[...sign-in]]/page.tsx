// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'
import Navbar from '@/components/Home/Navbar/navbar'

//fixed top-0 w-full z-50 bg-white shadow-md -> small screens move to the top 
//flex min-h-screen items-center justify-center bg-gray-50 px-4 -> vanilla implementation from web tutorial
//md:min-h-screen md:bg-gray-50 md:px-4 md:flex md:items-center md:justify-center -> big screens center div

export default function SignInPage() {
  return (
    <>
    <div className="fixed top-[5vh]  w-full z-50 bg-white shadow-md px-[5%]  md:min-h-screen md:bg-gray-50 md:px-4 md:flex md:items-center md:justify-center">
      <div className="w-full max-w-md">
        <SignIn appearance={{ elements: { card: 'shadow-lg' } }} />
      </div>
    </div>
    </>
  )
}