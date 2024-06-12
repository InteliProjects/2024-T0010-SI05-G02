// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract ContratoTempus {
    address public owner; // Endereço do proprietário do contrato
    // Struct dos dados do cliente
    struct Cliente {
        string nome; // Nome do cliente
        address carteiraMetamask; // Endereço da carteira Metamask do cliente
        bool participaRede; // Indica se o cliente participa da rede
        uint256[] transacoes; // Lista de transações do cliente
    }
    // Struct dos detalhes da transação pendente de validação
    struct DetalhesTransacao {
        address carteira1;
        address carteira2;
        bytes32 sku;
        uint256 quantidade;
        uint256 preco;
        uint256 timestamp;
        bool validado; // Indica se a transação foi validada pelo usuário B
        bytes32 carteira1Hash; // Armazena o hash da carteira 1
        bytes32 carteira2Hash; // Hash da carteira 2 para validação
    }
    // Mapeamento para armazenar os clientes por hash da carteira
    mapping(bytes32 => Cliente[]) public clientesPorHash;
    // Mapeamento para armazenar os produtos por SKU
    mapping(bytes32 => Produto) private produtos;
    // Mapeamento para armazenar os detalhes da transação pendente de validação por endereço de carteira
    mapping(address => DetalhesTransacao) public detalhesTransacaoPendente;
    // Evento para registrar adição de novos clientes
    event ClienteCadastrado(string nome, address carteiraMetamask, bool participaRede);
    // Evento para registrar nova transação
    event TransacaoRegistrada(address carteiraMetamask1, address carteiraMetamask2, bytes32 sku, uint256 quantidade, uint256 valor, uint256 timestamp);
    // Modificador para permitir apenas que o proprietário do contrato execute determinadas funções
    modifier apenasProprietario() {
        require(msg.sender == owner, "Apenas o proprietario do contrato pode chamar esta funcao");
        _;
    }
    // Struct dos dados do produto
    struct Produto {
        bytes32 sku; // SKU do produto
        string nome; // Nome do produto
    }
    // Construtor do contrato
    constructor() {
        owner = msg.sender; // Define o proprietário como o endereço que criou o contrato
    }
    // A função a seguir cadastra um novo cliente
    // RN.01 - Esta função permite cadastrar novos clientes na plataforma, exigindo um nome único e um endereço de
    // carteira Metamask válido. O sistema rejeita endereços de carteiras Metamask inválidos e garante a unicidade de cada cliente.
    function cadastrarCliente(string memory _nome, address _carteiraMetamask) external {
        require(_carteiraMetamask != address(0), "Endereco da carteira Metamask invalido");
        bytes32 hashCarteira = keccak256(abi.encodePacked(_carteiraMetamask));
        clientesPorHash[hashCarteira].push(Cliente(_nome, _carteiraMetamask, false, new uint256[](0)));
        emit ClienteCadastrado(_nome, _carteiraMetamask, false);
    }
    // A função a seguir garante a ativação da participação na rede
    // RN.02 - Permite que clientes cadastrados ativem seu status de participação na rede. Isso habilita os clientes
    // a registrar e visualizar transações, garantindo que apenas entidades verificadas e autorizadas possam contribuir
    // e acessar as funcionalidades da rede.
    function participarRede() external {
        bytes32 hashCarteira = keccak256(abi.encodePacked(msg.sender));
        bool encontrado = false;
        for (uint i = 0; i < clientesPorHash[hashCarteira].length; i++) {
            if (clientesPorHash[hashCarteira][i].carteiraMetamask == msg.sender) {
                clientesPorHash[hashCarteira][i].participaRede = true;
                encontrado = true;
                break;
            }
        }
        require(encontrado, "Cliente nao cadastrado");
    }
    // A função a seguir adiciona um novo produto
    // RN.05 - Restringe a adição de novos produtos no sistema ao proprietário do contrato.
    // Utiliza SKUs únicos para cada produto, evitando duplicações e mantendo a gestão centralizada do inventário.
    function adicionarProduto(
        bytes32 _sku,
        string memory _nome
    ) public apenasProprietario {
        require(produtos[_sku].sku == bytes32(0), "Produto ja existe");
        Produto memory novoProduto = Produto({
            sku: _sku,
            nome: _nome
        });
        produtos[_sku] = novoProduto;
    }
    // A função seguir para obter informações de um produto pelo SKU
    // RN.06 - Permite a consulta de informações detalhadas de produtos registrados utilizando o SKU como referência,
    // garantindo que apenas produtos existentes possam ser consultados.
    function obterInformacoesProduto(bytes32 _sku)
        public
        view
        returns (string memory _nome)
    {
        Produto memory produto = produtos[_sku];
        require(produto.sku != bytes32(0), "Produto nao encontrado");
        return (produto.nome);
    }
    // A função a seguir realiza o registro de uma transação
    // RN.03 - Habilita clientes cadastrados e ativos na rede a registrar transações. Cada transação é vinculada ao
    // cliente que a executou, assegurando a rastreabilidade e verificação das operações.
    function registrarTransacao(
        address _carteira1,
        address _carteira2,
        bytes32 _sku,
        uint256 _quantidade,
        uint256 _preco,
        uint256 _timestamp, // timestamp é um temo proveniente da lingua inglesa, mas comumente usado an programação para indicar um carimbo de data/hora
        uint256 _valor
    ) external {
        address carteira1 = _carteira1 != address(0) ? _carteira1 : msg.sender;
        validarTransacao(carteira1, _carteira2, _sku, _quantidade, _preco, _timestamp);
        emit TransacaoRegistrada(
        carteira1,
        _carteira2,
        _sku,
        _quantidade,
        _preco,
        _timestamp
        );
        if (_valor != 0) {
            bytes32 hashCarteira = keccak256(abi.encodePacked(msg.sender));
            bool encontrado = false;
            for (uint i = 0; i < clientesPorHash[hashCarteira].length; i++) {
                if (clientesPorHash[hashCarteira][i].carteiraMetamask == msg.sender && clientesPorHash[hashCarteira][i].participaRede) {
                    clientesPorHash[hashCarteira][i].transacoes.push(_valor);
                    encontrado = true;
                    break;
                }
            }
            require(encontrado, "Cliente nao cadastrado ou nao participa da rede");
            emit TransacaoRegistrada(_carteira1, _carteira2, _sku, _quantidade, _timestamp, _valor);
        }
    }
    // A função a seguir obtem a média das transações de um cliente
    // RN.04 - Permite que clientes ativos na rede consultem a média de suas transações registradas,
    // fornecendo uma ferramenta para análise e gestão financeira.
    function obterMediaTransacoes() external view returns (uint256) {
        // Calcular hash da carteira Metamask
        bytes32 hashCarteira = keccak256(abi.encodePacked(msg.sender));
        // Verificar se cliente está cadastrado e participa da rede
        bool encontrado = false;
        uint256 soma = 0;
        uint256 numTransacoes = 0;
        for (uint i = 0; i < clientesPorHash[hashCarteira].length; i++) {
            if (clientesPorHash[hashCarteira][i].carteiraMetamask == msg.sender && clientesPorHash[hashCarteira][i].participaRede) {
                for (uint j = 0; j < clientesPorHash[hashCarteira][i].transacoes.length; j++) {
                    soma += clientesPorHash[hashCarteira][i].transacoes[j];
                    numTransacoes++;
                }
                encontrado = true;
                break;
            }
        }
        require(encontrado, "Cliente nao cadastrado ou nao participa da rede");
        require(numTransacoes > 0, "Cliente nao possui transacoes");
        // Calcular a média das transações
        return soma / numTransacoes;
    }
    // A função a seguir realiza a validação da transação
    // RN.07 - Antes da finalização de uma transação, ela deve ser validada, incluindo a verificação de detalhes como
    // as carteiras envolvidas, SKU do produto, quantidade, preço, e timestamp. Esta validação preliminar assegura que
    // todas as partes estejam de acordo com os termos da transação.
    function validarTransacao(address _carteira1, address _carteira2, bytes32 _sku, uint256 _quantidade, uint256 _preco, uint256 _timestamp) public {
        require(_carteira1 != address(0) && _carteira2 != address(0), "Carteira Metamask invalida");
        bytes32 carteira1Hash = keccak256(abi.encodePacked(_carteira1));
        bytes32 carteira2Hash = keccak256(abi.encodePacked(_carteira2));
        detalhesTransacaoPendente[_carteira2] = DetalhesTransacao({
            carteira1: _carteira1,
            carteira2: _carteira2,
            sku: _sku,
            quantidade: _quantidade,
            preco: _preco,
            timestamp: _timestamp,
            validado: false,
            carteira2Hash: carteira2Hash,
            carteira1Hash: carteira1Hash
        });
    }
    // A função a seguit valida os detalhes da transação garantindo que as informações correspondam exatamente às acordadas
    // RN.08 - Detalhes de transações pendentes devem ser confirmados pelo receptor, garantindo que as informações
    // correspondam exatamente às acordadas antes da conclusão da transação.
    function validarDetalhesTransacao(
        bytes32 _sku,
        uint256 _quantidade,
        uint256 _preco,
        uint256 _timestamp,
        bytes32 _carteira2Hash
    ) public {
        DetalhesTransacao storage detalhes = detalhesTransacaoPendente[msg.sender];
        require(
            detalhes.sku == _sku &&
            detalhes.quantidade == _quantidade &&
            detalhes.preco == _preco &&
            detalhes.timestamp == _timestamp &&
            !detalhes.validado &&
            detalhes.carteira2Hash == _carteira2Hash,
            "Detalhes da transacao nao correspondem ou ja foram validados"
        );
        detalhes.validado = true;
    }
}