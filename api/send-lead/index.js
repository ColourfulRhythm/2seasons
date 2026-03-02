/**
 * Sends lead notifications to LEADS_EMAIL (default: godunderGod100@gmail.com)
 * Set in Vercel: RESEND_API_KEY, LEADS_EMAIL, FROM_EMAIL
 *
 * FROM_EMAIL must be from a domain verified in Resend (e.g. amara@2seasonsabk.store)
 * Sign up at resend.com, verify your domain, then add the API key.
 */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEADS_EMAIL || 'godunderGod100@gmail.com';
  const fromEmail = process.env.FROM_EMAIL || 'Amara <amara@2seasonsabk.store>';

  if (!apiKey) {
    return res.status(500).json({
      error: 'RESEND_API_KEY not set. Add it in Vercel Environment Variables.',
    });
  }

  const { name, email, phone, source = 'Amara Chat' } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({
      error: 'name, email, and phone are required',
    });
  }

  const html = `
    <h2>New 2 Seasons Lead — ${source}</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <hr>
    <p style="color:#666;font-size:12px">Sent by Amara chat on 2 Seasons</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New Lead: ${name} — 2 Seasons`,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Failed to send email',
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      error: err.message || 'Failed to send',
    });
  }
};
