const form = document.getElementById("diagnostic-form");
const successMessage = document.getElementById("success-message");
const progressValue = document.getElementById("progress-value");
const progressFill = document.getElementById("progress-fill");
const stepTabs = Array.from(document.querySelectorAll(".step-tab"));
const sections = Array.from(document.querySelectorAll(".form-section"));
const submitButtons = Array.from(form.querySelectorAll("button"));
const SUPABASE_URL = "https://apqevpormksrrdcpdwgt.supabase.co";
const SUPABASE_KEY = "sb_publishable_nZRdfhGhLtsqMPMjoot4_A_2WbTcESy";
let preserveSuccessMessage = false;

const stepOrder = ["identificacao", "instagram", "atendimento", "vendas"];

function getSelectedChannels() {
  return Array.from(form.querySelectorAll('input[name="salesChannels"]:checked')).map((input) => input.value);
}

function visibleWhenChannel(channel) {
  return () => getSelectedChannels().includes(channel);
}

function isAutomationDetailVisible() {
  const selected = form.querySelector('input[name="automationUsage"]:checked');
  return Boolean(selected && selected.value !== "N\u00e3o utiliza");
}

function isMainProblemOtherVisible() {
  const selected = form.querySelector('input[name="mainProblem"]:checked');
  return Boolean(selected && selected.value === "Outro");
}

