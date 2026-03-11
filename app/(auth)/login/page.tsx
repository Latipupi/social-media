import { LoginForm } from "@/features/auth/components/LoginForm";

export default function Login() {
  return (
    <div
      className="p-4 min-h-screen 
bg-[radial-gradient(circle_at_80%_100%,rgba(124,58,237,0.7),transparent_60%),linear-gradient(to_bottom,#000000_0%,#000000_40%,#4c1d95_100%)] md:flex md:items-center md:justify-center"
    >
      <LoginForm />
    </div>
  );
}
