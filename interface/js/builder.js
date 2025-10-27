function showFeedback(message) {
    const box = document.getElementById('message-box');
    box.textContent = message;
    box.style.opacity = '0';
    box.style.display = 'block';
    

    setTimeout(() => box.style.opacity = '1', 10);
    

    setTimeout(() => {
        box.style.opacity = '0';
        setTimeout(() => box.style.display = 'none', 300);
    }, 3000);
}

let currentBlocks = [];


const PREFAB_BLOCKS = {

    'header_block': {
        name: 'Header with Logo/Branding',
        isCustom: false,
        fields: [
            { id: 'logoUrl', label: 'Logo Image URL', type: 'text', default: 'https://www.example.com'},
            { id: 'companyName', label: 'Company Name Text', type: 'text', default: 'Your Company' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td align="center" style="padding: 20px 0 10px 0; background-color: #ffffff;">
                    <a href="\${settings.website || '#'}" target="_blank">
                        <img src="\${fields.logoUrl}" width="150" alt="\${fields.companyName}" style="display: block; border: 0; max-width: 150px; height: auto;">
                    </a>
                </td>
            </tr>
        `
    },


    'text_header_block': {
        name: 'Header & Text Block',
        isCustom: false,
        fields: [
            { id: 'blockTitle', label: 'Block Title/H2', type: 'text', default: 'A Section Title' },
            { id: 'blockBody', label: 'Main Text Content', type: 'textarea', default: 'This is a paragraph of text content for this section. It can be edited by the user in the main editor.' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td style="padding: 30px 40px 20px 40px; color: #333333; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                    <h2 style="color: \${settings.brandcolor}; font-size: 20px; margin: 0 0 15px 0;">
                        \${fields.blockTitle || 'Block Title'}
                    </h2>
                    <p style="margin: 0;">
                        \${fields.blockBody ? fields.blockBody.replace(/\\n/g, '<br>') : 'Body placeholder...'}
                    </p>
                </td>
            </tr>
        `
    },
    

    'zoom_details_block': {
        name: 'Zoom/Meeting Details',
        isCustom: false,
        fields: [
            { id: 'meetingTopic', label: 'Meeting Topic', type: 'text', default: 'Q3 Strategy Review' },
            { id: 'meetingDate', label: 'Date/Time', type: 'text', default: 'Wednesday, October 27th @ 10:00 AM' },
            { id: 'meetingLink', label: 'Join Meeting URL', type: 'text', default: 'https:www.example.com'}
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td align="center" style="padding: 20px 40px;">
                    <table border="0" cellpadding="15" cellspacing="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                        <tr>
                            <td style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333;">
                                <p style="margin: 0 0 5px 0; font-weight: bold; color: \${settings.brandcolor};">Meeting Details:</p>
                                <p style="margin: 0 0 5px 0;">
                                    <strong>Topic:</strong> \${fields.meetingTopic}
                                </p>
                                <p style="margin: 0 0 10px 0;">
                                    <strong>When:</strong> \${fields.meetingDate}
                                </p>
                                <p style="margin: 0;">
                                    <a href="\${fields.meetingLink}" target="_blank" style="padding: 8px 15px; border-radius: 3px; font-family: Arial, sans-serif; font-size: 14px; color: #ffffff; text-decoration: none; display: inline-block; font-weight: bold; background-color: \${settings.brandcolor};">
                                        Join Zoom Call
                                    </a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        `
    },


    'cta_block': {
        name: 'Call to Action Button',
        isCustom: false,
        fields: [
            { id: 'logoUrl', label: 'Logo Image URL', type: 'text', default: 'https://placehold.co/150x50/3730a3/ffffff?text=LOGO' },
            { id: 'companyName', label: 'Company Name Text', type: 'text', default: 'Your Company' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td align="center" style="padding: 20px 40px;">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center" style="border-radius: 3px;" bgcolor="\${settings.brandcolor}">
                                <a href="\${fields.ctaLink || '#'}" target="_blank" style="padding: 12px 18px; border: 1px solid \${settings.brandcolor}; border-radius: 3px; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; display: inline-block; font-weight: bold;">
                                    \${fields.ctaText || 'CTA Button'}
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        `
    },


    'footer_block': {
        name: 'Footer (Legal/Unsub)',
        isCustom: false,
        fields: [
            { id: 'logoUrl', label: 'Logo Image URL', type: 'text', default: 'https://placehold.co/150x50/3730a3/ffffff?text=LOGO' },
            { id: 'companyName', label: 'Company Name Text', type: 'text', default: 'Your Company' }
        ],
        htmlGenerator: (fields, settings) => `
            <tr>
                <td bgcolor="#f4f4f4" style="padding: 20px 40px; text-align: center; color: #999999; font-family: Arial, sans-serif; font-size: 11px;">
                    <p style="margin-bottom: 5px;">
                        <a href="\${fields.unsubLink}" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
                    </p>
                    <p style="margin: 0;">
                        \${fields.legalText ? fields.legalText.replace(/\\n/g, '<br>') : 'Legal text placeholder...'}
                    </p>
                </td>
            </tr>
        `
    },


    'custom_code_block': {
        name: 'Custom HTML/Fields',
        isCustom: true,
        fields: [] 
    }
};

function renderBuilderUI() {
    const listContainer = document.getElementById('prefab-blocks-list');
    listContainer.innerHTML = ''; 


    for (const id in PREFAB_BLOCKS) {
        const block = PREFAB_BLOCKS[id];
        
        if (block.isCustom) {

            const customConfigDiv = document.getElementById('custom-block-config');
            if (customConfigDiv) customConfigDiv.classList.remove('hidden');

            const heading = document.createElement('h3');
            heading.className = 'text-lg font-semibold mb-3 text-gray-700 mt-6';
            heading.textContent = 'Advanced Block';
            listContainer.appendChild(heading);
            
        } else {
            const button = document.createElement('button');
            button.textContent = block.name;
            button.setAttribute('data-block-id', id);
            button.onclick = () => addPrefabBlock(id);
            button.className = 'block-button'; 
            listContainer.appendChild(button);
        }
    }
    
    renderCanvas();
    generateTemplateCode();
}

function addPrefabBlock(blockId) {
    const block = PREFAB_BLOCKS[blockId];
    if (block) {
        currentBlocks.push({ id: blockId, name: block.name, config: {} });
        renderCanvas();
        generateTemplateCode();
        showFeedback(`${block.name} added to template.`);
    }
}

function addCustomCodeBlock() {
    const customHtml = document.getElementById('custom-html-input').value.trim();
    const customFieldsJson = document.getElementById('custom-fields-json').value.trim();

    if (!customHtml) {
        showFeedback('Error: Custom HTML cannot be empty.');
        return;
    }

    let fields = [];
    try {
        if (customFieldsJson) {
            fields = JSON.parse(customFieldsJson);
            if (!Array.isArray(fields) || fields.some(f => !f.id || !f.label)) {
                 throw new Error('Fields must be a valid array of objects with "id" and "label".');
            }
        }
    } catch (e) {
        showFeedback('Error parsing JSON fields: ' + e.message);
        return;
    }

    currentBlocks.push({
        id: 'custom_code_block',
        name: 'Custom Block',
        config: {
            customHtml: customHtml,
            customFields: fields
        }
    });


    document.getElementById('custom-html-input').value = '';
    document.getElementById('custom-fields-json').value = '';
    
    renderCanvas();
    generateTemplateCode();
    showFeedback('Custom Code Block added to template.');
}

function removeBlock(index) {
    if (index >= 0 && index < currentBlocks.length) {
        const removedName = currentBlocks[index].name;
        currentBlocks.splice(index, 1);
        renderCanvas();
        generateTemplateCode();
        showFeedback(`Removed ${removedName} from template.`);
    }
}

function generatePreviewHtml() {


    const mockSettings = { brandcolor: '#4f46e5', fullname: 'Acme Corp', website: '#' };
    const mockFields = {
        logoUrl: 'https://www.example.com',
        companyName: 'Example',
        blockTitle: 'Live Preview Section',
        blockBody: 'This is a sample paragraph rendered using mock data for context. Your dynamic fields will replace these when the final template is used.',
        ctaText: 'View Details',
        ctaLink: '#',
        unsubLink: '#',
        legalText: '&copy; 2024 example',
        meetingTopic: 'Q4 Planning',
        meetingDate: 'Nov 1st, 9:00 AM',
        meetingLink: '#'
    };
    
    let blocksHtml = '';

    currentBlocks.forEach(blockMeta => {
        const blockDef = PREFAB_BLOCKS[blockMeta.id];
        let html;

        if (blockDef.isCustom) {

            html = blockMeta.config.customHtml;

            if (blockMeta.config.customFields) {
                blockMeta.config.customFields.forEach(field => {
                    const placeholderValue = mockFields[field.id] || field.default || `[${field.label}]`;
                    const regex = new RegExp(`{{\\s*${field.id}\\s*}}`, 'g');
                    html = html.replace(regex, placeholderValue);
                });
            }
        } else {

            html = blockDef.htmlGenerator(mockFields, mockSettings);
        }
        

        html = html.replace(/\$\{(.*?)\}/g, (match, p1) => {

            
            let value = '';

            if (p1.startsWith('settings.')) {
                const key = p1.split('.')[1];
                value = mockSettings[key] || '';

            } else if (p1.startsWith('fields.')) {
                const key = p1.split('.')[1];
                value = mockFields[key] || '';
            } else if (p1.includes('?')) {
                const parts = p1.split(/ \|\| | \?/);
                for(const part of parts) {
                    if (part.includes('fields.')) {
                        const key = part.split('.')[1];
                        if (mockFields[key]) {
                            value = mockFields[key];
                            break;
                        }
                    } else if (part.includes('settings.')) {
                         const key = part.split('.')[1];
                        if (mockSettings[key]) {
                            value = mockSettings[key];
                            break;
                        }
                    } else if (part.startsWith("'") || part.startsWith('"')) {
                        value = part.replace(/['"]/g, '');
                        break;
                    }
                }
            }

            if (p1.includes('.replace(/\\n/g, \'') && value) {
                return value.replace(/\n/g, '<br>');
            }
            return value; 
        });

        blocksHtml += html;
    });

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; padding: 0; background-color: #f3f4f6; }
                table { border-collapse: collapse; }
                
                a { color: inherit; text-decoration: none; }
            </style>
        </head>
        <body>
            
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            
                            ${blocksHtml}
                            
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
}

function renderCanvas() {
    const structureList = document.getElementById('template-structure-list');
    const iframe = document.getElementById('preview-iframe');
    structureList.innerHTML = ''; 

    if (currentBlocks.length === 0) {
                structureList.innerHTML = `
            <p class="text-center text-gray-500 py-10">
                Click a block on the left to start building.
            </p>
        `;
        iframe.srcdoc = '';
        return; 
    }
    currentBlocks.forEach((block, index) => {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center bg-gray-100 p-3 rounded-md border border-gray-200';
        div.innerHTML = `
            <span class="font-medium text-sm">${index + 1}. ${block.name}</span>
            <button onclick="removeBlock(${index})" class="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md transition duration-150">Remove</button>
        `;
        structureList.appendChild(div);
    });
    const previewHtml = generatePreviewHtml();
    iframe.srcdoc = previewHtml;
}

function generateTemplateCode() {
    const output = document.getElementById('template-output');
    if (currentBlocks.length === 0) {
        output.value = '// Add blocks to the canvas to generate code...';
        return;
    }

    let allFields = [];
    let fieldIds = new Set();
    let htmlGeneratorBody = '';
    currentBlocks.forEach(blockMeta => {
        const blockDef = PREFAB_BLOCKS[blockMeta.id];
        
        let blockFields = [];
        let blockHtmlGenerator = '';

        if (blockDef.isCustom) {
            blockFields = blockMeta.config.customFields || [];
            let userHtml = blockMeta.config.customHtml;
            userHtml = userHtml.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, p1) => `\${fields.${p1}}`);
            blockHtmlGenerator = userHtml;

        } else {
            blockFields = blockDef.fields;
            
            const generatorString = blockDef.htmlGenerator.toString();
            const match = generatorString.match(/\=\>\s*\`([\s\S]*)\`$/);
            if (match && match[1]) {
                blockHtmlGenerator = match[1].trim(); 
            }
        }
        blockFields.forEach(field => {
            if (!fieldIds.has(field.id)) {
                allFields.push(field);
                fieldIds.add(field.id);
            }
        });
        htmlGeneratorBody += blockHtmlGenerator;
    });

    const fieldsString = JSON.stringify(allFields, null, 4);
    const finalCode = `'custom_template_${Date.now()}': {
    name: 'Assembled Template (${new Date().toLocaleDateString()})',
    description: 'Template generated by the Block Builder.',
    isfavourite: false,
    custom: true,
    fields: ${fieldsString.replace(/"(\w+)":/g, '$1:')},
    htmlGenerator: (fields, settings) => \`
        
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                        
${htmlGeneratorBody}
                        
                    </table>
                </td>
            </tr>
        </table>
    \`
}`;

    output.value = finalCode;
}

function copyTemplateCode() {
    const output = document.getElementById('template-output');
    if (output.value && output.value.length > 0 && output.value !== '// Add blocks to the canvas to generate code...'){
        output.select();
        document.execCommand('copy');
        showFeedback('Template definition copied to clipboard! Ready to paste into your template list.');
    } else {
        showFeedback('Nothing to copy. Please add blocks first.');
    }
}