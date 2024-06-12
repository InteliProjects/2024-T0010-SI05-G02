# Documentação do Front-End 🌟

Seja bem-vindo à documentação do front-end da nossa aplicação *Tempus*! Aqui você encontrará uma visão geral dos principais arquivos de código, suas funcionalidades e como eles se comunicam para oferecer uma experiência incrível aos nossos usuários.

## 🚀 Visão Geral

A seção de front-end da aplicação *Tempus*, desenvolvida pelo grupo Ethos, tem como objetivo simplificar o processo de registro e visualização de transações, especialmente para usuários inexperientes no contexto do blockchain. Utilizando a tecnologia Next.js, o front-end oferece uma interface intuitiva e fácil de usar.

## 📁 Organização de Arquivos

```
tempus
├── public
├── src
│   ├── components
│   │   ├── login
│   │   ├── cadastro-transacao
│   │   ├── historico-transacao
│   │   └── ...
│   ├── pages
│   │   ├── index.tsx
│   │   ├── ...
│   ├── types
│   └── ...
```

## 📋 Principais Arquivos

### Página de Login

O arquivo localizado em `src/components/login` representa a página inicial da aplicação. Integra-se à carteira MetaMask para autenticar o usuário, fornecendo feedback visual durante o processo.

- **Código de Exemplo:**
```javascript
// Connect to MetaMask
async function connect() {
    // Check if MetaMask is available
    if (typeof window.ethereum !== "undefined") {
        try {
            // Request access to MetaMask accounts
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // Update button text on successful connection
            setButtonText("Conectado");
            // Get Ethereum accounts
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            console.log(accounts);
        } catch (error) {
            console.error(error);
            // Update button text on error
            setButtonText("Erro ao conectar");
        }
    } else {
        // Prompt user to install MetaMask if not available
        setButtonText("Por favor, instale o MetaMask");
        // Provide link to MetaMask website
    }
}
```

### Página de Cadastro de Transações

Localizada em `src/components/cadastro-transacao`, essa página permite aos usuários inserir informações sobre transações antes de finalizar o cadastro.

- **Código de Exemplo:**
```jsx
// Renderizar formulário de cadastro
<div className="component2-item">
  <span>Item</span>
  <input
    type="text"
    placeholder="Placeholder do Item"
    className="component2-textinput input"
  />
</div>
```

### Página de Histórico de Transações

Encontre esta página em `src/components/historico-transacao`. Ela permite aos usuários visualizar detalhes de transações passadas.

- **Código de Exemplo:**
```typescript
// Importar transações do arquivo local
import {transacoes} from '../mock/historicoTransacoes'

interface Transacao {
    nome: string,
    quantidade: number,
    preco: number,
    sku: string,
    timeStamp: string
}

// Componente funcional para renderizar o histórico de transações
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center flex-1 p-14">
      <h1 className='text-4xl font-semibold mb-32'>Meu Histórico de Transações</h1>

      <div className='w-2/3'>
        <div className='flex w-full justify-between px-1 pb-8 border-b-gray-400 border-b-2'>
            <label className='font-bold text-lg'>Produto</label>
            <label className='font-bold text-lg'>ID</label>
            <label className='font-bold text-lg'>Preço</label>
            <label className='font-bold text-lg'>Data</label>
        </div>
        {transacoes.map((item: Transacao) => {
            return (
                <div className='flex w-full justify-between px-1 py-6 border-b-gray-400 border-b-2'>
                    <label className='font-semibold text-lg'>{item.nome}</label>
                    <label className='text-lg'>{`${item.sku.slice(0, 10)}...`}</label>
                    <label className='text-lg'>{item.preco}</label>
                    <label className='text-lg'>{item.timeStamp}</label>
                </div>
            )
        })}
      </div>
    </main>
  )
}
```

## 🌐 Tecnologias Utilizadas

- Next.js
- MetaMask
- Hardhat
- Ethers.js
- Solidity

Agora você está pronto para explorar e entender melhor nosso front-end! Para mais detalhamento acesse a documentação na seção [5.1 Documentação do front-end](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/docs/documentation.md#51-documenta%C3%A7%C3%A3o-do-front-end). Em caso de dúvidas, fique à vontade para nos contatar.

