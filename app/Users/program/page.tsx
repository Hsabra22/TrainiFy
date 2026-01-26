import { Programs } from "@/components/DisplayProgram";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function ProgramPage(){
    const today=new Date().toLocaleDateString("en-US",{
        weekday:"long"
    });
    return(
        <Suspense fallback={<Loading/>}>
            <Programs day={String(today)}/>
        </Suspense>
        
    )
}