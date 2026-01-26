import { useTrainer } from "@/stores/TrainerStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchTrainers } from "../QUERIES/UseQueries";
import { useEffect } from "react";
import { createTrainer } from "@/lib/FetchTrainers";
import { toast } from "sonner";


export function useGetTrainers(){
    const {trainers,setTrainers}=useTrainer();
    const {data}=useQuery(FetchTrainers());
    useEffect(()=>{
        if(data){
            setTrainers(data)
        }
    },[data,setTrainers])
    return trainers;
};
export function useAddTrainers(){
    const addTrainer=useTrainer((state)=>state.addTrainer);
    return(
        useMutation({
            mutationFn:createTrainer,
            onSuccess:(data)=>{
                addTrainer(data);
                toast.success(`${data.profile_id.fullName} added successfully`)
            },onError:(error)=>{
                toast.error(error.message)
            }
        })
    )
}