"use client";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import AssideBar from "../components/assideBar";
import { ethers } from "ethers";
import LoadingScreen from "../components/loadingScreen";

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


export default function Tutorial() {

  return (
      <main className="flex text-white min-h-screen px-52 py-40 flex-col flex-1 bg-zinc-900">
        <div>
            <h1 className="text-6xl mb-16">Olá :)</h1>
            <p className="text-2xl font-extralight mb-8">Bem vindo à plataforma <strong>Tempus</strong></p>
            <p className="text-2xl font-extralight mb-8 w-[785px]">Nascemos com o objetivo de melhorar o mercado de supply chain, trazendo confiança e segurança ao processo de cotação de produtos.</p>
            <p className="text-2xl font-extralight mb-8 w-[785px]"><strong>Como fazemos isso?</strong> Clique em próximo</p>
        </div>
    </main>
  );
}
