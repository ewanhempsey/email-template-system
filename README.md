# Email Template Builder

This application is a specialised tool designed for the rapid generation of customisable HTML-based email content. Its primary goal is to provide a fast, private, and portable solution for marketing and support teams who require consistent, branded email communication without relying on complex external services or server-side databases.

---

## Project Motivation and Benefits

The core philosophy of this builder is **simplicity and local data management**. By storing all configurations exclusively in your browser's local storage, we ensure:

* **Local Data:** No user data, branding details, or template settings are ever transmitted to a server.
* **High Performance:** Loading and updating templates is instantaneous as all required data and logic are already local.
* **Portability:** The application runs entirely within a single HTML file, making it easy to deploy or share.

---

## Core Features in Detail

The builder provides several mechanisms to create branded, ready-to-use email content:

### Customisation and Theming

* **Global Settings:** Users define five essential global variables:
    * **Full Name / Team Name:** Used in the signature block.
    * **Brand Colour (Hex):** Dynamically sets primary call-to-action (CTA) button colors and visual accents across all templates.
    * **Signature Line:** A configurable closing phrase (e.g., "Best regards,").
    * **Support URL:** A key link for customer-facing emails.
* **Theme Toggle:** A dedicated setting allows instant switching between **Light Mode** and **Dark Mode** for the application interface to ensure comfortable use in any environment.

### Template Management

* **Dynamic Placeholders:** Template content is plain HTML embedded with placeholders (e.g., `[Brand Color]`, `[Your Full Name]`). The JavaScript engine automatically replaces these tokens with your saved settings on every preview update.
* **Template Library:** The sidebar provides a quick, centralised view of all available templates.
* **Favourite Templates:** Templates can be marked as favourites using the star icon, which saves their preferred status locally and prioritises them visually.

---

## Data Architecture: Local Storage

Data persistence is handled exclusively using the browser's `localStorage` API. This architectural choice is central to maintaining user privacy and application speed.

### Data Stored

Data is stored under a single key (`emailBuilderSettings`) and includes:

* **User Settings:** All five defined global variables, plus the current theme state (`theme`).
* **Template Status:** An array containing the IDs of all templates marked as favourites (`favouriteTemplates`).
* **Session State:** The ID of the last template viewed (`currentTemplateId`).

### Data Reset Utility

The application includes a utility to perform a clean reset:

* This script clears the entire local storage for this domain and reloads the page, ensuring all custom settings and favourite lists are completely removed, restoring the application to its factory defaults.

---

## Detailed Usage Guide
### 1. Launcher
#### Overview
This application runs directly on your computer, so you need to run the launcher file every time you want to use the Email Builder. Running this file does two things:

1. It automatically checks GitLab to ensure you have the latest version of the code.

2. It opens the Email Builder's interface in your default web browser.

---
### Windows (Recommended Method)
1. Navigate to the main folder where you saved the Email Builder project.

2. Locate the file named LaunchBuilder.bat.

3. Double-click the LaunchBuilder.bat file.

A small black window (Command Prompt) will briefly appear, showing messages like "Checking for updates..." and "Update complete!". The Email Builder interface will then open automatically in your web browser.

### 2. Initial Setup

After opening `index.html`, immediately navigate to the **Settings** page.

| Setting Field | Purpose | Placeholders Affected |
| :--- | :--- | :--- |
| Your Full Name | Personal signature | `[Your Full Name]` |
| Brand Colour | Primary colour for CTAs | `[Brand Color]` |
| Signature Line | Closing text (e.g., "Sincerely") | `[Signature Line]` |
| Support Page URL | Link for users to get help | `[Support Page URL]` |
| Application Theme | Light/Dark mode for the builder UI | N/A |

Click **Save Settings** to apply changes and store them locally.

### 3. Template Selection and Preview

Select a template from the **Template Library** sidebar. The main editor panel will load the template, execute the placeholder replacement logic, and display the final, branded HTML output. This output is ready to be copied directly into your target email service.