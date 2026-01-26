'use client'
import { Label } from "./ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {   Users, FileText, Check, Timer } from "lucide-react";
import Link from "next/link";
import { FilterTrainers } from "./Filter";
import { useSearchParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useGetTrainers } from "@/hooks/MUTATION/UseMutationTrainers";

export const TrainersList=()=>{
    const trainers=useGetTrainers();
    const approved=trainers.filter((trainer)=>trainer.is_approved)
    const notApproved=trainers.filter((trainer)=>!trainer.is_approved)
    const searchParams=useSearchParams();
    const nameFilter=searchParams.get("name")?.toLowerCase().trim();
    const statusFilter=searchParams.get("status")?.toLowerCase();
    const yoeFilter=searchParams.get("experience")?.toLowerCase();
    let filteredTrainers=[...trainers];
        if(nameFilter){
            filteredTrainers=filteredTrainers.filter((trainer)=>
            trainer.profile_id.fullName.toLowerCase().trim().includes(nameFilter)
            )
        }if(statusFilter){
            filteredTrainers=filteredTrainers.filter((trainer)=>
            statusFilter==="approved"?(trainer.is_approved):(!trainer.is_approved)
            )
        }if(yoeFilter){
            filteredTrainers=filteredTrainers.filter((trainer)=>
            trainer.experience_years.includes(yoeFilter)
            )
        }

    return(
        <div className="p-2 shadow-2xs bg-gray-100">
                    <div className="grid p-2 grid-cols-1 gap-3 ">
                        <div className="flex p-2 justify-between">
                            <div className="flex flex-col p-2 gap-2">
                                <Label className="text-3xl font-extrabold tracking-tight">Trainers Management</Label>
                                <Label className="text-xl text-muted-foreground font-mono">Manage and approve trainers on the platform</Label>
                            </div>
                        </div>
                    <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-3 p-2">
                    <Link href={"/Admin/users"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between items-center min-h-24">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Total Trainers</Label>
                                <Label>{trainers?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-blue-500/15 shadow-md shadow-green-500/30">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/request"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between items-center min-h-24">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Approved</Label>
                                <Label className="text-xl">{approved?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/requests"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between items-center min-h-24">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Pending </Label>
                                <Label className="text-xl">{notApproved?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <Timer className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    </div>
                        <div className="p-2">
                            <Card className="bg-white w-full rounded-xl">
                            <CardHeader></CardHeader>
                            <FilterTrainers/>
                            <CardFooter></CardFooter>
                        </Card>
                        </div>
                        <div className="p-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>All Users ({filteredTrainers.length})</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <Table className="w-full border-separate border-spacing-y-3">
                                  <TableHeader>
                                    <TableRow className="bg-linear-to-r from-indigo-200 via-purple-100 to-pink-100 shadow-md rounded-xl">
                                      <TableHead className="px-4 py-3 text-xs font-bold uppercase">Trainer</TableHead>

                                      <TableHead className="table-cell px-4 py-3 text-xs font-bold uppercase">
                                        Specialization
                                      </TableHead>

                                      <TableHead className="table-cell px-4 py-3 text-xs font-bold uppercase">
                                        Experience
                                      </TableHead>

                                      <TableHead className="table-cell px-4 py-3 text-xs font-bold uppercase">
                                        Phone
                                      </TableHead>

                                      <TableHead className="px-4 py-3 text-xs font-bold uppercase">
                                        Status
                                      </TableHead>

                                      <TableHead className="table-cell px-4 py-3 text-xs font-bold uppercase">
                                        Joined
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                
                                  <TableBody>
                                    {filteredTrainers.map((trainer, idx) => (
                                      <TableRow
                                        key={idx}
                                        className="bg-white/60 backdrop-blur-lg rounded-xl shadow transition"
                                      >
                                        <TableCell className="px-4 py-3">
                                          <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-linear-to-tr from-purple-200 to-pink-300 shadow-lg">
                                              <FileText className="h-6 w-6 text-pink-600" />
                                            </div>
                                            <div>
                                              <p className="text-sm font-semibold text-gray-800">
                                                {trainer.profile_id.fullName}
                                              </p>
                                              <p className="text-xs text-gray-500">
                                                {trainer.profile_id.email}
                                              </p>
                                            </div>
                                          </div>
                                        </TableCell>

                                        {/* Specialization */}
                                        <TableCell className=" table-cell px-4 py-3">
                                          <p className="text-sm">{trainer.specialization}</p>
                                        </TableCell>

                                        {/* Experience */}
                                        <TableCell className=" table-cell px-4 py-3">
                                          <p className="text-sm">{trainer.experience_years} yrs</p>
                                        </TableCell>

                                        {/* Phone */}
                                        <TableCell className=" table-cell px-4 py-3">
                                          <p className="text-sm">{trainer.profile_id.phone}</p>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell className="px-4 py-3">
                                          <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                              trainer.is_approved
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                          >
                                            {trainer.is_approved ? "Approved" : "Pending"}
                                          </span>
                                        </TableCell>

                                        <TableCell className="table-cell px-4 py-3">
                                          <p className="text-xs">
                                            {new Date(trainer.created_at).toLocaleDateString()}
                                          </p>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>

                                </Table>
                                
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
    )
}