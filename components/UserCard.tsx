import { getImageUrl } from "@/lib/FetchProfiles";
import { UserType } from "@/stores/UsersStore";
import { useEffect, useState } from "react";
import { Calendar, CalendarCheck, Mail, MessageSquare, Phone, Send, Target } from "lucide-react";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { sendMessageToClient } from "@/lib/FecthNotes";
import { toast } from "sonner";
import { NotesType } from "@/stores/NotesStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export const UserCard = ({ user }: { user: UserType }) => {
  const [userSignedUrl, setUserSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImageUrl(user.profile_id.image_url, 500);
      setUserSignedUrl(image);
    };
    fetchImage();
  }, [user.profile_id.image_url]);

  return (
    <div className=" flex flex-col items-center  text-center p-5 rounded-xl border bg-background shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      
      <div className="relative mb-4">
        <img
          src={userSignedUrl || "/image.jpg"}
          alt="User Image"
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>

      <h3 className="text-base font-semibold leading-tight">
        {user.profile_id.fullName}
      </h3>

      <p className="text-sm text-muted-foreground mb-3">
        @{user.profile_id.username}
      </p>

      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="truncate max-w-45">
            {user.profile_id.email}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{user.profile_id.phone}</span>
        </div>
      </div>
    </div>
  );
};

export const UserTrainerCard=({user}:{user:UserType})=>{
  const [userSignedUrl, setUserSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImageUrl(user.profile_id.image_url, 500);
      setUserSignedUrl(image);
    };
    fetchImage();
  }, [user.profile_id.image_url]);
  return(
    <div className="flex items-center justify-between  rounded-xl border bg-gray-100 p-4 shadow-sm transition-all hover:shadow-md">
  <div className="flex items-center gap-3">
    <div className="relative">
      <img
        src={userSignedUrl || "/image.jpg"}
        alt="User Image"
        className="h-12 w-12 rounded-full border object-cover"
      />
    </div>

    <div className="flex flex-col">
      <Label className="text-base font-semibold">
        {user.profile_id.fullName}
      </Label>
      <Label className="text-sm text-muted-foreground">
        Goal: {user.goal}
      </Label>
    </div>
  </div>

  <Badge
    variant="secondary"
    className={`px-3 py-1 text-sm font-medium ${
      user.experience_level === "beginner"
        ? "bg-blue-500 text-white"
        : user.experience_level === "intermediate"
        ? "bg-yellow-400 text-black"
        : "bg-green-600 text-white"
    }`}
  >
    {user.experience_level === "beginner"
      ? "Beginner"
      : user.experience_level === "intermediate"
      ? "Intermediate"
      : "Advanced"}
  </Badge>
</div>

  )
}

export const UserProgramCard=({user}:{user:UserType})=>{
  const [userSignedUrl, setUserSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImageUrl(user.profile_id.image_url, 500);
      setUserSignedUrl(image);
    };
    fetchImage();
  }, [user.profile_id.image_url]);
  return(
    <div className="flex items-center justify-between rounded-xl border bg-background p-4 shadow-sm transition-all hover:shadow-md">
  <div className="flex items-center gap-3">
    <div className="relative">
      <img
        src={userSignedUrl || "/image.jpg"}
        alt="User Image"
        className="h-12 w-12 rounded-full border object-cover"
      />
    </div>

    <div className="flex flex-col">
      <Label className="text-base font-semibold">
        {user.profile_id.fullName}
      </Label>
      <Label className="text-sm text-muted-foreground">
        Goal: {user.goal}
      </Label>
    </div>
  </div>

  <Badge
    variant="secondary"
    className={`px-3 py-1 text-sm font-medium ${
      user.experience_level === "beginner"
        ? "bg-blue-500 text-white"
        : user.experience_level === "intermediate"
        ? "bg-yellow-400 text-black"
        : "bg-green-600 text-white"
    }`}
  >
    {user.experience_level === "beginner"
      ? "Beginner"
      : user.experience_level === "intermediate"
      ? "Intermediate"
      : "Advanced"}
  </Badge>
</div>

  )
}

