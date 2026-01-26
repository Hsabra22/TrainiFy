'use client'
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddTrainers } from "@/hooks/MUTATION/UseMutationTrainers";
import { Textarea } from "./ui/textarea";

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
  bio:z.string(),
  specialization:z.string(),
  experience_years:z.string(),
  is_approved:z.boolean(),
  password: z.string().min(6).max(15),
  confirmPassword: z.string().min(6).max(15),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function AddTrainer() {
    const addTrainer=useAddTrainers();
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
        addTrainer.mutate({
            newTrainer:{
                email:data.email,
                fullName:data.fullName,
                image_url:data.image_url,
                username:data.username,
                phone:data.phone,
                role:"trainer"
            },password:data.password,
             newTrainerInfo:{
                bio:data.bio,
                experience_years:data.experience_years,
                is_approved:data.is_approved,
                specialization:data.specialization
             }
        })
        reset();
    };

    return (
  <div className="mx-auto my-10 max-w-xl px-4">
    <Card className="rounded-2xl border shadow-lg">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Register Trainer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Create a new trainer profile with complete information
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         
          <div className="grid gap-5">
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
          </div>

          <div className="grid gap-5 md:grid-cols-2">
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
              <Label htmlFor="confirmPassword">Confirm password</Label>
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

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Short trainer bio"
              className="min-h-25"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-xs text-red-600">
                {errors.bio.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                placeholder="Strength, Cardio, Nutrition"
                className="h-11"
                {...register("specialization")}
              />
              {errors.specialization && (
                <p className="text-xs text-red-600">
                  {errors.specialization.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="experience_years">
                Experience (years)
              </Label>
              <Input
                id="experience_years"
                type="number"
                placeholder="5"
                className="h-11"
                {...register("experience_years")}
              />
              {errors.experience_years && (
                <p className="text-xs text-red-600">
                  {errors.experience_years.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border bg-muted/40 px-4 py-3">
            <input
              id="is_approved"
              type="checkbox"
              className="h-4 w-4"
              {...register("is_approved")}
            />
            <Label htmlFor="is_approved" className="cursor-pointer">
              Approved trainer
            </Label>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full text-base font-semibold"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
);

}