import { useRequest } from "@/stores/RequestStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchTrainerRequests, FetchUserRequests,FetchRequests } from "../QUERIES/UseQueries";
import { useEffect } from "react";
import { acceptRequest, cancelRequest, createRequest } from "@/lib/FecthRequests";
import { toast } from "sonner";

export function useGetRequests(){
    const {requests,setRequests}=useRequest();
    const {data}=useQuery(FetchRequests());
    useEffect(()=>{
        if(data){
            setRequests(data)
        }
    },[data,setRequests]);
    return requests;
};

export function useGetTrainerRequests(){
    const {trainerRequest,setTrainerRequests}=useRequest();
    const {data}=useQuery(FetchTrainerRequests());
    useEffect(()=>{
        if(data){
            setTrainerRequests(data)
        }
    },[data,setTrainerRequests]);
    return trainerRequest;
};
export function useGetUserRequests(){
    const {userRequest,setUserRequests}=useRequest();
    const {data}=useQuery(FetchUserRequests());
    useEffect(()=>{
        if(data){
            setUserRequests(data)
        }
    },[data,setUserRequests]);
    return userRequest;
};

export function useAddRequest(){
    const addRequest=useRequest((state)=>state.addRequest);
    return(
        useMutation({
            mutationFn:createRequest,
            onSuccess:(data)=>{
                addRequest(data);
                toast.success(`Request sent from ${data.user_id.fullName} to ${data.trainer_id.fullName} successfully!`)
            },onError:(error)=>{
                toast.error(error.message)
            }
        })
    )
};

export function useAcceptRequest(){
    const requestDone=useRequest((state)=>state.requestDone);
    return(
        useMutation({
            mutationFn:acceptRequest,
            onSuccess:(data)=>{
                requestDone(data);
                toast.success(`Request from ${data.user_id.fullName} accepted successfully!`)
            },onError:(error)=>{
                toast.error(error.message)
}}))};
export function useCancelRequest(){
    const requestFail=useRequest((state)=>state.requestFail);
    return(
        useMutation({
            mutationFn:cancelRequest,
            onSuccess:(data,variables)=>{
                requestFail(variables.id);
                toast.success(`Request from ${data.user_id.fullName} cancelled successfully!`)
            },onError:(error)=>{
                toast.error(error.message)
            }
        })
    )
}