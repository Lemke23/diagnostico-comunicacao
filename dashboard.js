import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://apqevpormksrrdcpdwgt.supabase.co";
const SUPABASE_KEY = "sb_publishable_nZRdfhGhLtsqMPMjoot4_A_2WbTcESy";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const authCard = document.getElementById("auth-card");
const dashboardShell = document.getElementById("dashboard-shell");
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");
const authFeedback = document.getElementById("auth-feedback");
const dashboardFeedback = document.getElementById("dashboard-feedback");
const diagnosticsList = document.getElementById("diagnostics-list");
const resultsSummary = document.getElementById("results-summary");
const searchCompanyInput = document.getElementById("search-company");
const refreshButton = document.getElementById("refresh-button");
const logoutButton = document.getElementById("logout-button");
const sessionEmail = document.getElementById("session-email");

let diagnostics = [];

const LABELS = {
  nome_responsavel: "Nome do respons\u00e1vel",
  nome_empresa: "Nome da empresa",
  email: "E-mail",
  telefone: "Telefone / WhatsApp",
  cidade_estado: "Cidade e Estado",
  rede_social: "Rede social principal",
  link_rede: "Link da rede social",
  site: "Site da empresa",
  cargo: "Cargo / fun\u00e7\u00e3o",
  equipe_vendas: "Equipe de vendas",
  businessType: "Modelo do neg\u00f3cio",
  produtos: "Produtos mais vendidos",
  canais: "Canais de venda",
  topProducts: "Produtos mais vendidos",
  salesChannels: "Canais que geram vendas",
  facebookResults: "Facebook gera resultado",
  facebookPostingFrequency: "Facebook com frequ\u00eancia",
  facebookAdsUsage: "Uso de an\u00fancios no Facebook",
  tiktokUse: "Uso do TikTok",
  tiktokFrequency: "Frequ\u00eancia no TikTok",
  tiktokHighReach: "TikTok com alcance alto",
  tiktokDirectsChannel: "TikTok direciona para outro canal",
  googleSearchPresence: "Aparece em pesquisas",
  googleBusinessProfile: "Google Meu Neg\u00f3cio",
  googleReceivesContacts: "Recebe contatos pelo Google",
  googleHasReviews: "Possui avalia\u00e7\u00f5es",
  referralImportance: "Import\u00e2ncia da indica\u00e7\u00e3o",
  referralEncourages: "Incentiva indica\u00e7\u00f5es",
  referralProcess: "Processo de indica\u00e7\u00e3o",
  storeFlow: "Fluxo da loja f\u00edsica",
  storeProductClarity: "Cliente entende o produto na loja",
  storeVisualOrganization: "Organiza\u00e7\u00e3o visual da loja",
  websiteOutcome: "Resultado do site",
  websiteClearInformation: "Informa\u00e7\u00f5es claras no site",
  marketplacePlatforms: "Marketplaces usados",
  marketplaceSalesFrequency: "Frequ\u00eancia de vendas no marketplace",
  marketplaceStrategy: "Estrat\u00e9gia no marketplace",
  otherChannelName: "Outro canal",
  otherChannelHowWorks: "Como o outro canal funciona",
  otherChannelDifficulty: "Dificuldade do outro canal",
  instagramObjective: "Objetivos do Instagram",
  instagramProfileClarity: "Clareza do perfil no Instagram",
  instagramPostingFrequency: "Frequ\u00eancia de postagem no Instagram",
  instagramContentPattern: "Padr\u00e3o de conte\u00fado no Instagram",
  instagramResultsTracking: "Medi\u00e7\u00e3o de resultados no Instagram",
  instagramClientInitiates: "Cliente inicia contato no Instagram",
  whatsappUse: "Uso do WhatsApp",
  whatsappProcess: "Processo no WhatsApp",
  whatsappFirstContact: "Primeiro contato no WhatsApp",
  whatsappResponseTime: "Tempo de resposta no WhatsApp",
  whatsappConversionStrategy: "Estrat\u00e9gia de convers\u00e3o no WhatsApp",
  whatsappLosesClients: "Perde clientes ap\u00f3s contato",
  firstContactType: "Primeiro contato do cliente",
  automationUsage: "Uso de automa\u00e7\u00e3o",
  automationType: "Tipo de automa\u00e7\u00e3o",
  afterContactRouting: "Ap\u00f3s o contato, atendimento vai para",
  serviceProcess: "Existe processo definido",
  serviceScript: "Existe roteiro de atendimento",
  structuredPresentation: "Cliente recebe apresenta\u00e7\u00e3o estruturada",
  followUpProcess: "Existe acompanhamento p\u00f3s-contato",
  lostSalesByService: "Perdeu vendas por falha no atendimento",
  serviceMainProblem: "Maior problema no atendimento",
  salesDifficulty: "Dificuldade para fechar venda",
  mainProblem: "Maior problema do neg\u00f3cio",
  mainProblemOtherDescription: "Descri\u00e7\u00e3o do principal problema",
  improvementPriority: "Melhoria priorit\u00e1ria",
  additionalNotes: "Observa\u00e7\u00f5es adicionais"
};

