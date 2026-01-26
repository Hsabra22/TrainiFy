import { create } from "zustand"
import { ProfileType } from "./ProfilesStore"

export interface RequestType{
    id:string,
    user_id:ProfileType,
    trainer_id:ProfileType,
    status:string,
    created_at:string
}
export interface RequestStore{
    trainerRequest:RequestType[],
    setTrainerRequests:(requests:RequestType[])=>void,
    userRequest:RequestType[],
    setUserRequests:(requests:RequestType[])=>void,
    requests:RequestType[],
    setRequests:(requests:RequestType[])=>void,
    addRequest:(request:RequestType)=>void,
    requestDone:(request:RequestType)=>void,
    requestFail:(id:string)=>void,
    updateStatus:(id:string,status:string)=>void
};
export const useRequest=create<RequestStore>((set)=>({
    trainerRequest:[],
    setTrainerRequests:(requests:RequestType[])=>set({trainerRequest:requests}),
    userRequest:[],
    setUserRequests:(requests:RequestType[])=>set({userRequest:requests}),
    requests:[],
    setRequests:(requests:RequestType[])=>set({requests}),
    addRequest:(request:RequestType)=>set((state)=>({
        requests:[...state.requests,request]
    })),
    requestDone:(request:RequestType)=>set((state)=>({
        requests:state.requests.map((state)=>state.id===request.id?({...state,status:"accepted"}):(state))
    })),
    requestFail:(id:string)=>set((state)=>({
        requests:state.requests.filter((request)=>request.id!==id)
    })),
    updateStatus:(id:string,status:string)=>set((state)=>({
        requests:state.requests.map((state)=>state.id===id?({...state,status:status}):(state))
    }))
}))