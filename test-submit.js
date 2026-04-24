const SUPABASE_URL = "https://apqevpormksrrdcpdwgt.supabase.co";
const SUPABASE_KEY = "sb_publishable_nZRdfhGhLtsqMPMjoot4_A_2WbTcESy";

function criarPayload(config) {
  const canaisSelecionados = [...config.salesChannels];

  const respostas = {
    name: config.name,
    company: config.company,
    email: config.email,
    phoneWhatsApp: config.phoneWhatsApp,
    cityState: config.cityState,
    mainSocialNetworkName: config.mainSocialNetworkName,
    mainSocialNetworkLink: config.mainSocialNetworkLink,
    website: config.website || "",
    role: config.role,
    salesTeamSize: String(config.salesTeamSize),
    businessType: config.businessType,
    topProducts: config.topProducts,
    salesChannels: canaisSelecionados,
    instagramObjective: config.instagramObjective || [],
    instagramProfileClarity: config.instagramProfileClarity || "",
    instagramPostingFrequency: config.instagramPostingFrequency || "",
    instagramContentPattern: config.instagramContentPattern || "",
    instagramResultsTracking: config.instagramResultsTracking || "",
    instagramClientInitiates: config.instagramClientInitiates || "",
    whatsappUse: config.whatsappUse || "",
    whatsappProcess: config.whatsappProcess || "",
    whatsappFirstContact: config.whatsappFirstContact || "",
    whatsappResponseTime: config.whatsappResponseTime || "",
    whatsappConversionStrategy: config.whatsappConversionStrategy || "",
    whatsappLosesClients: config.whatsappLosesClients || "",
    facebookResults: config.facebookResults || "",
    facebookPostingFrequency: config.facebookPostingFrequency || "",
    facebookAdsUsage: config.facebookAdsUsage || "",
    tiktokUse: config.tiktokUse || "",
    tiktokFrequency: config.tiktokFrequency || "",
    tiktokHighReach: config.tiktokHighReach || "",
    tiktokDirectsChannel: config.tiktokDirectsChannel || "",
    googleSearchPresence: config.googleSearchPresence || "",
    googleBusinessProfile: config.googleBusinessProfile || "",
    googleReceivesContacts: config.googleReceivesContacts || "",
    googleHasReviews: config.googleHasReviews || "",
    referralImportance: config.referralImportance || "",
    referralEncourages: config.referralEncourages || "",
    referralProcess: config.referralProcess || "",
    storeFlow: config.storeFlow || "",
    storeProductClarity: config.storeProductClarity || "",
    storeVisualOrganization: config.storeVisualOrganization || "",
    websiteOutcome: config.websiteOutcome || "",
    websiteClearInformation: config.websiteClearInformation || "",
    marketplacePlatforms: config.marketplacePlatforms || "",
    marketplaceSalesFrequency: config.marketplaceSalesFrequency || "",
    marketplaceStrategy: config.marketplaceStrategy || "",
    otherChannelName: config.otherChannelName || "",
    otherChannelHowWorks: config.otherChannelHowWorks || "",
    otherChannelDifficulty: config.otherChannelDifficulty || "",
    firstContactType: config.firstContactType,
    automationUsage: config.automationUsage,
    automationType: config.automationType || "",
    afterContactRouting: config.afterContactRouting,
    serviceProcess: config.serviceProcess,
    serviceScript: config.serviceScript,
    structuredPresentation: config.structuredPresentation,
    followUpProcess: config.followUpProcess,
    lostSalesByService: config.lostSalesByService,
    serviceMainProblem: config.serviceMainProblem,
    salesDifficulty: config.salesDifficulty,
    mainProblem: config.mainProblem,
    mainProblemOtherDescription: config.mainProblemOtherDescription || "",
    improvementPriority: config.improvementPriority,
    additionalNotes: config.additionalNotes || ""
  };

  return {
    nome_responsavel: config.name,
    nome_empresa: config.company,
    email: config.email,
    telefone: config.phoneWhatsApp,
    cidade_estado: config.cityState,
    rede_social: config.mainSocialNetworkName,
    link_rede: config.mainSocialNetworkLink,
    site: config.website || null,
    cargo: config.role,
    equipe_vendas: Number(config.salesTeamSize),
    produtos: config.topProducts,
    canais: JSON.stringify(canaisSelecionados),
    respostas
  };
}

