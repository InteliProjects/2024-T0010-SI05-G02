# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="assets/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# Aplicações em Blockchain

## Grupo Ethos

## 👨‍🎓 Integrantes: 
- <a href="">Daniel Mendez </a>
- <a href="https://www.linkedin.com/in/eduardo-hos/">Eduaro Oliveira</a>
- <a href="https://www.linkedin.com/in/izadoraluz-rsn/">Izadora Luz </a>
- <a href="https://www.linkedin.com/in/keylla-oliveira1206/">Keylla Oliveira</a>
- <a href="https://www.linkedin.com/in/lucasdasilvabarbosa/">Lucas Barbosa</a>
- <a href="https://www.linkedin.com/in/paulooctaviodepaula/">Paulo Octavio</a>
- <a href="https://www.linkedin.com/in/samuel-martins-lopes-nascimento-7a805526a/">Samuel Nascimento</a>

(...)

## 👩‍🏫 Professores:
### Orientador(a) 
- Renato Penha

### Instrutores
- Ana Cristina
- Fernando Pizzo
- Rafael Jacomossi
- Sergio Venancio
- Victor Hayashi

## 📜 Descrição

O projeto, realizado em parceria com a Alliance, tem como objetivo tornar o processo de cotação de produtos mais transparent, seguro e eficiente, utilizando a tecnologia blockchain. Nesse contexto, o preço médio se torna transparente, auxiliando no processo de tomada de decisão dos compradores. A tecnologia blockchain, ao assegurar a imutabilidade e a segurança dos dados, permite que os usuários tenham acesso a um histórico confiável dos preços praticados no mercado. Isso elimina a possibilidade de manipulação de preços por fornecedores desonestos, garantindo que os compradores paguem um preço justo pelos produtos e serviços.

A plataforma Tempus, desenvolvida pelo grupo Ethos, é voltada exclusivamente para os clientes da Alliance e inicia o processo com uma verificação de login através da carteira MetaMask. Uma vez autenticados, os usuários têm acesso a diversas funcionalidades na plataforma, tais como o cadastro de novos produtos e transações, a pesquisa do preço médio de produtos, o histórico de transações do produto, entre outras.

## 📁 Estrutura de pastas

📁|--> assets<br>
  &emsp;| --> imagens <br>
  &emsp;|--> readme.md<br>
📁|--> docs<br>
  &emsp;| --> documentation<br>
  &emsp;|--> readme.md<br>
📁|--> src<br>
 &emsp;  📁|--> diagrama<br>
 &emsp;  📁|--> frontend<br>
             &emsp;&emsp; &emsp; |--> package.json<br>
             &emsp;&emsp; &emsp; |--> package-lock.json<br>
              &emsp;&emsp;&emsp; |--> next.config.js<br>
 &emsp;  📁|--> deploy<br>
                   &emsp; &emsp; 📁|--> contracts<br>
                    &emsp; &emsp; &emsp; &emsp;&emsp; |--> smartcontract.sol<br>
          &emsp;|--> hardhat.config.ts<br>
 &emsp;  📁|--> ignition/modules<br>
                     &emsp; &emsp;&emsp; |--> ContratoTempus.ts<br>
 &emsp;  📁|--> test<br>
                    &emsp;  &emsp;&emsp; |--> Lock.ts<br>
                     &emsp; &emsp;&emsp; |-->Tempus.test.sol<br>
              
  &emsp;|--> readme.md<br>
| readme.md<br>

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>assets</b>: Aqui estão os recursos gráficos associados ao projeto, que incluem imagens e links de vídeos. Esses materiais são utilizados para diversos propósitos documentacionais, como a representação de personas, diagramas UML, vídeos explicativos sobre o funcionamento do projeto, entre outros. Além disso, eles também incluem elementos de branding, como o logotipo do projeto.
  
- <b>docs</b>: Aqui estão todos os documentos relacionados ao projeto. Além disso, existe um arquivo README que serve como um guia para o grupo, registrando a localização de cada artefato. Esses artefatos representam várias partes do projeto e estão documentados em detalhes no arquivo documentação.md. Isso permite que os stakeholders tenham uma compreensão mais profunda do projeto.

- <b>src</b>: Todo o código-fonte criado para o desenvolvimento do projeto, incluindo o backend e o frontend. O frontend, que é a interface da solução, foi desenvolvido em Next.js, uma estrutura popular para a construção de aplicações web em React. O backend tem uma arquitetura mais complexa que envolve smart contracts, Hardhat para o deploy de contratos inteligentes, e um banco de dados Web2 para o armazenamento de dados.

