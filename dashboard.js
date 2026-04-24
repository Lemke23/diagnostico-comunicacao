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

function formatCanais(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.join(", ");
      }
    } catch (error) {
      return value;
    }
  }

  return "N\u00e3o informado";
}

function formatRespostas(value) {
  if (!value) {
    return "{}";
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return value;
    }
  }

  return JSON.stringify(value, null, 2);
}

function getCreatedAt(diagnostic) {
  return diagnostic.criado_em || diagnostic.created_at || diagnostic.inserted_at || null;
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

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.className = "details-button";
  detailsButton.textContent = "Ver detalhes";

  header.append(headerText, detailsButton);

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

  const detailsTitle = document.createElement("p");
  detailsTitle.className = "meta-label";
  detailsTitle.textContent = "Respostas";

  const pre = document.createElement("pre");
  pre.textContent = formatRespostas(diagnostic.respostas);

  detailsPanel.append(detailsTitle, pre);

  detailsButton.addEventListener("click", () => {
    const isOpen = detailsPanel.classList.toggle("is-open");
    detailsButton.textContent = isOpen ? "Ocultar detalhes" : "Ver detalhes";
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
