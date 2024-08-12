import {Button} from "@/components/ui/button";
import Link from "next/link";
import logo from "../assets/banner.png";
import Image from "next/image";
import Lottie from "react-lottie";
import animation from "../animations/home.json";
import {ModeToggle} from "./components/navbar/theme";
const Home = () => {
  const defaultOptions = {
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <section className="w-6/12 mx-auto mt-8 p-5 items-center justify-center">
      <div className="flex items-center justify-end py-3 px-4">
        <ModeToggle />
      </div>
      <Image src={logo} alt="logo" className="w-8/12 mx-auto" />
      {/* <Lottie options={defaultOptions} /> */}
      <div className="text-2xl text-center font-semibold">Sculpt your aspirations, ideas, and records into harmony</div>
      <div className="text-center text-sm w-10/12 mx-auto">Learn to artfully shape your goals, streamline your thoughts, and arrange your information into a cohesive system. Transform the chaos of daily life into a masterpiece of efficiency and purpose.</div>
      <div className="flex items-center justify-center mt-4">
        <Button>
          <Link href="/signin">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};

export default Home;
