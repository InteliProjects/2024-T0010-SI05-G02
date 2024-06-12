// define a ABI (Application Binary Interface)
const ContratoTempusABI: any[] =   [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "nome",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "carteiraMetamask",
        "type": "address"
      }
    ],
    "name": "ClienteCadastrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "carteiraMetamask1",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "carteiraMetamask2",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "sku",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantidade",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "valor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "TransacaoRegistrada",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "carteiraMetamask1",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "carteiraMetamask2",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "sku",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantidade",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "valor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "validado",
        "type": "bool"
      }
    ],
    "name": "TransacaoRegistradaDetalhada",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_sku",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_nome",
        "type": "string"
      }
    ],
    "name": "adicionarProduto",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_nome",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_carteiraMetamask",
        "type": "address"
      }
    ],
    "name": "cadastrarCliente",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "detalhesTransacaoPendente",
    "outputs": [
      {
        "internalType": "address",
        "name": "carteira1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "carteira2",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "sku",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "quantidade",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "preco",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "validado",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "hashCarteira",
        "type": "address"
      }
    ],
    "name": "getClientePorHash",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "nome",
            "type": "string"
          }
        ],
        "internalType": "struct ContratoTempus.Cliente",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_sku",
        "type": "bytes32"
      }
    ],
    "name": "obterInformacoesProduto",
    "outputs": [
      {
        "internalType": "string",
        "name": "_nome",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_carteira1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_carteira2",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_sku",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_quantidade",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_preco",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timestamp",
        "type": "uint256"
      }
    ],
    "name": "registrarTransacao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_carteira1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_carteira2",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_sku",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_quantidade",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_preco",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timestamp",
        "type": "uint256"
      }
    ],
    "name": "validarDetalhesTransacao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

  export default ContratoTempusABI;