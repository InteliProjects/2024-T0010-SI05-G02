// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContratoTempus {
    address public owner; // Endereço do proprietário do contrato

    // Struct dos dados do cliente
    struct Cliente {
        string nome; // Nome do cliente

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
    }
    // Struct dos dados do produto
    struct Produto {
        string nome; // Nome do produto
        address clienteDono; // Cliente que possui o produto
    }
    // Mapeamento para armazenar os clientes por hash da carteira
    mapping(address => Cliente) private clientesPorHash;
    // Mapeamento para armazenar os produtos por SKU
    mapping(bytes32 => Produto) private produtos;
    // Mapeamento para armazenar os detalhes da transação pendente de validação por endereço de carteira
    mapping(address => DetalhesTransacao) public detalhesTransacaoPendente;

    // Evento para registrar adição de novos clientes
    event ClienteCadastrado(
        string nome,
        address carteiraMetamask
    );

    //Evento aciona quando os detalhes de uma transação são validados e registrados
    event TransacaoRegistradaDetalhada(
        address carteiraMetamask1,
        address carteiraMetamask2,
        bytes32 sku,
        uint256 quantidade,
        uint256 valor,
        uint256 timestamp,
        bool validado
    );

    // Evento para registrar nova transação
    event TransacaoRegistrada(
        address carteiraMetamask1,
        address carteiraMetamask2,
        bytes32 sku,
        uint256 quantidade,
        uint256 valor,
        uint256 timestamp
    );
    // Modificador para permitir apenas que o proprietário do contrato execute determinadas funções
    modifier apenasProprietario() {
        require(
            msg.sender == owner,
            "Apenas o proprietario do contrato pode chamar esta funcao"
        );
        _;
    }

    // Construtor do contrato
    constructor() {
        owner = msg.sender; // Define o proprietário como o endereço que criou o contrato
    }

    // Retorna a lista de clientes associados ao hash da carteira fornecido
    function getClientePorHash(address hashCarteira)
        public
        view
        returns (Cliente memory)
    {
        return clientesPorHash[hashCarteira];
    }

    // Função a seguir cadastra um novo cliente
    // RN.01 - Cadastro de Clientes
    // O sistema deve rejeitar endereços de carteiras inválidos e garantir que cada cliente seja unicamente identificado.
    function cadastrarCliente(string memory _nome, address _carteiraMetamask) external {
        require(
            _carteiraMetamask != address(0),
            "Endereco da carteira Metamask invalido"
        );

        // Verificar se o cliente já está cadastrado para evitar sobrescrita
        require(
            bytes(clientesPorHash[_carteiraMetamask].nome).length == 0,
            "Cliente ja cadastrado"
        );

        clientesPorHash[_carteiraMetamask] = Cliente(_nome);
        emit ClienteCadastrado(_nome, _carteiraMetamask);
    }

    // A função a seguir adiciona um novo produto
    // RN.05 - Registro de Novos Produtos
    // Essa restrição garante que o inventário de produtos seja gerido de maneira centralizada e controlada.
    function adicionarProduto(bytes32 _sku, string memory _nome)
        external
        apenasProprietario
    {
        require(
            msg.sender == owner,
            "Apenas o proprietario pode adicionar produtos"
        );
        require(
            bytes(produtos[_sku].nome).length == 0,
            "Produto ja adicionado"
        );
        produtos[_sku] = Produto(_nome, msg.sender);
    }


    // A função a seguir valida os detalhes de uma transação pendente
    // RN.08 - Confirmação Detalhada de Transações Pendentes
    // Esta etapa de validação detalhada é crítica para a conclusão da transação.
    function validarDetalhesTransacao(
        address _carteira1,
        address _carteira2,
        bytes32 _sku,
        uint256 _quantidade,
        uint256 _preco,
        uint256 _timestamp
    ) external {
        DetalhesTransacao storage detalhes = detalhesTransacaoPendente[_carteira2];

        require(
            detalhes.carteira1 == _carteira1 &&
            detalhes.carteira2 == _carteira2 &&
            detalhes.sku == _sku &&
            detalhes.quantidade == _quantidade &&
            detalhes.preco == _preco &&
            detalhes.timestamp == _timestamp &&
            !detalhes.validado,
            "Detalhes da transacao nao correspondem ou ja foram validados"
        );

        detalhes.validado = true;

        emit TransacaoRegistradaDetalhada(
            _carteira1,
            _carteira2,
            _sku,
            _quantidade,
            _preco,
            _timestamp,
            detalhes.validado  // Adicionado o valor de 'validado' ao evento
        );
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
        uint256 _timestamp // timestamp é um termo para indicar um carimbo de data/hora
    ) external {
        require(
            _carteira1 != address(0) && _carteira2 != address(0),
            "Carteira Metamask invalida"
        );
        detalhesTransacaoPendente[_carteira2] = DetalhesTransacao({
            carteira1: _carteira1,
            carteira2: _carteira2,
            sku: _sku,
            quantidade: _quantidade,
            preco: _preco,
            timestamp: _timestamp,
            validado: false
        });
        emit TransacaoRegistrada(
            _carteira1,
            _carteira2,
            _sku,
            _quantidade,
            _preco,
            _timestamp
        );
    }

    // A função seguir para obter informações de um produto pelo SKU
    // RN.06 - Permite a consulta de informações detalhadas de produtos registrados utilizando o SKU como referência,
    // garantindo que apenas produtos existentes possam ser consultados.
    function obterInformacoesProduto(bytes32 _sku)
        public
        view
        returns (string memory _nome)
    {
        require(
            bytes(produtos[_sku].nome).length > 0,
            "Produto nao encontrado"
        );
        return produtos[_sku].nome;
    }
}
