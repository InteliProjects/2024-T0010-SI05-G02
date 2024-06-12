"use client";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import AssideBar from "../components/assideBar";
import { ethers } from "ethers";

const inter = Inter({ subsets: ["latin"] });

interface Produto {
  name: string;
  sku: string;
}

interface Transacao {
  quantidade: number;
  preco: number;
  sku: string;
  timeStamp: string;
  produto: Produto;
  timestamp: Date;
}

const ITEMS_PER_PAGE = 6; // Definindo quantos itens por página serão mostrado

export default function History() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual
  const [transacoes, setTransacoes] = useState<Transacao[]>([]); // Estado para armazenar transações
  const [carteira, setCarteira] = useState<string>("");
  const [carteiraUsuario, setCarteiraUsuario] = useState<string>("");

  function getCookie(name: string): string {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : "";
  }

  useEffect(() => {
    setCarteiraUsuario(getCookie("carteira"));
  }, []);
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        accounts[0] && setCarteira(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("conecte a metamask");
      // colocar o link para direcionar ao site do metamask
    }
  }

  useEffect(() => {
    connect();
  }, []);
  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        // Substitua 'wallet_address' pelo endereço da carteira desejado
        const response = await axios.get<Transacao[]>(
          `http://localhost:3333/transacoes/wallet?wallet=${carteira}`
        );
        console.log(response.data);

        setTransacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações", error);
      }
    };

    carteira !== "" ? fetchTransacoes() : null;

    console.log(carteira);
  }, [carteira]);

  const totalPages = Math.ceil(transacoes.length / ITEMS_PER_PAGE); // Calculando o total de páginas

  // Função para calcular o índice dos itens a serem mostrados baseado na página atual
  const firstItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const lastItemIndex = firstItemIndex + ITEMS_PER_PAGE;
  const itemsToShow = transacoes.slice(firstItemIndex, lastItemIndex); // Itens a serem mostrados na página atual

  // Funções para controlar a mudança de página
  const goToNextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <>
      {carteiraUsuario !== "" && carteiraUsuario === carteira ? (
        <main className="flex min-h-screen flex-row flex-1">
          <AssideBar page="history" />
          <div className="flex flex-col w-full items-center mt-9">
            <h1 className="text-3xl self-start bg-black text-white font-light rounded-md py-4 pr-4 pl-52 mb-20">
              Meu Histórico de Transações
            </h1>

            <div className="w-2/3">
              <div className="flex w-full justify-between px-1 pb-6 border-b-gray-400 border-b-2">
                <label className="font-bold text-lg">Produto</label>
                <label className="font-bold text-lg">Preço</label>
                <label className="font-bold text-lg">Data</label>
              </div>
              {itemsToShow.map((item: Transacao, index) => (
                <div
                  key={index}
                  className="flex w-full justify-between px-1 py-4 border-b-gray-400 border-b-2"
                >
                  <label className="font-semibold text-lg">
                    {item.produto.name}
                  </label>
                  <label className="text-lg">{`R$ ${item.preco.toFixed(
                    2
                  )}`}</label>
                  <label className="text-lg">
                    {new Date(item.timestamp).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-4 my-4">
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Próximo
              </button>
            </div>
          </div>
        </main>
      ) : (
        <p>404</p>
      )}
    </>
  );
}
