"use client"

import { RequestType } from "@/stores/RequestStore";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

export const RequestsCard=({user}:{user:RequestType})=>{
  return(
    <div className="flex items-center justify-between rounded-xl border bg-background p-4 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center gap-3">
      <div className="relative flex items-center">
        <span
          className="
            z-10 flex h-12 w-12 items-center justify-center
            rounded-full border bg-background
            text-sm font-semibold
          "
        >
          {user.user_id.fullName[0]}
        </span>

        <span
          className="
            -ml-4 flex h-12 w-12 items-center justify-center
            rounded-full border bg-background
            text-sm font-semibold
          "
        >
          {user.trainer_id.fullName[0]}
        </span>
      </div>
    <div className="flex flex-col">
      <Label className="text-base font-semibold">
        {user.user_id.fullName}
      </Label>
      <Label className="text-sm text-muted-foreground">
        To {user.trainer_id.fullName}
      </Label>
    </div>
  </div>

  <Badge
    variant="secondary"
    className={`px-3 py-1 text-sm font-medium ${
      user.status === "pending"
        ? "bg-blue-500 text-white"
        : user.status === "accepted"
        ? "bg-yellow-400 text-black"
        : "bg-red-600 text-white"
    }`}
  >
    {user.status === "pending"
      ? "Pending"
      : user.status === "accepted"
      ? "Accepted"
      : "Rejected"}
  </Badge>
</div>

  )
}

