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

## Dados de teste

O arquivo `test-data.js` re&uacute;ne 3 diagn&oacute;sticos de teste no mesmo formato usado pelo formul&aacute;rio para enviar ao Supabase:

- `cenario-1-desorganizada`: empresa com comunica&ccedil;&atilde;o fraca, Instagram sem estrat&eacute;gia, WhatsApp improvisado e vendas sem processo
- `cenario-2-evolucao`: empresa em fase de organiza&ccedil;&atilde;o, com comunica&ccedil;&atilde;o razo&aacute;vel e automa&ccedil;&otilde;es simples
- `cenario-3-estruturada`: empresa com comunica&ccedil;&atilde;o forte, canais organizados, automa&ccedil;&atilde;o ativa e foco em escalar

O arquivo n&atilde;o executa nenhum envio autom&aacute;tico.

### Como usar os cen&aacute;rios

1. Abra o navegador na pasta do projeto.
2. Carregue manualmente `test-data.js` no console, se quiser testar inser&ccedil;&atilde;o sem preencher o formul&aacute;rio.
3. Use `window.diagnosticTestData.TEST_DIAGNOSTICS` para inspecionar os objetos.
4. Use `window.diagnosticTestData.insertTestDiagnostic(window.diagnosticTestData.TEST_DIAGNOSTICS[0].payload)` para inserir um cen&aacute;rio por vez.
5. Use `window.diagnosticTestData.insertAllTestDiagnostics()` apenas se quiser inserir os 3 cen&aacute;rios em sequ&ecirc;ncia.

### Como validar cada cen&aacute;rio

- Formul&aacute;rio:
  Preencha manualmente o `index.html` com os dados do cen&aacute;rio ou use o objeto `payload` como refer&ecirc;ncia para conferir campos e valida&ccedil;&otilde;es.
- Supabase:
  Ap&oacute;s enviar, confirme na tabela `diagnosticos` se `nome_empresa`, `canais`, `produtos` e `respostas` foram gravados.
- Dashboard:
  Entre em `dashboard.html`, pesquise pelo nome da empresa e abra `Ver detalhes`.
- An&aacute;lise r&aacute;pida:
  Compare se os pontos fortes, gargalos e sugest&otilde;es refletem o perfil esperado de cada cen&aacute;rio.
- PDF:
  No dashboard, gere o PDF para cada empresa e verifique se o relat&oacute;rio abre com cabe&ccedil;alho, an&aacute;lise r&aacute;pida e se&ccedil;&otilde;es completas j&aacute; na primeira p&aacute;gina.
