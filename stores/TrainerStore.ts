import { create } from "zustand"
import { ProfileType } from "./ProfilesStore"

export interface TrainerType{
    id:string,
    profile_id:ProfileType,
    bio:string,
    specialization:string,
    experience_years:string,
    is_approved:boolean,
    created_at:string
};
export type TrainerForm=Omit<TrainerType,'id'|'profile_id'|'created_at'>

export interface TrainerStore{
    trainers:TrainerType[],
    setTrainers:(trainers:TrainerType[])=>void,
    addTrainer:(trainer:TrainerType)=>void,
    deleteTrainer:(id:string)=>void,
    updateTrainer:(id:string,newTrainer:TrainerType)=>void
}
export const useTrainer=create<TrainerStore>((set)=>({
    trainers:[],
    setTrainers:(trainers)=>set({trainers}),
    addTrainer:(trainer:TrainerType)=>set((state)=>({
        trainers:[...state.trainers,trainer]
    })),
    deleteTrainer:(id:string)=>set((state)=>({
        trainers:state.trainers.filter((trainer)=>trainer.id!==id)
    })),
    updateTrainer:(id:string,newTrainer:TrainerType)=>set((state)=>({
        trainers:state.trainers.map((trainer)=>trainer.id===id?({...trainer,newTrainer}):(trainer))
    }))}
))
