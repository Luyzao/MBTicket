import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="flex justify-center items-center text-center gap-3 py-3 fonte-thin bg-gray-950 border-top-1 border-blue-950">
        <FaReact size={25} className="text-cyan-500 spin-animation" />

        <div className="md:text-md text-xs">
          Site desenvolvido por <span className="font-bold"> Luiz Gustavo</span>
        </div>
        <Link target="_blank" href={"https://github.com/Luyzao"}>
          <FaGithub size={25} className="text-pink-300" />
        </Link>
        <Link
          target="_blank"
          href={"https://www.linkedin.com/in/luiz-gustavo-687b6721b/"}
        >
          <FaLinkedin size={25} className="text-pink-300" />
        </Link>
      </div>
    </>
  );
}
