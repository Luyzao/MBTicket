import { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Tickets from "@/JSON/tickets.json";
import { Button } from "primereact/button";
import Image from "next/image";
import iconTicket from "@/styles/ticket.png";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import banner from "@/styles/banner.png";
import { InputText } from "primereact/inputtext";
import { IoSearchOutline } from "react-icons/io5";
import { Toolbar } from "primereact/toolbar";
import iconMB from "@/styles/icon.png";

export default function Home() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    const updatedFilters = { ...filters };

    updatedFilters["global"].value = value;

    setFilters(updatedFilters);
    setGlobalFilterValue(value);
  };

  const headerLeft = (
    <div className="table-header p-3   w-full">
      <div className="flex gap-8 w-full items-center">
        <h2 className="font-extrabold text-white text-3xl">Tickets</h2>
      </div>
    </div>
  );
  const headerRight = (
    <div className="table-header p-3   w-full">
      <div className="flex gap-8 w-full items-center">
        <div className="flex bg-white border-round-3xl px-3 shadow-5 items-center">
          <IoSearchOutline className="text-black" />
          <InputText
            type="text"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            className="p-1 border-0 px-3 text-black"
            placeholder="Pesquisar"
            style={{ maxWidth: "300px" }}
          />
        </div>
      </div>
    </div>
  );

  const pagamentoRouter = (Id: number) => {
    window.location.href = `/pagamento/?id=${Id}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TicketsDisponivel = (rowData: any) => {
    return (
      <>
        {rowData.disponivel ? (
          <Button
            label="COMPRAR"
            className="w-11  text-white p-1 border-round-3xl px-3 hover:bg-purple-800"
            onClick={() => pagamentoRouter(rowData.id)}
            style={{ backgroundColor: "#8c52ff" }}
          />
        ) : (
          <Button
            disabled
            label="ESGOTADO"
            className=" w-11 bg-gray-600 text-white p-1 border-round-3xl px-3"
          />
        )}
      </>
    );
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TicketsImage = (rowData:any) => {
    return (
      <>
        <div className="flex items-center justify-center">
          {
            <div className="items-center p-1" style={{
              display:"flex",
              flexDirection:"column"
            }}>
            <Image
              src={iconTicket}
              alt={"ticket"}
              width={1920}
              height={1080}
              className=" w-auto h-6rem "
            />
            <p className="text-xs">
              {rowData.data}
            </p>
            </div>
          }
        </div>
      </>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatarNome = (rowData: any) =>{
      return(
         <>
            <div>
              <p>
                {rowData.nome}
              </p>
              <p className="text-xs font-thin">
                {rowData.organizacao}
              </p>
            </div>
         </>
      )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatarValor = (valor: any) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderizarValor = (rowData: any) => {
    return formatarValor(rowData.valor);
  };

  return (
    <section className="bg-gray-900 w-full py-8 flex justify-center">
      <div className=" mt-4 border-3 p-2 border-round-3xl pt-5 px-4 border-gray-800 bg-gray-800">
        <Image
          src={banner}
          alt={""}
          width={2980}
          height={2080}
          className="w-auto shadow-6 mb-5 h-14rem border-round-3xl"
        />
        <div className="card  border-round-3xl">
          <Toolbar
            className="mb-4 w-full border-round-2xl"
            left={headerLeft}
            right={headerRight}
            style={{ backgroundColor: "#8c52ff" }}
          ></Toolbar>
          <DataTable
            value={Tickets}
            paginator
            rows={5}
            stripedRows
            size={"large"}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  "
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            filters={filters}
            filterDisplay="menu"
            className="w-full border-round-2xl p-3 pt-2 bg-white pb-4 mb-5 shadow-8"
            globalFilterFields={["nome", "valor"]}
            emptyMessage="Evento não econtrado."
          >
            <Column body={TicketsImage} style={{ minWidth: "9rem" }} />
            <Column
              field="nome"
              header="Nome"
              body={formatarNome}
              sortable
              className="font-bold"
              style={{ minWidth: "25rem", height: "3rem" }}
            />
            <Column
              body={renderizarValor}
              header="Valor"
              field="valor"
              sortable
              style={{ minWidth: "7rem" }}
              className="text-left"
            />
            <Column body={TicketsDisponivel} style={{ minWidth: "12rem" }} />
          </DataTable>
          <div className="flex w-full justify-center items-center text-center mt-1 z-50">
            <div
              className="flex items-center pr-2 justify-content-around shadow-6 px-3 m-2 border-round-2xl"
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
        </div>
      </div>
    </section>
  );
}
