import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center mt-5 justify-center h-3/4 p-10">
            <SignUp afterSignUpUrl={`/`} signInUrl='/sign-up'/>
        </div>
    )
  }