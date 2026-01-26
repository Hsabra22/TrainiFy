import { ProfileForm } from "@/stores/ProfilesStore";
import { TrainerForm, TrainerType } from "@/stores/TrainerStore";
import { UserType } from "@/stores/UsersStore";
import { supabase } from "@/supabaseClient";

export const getTrainers = async (): Promise<TrainerType[]> => {
  const { data, error } = await supabase
    .from("trainers")
    .select(`
      *,profile_id(email,role,fullName,username,phone,image_url,user_id,*)
    `)
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error("No Trainers Found!");

  return data as TrainerType[];
};

export const getTrainerData=async():Promise<TrainerType>=>{
  const res=await fetch("/api/userId",{
    method:"GET",
    credentials: "include"
});
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
}
   const { user_id: profile_id } = await res.json();
   const { data, error } = await supabase
         .from("trainers")
         .select("*,is_approved,profile_id(*)")
         .eq("profile_id", profile_id)
         .select("*,profile_id(email,role,fullName,username,phone,image_url)")
         .maybeSingle();
   if (error) throw new Error(error.message);
   if (!data) throw new Error("Trainer not found");
   return data as TrainerType;
}


export const createTrainer=async({newTrainer,newTrainerInfo,password}:{newTrainer:ProfileForm,newTrainerInfo:TrainerForm,password:string}):Promise<TrainerType>=>{
    const {data,error}=await supabase.auth.signUp({
        email:newTrainer.email,
        password:password
    });
    if(error){
        throw new Error(error.message);
    }if(!data){
        throw new Error("Error while adding trainer")
    };
    const user_id=data.user?.id;
   const {data:image,error:imageError}=await supabase
          .storage
          .from("images")
          .upload(newTrainer.image_url.name,newTrainer.image_url)
          if (imageError) {
            throw new Error(`Error uploading image: ${imageError.message}`);
        }
        const image_url=image.path;

    const {data:profileData,error:profileError}=await supabase
        .from("profiles")
        .insert({
            user_id:user_id,
            fullName:newTrainer.fullName,
            phone:newTrainer.phone,
            role:newTrainer.role,
            email:data.user?.email,
            username:newTrainer.username,
            image_url:image_url
        })
        .select("*")
        .single();
          if(profileError){
            throw new Error(profileError.message)
          }if(!profileData){
            throw new Error("Error while adding profile")
          }
    const {data:trainer,error:trainerError}=await supabase
        .from("trainers")
        .insert({
            profile_id:user_id,
            bio:newTrainerInfo.bio,
            specialization:newTrainerInfo.specialization,
            experience_years:newTrainerInfo.experience_years,
            is_approved:newTrainerInfo.is_approved
        }).select("*,profile_id(*,user_id)").single();
        if(trainerError){
            throw new Error(trainerError.message)
        }if(!trainer){
            throw new Error("Error while adding trainer")
        };
    return trainer as TrainerType;
};

export const getTrainerUsers=async():Promise<UserType[]>=>{
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
         .select("*,profile_id(*),trainer_id(*)")
         .eq("trainer_id",trainer_id)
         .select("*,profile_id(fullName,email,phone,username,user_id,image_url,role,*),trainer_id(*)");
         if(error){
          throw new Error(error.message)
         }if(!data){
          throw new Error("No Users Till Now!")
         };
   return data as UserType[];
}
