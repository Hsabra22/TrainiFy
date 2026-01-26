import { create } from "zustand";

export interface ProfileType {
    id: string;
    user_id: string;
    fullName: string;
    username:string,
    email:string,
    phone: string,
    image_url:string,
    role:string,
    created_at: string;
}
export type ProfileForm = {
    fullName: string;
    username:string,
    email:string,
    phone: string,
    image_url:File,
    role:string,
}

export interface ProfilesStore {
    profiles: ProfileType[];
    setProfiles: (profiles: ProfileType[]) => void;
    addProfile: (profile: ProfileType) => void;
    updateProfile: (id: string, profile: ProfileType) => void;
    deleteProfile: (id: string) => void;
}
export const useProfiles = create<ProfilesStore>((set) => ({
    profiles: [],
    setProfiles: (profiles) => set({ profiles }),
    addProfile: (profile:ProfileType) => set((state) => ({
        profiles: [...state.profiles, profile]
    })),
    updateProfile: (id, profile) => set((state) => ({
        profiles: state.profiles.map((p) => p.id === id ? { ...p, ...profile } : p)
    })),
    deleteProfile: (id) => set((state) => ({
        profiles: state.profiles.filter((p) => p.id !== id)
    }))
}));