const fields = [
  {
    id: "name",
    type: "input",
    message: "Informe o nome do respons\u00e1vel.",
    step: "identificacao"
  },
  {
    id: "company",
    type: "input",
    message: "Informe o nome da empresa.",
    step: "identificacao"
  },
  {
    id: "email",
    type: "input",
    message: "Informe um e-mail v\u00e1lido.",
    step: "identificacao",
    validator: (element) => element.validity.valid
  },
  {
    id: "phoneWhatsApp",
    type: "input",
    message: "Informe o telefone ou WhatsApp.",
    step: "identificacao"
  },
  {
    id: "cityState",
    type: "input",
    message: "Informe a cidade e o estado.",
    step: "identificacao"
  },
  {
    id: "mainSocialNetworkName",
    type: "input",
    message: "Informe a rede social principal.",
    step: "identificacao"
  },
  {
    id: "mainSocialNetworkLink",
    type: "input",
    message: "Informe um link v\u00e1lido da rede social principal.",
    step: "identificacao",
    validator: (element) => element.validity.valid
  },
  {
    id: "role",
    type: "input",
    message: "Informe o cargo ou fun\u00e7\u00e3o do respons\u00e1vel.",
    step: "identificacao"
  },
  {
    id: "salesTeamSize",
    type: "input",
    message: "Informe a quantidade de pessoas na equipe de vendas.",
    step: "identificacao",
    validator: (element) => element.validity.valid && Number(element.value) >= 1
  },
  {
    id: "businessType",
    type: "radio",
    message: "Selecione como voc\u00ea considera o neg\u00f3cio hoje.",
    step: "identificacao"
  },
  {
    id: "topProducts",
    type: "textarea",
    message: "Informe quais produtos voc\u00ea mais vende atualmente.",
    step: "instagram"
  },
  {
    id: "salesChannels",
    type: "checkbox-group",
    message: "Selecione pelo menos um canal que gera vendas.",
    step: "instagram",
    minSelections: 1
  },
  {
    id: "instagramObjective",
    type: "checkbox-group",
    message: "Selecione pelo menos um objetivo do Instagram.",
    step: "instagram",
    visible: visibleWhenChannel("Instagram"),
    minSelections: 1
  },
  {
    id: "instagramProfileClarity",
    type: "radio",
    message: "Selecione a clareza do perfil no Instagram.",
    step: "instagram",
    visible: visibleWhenChannel("Instagram")
  },
  {
    id: "instagramPostingFrequency",
    type: "radio",
    message: "Selecione a frequ\u00eancia de postagem no Instagram.",
    step: "instagram",
    visible: visibleWhenChannel("Instagram")
  },
  {
    id: "instagramContentPattern",
    type: "radio",
    message: "Selecione se existe padr\u00e3o de conte\u00fado no Instagram.",
    step: "instagram",
    visible: visibleWhenChannel("Instagram")
  },
  {
    id: "instagramResultsTracking",
    type: "radio",
    message: "Selecione como o Instagram mede resultados.",
    step: "instagram",
    visible: visibleWhenChannel("Instagram")
  },
  {
    id: "instagramClientInitiates",
    type: "radio",
    message: "Selecione se o cliente inicia contato pelo Instagram.",
    step: "instagram",
    visible: visibleWhenChannel("Instagram")
  },
  {
    id: "whatsappUse",
    type: "radio",
    message: "Selecione como o WhatsApp \u00e9 usado.",
    step: "instagram",
    visible: visibleWhenChannel("WhatsApp")
  },
  {
    id: "whatsappProcess",
    type: "radio",
    message: "Selecione se existe processo no WhatsApp.",
    step: "instagram",
    visible: visibleWhenChannel("WhatsApp")
  },
  {
    id: "whatsappFirstContact",
    type: "radio",
    message: "Selecione como \u00e9 o primeiro contato no WhatsApp.",
    step: "instagram",
    visible: visibleWhenChannel("WhatsApp")
  },
  {
    id: "whatsappResponseTime",
    type: "radio",
    message: "Selecione o tempo de resposta no WhatsApp.",
    step: "instagram",
    visible: visibleWhenChannel("WhatsApp")
  },
  {
    id: "whatsappConversionStrategy",
    type: "radio",
    message: "Selecione a estrat\u00e9gia de convers\u00e3o no WhatsApp.",
    step: "instagram",
    visible: visibleWhenChannel("WhatsApp")
  },
  {
    id: "whatsappLosesClients",
    type: "radio",
    message: "Selecione se perde clientes ap\u00f3s contato no WhatsApp.",
    step: "instagram",
    visible: visibleWhenChannel("WhatsApp")
  },
  {
    id: "facebookResults",
    type: "radio",
    message: "Selecione o resultado gerado pelo Facebook.",
    step: "instagram",
    visible: visibleWhenChannel("Facebook")
  },
  {
    id: "facebookPostingFrequency",
    type: "radio",
    message: "Selecione a frequ\u00eancia de postagem no Facebook.",
    step: "instagram",
    visible: visibleWhenChannel("Facebook")
  },
  {
    id: "facebookAdsUsage",
    type: "radio",
    message: "Selecione o uso de an\u00fancios no Facebook.",
    step: "instagram",
    visible: visibleWhenChannel("Facebook")
  },
  {
    id: "tiktokUse",
    type: "radio",
    message: "Selecione como o TikTok \u00e9 usado.",
    step: "instagram",
    visible: visibleWhenChannel("TikTok")
  },
  {
    id: "tiktokFrequency",
    type: "radio",
    message: "Selecione a frequ\u00eancia no TikTok.",
    step: "instagram",
    visible: visibleWhenChannel("TikTok")
  },
  {
    id: "tiktokHighReach",
    type: "radio",
    message: "Selecione se j\u00e1 teve alcance alto no TikTok.",
    step: "instagram",
    visible: visibleWhenChannel("TikTok")
  },
  {
    id: "tiktokDirectsChannel",
    type: "radio",
    message: "Selecione se o TikTok direciona para outro canal.",
    step: "instagram",
    visible: visibleWhenChannel("TikTok")
  },
  {
    id: "googleSearchPresence",
    type: "radio",
    message: "Selecione se aparece em pesquisas.",
    step: "instagram",
    visible: visibleWhenChannel("Google / Pesquisa")
  },
  {
    id: "googleBusinessProfile",
    type: "radio",
    message: "Selecione se possui Google Meu Neg\u00f3cio.",
    step: "instagram",
    visible: visibleWhenChannel("Google / Pesquisa")
  },
  {
    id: "googleReceivesContacts",
    type: "radio",
    message: "Selecione se recebe contatos pelo Google.",
    step: "instagram",
    visible: visibleWhenChannel("Google / Pesquisa")
  },
  {
    id: "googleHasReviews",
    type: "radio",
    message: "Selecione se possui avalia\u00e7\u00f5es no Google.",
    step: "instagram",
    visible: visibleWhenChannel("Google / Pesquisa")
  },
  {
    id: "referralImportance",
    type: "radio",
    message: "Selecione a import\u00e2ncia da indica\u00e7\u00e3o.",
    step: "instagram",
    visible: visibleWhenChannel("Indica\u00e7\u00e3o")
  },
  {
    id: "referralEncourages",
    type: "radio",
    message: "Selecione se incentiva indica\u00e7\u00e3o.",
    step: "instagram",
    visible: visibleWhenChannel("Indica\u00e7\u00e3o")
  },
  {
    id: "referralProcess",
    type: "radio",
    message: "Selecione se existe processo de indica\u00e7\u00e3o.",
    step: "instagram",
    visible: visibleWhenChannel("Indica\u00e7\u00e3o")
  },
  {
    id: "storeFlow",
    type: "radio",
    message: "Selecione o fluxo da loja f\u00edsica.",
    step: "instagram",
    visible: visibleWhenChannel("Loja f\u00edsica")
  },
  {
    id: "storeProductClarity",
    type: "radio",
    message: "Selecione se o cliente entende o produto na loja f\u00edsica.",
    step: "instagram",
    visible: visibleWhenChannel("Loja f\u00edsica")
  },
  {
    id: "storeVisualOrganization",
    type: "radio",
    message: "Selecione a organiza\u00e7\u00e3o visual da loja f\u00edsica.",
    step: "instagram",
    visible: visibleWhenChannel("Loja f\u00edsica")
  },
  {
    id: "websiteOutcome",
    type: "radio",
    message: "Selecione o que o site pr\u00f3prio gera.",
    step: "instagram",
    visible: visibleWhenChannel("Site pr\u00f3prio")
  },
  {
    id: "websiteClearInformation",
    type: "radio",
    message: "Selecione se o site possui informa\u00e7\u00f5es claras.",
    step: "instagram",
    visible: visibleWhenChannel("Site pr\u00f3prio")
  },
  {
    id: "marketplacePlatforms",
    type: "textarea",
    message: "Informe quais marketplaces usa.",
    step: "instagram",
    visible: visibleWhenChannel("Marketplace")
  },
  {
    id: "marketplaceSalesFrequency",
    type: "radio",
    message: "Selecione a frequ\u00eancia de vendas no marketplace.",
    step: "instagram",
    visible: visibleWhenChannel("Marketplace")
  },
  {
    id: "marketplaceStrategy",
    type: "radio",
    message: "Selecione se existe estrat\u00e9gia no marketplace.",
    step: "instagram",
    visible: visibleWhenChannel("Marketplace")
  },
  {
    id: "otherChannelName",
    type: "input",
    message: "Informe qual \u00e9 o outro canal.",
    step: "instagram",
    visible: visibleWhenChannel("Outro")
  },
  {
    id: "otherChannelHowWorks",
    type: "textarea",
    message: "Explique como o outro canal funciona.",
    step: "instagram",
    visible: visibleWhenChannel("Outro")
  },
  {
    id: "otherChannelDifficulty",
    type: "textarea",
    message: "Informe a dificuldade do outro canal.",
    step: "instagram",
    visible: visibleWhenChannel("Outro")
  },
  {
    id: "firstContactType",
    type: "radio",
    message: "Selecione como acontece o primeiro contato do cliente.",
    step: "atendimento"
  },
  {
    id: "automationUsage",
    type: "radio",
    message: "Selecione o uso de automa\u00e7\u00e3o.",
    step: "atendimento"
  },
  {
    id: "automationType",
    type: "input",
    message: "Informe o tipo de automa\u00e7\u00e3o.",
    step: "atendimento",
    visible: isAutomationDetailVisible
  },
  {
    id: "afterContactRouting",
    type: "radio",
    message: "Selecione para onde vai o atendimento ap\u00f3s o contato.",
    step: "atendimento"
  },
  {
    id: "serviceProcess",
    type: "radio",
    message: "Selecione se existe processo definido de atendimento.",
    step: "atendimento"
  },
  {
    id: "serviceScript",
    type: "radio",
    message: "Selecione se existe roteiro de atendimento.",
    step: "atendimento"
  },
  {
    id: "structuredPresentation",
    type: "radio",
    message: "Selecione se o cliente recebe apresenta\u00e7\u00e3o estruturada.",
    step: "atendimento"
  },
  {
    id: "followUpProcess",
    type: "radio",
    message: "Selecione se existe acompanhamento p\u00f3s-contato.",
    step: "atendimento"
  },
  {
    id: "lostSalesByService",
    type: "radio",
    message: "Selecione se j\u00e1 perdeu vendas por falha no atendimento.",
    step: "atendimento"
  },
  {
    id: "serviceMainProblem",
    type: "textarea",
    message: "Informe o maior problema no atendimento.",
    step: "atendimento"
  },
  {
    id: "salesDifficulty",
    type: "textarea",
    message: "Informe o que mais dificulta fechar uma venda hoje.",
    step: "vendas"
  },
  {
    id: "mainProblem",
    type: "radio",
    message: "Selecione o maior problema do neg\u00f3cio hoje.",
    step: "vendas"
  },
  {
    id: "mainProblemOtherDescription",
    type: "textarea",
    message: "Descreva o principal problema.",
    step: "vendas",
    visible: isMainProblemOtherVisible
  },
  {
    id: "improvementPriority",
    type: "textarea",
    message: "Informe o que voc\u00ea melhoraria primeiro no neg\u00f3cio.",
    step: "vendas"
  }
];

