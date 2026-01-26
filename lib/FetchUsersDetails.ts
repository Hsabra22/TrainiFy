import { UserForm, UserType } from "@/stores/UsersStore";
import { supabase } from "@/supabaseClient";

export const getUsers=async():Promise<UserType[]>=>{
  const {data,error}=await supabase
        .from("userDetails")
        .select("*,profile_id(*),trainer_id(*)");
        if(error){
            throw new Error(error.message);
        }if(!data){
            throw new Error("No data Founded , Missing Auth");
        };
    return data as UserType[];
};

export const getUserDetails=async():Promise<UserType[]>=>{
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
        .from("userDetails")
        .select("*,profile_id(*),trainer_id(*)")
        .eq("profile_id",profile_id)
        .single();
        if(error){
            throw new Error(error.message);
        }if(!data){
            throw new Error("No data Founded , Missing Auth");
        };
    return data as UserType[];
};

export const addUserDetails = async (
  user: UserForm
): Promise<UserType> => {
  const res = await fetch("/api/userId", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
  }

  const { user_id: profile_id } = await res.json();

  const { data: check, error: checkError } = await supabase
    .from("userDetails")
    .select("*")
    .eq("profile_id", profile_id)
    .maybeSingle();

  if (checkError) {
    throw new Error(checkError.message);
  }

  if (check) {
    throw new Error("Already Details Are entered");
  }

  const { data, error } = await supabase
    .from("userDetails")
    .insert({
      age: user.age,
      goal: user.goal,
      available_days: user.available_days,
      experience_level: user.experience_level,
      weight: user.weight,
      height: user.height,
      gender: user.gender,
      profile_id: profile_id,
      trainer_id: null,
    })
    .select(`*,profile_id(*),trainer_id(*)`)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Error while adding user details");

  console.log("Added User Details:", data);

  return data as UserType;
};



export const editUserDetails = async ({id,user}:{id:string,user: UserForm}): Promise<UserType> => {
            const { data, error } = await supabase
                .from("userDetails")
                .update({
                    age: user.age,
                    goal: user.goal,
                    available_days: user.available_days,
                    experience: user.experience_level,
                    weight: user.weight,
                    height: user.height,
                    gender: user.gender
                })
                .eq("id", id)
                .select()
                .single();
            if (error) {
                throw new Error(error.message);
            }
            if (!data) {
                throw new Error("Error while editing user details");
            }
            return data as UserType;
        };


        export const editTrainer = async ({id,trainer_id}:{id:string,trainer_id:string}): Promise<UserType> => {
            const res = await fetch("/api/user", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to fetch user authentication");
            }

            const { data, error } = await supabase
                .from("userDetails")
                .update({ trainer_id })
                .eq("id", id)
                .select()
                .single();
            if (error) {
                throw new Error(error.message);
            }
            if (!data) {
                throw new Error("Error while updating trainer_id");
            }
            return data as UserType;
        };

export const getUserGoalByTime = async ({ time }: { time: string }): Promise<string> => {
  // Convert time to a Date object
  const targetDate = new Date(time);

  // Create ±1 minute range
  const start = new Date(targetDate.getTime() - 60_000).toISOString(); // 1 minute before
  const end = new Date(targetDate.getTime() + 60_000).toISOString();   // 1 minute after

  const { data, error } = await supabase
    .from("userDetails")
    .select("goal")
    .gte("created_at", start)
    .lte("created_at", end)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No Goal Found");

  return data.goal as string;
};
