import { SignIn } from '@clerk/nextjs'
import { useSignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-[url('/landing.jpg')] bg-cover bg-center">
      <div>
        <SignIn afterSignInUrl={`/`} signUpUrl='/sign-up'/>
      </div>
        
    </div>
  
)
}