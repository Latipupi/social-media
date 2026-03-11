"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";

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
import { useRegister } from "../hooks/hooks";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  phone: z.string().min(1, { message: "Number phone is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm Password must be at least 6 characters" }),
});

export function RegisterForm() {
  const { mutate, isPending, error } = useRegister();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const payload = {
      name: data.name,
      username: data.username,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };
    mutate(payload, {
      onError: () => {
        toast.error("Registration failed. Please try again.");
      },
    });
  }

  return (
    <div className="w-86.25 md:w-130.75  flex flex-col text-white bg-neutral-900 rounded-2xl border border-neutral-600 py-8 px-4">
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Image src={"/images/Logo.svg"} alt="Logo" width={30} height={30} />
          <h1 className="text-display-xs font-bold text-neutral-25">
            Register
          </h1>
        </div>
        <div>
          <h2 className="text-xl font-bold">Wellcome Back!</h2>
        </div>
      </div>
      <form id="form-rhf-email" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-name">Name</FieldLabel>
                <Input
                  {...field}
                  className="border-radius-xl bg-neutral-950 py-2 px-4 gap-2 w-78.25 h-12 border border-neutral-900"
                  id="form-rhf-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-username">Username</FieldLabel>
                <Input
                  {...field}
                  className="border-radius-xl bg-neutral-950 py-2 px-4 gap-2 w-78.25 h-12 border border-neutral-900"
                  id="form-rhf-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your username"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-phone">Number Phone</FieldLabel>
                <Input
                  {...field}
                  className="border-radius-xl bg-neutral-950 py-2 px-4 gap-2 w-78.25 h-12 border border-neutral-900"
                  id="form-rhf-phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your number phone"
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
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  className="border-radius-xl bg-neutral-950 py-2 px-4 gap-2 w-78.25 h-12 border border-neutral-900"
                  id="form-rhf-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your confirm password"
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
            Submit
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