const fieldMap = new Map(fields.map((field) => [field.id, field]));

function getFieldElements(field) {
  const fieldName = field.name || field.id;

  if (field.type === "radio" || field.type === "checkbox-group") {
    return Array.from(form.querySelectorAll(`input[name="${fieldName}"]`));
  }

  const selectors = {
    input: `input[name="${fieldName}"]`,
    select: `select[name="${fieldName}"]`,
    textarea: `textarea[name="${fieldName}"]`
  };

  return [form.querySelector(selectors[field.type])];
}

function getFieldContainer(field) {
  return form.querySelector(`.field[data-field="${field.id}"]`);
}

function isFieldVisible(field) {
  if (typeof field.visible === "function" && !field.visible()) {
    return false;
  }

  const container = getFieldContainer(field);
  return Boolean(container) && !container.closest(".is-hidden");
}

function isFieldComplete(field) {
  if (!isFieldVisible(field)) {
    return true;
  }

  const elements = getFieldElements(field);

  if (field.type === "radio") {
    return elements.some((input) => input.checked);
  }

  if (field.type === "checkbox-group") {
    const checkedCount = elements.filter((input) => input.checked).length;
    return checkedCount >= (field.minSelections || 1);
  }

  const [element] = elements;
  if (!element) {
    return false;
  }

  const hasValue = Boolean(element.value.trim());
  if (!hasValue) {
    return false;
  }

  if (field.validator) {
    return field.validator(element);
  }

  return true;
}

