'use client'
import { Rocket, Sprout, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Label } from "./ui/label"
import { useEffect, useState } from "react"
import { UserType } from "@/stores/UsersStore"
import { getTrainerUsers } from "@/lib/FetchTrainers"
import { ClientCard } from "./UserCard"
import { FilterClient } from "./Filter"
import { useSearchParams } from "next/navigation"


export const TrainerClients=()=>{
    const [users,setUsers]=useState<UserType[]>([]);
    const searchParams=useSearchParams();
    const experienceFilter=searchParams.get("experience_level")?.toLowerCase();
    const nameOrGoalFilter=searchParams.get("client")?.toLowerCase().trim();
    let filteredUsers=[...users];
    if(experienceFilter){
        filteredUsers=filteredUsers.filter((user)=>
        user.experience_level.toLowerCase().includes(experienceFilter)
        )
    };
    if(nameOrGoalFilter){
        filteredUsers=filteredUsers.filter((user)=>
        user.goal.toLowerCase().trim().includes(nameOrGoalFilter)||user.profile_id.fullName.toLowerCase().trim().includes(nameOrGoalFilter)
        )
    }
    useEffect(() => {
            const getData = async () => {
              const user=await getTrainerUsers();
              setUsers(user);
            };
            getData();
          }, []);
          
    return(
        <div className="p-2 shadow-2xs bg-gray-100">
            <div className="grid p-2 grid-cols-1 gap-3 ">
                <div className="flex p-2 justify-between">
                    <div className="flex flex-col p-2 gap-2">
                        <Label className="text-3xl font-extrabold tracking-tight">My Clients</Label>
                        <Label className="text-xl text-muted-foreground font-mono">Manage and view all your active clients.</Label>
                    </div>
                </div>
                <div className="p-2">
                    <Card className="bg-white w-full rounded-xl">
                    <CardHeader></CardHeader>
                    <FilterClient/>
                    <CardFooter></CardFooter>
                </Card>
                </div>
                <div className="grid p-2 grid-cols-1 lg:grid-cols-4 gap-5 ">
                <Card className="bg-white w-full rounded-xl shadow-sm hover:shadow-md transition">
                    <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                        <div className="p-3 rounded-full bg-muted">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-3xl font-bold">
                            {users?.length ?? 0}
                        </span>
                        <Label className="text-sm text-muted-foreground">
                            Total Clients
                        </Label>
                    </CardContent>
                </Card>

                <Card className="bg-white w-full rounded-xl shadow-sm hover:shadow-md transition">
                    <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                        <div className="p-3 rounded-full bg-muted">
                            <Sprout className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-3xl font-bold">
                            {users?.filter((u)=>u.experience_level==="beginner").length}
                        </span>
                        <Label className="text-sm text-muted-foreground">
                            Beginners
                        </Label>
                    </CardContent>
                </Card>
                <Card className="bg-white w-full rounded-xl shadow-sm hover:shadow-md transition">
                    <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                        <div className="p-3 rounded-full bg-muted">
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-3xl font-bold">
                            {users?.filter((u)=>u.experience_level==="intermediate").length}
                        </span>
                        <Label className="text-sm text-muted-foreground">
                            Intermediate
                        </Label>
                    </CardContent>
                </Card>
                <Card className="bg-white w-full rounded-xl shadow-sm hover:shadow-md transition">
                    <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                        <div className="p-3 rounded-full bg-muted">
                            <Rocket className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-3xl font-bold">
                            {users?.filter((u)=>u.experience_level==="advanced").length}
                        </span>
                        <Label className="text-sm text-muted-foreground">
                            Advanced
                        </Label>
                    </CardContent>
                </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredUsers?.map((user,idx)=>(
                        <ClientCard key={idx} user={user}/>
                    ))}
                </div>
            </div>
        </div>
    )
}