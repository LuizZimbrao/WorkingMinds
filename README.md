## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados em sua máquina.
- Execute o docker caso necessario para rodar o docker-compose

## Instruções de Instalação e Execução

1. **Clone o repositório ou baixe o zip**

   ```bash
   git clone https://github.com/LuizZimbrao/WorkingMinds.git
   cd WorkingMinds
   ```
2. **Execute o Docker Compose**

   ```bash
   docker-compose up --build
   ```

3. **Acesse as Aplicações**

- Frontend (Next.js): http://localhost:3000
- Backend (Strapi): http://localhost:1337/admin

4. **Configuração do Strapi**

- Crie uma conta de administrador ao acessar a interface do Strapi.
- Popule os dados: Cadastre os estados e cidades no Strapi para que eles apareçam nos selects da aplicação frontend.
