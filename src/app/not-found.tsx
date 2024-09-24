import Link from "next/link";
import NotFoundPlayer from "./components/players/NotFoundPlayer";

export default function NotFound() {
  return (
    <div className="w-11/12 md:w-9/12 mx-auto text-center">
      <NotFoundPlayer />

      <p className="text-xl text-center font-semibold">Ooops! Could not find requested page</p>
      <Link href="/" className="text-center text-primary underline">
        Return Home
      </Link>
    </div>
  );
}
