'use client'
import { getTrainerData, getTrainerUsers } from "@/lib/FetchTrainers";
import { TrainerType } from "@/stores/TrainerStore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getImageUrl } from "@/lib/FetchProfiles";
import { Mail, Phone, Timer, UserCheck } from "lucide-react";
import { UserType } from "@/stores/UsersStore";
import { UserCard } from "./UserCard";

export const TrainerProfile=()=>{
    const [trainer,setTrainer]=useState<TrainerType|null>(null);
    const [signedUrl,setSignedUrl]=useState<string|null>(null);
    const [users,setUsers]=useState<UserType[]|null>([]);
    useEffect(()=>{
        const handle=async()=>{
            const trainerData=await getTrainerData();
            setTrainer(trainerData);
            const image=await getImageUrl(trainerData.profile_id.image_url,1000);
            setSignedUrl(image);
            const user=await getTrainerUsers();
            setUsers(user);
        };handle();
    },[]);
    if(!trainer){
        return <div>Loading...</div>
    };
    return(
<div className="flex justify-center w-full bg-gray-50 py-10">
  <div className="w-full max-w-7xl px-4">
    <div className="grid gap-8">

      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8">

        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">

              <div className="relative shrink-0">
                <img
                  src={signedUrl || "/file.svg"}
                  alt="Profile Picture"
                  className="w-36 h-36 object-cover rounded-2xl border shadow-sm"
                />
                <span
                  className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full text-white
                  ${trainer.is_approved ? "bg-green-500" : "bg-yellow-500"}`}
                >
                  {trainer.is_approved ? "Verified Trainer" : "Pending Approval"}
                </span>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <h2 className="text-2xl font-bold">
                    {trainer.profile_id.fullName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    @{trainer.profile_id.username}
                  </p>
                </div>

                <p className="text-sm font-medium text-primary">
                  {trainer.specialization}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    <span>{trainer.experience_years} years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    <span>{users?.length} active clients</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Contact Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-muted">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">
                  {trainer.profile_id.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-muted">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">
                  {trainer.profile_id.phone}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-8">
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {trainer.bio}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
        </CardHeader>

        <CardContent>
          {users && users.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No users found.
            </p>
          )}
        </CardContent>
      </Card>

    </div>
  </div>
</div>

    )
}