- Para entender mais, temos algumas seções na documentação que abordam esse tema:

- Link para a documentação do frontend: [seção 5.1](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/docs/documentation.md#51-documenta%C3%A7%C3%A3o-do-front-end)

- Link para as tecnologias utilizadas: [seção 6.3](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/docs/documentation.md#73-tecnologias-escolhidas-e-arquitetura-da-solu%C3%A7%C3%A3o)

- Link para a documentação da arquitetura da solução (diagrama de blocos): [seção 6.5](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/docs/documentation.md#65-diagrama-de-blocos)

- Link para o diagrama de implantação: [seção 6.8](https://github.com/Inteli-College/2024-T0010-SI05-G02/blob/main/docs/documentation.md#68-diagrama-de-implanta%C3%A7%C3%A3o)

- Esses links fornecem informações detalhadas sobre diferentes aspectos do projeto. Recomendamos a leitura para uma compreensão mais profunda do projeto.

- <b>README.md</b>: Este arquivo serve como um guia e uma explicação geral sobre o projeto. Ele é projetado para fornecer uma visão abrangente do escopo, dos objetivos e das funcionalidades da plataforma Tempus, desenvolvida pelo grupo Ethos.
## 🔧 Instalação

Para usufruir da plataforma Tempus, é indispensável realizar alguns passos preliminares, como a criação da carteira MetaMask e em sequência a conexão desta carteira MetaMask com a plataforma Tempus. A MetaMask é uma carteira digital que permite armazenar tokens como o Ethereum, Matic, USDT e outros e funciona como uma extensão para navegadores como Chrome, Opera, Brave Browser, Firefox e Mozilla1. Ela é amplamente utilizada para transações envolvendo tokens, além de interagir com aplicativos descentralizados.

Aqui está um tutorial simplificado de como instalar a carteira MetaMask no seu computador:

<b>1</b>.Instale a Extensão:

- Acesse as extensões do seu navegador de preferência.
  
- Pesquise por “MetaMask” e siga os passos para o download e ativação da extensão.

<b>2</b>.Localize o Ícone da MetaMask:

- Após a instalação, localize o ícone da MetaMask entre suas extensões e clique nele.
  
- Uma tela de boas-vindas será exibida, leia os termos e condições de uso e aceite-os para prosseguir.

<b>3</b>.Crie ou Importe uma Carteira:

- Para usuários que já possuem uma carteira, é possível acessar a carteira mediante a chave privada.
  
- Caso seja um novo usuário, siga as instruções para criar sua carteira. É crucial armazenar de forma segura sua chave privada, pois ela é necessária para acessos futuros à sua carteira..

<b>4</b>.Conecte-se à Plataforma Tempus:

- Na plataforma Tempus, clique no botão de login.
  
- Selecione a opção para conectar sua carteira MetaMask.
  
- Uma solicitação de conexão será enviada e, após a aprovação pela Alliance, sua carteira estará conectada e pronta para uso na plataforma. 

## 🗃 Histórico de lançamentos

* 0.1.0 - 16/02/2024 Entrega da sprint 1

   Artefatos: Entendimento do Negócio, Entendimento da Experiência do Usuário e Análise de Risco (Segurança da Informação).
  
* 0.2.0 - 01/03/2024 Entrega da sprint 2

   Artefatos: Smart Contracts e Documentação dos Smart Contracts.

* 0.3.0 - 15/03/2024 Entrega da sprint 3

   Artefatos: Front-end integrado com Smart Contract, Documentação do Front-End e Planejamento da Integração.

* 0.4.0 - 28/03/2024 Entrega da sprint 4

   Artefatos: Deploy de Smart Contracts, Documentação do Deploy de Smart Contracts e Testes Automatizados.

* 0.5.0 - 11/04/2024 Entrega da sprint 5

   Artefatos: Revisão do Código, Revisão da Documentação e Apresentação Final.

## 📋 Licença/License
[Ethos](https://github.com/Inteli-College/2024-T0010-SI05-G02) by [Inteli](https://www.inteli.edu.br/), [Daniel Mendez](https://github.com/Inteli-College/2024-T0010-SI05-G02/tree/read.me), [Eduardo Oliveira](https://www.linkedin.com/in/eduardo-hos/), [Izadora Luz](https://www.linkedin.com/in/izadoraluz-rsn/), [Keylla Oliveira](https://www.linkedin.com/in/keylla-oliveira1206/), [Lucas Barbosa](https://www.linkedin.com/in/lucasdasilvabarbosa/), [Paulo Octavio](https://www.linkedin.com/in/paulooctaviodepaula/), [Samuel Nascimento](https://www.linkedin.com/in/samuel-martins-lopes-nascimento-7a805526a/) is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <a name="referencia-1"></a>Gushiken, A. (2023, 23 de outubro). Value Proposition Canvas: o que é e como funciona essa metodologia? G4 Educação. https://g4educacao.com/portal/value-proposition-canvas. Acesso em: 15 fev. 2024.
2. <a name="referencia-2"></a>Napoleão, B. M. (2019, 29 de junho). Matriz de Riscos (Matriz de Probabilidade e Impacto). Ferramentas de Qualidade. https://ferramentasdaqualidade.org/matriz-de-riscos-matriz-de-probabilidade-e-impacto/. Acesso em: 15 fev. 2024.
3. <a name="referencia-3"></a>Chan Kim, W., & Mauborgne, R. (2019). A estratégia do oceano azul: Como criar novos mercados e tornar a concorrência irrelevante (A. Celso da Cunha Serra, Trad.; 2a ed.). Editora Sextante.
4. <a name="referencia-4"></a> Sobre Nós. (s.d.). Soluções inteligentes para seu negócio | Thomson Reuters. https://www.thomsonreuters.com.br/pt/sobre-nos.html. Acesso em: 14 fev. 2024.
5. <a name="referencia-5"></a>Sobre nós. (s.d.). Grant Thornton Brasil - Auditoria, Consultoria e Tributos. https://www.grantthornton.com.br/sobre-nos/. Acesso em: 14 fev. 2024.
6. <a name="referencia-6"></a>Babich, N. (2017, 29 de setembro). Putting Personas to Work in UX Design: What They Are and Why They’re Important. Welcome to the Adobe Blog. https://blog.adobe.com/en/publish/2017/09/29/putting-personas-to-work-in-ux-design-what-they-are-and-why-theyre-important. Acesso em: 14 fev. 2024.
7. <a name="referencia-7"></a>What is User Centered Design (UCD)? (2016, 5 de junho). The Interaction Design Foundation. https://www.interaction-design.org/literature/topics/user-centered-design. Acesso em: 08 fev. 2024.
8. <a name="referencia-8"></a> ARRUDA, Ricardo. **O que são User Stories (Estórias de Usuário)? - Agile Expert**. 14 maio 2021. Disponível em: https://www.agilexpert.com.br/2021/05/14/o-que-sao-user-stories-historias-de-usuario/. Acesso em: 26 fev. 2024.
9. <a name="referencia-9"></a> Fáwọlé, J., & Ciattaglia, L. (2023, 14 de dezembro). Blockchain Security: Common Vulnerabilities and How to Protect Against Them - Hacken. Hacken. https://hacken.io/insights/blockchain-security-vulnerabilities. Acesso em: 08 fev. 2024.
10. <a name="referencia-10"></a>Seifried, K. (2020, 26 de outubro). Blockchain Attacks, Vulnerabilities and Weaknesses | CSA. Home | CSA. https://cloudsecurityalliance.org/blog/2020/10/26/blockchain-attacks-vulnerabilities-and-weaknesses. Acesso em: 08 fev. 2024.
11. <a name="referencia-11">DALLAVALLE, Silvia Inês; CAZARINI, Edson Walmir. Regras do Negócio, um fator chave de sucesso no processo de desenvolvimento de Sistemas de Informação. Anais do XX ENEGEP-Encontro Nacional de Engenharia de Produção. São Paulo, 2000</a>
12. <a name="referencia-12">MARTIN, Robert C. Clean Architecture: A Craftsman's Guide to Software Structure and Design. Prentice Hall, 2017.</a>
13. <a name="referencia-13">MORGAN, Tony. Business Rules and Information Systems: Aligning IT with Business Goals. Boston: Addison-Wesley Professional, Março de 2002. ISBN: 9780201743913.</a> 
14. <a name="referencia-14">GasNow: Disponível em: https://gasnow.io/. Acesso em: 12 de março de 2024.</a>
15. <a name="referencia-15">Alliance Consultoria: Disponível em: https://www.allianceconsultoria.com.br/. Acesso em: 12 de março de 2024.</a>
16. <a name="referencia-16"></a> ISO 25010. Disponível em: https://iso25000.com/index.php/en/iso-25000-standards/iso-25010. Acesso em: 28 março de 2024.

