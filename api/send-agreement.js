const DEFAULT_TO = 'info@waterfrontretreatonpickwicklake.com';
const DEFAULT_FROM = 'Waterfront Retreat <onboarding@resend.dev>';

function clean(value, max = 200) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

export default async function handler(req, res) {
  const startedAt = Date.now();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error(JSON.stringify({
        level: 'error',
        message: 'Agreement email configuration is missing',
        route: '/api/send-agreement'
      }));
      return res.status(500).json({ error: 'Email service is not configured' });
    }

    const { pdfBase64, guestNames, dateOfStay } = req.body || {};
    const names = clean(guestNames) || 'Guest';
    const stayDate = clean(dateOfStay) || 'Not provided';

    if (typeof pdfBase64 !== 'string' || pdfBase64.length < 100) {
      return res.status(400).json({ error: 'A signed agreement PDF is required' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.AGREEMENT_EMAIL_FROM || DEFAULT_FROM,
        to: [process.env.AGREEMENT_EMAIL_TO || DEFAULT_TO],
        subject: `Signed Guest Agreement - ${names}`,
        html: `<h2>New signed guest agreement</h2><p><strong>Guest:</strong> ${escapeHtml(names)}</p><p><strong>Date of stay:</strong> ${escapeHtml(stayDate)}</p><p>The signed agreement is attached as a PDF.</p>`,
        attachments: [{
          filename: `Waterfront-Retreat-Guest-Agreement-${names.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'Guest'}.pdf`,
          content: pdfBase64
        }]
      })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error(JSON.stringify({
        level: 'error',
        message: 'Resend rejected agreement email',
        route: '/api/send-agreement',
        status: response.status,
        providerError: result && (result.message || result.name || result.error),
        durationMs: Date.now() - startedAt
      }));
      return res.status(502).json({ error: 'Unable to email agreement' });
    }

    console.log(JSON.stringify({
      level: 'info',
      message: 'Agreement email sent',
      route: '/api/send-agreement',
      emailId: result.id,
      durationMs: Date.now() - startedAt
    }));

    return res.status(200).json({ success: true, id: result.id });
  } catch (error) {
    console.error(JSON.stringify({
      level: 'error',
      message: 'Agreement email failed',
      route: '/api/send-agreement',
      error: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - startedAt
    }));
    return res.status(500).json({ error: 'Unable to email agreement' });
  }
}
