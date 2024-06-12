// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract ContratoTempus {
    address public owner; // Endereço do proprietário do contrato
    address public dono;  // Endereço do proprietário para viabilizar os testes

    // Struct dos dados do cliente
    struct Cliente {
        string nome; // Nome do cliente
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
    }
    // Struct dos dados do produto
    struct Produto {
        string nome; // Nome do produto
        address clienteDono; // Cliente que possui o produto
    }
    // Mapeamento para armazenar os clientes por hash da carteira
    mapping(bytes32 => Cliente[]) public clientesPorHash;
    // Mapeamento para armazenar os produtos por SKU
    mapping(bytes32 => Produto) private produtos;
    // Mapeamento para armazenar os detalhes da transação pendente de validação por endereço de carteira
    mapping(address => DetalhesTransacao) public detalhesTransacaoPendente;
    // Mapeamento para armazenar a última vez que os dados foram fornecidos por um cliente
    mapping(address => uint256) public ultimaAtualizacaoCliente;
    // Evento para registrar adição de novos clientes
    event ClienteCadastrado(string nome, address carteiraMetamask, bool participaRede);
    // Evento para registrar nova transação
    event TransacaoRegistrada(address carteiraMetamask1, address carteiraMetamask2, bytes32 sku, uint256 quantidade, uint256 valor, uint256 timestamp);
    // Modificador para permitir apenas que o proprietário do contrato execute determinadas funções
    modifier apenasProprietario() {
        require(msg.sender == owner, "Apenas o proprietario do contrato pode chamar esta funcao");
        _;
    }

    
    // Construtor do contrato
    constructor() {
        owner = msg.sender; // Define o proprietário como o endereço que criou o contrato
        dono = msg.sender;
    }
    // RN.09 - Para continuar na solução precisa de fornecer dados pelo menos uma vez ao mês (função auxiliar)
    // Função a ser chamada sempre que um cliente fornecer dados à plataforma
    function fornecerDadosPlataforma() external {
        atualizarUltimaAtualizacaoCliente(msg.sender); // Atualiza a última vez que os dados foram fornecidos pelo cliente [RN.09]
    }
    // Função para atualizar a última vez que os dados foram fornecidos por um cliente
    function atualizarUltimaAtualizacaoCliente(address _carteiraMetamask) internal {
        ultimaAtualizacaoCliente[_carteiraMetamask] = block.timestamp;
    }
    // Função a seguir cadastra um novo cliente
    // RN.01 - Cadastro de Clientes
    // O sistema deve rejeitar endereços de carteiras inválidos e garantir que cada cliente seja unicamente identificado.
    function cadastrarCliente(string memory _nome, address _carteiraMetamask) external {
        require(_carteiraMetamask != address(0), "Endereco da carteira Metamask invalido");
        bytes32 hashCarteira = keccak256(abi.encodePacked(_carteiraMetamask));
        clientesPorHash[hashCarteira].push(Cliente(_nome, false, new uint256[](0)));
        emit ClienteCadastrado(_nome, _carteiraMetamask, false);
    }

    
    // A função a seguir garante a ativação da participação na rede
    // RN.02 - Adesão à Rede de Transparência
    // A adesão à rede é confirmada através da ativação do status de participação no registro do cliente.
    function participarRede() external {
    bytes32 hashCarteira = keccak256(abi.encodePacked(msg.sender));
    Cliente[] storage listaClientes = clientesPorHash[hashCarteira]; // Evitar loop longo substituindo por um mapeamento direto do cliente
    for (uint256 i = 0; i < listaClientes.length; i++) {
        if (!listaClientes[i].participaRede && bytes(listaClientes[i].nome).length > 0) {
            listaClientes[i].participaRede = true;
            break;
        }
    }
}
    // A função a seguir adiciona um novo produto
    // RN.05 - Registro de Novos Produtos
    // Essa restrição garante que o inventário de produtos seja gerido de maneira centralizada e controlada.
    function adicionarProduto(bytes32 _sku, string memory _nome) external apenasProprietario {
        require(msg.sender == dono, "Apenas o proprietario pode adicionar produtos");
        require(bytes(produtos[_sku].nome).length == 0, "Produto ja adicionado");
        produtos[_sku] = Produto(_nome, msg.sender);
    }

    /// Função para teste que recebe um SKU e retorna os detalhes do produto para esse SKU
    function getProduto(bytes32 sku) public view returns (string memory nome, address clienteDono) {
        Produto memory produto = produtos[sku];
        return (produto.nome, produto.clienteDono);
    }

    // Função a seguir valida os detalhes de uma transação pendente
    // RN.08 - Confirmação Detalhada de Transações Pendentes
    // Esta etapa de validação detalhada é crítica para a conclusão da transação.
    function validarDetalhesTransacao(address _carteira1, address _carteira2, bytes32 _sku, uint256 _quantidade, uint256 _preco, uint256 _timestamp) external {
    DetalhesTransacao storage detalhes = detalhesTransacaoPendente[msg.sender];
    require(
        detalhes.sku == _sku &&
        detalhes.quantidade == _quantidade &&
        detalhes.preco == _preco &&
        detalhes.timestamp == _timestamp &&
        !detalhes.validado,
        "Detalhes da transacao nao correspondem ou ja foram validados"
    );
    detalhes.validado = true;
    emit TransacaoRegistrada(_carteira1, _carteira2, _sku, _quantidade, _preco, _timestamp);
}
    // A função a seguir permite atualizar um cliente
    // RN.10 - Gerenciamento de Carteiras Metamask (CRUD simples)
    // Apenas o proprietário do contrato pode chamar esta função
    function atualizarCliente(bytes32 _hashCarteira, string memory _novoNome, bool _novaParticipacaoRede) external apenasProprietario {
        Cliente[] storage listaClientes = clientesPorHash[_hashCarteira];
        for (uint256 i = 0; i < listaClientes.length; i++) {
            if (!listaClientes[i].participaRede && bytes(listaClientes[i].nome).length > 0) {
                listaClientes[i].nome = _novoNome;
                listaClientes[i].participaRede = _novaParticipacaoRede;
                break;
            }
        }
    }
    // A função a seguir permite atualizar um produto
    // RN.11 - Gerenciamento de Produtos (CRUD simples)
    // Apenas o proprietário do contrato ou o cliente dono do produto podem chamar esta função
    function atualizarProduto(bytes32 _sku, string memory _novoNome, address _novaCarteiraDono) external {
        Produto storage produto = produtos[_sku];
        require(msg.sender == owner || msg.sender == produto.clienteDono, "Apenas o proprietario ou o cliente dono do produto pode chamar esta funcao");
        produto.nome = _novoNome;
        produto.clienteDono = _novaCarteiraDono;
    }
    // Função para verificar se um cliente forneceu dados pelo menos uma vez no mês atual
    // RN.09 - Para continuar na solução precisa de fornecer dados pelo menos uma vez ao mês
    function clienteForneceuDadosNoMes(address _carteiraMetamask) internal view returns (bool) {
        uint256 ultimaAtualizacao = ultimaAtualizacaoCliente[_carteiraMetamask];
        uint256 ultimoDiaMesAnterior = block.timestamp - (block.timestamp % 30 days); // Aproximação para o início do mês atual
        return ultimaAtualizacao >= ultimoDiaMesAnterior;
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
    require(_carteira1 != address(0) && _carteira2 != address(0), "Carteira Metamask invalida");
    detalhesTransacaoPendente[_carteira2] = DetalhesTransacao({
        carteira1: _carteira1,
        carteira2: _carteira2,
        sku: _sku,
        quantidade: _quantidade,
        preco: _preco,
        timestamp: _timestamp,
        validado: false
    });
    emit TransacaoRegistrada(_carteira1, _carteira2, _sku, _quantidade, _preco, _timestamp);
    
}
    /// Função para teste - que recebe um endereço de carteira e retorna os detalhes da transação
    function getDetalhesTransacaoPendente(address carteira) public view returns (address carteira1, address carteira2, bytes32 sku, uint256 quantidade, uint256 preco, uint256 timestamp, bool validado) {
    DetalhesTransacao memory transacao = detalhesTransacaoPendente[carteira];
    return (transacao.carteira1, transacao.carteira2, transacao.sku, transacao.quantidade, transacao.preco, transacao.timestamp, transacao.validado);
}


    // A função a seguir realiza a validação da transação
    // RN.07 - Antes da finalização de uma transação, ela deve ser validada, incluindo a verificação de detalhes como
    // as carteiras envolvidas, SKU do produto, quantidade, preço, e timestamp. Esta validação preliminar assegura que
    // todas as partes estejam de acordo com os termos da transação.
    function validarTransacao(address _carteira1, address _carteira2, bytes32 _sku, uint256 _quantidade, uint256 _preco, uint256 _timestamp) public {
        require(_carteira1 != address(0) && _carteira2 != address(0), "Carteira Metamask invalida");
        detalhesTransacaoPendente[_carteira2] = DetalhesTransacao({
            carteira1: _carteira1,
            carteira2: _carteira2,
            sku: _sku,
            quantidade: _quantidade,
            preco: _preco,
            timestamp: _timestamp,
            validado: false
        });
    }
    // A função a seguir obtem a média das transações de um cliente
    // RN.04 - Permite que clientes ativos na rede consultem a média de suas transações registradas,
    // fornecendo uma ferramenta para análise e gestão financeira.
    function obterMediaTransacoes() external view returns (uint256) {
        bytes32 hashCarteira = keccak256(abi.encodePacked(msg.sender));
        uint256 soma;
        uint256 numTransacoes;
        for (uint256 i = 0; i < clientesPorHash[hashCarteira].length; i++) {
            if (clientesPorHash[hashCarteira][i].participaRede) {
                Cliente storage cliente = clientesPorHash[hashCarteira][i];
                for (uint256 j = 0; j < cliente.transacoes.length; j++) {
                    soma += cliente.transacoes[j];
                    numTransacoes++;
                }
            }
        }
        require(numTransacoes > 0, "Cliente nao possui transacoes");
        return soma / numTransacoes;
    }
    // A função seguir para obter informações de um produto pelo SKU
    // RN.06 - Permite a consulta de informações detalhadas de produtos registrados utilizando o SKU como referência,
    // garantindo que apenas produtos existentes possam ser consultados.
    function obterInformacoesProduto(bytes32 _sku) public view returns (string memory _nome) {
        require(bytes(produtos[_sku].nome).length > 0, "Produto nao encontrado");
        return produtos[_sku].nome;
    }
}