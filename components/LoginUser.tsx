"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card,CardHeader,CardContent,CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type FormData = z.infer<typeof schema>;

export function LoginUser() {
  const router=useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    reset,
    
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:{
      email:"admin@gmail.com",
      password:"admin123"
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:data.email,
          password:data.password
        }),
        credentials: "include",
      });

      const login = await res.json();

      if (!res.ok) {
        toast.error(login.error || "Login failed");
        return;
      }

      toast.success(`Welcome back`);

      await new Promise((r) => setTimeout(r, 800));

      if (login.user.role === "admin") {
        window.location.href = "/Admin/dashboard";
      } else if(login.user.role==="user") {
        window.location.href = "/Users/generate";
      }else {
        window.location.href = "/Trainers/dashboard";
      }

      reset();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
  <div className="w-full max-w-md">
    <Card className="rounded-2xl border border-[#E2E8F0] shadow-xl">
      <CardHeader className="pb-6 text-center">
        <CardTitle className="text-2xl font-bold text-[#0F172A]">
          Welcome Back
        </CardTitle>
        <p className="text-sm text-[#64748B]">
          Sign in to your Serenity Hotel account
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid gap-2">
            <Label className="text-[#0F172A]">Email</Label>
            <Input
              {...register("email")}
              placeholder="you@example.com"
              className="
                h-11
                border-[#CBD5E1]
                focus:border-[#1E3A8A]
                focus:ring-[#1E3A8A]
              "
            />
            {errors.email && (
              <p className="text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label className="text-[#0F172A]">Password</Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="
                h-11
                border-[#CBD5E1]
                focus:border-[#1E3A8A]
                focus:ring-[#1E3A8A]
              "
            />
            {errors.password && (
              <p className="text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            className="
              h-11 w-full
              rounded-xl
              bg-[#C9A227]
              hover:bg-[#A8871E]
              text-[#0F172A]
              font-semibold
              shadow-md
            "
          >
            <LogIn className="mr-2 h-4 w-4" />
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#64748B]">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#1E3A8A] hover:underline"
          >
            Create one
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
</div>

);

}
