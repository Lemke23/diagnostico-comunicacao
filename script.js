const form = document.getElementById("diagnostic-form");
const successMessage = document.getElementById("success-message");
const progressValue = document.getElementById("progress-value");
const progressFill = document.getElementById("progress-fill");
const stepTabs = Array.from(document.querySelectorAll(".step-tab"));
const sections = Array.from(document.querySelectorAll(".form-section"));
const submitButtons = Array.from(form.querySelectorAll("button"));
let preserveSuccessMessage = false;

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
    id: "salesChannel",
    type: "select",
    message: "Selecione o principal canal de vendas.",
    step: "instagram"
  },
  {
    id: "instagramUse",
    type: "radio",
    message: "Selecione como o Instagram \u00e9 usado hoje.",
    step: "instagram"
  },
  {
    id: "profileClarity",
    type: "radio",
    message: "Selecione se o perfil comunica claramente o que voc\u00ea vende.",
    step: "instagram"
  },
  {
    id: "separateProfile",
    type: "radio",
    message: "Selecione se voc\u00ea j\u00e1 pensou em separar o perfil pessoal do profissional.",
    step: "instagram"
  },
  {
    id: "responder",
    type: "radio",
    message: "Selecione quem responde normalmente o cliente.",
    step: "atendimento"
  },
  {
    id: "servicePattern",
    type: "radio",
    message: "Selecione se existe um padr\u00e3o de atendimento.",
    step: "atendimento"
  },
  {
    id: "customerQuestions",
    type: "textarea",
    message: "Informe as 3 d\u00favidas que os clientes mais fazem.",
    step: "atendimento"
  },
  {
    id: "productUnderstanding",
    type: "radio",
    message: "Selecione se o cliente entende facilmente o produto.",
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
    id: "improvementPriority",
    type: "textarea",
    message: "Informe o que voc\u00ea melhoraria primeiro no neg\u00f3cio.",
    step: "vendas"
  }
];

const stepOrder = ["identificacao", "instagram", "atendimento", "vendas"];

function getFieldElements(field) {
  if (field.type === "radio") {
    return Array.from(form.querySelectorAll(`input[name="${field.id}"]`));
  }

  const selectors = {
    input: `input[name="${field.id}"]`,
    select: `select[name="${field.id}"]`,
    textarea: `textarea[name="${field.id}"]`
  };

  return [form.querySelector(selectors[field.type])];
}

function getFieldContainer(field) {
  return form.querySelector(`.field[data-field="${field.id}"]`);
}

function isFieldComplete(field) {
  const elements = getFieldElements(field);

  if (field.type === "radio") {
    return elements.some((input) => input.checked);
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

async function readResponsePayload(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function getErrorMessage(payload, fallbackMessage) {
  if (payload && typeof payload === "object" && Array.isArray(payload.errors) && payload.errors.length > 0) {
    return payload.errors.map((error) => error.message).join(" ");
  }

  if (typeof payload === "string" && payload.trim()) {
    return payload.trim();
  }

  return fallbackMessage;
}

function validateField(field) {
  const elements = getFieldElements(field);

  if (field.type === "radio") {
    if (!isFieldComplete(field)) {
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
  const completed = fields.filter(isFieldComplete).length;
  const percentage = Math.round((completed / fields.length) * 100);

  progressValue.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;

  stepOrder.forEach((stepId) => {
    const tab = document.querySelector(`[data-step-target="${stepId}"]`);
    const stepFields = fields.filter((field) => field.step === stepId);
    const stepCompleted = stepFields.every(isFieldComplete);

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
    const eventName = field.type === "radio" || field.type === "select" ? "change" : "input";
    element.addEventListener(eventName, () => {
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

  const isValid = fields.every(validateField);
  updateProgress();

  if (!isValid) {
    setStatus("");
    scrollToFirstInvalidField();
    return;
  }

  setSubmitButtonsDisabled(true);
  setStatus("Enviando diagn\u00f3stico...", "loading");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json"
      }
    });

    const payload = await readResponsePayload(response);

    if (!response.ok) {
      const message = getErrorMessage(payload, "N\u00e3o foi poss\u00edvel enviar o diagn\u00f3stico.");
      console.error("Falha ao enviar formul\u00e1rio", {
        status: response.status,
        payload
      });
      throw new Error(message);
    }

    setStatus("Diagn\u00f3stico enviado com sucesso.");
    preserveSuccessMessage = true;
    form.reset();
  } catch (error) {
    console.error("Erro ao enviar formul\u00e1rio", error);
    setStatus(error.message || "Erro ao enviar. Tente novamente.", "error");
  } finally {
    setSubmitButtonsDisabled(false);
  }
});

updateProgress();
setActiveStep(stepOrder[0]);
