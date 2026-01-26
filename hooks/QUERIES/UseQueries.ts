'use client'

import { getUserProgram } from "@/lib/FecthPrograms"
import { getTrainerRequests, getUserRequests,getRequests } from "@/lib/FecthRequests"
import { getUsers } from "@/lib/FetchProfiles"
import { getTrainers } from "@/lib/FetchTrainers"
import { getUserDetails } from "@/lib/FetchUsersDetails"
import { queryOptions } from "@tanstack/react-query"

export const FetchUsers=()=>{
    return queryOptions({
        queryKey: ['profiles'],
        queryFn: getUsers
    })
}

export const FetchUserDetails=()=>{
    return queryOptions({
        queryKey: ['userDetails'],
        queryFn: getUserDetails
    })
}

export const FetchUserPrograms=()=>{
    return queryOptions({
        queryKey: ['programs'],
        queryFn: getUserProgram
    })
}

export const FetchTrainers=()=>{
    return queryOptions({
        queryKey:["trainers"],
        queryFn:getTrainers
    })
}

export const FetchRequests=()=>{
    return queryOptions({
        queryKey:["requests"],
        queryFn:getRequests
    })
}

export const FetchTrainerRequests=()=>{
    return queryOptions({
        queryKey:["trainerRequests"],
        queryFn:getTrainerRequests
    })
}

export const FetchUserRequests=()=>{
    return queryOptions({
        queryKey:["userRequests"],
        queryFn:getUserRequests
    })
}