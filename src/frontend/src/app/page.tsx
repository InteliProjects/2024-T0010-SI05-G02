"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Logo from "./assets/Logo.svg";
import Metamask from "./assets/metamask.svg";
import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { ethers } from "ethers"; // Importa a biblioteca ethers para interagir com a blockchain Ethereum
import ContratoTempusABI from "@/constants/abi"; // Importa a ABI do contrato, que é necessária para interação
import axios from "axios";


const inter = Inter({ subsets: ["latin"] });

// Endereço do Contrato
const contractAddress = "0x9b3cE553d83a29EE2deD42cA479B90B937D07E6C";

export default function Home() {
  const [buttonText, setButtonText] = useState(
    "Conecte a sua carteira MetaMask"
  );
  const [connected, setConnected] = useState<boolean>(false);
  // Inicializa o estado para o nome e o endereço da carteira com strings vazias
  const [nome, setNome] = useState("");
  const [enderecoCarteira, setEnderecoCarteira] = useState("");

  type ClienteData = {
    nome: string;
    carteira: string;
    // adicione outros campos conforme necessário
};

function setCookie(name: string, value: string, hours: number) {
  const now = new Date();
  now.setTime(now.getTime() + (hours * 60 * 60 * 1000));
  const expires = now.toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

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
        await tx.wait(); // Aguarda a transação ser minerada
        await adicionarClienteWeb2({"nome": nome, "carteira": enderecoCarteira})
        alert("Cliente adicionado com sucesso!");
      } catch (error) {
        console.error(error); // Loga o erro no console se a transação falhar
        alert("Houve um erro ao tentar adicionar o cliente.");
      }
    } else {
      alert("Por favor, instale o Metamask."); // Alerta o usuário para instalar o MetaMask caso não esteja instalado
    }
  }

  async function verificaCliente(carteira: string) {
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
        const tx = await contrato.getClientePorHash(carteira);
        tx.nome !== '' && alert("Cliente já cadastrado")
        tx.nome !== '' && setCookie('carteira', carteira, 8)
        
        tx.nome !== '' ?  window.location.href = '/busca': null
        
      } catch (error) {
        console.error(error); // Loga o erro no console se a transação falhar
        alert("Houve um erro ao tentar adicionar o cliente.");
      }
    } else {
      alert("Por favor, instale o Metamask."); // Alerta o usuário para instalar o MetaMask caso não esteja instalado
    }
  }

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setButtonText("Conectado");
        setConnected(true);
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts);
        verificaCliente(accounts[0])
      } catch (error) {
        console.error(error);
        setButtonText("Erro ao conectar");
      }
    } else {
      setButtonText("Por favor, instale o MetaMask");
      // colocar o link para direcionar ao site do metamask
    }
  }

  // Use useEffect para conectar automaticamente ou em resposta a alguma ação do usuário
  useEffect(() => {
    // Código para executar na montagem aqui
    // Por exemplo, verificar se já está conectado
  }, []);

  return (
    <main className="flex min-h-screen flex-row justify-between">
      <div className="flex w-1/2 justify-between flex-col bg-black">
        <div className="mt-24 flex flex-col items-center gap-20">
          <h1 className="text-white text-6xl font-light">Tempus</h1>
          <Image src={Logo} width={200} height={200} alt="logo" />
        </div>
        <strong className="text-gray-500 m-6">By ethos</strong>
      </div>
      <div className="flex w-1/2 justify-between flex-col">
        <div className="mt-24 flex flex-col items-center gap-9">
          <div className="flex flex-col gap-5">
              <h1 className="text-6xl font-light">Bem-Vindo</h1>


            <label className="text-center text-gray-500">
Faça o login com a sua carteira MetaMask
            </label>
          </div>
       
            <>
              <button
                onClick={connect}
                className="bg-black flex flex-row gap-2 rounded-md text-white p-4"
              >
                {buttonText}
                <Image src={Metamask} width={20} height={20} alt="metamask" />
              </button>
            </>
        </div>
      </div>
    </main>
  );
}
