--- _Portugues_ ---

# Boas-vindas ao repositório do projeto `Football APP`!

🌱 Neste projeto temos a base para qualquer tipo de _e-commerce_ do tipo delivery. Dentro da aplicação temos fluxo de vendedor, cliente e administrador, cada um com suas funções com telas diferentes ao logar.

# Contexto geral:

<details>
    <summary>🗃️ <strong>Arquivos e pastas feitas por mim</strong></summary><br />
    📁 Participei ativamente de toda construção do frontend. A estilização com tailwind foi feita pelo parceiro do time que trabalhou comigo no frontend. Todo o backend foi feito pela outra parte do time que participou do projeto.
</details>

<details>
    <summary>🧰 <strong>Ferramentas</strong>, <strong>linguagens</strong> e respectivas <strong>funções</strong> utilizadas:</summary>
    <li> <i>JavaScript</i> (linguagem);</li>
    <li> <i>React</i> (criação de componentes visando escalabilidade no front-end);</li>
    <li> <i>Context API</i> (compartilhamento de dados entre componentes com escopo global no front-end);</li>
    <li> <i>Axios</i> (gerar requisições do front para o back);</li>
    <li> <i>MySQL</i> (banco de dados);</li>
    <li> <i>Sequelize</i> (comunicação banco - backend);</li>
    <li> <i>Node.js</i> (compilação);</li>
    <li> <i>Express</i> (gerenciar requisições);</li>
    <li> <i>Express async errors</i> (capturar erros da aplicação);</li>
    <li> <i>JWT</i> (validação de token e criptografia de senha);</li>
    <li> <i>Tailwind</i> (estilização);</li>
    <li> <i>Jest, mocha, chai, sinon</i> (testes unitários);</li>
</details>

<details>
    <summary>🚀 <strong>Como rodar o projeto</strong></summary>
    Neste projeto foi utilizado o <i>Docker</i>, para que não haja problemas com os softwares locais da máquina, além de ter um <i>ambiente isolado</i> para cada área (frontend, backend e banco de dados).
    <br>

  1. **Criar os containers**

  ```bash
  $ docker-compose up -d --build
  ```

  2. **No terminal do container do backend, rodar o comando para popular o banco**

  ```bash
  $ npm run db:reset
  ```

  3. **Iniciar server**

  ```bash
  $ npm run dev
  ```

As dependencias serão instaladas dentro dos respectivos containers, pois ao criá-los é rodado o comando _npm install_ em cada **Dockerfile**.
</details>

# Observações
Como sempre, um projeto nunca termina de fato. Sempre haverão **melhorias** para serem aplicadas.

<details>
    <summary><strong>Futuro potencial/melhorias</strong></summary>
    <li>Melhorias estruturais seguindo alguns design de software como SOLID, POO, DDD, etc;</li>
    <li>Testes unitários mais específicos, expressivos e funcionais;</li>
    <li>Expandir alguns trechos de codigos para uma melhor manutenção e entendimento;</li>
    <li>Adicionar comentários explicativos;</li>
    <li>Criar fluxo de administrador;</li>

    Essas são apenas algumas ideias de melhorias e adição de novas features!
</details>

Deixe seu [Feedback](https://53tqbjd4mxw.typeform.com/to/ByYIpNt8)!