const helpData = {
    overview: {
        title: "Getting Started & Basics",
        faqs: [
            { q: "What is the Email Template Builder?", a: "It's a simple tool that runs right in your browser to build great-looking, branded emails." },
            { q: "Do I need to be a coder to use this?", a: "Absolutely not! The builder uses a visual interface, so you don't need to write any code." },
            { q: "How do I start a new email?", a: "When you first open the app, navigate to the <b>Template Library</b>. Pick a template that suits your needs and you can begin populating your email." },
            { q: "Will my design look good on a phone?", a: "Yes. All the included blocks and sections are <b>mobile-responsive</b>, meaning they automatically adjust their layout for smaller screens." }
        ]
    },

    customisation: {
        title: "Personalising Your Design",
        faqs: [
            { q: "Where do I set my brand colours?", a: "Go to the <b>Settings</b> panel. Here you can set your <b>Brand Colour</b>, and other site-wide styles." },
            { q: "How do I change the signature?", a: "Go to the <b>Settings</b> panel. Here you can set your <b>Signature</b>" },
            { q: "How do I add my name?", a: "Go to the <b>Settings</b> panel. Here you can set your <b>Name</b>, It will only show on selected templates." },
        ]
    },

    building: {
        title: "Template Building & Editing",
        faqs: [
            { q: "How do I edit the text within a block?", a: "Simply click on the text you want to change on the left and type." },
            { q: "Not all boxes let me add formatting?", a: "Formatting is only enabled on certain fields, this is to maintain adherance to design standards." },
            { q: "Links go a strange colour.", a: "Link colours are set in the settings menu, you can change this at any time." },
            { q: "Can I add images?", a: "Not yet, we are looking at adding this soon." },
            { q: "Can I add links?", a: "Yes, you can use the link/unlink buttons to control links on supported fields." }
        ]
    },

    exporting: {
        title: "Exporting & Usage",
        faqs: [
            { q: "How do I get the final email?", a: "Click the <b>Copy</b> button. This will allow you to paste the template into your email provider." },
            { q: "Can I use this code in Outlook/Gmail/etc.?", a: "Yes. The exported email is ready to be pasted into the editor of most major email service providers (ESPs)." },
            { q: "My template looks wrong when I send it!", a: "Double-check that you've used <b>Keep Source Formatting</b> when pasting your email into your email service provider." }
        ]
    },

    developers: {
        title: "For Developers",
        faqs: [
            { q: "Why is the HTML code so long?", a: "Email clients require **inline CSS**. The builder takes the styling and embeds it directly into every relevant HTML tag to maximise compatibility across clients like Outlook and Gmail." },
            { q: "What does 'inline CSS' mean?", a: "It means styling rules are applied using the `style` attribute on individual HTML elements, rather than using `<style>` blocks or external stylesheets, which many email clients strip out." },
            { q: "Can I modify the app?", a: "Yes, feel free to make changes to your local version of the application such as adding new templates or features." },
            { q: "Can I add my own template?", a: "Yes, take a look at the templates.js file in the templates folder of the project, just be sure to set <b>custom</b> to <b>true</b>." },
        ]
    },

    faq: {
        title: "Frequently Asked Questions",
        faqs: [
            { q: "Where is my data stored?", a: "All data is stored in <b>localStorage</b> under the key <b>emailBuilderSettings</b>. Nothing is transmitted." },
            { q: "How do I reset everything?", a: "Use <b>Delete Site Data</b> in the settings menu to clear <b>localStorage</b> and restore all default settings and templates." },
            { q: "I lost my work! How do I recover it?", a: "The app offers no cloud-based recovery. Please avoid refreshing the page while working on a document." },
            { q: "How do I update the app?", a: "When you open the app using the email_template_system.bat it will update automatically. If you cant run this you should check GitLab for updates." }
        ]
    }
};

const categoryContainer = document.getElementById("helpCategories");
const faqContainer = document.getElementById("faqContainer");
const faqTemplate = document.getElementById("faqTemplate");
const helpTitle = document.getElementById("helpTitle");
const searchInput = document.getElementById("helpSearch");

let currentCategoryKey = null;

function buildCategoryButtons() {
    categoryContainer.innerHTML = "";
    Object.keys(helpData).forEach((key, index) => {
        const btn = document.createElement("button");
        btn.className = "help-category" + (index === 0 ? " active" : "");
        btn.dataset.category = key;
        btn.textContent = helpData[key].title;
        categoryContainer.appendChild(btn);
    });
}

function renderCategory(categoryKey) {
    const data = helpData[categoryKey];
    if (!data) return;
    currentCategoryKey = categoryKey;
    helpTitle.textContent = data.title;
    faqContainer.innerHTML = "";

    data.faqs.forEach(item => {
        const clone = faqTemplate.content.cloneNode(true);
        clone.querySelector(".faq-question").textContent = item.q;
        clone.querySelector(".faq-a").innerHTML = item.a;
        faqContainer.appendChild(clone);
    });

    attachFAQListeners();
}

function attachFAQListeners() {
    faqContainer.querySelectorAll(".faq-q").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".faq-item");
            item.classList.toggle("open");
        });
    });
}

categoryContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".help-category");
    if (!btn) return;
    categoryContainer.querySelectorAll(".help-category").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    renderCategory(btn.dataset.category);
});

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query.length === 0) {
        const activeBtn = categoryContainer.querySelector(".help-category.active");
        if (activeBtn) renderCategory(activeBtn.dataset.category);
        helpTitle.textContent = helpData[currentCategoryKey].title;
        return;
    }

    helpTitle.textContent = "Search Results";
    faqContainer.innerHTML = "";

    Object.keys(helpData).forEach(catKey => {
        const cat = helpData[catKey];
        cat.faqs.forEach(item => {
            const combinedText = (item.q + " " + item.a).toLowerCase();
            if (combinedText.includes(query)) {
                const clone = faqTemplate.content.cloneNode(true);
                clone.querySelector(".faq-question").textContent = item.q;
                clone.querySelector(".faq-a").innerHTML = item.a;

                const categoryLabel = document.createElement("div");
                categoryLabel.className = "faq-category-label";
                categoryLabel.textContent = cat.title;
                clone.querySelector(".faq-item").prepend(categoryLabel);

                faqContainer.appendChild(clone);
            }
        });
    });
    attachFAQListeners();
});

buildCategoryButtons();
const firstKey = Object.keys(helpData)[0];
renderCategory(firstKey);