const SECTION_FIELDS = [
  {
    title: "Identifica\u00e7\u00e3o",
    keys: [
      "nome_empresa",
      "nome_responsavel",
      "email",
      "telefone",
      "cidade_estado",
      "rede_social",
      "link_rede",
      "site",
      "cargo",
      "equipe_vendas",
      "businessType"
    ]
  },
  {
    title: "Canais digitais",
    keys: [
      "produtos",
      "canais",
      "salesChannels",
      "facebookResults",
      "facebookPostingFrequency",
      "facebookAdsUsage",
      "tiktokUse",
      "tiktokFrequency",
      "tiktokHighReach",
      "tiktokDirectsChannel",
      "googleSearchPresence",
      "googleBusinessProfile",
      "googleReceivesContacts",
      "googleHasReviews",
      "referralImportance",
      "referralEncourages",
      "referralProcess",
      "storeFlow",
      "storeProductClarity",
      "storeVisualOrganization",
      "websiteOutcome",
      "websiteClearInformation",
      "marketplacePlatforms",
      "marketplaceSalesFrequency",
      "marketplaceStrategy",
      "otherChannelName",
      "otherChannelHowWorks",
      "otherChannelDifficulty"
    ]
  },
  {
    title: "Instagram",
    keys: [
      "instagramObjective",
      "instagramProfileClarity",
      "instagramPostingFrequency",
      "instagramContentPattern",
      "instagramResultsTracking",
      "instagramClientInitiates"
    ]
  },
  {
    title: "WhatsApp",
    keys: [
      "whatsappUse",
      "whatsappProcess",
      "whatsappFirstContact",
      "whatsappResponseTime",
      "whatsappConversionStrategy",
      "whatsappLosesClients"
    ]
  },
  {
    title: "Automa\u00e7\u00e3o",
    keys: [
      "firstContactType",
      "automationUsage",
      "automationType",
      "afterContactRouting",
      "serviceProcess",
      "serviceScript",
      "structuredPresentation",
      "followUpProcess",
      "lostSalesByService",
      "serviceMainProblem"
    ]
  },
  {
    title: "Vendas e organiza\u00e7\u00e3o",
    keys: [
      "salesDifficulty",
      "mainProblem",
      "mainProblemOtherDescription",
      "improvementPriority",
      "additionalNotes"
    ]
  }
];

function setFeedback(element, message = "", type = "") {
  element.textContent = message;
  element.classList.remove("is-error", "is-success");

  if (type === "error") {
    element.classList.add("is-error");
  }

  if (type === "success") {
    element.classList.add("is-success");
  }
}

function formatDate(value) {
  if (!value) {
    return "Sem data";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date);
}

function parseJsonSafe(value) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  if (typeof value === "object") {
    return value;
  }

  return null;
}

function formatCanais(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = parseJsonSafe(value);
    if (Array.isArray(parsed)) {
      return parsed.join(", ");
    }
    return value;
  }

  return "N\u00e3o informado";
}

function formatRespostas(value) {
  if (!value) {
    return "{}";
  }

  const parsed = parseJsonSafe(value);
  if (parsed) {
    return JSON.stringify(parsed, null, 2);
  }

  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function getCreatedAt(diagnostic) {
  return diagnostic.criado_em || diagnostic.created_at || diagnostic.inserted_at || null;
}

function normalizeValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "N\u00e3o informado";
  }

  if (value === null || value === undefined) {
    return "N\u00e3o informado";
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return "N\u00e3o informado";
    }

    const parsed = parseJsonSafe(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.length > 0 ? parsed.join(", ") : "N\u00e3o informado";
    }

    return trimmed;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "boolean") {
    return value ? "Sim" : "N\u00e3o";
  }

  return JSON.stringify(value);
}

