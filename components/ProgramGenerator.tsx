"use client";

import { useAddUserDetails } from "@/hooks/MUTATION/UseMutationUsersDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Label } from "./ui/label";
import { X, Plus, Dumbbell } from "lucide-react";
import { useAddPrograms } from "@/hooks/MUTATION/UseMutationPrograms";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

const userSchema = z.object({
  goal: z.string().min(1),
  experience_level: z.string().min(1),
  height: z.string().min(1),
  weight: z.string().min(1),
  age: z.string().min(1),
  gender: z.string().min(1,"Select a gender please"),
  available_days: z
    .array(
      z.object({
        value: z.string().min(1, "Day is required"),
      })
    )
    .min(1, "Select at least one day"),
});

type UserForm = z.infer<typeof userSchema>;

export const ProgramGenerator = () => {
  const [day, setDay] = useState("");
  const addUser = useAddUserDetails();
  const addProgram=useAddPrograms();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "available_days",
  });
const handle = async (data: UserForm) => {
  const promptObject = {
  user: {
    weight: data.weight,
    height: data.height,
    age: data.age,
    experience: data.experience_level,
    gender: data.gender,
    available_days: data.available_days,
    goal: data.goal,
  },
  instructions: `
You are a professional fitness AI. Generate a full 7-day workout and meal plan based on the user data provided above.

**CRITICAL INSTRUCTIONS**:
1. Respond with JSON ONLY.
2. The JSON must strictly follow the interface below (PlanType). **Do not change keys, structure, or order**. Only the values (calories, meals, workouts, schedule, etc.) can vary according to the user's data.
3. Each day should have:
   - day: string (e.g., "Monday")
   - date: string (e.g., "Jan (current date)")
   - calories: number
   - mealsCount: number
   - workoutType: string ("Strength", "Cardio", "Rest")
   - meals: array of meal objects
       - name: string
       - items: array of strings
       - calories: number
       - macros: { protein: number, carbs: number, fats: number }
   - workouts: array of workout objects (empty if rest day)
       - name: string
       - type: string
       - exercises: array of { name: string, sets: number, reps: string }
   - schedule: array of { activity: string, startTime: string, endTime: string }

4. Use the user's available_days to determine workout/rest days. Any day not in available_days should be a Rest day.
5. Do NOT add any explanations or text. Only return the JSON array of 7 objects (Monday → Sunday).
6. Format JSON exactly like this example (structure, keys, order, arrays):

[EXAMPLE_JSON_REPLACE_WITH_YOUR_FULL_7_DAY_JSON_HERE]

7. Adjust meals, workouts, calories, and macros based on user's weight, height, age, experience, gender, and goal. 

ALERT: STRICTLY FOLLOW THE JSON FORMAT. ANY EXTRA TEXT WILL BREAK MY CODE.
`
};


  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: promptObject }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let resultText = "";

  if (!reader) {
    resultText = await response.text();
  } else {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      resultText += decoder.decode(value);
    }
  }

  try {
    const json = JSON.parse(resultText);
    addUser.mutate(data);
    addProgram.mutate({
    plan_data:JSON.parse(json.result)
   });
  } catch (err) {
    console.error("Failed to parse AI JSON:", err);
  }
   reset();
};



  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] lg:p-10">
      <Card className="lg:max-w-5xl mx-auto bg-white border border-slate-200 shadow-xl rounded-none lg:rounded-3xl p-8">
        <CardHeader className="text-left">
          <CardTitle className="text-4xl font-extrabold text-[#0F172A] flex  gap-2">
            <Dumbbell className="hidden lg:block"/>
            Program Generator
          </CardTitle>
          <CardDescription className="text-slate-500 text-lg">
            Tell us about yourself to generate your training plan
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-8">
          <form onSubmit={handleSubmit(handle)} className="grid gap-8">

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <Label className="text-xl font-semibold text-[#0F172A]">
                Step 1 — Personal Information
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-800">Age</Label>
                  <Input  type="number" min={"10"} height={"85"} {...register("age")} placeholder="age" className="border border-gray-300 rounded-lg p-4 text-lg font-semibold text-gray-800  placeholder-gray-500 placeholder-opacity-70 italic focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 w-full"/>
                  {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-gray-800">Gender</Label>
                  <Controller
                  control={control}
                  name="gender"
                   render={({field})=>(
                      <Select  value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="border border-gray-300 rounded-lg p-4 text-sm font-semibold text-gray-800  placeholder-gray-500 placeholder-opacity-70 italic focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 w-full">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className="">
                            <SelectLabel>Genders</SelectLabel>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}/>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-gray-800">Height (cm)</Label>
                  <Input  type="number" min={"150"} height={"220"} placeholder="height" {...register("height")} className="border border-gray-300 rounded-lg p-4 text-lg font-semibold text-gray-800  placeholder-gray-500 placeholder-opacity-70 italic focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 w-full"/>
                  {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-gray-800">Weight (kg)</Label>
                  <Input type="number" min={"55"} height={"130"} {...register("weight")} placeholder="weight" className="border border-gray-300 rounded-lg p-4 text-lg font-semibold text-gray-800  placeholder-gray-500 placeholder-opacity-70 italic focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 w-full"/>
                  {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <Label className="text-xl font-semibold text-[#0F172A]">
                Step 2 — Fitness Goals
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-800">Goal</Label>
                  <Controller
                  control={control}
                  name="goal"
                   render={({field})=>(
                      <Select  value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="border border-gray-300 rounded-lg p-4 text-sm font-semibold text-gray-800  placeholder-gray-500 placeholder-opacity-70 italic focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 w-full">
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className="">
                            <SelectLabel>Goal</SelectLabel>
                            <SelectItem value="fat_loss">Fat Loss</SelectItem>
                            <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                            <SelectItem value="strength">Strength</SelectItem>
                            <SelectItem value="endurance">Endurance</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}/>
                  {errors.goal && <p className="text-red-500 text-sm">{errors.goal.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-gray-800">Experience level</Label>
                  <Controller
                  control={control}
                  name="experience_level"
                   render={({field})=>(
                      <Select  value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="border border-gray-300 rounded-lg p-4 text-sm font-semibold text-gray-800  placeholder-gray-500 placeholder-opacity-70 italic focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 w-full">
                          <SelectValue placeholder="Select your Level Of experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className="">
                            <SelectLabel>Level</SelectLabel>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}/>
                  {errors.experience_level && <p className="text-red-500 text-sm">{errors.experience_level.message}</p>}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <Label className="text-xl font-semibold text-[#0F172A]">
                Step 3 — Available Days
              </Label>

              <div className="flex gap-2 mt-4">
                <Input
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="Add day (e.g. Monday)"
                className="border border-gray-300 rounded-lg p-4 text-lg font-semibold text-gray-800  placeholder-gray-500 placeholder-opacity-70 italic focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 w-full"/>
                <Button
                  type="button"
                  onClick={() => {
                    if (!day.trim()) {
                      toast.error("Enter a day");
                      return;
                    }if(day!=="Monday"&&day!=="Tuesday"&&day!=="Wednesday"&&day!=="Thursday"&&day!=="Friday"&&day!=="Saturday"&&day!=="Sunday"){
                      toast.error("Enter a valid week day");
                      return;
                    }
                    append({ value: day });
                    setDay("");
                  }}
                  className="bg-[#0F172A] text-white hover:bg-slate-800 px-4"
                >
                  <Plus />
                </Button>
              </div>

              {errors.available_days && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.available_days.message as string}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {fields.map((d, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#0F172A] text-white rounded-lg px-3 py-1"
                  >
                    {d.value}
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => remove(index)}
                      className="text-white ml-2 p-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#0F172A] text-white text-lg font-semibold hover:bg-slate-800 px-10 py-3"
              >
                {isSubmitting ? "Generating Program..." : "Generate Program"}
              </Button>
            </div>
          </form>
        </CardContent>

      </Card>
    </div>
  );
};


