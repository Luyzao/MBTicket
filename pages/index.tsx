import { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Tickets from "@/JSON/tickets.json";
import { Button } from "primereact/button";
import Image from "next/image";
import iconTicket from "@/assets/ticket.png";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import banner from "@/assets/banner.png";
import { InputText } from "primereact/inputtext";
import { IoSearchOutline } from "react-icons/io5";
import { Toolbar } from "primereact/toolbar";
import iconMB from "@/assets/icon.png";

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

  
  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    const updatedFilters = { ...filters };

    updatedFilters["global"].value = value;

    setFilters(updatedFilters);
    setGlobalFilterValue(value);
  };

  const headerLeft = (
    <div className="table-header p-3 w-full">
      <div className="flex md:gap-8 w-full items-center">
        <h2 className="font-extrabold text-white md:text-3xl">Tickets</h2>
      </div>
    </div>
  );
  const headerRight = (
    <div className="table-header p-3 w-full">
      <div className="flex md:gap-8 w-full items-center">
        <div className="flex bg-white border-round-3xl px-3 shadow-5 items-center">
          <IoSearchOutline className="text-black" />
          <InputText
            type="text"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            className="p-1 border-0 w-7rem md:w-full px-3 text-black"
            placeholder="Pesquisar"
          />
        </div>
      </div>
    </div>
  );

  const pagamentoRouter = (Id: number) => {
    window.location.href = `/pagamento/?id=${Id}`;
  };

  
  const TicketsDisponivel = (rowData: any) => {
    return (
      <>
        {rowData.disponivel ? (
          <Button
            label="COMPRAR"
            className="w-11 md:text-md text-xs text-white p-1 border-round-3xl px-3 hover:bg-purple-800"
            onClick={() => pagamentoRouter(rowData.id)}
            style={{ backgroundColor: "#8c52ff" }}
          />
        ) : (
          <Button
            disabled
            label="ESGOTADO"
            className="w-11 md:text-md text-xs bg-gray-600 text-white p-1 border-round-3xl px-3"
          />
        )}
      </>
    );
  };
  
  const TicketsImage = (rowData: any) => {
    return (
      <>
        <div className="flex items-center justify-center">
          {
            <div
              className="items-center p-1"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Image
                src={iconTicket}
                alt={"ticket"}
                width={1920}
                height={1080}
                className=" w-auto h-3rem md:h-6rem "
              />
              <p className="text-xs">{rowData.data}</p>
            </div>
          }
        </div>
      </>
    );
  };

  
  const formatarNome = (rowData: any) => {
    return (
      <>
        <div>
          <p className="md:text-md text-sm">{rowData.nome}</p>
          <p className="text-xs font-thin text-purple-700">
            {rowData.organizacao}
          </p>
        </div>
      </>
    );
  };

  
  const formatarValor = (valor: any) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  
  const renderizarValor = (rowData: any) => {
    return formatarValor(rowData.valor);
  };

  return (
    <section className="bg-gray-900 md:px-0 px-2 w-full py-6 md:py-8 flex justify-center">
      <div className=" mt-4 md:w-auto w-full border-3 p-2 border-round-3xl pt-3 md:pt-5  md:px-4 border-gray-800 bg-gray-800">
        <Image
          src={banner}
          alt={""}
          width={2980}
          height={2080}
          className="w-auto shadow-6 mb-5 h-auto md:h-14rem md:border-round-3xl border-round-2xl"
        />
        <div className="card  border-round-3xl">
          <Toolbar
            className="mb-4 w-auto md:w-full border-round-2xl"
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
            className="w-full border-round-2xl p-3 pt-2 bg-white pb-4 mb-5 shadow-8 "
            globalFilterFields={["nome", "valor"]}
            emptyMessage="Evento não econtrado."
          >
            <Column
              body={TicketsImage}
              style={{ minWidth: "5rem", maxWidth: "9rem" }}
            />
            <Column
              field="nome"
              header="Nome"
              body={formatarNome}
              sortable
              className="font-bold md:px-0 px-3 md:py-0 py-4"
              style={{ minWidth: "5rem", height: "3rem", maxWidth: "25rem" }}
            />
            <Column
              body={renderizarValor}
              header="Valor"
              field="valor"
              sortable
              style={{ minWidth: "7rem" }}
              className="text-left md:text-md text-sm"
            />
            <Column
              body={TicketsDisponivel}
              style={{ minWidth: "7rem", maxWidth: "12rem" }}
            />
          </DataTable>
          <div className="flex  md:w-full justify-center items-center text-center mt-1 z-50">
            <div
              className="flex items-center pr-2 justify-content-around shadow-6 md:px-3 m-2 border-round-2xl"
              style={{
                backgroundColor: "#8c52ff",
              }}
            >
              <Image
                src={iconMB}
                alt={"icon-mbTickts"}
                width={1920}
                height={1080}
                className=" w-auto  h-3rem md:h-5rem"
              />
              <h1 className="text-white font-extrabold text-left text-xs md:text-xl w-10 md:w-7">
                Precisando de ajuda para comprar seu ticket?
              </h1>
              <Button
                label="Falar com suporte"
                onClick={() => window.open("https://w.app/SuporteDaMbTicket")}
                className="bg-white text-black md:p-2  text-xs md:text-1xl  py-1  px-2 md:px-3 border-round-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
