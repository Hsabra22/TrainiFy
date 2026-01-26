'use client'
import { useEffect, useState } from "react";
import { Label } from "./ui/label"
import { UserType } from "@/stores/UsersStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { FileTextIcon, TrendingUp, Users, ArrowRight, Dumbbell, Check, Timer, Activity } from "lucide-react";
import { useGetRequests } from "@/hooks/MUTATION/UseMutationRequests";
import { Button } from "./ui/button";
import Link from "next/link";
import { getUsers } from "@/lib/FetchUsersDetails";
import { useGetTrainers } from "@/hooks/MUTATION/UseMutationTrainers";
import { RequestsCard } from "./AdminCards";
type UserData = {
  role:string,
  username:string,
  email:string,
  image_url:string,
  fullName:string,
  phone:string
};


export const Overview=()=>{
  const links = [
    { href: "/Admin/addTrainer", label: "Add New Trainer",icon:Dumbbell },
    { href: "/Admin/users", label: "Manage Users ",icon:Users },
    { href: "/Admin/requests", label: "Review Requests",icon:FileTextIcon },
  ];
    const [users,setUsers]=useState<UserType[]|null>([]);
    const requests=useGetRequests();
    const pending=requests.filter((req)=>req.status==="pending");
    const accepted=requests.filter((req)=>req.status==="accepted");
    const active=users?.filter((user)=>user.trainer_id);
    const trainers=useGetTrainers();
    const approved=trainers.filter((app)=>app.is_approved===true);

    useEffect(() => {
        const getData = async () => {
          const user=await getUsers();
          setUsers(user);
        };
    
        getData();
      }, []);



    return(
        <div className="p-2  shadow-2xs bg-gray-100">
            <div className="grid p-2 grid-cols-1 gap-5 ">
                <div className="flex p-2 justify-between">
                    <div className="flex flex-col p-2 gap-2">
                        <Label className="text-3xl font-extrabold tracking-tight  ">Admin Dashboard</Label>
                        <Label className="text-xl text-muted-foreground font-mono">Monitor and manage your fitness platform.</Label>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-3 p-2">
                    <Link href={"/Admin/users"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-25">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Total Users</Label>
                                <Label>{users?.length}</Label>
                                <div className="flex gap-1">
                                    <TrendingUp className="text-base text-muted-foreground font-mono"/>
                                    <Label className="text-base text-muted-foreground font-mono">{}</Label>
                                </div>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-blue-500/15 shadow-md shadow-green-500/30">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/trainers"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-25">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Trainers</Label>
                                <Label>{trainers?.length}</Label>
                                <div className="flex gap-1">
                                    <Check className="text-base text-muted-foreground font-mono"/>
                                    <Label className="text-base text-muted-foreground font-mono">{approved.length} approved</Label>
                                </div>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <Dumbbell className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/requests"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-25">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Pending Requests</Label>
                                <Label>{pending?.length}</Label>
                                <div className="flex gap-1">
                                    <Timer className="text-base text-muted-foreground font-mono"/>
                                    <Label className="text-base text-muted-foreground font-mono">Awaiting Review</Label>
                                </div>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-red-500/15 shadow-md shadow-green-500/30">
                                <FileTextIcon className="w-6 h-6 text-red-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Admin/users"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-25">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Active Connections</Label>
                                <Label className="text-xl">{active?.length}</Label>
                                <div className="flex gap-1">
                                    <Activity className="text-base text-muted-foreground font-mono"/>
                                    <Label className="text-base text-muted-foreground font-mono">User-trainer pairs</Label>
                                </div>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <Activity className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                  <Card>
                        <CardHeader className="flex justify-between">
                            <div>
                                <CardTitle>Recent Requests</CardTitle>
                            </div>
                           <Link href={"/Admin/requests"}>
                           <Button 
                           variant="ghost"
                           className=" cursor-pointer
                           group flex items-center gap-2
                           text-green-600
                           hover:text-white
                           hover:bg-green-500
                           px-4 py-2
                           rounded-full
                           transition-all duration-300
                           shadow-sm hover:shadow-md">
                            View All
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                           </Link>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-3">
                          {requests?.map((request, idx) => (
                            <RequestsCard key={idx} user={request} />
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex justify-between">
                            <div>
                                <CardTitle>User-Trainer History</CardTitle>
                            </div>
                          <Link href={"/Admin/users"}>
                           <Button
                           variant="ghost"
                           className=" cursor-pointer
                           group flex items-center gap-2
                           text-green-600
                           hover:text-white
                           hover:bg-green-500
                           px-4 py-2
                           rounded-full
                           transition-all duration-300
                           shadow-sm hover:shadow-md">
                            View All
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-3">
                          {accepted?.map((user, idx) => (
                            <RequestsCard key={idx} user={user} />
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full">
                    <Card>
                        <CardHeader className="flex justify-between">
                            <div>
                                <CardTitle>Quick Actions  </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-3 p-5">
                            {links?.map((link, idx) => (
                                <Link
                                key={idx}
                                href={link.href}
                                className="
                                    group flex items-center gap-4
                                    rounded-xl border border-border
                                    bg-background/70 backdrop-blur
                                    px-4 py-3
                                    transition-all duration-200
                                    hover:-translate-y-0.5
                                    hover:border-primary/40
                                    hover:bg-primary/5
                                    hover:shadow-lg
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-primary
                                "
                                >
                                <div
                                    className="
                                    flex h-10 w-10 items-center justify-center
                                    rounded-lg
                                    bg-primary/10
                                    text-primary
                                    transition-colors
                                    group-hover:bg-primary
                                    group-hover:text-primary-foreground
                                    "
                                >
                                    <link.icon className="h-5 w-5" />
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-foreground">
                                    {link.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                    View details
                                    </span>
                                </div>

                                <div className="ml-auto text-muted-foreground transition-transform group-hover:translate-x-1">
                                    →
                                </div>
                                </Link>
                            ))}
                            </CardContent>

                    </Card>
                </div>
            </div>
        </div>
    )
}