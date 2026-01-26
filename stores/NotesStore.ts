import { create } from "zustand";
import { ProfileType } from "./ProfilesStore";

export interface NotesType{
  id: string,
  from_profile_id: ProfileType,
  to_profile_id: ProfileType,
  message: string,
  created_at: string
};

export type NoteForm=Omit<NotesType, 'id' | 'created_at' | 'from_profile_id'|'to_profile_id'>;

export interface NotesStoreType{
  notes: NotesType[];
  setNotes: (notes: NotesType[]) => void;
  addNote: (note: NotesType) => void;
  deleteNote: (id: string) => void;
  updateNote: (id:string,updatedNote: NotesType) => void;
};

export const useNotes=create<NotesStoreType>((set)=>({
  notes: [],
  setNotes: (notes)=>set({notes}),
  addNote: (note)=>set((state) => ({ notes: [...state.notes, note] })),
  deleteNote: (id)=>set((state) => ({ notes: state.notes.filter(note => note.id !== id) })),
  updateNote: (id, updatedNote)=>set((state) => ({
    notes: state.notes.map(note => note.id === id ? {...note, ...updatedNote} : note)
  })),
}));
