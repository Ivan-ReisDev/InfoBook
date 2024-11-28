# Info Livros

Este front-end foi desenvolvido para servir como interface da API-POSTGRES, permitindo a interação com todas as funcionalidades da API por meio de uma interface intuitiva.


## Recursos Disponíveis

- Criar Livro: Adicione um novo livro ao sistema.
- Listar Livros: Obtenha uma lista completa de todos os livros cadastrados.

## Tecnologias usadas

**Linguagem:** Typescript

**Framework:** Next.js

**UI:** Chakra.ui e TailwindCSS

## Instalação e Configuração

**Pré requisitos**

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 20 ou superior)
- Typescript (versão 5.7.2 ou superior)
- npm ou yarn

Faça o donwload do repositório através do github usando o comando:

Clone do repositório

```bash
  git clone https://link-to-project
```

Vá até o diretório.

```bash
  cd my-project
```

Após entrar na pasta será necessário configurar variáveis de ambiente, para isso crie na raíz do projeto o arquivo `.env`

Será necessário configurar a variável de ambiente `NEXT_PUBLIC_API_URL`

Exemplo:
```bash
  NEXT_PUBLIC_API_URL=http://localhost:8080
```
Caso você não configure a variável de ambiente, será usado por padrão o endereço `http://localhost:8080`


## Rodar Localmente

Para iniciar o projeto use:

Instalar dependências

```bash
  npm install
```

Iniciar o servidor

```bash
  npm run dev
```

O servidor ficará disponível na url `http://localhost:3000/`

