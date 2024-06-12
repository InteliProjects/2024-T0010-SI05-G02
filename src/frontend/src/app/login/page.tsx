"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Logo from "./assets/Logo.svg";
import Metamask from "./assets/metamask.svg";
import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { ethers } from "ethers"; // Importa a biblioteca ethers para interagir com a blockchain Ethereum
import ContratoTempusABI from "@/constants/abi"; // Importa a ABI do contrato, que é necessária para interação
const contractAddress = "0x9b3cE553d83a29EE2deD42cA479B90B937D07E6C";
import axios from "axios";
import AssideBar from "../components/assideBar";
import LoadingScreen from "../components/loadingScreen";


const inter = Inter({ subsets: ["latin"] });

// Endereço do Contrato

export default function Home() {
  const [nome, setNome] = useState("");
  const [enderecoCarteira, setEnderecoCarteira] = useState("");
  const [carteiraUsuario, setCarteiraUsuario] = useState<string>("")
  const [carteiraConectada, setCarteiraConectada] = useState<string>("")
  const [dono, setDono] = useState<boolean>(false)
  const [carregando, setCarregando] = useState<boolean>(false)


  function getCookie(name: string): string {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : "";
  }
  

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        accounts[0] && setCarteiraConectada(accounts[0])
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('conecte a metamask')
      // colocar o link para direcionar ao site do metamask
    }
  }

  useEffect(() => {connect()}, [])
  useEffect(() => {
      setCarteiraUsuario(getCookie("carteira"))
  }, []);

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
        tx === carteiraConectada && setDono(true)
        
              
      } catch (error) {
        console.error(error); // Loga o erro no console se a transação falhar
        alert("Houve um erro ao tentar encontrar");
      }
    } else {
      alert("Por favor, instale o Metamask."); // Alerta o usuário para instalar o MetaMask caso não esteja instalado
    }
  }

  useEffect(() => {verificaDono()}, [carteiraConectada, carteiraUsuario])


  type ClienteData = {
    nome: string;
    carteira: string;
    // adicione outros campos conforme necessário
  };

const adicionarClienteWeb2 = async (clienteData: ClienteData) => {
  try {
      const response = await axios.post('http://localhost:3333/clientes', clienteData);
      // Supondo que seu servidor esteja rodando na porta 3333
      console.log('Cliente adicionado:', response.data);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Erro ao adicionar cliente:', error.response?.data);
      } else {
          console.error('Erro desconhecido:', error);
      }
  }
};


  async function adicionarCliente() {
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
        const tx = await contrato.cadastrarCliente(nome, enderecoCarteira);
        setCarregando(true)
        await tx.wait(); // Aguarda a transação ser minerada
        await adicionarClienteWeb2({"nome": nome, "carteira": enderecoCarteira})
        setCarregando(false)
        alert("Cliente adicionado com sucesso!");
      } catch (error) {
        console.error(error); // Loga o erro no console se a transação falhar
        alert("Houve um erro ao tentar adicionar o cliente.");
      }
    } else {
      alert("Por favor, instale o Metamask."); // Alerta o usuário para instalar o MetaMask caso não esteja instalado
    }
  }

  return (
    <main className="flex min-h-screen flex-row justify-between">
      {carteiraUsuario !== '' && carteiraUsuario === carteiraConectada ? (
        <>
          {carregando && <LoadingScreen/>}
          <AssideBar page='cliente' />
          <div className="flex w-full px-96 justify-center flex-col">
            <div className="mt-24 flex flex-col items-center gap-9">
              <div className="flex flex-col gap-5">
                  <h1 className="text-6xl font-light">Bem-Vindo</h1>
                

                <label className="text-center text-gray-500">
                  Cadastre seu novo cliente
                </label>
              </div>
                <div className="flex flex-col w-full px-28 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-md">Qual o nome do cliente?</label>
                    <input
                      placeholder="digite aqui..."
                      type="text"
                      className="bg-gray-200 py-2 px-6 rounded-2xl shadow-lg"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-md">
                      Qual o endereço da carteira do cliente?
                    </label>
                    <input
                      placeholder="digite aqui..."
                      type="text"
                      className="bg-gray-200 py-2 px-6 rounded-2xl shadow-lg"
                      value={enderecoCarteira}
                      onChange={(e) => setEnderecoCarteira(e.target.value)}
                    />
                  </div>

                  <button 
                    onClick={adicionarCliente}
                    className="bg-black flex items-center justify-center rounded-md text-white py-2 mt-4"
                  >
                    Finalizar Cadastro
                  </button>
                </div>
            </div>
          </div>
        </>):(
          <p>404</p>
        )}
    </main>
  );
}
