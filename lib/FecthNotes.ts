import { NoteForm, NotesType } from "@/stores/NotesStore";
import { supabase } from "@/supabaseClient";

export const getUserNotes=async():Promise<NotesType[]>=>{
    const res=await fetch("/api/userId",{
    method:"GET",
    credentials: "include"
});
    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user authentication");
}
   const { user_id: user_id } = await res.json();
   const {data,error}=await supabase
         .from("notes")
         .select("*,to_profile_id(*),from_profile_id(*)")
         .eq("to_profile_id",user_id);
         if(error){
            throw new Error(error.message)
         }if(!data){
            throw new Error("No Message Till Now")
         };
    return data as NotesType[];
};
export const getTrainerNotesHistory=async():Promise<NotesType[]>=>{
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
         .from("notes")
         .select("*,to_profile_id(*),from_profile_id(*)")
         .eq("from_profile_id",trainer_id);
         if(error){
            throw new Error(error.message)
         }if(!data){
            throw new Error("No Message Till Now")
         };
    return data as NotesType[];
};

export const sendMessageToClient=async({note,user_id}:{note:NoteForm,user_id:string}):Promise<NotesType>=>{
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
         .from("notes")
         .insert({
            to_profile_id:user_id,
            from_profile_id:trainer_id,
            message:note.message
         })
         .select("*,to_profile_id(*),from_profile_id(*)")
         .single();
         if(error){
            throw new Error(error.message)
         }if(!data){
            throw new Error("No Message Till Now")
         };
    return data as NotesType;
}