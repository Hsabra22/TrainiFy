"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { useGetTrainers } from "@/hooks/MUTATION/UseMutationTrainers";
import { useGetUserRequests } from "@/hooks/MUTATION/UseMutationRequests";

import { TrainerCard } from "./TrainerCard";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Label } from "./ui/label";

export const TrainersList = () => {
  const trainers = useGetTrainers();
  const requests = useGetUserRequests();
  const [open, setOpen] = useState(false);

  if (!trainers || trainers.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground text-lg">
        No trainers available
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-6">
     
      <div className="flex lg:flex-row items-center justify-between mb-6">
        <div className="flex flex-row lg:flex-row gap-2 justify-center">
          <div>
            <h1 className="text-2xl font-semibold text-[#1E3A8A]">
            Trainers
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a trainer or review your requests
          </p>
          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 border-[#1E3A8A] text-[#1E3A8A]"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
              Requests
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-100 sm:w-112.5 md:w-125 bg-[#F8FAFC] overflow-y-auto p-6">
  <SheetHeader className="mb-4">
    <SheetTitle className="text-2xl font-bold text-[#1E3A8A]">
      Your Requests
    </SheetTitle>
    <p className="text-sm text-muted-foreground">
      Manage and view your active trainer requests
    </p>
  </SheetHeader>

  <div className="flex flex-col gap-4">
    {requests.length === 0 && (
      <p className="text-center text-muted-foreground text-sm py-20">
        No requests yet
      </p>
    )}

    {requests.map((request, idx) => (
      <Card
        key={idx}
        className="rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-sm font-semibold capitalize">
            Status:
          </CardTitle>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              request.status.toLowerCase() === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : request.status.toLowerCase() === "accepted"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {request.status}
          </span>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          
          <div className="space-y-1">
            <Label className="text-muted-foreground">From</Label>
            <p className="font-medium">{request.user_id.fullName}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Trainer</Label>
            <p className="font-medium">{request.trainer_id.fullName}</p>
            <p className="text-xs text-muted-foreground">
              Email: {request.trainer_id.email}
            </p>
            <p className="text-xs text-muted-foreground">
              Username: @{request.trainer_id.username}
            </p>
            <p className="text-xs text-muted-foreground">
              Phone: {request.trainer_id.phone}
            </p>
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground flex justify-end">
          Sent on{" "}
          <span className="ml-1 font-medium">
            {new Date(request.created_at).toLocaleDateString()} at{" "}
            {new Date(request.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </CardFooter>
      </Card>
    ))}
  </div>
</SheetContent>

        </Sheet>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer, idx) => (
          <TrainerCard key={idx} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};
