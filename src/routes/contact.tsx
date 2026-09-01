import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, MapPin, MessageCircle } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { PageFrame, ServiceTicker, SiteFooter, SiteHeader } from "@/components/storefront-layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact SYNOVA — Product & Order Support" },
    { name: "description", content: "Contact SYNOVA for product advice, orders, warranties, availability and wholesale inquiries across Pakistan." },
    { property: "og:title", content: "Contact SYNOVA — Product & Order Support" },
    { property: "og:description", content: "Contact SYNOVA for product advice, orders, warranties, availability and wholesale inquiries across Pakistan." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  const scope = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  useScrollReveal(scope);
  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const body = `Hello SYNOVA,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "Not provided"}\n\n${form.message}`;
    window.open(`https://wa.me/923295480628?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
  };
  const field = (key: keyof typeof form) => ({ value: form[key], onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [key]: event.target.value })) });
  return (
    <PageFrame><SiteHeader /><main ref={scope}>
      <section className="section-shell min-h-[78svh] pt-36"><p data-reveal className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">Get in touch</p><h1 className="display-type mt-8 overflow-hidden text-[clamp(5rem,16vw,14rem)]"><span data-page-title className="block">We're here</span><span data-page-title className="block text-foreground/35">to help.</span></h1><p data-reveal className="ml-auto mt-10 max-w-xl text-base leading-7 text-muted-foreground">Have a question about a product, your order, availability, warranty, or wholesale pricing? Contact SYNOVA and our team will get back to you as quickly as possible.</p></section>
      <ServiceTicker />
      <section className="section-shell grid gap-16 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-36"><div data-reveal><p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Send us a message</p><h2 className="display-type mt-5 text-6xl md:text-8xl">Tell us what you need.</h2><p className="mt-5 text-sm text-muted-foreground">We'll help you find the right solution.</p><form onSubmit={sendMessage} className="mt-12 space-y-8"><div className="grid gap-8 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-[0.12em]">Name *<input {...field("name")} required placeholder="Your name" className="mt-3 block w-full border-b border-foreground/30 bg-transparent py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" /></label><label className="text-xs font-bold uppercase tracking-[0.12em]">Phone *<input {...field("phone")} required type="tel" placeholder="03XX XXXXXXX" className="mt-3 block w-full border-b border-foreground/30 bg-transparent py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" /></label></div><label className="block text-xs font-bold uppercase tracking-[0.12em]">Email (optional)<input {...field("email")} type="email" placeholder="you@example.com" className="mt-3 block w-full border-b border-foreground/30 bg-transparent py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" /></label><label className="block text-xs font-bold uppercase tracking-[0.12em]">How can we help? *<textarea {...field("message")} required rows={5} placeholder="Product question, order support, wholesale inquiry, warranty, availability, etc." className="mt-3 block w-full resize-none border-b border-foreground/30 bg-transparent py-3 text-sm font-normal leading-6 normal-case tracking-normal outline-none focus:border-foreground" /></label><Button type="submit" variant="editorial" size="editorial" className="w-full sm:w-auto">Send via WhatsApp <ArrowUpRight /></Button><p className="text-xs text-muted-foreground">Your message will open directly in WhatsApp for a faster response.</p></form></div>
        <aside data-stagger className="space-y-3 md:pt-24"><a href="https://wa.me/923295480628" className="group block border border-foreground/20 p-6 transition-colors hover:bg-foreground hover:text-background"><MessageCircle /><p className="mt-16 text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-60">WhatsApp support</p><p className="display-type mt-3 text-4xl">+92 329 5480628</p><p className="mt-5 flex items-center gap-2 text-xs font-bold uppercase">Chat with SYNOVA <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></p></a><div className="border border-foreground/20 p-6"><MapPin /><p className="mt-12 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Our location</p><p className="mt-3 text-lg font-bold">Islamabad Capital Territory, Pakistan</p><p className="mt-4 text-sm leading-6 text-muted-foreground">Serving Islamabad and Rawalpindi with delivery, while wholesale inquiries can be handled from across Pakistan.</p></div><div className="border border-foreground/20 p-6"><Clock3 /><p className="mt-12 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Customer support</p><p className="mt-3 text-lg font-bold">Available 24/7</p><p className="mt-4 text-sm text-muted-foreground">Send us a message anytime. We'll respond as soon as possible.</p></div></aside>
      </section>
      <section className="bg-paper py-24 text-ink"><div className="section-shell"><p data-reveal className="text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-50">What can we help with?</p><div data-stagger className="mt-10 grid border-t border-ink/25 text-xl font-bold md:grid-cols-2">{["Product information", "Order support", "Product availability", "Warranty questions", "Returns & exchanges", "Wholesale inquiries"].map((item, index) => <p key={item} className="border-b border-ink/25 py-6 md:px-5 first:pl-0"><span className="mr-5 text-xs opacity-40">0{index + 1}</span>{item}</p>)}</div></div></section>
    </main><SiteFooter /></PageFrame>
  );
}