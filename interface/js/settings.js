const DEFAULT_SETTINGS = {
    firstname: '',
    lastname: '',
    team: '',
    role: '',
    brandcolor: '#5A287D',
    linkcolor: '#e51565',
    signature: 'Best regards,',
    supportpage: '',
    favouriteTemplates: [],
    theme: 'light'
};

let currentTemplateId = null;

function loadSettings() {
    let settings;
    try {
        const storedSettings = localStorage.getItem('emailBuilderSettings');
        settings = storedSettings ? JSON.parse(storedSettings) : DEFAULT_SETTINGS;
    } catch (e) {
        console.error("Error loading settings from local storage:", e);
        settings = DEFAULT_SETTINGS;
    }

    settings.favouriteTemplates = settings.favouriteTemplates || [];
    Object.keys(TEMPLATES).forEach(id => {
        TEMPLATES[id].isfavourite = settings.favouriteTemplates.includes(id);
    });
    applyTheme(settings.theme);

    return settings;
}

function saveSettings() {
    const form = document.getElementById('settings-form');
    const existingSettings = loadSettings();

    existingSettings.firstname = form['setting-firstname'].value;
    existingSettings.lastname = form['setting-lastname'].value;
    existingSettings.team = form['setting-team'].value;
    existingSettings.role = form['setting-role'].value;
    existingSettings.brandcolor = form['setting-brandcolor'].value;
    existingSettings.linkcolor = form['setting-linkcolor'].value;
    existingSettings.signature = form['setting-signature'].value;
    existingSettings.supportpage = form['setting-supportpage'].value;
    existingSettings.theme = form.querySelector('input[name="theme"]:checked').value;

    try {
        localStorage.setItem('emailBuilderSettings', JSON.stringify(existingSettings));
        showNotification('success', 'Settings saved successfully!')
        if (currentTemplateId) {
            selectTemplate(currentTemplateId);
        }
    } catch (e) {
        showNotification('error', 'Settings could not be saved!')
    }
    loadSettings();
    nextElementMargin = 0;
    
}

function initialiseSettingsForm() {
    const settings = loadSettings();
    document.getElementById('setting-firstname').value = settings.firstname;
    document.getElementById('setting-lastname').value = settings.lastname;
    document.getElementById('setting-team').value = settings.team;
    document.getElementById('setting-role').value = settings.role;
    document.getElementById('setting-brandcolor').value = settings.brandcolor;
    document.getElementById('setting-linkcolor').value = settings.linkcolor;
    document.getElementById('setting-signature').value = settings.signature;
    document.getElementById('setting-supportpage').value = settings.supportpage;

    // Set theme radio button
    if (settings.theme === 'dark') {
        document.getElementById('theme-dark').checked = true;
    } else {
        document.getElementById('theme-light').checked = true;
    }
}

function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
}

function clearAllLocalStorage() {
    try {
        localStorage.clear();
        showNotification('success', 'Local settings cleared successfully!')
        setTimeout(() => {
            window.location.reload();
        }, 2100);
        

    } catch (e) {
        showNotification('error', 'Failed to clear settings. Please try again.');
    }
}
function ensureNotificationContainer() {
  let container = document.querySelector('.notification-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
  }
  return container;
}

function showNotification(type, message, duration = 2000) {
  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };

  const container = ensureNotificationContainer();
  const note = document.createElement('div');
  note.className = `notification ${type}`;
  note.innerHTML = `<i class="fa-solid ${icons[type]}"></i><span>${message}</span>`;
  container.appendChild(note);

  setTimeout(() => {
    note.style.animation = 'fadeOutUp 0.4s ease forwards';
    setTimeout(() => note.remove(), 400);
  }, duration);
}