function setError(field, message) {
  const container = getFieldContainer(field);
  const error = document.getElementById(`${field.id}-error`);

  if (!container || !error) {
    return;
  }

  container.classList.add("invalid");
  error.textContent = message;
}

function clearError(field) {
  const container = getFieldContainer(field);
  const error = document.getElementById(`${field.id}-error`);

  if (!container || !error) {
    return;
  }

  container.classList.remove("invalid");
  error.textContent = "";
}

function clearAllErrors() {
  fields.forEach((field) => clearError(field));
}

function clearFieldsInContainer(container) {
  container.querySelectorAll("input, select, textarea").forEach((element) => {
    if (element.type === "radio" || element.type === "checkbox") {
      element.checked = false;
      return;
    }

    element.value = "";
  });

  container.querySelectorAll(".field[data-field]").forEach((fieldElement) => {
    const field = fieldMap.get(fieldElement.dataset.field);
    if (field) {
      clearError(field);
    }
  });
}

function setBlockVisibility(block, shouldShow) {
  if (!block) {
    return;
  }

  const isHidden = block.classList.contains("is-hidden");

  if (shouldShow) {
    block.classList.remove("is-hidden");
    return;
  }

  if (!isHidden) {
    clearFieldsInContainer(block);
  }

  block.classList.add("is-hidden");
}

