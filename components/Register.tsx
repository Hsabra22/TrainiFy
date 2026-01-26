'use client'
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddUsers } from "@/hooks/MUTATION/UseMutationProfiles";
import { Card,CardHeader,CardContent,CardTitle } from "@/components/ui/card";

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
  <div className="mx-auto my-10 max-w-md px-4">
    <Card className="rounded-2xl border shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Register
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Create your account to get started
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              placeholder="Jane Doe"
              className="h-11"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="janedoe"
              className="h-11"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-11"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="h-11"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              className="h-11"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+1234567890"
              className="h-11"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image_url">Profile image</Label>
            <Controller
              name="image_url"
              control={control}
              render={({ field }) => (
                <Input
                  type="file"
                  className="h-11 cursor-pointer"
                  onChange={(e) =>
                    field.onChange(e.target.files?.[0])
                  }
                />
              )}
            />
            {errors.image_url && (
              <p className="text-xs text-red-600">
                {String(errors.image_url.message)}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full text-base font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
);

}