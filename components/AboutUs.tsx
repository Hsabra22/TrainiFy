"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  return (
    <div className="w-full bg-[#F8FAFC] relative overflow-hidden">

      <div className="absolute -top-64 -left-64 w-200 h-200 bg-linear-to-tr from-indigo-300 via-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-64 -right-64 w-175 h-175 bg-linear-to-tr from-pink-300 via-orange-300 to-yellow-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>

      <section className="relative w-full h-200 overflow-hidden">
        <Image
          src="/images/trainify8.jpg"
          alt="About Us Hero"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold drop-shadow-xl"
          >
            About <span className="text-yellow-400">Trainify</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mt-6 text-lg md:text-2xl max-w-2xl drop-shadow-lg"
          >
            We combine AI technology and certified trainers to bring you the most personalized fitness experience.
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="w-full md:w-1/2">
          <Image src="/images/trainify7.jpg" width={600} height={500} alt="Our Mission" className="rounded-3xl shadow-2xl object-cover" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl text-[#475569] mb-6">
            Trainify’s mission is to help people achieve their fitness goals efficiently by combining the power of AI with real human expertise. We make workouts smarter, meal plans personalized, and results measurable.
          </p>
          <p className="text-lg md:text-xl text-[#475569] mb-6">
            Whether you're a beginner or an advanced athlete, our platform adapts to your unique needs while giving trainers the tools to refine and guide your journey.
          </p>
        </motion.div>
      </section>

      {/* Team / Why Choose Us */}
      <section className="py-32 px-6 bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Why Choose Trainify</h2>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto">
            AI powered programs, real trainers, and personalized plans — all in one platform. See measurable results while getting guidance from the best.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            { title: "AI-Powered Programs", desc: "Smart programs that adapt to your goals and progress.", img: "/images/trainify9.jpg" },
            { title: "Certified Trainers", desc: "Real trainers review, refine, and motivate you.", img: "/images/trainify10.jpg" },
            { title: "Personalized Plans", desc: "Workouts and meal plans customized just for you.", img: "/images/trainify11.jpg" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-8">
              <Image src={item.img} width={400} height={250} alt={item.title} className="rounded-xl shadow-lg object-cover mb-6" />
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-3">{item.title}</h3>
              <p className="text-[#64748B]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-center text-white">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">Ready to Transform?</h2>
        <p className="text-xl md:text-2xl mb-10">Join Trainify today and start achieving real results with AI and expert guidance.</p>
        <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-300 rounded-3xl px-12 py-6 text-lg shadow-xl hover:scale-105 transition-transform">
          <Link href="/register">Join Now</Link>
        </Button>
      </section>

    </div>
  );
}
