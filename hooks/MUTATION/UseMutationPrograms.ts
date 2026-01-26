import { usePrograms } from "@/stores/ProgramsStore";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { FetchUserPrograms } from "../QUERIES/UseQueries";
import { useEffect } from "react";
import { addUserProgram, editUserPlanByTrainer, editUserProgramByTrainer } from "@/lib/FecthPrograms";
import { toast } from "sonner";

export function useGetUserPrograms(){
    const {programs,setPrograms}=usePrograms();
    const {data}=useSuspenseQuery(FetchUserPrograms());
    useEffect(()=>{
        if(data){
            setPrograms(data)
        }
    },[data,setPrograms]);
    return programs;
};

export function useAddPrograms(){
    const createProgram=usePrograms((state)=>state.addPrograms);
    return(
        useMutation({
            mutationFn:addUserProgram,
            onSuccess:(data)=>{
                createProgram(data);
                toast.success(`${data.user_id.fullName}'s program created successfully`);
            },onError:(error)=>{
                toast.error(error.message)
            }
        })
    )
}

export function useUpdateProgram(){
    const updateProgram=usePrograms((state)=>state.updatePrograms);
    return(
        useMutation({
            mutationFn:editUserProgramByTrainer,
            onSuccess:(data,variables)=>{
                updateProgram(variables.id,variables.program);
                toast.success(` Program Updated Successfully by ${data.last_updated_by}`);
            },onError:(error)=>{
                toast.error(error.message)
            }
        })
    )
}
export function useUpdatePlan(){
    const updatePlan=usePrograms((state)=>state.updatePlan);
    return(
        useMutation({
            mutationFn:editUserPlanByTrainer,
            onSuccess:(data,variables)=>{
                updatePlan(variables.id,variables.plan);
            },onError:(error)=>{
                toast.error(error.message)
            }
        })
    )
}