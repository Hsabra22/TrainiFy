import Loading from "@/components/Loading";
import { Navigation } from "@/components/NavigationUser";
import { ProgramDetails } from "@/components/ProgramDetails";
import { Suspense } from "react";



export default async function ProgramDetailsPage({params}:{params:Promise<{day:string}>}){
    return(
        <Suspense fallback={<Loading/>}>
            <Navigation/>
            <ProgramDetails day={(await params).day}  />
        </Suspense>
    )
}