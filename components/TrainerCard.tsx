import { getImageUrl } from "@/lib/FetchProfiles";
import { TrainerType } from "@/stores/TrainerStore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {Calendar, Edit, FileText, UserPlus2Icon} from "lucide-react"
import { useAddRequest } from "@/hooks/MUTATION/UseMutationRequests";
import { Dialog, DialogTrigger,DialogTitle,DialogContent } from "./ui/dialog";
import { ProgramType } from "@/stores/ProgramsStore";
import { TableCell, TableRow } from "./ui/table";
import Link from "next/link";
import { getUserGoalByTime } from "@/lib/FetchUsersDetails";

export const TrainerCard = ({ trainer }: { trainer: TrainerType }) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const addRequest=useAddRequest();


  useEffect(() => {
    const getImage = async () => {
      if (trainer.profile_id?.image_url) {
        const image = await getImageUrl(
          trainer.profile_id.image_url,
          3600
        );
        setSignedUrl(image);
      }
    };
    getImage();
  }, [trainer.profile_id?.image_url]);

  const handle=async ()=>{
    const response=await fetch('/api/auth/trainerId',{
      method:'POST',
      headers:{
        "Content-type":"application/json"},
        body:JSON.stringify({fullName:trainer.profile_id.fullName})
    });
    if(!response.ok){
      throw new Error("Failed to fetch trainer ID");
    }
    const { user_id: profile_id } = await response.json();
    addRequest.mutate({
      trainer_id:profile_id
    });
  }

  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
 
  <CardHeader className="flex flex-col items-center gap-4 pb-2">
    <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gray-200">
      <Dialog>
  <DialogTrigger>
    <img
      src={signedUrl || "/image.jpg"}
      alt={trainer.profile_id.fullName}
      className="h-24 w-24 sm:h-28 sm:w-28 object-cover cursor-pointer rounded-full border-2 border-blue-600 transition-transform duration-300 hover:scale-105 hover:opacity-90 shadow-md"
    />
  </DialogTrigger>

  <DialogContent className="max-w-md rounded-2xl p-6 shadow-2xl bg-white">
    
    <DialogTitle className="text-2xl font-bold text-center text-[#1E3A8A] mb-2">
      {trainer.profile_id.fullName}
    </DialogTitle>

    <div className="w-full h-80 sm:h-100 overflow-hidden rounded-xl border-2 border-gray-200 mb-4">
      <img
        src={signedUrl || "/image.jpg"}
        alt={trainer.profile_id.fullName}
        className="h-full w-full object-cover"
      />
    </div>

    <div className="space-y-2 text-sm text-gray-700 text-center">
      {trainer.bio && (
        <p className="italic text-gray-600">{trainer.bio}</p>
      )}
      <p>
        <span className="font-semibold">Specialization:</span>{" "}
        {trainer.specialization || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Experience:</span>{" "}
        {trainer.experience_years || "0"} years
      </p>
    </div>

    <div className="mt-6 flex justify-center">
      
    </div>
  </DialogContent>
</Dialog>

    </div>

    <div className="flex flex-col items-center gap-1 w-full">
      <h2 className="text-xl font-semibold text-center">{trainer.profile_id.fullName}</h2>
      <Label className="text-muted-foreground font-mono">{trainer.specialization}</Label>
      <p className="text-sm text-muted-foreground">{trainer.profile_id.username}</p>
      <Badge
        variant={trainer.is_approved ? "default" : "secondary"}
        className={`mt-2 text-white ${
          trainer.is_approved ? "bg-green-500" : "bg-red-600"
        }`}
      >
        {trainer.is_approved ? "Approved" : "Pending"}
      </Badge>
    </div>
  </CardHeader>

  <CardContent className="space-y-4">
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <Label className="text-muted-foreground">Email</Label>
        <span>{trainer.profile_id.email}</span>
      </div>
      <div className="flex justify-between">
        <Label className="text-muted-foreground">Phone</Label>
        <span>{trainer.profile_id.phone}</span>
      </div>
      <div className="flex justify-between">
        <Label className="text-muted-foreground">Role</Label>
        <span className="capitalize">{trainer.profile_id.role}</span>
      </div>
      <div className="flex justify-between">
        <Label className="text-muted-foreground">Experience</Label>
        <span>{trainer.experience_years} yrs</span>
      </div>
    </div>
    {trainer.bio && (
      <p className="text-sm text-muted-foreground leading-relaxed pt-2">{trainer.bio}</p>
    )}
  </CardContent>
  <CardFooter>
    <Button
      onClick={() => handle()}
      className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
    >
      <UserPlus2Icon className="w-5 h-5" />
      Request Trainer
    </Button>
  </CardFooter>
</Card>

  );
};

export const TrainerProgramCard=({user}:{user:ProgramType})=>{
  const [goal,setGoal]=useState("");
  
      useEffect(()=>{
          const getGoal=async()=>{
              const goal=await getUserGoalByTime({time:user.created_at});
              setGoal(goal);
          };getGoal();
      },[])
  return(
    <TableRow
        className="bg-white/60 backdrop-blur-lg rounded-xl shadow  transition-all transform "
      >
        <TableCell className="px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-linear-to-tr from-purple-200 to-pink-300 shadow-lg">
              <FileText className="h-6 w-6 text-pink-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800 hover:text-pink-600 transition-colors">
              {goal.toUpperCase().split("_")[0]} {goal.toUpperCase().split("_")[1]}
            </p>
          </div>
        </TableCell>

        <TableCell className="px-4 py-3">
          <p className="text-sm text-gray-600 font-medium">{user.user_id.fullName}</p>
        </TableCell>

        <TableCell className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium w-fit shadow-inner">
            <Calendar className="h-4 w-4" />
            <p className="text-xs">{new Date(user.updated_at).toLocaleDateString()}</p>
          </div>
        </TableCell>

        <TableCell className="px-4 py-3 text-center">
          <div className="flex justify-center gap-2">
            <Link href={`/Trainers/program/${user.id}`}>
            <span
             className="p-2 rounded-lg bg-white/40  cursor-pointer transition-all ">
              <Edit className="h-5 w-5 text-pink-600" />
            </span>
            </Link>
          </div>
        </TableCell>
      </TableRow>
  )
}
