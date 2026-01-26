import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Filter, Search } from "lucide-react";
import { Input } from "./ui/input";
import { CardContent } from "./ui/card";


export const FilterByDay=()=>{
    const [day,setDay]=useState<string>("/");
    const router=useRouter();
    useEffect(() => {
        const pathName=new URLSearchParams();
        if(day){
            pathName.set("day",day);
        };
        const delay=setTimeout(()=>{
            router.push(`/Users/program/${pathName.get("day")}`);
        },300);
        return () => clearTimeout(delay);
    }, [day]);
return(
<Select onValueChange={setDay}>
  <SelectTrigger className="w-64 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200">
    <SelectValue placeholder="Select a day" className="text-gray-700"/>
  </SelectTrigger>
  <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg mt-1 overflow-hidden">
    <SelectItem value="Monday" className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150 rounded-md">Monday</SelectItem>
    <SelectItem value="Tuesday" className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150 rounded-md">Tuesday</SelectItem>
    <SelectItem value="Wednesday" className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150 rounded-md">Wednesday</SelectItem>
    <SelectItem value="Thursday" className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150 rounded-md">Thursday</SelectItem>
    <SelectItem value="Friday" className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150 rounded-md">Friday</SelectItem>
    <SelectItem value="Saturday" className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150 rounded-md">Saturday</SelectItem>
    <SelectItem value="Sunday" className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150 rounded-md">Sunday</SelectItem>
  </SelectContent>
</Select>
)}



export const FilterClient = () => {
  const [client, setClient] = useState("");
  const [experience_level, setExperience_level] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (client) params.set("client", client);
    if (experience_level) params.set("experience_level", experience_level);

    const delay = setTimeout(() => {
      router.push(`/Trainers/clients?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delay);
  }, [client, experience_level, router]);

  return (
    <CardContent className="grid grid-cols-1 lg:grid-cols-[8fr_2fr] gap-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Search by name or goal..."
          className="pl-10"
        />
      </div>

      <Select
        onValueChange={(value) =>
          setExperience_level(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-40 lg:w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </CardContent>
  );
};

export const FilterTrainers = () => {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [status,setStatus]=useState("")
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (name) params.set("name", name);
    if (experience) params.set("experience", experience);
    if (status) params.set("status", status);

    const delay = setTimeout(() => {
      router.push(`/Admin/trainers?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delay);
  }, [experience, name, router,status]);

  return (
    <CardContent className="grid grid-cols-1 lg:grid-cols-[8fr_2fr] gap-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name ..."
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-[7fr_3fr] gap-2">
        <Select
        onValueChange={(value) =>
          setStatus(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-40 lg:w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="All " />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        placeholder="Years of experience"
        className=" rounded-lg text-base"
      />

      </div>
    </CardContent>
  );
};

export const FilterUsers = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (name) params.set("name", name);
    if (level) params.set("level", level);

    const delay = setTimeout(() => {
      router.push(`/Admin/users?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delay);
  }, [level, name, router]);

  return (
    <CardContent className="grid grid-cols-1 lg:grid-cols-[8fr_2fr] gap-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name ..."
          className="pl-10"
        />
      </div>

      <Select
        onValueChange={(value) =>
          setLevel(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-40 lg:w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="All " />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="beginner">Beginner</SelectItem>

        </SelectContent>
      </Select>
    </CardContent>
  );
};

export const FilterRequests = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (name) params.set("name", name);
    if (status) params.set("status", status);

    const delay = setTimeout(() => {
      router.push(`/Admin/requests?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delay);
  }, [status, name, router]);

  return (
    <CardContent className="grid grid-cols-1 lg:grid-cols-[8fr_2fr] gap-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name ..."
          className="pl-10"
        />
      </div>

      <Select
        onValueChange={(value) =>
          setStatus(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-40 lg:w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="All " />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>

        </SelectContent>
      </Select>
    </CardContent>
  );
};
