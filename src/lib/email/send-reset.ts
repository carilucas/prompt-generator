import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(email: string, url: string) {
  await resend.emails.send({
    from: "Upwork prompt generator <onboarding@resend.dev>",
    to: email,
    subject: "Reset your Upwork prompt generator password",
    html: `
      <h2>Reset your password</h2>
      <p>Click the link below</p>
      <a href="${url}">Reset password</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
}