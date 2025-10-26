function formatText(command) {
    document.execCommand(command, false, null);
    updatePreview();
}

function formatLink() {
    const rawUrl = prompt('Enter the link URL:');
    if (!rawUrl) return;

    let finalUrl = rawUrl.trim();
    const hasProtocol = /^https?:\/\//i.test(finalUrl);
    if (!hasProtocol && finalUrl.length > 0) {
        finalUrl = 'https://' + finalUrl;
    }

    const settings = loadSettings();
    const linkColor = settings.linkcolor || '#0070e0';

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    const linkElement = document.createElement('a');
    linkElement.href = finalUrl;
    linkElement.style.color = linkColor;
    linkElement.style.fontWeight = "bold";

    try {
        range.surroundContents(linkElement);
    } catch (e) {
        console.error("Failed to surround contents, inserting link element instead:", e);
        range.deleteContents();
        range.insertNode(linkElement);
    }
    
    updatePreview();
}

function formatUnlink() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    let linkElement = range.commonAncestorContainer;
    
    while (linkElement && linkElement.nodeName !== 'A') {
        if (linkElement.contentEditable === 'true') {
            linkElement = null;
            break; 
        }
        linkElement = linkElement.parentNode;
    }
    
    if (linkElement && linkElement.nodeName === 'A') {
        selection.removeAllRanges();
        
        const linkRange = document.createRange();
        linkRange.selectNodeContents(linkElement);
        
        const linkText = linkElement.textContent;
        
        linkRange.selectNode(linkElement);
        linkRange.deleteContents();
        
        const textNode = document.createTextNode(linkText);
        linkRange.insertNode(textNode);
        
        selection.addRange(linkRange);
    }
    
    updatePreview();
}

let toolbarHideTimeout;
let currentEditingElement = null;

function showToolbar() {
    clearTimeout(toolbarHideTimeout);

    const toolbar = document.getElementById('formatting-toolbar');
    const focusedElement = document.activeElement;

    if (currentEditingElement && currentEditingElement !== focusedElement) {
        clearMarginReservation(currentEditingElement);
    }

    if (focusedElement && focusedElement.contentEditable === 'true') {
        currentEditingElement = focusedElement;

        const formPanel = document.getElementById('form-panel');
        const formPanelRect = formPanel.getBoundingClientRect();
        const elementRect = focusedElement.getBoundingClientRect();

        const toolbarHeight = 45;
        const offset = 2;

        const topPosition = elementRect.top - formPanelRect.top - toolbarHeight - offset;
        const leftPosition = elementRect.left - formPanelRect.left;

        toolbar.style.top = `${topPosition}px`;
        toolbar.style.left = `${leftPosition}px`;
        toolbar.style.width = `${currentEditingElement.offsetWidth - 22}px`;
        toolbar.style.visibility = 'visible';
        toolbar.style.opacity = '1';
        reserveMarginSpace(focusedElement, toolbarHeight + offset);

    }
}

function hideToolbar() {
    clearTimeout(toolbarHideTimeout);

    toolbarHideTimeout = setTimeout(() => {
        const toolbar = document.getElementById('formatting-toolbar');

        toolbar.style.visibility = 'hidden';
        toolbar.style.opacity = '0';

        if (currentEditingElement) {
            clearMarginReservation(currentEditingElement);
        }

        currentEditingElement = null;
    }, 200);
}

function reserveMarginSpace(activeElement, spaceNeeded) {
    const activeGroup = activeElement.closest('.input-group');
    if (!activeGroup) return;

    const nextGroup = activeGroup.nextElementSibling;
    if (typeof nextElementMargin === "undefined") { nextElementMargin = null };
    if (nextGroup && nextGroup.classList.contains('input-group')) {
        if (nextElementMargin === null) {
            nextElementMargin = nextGroup.style.marginTop;
        }
        nextGroup.style.marginTop = `${spaceNeeded}px`;
    }
}

function clearMarginReservation(lastActiveElement) {
    const lastActiveGroup = lastActiveElement.closest('.input-group');
    if (!lastActiveGroup || nextElementMargin === null) return;

    const nextGroup = lastActiveGroup.nextElementSibling;

    if (nextGroup && nextGroup.classList.contains('input-group')) {
        nextGroup.style.marginTop = nextElementMargin;
        nextElementMargin = null;
    }
}

function formatTextWithValue(command, value) {
    document.execCommand(command, false, value);
    updatePreview();
}