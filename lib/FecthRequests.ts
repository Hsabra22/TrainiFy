import { RequestType } from "@/stores/RequestStore";
import { UserType } from "@/stores/UsersStore";
import { supabase } from "@/supabaseClient";

export const getRequests=async():Promise<RequestType[]>=>{
    const {data:requests,error}=await supabase
          .from("requests")
          .select("*,user_id(*),trainer_id(*)");
          if(error){
            throw new Error(error.message)
          }if(!requests){
            throw new Error("Error while fetching request")
          }
          return requests as RequestType[];
}

export const getUserRequests=async():Promise<RequestType[]>=>{
    const res=await fetch("/api/userId",{
    method:"GET",
    credentials: "include"
});
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
}
   const { user_id: user_id } = await res.json();
   const {data:requests,error}=await supabase
         .from("requests")
         .select("*,user_id(*),trainer_id(*)")
         .eq("user_id",user_id)
         .select("*,user_id(*),trainer_id(fullName,email,phone,username)");
         if(error){
            throw new Error(error.message)
         }if(!requests){
            throw new Error("Error while fetching request")
         };
    return requests as RequestType[];
}



export const getTrainerRequests=async():Promise<RequestType[]>=>{
    const res=await fetch("/api/userId",{
    method:"GET",
    credentials: "include"
});
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
}
   const { user_id: trainer_id } = await res.json();
   const {data:requests,error}=await supabase
         .from("requests")
         .select("*,user_id(*),trainer_id(*)")
         .eq("trainer_id",trainer_id)
         .select("*,user_id(*),trainer_id(fullName,email,phone,username)")
         if(error){
            throw new Error(error.message)
         }if(!requests){
            throw new Error("Error while fetching request")
         };
    return requests as RequestType[];
};

export const acceptRequest = async ({
  request,
}: {
  request: RequestType;
}): Promise<RequestType> => {
  const res = await fetch("/api/userId", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
  }

  const { user_id: trainer_id } = await res.json();

  const { data, error } = await supabase
    .from("requests")
    .update({ status: "accepted", trainer_id })
    .eq("id", request.id) 
    .select("*,user_id(*),trainer_id(*)")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Error while accepting request");

  const { error: acceptingError } = await supabase
    .from("userDetails")
    .update({ trainer_id })
    .eq("profile_id", request.user_id.user_id);

  if (acceptingError) throw new Error(acceptingError.message);

  return data as RequestType;
};


export const cancelRequest=async({id}:{id:string}):Promise<RequestType>=>{
  
   const { data, error } = await supabase
    .from("requests")
    .update({ status: "rejected" })
    .eq("id",id)
    .select("*,user_id(*),trainer_id(*)")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("Error while rejecting request");
  }
    return data as RequestType;
}


export const createRequest = async ({
  trainer_id,
}: {
  trainer_id: string;
}): Promise<RequestType> => {
  const res = await fetch("/api/userId", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
  }

  const { user_id } = await res.json();

  const {data:checkProgram,error:checkError}=await supabase
        .from("programs")
        .select("*")
        .eq("user_id",user_id);
        if(checkError)throw new Error(checkError.message);
        if (checkProgram.length === 0) {
          throw new Error("Cannot request a trainer before creating your plan!!");
        }


  const { data: request, error } = await supabase
    .from("requests")
    .insert({
      user_id,
      trainer_id,
      status: "pending",
    })
    .select(`
      *,user_id(*),trainer_id(*)
    `)
    .single();

  if (error) throw new Error("Cannot request more than one trainer   in the same time");
  if (!request) throw new Error("Error while sending request");

  return request as RequestType;
};


export const getPendingRequests=async():Promise<UserType[]>=>{
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
         .from("requests")
         .select("user_id")
         .eq("trainer_id",trainer_id)
         .eq("status","pending");
         if(error){
          throw new Error(error.message)
         }
         if(!data){
          throw new Error("No data found")
         };

         const users=data.map((u)=>u.user_id)

   const {data:user,error:userError}=await supabase
         .from("userDetails")
         .select("*,profile_id(*),trainer_id(*)")
         .in("profile_id",users);
         if(userError){
          throw new Error(userError.message)
         }if(!user){
          throw new Error("No Data Founded!")
         };
    return user as UserType[];
}
