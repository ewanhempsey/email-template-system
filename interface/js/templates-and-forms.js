function generateForm(templateId) {
    const template = TEMPLATES[templateId];
    const formPanel = document.getElementById('form-panel');
    formPanel.innerHTML = `
    <div id="formatting-toolbar">
        <input type="color" id="font-color-picker" class="toolbar-color-input" value="#333333" onmousedown="event.preventDefault();" onchange="formatTextWithValue('foreColor', this.value)">
        <span class="toolbar-separator"></span>
        <button type="button" class="toolbar-button" onmousedown="event.preventDefault();" onclick="formatText('bold')" style="font-weight: bold;">B</button>
        <button type="button" class="toolbar-button" onmousedown="event.preventDefault();" onclick="formatText('italic')" style="font-style: italic;">I</button>
        <button type="button" class="toolbar-button" onmousedown="event.preventDefault();" onclick="formatText('underline')" style="text-decoration: underline;">U</button>
        <span class="toolbar-separator"></span>
        <button type="button" class="toolbar-button" onmousedown="event.preventDefault();" onclick="formatLink()">🔗 Link</button>
        <span id="current-field-label" class="toolbar-label"></span>
    </div>
    `;
    const formHeading = document.createElement('h3');
    formHeading.textContent = template.name;
    formPanel.appendChild(formHeading);
    template.fields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'input-group';

        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label + ':';
        group.appendChild(label);

        let input;
        if (field.type === 'textarea') {
            input = document.createElement('div');
            input.contentEditable = true;
            input.innerHTML = field.default || '';
            input.className = 'editable-textarea-field';
            input.addEventListener('input', updatePreview);
            input.addEventListener('focus', () => showToolbar(field.label));
            input.addEventListener('blur', hideToolbar);

        } else {
            input = document.createElement('input');
            input.type = field.type;
            input.value = field.default || '';
            input.addEventListener('input', updatePreview);
        }

        input.id = field.id;
        input.name = field.id;

        group.appendChild(input);
        formPanel.appendChild(group);
    });
}

function updatePreview() {
    if (!currentTemplateId) return;

    const template = TEMPLATES[currentTemplateId];
    const settings = loadSettings();
    const fields = {};

    template.fields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        if (inputElement) {
            if (inputElement.contentEditable === 'true') {
                fields[field.id] = inputElement.innerHTML;
            } else {
                fields[field.id] = inputElement.value;
            }
        } else {
            fields[field.id] = '';
        }
    });
    const generatedHtml = template.htmlGenerator(fields, settings);
    document.getElementById('email-preview-container').innerHTML = generatedHtml;
    document.getElementById('email-preview-container').dataset.rawHtml = generatedHtml;
}

function selectTemplate(templateId) {
  const template = TEMPLATES[templateId];
  if (!templateId) {
    showGuidanceCard();
    return;
  }

  currentTemplateId = templateId;
  showPage('builder');

  const isDark = document.body.classList.contains('dark');
  const activeBg = isDark ? 'var(--clr-primary-a10)' : 'var(--clr-primary-a80)';
  const activeBorder = isDark ? 'var(--clr-primary-a30)' : 'var(--clr-primary-a0)';
  const inactiveBg = isDark ? 'var(--clr-surface-a0)' : 'var(--clr-light-a0)';
  const inactiveBorder = isDark ? 'var(--clr-primary-a30)' : 'var(--clr-primary-a80)';

  document.querySelectorAll('#template-library-sidebar .sidebar-card').forEach(card => {
      const isSelected = card.dataset.id === templateId;
      
      card.style.backgroundColor = isSelected ? activeBg : inactiveBg;
      card.style.borderColor = isSelected ? activeBorder : inactiveBorder;
      card.style.boxShadow = isSelected
        ? isDark
          ? '0 0 0 2px var(--clr-primary-a20)'
          : '0 0 0 2px var(--clr-primary-a60)'
        : 'none';
    });

    generateForm(templateId);
    updatePreview();
}

