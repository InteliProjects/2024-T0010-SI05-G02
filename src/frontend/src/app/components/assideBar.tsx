"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserPlus, CirclePlus, History, LogOut, Search } from "lucide-react";
import Logo from "../assets/Logo.svg";
import Link from "next/link";
import { ethers } from "ethers";
import ContratoTempusABI from "@/constants/abi"; // Importa a ABI do contrato, que é necessária para interação
const contractAddress = "0x9b3cE553d83a29EE2deD42cA479B90B937D07E6C";

interface Properties {
  page: string;
}

const AssideBar: React.FC<Properties> = ({ page }) => {
  const [carteiraConectada, setCarteiraConectada] = useState<string>("");
  const [dono, setDono] = useState<boolean>(false);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        accounts[0] && setCarteiraConectada(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("conecte a metamask");
      // colocar o link para direcionar ao site do metamask
    }
  }

  async function verificaDono() {
    // Verifica se o Ethereum está disponível no navegador (por exemplo, se o MetaMask está instalado)
    if (typeof window.ethereum !== "undefined") {
      try {
        // Solicita ao usuário para conectar sua carteira Ethereum ao website
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum); // Cria um provedor Ethereum usando o ethers
        const signer = await provider.getSigner(); // Obtém o signer do provedor, que permite transações
        const contrato = new ethers.Contract(
          contractAddress,
          ContratoTempusABI,
          signer
        ); // Cria uma instância do contrato

        // Chama a função `cadastrarCliente` do contrato, passando nome e endereço da carteira como argumentos
        const tx = await contrato.owner();
        `${tx}`.toLowerCase() === carteiraConectada.toLowerCase() && setDono(true);
        console.log(tx, " " ,carteiraConectada, " ", tx === carteiraConectada );
        
      } catch (error) {
        console.error(error); // Loga o erro no console se a transação falhar
        alert("Houve um erro ao tentar encontrar");
      }
    } else {
      alert("Por favor, instale o Metamask."); // Alerta o usuário para instalar o MetaMask caso não esteja instalado
    }
  }

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {verificaDono()}, [carteiraConectada])

  return (
    <main className="flex flex-grow min-h-screen flex-row justify-start z-10 fixed">
      <div className="flex w-20 group hover:w-56 flex-col items-center bg-black">
        <div className="flex w-full h-24 items-center justify-center bg-black">
          <Image
            src={Logo}
            alt="logo"
            width="56"
            height="56"
            className="w-14"
          />
          <span className="text-white text-3xl font-extralight hidden leading-4 w-24 mx-3 text-left group-hover:block transition-opacity">
            Tempus
          </span>
        </div>
        <div className="flex h-full pr-2 flex-col justify-center gap-10">
          <div className="flex items-center gap-2">
            <Link
              href="/busca"
              className="flex flex-row items-center justify-between"
            >
              <Search
                size={35}
                color={page === "search" ? "#767676" : "white"}
                strokeWidth={1}
              />
              <span
                className={`hidden ${
                  page === "search" ? "text-[#767676]" : "text-white"
                } leading-4 w-24 mx-3 text-left group-hover:block transition-opacity`}
              >
                Buscar
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/cadastro-transacao"
              className="flex flex-row items-center justify-between"
            >
              <CirclePlus
                size={35}
                color={page === "add" ? "#767676" : "white"}
                strokeWidth={1}
              />
              <span
                className={`hidden ${
                  page === "add" ? "text-[#767676]" : "text-white"
                } leading-4 w-24 mx-3 text-left group-hover:block transition-opacity`}
              >
                Cadastro de transações
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/historico-transacao"
              className="flex flex-row items-center justify-between"
            >
              <History
                size={35}
                color={page === "history" ? "#767676" : "white"}
                strokeWidth={1}
              />
              <span
                className={`hidden ${
                  page === "history" ? "text-[#767676]" : "text-white"
                } leading-4 w-24 mx-3 text-left group-hover:block transition-opacity`}
              >
                Histórico de transações
              </span>
            </Link>
          </div>
          {dono && (
            <>
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex flex-row items-center justify-between"
                >
                  <UserPlus
                    size={35}
                    color={page === "cliente" ? "#767676" : "white"}
                    strokeWidth={1}
                  />
                  <span
                    className={`hidden ${
                      page === "cliente" ? "text-[#767676]" : "text-white"
                    } leading-4 w-24 mx-3 text-left group-hover:block transition-opacity`}
                  >
                    Cadastrar Cliente
                  </span>
                </Link>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <button className="flex flex-row items-center justify-between">
              <LogOut size={35} color="white" strokeWidth={1} />
              <span className="hidden text-white leading-4 w-24 mx-3 text-left group-hover:block transition-opacity">
                Sair
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssideBar;
