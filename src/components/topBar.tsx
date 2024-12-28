import Image from "next/image";
import iconMB from "@/assets/icon.png";
import { Button } from "primereact/button";

export default function TopBar() {
  return (
    <>
      <div className="flex w-full fixed justify-center items-center text-center mt-1 z-50">
        <div
          className="flex items-center md:w-auto w-11 pr-2 justify-content-around shadow-6 md:px-3 mt-2 border-round-2xl"
          style={{
            backgroundColor: "#8c52ff",
          }}
        >
          <Image
            src={iconMB}
            alt={"icon-mbTickts"}
            width={1920}
            height={1080}
            className=" w-auto h-3rem md:h-5rem"
          />
          <h1 className="text-white font-extrabold text-left text-xs md:text-xl md:w-7">
            Precisando de ajuda para comprar seu ticket?
          </h1>
          <Button
            label="Falar com suporte"
            onClick={() => window.open("https://w.app/SuporteDaMbTicket")}
            className="bg-white text-black md:p-2  text-xs md:text-1xl px-2 md:px-3 border-round-3xl"
          />
        </div>
      </div>
    </>
  );
}
