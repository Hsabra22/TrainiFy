'use client'
import { Label } from "./ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {   Users, FileText, Check, Timer, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FilterRequests } from "./Filter";
import { useSearchParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useGetRequests } from "@/hooks/MUTATION/UseMutationRequests";

export const UsersTrainers=()=>{
    const requests=useGetRequests();
    const accepted=requests.filter((request)=>(
        request.status.toLowerCase()==="accepted"
    ));
    const rejected=requests.filter((request)=>(
        request.status.toLowerCase()==="rejected"
    ));
    const pending=requests.filter((request)=>(
        request.status.toLowerCase()==="pending"
    ));

    const searchParams=useSearchParams();
    const nameFilter=searchParams.get("name")?.toLowerCase().trim();
    const statusFilter=searchParams.get("status")?.toLowerCase();
    let filteredRequests=[...requests];
        if(nameFilter){
            filteredRequests=filteredRequests.filter((request)=>
            request.status.toLowerCase().trim().includes(nameFilter.toLowerCase().trim())
            )
        }if(statusFilter){
            filteredRequests=filteredRequests.filter((request)=>
            request.status.toLowerCase().includes(statusFilter.toLowerCase())
            )
        }

    return(
        <div className="p-2 shadow-2xs bg-gray-100">
                    <div className="grid p-2 grid-cols-1 gap-3 ">
                        <div className="flex p-2 justify-between">
                            <div className="flex flex-col p-2 gap-2">
                                <Label className="text-3xl font-extrabold tracking-tight">User-Trainer History</Label>
                                <Label className="text-xl text-muted-foreground font-mono">Track all connections between users and trainers</Label>
                            </div>
                        </div>
                    <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-3 p-2">
                    <Link href={"/Admin/users"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between items-center min-h-24">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Total Records</Label>
                                <Label>{requests?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-blue-500/15 shadow-md shadow-green-500/30">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/users"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between items-center min-h-24">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Active</Label>
                                <Label className="text-xl">{pending?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/users"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between items-center min-h-24">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Completed </Label>
                                <Label className="text-xl">{accepted?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <Timer className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/users"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between items-center min-h-24">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Cancelled</Label>
                                <Label className="text-xl">{rejected?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <X className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    </div>
                        <div className="p-2">
                            <Card className="bg-white w-full rounded-xl">
                            <CardHeader></CardHeader>
                            <FilterRequests/>
                            <CardFooter></CardFooter>
                        </Card>
                        </div>
                        <div className="p-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Connection History ({filteredRequests.length})</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <Table className="w-full border-separate border-spacing-y-3">
                                        <TableHeader>
                                            <TableRow className="bg-linear-to-r from-indigo-200 via-purple-100 to-pink-100 shadow-md rounded-xl">
                                            <TableHead className="px-4 py-3 text-xs font-bold uppercase">
                                                User
                                            </TableHead>

                                            <TableHead className="px-4 py-3 text-xs font-bold uppercase text-center">
                                            
                                            </TableHead>

                                            <TableHead className="px-4 py-3 text-xs font-bold uppercase">
                                                Trainer
                                            </TableHead>

                                            <TableHead className="px-4 py-3 text-xs font-bold uppercase">
                                                Status
                                            </TableHead>

                                            <TableHead className="px-4 py-3 text-xs font-bold uppercase">
                                                Start Date
                                            </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredRequests.map((request, idx) => (
                                            <TableRow
                                                key={idx}
                                                className="bg-white/60 backdrop-blur-lg rounded-xl shadow transition"
                                            >
                                                {/* User */}
                                                <TableCell className="px-4 py-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-linear-to-tr from-purple-200 to-pink-300 shadow-lg">
                                                    <FileText className="h-6 w-6 text-pink-600" />
                                                    </div>
                                                    <div>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {request.user_id.fullName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {request.user_id.email}
                                                    </p>
                                                    </div>
                                                </div>
                                                </TableCell>

                                                {/* Arrow */}
                                                <TableCell className="px-4 py-3 text-center">
                                                <ArrowRight className="mx-auto text-gray-400" />
                                                </TableCell>

                                                {/* Trainer */}
                                                <TableCell className="px-4 py-3">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                    {request.trainer_id.fullName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                    {request.trainer_id.email}
                                                    </p>
                                                </div>
                                                </TableCell>

                                                {/* Status */}
                                                <TableCell className="px-4 py-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    request.status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : request.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {request.status}
                                                </span>
                                                </TableCell>

                                                {/* Start Date */}
                                                <TableCell className="px-4 py-3">
                                                <p className="text-xs">
                                                    {new Date(request.created_at).toLocaleDateString()}
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