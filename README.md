# Canella & Santos Survey App

Este é um projeto em **Next.js** para avaliar emojis de forma simples e intuitiva. Os usuários podem enviar suas avaliações via formulário, que é enviado usando o **EmailJS** e armazenado no banco de dados **NeonDB**. Um script adicional permite transferir os dados do NeonDB para um banco de dados local para análises ou backup.

## Funcionalidades

- Avaliação de emojis com interface simples em Next.js.
- Envio de feedback via **EmailJS**.
- Armazenamento dos dados no banco de dados **NeonDB**.
- Script manual para sincronizar os dados do NeonDB com um banco de dados local.

---

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- Node.js (versão 16 ou superior)
- Banco de dados local (Opcional)
- Conta no **EmailJS**
- Conta no **NeonDB**

---

## Instalação

1. Clone o repositório:
```bash
[git clone https://github.com/seu-usuario/seu-repositorio.git](https://github.com/hugolalmeida/company-survey.git)
cd canella-survey
```
2. Instale as dependencias:
```bash
npm install
```
## Vercel
- Esse Survey está online, utilizando o vercel, que tem incluso o neon DB, como host.
- Acesse o Survey pelo link: [https://avalicao-canella.vercel.app/](https://avalicao-canella.vercel.app/)
