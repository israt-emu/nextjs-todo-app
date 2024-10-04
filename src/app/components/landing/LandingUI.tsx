"use client";
import React from "react";
import {motion} from "framer-motion";
import NotePlayer from "../players/NotePlayer";
import {Button} from "@/components/ui/button";
import Link from "next/link";
const LandingUI = () => {
  return (
    <div className="w-11/12 md:w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <motion.div initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}} className="order-1">
        <NotePlayer />
      </motion.div>
      <motion.div initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.2}} className="order-2 text-left">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">Sculpt your aspirations into harmony</h1>
        <p className="sm:text-lg mb-6 text-gray-600 dark:text-gray-300">Learn to artfully shape your goals, streamline your thoughts, and arrange your information into a cohesive system. Transform the chaos of daily life into a masterpiece of efficiency and purpose.</p>
        <Button asChild className="text-lg px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
          <Link href="/signin">Get Started</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingUI;
