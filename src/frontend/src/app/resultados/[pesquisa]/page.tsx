'use client'
import React, { useEffect, useState } from 'react';
import AssideBar from '../../components/assideBar'; 
import Fuse from 'fuse.js';
import axios from 'axios';
import { Search } from 'lucide-react';

// Atualize as interfaces para refletir a estrutura dos dados da API
interface Produto {
  sku: string;
  name: string;
}

interface Transacao {
  id: number;
  carteira1: string;
  carteira2: string;
  quantidade: number;
  preco: number;
  timestamp: string;
  validado: boolean;
  productSku: string;
  produto: Produto;
}

interface Resultado {
  sku: string;
  name: string;
  transacoes: number;
  preco: number;
}

export default function Results({ params }: { params: { pesquisa: string } }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [results, setResults] = useState<Resultado[]>([]);
  const [fuse, setFuse] = useState<Fuse<Produto> | null>(null);
  const [carteiraUsuario, setCarteiraUsuario] = useState<string>("")
  const [carteiraConectada, setCarteiraConectada] = useState<string>("")

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Considere atualizar estas URLs para as suas corretas URLs da API
        const responseProdutos = await axios.get<Produto[]>('http://localhost:3333/produtos');
        const responseTransacoes = await axios.get<Transacao[]>('http://localhost:3333/transacoes');

        setProdutos(responseProdutos.data);
        setTransacoes(responseTransacoes.data);

        const fuseOptions = {
          keys: ['name'], // Use 'name', já que os produtos têm uma propriedade 'name'
          includeScore: true,
        };
        const fuseInstance = new Fuse(responseProdutos.data, fuseOptions);
        setFuse(fuseInstance);
      } catch (error) {
        console.error("Erro ao buscar produtos ou transações", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (params.pesquisa && fuse) {
      const decodedSearchTerm = decodeURIComponent(params.pesquisa);
      search(decodedSearchTerm);
    }
  }, [params.pesquisa, fuse]);

  const search = (query: string) => {
    const searchResults = fuse?.search(query);
    const resultProdutos = searchResults?.map(result => result.item);
    if (resultProdutos) {
      const hits = resultProdutos.map(produto => {
        const transacoesProduto = transacoes.filter(transacao => transacao.productSku === produto.sku);
        const totalQuantidade = transacoesProduto.reduce((acc, item) => acc + item.quantidade, 0);
        const precoTotal = transacoesProduto.reduce((acc, item) => acc + item.preco, 0);
        const precoMedio = totalQuantidade > 0 ? precoTotal / totalQuantidade : 0;
  
        return {
          sku: produto.sku,
          name: produto.name,
          transacoes: transacoesProduto.length,
          preco: Number(precoMedio.toFixed(2))
        };
      });
      setResults(hits);
    }
  };

  return (
    <main className="flex min-h-screen flex-row flex-1">
      {carteiraUsuario !== '' && carteiraUsuario === carteiraConectada ? (
        <>
          <AssideBar page='' />
          <div className='flex px-96 flex-col w-full items-center mt-9'>
            <div className='flex px-2 items-center w-full bg-gray-200 rounded-md shadow-inner'>
              <input
                type="text"
                className='w-full py-3 outline-none bg-transparent'
                placeholder="Buscar produto..."
                onChange={(e) => {
                  const newQuery = e.target.value;
                  search(newQuery);
                }}
              />

              <Search />
            </div>
            
            <p className='mb-20 self-start text-gray-500 text-lg'>{results.length > 0 && results.length} resultados encontrados</p>
            {results.length > 0 ? (
              <button className='grid grid-cols-2 gap-x-52 gap-y-16'>
                {results.map((hit) => (
                  <div key={hit.sku} className='flex flex-row justify-between items-center gap-10 bg-gray-300 px-7 py-2 rounded-md shadow-inner'>
                    <button onClick={() => window.location.href = `/produto/${hit.sku}`} className='flex flex-col'>
                      <label>{hit.name}</label>
                      <label>{hit.transacoes} Transações</label>
                    </button>
                    <label>{hit.preco} BRL</label>
                  </div>
                ))}
              </button>
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </>):(
          <p>404</p>
        )}
    </main>
  );
}