const diagnosticosTeste = [
  {
    id: "cenario-1-empresa-desorganizada",
    titulo: "Cenário 1 — Empresa desorganizada",
    payload: criarPayload({
      name: "João Carlos Souza",
      company: "Oficina Mecânica Giro Certo",
      email: "joao@girocerto.com.br",
      phoneWhatsApp: "(11) 97452-1108",
      cityState: "Osasco, SP",
      mainSocialNetworkName: "Instagram",
      mainSocialNetworkLink: "https://instagram.com/oficinagirocerto",
      website: "",
      role: "Proprietário",
      salesTeamSize: 2,
      businessType: "Empresa",
      topProducts: "Troca de óleo, revisão básica, alinhamento, balanceamento e pequenos reparos mecânicos.",
      salesChannels: ["Instagram", "WhatsApp", "Loja física"],
      instagramObjective: ["Presença"],
      instagramProfileClarity: "Não",
      instagramPostingFrequency: "Não publica",
      instagramContentPattern: "Não",
      instagramResultsTracking: "Não mede",
      instagramClientInitiates: "Não",
      whatsappUse: "Ambos",
      whatsappProcess: "Não",
      whatsappFirstContact: "Improvisado",
      whatsappResponseTime: "Demorado",
      whatsappConversionStrategy: "Não usa",
      whatsappLosesClients: "Sim",
      storeFlow: "Médio",
      storeProductClarity: "Não",
      storeVisualOrganization: "Não",
      firstContactType: "Sem padrão",
      automationUsage: "Não utiliza",
      automationType: "",
      afterContactRouting: "Sem organização",
      serviceProcess: "Não",
      serviceScript: "Não",
      structuredPresentation: "Não",
      followUpProcess: "Não",
      lostSalesByService: "Sim",
      serviceMainProblem: "Os clientes chamam em horários diferentes, ninguém responde com padrão e muitos orçamentos ficam sem retorno.",
      salesDifficulty: "As vendas dependem da conversa do momento, sem orçamento padronizado, sem acompanhamento e sem histórico organizado.",
      mainProblem: "Falta de organização",
      mainProblemOtherDescription: "",
      improvementPriority: "Organizar o atendimento no WhatsApp, registrar orçamentos e criar uma rotina mínima de comunicação.",
      additionalNotes: "A oficina depende muito do dono para responder tudo e não acompanha quantos clientes foram perdidos."
    })
  },
  {
    id: "cenario-2-empresa-em-evolucao",
    titulo: "Cenário 2 — Empresa em evolução",
    payload: criarPayload({
      name: "Patrícia Almeida",
      company: "Loja Casa Bela Decor",
      email: "patricia@casabeladecor.com.br",
      phoneWhatsApp: "(31) 98841-5520",
      cityState: "Belo Horizonte, MG",
      mainSocialNetworkName: "Instagram",
      mainSocialNetworkLink: "https://instagram.com/casabeladecor",
      website: "",
      role: "Gestora comercial",
      salesTeamSize: 3,
      businessType: "Empresa",
      topProducts: "Almofadas decorativas, mantas, vasos, luminárias e kits para sala e quarto.",
      salesChannels: ["Instagram", "WhatsApp", "Loja física", "Google / Pesquisa"],
      instagramObjective: ["Vendas", "Leads"],
      instagramProfileClarity: "Parcialmente",
      instagramPostingFrequency: "Semanal",
      instagramContentPattern: "Sim",
      instagramResultsTracking: "Mensagens",
      instagramClientInitiates: "Sim",
      whatsappUse: "Ambos",
      whatsappProcess: "Parcialmente",
      whatsappFirstContact: "Padronizado",
      whatsappResponseTime: "Até 1h",
      whatsappConversionStrategy: "Apresentação",
      whatsappLosesClients: "Não sabe",
      googleSearchPresence: "Sim",
      googleBusinessProfile: "Sim",
      googleReceivesContacts: "Sim",
      googleHasReviews: "Não",
      storeFlow: "Alto",
      storeProductClarity: "Sim",
      storeVisualOrganization: "Parcialmente",
      firstContactType: "Depende do canal",
      automationUsage: "Automação simples",
      automationType: "Mensagem automática de boas-vindas no WhatsApp e etiqueta manual para leads mais quentes.",
      afterContactRouting: "Distribuído",
      serviceProcess: "Parcialmente",
      serviceScript: "Parcialmente",
      structuredPresentation: "Parcialmente",
      followUpProcess: "Às vezes",
      lostSalesByService: "Não sabe",
      serviceMainProblem: "O time atende bem, mas cada pessoa conduz a venda de um jeito e isso afeta a conversão.",
      salesDifficulty: "Existe interesse nos produtos, mas a taxa de fechamento ainda oscila porque falta consistência no atendimento e no follow-up.",
      mainProblem: "Falta de comunicação clara",
      mainProblemOtherDescription: "",
      improvementPriority: "Melhorar a conversão dos contatos do Instagram e padronizar o atendimento do WhatsApp.",
      additionalNotes: "A loja já tem movimento e conteúdo frequente, mas quer transformar melhor os contatos em vendas."
    })
  },
  {
    id: "cenario-3-empresa-estruturada",
    titulo: "Cenário 3 — Empresa estruturada",
    payload: criarPayload({
      name: "Marcelo Nogueira",
      company: "Clínica Evoluir Performance",
      email: "marcelo@evoluirperformance.com.br",
      phoneWhatsApp: "(21) 97770-4411",
      cityState: "Rio de Janeiro, RJ",
      mainSocialNetworkName: "Instagram",
      mainSocialNetworkLink: "https://instagram.com/clinicaevoluirperformance",
      website: "https://evoluirperformance.com.br",
      role: "Diretor de operações",
      salesTeamSize: 7,
      businessType: "Empresa",
      topProducts: "Programas de acompanhamento em saúde, consultas premium, planos corporativos e jornadas de alta performance.",
      salesChannels: ["Instagram", "WhatsApp", "Google / Pesquisa", "Site próprio", "Indicação"],
      instagramObjective: ["Vendas", "Leads", "Autoridade"],
      instagramProfileClarity: "Sim",
      instagramPostingFrequency: "Diário",
      instagramContentPattern: "Sim",
      instagramResultsTracking: "Vendas",
      instagramClientInitiates: "Sim",
      whatsappUse: "Ambos",
      whatsappProcess: "Sim",
      whatsappFirstContact: "Padronizado",
      whatsappResponseTime: "Imediato",
      whatsappConversionStrategy: "Roteiro",
      whatsappLosesClients: "Não",
      googleSearchPresence: "Sim",
      googleBusinessProfile: "Sim",
      googleReceivesContacts: "Sim",
      googleHasReviews: "Sim",
      referralImportance: "Principal",
      referralEncourages: "Sim",
      referralProcess: "Sim",
      websiteOutcome: "Vendas",
      websiteClearInformation: "Sim",
      firstContactType: "Depende do canal",
      automationUsage: "Chatbot",
      automationType: "Chatbot para triagem, qualificação, agendamento inicial e distribuição automática para o consultor certo.",
      afterContactRouting: "Distribuído",
      serviceProcess: "Sim",
      serviceScript: "Sim",
      structuredPresentation: "Sim",
      followUpProcess: "Sim",
      lostSalesByService: "Não",
      serviceMainProblem: "O desafio atual é ganhar escala sem perder a qualidade da experiência em todos os canais.",
      salesDifficulty: "O foco não é falta de processo, mas manter previsibilidade e desempenho comercial com aumento de volume.",
      mainProblem: "Outro",
      mainProblemOtherDescription: "Escalar operação e manter qualidade de atendimento, conversão e experiência da marca.",
      improvementPriority: "Aprimorar a gestão por indicadores, automatizar mais etapas repetitivas e preparar a equipe para crescimento.",
      additionalNotes: "A clínica já mede resultados, tem processo definido e busca eficiência maior para crescer sem perder padrão."
    })
  }
];

