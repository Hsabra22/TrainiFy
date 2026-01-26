import { useUserStore } from "@/stores/UsersStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchUserDetails } from "../QUERIES/UseQueries";
import { useEffect } from "react";
import { addUserDetails, editTrainer, editUserDetails } from "@/lib/FetchUsersDetails";
import { toast } from "sonner";

export function useGetUserDetails(){
    const {users,setUsers}=useUserStore();
    const {data}=useQuery(FetchUserDetails());
    useEffect(()=>{
        if(data){
            setUsers(data)
        }
    },[data,setUsers]);
    return users;
}

export function useAddUserDetails(){
    const addUser=useUserStore((state)=>state.addUser);
    return(
        useMutation({
            mutationFn:addUserDetails,
            onSuccess:(data)=>{
                addUser(data);
                toast.success(`Details of ${data.profile_id.fullName} added successfully`);
            },onError:(error)=>{
                toast.error(error.message)
            }
        })
    )
};

export function useUpdateDetails(){
    const update=useUserStore((state)=>state.update);
    return(
        useMutation({
            mutationFn:editUserDetails,
            onSuccess:(data,variables)=>{
                update(variables.id,variables.user)
                toast.success(`Details of ${data.profile_id.fullName} added successfully`);
            },onError:(error)=>{
                toast.error(error.message)
            }
        })
    )
}

