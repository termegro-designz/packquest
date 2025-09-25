// Vercel Serverless Function: /api/contact
// Erwartet JSON-Body: { name, email, telefon, leistung, nachricht, origin }
// Benötigt ENV: RESEND_API_KEY (optional: MAIL_TO, MAIL_FROM)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const mailTo = process.env.MAIL_TO || 'packquest1@gmail.com';
    const mailFrom = process.env.MAIL_FROM || 'onboarding@resend.dev';

    const { name, email, telefon, leistung, nachricht, origin } = req.body || {};

    // Honeypot-Unterstützung (falls im Body): bots füllen oft zusätzliche Felder
    if (req.body && typeof req.body.website === 'string' && req.body.website.trim() !== '') {
      return res.status(200).json({ ok: true }); // bewusst still
    }

    if (!name || (!email && !telefon)) {
      return res.status(400).json({ error: 'Bitte Name und mind. E-Mail oder Telefon angeben.' });
    }

    const subject = `Neue Anfrage – ${name}${leistung ? ' · ' + String(leistung) : ''}`;

    const lines = [
      `Name: ${name}`,
      `E-Mail: ${email || '—'}`,
      `Telefon: ${telefon || '—'}`,
      `Leistung: ${leistung || '—'}`,
      `Nachricht: ${nachricht || '—'}`,
      `Quelle: ${origin || 'Website'}`,
      `Zeit: ${new Date().toLocaleString('de-AT')}`
    ];

    const text = lines.join('\n');
    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;">
        <h2 style="margin:0 0 8px;">Neue Website-Anfrage</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(email || '—')}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(telefon || '—')}</p>
        <p><strong>Leistung:</strong> ${escapeHtml(leistung || '—')}</p>
        <p><strong>Nachricht:</strong><br>${escapeHtml(nachricht || '—').replace(/\n/g, '<br>')}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0;" />
        <p style="color:#555;font-size:12px;">
          Quelle: ${escapeHtml(origin || 'Website')}<br />
          Zeit: ${escapeHtml(new Date().toLocaleString('de-AT'))}
        </p>
      </div>`;

    if (!apiKey) {
      return res.status(500).json({ error: 'E-Mail-Service nicht konfiguriert (RESEND_API_KEY fehlt).' });
    }

    // Resend REST API verwenden (kein zusätzliches npm-Paket nötig)
    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [mailTo],
        subject,
        text,
        html
      })
    });

    if (!sendRes.ok) {
      const errText = await sendRes.text();
      return res.status(502).json({ error: 'E-Mail Versand fehlgeschlagen', details: errText });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Interner Fehler', details: String(e && e.message ? e.message : e) });
  }
}

function escapeHtml(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
