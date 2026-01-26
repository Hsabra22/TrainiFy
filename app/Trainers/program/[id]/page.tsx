import { ClientProgram } from "@/components/DisplayProgram";


export default async  function ClientProgramPage({params}:{params:Promise<{id:string}>}){
    return(
        <ClientProgram id={(await params).id}  />
    )
}