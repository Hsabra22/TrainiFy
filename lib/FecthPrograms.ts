import { DayData, PlanType, ProgramForm, ProgramType, ProgramUpdate } from "@/stores/ProgramsStore";
import { supabase } from "@/supabaseClient";


export const getUserProgram=async():Promise<ProgramType[]>=>{
    const res=await fetch("/api/userId",{
    method:"GET",
    credentials: "include"
});
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
}
   const { user_id: profile_id } = await res.json();
    const {data,error}=await supabase
           .from("programs")
           .select("*,user_id(*)")
           .eq("user_id",profile_id)
           .single();
           if(error){
               throw new Error(error.message);
           }if(!data){
               throw new Error("No data Founded , Missing Auth");
           };
       return data as ProgramType[];
};

export const addUserProgram=async(newProgram:ProgramForm):Promise<ProgramType>=>{
    const res=await fetch("/api/userId",{
    method:"GET",
    credentials: "include"
});
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
}
   const { user_id: user_id } = await res.json();
   const {data:check,error:checkError}=await supabase
         .from("programs")
         .select("*")
         .eq("user_id",user_id)
         .select("*")
         .maybeSingle();

         if (checkError) {
            throw new Error(checkError.message);
        }
        if (check) {
            throw new Error("Already have a program");
        }
    const {data,error}=await supabase
        .from("programs")
        .insert({
            user_id:user_id,
            created_by:"ai",
            plan_data:newProgram.plan_data,
            last_updated_by:"ai",
        })
        .select("*,user_id(*)")
        .single();
        if(error){
            throw new Error(error.message);
        }if(!data){
            throw new Error("No data Founded , Missing Auth");
        };
    return data as ProgramType;
};

export const getUserProgramPlan=async():Promise<PlanType>=>{
    const res=await fetch("/api/userId",{
    method:"GET",
    credentials: "include"
});
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
}
   const { user_id: user_id } = await res.json();
   const { data, error } = await supabase
  .from("programs")
  .select("plan_data")
  .eq("user_id", user_id)
  .maybeSingle();

if (error) throw new Error(error.message);
if (!data) throw new Error("No program found for this user");

return data.plan_data as PlanType;
};

export const getUserProgramPlanById=async({id}:{id:string}):Promise<PlanType>=>{
   const { data, error } = await supabase
  .from("programs")
  .select("plan_data")
  .eq("id", id)
  .maybeSingle();

if (error) throw new Error(error.message);
if (!data) throw new Error("No program found for this user");

return data.plan_data as PlanType;
};

export const editUserPlanByTrainer=async({id,plan}:{id:string,plan:PlanType}):Promise<PlanType>=>{
   const { data, error } = await supabase
  .from("programs")
  .update({
    plan_data:plan
  })
  .eq("id", id)
  .select("*,user_id(*)")
  .maybeSingle();

if (error) throw new Error(error.message);
if (!data) throw new Error("No program found for this user");

return data as PlanType;
};

export const editUserProgramByTrainer=async({id,program}:{id:string,program:ProgramUpdate}):Promise<ProgramType>=>{
    const response = await fetch("/api/auth/signin", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const json = await response.json();
   const { data, error } = await supabase
  .from("programs")
  .update({
    updated_at:program.updated_at,// new Date().toISOString(),
    last_updated_by:program.last_updated_by,//json.data.fullName
  })
  .eq("id", id)
  .select("*,user_id(*)")
  .maybeSingle();

if (error) throw new Error(error.message);
if (!data) throw new Error("No program found for this user");

return data as ProgramType;
};


export const getTrainerPrograms=async():Promise<ProgramType[]>=>{
  const res=await fetch("/api/userId",{
    method:"GET",
    credentials: "include"
});
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
}
   const { user_id: trainer_id } = await res.json();
   const {data,error}=await supabase
         .from("userDetails")
         .select("profile_id")
         .eq("trainer_id",trainer_id);
         if(error){
          throw new Error(error.message)
         }
         if(!data){
          throw new Error("No data found")
         };

  const users=data.map((u)=>u.profile_id)
  const {data:user,error:userError}=await supabase
         .from("programs")
         .select("*,user_id(*)")
         .in("user_id",users);
         if(userError){
          throw new Error(userError.message)
         }if(!user){
          throw new Error("No Data Founded!")
         };
    return user as ProgramType[];
}


export const getCaloriesByDay=(plan:PlanType,day:string)=>{
    return plan.PlanType.find((p)=>p.day===day)?.calories??0;
}

export const selectProgramByDay = (
  program: PlanType | undefined,
  day: string
): DayData => {
  if (!program?.PlanType) {
    return {
      day,
      date: "",
      calories: 0,
      mealsCount: 0,
      workoutType: "Rest",
      meals: [],
      workouts: [],
      schedule: [],
    }
  }

  const selectedDay = program.PlanType.find(d => d.day === day)

  if (!selectedDay) {
    return {
      day,
      date: "",
      calories: 0,
      mealsCount: 0,
      workoutType: "Rest",
      meals: [],
      workouts: [],
      schedule: [],
    }
  }

  return selectedDay
}

