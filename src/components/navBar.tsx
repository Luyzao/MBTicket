import Image from "next/image";
import iconMB from "@/styles/icon.png";
import { Button } from "primereact/button";

export default function NavBar() {
  return (
    <>
      <div className="flex w-full fixed justify-center items-center text-center mt-1 z-50">
        <div
          className="flex items-center pr-2 justify-content-around shadow-6 px-3 mt-2 border-round-2xl"
          style={{
            backgroundColor: "#8c52ff",
          }}
        >
          <Image
            src={iconMB}
            alt={"icon-mbTickts"}
            width={1920}
            height={1080}
            className=" w-auto h-5rem"
          />
          <h1 className="text-white font-extrabold text-left text-xl w-7">
            Precisando de ajuda para comprar seu ticket?
          </h1>
          <Button
            label="Falar com suporte"
            onClick={() => window.open("https://w.app/SuporteDaMbTicket")}
            className="bg-white text-black p-2 px-3 border-round-3xl"
          />
        </div>
      </div>
    </>
  );
}
