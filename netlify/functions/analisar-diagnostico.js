const OPENAI_API_URL = "https://api.openai.com/v1/responses";

const ANALYSIS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "resumo_executivo",
    "nivel_maturidade_digital",
    "pontos_fortes",
    "gargalos",
    "prioridades",
    "ideias_de_melhoria",
    "plano_acao_7_dias",
    "plano_acao_30_dias",
    "mensagem_final_para_empresa"
  ],
  properties: {
    resumo_executivo: {
      type: "string"
    },
    nivel_maturidade_digital: {
      type: "object",
      additionalProperties: false,
      required: ["classificacao", "justificativa"],
      properties: {
        classificacao: {
          type: "string",
          enum: ["Baixo", "Intermediário", "Estruturado"]
        },
        justificativa: {
          type: "string"
        }
      }
    },
    pontos_fortes: {
      type: "array",
      items: {
        type: "string"
      }
    },
    gargalos: {
      type: "array",
      items: {
        type: "string"
      }
    },
    prioridades: {
      type: "array",
      items: {
        type: "string"
      }
    },
    ideias_de_melhoria: {
      type: "array",
      items: {
        type: "string"
      }
    },
    plano_acao_7_dias: {
      type: "array",
      items: {
        type: "string"
      }
    },
    plano_acao_30_dias: {
      type: "array",
      items: {
        type: "string"
      }
    },
    mensagem_final_para_empresa: {
      type: "string"
    }
  }
};

const ANALYSIS_INSTRUCTIONS = `Aja como um consultor sênior especialista em comunicação digital, vendas, atendimento, cultura organizacional e automação de processos para pequenas e médias empresas brasileiras.

Seu objetivo é analisar um diagnóstico empresarial real e gerar uma análise estratégica, clara, prática e orientada a resultados.

Regras obrigatórias:
- Utilize exclusivamente as informações fornecidas no diagnóstico.
- Não invente dados ou suposições fora do que foi informado.
- Se alguma informação estiver ausente, sinalize como "não informado" e adapte a análise.
- Escreva em português do Brasil, com linguagem profissional, clara e direta.
- Evite termos genéricos e clichês.
- Priorize clareza, objetividade e aplicabilidade prática.

Critérios de análise:
- Clareza de comunicação
- Estrutura de atendimento
- Eficiência do processo de vendas
- Uso de canais digitais
- Nível de organização interna
- Maturidade digital do negócio
- Uso (ou ausência) de automação

Gere a resposta considerando:

1. RESUMO EXECUTIVO
Resumo claro da empresa, modelo de operação e situação atual.

2. NÍVEL DE MATURIDADE
Classifique como:
- Baixo
- Intermediário
- Estruturado

Justifique a classificação com base nos dados.

3. PRINCIPAIS PONTOS FORTES
Liste os pontos positivos que podem ser explorados para crescimento.

4. PRINCIPAIS GARGALOS
Liste os problemas que impactam diretamente vendas, atendimento ou crescimento.

5. DIAGNÓSTICO ESTRATÉGICO
Explique de forma direta onde a empresa está falhando e por quê.

6. PRIORIDADES IMEDIATAS (CURTO PRAZO)
Liste até 5 ações prioritárias que geram impacto rápido.

7. PLANO DE AÇÃO — 7 DIAS
Ações simples e práticas para iniciar imediatamente.

8. PLANO DE AÇÃO — 30 DIAS
Ações estruturais para melhorar o negócio de forma consistente.

9. OPORTUNIDADES DE CRESCIMENTO
Aponte onde a empresa pode crescer com mais facilidade.

10. RECOMENDAÇÕES PRÁTICAS
Sugestões claras, diretas e aplicáveis.

11. CONCLUSÃO
Resumo final com direcionamento estratégico.

IMPORTANTE:
- Seja direto, sem enrolação.
- Foque em soluções reais, não teóricas.
- Evite respostas genéricas.
- Entregue valor como um consultor experiente.

Retorne exclusivamente JSON válido aderente ao schema solicitado.`;

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  };
}

function extractOutputText(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  if (!Array.isArray(payload?.output)) {
    return "";
  }

  for (const item of payload.output) {
    if (!Array.isArray(item?.content)) {
      continue;
    }

    for (const contentItem of item.content) {
      if (contentItem?.type !== "output_text" && contentItem?.type !== "text") {
        continue;
      }

      if (typeof contentItem.text === "string" && contentItem.text.trim()) {
        return contentItem.text;
      }

      if (typeof contentItem.text?.value === "string" && contentItem.text.value.trim()) {
        return contentItem.text.value;
      }
    }
  }

  return "";
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, {
      error: "Método não permitido. Use POST."
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return jsonResponse(500, {
      error: "A variável OPENAI_API_KEY não está configurada no Netlify."
    });
  }

  let body = null;

  try {
    body = JSON.parse(event.body || "{}");
  } catch (error) {
    return jsonResponse(400, {
      error: "O corpo da requisição precisa ser um JSON válido."
    });
  }

  const diagnostic = body?.diagnostic;

  if (!diagnostic || typeof diagnostic !== "object") {
    return jsonResponse(400, {
      error: "Nenhum diagnóstico válido foi enviado para análise."
    });
  }

  try {
    const openAiResponse = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        instructions: ANALYSIS_INSTRUCTIONS,
        input: `Analise o diagnóstico empresarial abaixo e responda apenas com JSON estruturado.\n\nDiagnóstico:\n${JSON.stringify(diagnostic)}`,
        max_output_tokens: 2500,
        text: {
          format: {
            type: "json_schema",
            name: "analise_diagnostico_empresa",
            strict: true,
            schema: ANALYSIS_SCHEMA
          }
        }
      })
    });

    const openAiPayload = await openAiResponse.json();

    if (!openAiResponse.ok) {
      const message = openAiPayload?.error?.message || "Falha ao gerar análise com a OpenAI.";
      return jsonResponse(openAiResponse.status, {
        error: message
      });
    }

    const outputText = extractOutputText(openAiPayload);

    if (!outputText) {
      return jsonResponse(502, {
        error: "A OpenAI não retornou conteúdo de análise utilizável."
      });
    }

    let analysis = null;

    try {
      analysis = JSON.parse(outputText);
    } catch (error) {
      return jsonResponse(502, {
        error: "A OpenAI retornou um conteúdo inválido para análise."
      });
    }

    return jsonResponse(200, {
      analysis
    });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : "Erro interno ao gerar a análise."
    });
  }
};
