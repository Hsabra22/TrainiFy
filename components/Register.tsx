'use client'
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddUsers } from "@/hooks/MUTATION/UseMutationProfiles";
import { Card,CardHeader,CardContent,CardTitle } from "@/components/ui/card";
import Link from "next/link";

const registerSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    username: z.string().min(2, "Username is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(7, "Enter a valid phone"),
    image_url: z
  .instanceof(File, { message: "Profile image is required" })
  .refine(
    (file) => file.size > 0,
    { message: "Image is required" }
  )
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
    { message: "Only JPG, JPEG, PNG images are allowed" }
  ),

    password: z.string().min(6).max(15),
    confirmPassword: z.string().min(6).max(15),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
    const add = useAddUsers();
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterForm) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
            return;
        }
        add.mutate({
            email:data.email,
            password:data.password,
            profile:{
                email:data.email,
                fullName:data.fullName,
                image_url:data.image_url,
                username:data.username,
                phone:data.phone,
                role:"user"
            }
        });
        reset();
        window.location.href="/login";
    };

    return (
  <div className="p-2 relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-linear-to-br from-[#F8FAFC] via-[#EEF2FF] to-[#FDF4FF]">

  {/* Background Glows */}
  <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-200/40 blur-[120px]" />
  <div className="absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-pink-200/40 blur-[120px]" />

  <div className="relative w-full max-w-2xl">
    <Card className="rounded-3xl border border-border/40 bg-white/70 backdrop-blur-xl shadow-2xl">

      {/* Header */}
      <CardHeader className="pb-6 text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Join{" "}
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Trainify
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Build your AI-powered training journey
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Full name + Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Full name</Label>
              <Input
                placeholder="Jane Doe"
                className="h-11 rounded-xl"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Username</Label>
              <Input
                placeholder="janedoe"
                className="h-11 rounded-xl"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-xs text-red-500">{errors.username.message}</p>
              )}
            </div>
          </div>

          {/* Email – full width */}
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@trainify.ai"
              className="h-11 rounded-xl"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-11 rounded-xl"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Confirm password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-11 rounded-xl"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Phone + Profile Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                placeholder="+1234567890"
                className="h-11 rounded-xl"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="md:col-span-2 grid gap-2">
              <Label>Profile image</Label>
              <Controller
                name="image_url"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    className="h-11 cursor-pointer rounded-xl"
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0])
                    }
                  />
                )}
              />
              {errors.image_url && (
                <p className="text-xs text-red-500">
                  {String(errors.image_url.message)}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              h-12 w-full rounded-2xl
              bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600
              hover:brightness-110
              text-white font-semibold
              shadow-lg transition-all
            "
          >
            {isSubmitting ? "Creating account..." : "Create your Trainify account"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
</div>


);

}