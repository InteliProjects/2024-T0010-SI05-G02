"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CirclePlus, BellRing } from "lucide-react";
import AssideBar from "../components/assideBar";
import { ethers } from "ethers";
import ContratoTempusABI from "@/constants/abi";
import { transacoes } from "../mock/historicoTransacoes";
import axios from "axios";
import LoadingScreen from "../components/loadingScreen";
// import { produtos } from '../mock/produtos';

// Endereço do contrato inteligente no blockchain
const contractAddress = "0x9b3cE553d83a29EE2deD42cA479B90B937D07E6C";

interface Produtos {
  name: string;
  sku: string;
}

interface DetalhesDaTransacao {
  id: number;
  nome: string;
  preco: number;
  sku: string;
  quantidade: number;
  timestamp: string;
  carteira1: string;
  carteira2: string;
  produto: Produtos;
}

const SearchBar: React.FC = () => {
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const [pesquisa, setPesquisa] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [detalhesDaTransacao, setDetalhesDaTransacao] =
    useState<DetalhesDaTransacao | null>(null);
  const [produtosComTransacao, setProdutosComTransacao] = useState<
    DetalhesDaTransacao[] | null
  >();
  const [carteiraUsuario, setCarteiraUsuario] = useState<string>("");
  const [carteiraConectada, setCarteiraConectada] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false)
  
  function getCookie(name: string): string {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : "";
  }

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

  useEffect(() => {
    connect();
  }, []);
  useEffect(() => {
    setCarteiraUsuario(getCookie("carteira"));
  }, []);

  const formatarData = (data: string): string => {
    var dataDate = new Date(data);
    const dia = `0${dataDate.getDate()}`.slice(-2);
    const mes = `0${dataDate.getMonth() + 1}`.slice(-2); // getMonth() retorna 0-11
    const ano = dataDate.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };
  const getProdutosAndTransacoes = async () => {
    try {
      const responseProdutos = await axios.get<Produtos[]>(
        "http://localhost:3333/produtos"
      );
      console.log(responseProdutos.data);
      const responseTransacoes = await axios.get<DetalhesDaTransacao[]>(
        `http://localhost:3333/transacoes/validar/${carteiraUsuario}`
      );
      console.log(responseTransacoes.data);
      console.log("carteiraUsuario ", carteiraUsuario);

      setProdutos(responseProdutos.data);
      setProdutosComTransacao(responseTransacoes.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const validaWeb2 = async (id: number) => {
    try {
      const response = await axios.put(
        `http://localhost:3333/transacoes/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response", error.response.data);
        console.error("Error status", error.response.status);
        console.error("Error headers", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message", error.message);
      }
      console.error("Error config", error.config);
    }
  };

  useEffect(() => {
    getProdutosAndTransacoes();
  }, [carteiraUsuario]);

  const openModalWithDetails = (
    transacaoCorrespondente: DetalhesDaTransacao
  ) => {
    console.log(transacaoCorrespondente);

    setDetalhesDaTransacao(transacaoCorrespondente);

    setShowModal(true);
    setShowNotifications(false);
  };

  async function registrarDetalhesTransacao() {
    if (!detalhesDaTransacao || !window.ethereum) {
      console.log("aa");

      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contrato = new ethers.Contract(
        contractAddress,
        ContratoTempusABI,
        signer
      );
      console.log("aaa", detalhesDaTransacao);
      console.log(
        Math.floor(new Date(detalhesDaTransacao.timestamp).getTime() / 1000)
      );

      const tx = await contrato.validarDetalhesTransacao(
        detalhesDaTransacao.carteira1,
        detalhesDaTransacao.carteira2,
        `0x${detalhesDaTransacao.produto.sku}`,
        detalhesDaTransacao.quantidade,
        detalhesDaTransacao.preco,
        Math.floor(new Date(detalhesDaTransacao.timestamp).getTime() / 1000)
      );

      setCarregando(true)
      await tx.wait();
      validaWeb2(detalhesDaTransacao.id);
      setCarregando(false)
      setShowModal(false)
      setShowNotifications(false)
      getProdutosAndTransacoes()
      alert("Transação validada com sucesso!");
    } catch (error) {
      console.error(
        Math.floor(new Date(detalhesDaTransacao.timestamp).getTime() / 1000)
      );

      console.error("Erro ao validar a transação:", error);
      alert("Erro ao validar a transação. Veja o console para mais detalhes.");
    }
  }

  // Função para lidar com a submissão do formulário
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir o comportamento padrão do formulário
    if (pesquisa) {
      window.location.href = `/resultados/${pesquisa}`; // Redirecionar para a rota desejada
    }
  };

  return (
    <>
      {carteiraUsuario !== "" && carteiraUsuario === carteiraConectada ? (
        <>
          {carregando && <LoadingScreen/>}
          <AssideBar page="search" />
          <div className="fixed top-5 right-5 z-50">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 rounded-full text-black flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="absolute top-1 right-1 bg-orange-400 rounded-full text-white font-medium px-[0.35rem] text-sm">
                {produtosComTransacao &&
                  produtosComTransacao.length > 0 &&
                  produtosComTransacao.length}
              </div>
              <BellRing size={35} />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-12 w-96 bg-stone-800 text-white p-4 rounded-lg shadow-lg z-50">
                <ul>
                  {produtosComTransacao &&
                    produtosComTransacao.map((produto, index) => (
                      <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-700 p-2"
                        onClick={() => openModalWithDetails(produto)}
                      >
                        Transação de {produto.produto.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          {showModal && detalhesDaTransacao && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
              <div className="bg-black py-10 px-5 rounded-lg shadow-lg flex flex-col items-center space-y-4 text-white">
                <h2 className="text-xl font-semibold">
                  Solicitação de Transação
                </h2>
                <div className="flex flex-col space-y-2 w-full max-w-md">
                  <div className="flex items-center justify-between">
                    <p className="w-1/3">Produto:</p>
                    <input
                      className="flex-1 bg-stone-900 text-white"
                      value={detalhesDaTransacao.produto.name}
                      readOnly
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="w-1/3">Preço total:</p>
                    <input
                      className="flex-1 bg-stone-900 text-white"
                      value={detalhesDaTransacao.preco}
                      readOnly
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="w-1/3">Quantidade:</p>
                    <input
                      className="flex-1 bg-stone-900 text-white"
                      value={detalhesDaTransacao.quantidade}
                      readOnly
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="w-1/3">Data:</p>
                    <input
                      className="flex-1 bg-stone-900 text-white"
                      value={formatarData(detalhesDaTransacao.timestamp)}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={registrarDetalhesTransacao}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Confirmar Transação
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Negar Transação
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="search-container">
            <h1 className="title">Tempus</h1>
            <p className="subtitle">Qual item está procurando?</p>
            <div className="search-bar">
              <form
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  placeholder="Preço caneta bic..."
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </form>
              <Link href="/cadastro-transacao" passHref>
                <button className="flex flex-row gap-2 items-center px-4 py-2">
                  Cadastrar Transação
                  <CirclePlus size={20} />
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p>404</p>
      )}
    </>
  );
};

export default SearchBar;
