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
  <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-linear-to-br from-[#F8FAFC] via-[#EEF2FF] to-[#FDF4FF]">

  <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-200/40 blur-[120px]" />
  <div className="absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-pink-200/40 blur-[120px]" />

  <div className="relative w-full max-w-md">
    <Card className="rounded-3xl border border-border/40 bg-white/70 backdrop-blur-xl shadow-2xl">

      <CardHeader className="pb-6 text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Welcome back to{" "}
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Trainify
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          AI-powered training. Built for real results.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="space-y-2">
            <Label className="text-sm text-foreground/80">Email</Label>
            <Input
              {...register("email")}
              placeholder="you@trainify.ai"
              className="
                h-11
                rounded-xl
                bg-white
                border-border
                focus:border-indigo-500
                focus:ring-indigo-500
              "
            />
            {errors.email && (
              <p className="text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-foreground/80">Password</Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="
                h-11
                rounded-xl
                bg-white
                border-border
                focus:border-indigo-500
                focus:ring-indigo-500
              "
            />
            {errors.password && (
              <p className="text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            className="
              h-12 w-full
              rounded-2xl
              bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600
              hover:brightness-110
              text-white
              font-semibold
              shadow-lg
              transition-all
            "
          >
            <LogIn className="mr-2 h-4 w-4" />
            {isSubmitting ? "Signing in..." : "Sign in to Trainify"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          New to Trainify?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
          >
            Create your AI program
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
</div>



);

}