async function enviarDiagnostico(dados) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/diagnosticos`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  if (!response.ok) {
    let details = `HTTP ${response.status}`;

    try {
      const payload = await response.json();
      details = payload.message || payload.error_description || payload.details || details;
    } catch (error) {
      // Mantém o fallback de status quando a API não retorna JSON.
    }

    throw new Error(details);
  }

  return response;
}

async function rodarTestes() {
  console.log("Iniciando envio de diagnósticos de teste...");
  const resultados = [];
  let sucesso = 0;
  let falhas = 0;

  for (const diagnostico of diagnosticosTeste) {
    try {
      const response = await enviarDiagnostico(diagnostico.payload);
      sucesso += 1;
      resultados.push({
        id: diagnostico.id,
        empresa: diagnostico.payload.nome_empresa,
        status: response.status,
        sucesso: true
      });

      console.log(`Sucesso: ${diagnostico.titulo}`, {
        status: response.status,
        empresa: diagnostico.payload.nome_empresa
      });
    } catch (error) {
      falhas += 1;
      resultados.push({
        id: diagnostico.id,
        empresa: diagnostico.payload.nome_empresa,
        sucesso: false,
        erro: error instanceof Error ? error.message : String(error)
      });

      console.error(`Erro ao enviar ${diagnostico.titulo}`, {
        empresa: diagnostico.payload.nome_empresa,
        erro: error instanceof Error ? error.message : error
      });
    }
  }

  console.log("Execução de testes concluída.");
  return {
    total: diagnosticosTeste.length,
    sucesso,
    falhas,
    resultados
  };
}

const diagnosticSubmitTest = {
  SUPABASE_URL,
  diagnosticosTeste,
  criarPayload,
  enviarDiagnostico,
  rodarTestes
};

if (typeof window !== "undefined") {
  window.diagnosticSubmitTest = diagnosticSubmitTest;
  window.rodarTestes = rodarTestes;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = diagnosticSubmitTest;
}
