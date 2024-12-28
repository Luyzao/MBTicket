import Image from "next/image";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import banner from "@/assets/banner.png";
import codigoBarras from "@/assets/codigo-barras.png";
import banner_pagamento from "@/assets/banner-pagamento.png";
import iconTicket from "@/assets/ticket.png";
import Tickets from "@/JSON/tickets.json";
import Cards from "@/JSON/cards.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { FaPlus, FaArrowLeft, FaBarcode } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { Dialog } from "primereact/dialog";
import { MdEdit } from "react-icons/md";
import { InputOtp } from "primereact/inputotp";
import { GiConfirmed } from "react-icons/gi";
import { FaPix } from "react-icons/fa6";
import { BsQrCode } from "react-icons/bs";
import { VscError } from "react-icons/vsc";

export default function Pagamento() {
  const [visible, setVisible] = useState(false);
  const [visibleCvv, setVisibleCvv] = useState(false);
  const router = useRouter();

  const [ticketInfo, setTicketInfo] = useState<any>();

  const [valor, setValor] = useState<any>();

  const [cartaoSelecionado, setcartaoSelecionado] = useState<any>(null);
  const [quantidade, setQuantidade] = useState(1);

  const [tokenCvv, setTokensCvv] = useState<any>(null);
  const [mensagem, setMensagem] = useState("");
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [formaDePagamento, setFormaDePagamento] = useState("");

  useEffect(() => {
    if (router.query) {
      Tickets.map((content: any) => {
        if (content.id == router.query.id) {
          console.log(content);
          setTicketInfo(content);
          setValor(content.valor);
        }
      });
    }
  }, [router.query]);

  useEffect(() => {
    setMensagem("");
    if (tokenCvv && tokenCvv.length == 3) {
      if (tokenCvv == cartaoSelecionado.cvv) {
        setPagamentoConfirmado(true);
      } else {
        setMensagem("CVV incorreto");
      }
    }
  }, [tokenCvv]);

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
          visible={visibleCvv}
          onHide={() => {
            if (!visibleCvv) return;
            setVisibleCvv(false);
          }}
          closable={false}
          draggable={false}
          className="w-18rem md:w-20rem"
        >
          {pagamentoConfirmado ? (
            <div className="p-4 ">
              {cartaoSelecionado &&
              cartaoSelecionado.saldo < valor &&
              formaDePagamento == "" ? (
                <>
                  <div
                    className="text-center items-center"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <VscError size={80} className="text-red-500" />
                    <p className="text-red-600 font-bold">
                      Pagamento não realizado <br />
                      Saldo insuficiente
                    </p>
                  </div>

                  <Button
                    label="Trocar Forma de pagamento"
                    onClick={() => {
                      setVisibleCvv(false);
                      setPagamentoConfirmado(false);
                      setVisible(true);
                      setcartaoSelecionado(null);
                      setTokensCvv(null);
                    }}
                    className="p-1 mt-3 px-2 w-full text-purple-600 hover:bg-purple-600 hover:text-white"
                  />
                </>
              ) : (
                <>
                  <div
                    className="text-center items-center"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <GiConfirmed size={80} className="text-green-500" />
                    <p className="text-green-600 font-bold">
                      Pagamento realizado <br />
                      com Sucesso
                    </p>
                  </div>

                  <Button
                    label="Voltar"
                    onClick={() => {
                      setVisibleCvv(false);
                      setTokensCvv(null);
                      window.location.href = "/";
                    }}
                    className="p-1 mt-3 px-2 w-full text-purple-600 hover:bg-purple-600 hover:text-white"
                  />
                </>
              )}
            </div>
          ) : (
            <>
              {formaDePagamento == "pix" ? (
                <div className="p-4 ">
                  <p className="mb-3 font-semibold  text-center">
                    QR Code do PIX
                  </p>
                  <div className=" pb-4 flex justify-center">
                    <BsQrCode size={120} />
                  </div>

                  <Button
                    label="Já realizei o pagemento"
                    onClick={() => {
                      setFormaDePagamento("");
                      setPagamentoConfirmado(true);
                    }}
                    className="p-1 px-2 w-full text-purple-600 hover:bg-purple-600 hover:text-white"
                  />
                </div>
              ) : formaDePagamento === "boleto" ? (
                <div className="p-4 ">
                  <p className="mb-3 font-semibold text-center">
                    Codigo de barras Boleto
                  </p>
                  <div className="flex justify-center">
                    <Image
                      src={codigoBarras}
                      alt={"codigo de  barras"}
                      width={2980}
                      height={2080}
                      className="w-15rem h-auto"
                    />
                  </div>
                  <Button
                    label="Já realizei o pagemento"
                    onClick={() => {
                      setFormaDePagamento("");
                      setPagamentoConfirmado(true);
                    }}
                    className="p-1 px-2 w-full text-purple-600 hover:bg-purple-600 hover:text-white"
                  />
                </div>
              ) : (
                <div className="p-4 ">
                  <p className="mb-3 font-semibold">Digite o CVV</p>
                  <div className=" pb-4">
                    <p className="text-red-500 text-sm  text-center">
                      {mensagem}
                    </p>
                    <div className="card flex bg-purple-500 justify-content-center p-4 border-round-2xl">
                      <InputOtp
                        value={tokenCvv}
                        className="bordeer-1"
                        length={3}
                        onChange={(e) => setTokensCvv(e.value)}
                        integerOnly
                      />
                    </div>
                  </div>

                  <Button
                    label="Voltar"
                    onClick={() => {
                      setVisibleCvv(false);
                      setTokensCvv(null);
                    }}
                    className="p-1 px-2 w-full text-purple-600 hover:bg-purple-600 hover:text-white"
                  />
                </div>
              )}
            </>
          )}
        </Dialog>
      </div>
      <div className="card flex justify-content-center ">
        <Dialog
          visible={visible}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          closable={true}
          draggable={false}
          className="w-18rem md:w-20rem"
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
              <div className="flex items-center gap-3">
                <div
                  onClick={() => {
                    setFormaDePagamento("pix");
                    setVisible(false);
                    setVisibleCvv(true);
                  }}
                  className="p-2 shadow-3  flex  items-center gap-2 border-round-2xl text-green-600 hover:text-white hover:bg-green-600"
                  style={{
                    transition: "all 0.3s",
                  }}
                >
                  <FaPix />
                  <p>Pix</p>
                </div>
                <div
                  onClick={() => {
                    setFormaDePagamento("boleto");
                    setVisible(false);
                    setVisibleCvv(true);
                  }}
                  className="p-2 shadow-3  flex  items-center gap-2 border-round-2xl text-gray-800 hover:text-white hover:bg-gray-800"
                  style={{
                    transition: "all 0.3s",
                  }}
                >
                  <FaBarcode />
                  <p>Boleto</p>
                </div>
              </div>

              {Cards.map((content: any) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        setcartaoSelecionado(content);
                        setVisible(false);
                      }}
                      className="p-3 cursor-pointer hover:bg-purple-600 hover:text-white border-round-2xl shadow-3"
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
        className="bg-gray-900 w-full md:px-0 px-2 md:py-8 py-6 flex justify-center items-center"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className=" mt-4 md:w-auto w-full border-3 p-2 pb-4 border-round-3xl pt-5 px-2 md:px-4 border-gray-800 bg-gray-800">
          <Image
            src={banner}
            alt={""}
            width={2980}
            height={2080}
            className="w-auto shadow-6 mb-5 md:h-8rem md:border-round-3xl border-round-2xl"
          />
          <div className="bg-white border-round-3xl py-3">
            <p className="font-extrabold text-3xl md:text-6xl  text-center text-gray-700">
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
                <p className="text-center mb-1 text-xs md:text-sm font-semibold">
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
                    className=" w-5rem md:w-7rem my-2 p-1 h-auto border-round-3xl"
                  />
                  <p className="text-sm md:text-xl font-semibold text-center w-15rem">
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
                  {cartaoSelecionado ? (
                    <div className="w-full mt-4 ">
                      <div
                        className="p-3  bg-purple-600 text-white border-round-2xl shadow-3 flex justify-content-between mb-3"
                        style={{
                          transition: "all 0.3s",
                        }}
                      >
                        <div>
                          <p>
                            {cartaoSelecionado.nome} - {cartaoSelecionado.tipo}
                          </p>
                          <p>{cartaoSelecionado.numero}</p>
                          <p>{cartaoSelecionado.vencimento}</p>
                        </div>
                        <MdEdit
                          size={30}
                          onClick={() => {
                            setVisible(true);
                            setcartaoSelecionado(null);
                          }}
                          className="bg-white p-1 cursor-pointer border-round-3xl text-purple-600"
                        />
                      </div>
                      <Button
                        className="bg-green-500 shadow-3  hover:bg-green-600 border-round-3xl w-full text-white px-3  py-2 text-xl"
                        label="CONFIRMAR PAGAMENTO"
                        onClick={() => setVisibleCvv(true)}
                      />
                    </div>
                  ) : (
                    <Button
                      className="bg-green-500 shadow-3 mt-4 md:mt-7 hover:bg-green-600 border-round-3xl w-12 md:w-full text-white px-3  py-2 md:text-xl"
                      label="FORMA DE PAGAMENTO"
                      onClick={() => setVisible(true)}
                    />
                  )}

                  <p className="w-18rem md:w-24rem text-center text-xs">
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
                className="w-19rem md:w-25rem shadow-6 md:mb-5 h-auto border-round-3xl"
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