function syncConditionalBlocks() {
  const selectedChannels = getSelectedChannels();

  document.querySelectorAll("[data-channel-block]").forEach((block) => {
    setBlockVisibility(block, selectedChannels.includes(block.dataset.channelBlock));
  });

  const automationBlock = document.querySelector('[data-conditional-block="automationType"]');
  setBlockVisibility(automationBlock, isAutomationDetailVisible());

  const mainProblemOtherBlock = document.querySelector('[data-conditional-block="mainProblemOther"]');
  setBlockVisibility(mainProblemOtherBlock, isMainProblemOtherVisible());
}

function setSubmitButtonsDisabled(isDisabled) {
  submitButtons.forEach((button) => {
    button.disabled = isDisabled;
  });
}

function setStatus(message = "", type = "success") {
  successMessage.classList.remove("visible", "is-loading", "is-error");
  successMessage.textContent = message;

  if (!message) {
    return;
  }

  successMessage.classList.add("visible");

  if (type === "loading") {
    successMessage.classList.add("is-loading");
  }

  if (type === "error") {
    successMessage.classList.add("is-error");
  }
}

function getFieldSingleValue(name) {
  const elements = Array.from(form.querySelectorAll(`[name="${name}"]`));

  if (elements.length === 0) {
    return "";
  }

  const [firstElement] = elements;

  if (firstElement.type === "radio") {
    const checkedElement = elements.find((element) => element.checked);
    return checkedElement ? checkedElement.value : "";
  }

  if (firstElement.type === "checkbox") {
    return elements.filter((element) => element.checked).map((element) => element.value);
  }

  return firstElement.value.trim();
}

function getCanaisSelecionados() {
  return Array.from(form.querySelectorAll('input[name="salesChannels"]:checked')).map((input) => input.value);
}

function coletarRespostas() {
  const respostas = {};

  Array.from(form.querySelectorAll("input, select, textarea")).forEach((element) => {
    const { name, type } = element;

    if (!name || type === "submit" || type === "reset" || type === "button") {
      return;
    }

    if (type === "radio") {
      if (element.checked) {
        respostas[name] = element.value;
      } else if (!(name in respostas)) {
        respostas[name] = "";
      }
      return;
    }

    if (type === "checkbox") {
      if (!Array.isArray(respostas[name])) {
        respostas[name] = [];
      }

      if (element.checked) {
        respostas[name].push(element.value);
      }
      return;
    }

    respostas[name] = element.value.trim();
  });

  return respostas;
}

async function enviarFormulario(dados) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/diagnosticos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify(dados)
  });

  if (!response.ok) {
    let errorMessage = "Erro ao enviar. Tente novamente.";

    try {
      const errorPayload = await response.json();
      errorMessage = errorPayload.message || errorPayload.error_description || errorPayload.details || errorMessage;
      console.error("Falha ao inserir diagn\u00f3stico no Supabase", {
        status: response.status,
        payload: errorPayload
      });
    } catch (error) {
      console.error("Falha ao inserir diagn\u00f3stico no Supabase", {
        status: response.status
      });
    }

    throw new Error(errorMessage);
  }
}

function validateField(field) {
  if (!isFieldVisible(field)) {
    clearError(field);
    return true;
  }

  const elements = getFieldElements(field);

  if (field.type === "radio") {
    if (!elements.some((input) => input.checked)) {
      setError(field, field.message);
      return false;
    }

    clearError(field);
    return true;
  }

  if (field.type === "checkbox-group") {
    const checkedCount = elements.filter((input) => input.checked).length;

    if (checkedCount < (field.minSelections || 1)) {
      setError(field, field.message);
      return false;
    }

    clearError(field);
    return true;
  }

  const [element] = elements;

  if (!element || !element.value.trim()) {
    setError(field, field.message);
    return false;
  }

  if (field.validator && !field.validator(element)) {
    setError(field, field.message);
    return false;
  }

  clearError(field);
  return true;
}

