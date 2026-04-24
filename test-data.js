const SUPABASE_URL = "https://apqevpormksrrdcpdwgt.supabase.co";
const SUPABASE_KEY = "sb_publishable_nZRdfhGhLtsqMPMjoot4_A_2WbTcESy";

function buildPayload(config) {
  const canais = [...config.salesChannels];
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
    salesChannels: canais,
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
    canais: JSON.stringify(canais),
    respostas
  };
}

const TEST_DIAGNOSTICS = [
  {
    id: "cenario-1-desorganizada",
    label: "Cenario 1 - Empresa desorganizada",
    description: "Comunicacao fraca, Instagram sem estrategia, WhatsApp improvisado e vendas sem processo.",
    payload: buildPayload({
      name: "Mariana Lopes",
      company: "Atelie Essencia Natural",
      email: "mariana@essencianatural.com.br",
      phoneWhatsApp: "(11) 98765-1200",
      cityState: "Guarulhos - SP",
      mainSocialNetworkName: "Instagram",
      mainSocialNetworkLink: "https://instagram.com/atelieessencianatural",
      website: "",
      role: "Proprietaria",
      salesTeamSize: 1,
      businessType: "Marca pessoal",
      topProducts: "Velas aromaticas artesanais, difusores de ambiente e kits para presente.",
      salesChannels: ["Instagram", "WhatsApp", "Indicacao"],
      instagramObjective: ["Presenca"],
      instagramProfileClarity: "Nao",
      instagramPostingFrequency: "Nao publica",
      instagramContentPattern: "Nao",
      instagramResultsTracking: "Nao mede",
      instagramClientInitiates: "Nao",
      whatsappUse: "Ambos",
      whatsappProcess: "Nao",
      whatsappFirstContact: "Improvisado",
      whatsappResponseTime: "Demorado",
      whatsappConversionStrategy: "Nao usa",
      whatsappLosesClients: "Sim",
      referralImportance: "Complementar",
      referralEncourages: "Nao",
      referralProcess: "Nao",
      firstContactType: "Sem padrao",
      automationUsage: "Nao utiliza",
      afterContactRouting: "Sem organizacao",
      serviceProcess: "Nao",
      serviceScript: "Nao",
      structuredPresentation: "Nao",
      followUpProcess: "Nao",
      lostSalesByService: "Sim",
      serviceMainProblem: "Cada atendimento acontece de um jeito, sem resposta padrao e com demora para retornar.",
      salesDifficulty: "O cliente demonstra interesse, mas a conversa se perde porque nao existe abordagem, proposta ou acompanhamento.",
      mainProblem: "Falta de organizacao",
      improvementPriority: "Organizar processo comercial, respostas de atendimento e rotina minima de conteudo.",
      additionalNotes: "A empresa depende muito da memoria da proprietaria e nao acompanha mensagens perdidas."
    })
  },
  {
    id: "cenario-2-evolucao",
    label: "Cenario 2 - Empresa em evolucao",
    description: "Comunicacao razoavel, Instagram com frequencia parcial, WhatsApp parcialmente organizado e automacoes simples.",
    payload: buildPayload({
      name: "Carlos Menezes",
      company: "Studio Vitta Moveis Planejados",
      email: "carlos@studiovitta.com.br",
      phoneWhatsApp: "(31) 99811-4432",
      cityState: "Belo Horizonte - MG",
      mainSocialNetworkName: "Instagram",
      mainSocialNetworkLink: "https://instagram.com/studiovittamoveis",
      website: "https://studiovitta.com.br",
      role: "Gestor comercial",
      salesTeamSize: 3,
      businessType: "Empresa",
      topProducts: "Projetos de cozinhas planejadas, dormitorios sob medida e paineis para sala.",
      salesChannels: ["Instagram", "WhatsApp", "Google / Pesquisa", "Site proprio"],
      instagramObjective: ["Leads", "Autoridade"],
      instagramProfileClarity: "Parcialmente",
      instagramPostingFrequency: "Semanal",
      instagramContentPattern: "Sim",
      instagramResultsTracking: "Mensagens",
      instagramClientInitiates: "Sim",
      whatsappUse: "Ambos",
      whatsappProcess: "Parcialmente",
      whatsappFirstContact: "Padronizado",
      whatsappResponseTime: "Ate 1h",
      whatsappConversionStrategy: "Apresentacao",
      whatsappLosesClients: "Nao sabe",
      googleSearchPresence: "Sim",
      googleBusinessProfile: "Sim",
      googleReceivesContacts: "Sim",
      googleHasReviews: "Sim",
      websiteOutcome: "Contatos",
      websiteClearInformation: "Parcialmente",
      firstContactType: "Depende do canal",
      automationUsage: "Automacao simples",
      automationType: "Mensagem automatica de boas-vindas no WhatsApp e captura de leads pelo site.",
      afterContactRouting: "Distribuido",
      serviceProcess: "Parcialmente",
      serviceScript: "Parcialmente",
      structuredPresentation: "Parcialmente",
      followUpProcess: "As vezes",
      lostSalesByService: "Nao sabe",
      serviceMainProblem: "O atendimento muda conforme quem responde e a apresentacao comercial nem sempre segue o mesmo padrao.",
      salesDifficulty: "Existe volume de contatos, mas muitos nao avancam para visita tecnica ou proposta final.",
      mainProblem: "Falta de comunicacao clara",
      improvementPriority: "Melhorar conversao dos leads e padronizar atendimento do primeiro contato ate a proposta.",
      additionalNotes: "A empresa sente que tem potencial maior de fechamento se o time responder com mais consistencia."
    })
  },
  {
    id: "cenario-3-estruturada",
    label: "Cenario 3 - Empresa estruturada",
    description: "Comunicacao forte, Instagram estrategico, WhatsApp com processo definido e operacao organizada para escalar.",
    payload: buildPayload({
      name: "Fernanda Ribeiro",
      company: "Clinica Integrar Saude e Performance",
      email: "fernanda@integrarsaude.com.br",
      phoneWhatsApp: "(21) 97654-3321",
      cityState: "Rio de Janeiro - RJ",
      mainSocialNetworkName: "Instagram",
      mainSocialNetworkLink: "https://instagram.com/clinicaintegrarsaude",
      website: "https://integrarsaude.com.br",
      role: "Diretora de operacoes",
      salesTeamSize: 6,
      businessType: "Empresa",
      topProducts: "Programas de acompanhamento nutricional, consultas premium e planos corporativos de bem-estar.",
      salesChannels: ["Instagram", "WhatsApp", "Google / Pesquisa", "Indicacao", "Site proprio"],
      instagramObjective: ["Vendas", "Leads", "Autoridade"],
      instagramProfileClarity: "Sim",
      instagramPostingFrequency: "Diario",
      instagramContentPattern: "Sim",
      instagramResultsTracking: "Vendas",
      instagramClientInitiates: "Sim",
      whatsappUse: "Ambos",
      whatsappProcess: "Sim",
      whatsappFirstContact: "Padronizado",
      whatsappResponseTime: "Imediato",
      whatsappConversionStrategy: "Roteiro",
      whatsappLosesClients: "Nao",
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
      automationType: "Chatbot para triagem inicial, qualificacao e distribuicao automatica para a equipe comercial.",
      afterContactRouting: "Distribuido",
      serviceProcess: "Sim",
      serviceScript: "Sim",
      structuredPresentation: "Sim",
      followUpProcess: "Sim",
      lostSalesByService: "Nao",
      serviceMainProblem: "O desafio atual nao esta no atendimento basico, mas em manter a mesma experiencia com aumento do volume.",
      salesDifficulty: "Escalar a operacao comercial sem perder velocidade, personalizacao e taxa de conversao.",
      mainProblem: "Outro",
      mainProblemOtherDescription: "Escalar mantendo qualidade operacional e proximidade no atendimento.",
      improvementPriority: "Refinar indicadores por canal, automatizar etapas repetitivas e fortalecer treinamento da equipe.",
      additionalNotes: "A clinica ja mede resultados por canal e busca previsibilidade maior para crescer com seguranca."
    })
  }
];

async function insertTestDiagnostic(payload) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/diagnosticos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let details = `HTTP ${response.status}`;

    try {
      const body = await response.json();
      details = body.message || body.error_description || body.details || details;
    } catch (error) {
      // Mantem o fallback de status se a API nao retornar JSON.
    }

    throw new Error(details);
  }

  return response;
}

async function insertAllTestDiagnostics() {
  const results = [];

  for (const scenario of TEST_DIAGNOSTICS) {
    const response = await insertTestDiagnostic(scenario.payload);
    results.push({
      id: scenario.id,
      status: response.status
    });
  }

  return results;
}

const diagnosticTestData = {
  SUPABASE_URL,
  TEST_DIAGNOSTICS,
  buildPayload,
  insertTestDiagnostic,
  insertAllTestDiagnostics
};

if (typeof window !== "undefined") {
  window.diagnosticTestData = diagnosticTestData;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = diagnosticTestData;
}
