# doc sobre deploy 

# doc sobre test automatizado

## Casos de Teste:

1. **Cadastrar Cliente:**
   - **Pré-condição:** Nenhuma.
   - **Procedimento de Teste:**
     1. Tentar cadastrar um cliente com um endereço de carteira Metamask inválido.
     2. Cadastrar um cliente com um endereço de carteira Metamask válido.
   - **Resultado Esperado:**
     1. O sistema deve rejeitar o cadastro com um endereço de carteira Metamask inválido.
     2. O cliente deve ser cadastrado com sucesso.
   - **Pós-condição:** Cliente cadastrado com sucesso.

2. **Participar da Rede:**
   - **Pré-condição:** Cliente cadastrado.
   - **Procedimento de Teste:**
     1. Tentar participar da rede sem ter sido cadastrado.
     2. Participar da rede após o cadastro.
   - **Resultado Esperado:**
     1. O sistema deve rejeitar a tentativa de participar da rede sem cadastro.
     2. O cliente deve ser habilitado como participante da rede após o cadastro.
   - **Pós-condição:** Cliente participante da rede.

3. **Registrar Transação:**
   - **Pré-condição:** Cliente participante da rede.
   - **Procedimento de Teste:** Registrar uma transação.
   - **Resultado Esperado:** A transação deve ser registrada com sucesso.
   - **Pós-condição:** Transação registrada com sucesso.

4. **Obter Média das Transações de um Cliente:**
   - **Pré-condição:** Transações registradas para o cliente.
   - **Procedimento de Teste:** Obter a média das transações do cliente.
   - **Resultado Esperado:** A média das transações do cliente deve ser calculada corretamente.
   - **Pós-condição:** Média das transações obtida com sucesso.

5. **Adicionar Produto:**
   - **Pré-condição:** Nenhuma.
   - **Procedimento de Teste:** Tentar adicionar um produto com um SKU já existente e adicionar um produto com um SKU novo.
   - **Resultado Esperado:** O sistema deve rejeitar a adição do produto se o SKU já existir e adicionar o produto com sucesso se o SKU for novo.
   - **Pós-condição:** Produto adicionado com sucesso (se aplicável).

6. **Obter Informações de Produto:**
   - **Pré-condição:** Produto registrado com SKU válido.
   - **Procedimento de Teste:** Tentar obter informações de um produto com SKU válido e SKU inválido.
   - **Resultado Esperado:** O sistema deve retornar as informações do produto com SKU válido e rejeitar a consulta com SKU inválido.
   - **Pós-condição:** Informações do produto obtidas com sucesso (se aplicável).

7. **Validar Transação:**
   - **Pré-condição:** Nenhuma.
   - **Procedimento de Teste:** Validar uma transação.
   - **Resultado Esperado:** A transação deve ser validada com sucesso.
   - **Pós-condição:** Transação validada com sucesso.

8. **Validar Detalhes da Transação:**
   - **Pré-condição:** Detalhes da transação pendente.
   - **Procedimento de Teste:** Validar os detalhes da transação pendente.
   - **Resultado Esperado:** Os detalhes da transação pendente devem ser validados com sucesso.
   - **Pós-condição:** Detalhes da transação pendente validados com sucesso.

9. **Manutenção de Dados de Usuário:**
   - **Pré-condição:** Nenhuma.
   - **Procedimento de Teste:** Tentar acessar funcionalidades sem fornecer dados de usuário.
   - **Resultado Esperado:** O acesso às funcionalidades deve ser restrito até que os dados necessários do usuário sejam fornecidos.
   - **Pós-condição:** Acesso às funcionalidades restrito até que os dados do usuário sejam fornecidos.

10. **Gerenciamento de Carteiras Metamask:**
    - **Pré-condição:** Nenhuma.
    - **Procedimento de Teste:** Tentar atualizar ou excluir uma carteira Metamask sem autorização.
    - **Resultado Esperado:** O sistema deve rejeitar a tentativa de atualizar ou excluir uma carteira Metamask sem autorização.
    - **Pós-condição:** Acesso restrito às operações de CRUD de carteiras Metamask sem autorização.

11. **Gerenciamento de Produtos:**
    - **Pré-condição:** Nenhuma.
    - **Procedimento de Teste:** Tentar atualizar ou excluir um produto sem autorização.
    - **Resultado Esperado:** O sistema deve rejeitar a tentativa de atualizar ou excluir um produto sem autorização.
    - **Pós-condição:** Acesso restrito às operações de CRUD de produtos sem autorização.

Esses casos de teste cobrem as regras de negócio e garantem a validação adequada. Cada caso de teste deve ser implementado como parte dos testes automatizados do contrato em Solidity.

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
