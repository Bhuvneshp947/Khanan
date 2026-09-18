import { createAPIFileRoute } from "@tanstack/react-start/api";

export const Route = createAPIFileRoute("/api/orders")({
  POST: async ({ request }) => {
    const { message, to } = (await request.json()) as { message?: string; to?: string };
    const apiKey = typeof process !== "undefined" ? process.env.RESEND_API_KEY : undefined;

    if (!apiKey || !message || to !== "bhuvneshp947@gmail.com") {
      return Response.json({ ok: false, error: "Order email service is not configured." }, { status: 503 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ORDER_EMAIL_FROM || "KHANAN Orders <onboarding@resend.dev>",
        to: [to],
        subject: "New KHANAN COD order",
        text: message,
      }),
    });

    if (!response.ok) return Response.json({ ok: false }, { status: 502 });
    return Response.json({ ok: true });
  },
});