export const ClientCard=({user}:{user:UserType})=>{
  const [userSignedUrl, setUserSignedUrl] = useState<string | null>(null);
  const [message,setMessage]=useState("");
  const send=async()=>{
    if(!message){
      toast.error("Message Required")
      return
    }
    await sendMessageToClient({
      note:{
        message:message
      },
      user_id:user.profile_id.user_id
    });
    toast.success(`Message Sent successfully to ${user.profile_id.fullName}`)
  }
  const data=[
    {
      icon:Mail,
      title:"email",
      item:user.profile_id.email
    },
    {
      icon:Phone,
      title:"phone",
      item:user.profile_id.phone
    },
    {
      icon:Target,
      title:"Fitness Goal",
      item:user.goal
    },
    {
      icon:Calendar,
      title:"Available Days",
      item:
      <div className="grid grid-cols-3 gap-1">
              {user.available_days.map((day,idx)=>(
              <Badge key={idx}
              className={
               "bg-gray-100 text-gray-700"
              }>
                {day.split(":")[1].split("}")[0]}
            </Badge>
              ))}
      </div>
    },
  ]

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImageUrl(user.profile_id.image_url, 500);
      setUserSignedUrl(image);
    };
    fetchImage();
  }, [user.profile_id.image_url]);

  return(
    <Card>
      <CardHeader>
        <div className="flex gap-1 justify-start">
          <div className="relative ">
            <img
            src={userSignedUrl || "/image.jpg"}
            alt="User Image"
            className="w-18 h-18 rounded-full object-cover border"
            />
          </div>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>{user.profile_id.fullName}</CardTitle>
            <CardDescription>@{user.profile_id.username}</CardDescription>
            <Badge
            className={
              user.experience_level === "beginner"
              ? "bg-green-100 text-green-700"
              : user.experience_level === "intermediate"
              ? "bg-blue-100 text-blue-700"
              : "bg-purple-100 text-purple-700"
              }>
                {user.experience_level}
            </Badge>
          </CardHeader>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label className="text-base font-semibold">
           <Target/>
           {user.goal}
          </Label>
          <Label className="text-sm text-muted-foreground">
            <CalendarCheck/>
            <div className="flex gap-1">
              {user.available_days.map((day,idx)=>(
              <Badge key={idx}
              className={
               "bg-gray-100 text-gray-700"
              }>
                {day.split(":")[1].split("}")[0]}
            </Badge>
              ))}
            </div>
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-center  w-full">
        <Dialog >
          <DialogTrigger className="w-full bg-gray-100">
            <span
            className="
            inline-flex items-center justify-center
            px-4 py-2
            w-full
            rounded-lg
            bg-white
            text-black
            border border-gray-300
            cursor-pointer
            hover:bg-green-600 hover:text-white
            transition-all duration-300
            active:scale-95
            select-none"
            >
              View Profile
            </span>

          </DialogTrigger>
          <DialogContent className="p-3 bg-gray-100">
            <Label className="p-2 text-2xl font-bold">Client Profile</Label>
                <div className="flex gap-4 p-4 sm:p-6">
                    <div className="relative shrink-0">
                      <img
                        src={userSignedUrl || "/image.jpg"}
                        alt="User Image"
                        className="
                          h-20 w-20 sm:h-24 sm:w-24
                          rounded-xl object-cover
                          border border-border
                          shadow-sm
                        "
                      />
                      <span
                        className={`
                          absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background
                          ${
                            user.experience_level === "beginner"
                              ? "bg-green-500"
                              : user.experience_level === "intermediate"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                          }
                        `}
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-1 min-w-0">
                      <DialogTitle className="text-xl sm:text-2xl font-bold truncate">
                        {user.profile_id.fullName}
                      </DialogTitle>

                      <DialogDescription className="text-sm text-muted-foreground truncate">
                        @{user.profile_id.username}
                      </DialogDescription>

                      <div className="pt-2">
                        <Badge
                          variant="secondary"
                          className={`
                            capitalize font-medium
                            ${
                              user.experience_level === "beginner"
                                ? "bg-green-100 text-green-700"
                                : user.experience_level === "intermediate"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }
                          `}
                        >
                          {user.experience_level}
                        </Badge>
                      </div>
                    </div>
                  </div>

            <div className="grid grid-cols-1 p-2 gap-3">
              {data.map((d,idx)=>(
                <div className="rounded-lg w-full p-2 bg-gray-200" key={idx}>
                <div className="flex gap-4 p-1 items-center">
                  <d.icon/>
                  <div className="grid grid-cols-1 gap-2">
                    <Label className="text-muted-foreground">{d.title}</Label>
                    <Label className="font-semibold">{d.item}</Label>
                  </div>
                </div>
              </div>
              ))}
            </div>
            <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-[90%] bg-blue-600 text-white hover:bg-blue-700 hover:text-white transition-all duration-300 flex m-auto items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Message
            </Button>
          </DialogTrigger>
            <DialogContent className="sm:max-w-lg rounded-2xl p-6">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Send a Note
              </DialogTitle>

              <DialogDescription className="text-sm text-muted-foreground">
                Write a short note to the user. Be clear and supportive.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <Textarea value={message} onChange={(e)=>setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="min-h-30 resize-none focus-visible:ring-blue-600"
              />
            </div>

            <DialogFooter className="mt-6 flex gap-2">
              <DialogClose asChild>
                <Button
                variant="outline"
                className="w-[30%]"
              >
                Cancel
              </Button>
              </DialogClose>

              <Button onClick={send}
                className="w-[70%] bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-[50%] bg-blue-600 text-white hover:bg-blue-700 hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Message
            </Button>
          </DialogTrigger>
            <DialogContent className="sm:max-w-lg rounded-2xl p-6">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Send a Note
              </DialogTitle>

              <DialogDescription className="text-sm text-muted-foreground">
                Write a short note to the user. Be clear and supportive.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <Textarea value={message} onChange={(e)=>setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="min-h-30 resize-none focus-visible:ring-blue-600"
              />
            </div>

            <DialogFooter className="mt-6 flex gap-2">
              <DialogClose asChild>
                <Button
                variant="outline"
                className="w-[30%]"
              >
                Cancel
              </Button>
              </DialogClose>

              <Button onClick={send}
                className="w-[70%] bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </CardFooter>
    </Card>
  )
}

export const UserNotesCard=({notes}:{notes:NotesType})=>{
  const [userSignedUrl, setUserSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImageUrl(notes.from_profile_id.image_url, 500);
      setUserSignedUrl(image);
    };
    fetchImage();
  }, [notes.from_profile_id.image_url]);

  return(
            <Card
                className="border border-border rounded-xl hover:shadow-md transition-all"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={userSignedUrl || ""}
                        />
                        <AvatarFallback>
                          {notes.from_profile_id.fullName?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <Label className="font-semibold">
                          {notes.from_profile_id?.fullName}
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Trainer
                        </span>
                      </div>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {new Date(notes.created_at).toLocaleDateString()}
                    </Badge>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 text-sm leading-relaxed">
                    {notes.message}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Sent to{" "}
                    <span className="font-medium">
                      {notes.to_profile_id?.fullName}
                    </span>
                  </div>
                </CardContent>
              </Card>
  )
}
