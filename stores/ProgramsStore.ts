import { create } from "zustand";
import { TrainerType } from "./TrainerStore";
import { ProfileType } from "./ProfilesStore";

export interface Macros {
  protein: number
  carbs: number
  fats: number
}

export interface Meal {
  name: string
  items: string[]
  calories: number
  macros: Macros
}

export interface Exercise {
  name: string
  sets: number
  reps: string
}

export interface Workout {
  name: string
  type: string
  exercises: Exercise[]
}

export interface ScheduleItem {
  activity: string
  startTime: string
  endTime: string
}

export interface DayData {
  day: string
  date: string
  calories: number
  mealsCount: number
  workoutType: "Cardio" | "Strength" | "Rest"
  meals: Meal[]
  workouts: Workout[]
  schedule: ScheduleItem[]
}
export interface PlanType {
  PlanType: DayData[] // exactly 7 days
}

export interface ProgramType{
    id:string,
    user_id:ProfileType,
    created_by:"ai",
    plan_data:Record<string,any>|null,
    last_updated_by:TrainerType|"ai"|string,
    created_at:string,
    updated_at:string,
    title:string
};
export type ProgramForm={
    plan_data:PlanType
}

export interface ProgramUpdate{
  updated_at:string,
  last_updated_by:TrainerType|"ai"|string,
}

export interface ProgramStore {
    programs: ProgramType[];
    setPrograms: (programs: ProgramType[]) => void;
    addPrograms: (program: ProgramType) => void;
    updatePrograms: (id: string, program: ProgramUpdate) => void;
    updatePlan:(id:string,plan:PlanType)=>void;
    deletePrograms: (id: string) => void;
}
export const usePrograms = create<ProgramStore>((set) => ({
    programs: [],
    setPrograms: (programs) => set({ programs }),
    addPrograms: (program:ProgramType) => set((state) => ({
        programs: [...state.programs, program]
    })),
    updatePrograms: (id, program) => set((state) => ({
        programs: state.programs.map((p) => p.id === id ? { ...p, ...program } : p)
    })),
    updatePlan:(id,plan)=>set((state)=>({
      programs:state.programs.map((p)=>p.id===id?{...p,plan_data:plan}:p)
    })),
    deletePrograms: (id) => set((state) => ({
        programs: state.programs.filter((p) => p.id !== id)
    }))
}));