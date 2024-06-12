# Artefatos
Aqui está a localização dos artefatos entregues em cada sprint, para cada, é possível ver as seções específicas.

## Sprint 1

### Entendimento do Negócio 
- &emsp;&emsp;1. Introdução
- &emsp;&emsp;2. Objetivos
- &emsp;&emsp;3. Compreensão do Problema

### Entendimento da Experiência do Usuário
- &emsp;&emsp;4. Análise de Experiência do Usuário
- &emsp;&emsp;4.1 Personas
- &emsp;&emsp;4.3 User Stories

### Análise de Risco (Segurança da Informação)
- &emsp;&emsp;7.1 Segurança da informação

## Sprint 2

### Smart Contracts
- Smart Contract -> src -> smart_contract_sol

### Documentação Smart Contracts
- &emsp;&emsp;7.2 Requisitos de Negócios  
- &emsp;&emsp;7.3 Fluxo Principal
- &emsp;&emsp;7.4 Diagrama de Blocos
- &emsp;&emsp;7.5 Diagrama da solução (UML)

## Sprint 3

### Planejamento da Integração
- &emsp;&emsp;7.7 Arquitetura da Integração

### Front-end integrado com Smart Contract
- &emsp;&emsp;7.2 Regras de Negócios (Adesão de regras de negócios) 
- &emsp;&emsp;7.2.1 Regras de Negócios Atualizadas (Melhorias nos Smart Contract)
- &emsp;&emsp;7.2.2 Termos de uso para solução
- &emsp;&emsp;7.3 Tecnologias Escolhidas para a solução
- &emsp;&emsp;4.4 Demonstração do Front-End (Vídeo)

### Documentação do Front-End
- &emsp;&emsp;6.2 Documentação do front-end
- &emsp;&emsp;6.3 Estrutura do Projeto
- &emsp;&emsp;[READ.ME do front-end](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/src/README.md)

## Sprint 4
### Documentação do Deploy de Smart Contracts
- &emsp;&emsp;<a href="https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/docs/documentation.md#c14
">Vídeo de demonstração.</a>

- &emsp;&emsp;<a href="https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/src/smart_contract/contracts/ContratoTempus.sol
">Versão atualizada do smart contract.</a>


### Deploy de Smart Contracts

- &emsp;&emsp;7.8 Diagrama da Implantação
- &emsp;&emsp;README.md - 2. Documentação do Deploy de Smart Contracts

### Testes Automatizados
- &emsp;&emsp;8. Desenvolvimento com testes
- &emsp;&emsp;8.1 Contrato de Testes `Tempus_test.sol`
- &emsp;&emsp;8.2 Resultados dos Testes
- &emsp;&emsp;8.3 Medidas a Serem Tomadas com os Resultados dos Testes
- &emsp;&emsp;README.md - 1. Documentação de Testes do Contrato Tempus

## Sprint 5

### Revisão do Código

### Revisão da Documentação

### Apresentação Final
- &emsp;&emsp;6.7 Arquitetura da Integração

---
## 1. Documentação de Testes do Contrato Tempus

