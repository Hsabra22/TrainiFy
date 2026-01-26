"use client";

import { useEffect, useState } from "react";
import { LogOut, Mail, Shield, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/FetchProfiles";

type UserData = {
  role:string,
  username:string,
  email:string,
  image_url:string,
  fullName:string,
  phone:string
};

export const Logout = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email,setEmail]=useState("");
  const [signedUrl,setSignedUrl]=useState<string|null>(null);

  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/auth/signin", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const json = await response.json();
        setUser(json.data);
        setEmail(json.email);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      };
      
    };

    getData();
  }, []);

  useEffect(()=>{
    const getImage=async()=>{
      if(user?.image_url){
        const image=await getImageUrl(user?.image_url,3600);
        setSignedUrl(image);
      }
    };getImage();
  },[user?.image_url])

  const confirmLogout=()=>{
        toast.message("Are you sure you want to logout ?",{
            action:{
                label:"Yes",
                onClick:()=>{
                    const logout = async () => {
                        await fetch("/api/auth/logout", {
                            method: "POST",
                            credentials: "include",
                        });
                        window.location.href = "/login";
                    };logout();
                }
            },
            cancel:{
                label:"No",
                onClick:()=>{
                    const isLoading=toast.loading("Canceling logging out process..");
                    setTimeout(()=>{
                        toast.dismiss(isLoading)
                    },1000)
                }
            }
        })
    }
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  from-indigo-50 to-indigo-100">
        <div className="animate-pulse text-indigo-600 text-lg font-semibold">
          Loading your session...
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow text-indigo-600 font-semibold">
          {error || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center  from-indigo-100 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
        
        <div className="mx-auto w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          <img className="rounded-full h-full w-full object-cover" src={signedUrl||"/images/profile.jpg"} alt={user.fullName.charAt(0).toUpperCase()}/>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
          <p className="text-gray-500 text-sm">Signed in user</p>
        </div>

        

        <div className="space-y-3 text-left bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center gap-3 text-gray-700">
            <User className="w-5 h-5 text-indigo-500" />
            <span className="text-sm capitalize">{user.username}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span className="text-sm">{email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-indigo-500" />
            <span className="text-sm">{user.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Shield className="w-5 h-5 text-indigo-500" />
            <span className="text-sm capitalize">{user.role}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Are you sure you want to logout from your account?
        </p>

        <button
          onClick={confirmLogout}
          className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};
