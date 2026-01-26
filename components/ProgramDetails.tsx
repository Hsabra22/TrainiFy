'use client'
import { getUserProgramPlan, getUserProgramPlanById, selectProgramByDay } from "@/lib/FecthPrograms";
import { DayData } from "@/stores/ProgramsStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Dumbbell, Timer, Utensils } from "lucide-react";
import { Badge } from "./ui/badge";


export const ProgramDetails=({day}:{day:string})=>{
    const [program,setProgram]=useState<DayData>();
    const [error,setError]=useState<boolean>(false);
    const router=useRouter();
    useEffect(()=>{
        if((day!=="Monday"&&day!=="Tuesday"&&day!=="Wednesday"&&day!=="Thursday"&&day!=="Friday"&&day!=="Saturday"&&day!=="Sunday")){
            setError(true);
            return;
        }
        const getPlan=async()=>{
            const plan=await getUserProgramPlan();
            const data= selectProgramByDay(plan,day);
            setProgram(data);
        }; getPlan();
    },[day]);

    if (error) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-background to-muted px-4">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
        
        <h1 className="text-7xl font-extrabold text-primary/90">
          404
        </h1>

        <h2 className="text-2xl font-semibold tracking-tight">
          Page Not Found
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
          Please check the URL or return to the dashboard.
        </p>

        <div className="flex items-center justify-center gap-3 pt-4">
          <Link
            href="/Users/program"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition"
          >
            Go To Program
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-muted transition"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}

   return (
  <div className="grid grid-cols-1 gap-6 p-6 bg-gray-50 min-h-screen">
   
    <div className="flex flex-col gap-1">
      <Label className="text-4xl font-extrabold tracking-tight text-gray-900">
        {program?.day}
      </Label>
      <Label className="text-gray-500 text-lg">{program?.date}</Label>
    </div>

    <Card className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md hover:shadow-xl transition-shadow rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
          <Utensils className="w-6 h-6 text-blue-500" /> Meals
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        {program?.meals.map((meal, idx) => (
          <Card
            key={idx}
            className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-800">
                {meal.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-1 text-gray-700 text-sm">
              {meal.items.map((item, idx) => (
                <CardDescription key={idx}>
                  • {item}
                </CardDescription>
              ))}
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2">
              <Badge variant="secondary">{meal.calories} kcal</Badge>
              <Badge>P {meal.macros.protein}g</Badge>
              <Badge>C {meal.macros.carbs}g</Badge>
              <Badge>F {meal.macros.fats}g</Badge>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>

    <Card className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md hover:shadow-xl transition-shadow rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
          <Dumbbell className="w-6 h-6 text-green-500" /> Workout
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Badge variant="outline" className="w-fit bg-green-50 text-green-700">
          {program?.workoutType}
        </Badge>

        {program?.workouts.map((workout, idx) => (
          <Card
            key={idx}
            className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl"
          >
            <CardContent className="p-4 space-y-3">
              {workout.exercises.map((exercise, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm text-gray-800 font-medium"
                >
                  <Label>{exercise.name}</Label>
                  <Label className="text-gray-500">
                    {exercise.sets} × {exercise.reps}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>

    <Card className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md hover:shadow-xl transition-shadow rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
          <Timer className="w-6 h-6 text-purple-500" /> Schedule
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {program?.schedule.length ? (
          <div className="flex justify-between text-sm text-gray-700">
            <Label>Workout Time</Label>
            <Label className="font-semibold">
              {program.schedule[0].startTime} –{" "}
              {program.schedule.at(-1)?.endTime}
            </Label>
          </div>
        ) : null}

        <div className="grid gap-2">
          {program?.meals.map((meal, idx) => (
            <div
              key={idx}
              className="flex justify-between text-sm text-gray-500"
            >
              <Label>{meal.name}</Label>
              <Label>{meal.calories} cal</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)}

