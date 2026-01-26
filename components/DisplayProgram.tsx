"use client";

import { useEffect, useState } from "react";
import { getUserProgramPlan, getUserProgramPlanById, selectProgramByDay } from "@/lib/FecthPrograms";
import { DayData, PlanType } from "@/stores/ProgramsStore";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUpdatePlan, useUpdateProgram } from "@/hooks/MUTATION/UseMutationPrograms";
import {
  getCaloriesByDay,
} from "@/lib/FecthPrograms";
import { CardDescription, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Activity, Flame, TrendingUp, Utensils } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ProgramDetails } from "./ProgramDetails";
import { FilterByDay } from "./Filter";
import PieOnly, { PieType } from "./PieChart";

export const Programs = ({ day }: { day: string }) => {
  const [today, setToday] = useState<DayData | null>(null);
  const [tomorrow, setTomorrow] = useState<DayData | null>(null);
  const [plan, setPlan] = useState<PlanType>();
  const [data, setData] = useState<PieType[]>([]);

  /* ================= FETCH PROGRAM ================= */
  useEffect(() => {
    const handle = async () => {
      const plan = await getUserProgramPlan();
      setPlan(plan);

      const todayProgram = selectProgramByDay(plan, day);
      setToday(todayProgram);

      const nextDayMap: Record<string, string> = {
        Monday: "Tuesday",
        Tuesday: "Wednesday",
        Wednesday: "Thursday",
        Thursday: "Friday",
        Friday: "Saturday",
        Saturday: "Sunday",
        Sunday: "Monday",
      };

      const nextDay = nextDayMap[day];
      const nextProgram = selectProgramByDay(plan, nextDay);
      setTomorrow(nextProgram);
    };

    handle();
  }, [day]);

  /* ================= MACROS PIE ================= */
  useEffect(() => {
    if (!today?.meals) return;

    const protein = today.meals.reduce(
      (s, m) => s + (m.macros?.protein ?? 0),
      0
    );
    const carbs = today.meals.reduce(
      (s, m) => s + (m.macros?.carbs ?? 0),
      0
    );
    const fats = today.meals.reduce(
      (s, m) => s + (m.macros?.fats ?? 0),
      0
    );

    const total = protein + carbs + fats;
    if (total === 0) return;

    setData([
      { name: "Protein", value: Math.round((protein / total) * 100) },
      { name: "Carbs", value: Math.round((carbs / total) * 100) },
      { name: "Fats", value: Math.round((fats / total) * 100) },
    ]);
  }, [today]);

  if (!today) return null;

  return (
    <div className="grid grid-cols-1 w-full p-6 gap-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Label className="text-2xl font-mono text-muted-foreground">
            {day}
          </Label>

          <Label className="text-4xl font-extrabold">
            Fitness Dashboard
          </Label>

          <Label className="text-muted-foreground text-lg">
            Track your nutrition, workouts, and weekly progress
          </Label>
        </div>

        <FilterByDay />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CALORIES */}
        <Card className="bg-card/80 backdrop-blur border shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daily Calories</CardTitle>
            <Flame className="text-orange-500" />
          </CardHeader>

          <CardContent className="space-y-3">
            <Label className="text-5xl font-bold">
              {plan
                ? plan.PlanType.find(p => p.day === day)?.meals.reduce(
                    (s, m) => s + (m.calories ?? 0),
                    0
                  ) ?? 0
                : "—"}
            </Label>

            <CardDescription>
              Target: {today.calories ?? "No data"} kcal
            </CardDescription>
          </CardContent>

          <CardFooter>
            <div className="w-full h-3 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-600"
                style={{
                  width: `${
                    ((plan?.PlanType.find(p => p.day === day)?.meals.reduce(
                      (s, m) => s + (m.calories ?? 0),
                      0
                    ) ?? 0) *
                      100) /
                    (today.calories ?? 1)
                  }%`,
                }}
              />
            </div>
          </CardFooter>
        </Card>

        {/* MACROS */}
        <Card className="bg-card/80 backdrop-blur border shadow-md">
          <CardHeader className="flex justify-between flex-row">
            <CardTitle>Macros Breakdown</CardTitle>
            <TrendingUp className="text-emerald-500" />
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-chart-1">
                Protein {today.meals.reduce((s, m) => s + (m.macros?.protein ?? 0), 0)}g
              </Badge>
              <Badge className="bg-chart-2">
                Carbs {today.meals.reduce((s, m) => s + (m.macros?.carbs ?? 0), 0)}g
              </Badge>
              <Badge className="bg-chart-3">
                Fats {today.meals.reduce((s, m) => s + (m.macros?.fats ?? 0), 0)}g
              </Badge>
            </div>
          </CardContent>

          <CardFooter>
            <PieOnly data={data} />
          </CardFooter>
        </Card>

        {/* NEXT WORKOUT */}
        <Card className="bg-card/80 backdrop-blur border shadow-md">
          <CardHeader className="flex justify-between flex-row">
            <CardTitle>Next Workout</CardTitle>
            <Activity className="text-blue-500" />
          </CardHeader>

          <CardContent className="space-y-4">
            <Label className="font-semibold">
              {tomorrow?.workoutType}
            </Label>

            <CardDescription>
              {tomorrow?.schedule?.length
                ? `Tomorrow ${tomorrow.schedule[0].startTime}`
                : "Rest day"}
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* ================= WEEK OVERVIEW ================= */}
      <div className="grid gap-4">
        <Label className="text-2xl font-semibold">
          Week Overview
        </Label>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plan?.PlanType.map((p, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <Card className="h-64 cursor-pointer hover:shadow-xl transition rounded-xl">
                  <CardHeader>
                    <DialogTitle>{p.day}</DialogTitle>
                    <CardTitle className="text-sm">{p.date}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex gap-2 text-sm">
                      <Flame className="w-4 h-4 text-orange-500" />
                      {getCaloriesByDay(plan, p.day)} kcal
                    </div>

                    <div className="flex gap-2 text-sm">
                      <Utensils className="w-4 h-4 text-emerald-500" />
                      {p.mealsCount} meals
                    </div>

                    <Badge variant="outline">{p.workoutType}</Badge>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-5xl p-0 max-h-[90vh] overflow-y-auto">
                <ProgramDetails day={p.day} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ClientProgram = ({ id }: { id: string }) => {
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [draftPlan, setDraftPlan] = useState<PlanType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);

  const { mutate: updatePlan, isPending } = useUpdatePlan();
  const updateProgram = useUpdateProgram();

  useEffect(() => {
    const handle = async () => {
      const data = await getUserProgramPlanById({ id });
      setPlan(data);
      setDraftPlan(structuredClone(data));
    };
    handle();
  }, [id]);

  const onCancel = () => {
    if (!plan) return;
    setDraftPlan(structuredClone(plan));
    setIsEditing(false);
  };

  const onSave = async () => {
    if (!draftPlan) return;

    updatePlan({ id, plan: draftPlan });
    setPlan(structuredClone(draftPlan));
    setIsEditing(false);

    const res = await fetch("/api/auth/signin", {
      method: "GET",
      credentials: "include",
    });
    const json = await res.json();

    updateProgram.mutate({
      id,
      program: {
        last_updated_by: json.data.fullName,
        updated_at: new Date().toISOString(),
      },
    });
  };

  if (!draftPlan) return null;

  const program = draftPlan.PlanType[dayIndex];

  return (
    <div className="grid gap-6 p-6">
      <div className="flex justify-between items-center">
        <Label className="text-3xl font-semibold">Week Overview</Label>

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={isPending}>
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          disabled={dayIndex === 0}
          onClick={() => setDayIndex((i) => i - 1)}
        >
          <ChevronLeft />
        </Button>

        <div className="text-center">
          <p className="text-xl font-bold">{program.day}</p>
          <p className="text-muted-foreground">{program.date}</p>
        </div>

        <Button
          variant="outline"
          size="icon"
          disabled={dayIndex === draftPlan.PlanType.length - 1}
          onClick={() => setDayIndex((i) => i + 1)}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="grid gap-6 p-6 bg-gray-50 rounded-2xl">
        
        <div className="flex gap-4">
          <Input
            disabled={!isEditing}
            value={program.day}
            className="max-w-48 font-bold text-lg"
            onChange={(e) => {
              const copy = structuredClone(draftPlan.PlanType);
              copy[dayIndex].day = e.target.value;
              setDraftPlan({ ...draftPlan, PlanType: copy });
            }}
          />

          <Input
            disabled={!isEditing}
            value={program.date}
            className="max-w-56"
            onChange={(e) => {
              const copy = structuredClone(draftPlan.PlanType);
              copy[dayIndex].date = e.target.value;
              setDraftPlan({ ...draftPlan, PlanType: copy });
            }}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meals</CardTitle>
          </CardHeader>

          <CardContent className={`grid sm:grid-cols-2 lg:grid-cols-${program.meals.length} gap-4`}>
            {program.meals.map((meal, mIdx) => (
              <Card key={mIdx} className="p-4 space-y-2">
                <Input
                  disabled={!isEditing}
                  value={meal.name}
                  onChange={(e) => {
                    const copy = structuredClone(draftPlan.PlanType);
                    copy[dayIndex].meals[mIdx].name = e.target.value;
                    setDraftPlan({ ...draftPlan, PlanType: copy });
                  }}
                />

                {meal.items.map((item, iIdx) => (
                  <Input
                    key={iIdx}
                    disabled={!isEditing}
                    value={item}
                    onChange={(e) => {
                      const copy = structuredClone(draftPlan.PlanType);
                      copy[dayIndex].meals[mIdx].items[iIdx] = e.target.value;
                      setDraftPlan({ ...draftPlan, PlanType: copy });
                    }}
                  />
                ))}

                <Input
                  type="number"
                  disabled={!isEditing}
                  value={meal.calories}
                  onChange={(e) => {
                    const copy = structuredClone(draftPlan.PlanType);
                    copy[dayIndex].meals[mIdx].calories = Number(e.target.value);
                    setDraftPlan({ ...draftPlan, PlanType: copy });
                  }}
                />
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workout</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Select
              disabled={!isEditing}
              value={program.workoutType}
              onValueChange={(value) => {
                const copy = structuredClone(draftPlan.PlanType);
                copy[dayIndex].workoutType = value as
                  | "Rest"
                  | "Cardio"
                  | "Strength";
                setDraftPlan({ ...draftPlan, PlanType: copy });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Workout type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Rest">Rest</SelectItem>
                <SelectItem value="Cardio">Cardio</SelectItem>
                <SelectItem value="Strength">Strength</SelectItem>
              </SelectContent>
            </Select>

            {program.workouts.map((workout, wIdx) => (
              <Card key={wIdx} className="p-4 space-y-2">
                {workout.exercises.map((exercise, eIdx) => (
                  <div key={eIdx} className="flex gap-2">
                    <Input
                      disabled={!isEditing}
                      value={exercise.name}
                      onChange={(e) => {
                        const copy = structuredClone(draftPlan.PlanType);
                        copy[dayIndex].workouts[wIdx].exercises[eIdx].name =
                          e.target.value;
                        setDraftPlan({ ...draftPlan, PlanType: copy });
                      }}
                    />

                    <Input
                      disabled
                      value={`${exercise.sets} × ${exercise.reps}`}
                    />
                  </div>
                ))}
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
