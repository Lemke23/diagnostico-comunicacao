# Diagn&oacute;stico de Comunica&ccedil;&atilde;o

Projeto est&aacute;tico em HTML, CSS e JavaScript com:

- formul&aacute;rio de diagn&oacute;stico comercial
- envio dos dados para o Supabase
- dashboard privado para leitura dos diagn&oacute;sticos

## Arquivos principais

- `index.html`: formul&aacute;rio principal
- `style.css`: estilos do formul&aacute;rio
- `script.js`: valida&ccedil;&atilde;o e envio para o Supabase
- `dashboard.html`: login e painel privado
- `dashboard.css`: estilos do dashboard
- `dashboard.js`: autentica&ccedil;&atilde;o e leitura da tabela `diagnosticos`

## Como usar o formul&aacute;rio

Abra `index.html` no navegador e preencha o diagn&oacute;stico normalmente.

## Como usar o dashboard

1. Abra `dashboard.html`.
2. Entre com um usu&aacute;rio criado no Supabase Auth usando e-mail e senha.
3. Depois do login, o painel lista os registros da tabela `diagnosticos`.

## Requisitos do Supabase para o dashboard

Para o dashboard funcionar de forma privada:

- a autentica&ccedil;&atilde;o por e-mail e senha deve estar habilitada no Supabase Auth
- a tabela `diagnosticos` precisa ter policy de `SELECT` liberada apenas para usu&aacute;rios autenticados
- a coluna `criado_em` deve existir para ordena&ccedil;&atilde;o decrescente

Exemplo de comportamento esperado da policy:

- usu&aacute;rio an&ocirc;nimo: n&atilde;o pode ler
- usu&aacute;rio autenticado: pode ler
