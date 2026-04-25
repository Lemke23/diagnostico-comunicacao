# Diagn&oacute;stico de Comunica&ccedil;&atilde;o

Projeto est&aacute;tico em HTML, CSS e JavaScript com:

- formul&aacute;rio de diagn&oacute;stico comercial
- envio dos dados para o Supabase
- dashboard privado para leitura dos diagn&oacute;sticos
- fun&ccedil;&atilde;o Netlify para gerar an&aacute;lise com IA via OpenAI

## Arquivos principais

- `index.html`: formul&aacute;rio principal
- `style.css`: estilos do formul&aacute;rio
- `script.js`: valida&ccedil;&atilde;o e envio para o Supabase
- `dashboard.html`: login e painel privado
- `dashboard.css`: estilos do dashboard
- `dashboard.js`: autentica&ccedil;&atilde;o, leitura da tabela `diagnosticos` e chamada da an&aacute;lise por IA
- `netlify/functions/analisar-diagnostico.js`: fun&ccedil;&atilde;o serverless segura para chamar a OpenAI

## Como usar o formul&aacute;rio

Abra `index.html` no navegador e preencha o diagn&oacute;stico normalmente.

## Como usar o dashboard

1. Abra `dashboard.html`.
2. Entre com um usu&aacute;rio criado no Supabase Auth usando e-mail e senha.
3. Depois do login, o painel lista os registros da tabela `diagnosticos`.
4. Clique em `Gerar an&aacute;lise r&aacute;pida` para solicitar uma an&aacute;lise por IA via Netlify Function.

## Requisitos do Supabase para o dashboard

Para o dashboard funcionar de forma privada:

- a autentica&ccedil;&atilde;o por e-mail e senha deve estar habilitada no Supabase Auth
- a tabela `diagnosticos` precisa ter policy de `SELECT` liberada apenas para usu&aacute;rios autenticados
- a coluna `criado_em` deve existir para ordena&ccedil;&atilde;o decrescente

Exemplo de comportamento esperado da policy:

- usu&aacute;rio an&ocirc;nimo: n&atilde;o pode ler
- usu&aacute;rio autenticado: pode ler

### Liberar DELETE para usu&aacute;rios autenticados

Use o SQL abaixo no Supabase para permitir exclus&atilde;o apenas para usu&aacute;rios autenticados:

```sql
drop policy if exists "permitir_delete_autenticado" on public.diagnosticos;

create policy "permitir_delete_autenticado"
on public.diagnosticos
for delete
to authenticated
using (true);

grant delete on table public.diagnosticos to authenticated;
```

## Integra&ccedil;&atilde;o com IA no Netlify

O dashboard chama a fun&ccedil;&atilde;o `/.netlify/functions/analisar-diagnostico`, que usa a OpenAI no backend. A chave da OpenAI n&atilde;o fica no frontend.

### Configurar no Netlify

1. No projeto do Netlify, crie a vari&aacute;vel de ambiente `OPENAI_API_KEY`.
2. Fa&ccedil;a o deploy do site com a pasta `netlify/functions`.
3. Abra o dashboard pela URL publicada no Netlify ou rode localmente com `netlify dev`.

### Como testar o bot&atilde;o de an&aacute;lise

1. Acesse `dashboard.html` pelo ambiente do Netlify.
2. Fa&ccedil;a login no dashboard com um usu&aacute;rio autorizado do Supabase Auth.
3. Abra um diagn&oacute;stico e clique em `Gerar an&aacute;lise r&aacute;pida`.
4. O painel vai mostrar o estado `Gerando an&aacute;lise...`.
5. Quando a fun&ccedil;&atilde;o responder, o dashboard renderiza a an&aacute;lise da IA.
6. Se a IA falhar, o dashboard usa automaticamente a an&aacute;lise local como fallback.

### PDF

- Se existir an&aacute;lise por IA gerada para aquele diagn&oacute;stico, o PDF usa a an&aacute;lise por IA.
- Se ainda n&atilde;o houver resposta da IA, o PDF usa a an&aacute;lise local do dashboard.
