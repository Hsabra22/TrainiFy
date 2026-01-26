import { signUp } from "@/lib/FetchProfiles";
import { useProfiles } from "@/stores/ProfilesStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FetchUsers } from "../QUERIES/UseQueries";
import { useEffect } from "react";

export function useGetProfiles(){
    const {profiles,setProfiles}=useProfiles();
    const {data}=useQuery(FetchUsers());
    useEffect(()=>{
        if(data){
            setProfiles(data);
        }
    },[setProfiles,data]);
    return profiles;
}

export function useAddUsers(){
    const addUser = useProfiles((state) => state.addProfile);
    return useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            addUser(data);
            toast.success(`Account added successfully!`);
        },
        onError: (error) => {
            toast.error(`Error adding user: ${error.message}`);
        }
    });
}