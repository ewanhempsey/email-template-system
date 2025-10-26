const TEMPLATES = {
    'announcement': {
        name: 'General Announcement',
        description: 'A formal announcement with a main headline and call to action.',
        isfavourite: true,
        custom: false,
        fields: [
            { id: 'headline', label: 'Main Headline', type: 'text', default: 'Important Company Update' },
            { id: 'body', label: 'Main Body Content', type: 'textarea', default: 'We are pleased to announce a significant update. Please review the details below.' },
            { id: 'ctaText', label: 'Button Text (Call to Action)', type: 'text', default: 'Read More Here' },
            { id: 'ctaLink', label: 'Button Link URL', type: 'text', default: 'https://example.com/details' }
        ],
        htmlGenerator: (fields, settings) => `
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center" style="padding: 20px 0;">
                                <table width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                                    <tr>
                                        <td bgcolor="${settings.brandcolor}" style="padding: 30px 20px; text-align: center; color: #ffffff; font-size: 24px; font-weight: bold;">
                                            ${fields.headline || 'Headline Placeholder'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 30px 20px; color: #333333; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                                            <p>${fields.body ? fields.body.replace(/\n/g, '<br>') : 'Body placeholder...'}</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center" style="padding: 0 20px 20px 20px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="${settings.brandcolor}">
                                                        <a href="${fields.ctaLink || '#'}" target="_blank" style="padding: 12px 18px; border: 1px solid ${settings.brandcolor}; border-radius: 3px; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; display: inline-block; font-weight: bold;">
                                                            ${fields.ctaText || 'CTA Button'}
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 20px; color: #555555; font-family: Arial, sans-serif; font-size: 14px; line-height: 18px;">
                                            <p style="margin-bottom: 5px;">${settings.signature || 'Best regards,'}</p>
                                            <p style="margin: 0; font-weight: bold;">${settings.firstname || 'Your Name'}</p>
                                            <p style="margin: 0; font-size: 12px;">${settings.team || 'Your Team'} | ${settings.role || 'Your Role'}</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td bgcolor="#f4f4f4" style="padding: 20px; text-align: center; color: #999999; font-family: Arial, sans-serif; font-size: 11px;">
                                            Need help? Visit our <a href="${settings.supportpage || '#'}" style="color: #999999;">Support Page</a>.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                `
    },
    'status': {
        name: 'Quick Status Update',
        description: 'A simple update with a bulleted list of key items.',
        isfavourite: false,
        custom: false,
        fields: [
            { id: 'subject', label: 'Email Subject Line', type: 'text', default: 'Weekly Project Status' },
            { id: 'intro', label: 'Introduction Paragraph', type: 'textarea', default: 'Here is a quick summary of our progress this week:' },
            { id: 'listItems', label: 'Key Items (One per line)', type: 'textarea', default: '- Item one\n- Item two\n- Item three' }
        ],
        htmlGenerator: (fields, settings) => {
            const items = (fields.listItems || '').split('\n').filter(l => l.trim() !== '');
            const listHtml = items.map(item => `<li style="margin-bottom: 10px;">${item.replace(/^- /, '').trim()}</li>`).join('');

            return `
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    <table width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-left: 5px solid ${settings.brandcolor};">
                                        <tr>
                                            <td style="padding: 30px 20px; color: #333333; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                                                <h3 style="color: #333333; margin-top: 0;">${fields.subject || 'Subject Placeholder'}</h3>
                                                <p>${fields.intro ? fields.intro.replace(/\n/g, '<br>') : 'Intro placeholder...'}</p>
                                                <ul style="padding-left: 20px; margin-top: 15px;">
                                                    ${listHtml}
                                                </ul>

                                                <p style="margin-top: 30px; margin-bottom: 5px;">${settings.signature || 'Best regards,'}</p>
                                                <p style="margin: 0; font-weight: bold;">${settings.firstname || 'Your Name'}</p>
                                                <p style="margin: 0; font-size: 12px;">${settings.team || 'Your Team'} | ${settings.role || 'Your Role'}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    `;
        }
    },
    'customer_reply': {
        name: 'Customer Service Reply',
        description: 'A clean, branded template for responding directly to customer inquiries.',
        isfavourite: true,
        custom: false,
        fields: [
            { id: 'customerName', label: 'Customer Name', type: 'text', default: 'Valued Customer' },
            { id: 'querySummary', label: 'Query Summary/Topic', type: 'text', default: 'your recent problem' },
            { id: 'responseBody', label: 'Detailed Response', type: 'textarea', default: "I'd be happy to assist you with this! [Insert resolution or information here. Use short paragraphs.]" },
            { id: 'agentName', label: 'Agent Name (Override Signature)', type: 'text', default: '' }
        ],
        htmlGenerator: (fields, settings) => `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: ${settings.brandcolor};">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                        
                        <tr>
                            <td style="padding: 30px 30px 10px 30px;">
                                <h1 style="font-family: Arial, sans-serif; font-size: 24px; color: ${settings.brandcolor}; margin: 0; font-weight: bold;">
                                    A Response From ${settings.team || 'Your Company Name'}
                                </h1>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 10px 30px 30px 30px; color: #333333; font-family: Arial, sans-serif; font-size: 15px; line-height: 22px;">
                                <p style="margin: 0 0 20px 0; font-size: 16px; font-weight: bold;">
                                    Hi ${fields.customerName || 'there'},
                                </p>
                                
                                <p style="margin: 0 0 20px 0;">
                                    Thank you for reaching out regarding ${fields.querySummary || 'your recent inquiry'}. I'm happy to help!
                                </p>
                                
                                <p style="margin: 0 0 20px 0;">
                                    ${fields.responseBody ? fields.responseBody.replace(/\n/g, '<br>') : 'Response placeholder...'}
                                </p>
                                
                                <p style="margin: 0 0 0 0;">
                                    If you have any further questions, please feel free to reply to this email.
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 20px 30px; border-top: 1px solid #eeeeee; color: #333333; font-family: Arial, sans-serif; font-size: 14px;">
                                <p style="margin-bottom: 5px;">Best regards,</p>
                                <p style="margin: 0; font-weight: bold;">
                                    ${fields.agentName || settings.firstname || 'Agent Name'}
                                </p>
                                <p style="margin: 0; font-size: 12px; color: #777777;">
                                    <p style="margin: 0; font-size: 12px;">${settings.team || 'Your Team'} | ${settings.role || 'Your Role'}</p>
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td bgcolor="#f4f4f4" style="padding: 10px 30px; text-align: center; color: #999999; font-family: Arial, sans-serif; font-size: 11px;">
                                <p style="margin: 0;">
                                    This is a direct reply to your message.
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    `
    },
    'meeting': {
        name: 'Meeting Invite',
        description: 'A simple meeting update with key details.',
        isfavourite: false,
        custom: true,
        fields: [
            { id: 'subject', label: 'Email Subject Line', type: 'text', default: 'Weekly Project Status' },
            { id: 'intro', label: 'Introduction Paragraph', type: 'textarea', default: 'Here is a quick summary of our progress this week:' },
            { id: 'agendaItems', label: 'Agenda Items (One per line)', type: 'textarea', default: '- Item one\n- Item two\n- Item three' },
            { id: 'eventDate', label: 'Event Date', type: 'date', default: '01/01/25' },
            { id: 'eventTime', label: 'Event Time', type: 'time', default: '09:00am' },
            { id: 'Location', label: 'Location', type: 'text', default: 'Zoom - 123 456 7890' }
        ],
        htmlGenerator: (fields, settings) => {
            const items = (fields.agendaItems || '').split('\n').filter(l => l.trim() !== '');
            const listHtml = items.map(item => `<li style="margin-bottom: 10px;">${item.replace(/^- /, '').trim()}</li>`).join('');

            return `
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    <table width="600" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #ffffff; border-left: 5px solid ${settings.brandcolor};">
                                        <tr>
                                            <td style="padding: 30px 20px; color: #333333; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                                                <h3 style="color: #333333; margin-top: 0;">${fields.subject || 'Subject Placeholder'}</h3>
                                                <p>${fields.intro ? fields.intro.replace(/\n/g, '<br>') : 'Intro placeholder...'}</p>
                                                <ul style="padding-left: 20px; margin-top: 15px;">
                                                    ${listHtml}
                                                </ul>

                                                <p style="margin-top: 30px; margin-bottom: 5px;">${settings.signature || 'Best regards,'}</p>
                                                <p style="margin: 0; font-weight: bold;">${settings.firstname || 'Your Name'}</p>
                                                <p style="margin: 0; font-size: 12px;">${settings.team || 'Your Team'} | ${settings.role || 'Your Role'}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    `;
        }
    }
};