function populateTemplateLibrary() {
    const sidebar = document.getElementById('template-library-sidebar');
    const fullList = document.getElementById('template-full-list');
    const isBuilderPage = !document.getElementById('builder-page').classList.contains('hidden-page');

    sidebar.innerHTML = '<h3 style="padding: 0 20px;">Templates</h3>';
    fullList.innerHTML = '';

    Object.keys(TEMPLATES).forEach(id => {
        const template = TEMPLATES[id];
        const star = isfavourite(id) ? '★' : '☆';

        if (!isBuilderPage || isfavourite(id)) {
            const sidebarCard = document.createElement('div');
            sidebarCard.className = 'sidebar-card';
            sidebarCard.dataset.id = id;
            sidebarCard.onclick = () => selectTemplate(id);

            sidebarCard.innerHTML = `
                <div onclick="selectTemplate('${id}')">
                    <h4>
                    ${template.name}
                    <span 
                        class="favourite-star" 
                        style="color: ${isfavourite(id) ? 'gold' : '#ccc'};"
                        onclick="event.stopPropagation(); togglefavourite('${id}')">
                        ${star}
                    </span>
                    </h4>
                        <div class="preview-content">${template.description}</div>
                </div
`;
            sidebar.appendChild(sidebarCard);
        }

        const fullCard = document.createElement('div');
        const settings = loadSettings();
        const placeholderFields = {};

        fullCard.className = 'template-preview-card';
        fullCard.style.padding = '0';
        fullCard.style.margin = '1em';
        fullCard.className = 'template-preview-card';

        template.fields.forEach(f => {
            placeholderFields[f.id] = f.default.substring(0, 50) + '...';
        });

        const miniPreviewHtml = template.htmlGenerator(placeholderFields, settings);

        fullCard.innerHTML = `
            <div class="template-card" onclick="selectTemplate('${id}')">
            <h4 class="template-card-header">
                ${template.name}
                <span 
                class="favourite-star" 
                style="color: ${isfavourite(id) ? 'gold' : '#ccc'};"
                onclick="event.stopPropagation(); togglefavourite('${id}')">
                ${star}
                </span>
            </h4>

  <div class="template-preview">
    <div class="template-preview-inner">
      ${miniPreviewHtml}
    </div>
  </div>

  <div class="template-details">
    <p><strong>Description:</strong> ${template.description}</p>
    <p><strong>Fields:</strong> ${template.fields.map(f => f.label).join(', ')}</p>
  </div>
</div>
        `;
        fullList.appendChild(fullCard);
    });

    if (isBuilderPage && Object.values(TEMPLATES).every(t => !t.isfavourite)) {
        sidebar.innerHTML += '<p style="padding: 0 20px; font-size: 13px; color: #888;">No favourites set. Go to Template Library to mark some!</p>';
    }
}

function togglefavourite(templateId) {
    const template = TEMPLATES[templateId];
    if (!template) return;

    const toSet = !isfavourite(templateId);
    const settings = loadSettings();
    if (toSet) {
        if (!settings.favouriteTemplates.includes(templateId)) {
            settings.favouriteTemplates.push(templateId);
        }
    } else {
        settings.favouriteTemplates = settings.favouriteTemplates.filter(
            id => id !== templateId
        );
    }
    try {
        localStorage.setItem('emailBuilderSettings', JSON.stringify(settings));
    } catch (e) {
        showNotification('error', "Error saving favourite template, try again.", 3000);
    }
    populateTemplateLibrary();
    setTimeout(function(){
        showNotification('success', `Template "${template.name}" ${toSet ? 'added to' : 'removed from'} favourites!`, 3000);
    },100)
    
}



function isfavourite(templateId) {
    return TEMPLATES[templateId] && TEMPLATES[templateId].isfavourite || false;
}

function showGuidanceCard() {
    const editor = document.getElementById('form-panel');
    editor.innerHTML = `
        <div class="guide-card">
                    <h2 class="guide-title">Email Builder: Get Started</h2>
                    <p class="guide-subtitle">
                        This is a simple, browser-based tool designed to help you quickly <strong>customize and preview</strong> standard email communication templates before sending.
                        All custom branding (color, signature, etc.) is managed via your <strong>Settings</strong>.
                    </p>
                    
                    <div class="guide-grid">
                        <div class="guide-step">
                            <h3 class="step-title">
                                <span class="step-number">1.</span>Initial Setup
                            </h3>
                            <p class="step-content">Click Settings in the navbar to configure your details. This is the only setup required to instantly personalise all templates information is stored locally in this browser. This means your settings will be remembered next time you open the builder.</p>
                        </div>
                        <div class="guide-step">
                            <h3 class="step-title">
                                <span class="step-number">2.</span> Templates and Favourites
                            </h3>
                            <p class="step-content">Our library gives you essential, pre-built templates for common communications. The Favorites feature lets you bookmark your most-used templates for quick access, simplifying your workflow.</p>
                        </div>
                        <div class="guide-step">
                            <h3 class="step-title">
                                <span class="step-number">3.</span> Preview & Copy
                            </h3>
                            <p class="step-content">Watch the editor instantly update. The output is ready-to-copy HTML for your email service.</p>
                        </div>
                    </div>

                    <button onclick="showPage('templates')" 
                            class="guide-button">
                        Browse Templates Now
                    </button>
                </div>
    `;
}