function getRespostaValue(source, key) {
  return normalizeValue(source[key]);
}

function createMetaItem(label, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "meta-item";

  const title = document.createElement("span");
  title.className = "meta-label";
  title.textContent = label;

  const content = document.createElement("span");
  content.className = "meta-value";
  content.textContent = value || "N\u00e3o informado";

  wrapper.append(title, content);
  return wrapper;
}

function createDetailRow(label, value) {
  const row = document.createElement("div");
  row.className = "detail-row";

  const title = document.createElement("span");
  title.className = "detail-label";
  title.textContent = label;

  const content = document.createElement("span");
  content.className = "detail-value";
  content.textContent = value;

  row.append(title, content);
  return row;
}

function buildStructuredSections(diagnostic) {
  const respostas = parseJsonSafe(diagnostic.respostas) || {};
  const mergedData = {
    ...respostas,
    nome_responsavel: diagnostic.nome_responsavel,
    nome_empresa: diagnostic.nome_empresa,
    email: diagnostic.email,
    telefone: diagnostic.telefone,
    cidade_estado: diagnostic.cidade_estado,
    rede_social: diagnostic.rede_social,
    link_rede: diagnostic.link_rede,
    site: diagnostic.site,
    cargo: diagnostic.cargo,
    equipe_vendas: diagnostic.equipe_vendas,
    produtos: diagnostic.produtos || respostas.topProducts,
    canais: parseJsonSafe(diagnostic.canais) || diagnostic.canais || respostas.salesChannels
  };

  return SECTION_FIELDS.map((section) => ({
    title: section.title,
    rows: section.keys.map((key) => ({
      label: LABELS[key] || key,
      value: getRespostaValue(mergedData, key)
    }))
  }));
}

function getNormalizedArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = parseJsonSafe(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean);
    }

    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

