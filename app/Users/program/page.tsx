import { Programs } from "@/components/DisplayProgram";
import Loading from "@/components/Loading";
import { Navigation } from "@/components/NavigationUser";
import { Suspense } from "react";

export default function ProgramPage(){
    const today=new Date().toLocaleDateString("en-US",{
        weekday:"long"
    });
    return(
        <Suspense fallback={<Loading/>}>
            <Navigation/>
            <Programs day={String(today)}/>
        </Suspense>
        
    )
}