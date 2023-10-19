![Captura de Tela (63)](https://github.com/Andrei-hub11/chat-project/assets/83555334/f2207103-cd53-4bd8-8bab-4b84f8dd7306)

[...] Embora este aplicativo não tenha a complexidade de serviços de mensagens instantâneas em larga escala, como o WhatsApp, ele oferece funcionalidades interessantes que ilustram minha capacidade de criar soluções práticas e interativas.

# Funcionalidades Destacadas:
* Registro e Autenticação de Usuários: O aplicativo permite que os usuários se registrem com um nome, e-mail e senha, e autentiquem-se para acessar o chat.
* Criação de Salas de Chat: Os usuários podem criar suas próprias salas de chat.
* Convidar Amigos para Salas: Há uma funcionalidade de convite, que permite que os usuários convidem amigos para participar de uma sala usando o ID da sala.
* Aprovação de Solicitações: Os administradores da sala podem aprovar ou recusar solicitações de entrada, fornecendo controle sobre quem participa da conversa.
* Interface de Usuário Amigável: A interface de usuário foi desenvolvida com React, Styled-Components e Framer Motion para criar uma experiência agradável para o usuário.

# Pré-requisitos:

  **Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.**

Testando o Aplicativo de Chat:
* Clonando o Repositório:
        Clone o repositório do aplicativo para o seu sistema.
* Navegando até a Pasta do Aplicativo:
        Abra um terminal e navegue até a pasta raiz do seu aplicativo onde o arquivo docker-compose.yml está localizado.
* Iniciando os Contêineres:
Execute o seguinte comando para iniciar os contêineres definidos no arquivo docker-compose.yml: **docker-compose up -d**
* Registrando um Usuário:
 Abra seu navegador e acesse **http://localhost:3000/register**. Você será direcionado para a página de registro do aplicativo.
 Preencha o formulário de registro com as informações necessárias, como nome, e-mail e senha. Clique no botão de registro para criar uma conta.
Após o registro bem-sucedido, você será direcionado para a página home.

* Login do Usuário:
  Se tiver feito um registro e feito logout no home, pode usar a login page (**http://localhost:3000/login**) com as credenciais que você acabou de criar (e-mail e senha).

* Testando:
Agora você pode começar a testar as funcionalidades do aplicativo, criar chats, convidar amigos por meio do ID da sala, aprovar solicitações e utilizar outras funcionalidades.

* Encerrando o Aplicativo:
Quando você terminar de testar o aplicativo, você pode parar e remover os contêineres usando o seguinte comando: **docker-compose down**

# Nota Importante:

* Não possui responsividade completa, o que significa que pode não ser ideal para uso em dispositivos móveis.

* Além disso, é importante observar que, embora o MongoDB seja usado para autenticação, as mensagens e notificações não são salvas permanentemente no banco de dados. No entanto, elas serão persistentes durante a execução do servidor, o que significa que, se o servidor não for interrompido, as mensagens e notificações permanecerão acessíveis. Este aplicativo não foi projetado para armazenar mensagens a longo prazo, embora, é claro, não fosse ser dificultoso fazer isso, mas optei por algo mais direto e simples.