function generateAnalysisData(diagnostic) {
  const respostas = parseJsonSafe(diagnostic.respostas) || {};
  const company = diagnostic.nome_empresa || "Empresa n\u00e3o informada";
  const responsible = diagnostic.nome_responsavel || "respons\u00e1vel n\u00e3o informado";
  const city = diagnostic.cidade_estado || "local n\u00e3o informado";
  const products = diagnostic.produtos || respostas.topProducts || "produtos n\u00e3o informados";
  const channels = getNormalizedArray(diagnostic.canais || respostas.salesChannels);
  const businessType = respostas.businessType || "modelo n\u00e3o informado";
  const teamSize = diagnostic.equipe_vendas ? `${diagnostic.equipe_vendas} pessoa(s)` : "equipe n\u00e3o informada";

  const strengths = [];
  const bottlenecks = [];
  const suggestions = [];

  if (respostas.instagramProfileClarity === "Sim") {
    strengths.push("O perfil do Instagram parece comunicar com clareza o que a empresa oferece.");
  } else if (respostas.instagramProfileClarity === "N\u00e3o" || respostas.instagramProfileClarity === "Parcialmente") {
    bottlenecks.push("A clareza do perfil no Instagram pode estar dificultando a compreens\u00e3o da oferta.");
    suggestions.push("Revisar bio, destaques e proposta principal do Instagram para deixar a mensagem mais direta.");
  }

  if (respostas.instagramContentPattern === "Sim") {
    strengths.push("Existe padr\u00e3o de conte\u00fado no Instagram, o que favorece consist\u00eancia.");
  } else if (respostas.instagramContentPattern === "N\u00e3o") {
    bottlenecks.push("A falta de padr\u00e3o de conte\u00fado pode prejudicar const\u00e2ncia e percep\u00e7\u00e3o da marca.");
    suggestions.push("Criar uma linha editorial simples com temas, frequ\u00eancia e objetivos por post.");
  }

  if (respostas.serviceProcess === "Sim") {
    strengths.push("O atendimento j\u00e1 conta com um processo definido.");
  } else if (respostas.serviceProcess === "Parcialmente" || respostas.serviceProcess === "N\u00e3o") {
    bottlenecks.push("O processo de atendimento ainda n\u00e3o est\u00e1 totalmente estruturado.");
    suggestions.push("Mapear o fluxo desde o primeiro contato at\u00e9 o fechamento para reduzir perda de oportunidades.");
  }

  if (respostas.serviceScript === "Sim") {
    strengths.push("Existe roteiro de atendimento, o que tende a melhorar padroniza\u00e7\u00e3o e convers\u00e3o.");
  } else if (respostas.serviceScript === "Parcialmente" || respostas.serviceScript === "N\u00e3o") {
    bottlenecks.push("A aus\u00eancia de um roteiro de atendimento pode gerar respostas inconsistentes.");
    suggestions.push("Criar um roteiro base com abordagem, qualifica\u00e7\u00e3o, apresenta\u00e7\u00e3o e fechamento.");
  }

  if (respostas.followUpProcess === "Sim") {
    strengths.push("Existe acompanhamento p\u00f3s-contato, o que ajuda a recuperar oportunidades.");
  } else if (respostas.followUpProcess === "\u00c0s vezes" || respostas.followUpProcess === "N\u00e3o") {
    bottlenecks.push("O acompanhamento p\u00f3s-contato pode estar insuficiente ou irregular.");
    suggestions.push("Definir uma rotina de follow-up com prazo, canal e mensagem padr\u00e3o.");
  }

  if (respostas.lostSalesByService === "Sim") {
    bottlenecks.push("A empresa j\u00e1 percebe perda de vendas por falhas no atendimento.");
    suggestions.push("Priorizar melhorias no atendimento antes de aumentar investimento em capta\u00e7\u00e3o.");
  }

  if (respostas.mainProblem) {
    bottlenecks.push(`O principal problema percebido hoje \u00e9: ${respostas.mainProblem}.`);
  }

  if (respostas.mainProblem === "Outro" && respostas.mainProblemOtherDescription) {
    bottlenecks.push(`Detalhe do problema principal: ${respostas.mainProblemOtherDescription}.`);
  }

  if (respostas.serviceMainProblem && respostas.serviceMainProblem !== "N\u00e3o informado") {
    bottlenecks.push(`No atendimento, o maior problema relatado \u00e9: ${respostas.serviceMainProblem}.`);
  }

  if (respostas.salesDifficulty && respostas.salesDifficulty !== "N\u00e3o informado") {
    bottlenecks.push(`Na etapa comercial, a principal dificuldade apontada \u00e9: ${respostas.salesDifficulty}.`);
  }

  if (respostas.improvementPriority && respostas.improvementPriority !== "N\u00e3o informado") {
    suggestions.push(`Uma prioridade imediata sugerida pelo pr\u00f3prio diagn\u00f3stico \u00e9: ${respostas.improvementPriority}.`);
  }

  if (channels.length > 0 && channels.includes("Instagram")) {
    suggestions.push("Como o Instagram est\u00e1 entre os canais principais, vale alinhar conte\u00fado, mensagem e convers\u00e3o no direct.");
  }

  if (channels.length > 0 && channels.includes("WhatsApp")) {
    suggestions.push("Se o WhatsApp tem peso nas vendas, estruturar resposta inicial e follow-up tende a gerar ganho r\u00e1pido.");
  }

  if (strengths.length === 0) {
    strengths.push("O diagn\u00f3stico ainda n\u00e3o mostra processos muito consolidados, o que abre espa\u00e7o para estrutura\u00e7\u00e3o r\u00e1pida.");
  }

  if (bottlenecks.length === 0) {
    bottlenecks.push("N\u00e3o h\u00e1 gargalos cr\u00edticos evidentes no diagn\u00f3stico atual.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Consolidar indicadores b\u00e1sicos de canal, atendimento e vendas para orientar as pr\u00f3ximas decis\u00f5es.");
  }

  return {
    summary: `A empresa ${company}, com atua\u00e7\u00e3o em ${city}, foi representada por ${responsible}. O neg\u00f3cio se identifica como ${businessType.toLowerCase()} e relata equipe comercial com ${teamSize}. Os produtos ou servi\u00e7os mais vendidos s\u00e3o: ${products}.`,
    channels: channels.length > 0 ? channels : ["N\u00e3o informado"],
    strengths,
    bottlenecks,
    suggestions
  };
}

