function formatText(command) {
    document.execCommand(command, false, null);
    updatePreview();
    updateToolbarState();
}

function formatLink() {
    const url = prompt('Enter the link URL:');
    if (url) {
        document.execCommand('createLink', false, url);
        updatePreview();
    }
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
        toolbar.style.width = `${currentEditingElement.offsetWidth-22}px`;
        console.log(currentEditingElement.offsetWidth)
        // Make it visible
        toolbar.style.visibility = 'visible';
        toolbar.style.opacity = '1';
        
        reserveMarginSpace(focusedElement, toolbarHeight + offset);
        
        updateToolbarState();
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