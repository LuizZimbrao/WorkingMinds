Prazo para entrega no Github: até dia 28/10/24 (segunda)
Entrega: O desafio deve ser entregue via GitHub. Certifique-se de incluir todas as instruções necessárias no repositório para a execução e testes do projeto.


Desafio Técnico


O desafio consiste em desenvolver uma aplicação utilizando Strapi V5 no backend e Next.js no frontend, com o objetivo de avaliar suas habilidades técnicas.


Requisitos da Aplicação:

Frontend (Next.js)
1. Crie uma rota em Next.js: `/pessoa/add`

   - Nessa rota, desenvolva um formulário com os seguintes campos:


   Campo: Nome

   - Tipo: Texto

   - Obrigatório: Sim

   - Validação: No máximo 250 caracteres (Validação no lado do cliente - Client Side)

   - Placeholder: `"Seu Nome"`


   Campo: Email

   - Tipo: Texto

   - Obrigatório: Sim

   - Validação: O email deve ser válido e **único** (Validação no lado do servidor - Server Side)

   - Placeholder: `"email@gmail.com"`


    Campo: Estado

   - Tipo: Combobox (Seleção de opções)

   - Obrigatório: Sim

   - Dados: Devem ser carregados do **Strapi** (Renderização Server Side no Next.js)

   - Validação: O estado selecionado deve existir no Strapi (Validação no servidor)


    Campo: Cidade

   - Tipo: Combobox (Seleção de opções)

   - Obrigatório: Sim

   - Dados: Devem ser carregados dinamicamente com base no estado selecionado (Renderização Client Side no Next.js)

   - Validação: A cidade selecionada deve existir no Strapi (Validação no servidor)


2. O envio do formulário deve ser feito via requisição assíncrona.

   - Em caso de erros de validação, as mensagens apropriadas devem ser exibidas ao usuário.

   - Em caso de sucesso, o usuário deve ser redirecionado para uma página com a rota `/pessoa/{id do cadastro}`, onde os dados cadastrados serão exibidos.


Backend (Strapi V5)


1. Crie os seguintes modelos no Strapi:

   - Estado

   - Cidade

   - Pessoa

   

2. Os modelos devem ser configurados para atender às regras do formulário. 


3. Restrições:

   - Uma cidade não pode ser removida se houver uma pessoa associada a ela.

   - Um estado não pode ser removido se houver uma cidade associada a ele.


4. As APIs necessárias para o cadastro devem estar acessíveis publicamente.


Plus (Diferencial)
- Configure o projeto para ser executado via Docker Compose. Se necessário, adicione scripts adicionais para garantir que todo o sistema funcione corretamente.


Readme

- Inclua um README.md com as informações necessárias para rodar o projeto localmente (passo a passo) para que a solução possa ser testada sem dificuldades.


Entrega

- O desafio deve ser entregue via GitHub. Certifique-se de incluir todas as instruções necessárias no repositório para a execução e testes do projeto.