function createAnalysisBlock(analysisData) {
  const wrapper = document.createElement("div");
  wrapper.className = "analysis-block";

  const title = document.createElement("h4");
  title.textContent = "An\u00e1lise r\u00e1pida";

  const summary = document.createElement("p");
  summary.className = "analysis-summary";
  summary.textContent = analysisData.summary;

  const sections = [
    ["Principais canais de venda", analysisData.channels],
    ["Pontos fortes identificados", analysisData.strengths],
    ["Gargalos percebidos", analysisData.bottlenecks],
    ["Sugest\u00f5es iniciais de melhoria", analysisData.suggestions]
  ];

  wrapper.append(title, summary);

  sections.forEach(([sectionTitle, items]) => {
    const block = document.createElement("div");
    block.className = "analysis-section";

    const blockTitle = document.createElement("h5");
    blockTitle.textContent = sectionTitle;

    const list = document.createElement("ul");
    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.append(listItem);
    });

    block.append(blockTitle, list);
    wrapper.append(block);
  });

  return wrapper;
}

function buildPrintableReport(diagnostic, analysisData) {
  const sections = buildStructuredSections(diagnostic);
  const sectionsMarkup = sections.map((section) => `
    <section class="report-section">
      <h3>${section.title}</h3>
      <div class="report-grid">
        ${section.rows.map((row) => `
          <div class="report-item">
            <strong>${row.label}</strong>
            <span>${row.value}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `).join("");

  const analysisMarkup = `
    <section class="report-section report-section-highlight">
      <h3>An\u00e1lise r\u00e1pida</h3>
      <div class="report-summary-block">
        <h4>Resumo da empresa</h4>
        <p>${analysisData.summary}</p>
      </div>
      <h4>Principais canais de venda</h4>
      <ul>${analysisData.channels.map((item) => `<li>${item}</li>`).join("")}</ul>
      <h4>Pontos fortes identificados</h4>
      <ul>${analysisData.strengths.map((item) => `<li>${item}</li>`).join("")}</ul>
      <h4>Gargalos percebidos</h4>
      <ul>${analysisData.bottlenecks.map((item) => `<li>${item}</li>`).join("")}</ul>
      <h4>Sugest\u00f5es iniciais de melhoria</h4>
      <ul>${analysisData.suggestions.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;

  return `<!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Relat\u00f3rio - ${diagnostic.nome_empresa || "Diagn\u00f3stico"}</title>
    <style>
      * { box-sizing: border-box; }
      body { font-family: Arial, sans-serif; color: #18233f; margin: 10px 12px; line-height: 1.4; }
      h1, h2, h3, h4 { margin: 0 0 8px; }
      h1 { font-size: 24px; line-height: 1.15; }
      h2 { font-size: 14px; color: #51607f; margin-bottom: 0; font-weight: 500; }
      h3 { font-size: 16px; color: #24386f; }
      h4 { font-size: 12px; color: #45526f; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 10px; }
      p { margin: 0; }
      ul { margin: 6px 0 0 16px; padding: 0; }
      li { margin: 0 0 4px; }
      .report-intro { margin: 0; padding: 0; }
      .report-header { margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #d9dfef; }
      .report-header-meta { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
      .report-header-item { border: 1px solid #d6dceb; border-radius: 8px; padding: 8px 10px; background: #f8faff; }
      .report-header-item strong { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #5a6784; margin-bottom: 4px; }
      .report-section { margin-top: 12px; }
      .report-section-highlight { margin-top: 0; padding: 10px 12px; border: 1px solid #dce3f5; border-radius: 12px; background: #f7f9ff; }
      .report-summary-block { margin-bottom: 10px; }
      .report-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .report-item { border: 1px solid #d6dceb; border-radius: 8px; padding: 8px 10px; background: #f8faff; }
      .report-item strong { display: block; margin-bottom: 4px; font-size: 10px; text-transform: uppercase; color: #5a6784; letter-spacing: 0.05em; }
      @media print {
        body { margin: 8px 10px; }
        .report-intro { margin: 0; padding: 0; }
        .report-header { margin-bottom: 12px; padding-bottom: 12px; }
        .report-section { margin-top: 10px; }
        .report-section-highlight { margin-top: 0; }
        .report-grid { gap: 8px; }
      }
    </style>
  </head>
  <body>
    <div class="report-intro">
      <header class="report-header">
        <h1>${diagnostic.nome_empresa || "Diagn\u00f3stico"}</h1>
        <h2>Relat\u00f3rio de diagn\u00f3stico comercial</h2>
        <div class="report-header-meta">
          <div class="report-header-item">
            <strong>Respons\u00e1vel</strong>
            <span>${diagnostic.nome_responsavel || "N\u00e3o informado"}</span>
          </div>
          <div class="report-header-item">
            <strong>Data</strong>
            <span>${formatDate(getCreatedAt(diagnostic))}</span>
          </div>
          <div class="report-header-item">
            <strong>Canais principais</strong>
            <span>${analysisData.channels.join(", ")}</span>
          </div>
        </div>
      </header>
      ${analysisMarkup}
    </div>
    ${sectionsMarkup}
  </body>
  </html>`;
}

function openPrintWindow(diagnostic, analysisData) {
  const printWindow = window.open("", "_blank", "width=960,height=720");

  if (!printWindow) {
    alert("N\u00e3o foi poss\u00edvel abrir a janela de impress\u00e3o.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildPrintableReport(diagnostic, analysisData));
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function createDetailSection(section) {
  const wrapper = document.createElement("section");
  wrapper.className = "structured-section";

  const title = document.createElement("h4");
  title.textContent = section.title;

  const grid = document.createElement("div");
  grid.className = "structured-grid";

  section.rows.forEach((row) => {
    grid.append(createDetailRow(row.label, row.value));
  });

  wrapper.append(title, grid);
  return wrapper;
}

function createDiagnosticCard(diagnostic) {
  const card = document.createElement("article");
  card.className = "diagnostic-card";

  const header = document.createElement("div");
  header.className = "diagnostic-card-header";

  const headerText = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = diagnostic.nome_empresa || "Empresa sem nome";

  const subtitle = document.createElement("p");
  subtitle.className = "session-email";
  subtitle.textContent = diagnostic.nome_responsavel || "Respons\u00e1vel n\u00e3o informado";

  headerText.append(title, subtitle);

  const actionGroup = document.createElement("div");
  actionGroup.className = "card-actions";

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.className = "details-button";
  detailsButton.textContent = "Ver detalhes";

  const analysisButton = document.createElement("button");
  analysisButton.type = "button";
  analysisButton.className = "details-button";
  analysisButton.textContent = "Gerar an\u00e1lise r\u00e1pida";

  const pdfButton = document.createElement("button");
  pdfButton.type = "button";
  pdfButton.className = "details-button";
  pdfButton.textContent = "Baixar PDF";

  actionGroup.append(detailsButton, analysisButton, pdfButton);
  header.append(headerText, actionGroup);

  const metaGrid = document.createElement("div");
  metaGrid.className = "diagnostic-meta";
  metaGrid.append(
    createMetaItem("Respons\u00e1vel", diagnostic.nome_responsavel),
    createMetaItem("E-mail", diagnostic.email),
    createMetaItem("Telefone", diagnostic.telefone),
    createMetaItem("Cidade / Estado", diagnostic.cidade_estado),
    createMetaItem("Canais", formatCanais(diagnostic.canais)),
    createMetaItem("Produtos", diagnostic.produtos),
    createMetaItem("Data de envio", formatDate(getCreatedAt(diagnostic)))
  );

  const detailsPanel = document.createElement("div");
  detailsPanel.className = "details-panel";

  const structuredSections = buildStructuredSections(diagnostic);
  structuredSections.forEach((section) => {
    detailsPanel.append(createDetailSection(section));
  });

  const analysisContainer = document.createElement("div");
  analysisContainer.className = "analysis-container";
  detailsPanel.append(analysisContainer);

  const technicalToggle = document.createElement("button");
  technicalToggle.type = "button";
  technicalToggle.className = "details-button technical-toggle";
  technicalToggle.textContent = "Ver JSON t\u00e9cnico";

  const technicalPanel = document.createElement("div");
  technicalPanel.className = "technical-json is-hidden";

  const pre = document.createElement("pre");
  pre.textContent = formatRespostas(diagnostic.respostas);
  technicalPanel.append(pre);

  detailsPanel.append(technicalToggle, technicalPanel);

  let cachedAnalysis = null;

  function ensureAnalysis() {
    if (!cachedAnalysis) {
      cachedAnalysis = generateAnalysisData(diagnostic);
      analysisContainer.innerHTML = "";
      analysisContainer.append(createAnalysisBlock(cachedAnalysis));
    }

    return cachedAnalysis;
  }

  detailsButton.addEventListener("click", () => {
    const isOpen = detailsPanel.classList.toggle("is-open");
    detailsButton.textContent = isOpen ? "Ocultar detalhes" : "Ver detalhes";
  });

  analysisButton.addEventListener("click", () => {
    ensureAnalysis();
    detailsPanel.classList.add("is-open");
    detailsButton.textContent = "Ocultar detalhes";
    analysisContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  pdfButton.addEventListener("click", () => {
    const analysisData = ensureAnalysis();
    openPrintWindow(diagnostic, analysisData);
  });

  technicalToggle.addEventListener("click", () => {
    const isHidden = technicalPanel.classList.toggle("is-hidden");
    technicalToggle.textContent = isHidden ? "Ver JSON t\u00e9cnico" : "Ocultar JSON t\u00e9cnico";
  });

  card.append(header, metaGrid, detailsPanel);
  return card;
}

function renderDiagnostics(items) {
  diagnosticsList.innerHTML = "";

  if (items.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "Nenhum diagn\u00f3stico encontrado para esse filtro.";
    diagnosticsList.append(emptyState);
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((diagnostic) => {
    fragment.append(createDiagnosticCard(diagnostic));
  });
  diagnosticsList.append(fragment);
}

function applySearch() {
  const query = searchCompanyInput.value.trim().toLowerCase();

  const filteredDiagnostics = diagnostics.filter((diagnostic) => {
    const companyName = (diagnostic.nome_empresa || "").toLowerCase();
    return companyName.includes(query);
  });

  resultsSummary.textContent = `${filteredDiagnostics.length} diagn\u00f3stico(s) encontrado(s)`;
  renderDiagnostics(filteredDiagnostics);
}

async function fetchDiagnostics() {
  setFeedback(dashboardFeedback, "Carregando diagn\u00f3sticos...");
  refreshButton.disabled = true;

  const { data, error } = await supabase
    .from("diagnosticos")
    .select("*")
    .order("criado_em", { ascending: false });

  refreshButton.disabled = false;

  if (error) {
    console.error("Erro ao buscar diagn\u00f3sticos", error);
    setFeedback(dashboardFeedback, "N\u00e3o foi poss\u00edvel carregar os diagn\u00f3sticos.", "error");
    diagnostics = [];
    applySearch();
    return;
  }

  diagnostics = Array.isArray(data) ? data : [];
  setFeedback(dashboardFeedback, "Dados atualizados.", "success");
  applySearch();
}

function updateView(session) {
  const isLoggedIn = Boolean(session?.user);

  authCard.classList.toggle("is-hidden", isLoggedIn);
  dashboardShell.classList.toggle("is-hidden", !isLoggedIn);

  if (isLoggedIn) {
    sessionEmail.textContent = `Sess\u00e3o ativa: ${session.user.email}`;
    fetchDiagnostics();
    return;
  }

  sessionEmail.textContent = "";
  diagnostics = [];
  diagnosticsList.innerHTML = "";
  resultsSummary.textContent = "";
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    setFeedback(authFeedback, "Informe e-mail e senha.", "error");
    return;
  }

  loginButton.disabled = true;
  setFeedback(authFeedback, "Entrando...");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  loginButton.disabled = false;

  if (error) {
    console.error("Erro ao autenticar no dashboard", error);
    setFeedback(authFeedback, "N\u00e3o foi poss\u00edvel entrar. Verifique suas credenciais.", "error");
    return;
  }

  loginForm.reset();
  setFeedback(authFeedback, "");
  updateView(data.session);
});

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  setFeedback(dashboardFeedback, "Encerrando sess\u00e3o...");

  const { error } = await supabase.auth.signOut();

  logoutButton.disabled = false;

  if (error) {
    console.error("Erro ao sair do dashboard", error);
    setFeedback(dashboardFeedback, "N\u00e3o foi poss\u00edvel sair agora.", "error");
    return;
  }

  setFeedback(dashboardFeedback, "");
  updateView(null);
});

refreshButton.addEventListener("click", () => {
  fetchDiagnostics();
});

searchCompanyInput.addEventListener("input", () => {
  applySearch();
});

supabase.auth.onAuthStateChange((_event, session) => {
  updateView(session);
});

const {
  data: { session }
} = await supabase.auth.getSession();

updateView(session);
