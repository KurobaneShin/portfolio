import { parseWithZod } from "@conform-to/zod/v4";
import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "~/modules/contact";
import { resend } from "~/modules/resend.server";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

type Toast = { message: string; description: string };

export const sendContact = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    const submission = parseWithZod(data, { schema: contactSchema });

    if (submission.status !== "success") {
      return { reply: submission.reply() };
    }

    const { name, email, message } = submission.value;

    const from = "kurobane@peropero.site";
    const to = process.env.NODE_ENV !== "production"
      ? "delivered@resend.dev"
      : "icarofdiniz@gmail.com";

    const { error } = await resend.emails.send({
      from,
      to: [
        to,
      ],
      subject: "hire",
      html: `
    <div>
      <h1>Hi, my name is ${esc(name)}</h1>
      <p>Email: ${esc(email)}</p>
      <p>${esc(message)}</p>
    </div>
    `,
    });

    if (error) {
      console.error("resend", error);
      return { toast: { message: "Email not sent", description: "try again later" } as Toast };
    }

    return { toast: { message: "Email sent", description: "tank you for contacting me" } as Toast };
  });
