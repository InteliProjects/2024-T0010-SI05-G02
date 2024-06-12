"use client";
import React, { useEffect, useState } from "react";
import AssideBar from "../components/assideBar";
import SelectSearch from "../components/selectSearch";
import { ethers } from "ethers";
import ContratoTempusABI from "@/constants/abi";
import axios from "axios";
import LoadingScreen from "../components/loadingScreen";

// Endereço do contrato inteligente no blockchain
const contractAddress = "0x9b3cE553d83a29EE2deD42cA479B90B937D07E6C";

const Page: React.FC = () => {
  // Estados para controle dos campos do formulário e da UI
  const [noOptions, setNoOptions] = useState<boolean>(false);
  useEffect(() => {
    console.log(noOptions);
  }, [noOptions]);


  // Estados para armazenar os valores dos inputs do formulário
  const [produto, setProduto] = useState("");
  const [sku, setSku] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataTransacao, setDataTransacao] = useState("");
  const [carteira, setCarteira] = useState("");
  const [carteiraUsuario, setCarteiraUsuario] = useState<string>("")
  const [carteiraConectada, setCarteiraConectada] = useState<string>("")
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
  

  interface Transacao {
    carteira1: string,
    carteira2: string,
    productSku: string,
    quantidade: number,
    preco: number,
    timeStamp: Date
  }

  const registrarTransacaoWeb2 = async () => {
  
    const transactionData = {
      carteira1: carteira, 
      carteira2: empresa,
      productSku: sku, 
      quantidade: Number(quantidade),
      preco: Number(preco),
      timestamp: new Date(dataTransacao).toISOString() // Ajuste aqui para enviar o objeto Date diretamente
    };

    console.log(transactionData);
    
  
    try {
      const response = await axios.post('http://localhost:3333/transacoes', transactionData);
      console.log('Transação adicionada:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao adicionar transação na web2:', error.response?.data);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  }

  const registrarProdutoWeb2 = async () => {
    try {
      const response = await axios.post('http://localhost:3333/produtos', { name: produto });
      console.log('Produto registrado:', response.data);
      return response.data.sku; // Retorna o SKU diretamente
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao registrar produto:', error.response?.data);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  }
  // Função para registrar uma transação usando um contrato inteligente
  async function registrarTransacao() {
    if (!window.ethereum) {
      alert("Por favor, instale o MetaMask.");
      return;
    }

    try {
        // Solicitação para conectar com a carteira MetaMask do usuário
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contrato = new ethers.Contract(
          contractAddress,
          ContratoTempusABI,
          signer
        );


      // Verificar se o campo SKU está preenchido corretamente
      if (sku.length === 0 || produto.length === 0 || empresa.length === 0 || preco.length === 0 || quantidade.length === 0 || dataTransacao.length === 0 || carteira.length === 0) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const tx = await contrato.registrarTransacao(
        carteira,
        empresa,
        `0x${sku}`,
        quantidade,
        preco,
        Math.floor(new Date(dataTransacao).getTime() / 1000)
      );
      setCarregando(true)
      await tx.wait();
      setCarregando(false)
      registrarTransacaoWeb2()
      console.log("Transação cadastrada com sucesso:", tx);
      alert("Transação cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar a transação:", error);
      alert("Erro ao registrar a transação. Verifique o console para mais detalhes.");
    }
  }


  // Função para adicionar um novo produto ao contrato inteligente
  async function adicionarProduto() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contrato = new ethers.Contract(
          contractAddress,
          ContratoTempusABI,
          signer
        );
  
        const sku = await registrarProdutoWeb2();
        if (!sku) {
          alert('Falha ao registrar produto.');
          return;
        }
        console.log(sku);
        
        // Agora, `sku` é o valor atualizado e pode ser usado diretamente
        const tx = await contrato.adicionarProduto(`0x${sku}`, produto);
        await tx.wait();
        alert("Produto cadastrado com sucesso!");
        setNoOptions(false);
      } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        alert("Erro ao cadastrar produto. Veja o console para mais detalhes.");
      }
    } else {
      alert("Por favor, instale o MetaMask.");
    }
  }

  // Renderização da UI da página
  return (
    <>
      {carteiraUsuario !== '' && carteiraUsuario === carteiraConectada? (
        <>

          {carregando && <LoadingScreen/>}
          <div className="flex flex-col min-h-screen bg-white">
            <AssideBar page="add" />
            <h1 className="text-3xl self-start bg-black text-white font-light rounded-md py-4 pr-4 pl-52 mt-9">
              Cadastrar Transação
            </h1>
            <div className="flex flex-grow flex-col items-center justify-center w-full">
              <div className="grid grid-cols-5 gap-4 mx-auto">
                {/* Lado Esquerdo */}
                <div className="col-span-2">
                  <div className="grid grid-cols-1 gap-2">
                    <SelectSearch
                      optionSelected={(option) => {
                        setSku(option.value)
                        setProduto(option.label)
                      }}
                      noOptions={(value) => {
                        setSku('')
                        setProduto('')
                        setNoOptions(value)
                      }}
                    />

                    {!noOptions ? (
                      <>
                        <div className="mb-4">
                          <label
                            className="block text-black text-xl font-medium mb-2"
                            htmlFor="productName"
                          >
                            Sua Carteira Metamask
                          </label>
                          <input
                            className="input-box bg-gray-200 rounded-md px-2 py-2"
                            id="carteira"
                            type="text"
                            value={carteira}
                            onChange={(e) => setCarteira(e.target.value)} // Atualiza o estado do nome com o valor do input
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            className="block text-black text-xl font-medium mb-2"
                            htmlFor="company"
                          >
                            Empresa
                          </label>
                          <input
                            className="input-box bg-gray-200 rounded-md px-2 py-2"
                            id="company"
                            type="text"
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)} // Atualiza o estado do nome com o valor do input
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <label
                          className="block text-black text-xl font-medium mb-2"
                          htmlFor="company"
                        >
                          Qual o produto?
                        </label>
                        <p className="w-96 text-sm">
                          Se você selecionou “não encontrei meu produto”,
                          <strong>
                            o produto precisará ser cadastrado em nossa base de
                            dados.
                          </strong>
                          Digite o nome do produto com marca e modelo
                          <br />
                          ex: “Monitor Dell 27" S2721HN”
                        </p>
                        <input
                          className="text-white input-box bg-black rounded-md px-2 py-2"
                          id="transactionDate"
                          placeholder="digite aqui"
                          value={produto}
                          onChange={(e) => setProduto(e.target.value)}
                          type="text"
                        />
                        <button onClick={adicionarProduto} className="px-10 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-gray-500 transition duration-300">
                          Cadastrar Produto
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {/* Coluna "Fantasma" para espaço */}
                <div className="col-span-1"></div>
                {/* Lado Direito */}
                <div className="col-span-2">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="mb-4">
                      <label
                        className="block text-black text-xl font-medium mb-2"
                        htmlFor="price"
                      >
                        Preço
                      </label>
                      <input
                        className="input-box bg-gray-200 rounded-md px-2 py-2"
                        id="price"
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)} // Atualiza o estado do nome com o valor do input
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-black text-xl font-medium mb-2"
                        htmlFor="quantity"
                      >
                        Quantidade
                      </label>
                      <input
                        className="input-box bg-gray-200 rounded-md px-2 py-2"
                        id="quantity"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)} // Atualiza o estado do nome com o valor do input
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-black text-xl font-medium mb-2"
                        htmlFor="transactionDate"
                      >
                        Data da Transação
                      </label>
                      <input
                        className="input-box bg-gray-200 rounded-md px-2 py-2"
                        id="transactionDate"
                        type="date"
                        value={dataTransacao}
                        onChange={(e) => setDataTransacao(e.target.value)} // Atualiza o estado do nome com o valor do input
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={registrarTransacao}
                  className="px-10 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-gray-500 shadow-inner transition duration-300"
                >
                  Registrar Transação
                </button>
              </div>
            </div>
          </div>
        </>
      ):
        <p>404</p>
      }
    </>
  );
};

export default Page;
