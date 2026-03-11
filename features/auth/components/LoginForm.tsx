"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { useLogin } from "../hooks/hooks";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function LoginForm() {
  const { mutate, isPending, error } = useLogin();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data, {
      onError: () => {
        toast.error("Login failed. Please check your credentials.");
      },
    });
  }

  return (
    <div className="w-86.25 h-112.5 flex flex-col text-white bg-neutral-900 rounded-2xl border border-neutral-600 py-8 px-4">
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Image src={"/images/Logo.svg"} alt="Logo" width={30} height={30} />
          <h1 className="text-display-xs font-bold text-neutral-25">
            Sociality
          </h1>
        </div>
        <div>
          <h2 className="text-xl font-bold">Wellcome Back!</h2>
        </div>
      </div>
      <form id="form-rhf-email" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-email">Email</FieldLabel>
                <Input
                  {...field}
                  className="border-radius-xl bg-neutral-950 py-2 px-4 gap-2 w-78.25 h-12 border border-neutral-900"
                  id="form-rhf-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-password">Password</FieldLabel>
                <Input
                  {...field}
                  className="border-radius-xl bg-neutral-950 py-2 px-4 gap-2 w-78.25 h-12 border border-neutral-900"
                  id="form-rhf-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary-300 hover:bg-primary/90 text-primary-foreground  h-12 rounded-full"
            disabled={isPending}
          >
            Login
          </Button>

          <p className="text-center">
            Don't have an account?{" "}
            <span className="text-primary-200 cursor-pointer font-bold">
              <Link href="/register">Register</Link>
            </span>
          </p>
        </FieldGroup>
      </form>
    </div>
  );
}
