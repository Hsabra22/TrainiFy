import { create } from "zustand";
import { ProfileType } from "./ProfilesStore";

export interface UserType{
    id:string,
    profile_id:ProfileType,
    goal:string,
    experience_level:string,
    height:string,
    weight:string,
    age:string,
    gender:string,
    available_days:string[],
    trainer_id:ProfileType|null,
    created_at:string
}

export type UserForm={
    goal:string,
    experience_level:string,
    height:string,
    weight:string,
    age:string,
    gender:string,
    available_days: { value: string }[];
}

export interface UserStore{
    users:UserType[],
    setUsers:(users:UserType[])=>void,
    addUser:(user:UserType)=>void,
    deleteUser:(id:string)=>void,
    update:(id:string,user:UserForm)=>void,
    updateTrainer:(id:string,newTrainer:ProfileType)=>void,
}

export const useUserStore=create<UserStore>((set)=>({
    users:[],
    setUsers:(users)=>set({users}),
    addUser:(user:UserType)=>set((state)=>({
        users:[...state.users,user]
    })),
    deleteUser:(id:string)=>set((state)=>({
        users:state.users.filter((user)=>user.id!==id)
    })),
    update:(id:string, newUser:UserForm)=>set((state)=>({
        users:state.users.map((user)=>user.id===id?({...user,newUser}):user)
    })),
    updateTrainer:(id:string,newTrainer:ProfileType)=>set((state)=>({
        users:state.users.map((state)=>state.id===id?({...state,trainer_id:newTrainer}):(state))
    }))
}))