function updateProgress() {
  const activeFields = fields.filter(isFieldVisible);
  const completed = activeFields.filter(isFieldComplete).length;
  const percentage = activeFields.length > 0 ? Math.round((completed / activeFields.length) * 100) : 0;

  progressValue.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;

  stepOrder.forEach((stepId) => {
    const tab = document.querySelector(`[data-step-target="${stepId}"]`);
    const stepFields = fields.filter((field) => field.step === stepId && isFieldVisible(field));
    const stepCompleted = stepFields.length > 0 && stepFields.every(isFieldComplete);

    if (tab) {
      tab.classList.toggle("is-complete", stepCompleted);
    }
  });
}

function setActiveStep(stepId) {
  stepTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.stepTarget === stepId);
  });
}

function getCurrentStepFromScroll() {
  let currentStep = stepOrder[0];

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.35) {
      currentStep = section.dataset.step;
    }
  });

  return currentStep;
}

function scrollToFirstInvalidField() {
  const invalidField = form.querySelector(".field.invalid");
  if (!invalidField) {
    return;
  }

  invalidField.scrollIntoView({ behavior: "smooth", block: "center" });
}

fields.forEach((field) => {
  const elements = getFieldElements(field);

  elements.forEach((element) => {
    const eventName = field.type === "radio" || field.type === "select" || field.type === "checkbox-group" ? "change" : "input";

    element.addEventListener(eventName, () => {
      if (field.id === "salesChannels" || field.id === "automationUsage" || field.id === "mainProblem") {
        syncConditionalBlocks();
      }

      validateField(field);
      updateProgress();
    });
  });
});

stepTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.getElementById(tab.dataset.stepTarget);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveStep(tab.dataset.stepTarget);
  });
});

window.addEventListener("scroll", () => {
  setActiveStep(getCurrentStepFromScroll());
}, { passive: true });

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    clearAllErrors();
    syncConditionalBlocks();
    if (!preserveSuccessMessage) {
      setStatus("");
    }
    updateProgress();
    setActiveStep(stepOrder[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
    preserveSuccessMessage = false;
  }, 0);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const visibleFields = fields.filter(isFieldVisible);
  const isValid = visibleFields.every(validateField);
  updateProgress();

  if (!isValid) {
    setStatus("");
    scrollToFirstInvalidField();
    return;
  }

  setSubmitButtonsDisabled(true);
  setStatus("Enviando diagn\u00f3stico...", "loading");

  try {
    const canaisSelecionados = getCanaisSelecionados();
    const respostas = coletarRespostas();
    const dados = {
      nome_responsavel: getFieldSingleValue("name"),
      nome_empresa: getFieldSingleValue("company"),
      email: getFieldSingleValue("email"),
      telefone: getFieldSingleValue("phoneWhatsApp"),
      cidade_estado: getFieldSingleValue("cityState"),
      rede_social: getFieldSingleValue("mainSocialNetworkName"),
      link_rede: getFieldSingleValue("mainSocialNetworkLink"),
      site: getFieldSingleValue("website") || null,
      cargo: getFieldSingleValue("role"),
      equipe_vendas: Number(getFieldSingleValue("salesTeamSize")),
      produtos: getFieldSingleValue("topProducts"),
      canais: JSON.stringify(canaisSelecionados),
      respostas
    };

    await enviarFormulario(dados);

    setStatus("Diagn\u00f3stico enviado com sucesso");
    preserveSuccessMessage = true;
    form.reset();
  } catch (error) {
    console.error("Erro ao enviar diagn\u00f3stico", error);
    setStatus("Erro ao enviar. Tente novamente.", "error");
  } finally {
    setSubmitButtonsDisabled(false);
  }
});

syncConditionalBlocks();
updateProgress();
setActiveStep(stepOrder[0]);
