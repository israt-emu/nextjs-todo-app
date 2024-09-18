import {Button} from "@/components/ui/button";
import Link from "next/link";
import logo from "../assets/banner.png";
import Image from "next/image";

import {ModeToggle} from "./components/navbar/theme";
import NotePlayer from "./components/NotePlayer";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-end py-3 px-4">
        <ModeToggle />
      </div>
      <section className="w-11/12 sm:w-10/12 md:w-9/12 mx-auto mt-2 md:mt-5 p-5 items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <NotePlayer />
          <div>
            <div className="text-2xl font-semibold">Sculpt your aspirations, ideas, and records into harmony</div>
            <div className="text-sm mx-auto my-2">Learn to artfully shape your goals, streamline your thoughts, and arrange your information into a cohesive system. Transform the chaos of daily life into a masterpiece of efficiency and purpose.</div>
            <div className="flex items-center justify-start mt-4">
              <Button className="h-10">
                <Link href="/signin">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
