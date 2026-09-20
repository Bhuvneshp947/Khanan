import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/orders")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { message, subject } = (await request.json()) as { message?: string; subject?: string };
        const apiKey = typeof process !== "undefined" ? process.env.RESEND_API_KEY : undefined;

        if (!message) return Response.json({ ok: false, error: "Message is required." }, { status: 400 });

        if (!apiKey) {
          const mailto = `mailto:novadinnovator@gmail.com?subject=${encodeURIComponent(subject || "New KHANAN message")}&body=${encodeURIComponent(message)}`;
          return Response.json({ ok: true, mailto, mode: "mailto" });
        }

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: process.env.ORDER_EMAIL_FROM || "KHANAN Orders <onboarding@resend.dev>",
            to: ["novadinnovator@gmail.com"],
            subject: subject || "New KHANAN message",
            text: message,
          }),
        });

        if (!response.ok) return Response.json({ ok: false }, { status: 502 });
        return Response.json({ ok: true });
      },
    },
  },
});
