import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ModeToggle} from "./components/navbar/theme";
import NotePlayer from "./components/players/NotePlayer";
import LandingUI from "./components/landing/LandingUI";

const Home = () => {
  return (
    // <div className="relative">
    //   <div className="flex items-center justify-end py-3 px-4 absolute top-2 right-2">
    //     <ModeToggle />
    //   </div>
    //   <section className="w-11/12 sm:w-10/12 md:w-9/12 mx-auto p-5 h-screen flex flex-col items-center justify-center">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
    //       <NotePlayer />
    //       <div>
    //         <div className="text-2xl sm:text-3xl font-semibold">Sculpt your aspirations, ideas, and records into harmony</div>
    //         <div className="text-sm mx-auto my-2">Learn to artfully shape your goals, streamline your thoughts, and arrange your information into a cohesive system. Transform the chaos of daily life into a masterpiece of efficiency and purpose.</div>
    //         <div className="flex items-center justify-start mt-4">
    //           <Button className="h-10">
    //             <Link href="/signin">Get Started</Link>
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
      <div className="container mx-auto px-4 py-16 h-full flex items-center">
        <LandingUI />
      </div>
    </div>
  );
};

export default Home;
