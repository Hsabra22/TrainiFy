
import { supabase } from "@/supabaseClient";
import { ProfileForm,ProfileType } from "@/stores/ProfilesStore";


export const getUsers = async (): Promise<ProfileType[]> => {
    const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
        .order('id', { ascending: true });
    if (error || !users) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
    return users as ProfileType[];
}

export const deleteUserFromSupabase = async ({ id }: { id: string }): Promise<ProfileType> => {
    const { data: user, error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)
        .select("*") 
        .single();
    if (error || !user) {
        throw new Error(`Error deleting user: ${error?.message}`);
    }
    return user as ProfileType
};

export const updateUserInSupabase = async ({ id, profile }: { id: string, profile: ProfileType }): Promise<ProfileType> => {
    const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', id)
        .select("*")
        .single();

        if (error || !data) {
        throw new Error(`Error updating user: ${error?.message}`);
        }
        return data as ProfileType;
    }


export const signUp=async({email,password,profile}:{email:string,password:string,profile:ProfileForm}):Promise<ProfileType>=>{
    const {data:user,error:userError}=await supabase.auth.signUp({
        email,
        password
    });
    if(!user||userError){
        throw new Error( "User already exist");
    }
    const user_id = user.user?.id;
    console.log("Supabase signUp result:", user, userError);
    const {data:image,error:imageError}=await supabase
          .storage
          .from("images")
          .upload(profile.image_url.name,profile.image_url)
          if (imageError) {
            throw new Error(`Error uploading image: ${imageError.message}`);
        }
        const image_url=image.path;

    const {data:profileData,error:profileError}=await supabase
        .from("profiles")
        .insert({
            user_id:user_id,
            fullName:profile.fullName,
            phone:profile.phone,
            role:profile.role,
            email:user.user?.email,
            username:profile.username,
            image_url:image_url
        })
        .select("*")
        .single();
    if(profileError || !profileData){
    throw new Error(profileError?.message || "Profile creation failed");
    }
    
    return profileData as ProfileType;
}


export const getImageUrl=async(path:string,expire:number):Promise<string>=>{
    const {data,error}= await supabase.storage.from("images").createSignedUrl(path,expire);
    if(error){
        throw new Error(error.message);
    }if(!data){
        throw new Error("No Image Founded")
    };
    return data.signedUrl;
}


