const form = document.getElementById("settings-form");
const successMessage = document.getElementById("success-message");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fields = {
  fullName: {
    input: document.getElementById("full-name"),
    errorEl: document.getElementById("full-name-error"),
    validate(value) {
      if (!value.trim()) return "Full name is required.";
      return "";
    },
  },
  email: {
    input: document.getElementById("email"),
    errorEl: document.getElementById("email-error"),
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Email address is required.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Please enter a valid email address.";
      return "";
    },
  },
  password: {
    input: document.getElementById("password"),
    errorEl: document.getElementById("password-error"),
    validate(value) {
      if (!value) return "Password is required.";
      if (value.length < 8) return "Password must be at least 8 characters.";
      if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter.";
      if (!/\d/.test(value)) return "Password must include at least one number.";
      return "";
    },
  },
  confirmPassword: {
    input: document.getElementById("confirm-password"),
    errorEl: document.getElementById("confirm-password-error"),
    validate(value, formValues) {
      if (!value) return "Please confirm your password.";
      if (value !== formValues.password) return "Passwords do not match.";
      return "";
    },
  },
  theme: {
    input: document.getElementById("theme"),
    errorEl: document.getElementById("theme-error"),
    validate(value) {
      if (!value) return "Please select a theme.";
      if (!["light", "dark"].includes(value)) return "Please select a valid theme.";
      return "";
    },
  },
};

function getFormValues() {
  return {
    fullName: fields.fullName.input.value,
    email: fields.email.input.value,
    password: fields.password.input.value,
    confirmPassword: fields.confirmPassword.input.value,
    theme: fields.theme.input.value,
    notifications: document.getElementById("notifications").checked,
  };
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function showFieldError(field, message) {
  field.input.classList.toggle("invalid", Boolean(message));
  field.errorEl.textContent = message;
}

function validateField(key, formValues = getFormValues()) {
  const field = fields[key];
  const message = field.validate(field.input.value, formValues);
  showFieldError(field, message);
  return !message;
}

function validateForm() {
  const formValues = getFormValues();
  return Object.keys(fields).every((key) => validateField(key, formValues));
}

function clearSuccessMessage() {
  successMessage.textContent = "";
}

function loadSavedSettings() {
  const saved = localStorage.getItem("userSettings");
  if (!saved) return;

  try {
    const settings = JSON.parse(saved);
    fields.fullName.input.value = settings.fullName || "";
    fields.email.input.value = settings.email || "";
    fields.theme.input.value = settings.theme || "";
    document.getElementById("notifications").checked = Boolean(settings.notifications);

    if (settings.theme) applyTheme(settings.theme);
  } catch {
    localStorage.removeItem("userSettings");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearSuccessMessage();

  if (!validateForm()) return;

  const settings = getFormValues();
  const { password, confirmPassword, ...settingsToStore } = settings;

  localStorage.setItem("userSettings", JSON.stringify(settingsToStore));
  applyTheme(settings.theme);
  successMessage.textContent = "Settings saved successfully!";
});

Object.keys(fields).forEach((key) => {
  const field = fields[key];
  const eventType = field.input.tagName === "SELECT" ? "change" : "input";

  field.input.addEventListener(eventType, () => {
    if (field.errorEl.textContent) {
      validateField(key);
    }

    if (key === "password" && fields.confirmPassword.errorEl.textContent) {
      validateField("confirmPassword");
    }
  });

  field.input.addEventListener("blur", () => validateField(key));
});

loadSavedSettings();
