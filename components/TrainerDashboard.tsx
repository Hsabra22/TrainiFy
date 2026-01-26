'use client'
import { useEffect, useState } from "react";
import { Label } from "./ui/label"
import { UserType } from "@/stores/UsersStore";
import { getTrainerData, getTrainerUsers } from "@/lib/FetchTrainers";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ClipboardList, ShieldCheck, FileTextIcon, TrendingUp, Users, ArrowRight,MessageSquare, CalendarDaysIcon } from "lucide-react";
import { useGetTrainerRequests } from "@/hooks/MUTATION/UseMutationRequests";
import { TrainerType } from "@/stores/TrainerStore";
import { Button } from "./ui/button";
import { UserProgramCard, UserTrainerCard } from "./UserCard";
import { getPendingRequests } from "@/lib/FecthRequests";
import Link from "next/link";
type UserData = {
  role:string,
  username:string,
  email:string,
  image_url:string,
  fullName:string,
  phone:string
};


export const TrainerDashboard=()=>{
  const links = [
    { href: "/Trainers/program", label: "Create New Program",icon:FileTextIcon },
    { href: "/Trainers/clients", label: "Message Clients ",icon:MessageSquare },
    { href: "/Trainers/requests", label: "Review Requests",icon:ClipboardList },
    { href: "/Trainers/profile", label: "Update Availability",icon:CalendarDaysIcon },
  ];
    const [name, setName] = useState<UserData| null>(null);
    const [users,setUsers]=useState<UserType[]|null>([]);
    const pending=useGetTrainerRequests().filter((req)=>req.status==="pending");
    const [trainer,setTrainer]=useState<TrainerType|null>(null);
    const [pendingRequests,setPendingRequests]=useState<UserType[]|null>([]);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch("/api/auth/signin", {
              method: "GET",
              credentials: "include",
            });
    
            if (!response.ok) {
              throw new Error("Unauthorized");
            }
    
            const json = await response.json();
            setName(json.data);
          } catch (err) {
            
          }
          const user=await getTrainerUsers();
          setUsers(user);
          const trainer=await getTrainerData();
          setTrainer(trainer);
          const pending=await getPendingRequests();
          setPendingRequests(pending);
        };
    
        getData();
      }, []);



    return(
        <div className="p-2  shadow-2xs bg-gray-100">
            <div className="grid p-2 grid-cols-1 gap-5 ">
                <div className="flex p-2 justify-between">
                    <div className="flex flex-col p-2 gap-2">
                        <Label className="text-3xl font-extrabold tracking-tight  ">Welcome back, {name?.fullName.split(" ")[0]}!</Label>
                        <Label className="text-xl text-muted-foreground font-mono">Here's what's happening with your clients today.</Label>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-3 p-2">
                    <Link href={"/Trainers/clients"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-25">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Total Clients</Label>
                                <Label>{users?.length}</Label>
                                <div className="flex gap-1">
                                    <TrendingUp className="text-base text-muted-foreground font-mono"/>
                                    <Label className="text-base text-muted-foreground font-mono">+2 this month</Label>
                                </div>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-blue-500/15 shadow-md shadow-green-500/30">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Trainers/program"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-25">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Active Programs</Label>
                                <Label>{users?.length}</Label>
                                <div className="flex gap-1">
                                    <TrendingUp className="text-base text-muted-foreground font-mono"/>
                                    <Label className="text-base text-muted-foreground font-mono">All up to date</Label>
                                </div>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <FileTextIcon className="w-6 h-6 text-green-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Trainers/requests"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-25">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Pending Requests</Label>
                                <Label>{pending?.length}</Label>
                                <div className="flex gap-1">
                                    <TrendingUp className="text-base text-muted-foreground font-mono"/>
                                    <Label className="text-base text-muted-foreground font-mono">Requires Actions</Label>
                                </div>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-red-500/15 shadow-md shadow-green-500/30">
                                <ClipboardList className="w-6 h-6 text-red-600" />
                            </div>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    </Link>
                    <Link href={"/Trainers/profile"}>
                    <Card>
                        <CardHeader><CardTitle></CardTitle></CardHeader>
                        <CardContent className="flex justify-between h-25">
                            <div className="flex flex-col gap-3">
                                <Label className="text-base text-muted-foreground font-mono">Approval Status</Label>
                                <Label className="text-xl">{trainer?.is_approved?"Approved":"Not Approved"}</Label>
                                <div className="flex gap-1">
                                    <TrendingUp className="text-base text-muted-foreground font-mono"/>
                                    <Label className="text-base text-muted-foreground font-mono">Profile Verified</Label>
                                </div>
                            </div>
                            <div className=" h-12 p-3 rounded-full bg-green-500/15 shadow-md shadow-green-500/30">
                                <ShieldCheck className="w-6 h-6 text-green-600" />
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
                                <CardTitle>Pending Requests</CardTitle>
                                <CardDescription>New clients waiting for your response</CardDescription>
                            </div>
                           <Link href={"/Trainers/requests"}>
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
                          {pendingRequests?.map((user, idx) => (
                            <UserTrainerCard key={idx} user={user} />
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex justify-between">
                            <div>
                                <CardTitle>Recent Clients</CardTitle>
                                <CardDescription>Your newest active clients</CardDescription>
                            </div>
                          <Link href={"/Trainers/clients"}>
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
                          {users?.slice(0,1).map((user, idx) => (
                            <UserTrainerCard key={idx} user={user} />
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="grid lg:grid-cols-[7fr_3fr] grid-cols-1 gap-3 ">
                    <Card>
                        <CardHeader className="flex justify-between">
                            <div>
                                <CardTitle>Active Programs</CardTitle>
                                <CardDescription>Training programs for your clients</CardDescription>
                            </div>
                            <Link href={"/Trainers/clients"}>
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
                        <CardContent className="grid grid-cols-1 ">
                          {users?.map((user, idx) => (
                            <UserProgramCard key={idx} user={user} />
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex justify-between">
                            <div>
                                <CardTitle>Quick Actions  </CardTitle>
                                <CardDescription>Common tasks and shortcuts</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center items-center ">
                          {links?.map((link, idx) => (
                            <div key={idx} className="grid grid-cols-1 gap-2 p-3">
                              <Link
                              key={idx}
                              href={link.href}
                              className="flex w-70 items-center gap-3 p-3 rounded-lg border border-gray-400 bg-white text-black hover:bg-gray-100 transition"
                              >
                              <link.icon className="w-5 h-5" />
                                <span className="flex-1 text-sm font-medium">
                                  {link.label}
                                </span>
                              </Link>
                            </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}