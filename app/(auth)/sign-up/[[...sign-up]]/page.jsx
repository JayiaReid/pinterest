import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-[url('/landing.jpg')] bg-cover bg-center">
      <div className="">
        <SignUp afterSignUpUrl="/" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
