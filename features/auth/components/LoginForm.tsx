"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { EyeIcon } from "lucide-react"; // Install lucide-react jika belum

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-spacing-xl relative overflow-hidden">
      {/* Efek Glow di Background */}
      <div className="absolute inset-0 bg-login-glow pointer-events-none" />

      <div className="w-full max-w-[400px] z-10">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-spacing-4xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">✺</span>
            </div>
            <span className="text-white text-display-xs font-bold tracking-tight">
              Sociality
            </span>
          </div>
          <h1 className="text-white text-display-sm font-semibold mt-4">
            Welcome Back!
          </h1>
        </div>

        {/* Card Form */}
        <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-3xl p-spacing-2xl shadow-2xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-spacing-xl"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-25">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="bg-neutral-950/50 border-neutral-800 text-white h-12 rounded-xl focus:ring-brand-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-25">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="bg-neutral-950/50 border-neutral-800 text-white h-12 rounded-xl pr-10 focus:ring-brand-200"
                        />
                        <EyeIcon className="absolute right-3 top-3.5 w-5 h-5 text-neutral-500 cursor-pointer" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-brand-200 hover:bg-brand-300 text-white h-12 rounded-full text-text-md font-semibold transition-all"
              >
                Login
              </Button>

              <p className="text-center text-neutral-400 text-text-sm mt-4">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-brand-200 font-bold hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
