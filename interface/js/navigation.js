function showPage(pageId) {
    const pages = {
        'builder': document.getElementById('builder-page'),
        'templates': document.getElementById('templates-page'),
        'settings': document.getElementById('settings-page')
    };

    Object.values(pages).forEach(page => page.classList.add('hidden-page'));

    if (pages[pageId]) {
        pages[pageId].classList.remove('hidden-page');

        if (pageId === 'builder') {
            populateTemplateLibrary();
        }
    }

    document.querySelectorAll('#nav-menu button').forEach(btn => btn.classList.remove('active-nav'));
    document.querySelector(`#nav-menu button[onclick="showPage('${pageId}')"]`).classList.add('active-nav');
    document.getElementById('template-library-sidebar').style.display = pageId === 'builder' ? 'block' : 'none';
}

function copyHtmlToClipboard() {
    const rawHtml = document.getElementById('email-preview-container').dataset.rawHtml;

    if (!rawHtml) {
        showNotification('warning', "No template has been selected yet, please select a template first.", 3000)
        return;
    }

    // The trick for Outlook/rich-text compatibility is to write to the clipboard
    // as both plain text and HTML.
    function listener(e) {
        e.clipboardData.setData("text/html", rawHtml);
        e.clipboardData.setData("text/plain", "Email content (view as HTML)");
        e.preventDefault();
    }

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);

    const button = document.getElementById('copy-html-btn');
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.backgroundColor = '#28a745';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '#5a287d';
    }, 1500);
}