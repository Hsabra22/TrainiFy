import Loading from "@/components/Loading";
import { ProgramDetails } from "@/components/ProgramDetails";
import { Suspense } from "react";



export default async function ProgramDetailsPage({params}:{params:Promise<{day:string}>}){
    return(
        <Suspense fallback={<Loading/>}>
            <ProgramDetails day={(await params).day}  />
        </Suspense>
    )
}