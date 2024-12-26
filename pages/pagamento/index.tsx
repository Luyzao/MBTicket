import Image from "next/image";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import banner from "@/styles/banner.png";
import banner_pagamento from "@/styles/banner-pagamento.png";
import iconTicket from "@/styles/ticket.png";
import Tickets from "@/JSON/tickets.json";
import Cards from "@/JSON/cards.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { Dialog } from "primereact/dialog";

export default function Pagamento() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ticketInfo, setTicketInfo] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [valor, setValor] = useState<any>();

  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    if (router.query) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Tickets.map((content: any) => {
        if (content.id == router.query.id) {
          console.log(content);
          setTicketInfo(content);
          setValor(content.valor);
        }
      });
    }
  }, [router.query]);

  const handleQuantidadeChange = (type: "add" | "subtract") => {
    if (type === "add") {
      setQuantidade((prevQuantidade) => {
        const novaQuantidade = prevQuantidade + 1;
        setValor(ticketInfo.valor * novaQuantidade);
        return novaQuantidade;
      });
    } else if (type === "subtract") {
      setQuantidade((prevQuantidade) => {
        if (prevQuantidade > 1) {
          const novaQuantidade = prevQuantidade - 1;
          setValor(ticketInfo.valor * novaQuantidade);
          return novaQuantidade;
        }
        return prevQuantidade;
      });
    }
  };

  return (
    <>
      <div className="card flex justify-content-center">
        <Dialog
          visible={visible}
          style={{ width: "18vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          draggable={false}
        >
          <div className="p-4 ">
            <p className="mb-3 font-semibold">Cartões cadastrados</p>
            <div
              className="gap-3 pb-4"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {Cards.map((content: any) => {
                return (
                  <>
                    <div
                      className="p-3  hover:bg-purple-600 hover:text-white border-round-2xl shadow-3"
                      style={{
                        transition: "all 0.3s",
                      }}
                    >
                      <p>
                        {content.nome} - {content.tipo}
                      </p>
                      <p>{content.numero}</p>
                      <p>{content.vencimento}</p>
                    </div>
                  </>
                );
              })}
            </div>

            <Button
              label="Voltar"
              onClick={() => setVisible(false)}
              className="p-1 px-2 w-full text-purple-600 hover:bg-purple-600 hover:text-white"
            />
          </div>
        </Dialog>
      </div>
      <section
        className="bg-gray-900 w-full  py-8 flex justify-center items-center"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className=" mt-4 border-3 p-2 pb-4 border-round-3xl pt-5 px-4 border-gray-800 bg-gray-800">
          <Image
            src={banner}
            alt={""}
            width={2980}
            height={2080}
            className="w-auto shadow-6 mb-5 h-8rem border-round-3xl"
          />
          <div className="bg-white border-round-3xl py-3">
            <p className="font-extrabold text-6xl  text-center text-gray-700">
              PAGAMENTO
            </p>

            <div
              className=" text-black p-4 justify-center items-center"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="  justify-center "
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p className="text-center mb-1 text-sm font-semibold">
                  {ticketInfo && ticketInfo.organizacao}
                </p>
                <div
                  className="shadow-3 flex px-3 items-center mb-5 text-white border-round-3xl "
                  style={{
                    backgroundColor: "#8c52ff",
                  }}
                >
                  <Image
                    src={iconTicket}
                    alt={""}
                    width={2980}
                    height={2080}
                    className="w-7rem my-2 p-1 h-auto border-round-3xl"
                  />
                  <p className="text-xl font-semibold text-center w-15rem">
                    {ticketInfo && ticketInfo.nome}
                  </p>
                </div>
              </div>

              <div
                className=" justify-content-between border-round-3xl  px-4 text-left"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className=" w-full">
                  <div className=" w-full flex p-1 justify-content-between">
                    <p>SubTotal</p>
                    <p>{ticketInfo && `R$ ${ticketInfo.valor}`}</p>
                  </div>
                  <div className=" w-full flex p-1 justify-content-between">
                    <p>Quantidade</p>

                    <div className="flex gap-2 items-center text-center">
                      <Button
                        className="bg-green-500 hover:bg-green-700 p-1 text-white"
                        onClick={() => handleQuantidadeChange("add")}
                      >
                        <FaPlus size={12} />
                      </Button>
                      {quantidade}
                      <Button
                        className="bg-red-500 hover:bg-red-700 p-1 text-white"
                        onClick={() => handleQuantidadeChange("subtract")}
                      >
                        <RiSubtractFill size={12} />
                      </Button>
                    </div>
                  </div>
                  <div className=" w-full mt-8 border-top-2 flex p-1 justify-content-between border-black">
                    <p>Total</p>
                    <p>{valor && `R$ ${valor}`}</p>
                  </div>
                </div>
                <div
                  className=" gap-3 items-center"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    className="bg-green-500 shadow-3 mt-7 hover:bg-green-600 border-round-3xl w-full text-white px-3  py-2 text-xl"
                    label="CONFIRMAR PAGAMENTO"
                    onClick={() => setVisible(true)}
                  />{" "}
                  <p className="w-20rem text-xs">
                    Revise as informações do seu pedido e escolha a forma de
                    pagamento para garantir seu ingresso. ✔️ Seguro e rápido!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center py-2">
              <Image
                src={banner_pagamento}
                alt={""}
                width={2980}
                height={2080}
                className="w-25rem shadow-6 mb-5 h-auto border-round-3xl"
              />
            </div>
          </div>
        </div>
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-white mt-3 p-2 border-circle text-black shadow-8 hover:bg-gray-800 hover:text-white "
          style={{
            transition: "all 0.3s",
          }}
        >
          <FaArrowLeft size={20} />
        </Button>
      </section>
    </>
  );
}
