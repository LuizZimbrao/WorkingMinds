## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados em sua máquina.
- Execute o docker caso necessario para rodar o docker-compose

## Instruções de Instalação e Execução com o Docker

1. **Clone o repositório ou baixe o zip**

   ```bash
   git clone https://github.com/LuizZimbrao/WorkingMinds.git
   cd WorkingMinds
   ```

   
2. **Execute o Docker Compose em um terminal na pasta do projeto**

   ```bash
   docker-compose up --build
   ou
   docker compose up --build
   ```


3. **Acesse a aplicação abaixo**
- Backend (Strapi): http://localhost:1337/admin


4. **Configuração do Strapi**
- Crie uma conta de administrador ao acessar a interface do Strapi.
- Popule os dados: Cadastre os estados e cidades no Strapi para que eles apareçam nos selects da aplicação frontend.


5. **Acesse a aplicação abaixo** 
- Frontend (Next.js): http://localhost:3000

## Instruções de Instalação e Execução sem o Docker

1. **Clone o repositório ou baixe o zip**

   ```bash
   git clone https://github.com/LuizZimbrao/WorkingMinds.git
   cd WorkingMinds
   ```

2. **Crie um arquivo .env na raiz da pasta cms com os dados abaixo**
   ```env
   # Server
   HOST=0.0.0.0
   PORT=1337
   
   # Secrets
   APP_KEYS=Kx/4nwbQa9DFkI59E8a7qA==,CJtHGBsnjsD34wCboAnzPQ==,qPhs0wrPccSB3wPNyhnIOQ==,FkdnDejMu338JGva637dYw==
   API_TOKEN_SALT=tICfiSY/QVDWOqyfhjanBQ==
   ADMIN_JWT_SECRET=T4EPTsWxsPi8HIqGChXYbg==
   TRANSFER_TOKEN_SALT=0NXBvDgXE4Hy/FiTSHZiCw==
   
   # Database
   DATABASE_CLIENT=sqlite
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_NAME=
   DATABASE_USERNAME=
   DATABASE_PASSWORD=
   DATABASE_SSL=false
   DATABASE_FILENAME=.tmp/data.db
   JWT_SECRET=0lItjs2c0fk+qoWhdp2LWw==
   ```

4. **Rode os comandos abaixo na ordem**

   ```bash
   cd frontend
   npm i
   cd ..

   cd cms
   npm i
   cd ..

   npm i
   npm start
   ```
