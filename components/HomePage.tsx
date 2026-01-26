"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Dumbbell, Calendar, MessageCircle, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full bg-[#F8FAFC] relative overflow-hidden">

      
      <div className="absolute -top-64 -left-64 w-200 h-200 bg-linear-to-tr from-indigo-300 via-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-64 -right-64 w-175 h-175 bg-linear-to-tr from-pink-300 via-orange-300 to-yellow-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>


      <section className="relative w-full h-200 overflow-hidden">
  <Image
    src="/images/trainify3.jpg"
    alt="Transformation Background"
    fill
    className="object-cover object-center"
  />

  <div className="absolute inset-0 bg-black/40"></div>

  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white z-10">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-xl"
    >
      Your Transformation <br /> Starts <span className="text-yellow-400">Today</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="mt-6 text-lg md:text-2xl max-w-2xl drop-shadow-lg"
    >
      AI precision. Real trainers. Results you can see and feel. <br /> Let us build the best version of you together.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4 }}
      className="mt-10 flex gap-6 flex-wrap justify-center"
    >
      <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-300 rounded-3xl px-10 py-6 text-lg shadow-xl hover:scale-105 transition-transform">
        <Link href="/register">Join Trainify</Link>
      </Button>
      <Button variant="outline" asChild className="border-white text-white bg-white/20 rounded-3xl px-10 py-6 text-lg shadow-lg transition">
        <Link href="/aboutus">Learn How</Link>
      </Button>
    </motion.div>

    <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-linear-to-tr from-yellow-300 via-pink-400 to-purple-500 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
    <div className="absolute -top-32 -left-20 w-80 h-80 bg-linear-to-tr from-indigo-400 via-purple-400 to-pink-500 rounded-full opacity-30 blur-3xl animate-blob"></div>
  </div>
</section>

      <section className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-6xl md:text-7xl font-extrabold text-[#0F172A] leading-tight">
            Train Smarter.<br/>
            Powered by <span className="bg-linear-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">AI</span> & Real Coaches
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[#475569] max-w-xl">
            Trainify builds your weekly workout & meal plans using AI, then lets real trainers fine‑tune your progress. Achieve your fitness goals faster and smarter.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Button asChild className="rounded-3xl px-10 py-6 text-lg shadow-lg hover:scale-105 transition-transform">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-3xl px-10 py-6 text-lg border-indigo-300 hover:bg-indigo-50 transition">
              <Link href="/aboutus">How it works</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative w-full max-w-lg perspective-1000">
          <motion.div whileHover={{ rotateY: 15, rotateX: 5, scale: 1.05 }} className="rounded-3xl shadow-2xl overflow-hidden">
            <Image src="/images/trainify1.jpg" width={520} height={520} alt="Dashboard" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none"></div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-20">Everything You Need to Transform</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Bot, title: "AI Programs", desc: "Personalized workouts & meals based on your goals.", img: "/images/trainify4.jpg" },
            { icon: Dumbbell, title: "Real Trainers", desc: "Certified trainers review and improve your plan.", img: "/images/trainify5.jpg" },
            { icon: Calendar, title: "Weekly Schedule", desc: "Clear weekly breakdowns so you always know what to do.", img: "/images/trainify6.jpg" },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 h-140">
                <CardContent className="p-8 text-center">
                  <f.icon className="mx-auto h-12 w-12 text-gradient from-indigo-500 to-pink-500" />
                  <h3 className="mt-6 text-2xl font-semibold text-[#0F172A]">{f.title}</h3>
                  <p className="mt-3 text-[#64748B]">{f.desc}</p>
                  <Image src={f.img} width={300} height={200} alt={f.title} className="mt-6 mx-auto rounded-xl shadow-lg object-cover" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how" className="py-32 px-6 bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-20">How Trainify Works</h2>
        <div className="grid md:grid-cols-4 gap-12">
          {["Register", "Enter Details", "AI Builds Program", "Trainer Improves It"].map((step, i) => (
            <motion.div key={i} whileHover={{ scale: 1.1 }} className="rounded-3xl p-8 text-center bg-white shadow-lg hover:shadow-2xl transition">
              <span className="text-5xl font-extrabold text-indigo-500">{i + 1}</span>
              <h4 className="mt-4 font-semibold text-[#0F172A]">{step}</h4>
              <span  className="mx-auto mt-4 rounded-xl object-cover shadow-lg" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div whileHover={{ scale: 1.05, rotate: -1 }}>
            <Image src="/images/trainify2.jpg" width={600} height={420} alt="Trainer" className="rounded-3xl shadow-2xl object-cover" />
          </motion.div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">Built for Trainers & Admins</h2>
            <p className="text-[#475569] mb-6">Manage your clients, workouts, and meal plans with ease. Stay connected, track progress, and grow your business.</p>
            <ul className="space-y-5 text-[#475569]">
              <li className="flex gap-4 items-center"><MessageCircle className="w-6 h-6 text-indigo-500" /> Direct messaging with users</li>
              <li className="flex gap-4 items-center"><Dumbbell className="w-6 h-6 text-indigo-500" /> Edit workouts & meal plans</li>
              <li className="flex gap-4 items-center"><ShieldCheck className="w-6 h-6 text-indigo-500" /> Admin oversight & analytics</li>
            </ul>
            <Button asChild className="mt-8 bg-indigo-500 text-white rounded-3xl px-10 py-6 hover:scale-105 transition">
              <Link href="/register">Become a Trainer</Link>
            </Button>
          </div>
        </div>
      </section>

      


    </div>
  )
}
