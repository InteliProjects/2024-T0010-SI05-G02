"use client";
import React, { useEffect, useState } from "react";
import AssideBar from "../../components/assideBar";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Registra o Filler para habilitar o preenchimento abaixo da linha
);

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

interface Params {
  sku: string;
}

export default function Results({ params }: { params: Params }) {
  const [chartData, setChartData] = useState<
    ChartData<"line", (number | null)[], string>
  >({
    labels: [],
    datasets: [
      {
        label: "Preço Unitário",
        data: [],
        fill: true,
        backgroundColor: "rgba(53, 162, 235, 0.5)", // Cor azul clara com transparência
        borderColor: "rgb(53, 162, 235)",
        pointRadius: 3,
        tension: 0.3, // Suaviza as curvas da linha
      },
    ],
  });
  const [transacoes, setTransacoes] = useState<Transacao[] | null>(null);
  const [timeFilter, setTimeFilter] = useState("1Y");
  const [preco, setPreco] = useState<number>(0);
  const [nome, setNome] = useState<string>("Produto")
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

  function calculateAveragePrice(transactions: Transacao[]): number {
    if (transactions.length === 0) return 0;

    const totalUnitPrice = transactions.reduce((acc, transaction) => {
      return acc + transaction.preco / transaction.quantidade;
    }, 0);

    return totalUnitPrice / transactions.length;
  }

  useEffect(() => {transacoes && transacoes?.length > 0 && setNome(transacoes[0].produto.name)}, [transacoes])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transacao[]>(
          `http://localhost:3333/transacoes/${params.sku}`
        );
        const transactions = response.data;
        setTransacoes(transactions);

        const filteredTransactions = filterTransactionsByTime(
          transactions,
          timeFilter
        );
        setTransacoes(filterTransactionsByTime(transactions, timeFilter));
        const sortedTransactions = filteredTransactions.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setPreco(calculateAveragePrice(filteredTransactions));

        setChartData({
          labels: sortedTransactions.map((t) =>
            new Date(t.timestamp).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Preço Unitário",
              data: sortedTransactions.map(t => parseFloat((t.preco / t.quantidade).toFixed(2))),
              fill: true,
              backgroundColor: "rgba(75, 145, 192, 0.2)",
              borderColor: "rgb(75, 145, 192)",
              pointRadius: 3,
              tension: 0,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar transações", error);
      }
    };

    fetchTransactions();
  }, [params.sku, chartData.datasets, timeFilter]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
      },
    },
    elements: {
      line: {
        tension: 0, // Suaviza as curvas da linha
      },
    },
    maintainAspectRatio: false,
  };

  function filterTransactionsByTime(
    transactions: Transacao[],
    filter: string
  ): Transacao[] {
    const endDate = new Date();
    let startDate = new Date(endDate);

    switch (filter) {
      case "1D":
        startDate.setDate(endDate.getDate() - 1);
        break;
      case "5D":
        startDate.setDate(endDate.getDate() - 5);
        break;
      case "1M":
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "6M":
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case "1Y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        // Por padrão, não aplicar filtro, ou seja, mostrar todas as transações
        startDate = new Date(endDate.setFullYear(endDate.getFullYear() - 100)); // Muito tempo atrás
        break;
    }

    return transactions.filter(
      (t) =>
        new Date(t.timestamp) >= startDate && new Date(t.timestamp) <= endDate
    );
  }

  return (
    <main className="flex min-h-screen flex-row flex-1">
      {carteiraUsuario !== '' && carteiraUsuario === carteiraConectada ? (
        <>
          <AssideBar page="history" />
          <div className="flex flex-col w-full items-center mt-9">
            <h1 className="text-5xl font-medium">
              {nome}
            </h1>
            <div className="flex w-full h-full items-center justify-center gap-20">
              <div className="flex flex-col items-center h-full justify-center gap-20">
                <div className="flex flex-col text-center gap-8">
                  <h1 className="text-5xl font-extralight">Price</h1>
                  <h1 className="text-5xl font-medium">{preco.toFixed(2)} BRL</h1>
                </div>
                <div className="flex w-[31.25rem] flex-col">
                  <div className="flex space-x-2 mb-4">
                    {["1D", "5D", "1M", "6M", "1Y"].map((interval) => (
                      <button
                        key={interval}
                        className={`text-sm px-4 py-2 rounded-md ${
                          timeFilter === interval
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setTimeFilter(interval)}
                      >
                        {interval}
                      </button>
                    ))}
                  </div>
                  <div className="flex h-60">
                    <Line data={chartData} options={options} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[31.25rem] h-full items-center justify-center mt-9">
                <h1 className="text-5xl font-extralight mb-20">
                  Últimas Transações
                </h1>

                <div className="flex flex-col min-w-full  max-h-96 overflow-scroll scrollbar-minimalista">
                  <div className="flex flex-row w-full justify-around border-b-2 pb-4 border-gray-400">
                    <p className="text-xl font-semibold">Preço</p>
                    <p className="text-xl font-semibold">data</p>
                  </div>
                  {transacoes?.map((t, index) => (
                    <>
                      <div className="flex flex-row w-full justify-around border-b-2 py-2 border-gray-400">
                        <p className="text-xl font-semibold">
                          {(t.preco / t.quantidade).toFixed(2)}
                        </p>
                        <p className="text-xl font-semibold">{new Date(t.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>):(
          <p>404</p>
        )}
    </main>
  );
}
