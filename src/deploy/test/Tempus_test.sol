// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "remix_tests.sol"; // Importa a biblioteca de testes
import "contracts/ContratoTempus.sol";// Importa o contrato a ser testado

contract TestContratoTempus {
    ContratoTempus contratoTempus;
    address enderecoCarteiraValido = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C;
    address enderecoCarteiraInvalido = 0x0000000000000000000000000000000000000000;

    function beforeEach() public {
        contratoTempus = new ContratoTempus();
    }

    /// Teste 1.1: Cadastro de Cliente com Endereço Válido
    function testeCadastroClienteEnderecoValido() public {
        try contratoTempus.cadastrarCliente("Cliente 1", enderecoCarteiraValido) {
            // Se a função cadastrarCliente for executada sem erros, o teste passa
            Assert.ok(true, "O cliente foi cadastrado com sucesso.");
        } catch Error(string memory reason) {
            // Se a função cadastrarCliente lançar um erro, o teste falha
            Assert.ok(false, "O cliente nao foi cadastrado com sucesso.");
        }
    }


    /// Teste 1.2: Cadastro de Cliente com Endereço Inválido
    function testeCadastroClienteEnderecoInvalido() public {
        Assert.equal(enderecoCarteiraInvalido, address(0), "O endereco da carteira deveria ser zero");
        bool result = true;
        try contratoTempus.cadastrarCliente("Cliente 2", enderecoCarteiraInvalido) {
            result = false; // Se a função não falhar, definimos o resultado como falso
        } catch Error(string memory reason) {
            Assert.equal(reason, "Endereco da carteira Metamask invalido", "A mensagem de erro retornada nao e a esperada.");
        }
        Assert.ok(result, "O cadastro do cliente com enderco invalido nao deveria ser permitido.");
    }

    /// Teste 3.1: Registrar Transacao com Cliente Participante
    function testeRegistrarTransacaoClienteParticipante() public {
        // Cadastra um cliente e o torna participante da rede
        contratoTempus.cadastrarCliente("Cliente 1", enderecoCarteiraValido);
        contratoTempus.participarRede();
        // Chama a função registrarTransacao com detalhes válidos da transação
        contratoTempus.registrarTransacao(enderecoCarteiraValido, enderecoCarteiraValido, keccak256("produto"), 1, 100, block.timestamp);
        // Verifica se a transação foi registrada corretamente
        (address carteira1, , bytes32 sku, , , , ) = contratoTempus.getDetalhesTransacaoPendente(enderecoCarteiraValido);
        Assert.equal(carteira1, enderecoCarteiraValido, "A carteira do cliente na transacao registrada nao e a esperada.");
        Assert.equal(sku, keccak256("produto"), "O SKU do produto na transacao registrada nao e o esperado.");
    }


    /// Teste 3.2: Registrar Transacao com Cliente Nao Participante
    function testeRegistrarTransacaoClienteNaoParticipante() public {
        // Cadastra um cliente
        contratoTempus.cadastrarCliente("Cliente 2", enderecoCarteiraValido);
        bool result = true;
        try contratoTempus.registrarTransacao(enderecoCarteiraValido, enderecoCarteiraValido, keccak256("produto"), 1, 100, block.timestamp) {
            result = false; // Se a função não falhar, definimos o resultado como falso
        } catch Error(string memory reason) {
            Assert.equal(reason, "Cliente nao esta ativo na rede", "A mensagem de erro retornada nao e a esperada.");
        }
        Assert.ok(result, "A registro de transacao por um cliente nao participante nao deveria ser permitido.");
    }

    /// Teste 5.1: Adicionar Produto pelo Proprietario
    function testeAdicionarProdutoPeloProprietario() public {
        // Chama a função adicionarProduto pelo proprietário com um SKU único e um nome de produto válido
        contratoTempus.adicionarProduto(keccak256("produto"), "Produto 1");
        // Verifica se o produto foi adicionado corretamente
        (string memory nome, ) = contratoTempus.getProduto(keccak256("produto"));
        Assert.equal(nome, "Produto 1", "O nome do produto adicionado nao e o esperado.");
    }

    /// Teste 5.2: Adicionar Produto por Cliente Nao Proprietario
    function testeAdicionarProdutoPorClienteNaoProprietario() public {
        bool result = true;
        try contratoTempus.adicionarProduto(keccak256("produto"), "Produto 2") {
            result = false; // Se a função não falhar, definimos o resultado como falso
        } catch Error(string memory reason) {
            Assert.equal(reason, "Apenas o proprietario pode adicionar produtos", "A mensagem de erro retornada nao e a esperada.");
        }
        Assert.ok(result, "A adicao de produto por um cliente nao proprietario nao deveria ser permitida.");
    }
 
}