Os testes foram realizados para verificar o funcionamento adequado do contrato Tempus. Para detalhes completos sobre o processo de testes, consulte a [seção 7](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/dev/docs/documentation.md#8-desenvolvimento-com-testes) da documentação. Os testes foram feitos tendo como base certificar que as regras de negócio sejam aplicadas de forma adequada. Veja as regras selecionadas para os testes.

### 1. Cadastrar Cliente
- **Regra de Negócio:** Cadastro de Clientes
- **Descrição:** Todos os clientes devem ser registrados na plataforma Tempus com um nome único e um endereço de carteira Metamask válido.

<div align="center">
  <p> Cadastro de Clientes</p>

| Caso de Teste                                | Resultado |
|----------------------------------------------|-----------|
| 1.1: Cadastro de Cliente com Endereço Válido | ✓         |
| 1.2: Cadastro de Cliente com Endereço Inválido | ✓        |

  <p><b>Fonte:</b> elaboração por Ethos.</p>
</div>

**Casos de Teste:**

**1.1: Cadastro de Cliente com Endereço Válido**
- **Pré-condição:** Nenhum cliente cadastrado.
- **Procedimento:** Chamar `cadastrarCliente` com nome único e endereço Metamask válido.
- **Resultado Esperado:** Cliente cadastrado com sucesso.
- **Pós-condição:** Cliente registrado no sistema.

**1.2: Cadastro de Cliente com Endereço Inválido**
- **Pré-condição:** Nenhum cliente cadastrado.
- **Procedimento:** Chamar `cadastrarCliente` com nome único e endereço Metamask inválido.
- **Resultado Esperado:** Erro indicando endereço de carteira inválido.
- **Pós-condição:** Nenhum cliente registrado.

### 3. Registrar Transação
- **Regra de Negócio:** Registro de Transações
- **Descrição:** Transações só podem ser registradas por clientes cadastrados e ativos na rede.
<div align="center">
  <p> Controle de Documento</p>

| Caso de Teste                                           | Resultado |
|---------------------------------------------------------|-----------|
| 3.1: Registrar Transação com Cliente Participante       | ✓         |
| 3.2: Registrar Transação com Cliente Não Participante   | ✘         |
  <p><b>Fonte:</b> elaboração por Ethos.</p>
</div>

**Casos de Teste:**

**3.1: Registrar Transação com Cliente Participante**
- **Pré-condição:** Cliente cadastrado e participante da rede.
- **Procedimento:** Chamar `registrarTransacao` com detalhes válidos.
- **Resultado Esperado:** Transação registrada com sucesso.
- **Pós-condição:** Transação vinculada ao cliente.

**3.2: Registrar Transação com Cliente Não Participante**
- **Pré-condição:** Cliente cadastrado, mas não participante da rede.
- **Procedimento:** Chamar `registrarTransacao` com detalhes válidos.
- **Resultado Esperado:** Erro indicando cliente não ativo na rede.
- **Pós-condição:** Nenhuma transação registrada.

### 5. Adicionar Produto
- **Regra de Negócio:** Registro de Novos Produtos
- **Descrição:** Apenas o proprietário do contrato pode adicionar novos produtos ao sistema.

<div align="center">
  <p> Controle de Documento</p>

| Caso de Teste                                   | Resultado |
|-------------------------------------------------|-----------|
| 5.1: Adicionar Produto pelo Proprietário         | ✓         |
| 5.2: Adicionar Produto por Cliente Não Proprietário | ✘       |
  <p><b>Fonte:</b> elaboração por Ethos.</p>
</div>

**Casos de Teste:**

**5.1: Adicionar Produto pelo Proprietário**
- **Pré-condição:** Nenhum produto cadastrado.
- **Procedimento:** Chamar `adicionarProduto` pelo proprietário com SKU único e nome válido.
- **Resultado Esperado:** Produto adicionado com sucesso.
- **Pós-condição:** Produto registrado no sistema.

**5.2: Adicionar Produto por Cliente Não Proprietário**
- **Pré-condição:** Nenhum produto cadastrado.
- **Procedimento:** Chamar `adicionarProduto` por cliente que não seja o proprietário.
- **Resultado Esperado:** Erro indicando que apenas o proprietário pode adicionar produtos.
- **Pós-condição:** Nenhum produto registrado.

Para informações mais detalhadas sobre o processo de testes, consulte a [seção 7](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/docs/documentation.md#7-desenvolvimento-com-testes) da documentação. Além disso, a versão do Smart Contract utilizada é a seguinte [aqui](https://github.com/Inteli-College/2024-T0010-SI05-G02/commit/92e47ebf39c553d12539b4273f41eb8879de8b05) e para visualizar o código completo de testes, entre [aqui](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/src/deploy/test/Tempus_test.sol).

## 2. Documentação do Deploy de Smart Contracts

&emsp;&emsp;O termo `deploy` em programação, inclusive no contexto de blockchain, refere-se ao processo de publicar ou instalar um código ou aplicação em um ambiente de produção ou em um ambiente específico onde o software poderá ser executado por usuários finais.

&emsp;&emsp;No projeto da Ethos, o deploy foi realizado em uma rede pública chamada "Sepolia".

&emsp;&emsp;Lembrando que, o processo de deploy normalmente consome uma quantidade de criptomoeda nativa da blockchain (como o ETH para a rede Ethereum) para pagar pela execução do contrato e pelo espaço de armazenamento que ele ocupa na rede, conhecido como "gas".

### Deploy de Smart Contracts

#### Como executar um deploy?

- Primeiramente é necessário que o usuário tenha uma carteira cadastrada na MetaMask;

- Com a carteira validada e o acesso na MetaMask, é necessário que o usuário clique nos três pontinhos do canto superiro direito, acesse "Detalhes da conta" e copie sua chave privada;

- Agora, na documentação do Github do projeto Ethos, o usuário deve clonar o repositório para sua máquina e abrir o projeto na plataforma "Visual Studio Code".

- Em "Explorador", ele deve procurar a pasta "src" e acessar "smart_contract". Dentro de "smart_contract", o usuário deve acessar o "hardhat.config.ts".

- Uma vez que o usuário está com o código em mãos, deve procurar pela linha: `const SEPOLIA_PRIVATE_KEY` e substituir após o `=` pela sua chave privada da carteia MetaMask.

- Feito isso, o usuário deve acessar o terminal e executar o comando de `npm i` para instalar as dependências - eles podem ser observadas em "package.json".

- Por fim, mas não menos importante, o usuário deve executar o seguinte comando no terminal para fazer com que o deploy funcione: `npx hardhat ignition deploy ./ignition/modules/ContratoTempus.ts --network sepolia`.