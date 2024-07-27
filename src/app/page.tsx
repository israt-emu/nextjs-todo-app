import {Button} from "@/components/ui/button";
import Link from "next/link";
import logo from "../assets/task-logo.png";
import Image from "next/image";
const Home = async () => {
  return (
    <section className="w-6/12 mx-auto mt-10 p-5 border items-center justify-center">
      <Image src={logo} alt="logo" className="w-4/12 mx-auto" />
      <div className="flex items-center justify-center mt-4">
        <Button>
          <Link href="/signin">Login</Link>
        </Button>
        <p className="font-semibold mx-5">OR</p>
        <Button className="bg-secondary">
          <Link href="signup">Sign Up</Link>
        </Button>
      </div>
    </section>
  );
};

export default Home;
