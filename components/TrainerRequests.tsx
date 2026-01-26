
'use client'
import { useAcceptRequest, useCancelRequest, useGetTrainerRequests } from "@/hooks/MUTATION/UseMutationRequests"
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { LucideTimer, Timer, UserCheckIcon, UserRoundXIcon, Calendar, Mail, Phone, Check, X, Inbox, SeparatorHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";


export const TrainerRequests=()=>{
    const requests=useGetTrainerRequests();
    const acceptRequest=useAcceptRequest();
    const rejectRequest=useCancelRequest();
    const pending=requests?.filter((req)=>req.status==="pending");
    const accepted=requests?.filter((req)=>req.status==="accepted");
    const rejected=requests?.filter((req)=>req.status==="rejected");
    const [isPending,setIsPending]=useState(true);
    const [isAccepted,setIsAccepted]=useState(false);
    const [isRejected,setIsRejected]=useState(false);

return(
<div className="p-6 space-y-6 min-h-screen bg-gray-100">
  <div className="space-y-1">
    <Label className="text-3xl font-bold tracking-tight">
      Client Requests
    </Label>
    <Label className="text-muted-foreground text-base">
      Review and manage training requests from potential clients
    </Label>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="rounded-full bg-muted p-3">
          <LucideTimer className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold">
            {pending?.length ?? 0}
          </span>
          <span className="text-sm text-muted-foreground">
            Pending 
          </span>
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="rounded-full bg-green-500/10 p-3">
          <UserCheckIcon className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold">
            {accepted?.length ?? 0}
          </span>
          <span className="text-sm text-muted-foreground">
            Accepted 
          </span>
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-sm hover:shadow-md transition-shadow ">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="rounded-full bg-red-500/10 p-3">
          <UserRoundXIcon className="h-6 w-6 text-red-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold">
            {rejected?.length ?? 0}
          </span>
          <span className="text-sm text-muted-foreground">
            Rejected 
          </span>
        </div>
      </CardContent>
    </Card>
  </div>

  <div className="p-4">
    <div className="inline-flex items-center rounded-xl border bg-muted p-1 shadow-sm">
        <Button onClick={()=>{setIsPending(true),setIsAccepted(false),setIsRejected(false)}}
        variant="ghost"
        className="rounded-lg px-4 py-2 text-sm font-medium data-[active=true]:bg-background data-[active=true]:shadow"
        >
        Pending
        </Button>
        <Button onClick={()=>{  setIsPending(false),setIsAccepted(true),setIsRejected(false)}}
        variant="ghost"
        className="rounded-lg px-4 py-2 text-sm font-medium data-[active=true]:bg-background data-[active=true]:shadow"
        >
        Accepted 
        </Button>
        <Button onClick={()=>{setIsPending(false),setIsAccepted(false),setIsRejected(true)}}
        variant="ghost"
        className="rounded-lg px-4 py-2 text-sm font-medium data-[active=true]:bg-background data-[active=true]:shadow "
        >
        Rejected
        </Button>
    </div>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
    {isPending&&!pending.length?(
      <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 p-12 text-center shadow-sm">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow">
    <Inbox className="h-8 w-8 text-muted-foreground" />
  </div>

  <h3 className="mt-6 text-xl font-semibold tracking-tight">
    No pending requests
  </h3>

  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
    You are all caught up! When new clients request training, they will appear here.
  </p>

  <SeparatorHorizontal className="my-6 w-24" />

  <div className="text-xs text-muted-foreground">
    Keep an eye on this section for new activity
  </div>
</div>

    ):(
      isPending && pending.map((req)=>(
        <Card key={req.id} className="shadow-sm hover:shadow-md transition-shadow ">
            <CardHeader className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <CardTitle className="font-bold text-lg">{req.user_id.fullName}</CardTitle>
                    <CardDescription className="text-sm">@{req.user_id.username}</CardDescription>
                </div>
                <Badge variant="outline" className="h-8 bg-blue-200">
                    <Timer className="mr-2 h-4 w-4 text-blue-700" />
                    <Label className="text-blue-700">{req.status}</Label>
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground"/>
                        <Label className="font-medium">{req.user_id.email}</Label>
                    </div>
                    <div className="flex gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground"/>
                        <Label className="font-medium">Requested:{new Date(req.created_at).toLocaleDateString()}</Label>
                    </div>
                    <Badge variant="outline" className="h-8 bg-blue-200">
                      <Phone className="mr-2 h-4 w-4 text-blue-700" />
                      <Label className="text-blue-700">{req.user_id.phone}</Label>
                    </Badge>
                </div>
                <div className="border border-gray-200 mt-4 w-full"></div>
            </CardContent>
            <CardFooter className="flex gap-2 w-full">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-[50%] bg-green-500 text-white font-mono text-lg hover:bg-green-600">
                    <Check className="mr-2 h-5 w-5" />
                    Accept
                  </Button>
                </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <UserCheckIcon className="h-5 w-5 text-green-500" />
        Accept Request
      </DialogTitle>
      <DialogDescription>
        Are you sure you want to accept {req.user_id.fullName}'s training request?
        They will become one of your clients.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="flex gap-2 justify-end">
      <Button
        onClick={() => acceptRequest.mutate({ request: req })}
        className="bg-green-500 text-white hover:bg-green-600"
      >
        Confirm
      </Button>

      <Button variant="outline">
        Cancel
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
           <Dialog>
                <DialogTrigger asChild>
    <Button 
                variant={"ghost"} className="w-[50%] bg-white border-red-100 border-2 text-red-400 font-mono text-lg">
                <X className="mr-2 h-5 w-5"/>
                Reject
              </Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <UserCheckIcon className="h-5 w-5 text-green-500" />
        Reject Request
      </DialogTitle>
      <DialogDescription>
        Are you sure you want to accept {req.user_id.fullName}'s training request?
        They will become one of your clients.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="flex gap-2 justify-end">
      <Button onClick={()=>rejectRequest.mutate({id:req.id})}
                variant={"ghost"} className="w-[50%] bg-white border-red-100 border-2 text-red-400 font-mono text-lg">
                <X className="mr-2 h-5 w-5"/>
                Confirm
              </Button>

      <Button variant="outline">
        Cancel
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
            </CardFooter>
        </Card>
    ))
    )}
    {isAccepted&&!accepted.length?(
      <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 p-12 text-center shadow-sm">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow">
    <Inbox className="h-8 w-8 text-muted-foreground" />
  </div>

  <h3 className="mt-6 text-xl font-semibold tracking-tight">
    No Accepted requests
  </h3>

  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
    You are all caught up! When new clients request training, they will appear here.
  </p>

  <SeparatorHorizontal className="my-6 w-24" />

  <div className="text-xs text-muted-foreground">
    Keep an eye on this section for new activity
  </div>
</div>
    ):(
    isAccepted && accepted?.map((req)=>(
        <Card key={req.id} className="shadow-sm hover:shadow-md transition-shadow h-68">
            <CardHeader className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <CardTitle className="font-bold text-lg">{req.user_id.fullName}</CardTitle>
                    <CardDescription className="text-sm">@{req.user_id.username}</CardDescription>
                </div>
                <Badge variant="outline" className="h-8 bg-green-200">
                    <Timer className="mr-2 h-4 w-4 text-green-700" />
                    <Label className="text-green-700">{req.status}</Label>
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground"/>
                        <Label className="font-medium">{req.user_id.email}</Label>
                    </div>
                    <div className="flex gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground"/>
                        <Label className="font-medium">Requested:{new Date(req.created_at).toLocaleDateString()}</Label>
                    </div>
                    <Badge variant="outline" className="h-8 bg-blue-200">
                      <Phone className="mr-2 h-4 w-4 text-blue-700" />
                      <Label className="text-blue-700">{req.user_id.phone}</Label>
                    </Badge>
                </div>
                <div className="border border-gray-200 mt-4 w-full"></div>
            </CardContent>
        </Card>
    )))}
    {isRejected&&!rejected.length?(
      <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 p-12 text-center shadow-sm">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow">
    <Inbox className="h-8 w-8 text-muted-foreground" />
  </div>

  <h3 className="mt-6 text-xl font-semibold tracking-tight">
    No Rejected requests
  </h3>

  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
    You are all caught up! When new clients request training, they will appear here.
  </p>

  <SeparatorHorizontal className="my-6 w-24" />

  <div className="text-xs text-muted-foreground">
    Keep an eye on this section for new activity
  </div>
</div>
    ):(
    isRejected && rejected?.map((req)=>(
        <Card key={req.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <CardTitle className="font-bold text-lg">{req.user_id.fullName}</CardTitle>
                    <CardDescription className="text-sm">@{req.user_id.username}</CardDescription>
                </div>
                <Badge variant="outline" className="h-8 bg-red-200">
                    <Timer className="mr-2 h-4 w-4 text-red-700" />
                    <Label className="text-red-700">{req.status}</Label>
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground"/>
                        <Label className="font-medium">{req.user_id.email}</Label>
                    </div>
                    <div className="flex gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground"/>
                        <Label className="font-medium">Requested:{new Date(req.created_at).toLocaleDateString()}</Label>
                    </div>
                    <Badge variant="outline" className="h-8 bg-blue-200">
                      <Phone className="mr-2 h-4 w-4 text-blue-700" />
                      <Label className="text-blue-700">{req.user_id.phone}</Label>
                    </Badge>
                </div>
                <div className="border border-gray-200 mt-4 w-full"></div>
            </CardContent>
        </Card>
    )))}
  </div>
</div>
)}