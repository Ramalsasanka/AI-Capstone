const form = document.getElementById("settings-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const themeSelect = document.getElementById("theme");
const successMessage = document.getElementById("success-message");

const fields = {
  name: {
    input: nameInput,
    errorEl: document.getElementById("name-error"),
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Name is required.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        return "Name can only contain letters, spaces, hyphens, and apostrophes.";
      }
      return "";
    },
  },
  email: {
    input: emailInput,
    errorEl: document.getElementById("email-error"),
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Email is required.";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) return "Please enter a valid email address.";
      return "";
    },
  },
  theme: {
    input: themeSelect,
    errorEl: document.getElementById("theme-error"),
    validate(value) {
      if (!value) return "Please select a theme.";
      return "";
    },
  },
};

function applyTheme(theme) {
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

function showFieldError(field, message) {
  field.input.classList.toggle("invalid", Boolean(message));
  field.errorEl.textContent = message;
}

function validateField(key) {
  const field = fields[key];
  const message = field.validate(field.input.value);
  showFieldError(field, message);
  return !message;
}

function validateForm() {
  return Object.keys(fields).every(validateField);
}

function loadSavedSettings() {
  const saved = localStorage.getItem("userSettings");
  if (!saved) return;

  try {
    const settings = JSON.parse(saved);
    nameInput.value = settings.name || "";
    emailInput.value = settings.email || "";
    themeSelect.value = settings.theme || "";
    if (settings.theme) applyTheme(settings.theme);
  } catch {
    localStorage.removeItem("userSettings");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  if (!validateForm()) return;

  const settings = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    theme: themeSelect.value,
  };

  localStorage.setItem("userSettings", JSON.stringify(settings));
  applyTheme(settings.theme);
  successMessage.textContent = "Settings saved successfully!";
});

Object.keys(fields).forEach((key) => {
  const field = fields[key];
  const eventType = field.input.tagName === "SELECT" ? "change" : "input";

  field.input.addEventListener(eventType, () => {
    if (field.errorEl.textContent) validateField(key);
  });

  field.input.addEventListener("blur", () => validateField(key));
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (themeSelect.value === "system") applyTheme("system");
});

loadSavedSettings();
