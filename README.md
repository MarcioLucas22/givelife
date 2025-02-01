# GiveLife

**GiveLife** é uma aplicação web desenvolvida para facilitar a doação de sangue, conectando doadores a bancos de sangue e instituições que necessitam de doações.

## 🚀 Tecnologias Utilizadas

- **Django**: Framework web em Python para desenvolvimento rápido e seguro.
- **HTML/CSS**: Estruturação e estilização das páginas web.
- **JavaScript**: Interatividade e melhoria da experiência do usuário.

## 📂 Estrutura do Projeto

- **app/**: Contém os arquivos principais da aplicação, incluindo modelos, visualizações e templates.
- **givelife/**: Configurações do projeto Django, definições de URLs e arquivos de inicialização.
- **.env.example**: Exemplo de variáveis de ambiente.
- **manage.py**: Script de linha de comando para interagir com o projeto Django.
- **requirements.txt**: Lista de dependências do projeto.

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MarcioLucas22/givelife.git
   cd givelife
   ```

2. **Crie um ambiente virtual e ative-o:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente:**
   - Renomeie `.env.example` para `.env` e preencha com as informações necessárias.

5. **Execute as migrações do banco de dados:**
   ```bash
   python manage.py migrate
   ```

6. **Inicie o servidor de desenvolvimento:**
   ```bash
   python manage.py runserver
   ```

7. **Acesse a aplicação:**
   - Abra o navegador e acesse: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## 📬 Contato

Para dúvidas ou suporte, entre em contato através do [GitHub de MarcioLucas22](https://github.com/MarcioLucas22).

---

Desenvolvido com ❤️ para conectar doadores e salvar vidas.
