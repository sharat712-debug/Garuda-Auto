import { Resend } from "resend";

const FROM = "Garuda Automotive <onboarding@resend.dev>";
const INK = "#171a1f";
const RED = "#d23a32";
const PAPER = "#f4f1ec";
const MUTED = "#6f675f";
const LINE = "#ece6df";

type Line = [label: string, value: string | number | boolean | null | undefined];

function shown(value: Line[1]) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textOf(lines: Line[]) {
  return lines.map(([label, value]) => `${label}: ${shown(value)}`).join("\n");
}

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

function button(href: string, label: string, background: string) {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;background:${background};color:#ffffff;text-decoration:none;font-family:Segoe UI,Arial,sans-serif;font-size:14px;font-weight:700;line-height:1;padding:13px 18px;border-radius:8px;">${escapeHtml(label)}</a>`;
}

function fieldCell(label: string, value: string) {
  const isEmail = label === "Email" && value.includes("@");
  const isPhone = label === "Phone";
  const safe = escapeHtml(value);
  const body = isEmail
    ? `<a href="mailto:${safe}" style="color:${INK};text-decoration:none;font-weight:650;">${safe}</a>`
    : isPhone
      ? `<a href="${escapeHtml(telHref(value))}" style="color:${INK};text-decoration:none;font-weight:650;">${safe}</a>`
      : `<span style="color:${INK};font-weight:650;">${safe}</span>`;
  return `<td width="50%" valign="top" style="padding:0 12px 16px 0;font-family:Segoe UI,Arial,sans-serif;">
    <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};font-weight:700;">${escapeHtml(label)}</div>
    <div style="margin-top:4px;font-size:15px;line-height:1.4;">${body}</div>
  </td>`;
}

function htmlOf(input: { eyebrow: string; lines: Line[] }) {
  const rows = input.lines.map(([label, value]) => ({ label, value: shown(value) }));
  const title = rows[0]?.value ?? "New enquiry";
  const service = rows.find((row) => row.label === "Service")?.value;
  const phone = rows.find((row) => row.label === "Phone")?.value;
  const email = rows.find((row) => row.label === "Email")?.value;
  const notes = rows.filter((row) => row.label === "Details" || row.label === "Message");
  const facts = rows.filter(
    (row) => row !== rows[0] && row.label !== "Service" && row.label !== "Details" && row.label !== "Message",
  );

  const factRows: string[] = [];
  for (let i = 0; i < facts.length; i += 2) {
    const left = fieldCell(facts[i].label, facts[i].value);
    const right = facts[i + 1] ? fieldCell(facts[i + 1].label, facts[i + 1].value) : `<td width="50%"></td>`;
    factRows.push(`<tr>${left}${right}</tr>`);
  }

  const noteBlocks = notes
    .map(
      (note) => `<tr><td style="padding:0 32px 20px;font-family:Segoe UI,Arial,sans-serif;">
        <div style="background:${PAPER};border-radius:12px;padding:16px 18px;">
          <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};font-weight:700;">${escapeHtml(note.label)}</div>
          <div style="margin-top:6px;font-size:15px;line-height:1.55;color:${INK};">${escapeHtml(note.value)}</div>
        </div>
      </td></tr>`,
    )
    .join("");

  const actions = [
    phone && phone !== "—" ? button(telHref(phone), `Call ${phone}`, RED) : "",
    email && email !== "—" ? button(`mailto:${email}`, "Reply by email", INK) : "",
  ]
    .filter(Boolean)
    .join(`<span style="display:inline-block;width:8px;">&nbsp;</span>`);

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:${PAPER};">
  <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(title)}${service ? ` — ${escapeHtml(service)}` : ""}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;">
        <tr><td style="background:${INK};padding:28px 32px 26px;font-family:Segoe UI,Arial,sans-serif;">
          <div style="font-size:13px;font-weight:800;letter-spacing:0.32em;color:${RED};">GARUDA</div>
          <div style="margin-top:5px;font-size:12px;font-weight:650;letter-spacing:0.24em;color:#f4f1ec;">AUTOMOTIVE</div>
          <div style="margin-top:22px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#b7b1aa;">${escapeHtml(input.eyebrow)}</div>
          <div style="margin-top:8px;font-size:28px;line-height:1.2;font-weight:750;color:#ffffff;">${escapeHtml(title)}</div>
          ${service ? `<div style="margin-top:14px;"><span style="display:inline-block;background:${RED};color:#ffffff;border-radius:999px;padding:6px 12px;font-size:12px;font-weight:700;letter-spacing:0.04em;">${escapeHtml(service)}</span></div>` : ""}
        </td></tr>
        <tr><td style="height:4px;background:${RED};font-size:0;line-height:0;">&nbsp;</td></tr>
        ${actions ? `<tr><td style="padding:24px 32px 8px;font-family:Segoe UI,Arial,sans-serif;">${actions}</td></tr>` : ""}
        <tr><td style="padding:20px 32px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${factRows.join("")}</table>
        </td></tr>
        ${noteBlocks}
        <tr><td style="padding:4px 32px 28px;border-top:1px solid ${LINE};font-family:Segoe UI,Arial,sans-serif;">
          <div style="padding-top:16px;font-size:12px;line-height:1.5;color:${MUTED};">Garuda Automotive · 9 Euphemia Street, Jimboomba QLD 4280<br>Sent from the website enquiry form. Reply goes to the customer.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Notifies the workshop after an enquiry is saved. A send failure is logged and does not throw. */
export async function sendEnquiryEmail(input: { subject: string; replyTo: string; eyebrow: string; lines: Line[] }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("enquiry email skipped: RESEND_API_KEY or ENQUIRY_TO_EMAIL is not set");
    return;
  }

  const resend = new Resend(apiKey);
  // The free Resend sender compares the inbox in lowercase.
  const { error } = await resend.emails.send({
    from: FROM,
    to: [to.trim().toLowerCase()],
    replyTo: input.replyTo,
    subject: input.subject,
    text: textOf(input.lines),
    html: htmlOf(input),
  });
  if (error) console.error("enquiry email failed", error);
}
