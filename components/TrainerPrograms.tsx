'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import { ProgramType } from "@/stores/ProgramsStore"
import { getTrainerPrograms } from "@/lib/FecthPrograms"
import Link from "next/link"
import { TrainerProgramCard } from "./TrainerCard"

export const TrainerProgram=()=>{
    const [users,setUsers]=useState<ProgramType[]>([]);
    useEffect(()=>{
        const getData=async()=>{
            const users=await getTrainerPrograms();
            setUsers(users);
            
        };getData();
    },[])
    return(
<Card className="rounded-3xl shadow-2xl border border-border/20 overflow-hidden bg-linear-to-b from-white/60 to-white/20 backdrop-blur-lg">
  <CardHeader >
    <CardTitle className="text-3xl font-extrabold text-foreground tracking-tight">
      All Programs
    </CardTitle>
  </CardHeader>

  <CardContent className="p-2">
    <Table className="w-full border-separate border-spacing-y-3">
  <TableHeader>
    <TableRow className="bg-linear-to-r from-indigo-200 via-purple-100 to-pink-100 shadow-md rounded-xl">
      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
        Program Goal
      </TableHead>
      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
        Client
      </TableHead>
      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
        Last Updated
      </TableHead>
      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3 text-center">
        Actions
      </TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {users.map((user, idx) => (
      <TrainerProgramCard user={user} key={idx}/>
    ))}
  </TableBody>
</Table>

  </CardContent>
</Card>

    )
}