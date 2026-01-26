'use client'
import { useEffect, useState } from "react";
import { Label } from "./ui/label"
import { UserType } from "@/stores/UsersStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {   Users,  Activity, FileText } from "lucide-react";
import Link from "next/link";
import { getUsers } from "@/lib/FetchUsersDetails";
import { FilterUsers } from "./Filter";
import { useSearchParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export const UsersList=()=>{
    const [users,setUsers]=useState<UserType[]>([]);
    useEffect(() => {
        const getData = async () => {
          const user=await getUsers();
          setUsers(user);
        };
    
        getData();
      }, []);
    const active=users?.filter((user)=>user.trainer_id);
    const inactive=users?.filter((user)=>!user.trainer_id)
    const searchParams=useSearchParams();
    const nameFilter=searchParams.get("name")?.toLowerCase().trim();
    const levelFilter=searchParams.get("level")?.toLowerCase();
    let filteredUsers=[...users];
        if(nameFilter){
            filteredUsers=filteredUsers.filter((user)=>
            user.profile_id.fullName.toLowerCase().trim().includes(nameFilter)
            )
        }if(levelFilter){
            filteredUsers=filteredUsers.filter((user)=>
            user.experience_level.toLowerCase().trim().includes(levelFilter)
            )
        }

    return(
        <div className="p-2 shadow-2xs bg-gray-100">
                    <div className="grid p-2 grid-cols-1 gap-3 ">
                        <div className="flex p-2 justify-between">
                            <div className="flex flex-col p-2 gap-2">
                                <Label className="text-3xl font-extrabold tracking-tight">Users Management</Label>
                                <Label className="text-xl text-muted-foreground font-mono">View and manage all registered users</Label>
                            </div>
                        </div>
                    <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-3 p-2">
                    <Link href={"/Admin/users"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-20">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Total Users</Label>
                                <Label>{users?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-blue-500/15 shadow-md shadow-green-500/30">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/requests"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-20">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Active Connections</Label>
                                <Label className="text-xl">{active?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <Activity className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/requests"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-20">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Inactive </Label>
                                <Label className="text-xl">{inactive?.length}</Label>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <Activity className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                </div>
                        <div className="p-2">
                            <Card className="bg-white w-full rounded-xl">
                            <CardHeader></CardHeader>
                            <FilterUsers/>
                            <CardFooter></CardFooter>
                        </Card>
                        </div>
                        <div className="p-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>All Users ({filteredUsers.length})</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <Table className="w-full border-separate border-spacing-y-3">
                                  <TableHeader>
                                    <TableRow className="bg-linear-to-r from-indigo-200 via-purple-100 to-pink-100 shadow-md rounded-xl">
                                      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
                                        User
                                      </TableHead>
                                      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
                                        Email
                                      </TableHead>
                                      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
                                        Phone
                                      </TableHead>
                                      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
                                        Goal
                                      </TableHead>
                                      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
                                        Level
                                      </TableHead>
                                      <TableHead className="text-xs font-bold text-indigo-900 uppercase tracking-wider px-4 py-3">
                                        Joined
                                      </TableHead>

                                    </TableRow>
                                  </TableHeader>
                                
                                  <TableBody>
                                    {filteredUsers.map((user, idx) => (
                                      <TableRow
                                        key={idx}
                                        className="bg-white/60 backdrop-blur-lg rounded-xl shadow  transition-all transform "
                                      >
                                        <TableCell className="px-4 py-3">
                                          <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-linear-to-tr from-purple-200 to-pink-300 shadow-lg">
                                              <FileText className="h-6 w-6 text-pink-600" />
                                            </div>
                                            <p className="text-sm font-semibold text-gray-800 hover:text-pink-600 transition-colors">
                                              {user.profile_id.fullName}
                                            </p>
                                          </div>
                                        </TableCell>
                                
                                        <TableCell className="px-4 py-3">
                                          <p className="text-sm text-gray-600 font-medium">{user.profile_id.email}</p>
                                        </TableCell>
                                
                                        <TableCell className="px-4 py-3">
                                            <p className="text-xs">{user.profile_id.phone}</p>
                                        </TableCell>

                                        <TableCell className="px-4 py-3">
                                            <p className="text-xs">{user.goal}</p>
                                        </TableCell>

                                        <TableCell className="px-4 py-3">
                                            <p className="text-xs">{user.experience_level}</p>
                                        </TableCell>

                                        <TableCell className="px-4 py-3">
                                            <p className="text-xs">{new Date(user.created_at).toLocaleDateString()}</p>
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