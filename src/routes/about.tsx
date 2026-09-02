import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Eye, Scale, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { PageFrame, ServiceTicker, SiteFooter, SiteHeader } from "@/components/storefront-layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "The SYNOVA Story — Built on Trust" },
    { name: "description", content: "Discover how SYNOVA is building transparent, accountable technology commerce in Pakistan." },
    { property: "og:title", content: "The SYNOVA Story — Built on Trust" },
    { property: "og:description", content: "Discover how SYNOVA is building transparent, accountable technology commerce in Pakistan." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

const principles = [
  { number: "01", icon: Eye, title: "Radical Transparency", text: "We tell you exactly what you are buying. Clear product information, honest labeling, and no hidden catches." },
  { number: "02", icon: Scale, title: "Accountability", text: "We take responsibility for the experience we provide and work to make things right when something goes wrong." },
  { number: "03", icon: ShieldCheck, title: "Respect", text: "We respect your money, your time, and your intelligence. That means giving you information you can actually trust." },
];

function AboutPage() {
  const scope = useRef<HTMLDivElement>(null);
  useScrollReveal(scope);
  return (
    <PageFrame>
      <SiteHeader />
      <main ref={scope}>
        <section className="section-shell flex min-h-[92svh] flex-col justify-end pb-12 pt-32 md:pb-20">
          <p data-reveal className="mb-7 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-muted-foreground">The SYNOVA Story</p>
          <h1 className="display-type overflow-hidden text-[clamp(4.5rem,14vw,13rem)]"><span data-page-title className="block">Built on trust.</span><span data-page-title className="block text-foreground/35">Designed for what</span><span data-page-title className="block text-foreground/35">comes next.</span></h1>
          <div data-reveal className="mt-12 flex items-center justify-between border-t border-foreground/20 pt-5"><p className="max-w-xl text-sm leading-6 text-muted-foreground">SYNOVA was created with a simple belief: buying technology accessories should not require guessing what you are actually getting.</p><ArrowDown className="soft-pulse hidden md:block" /></div>
        </section>
        <ServiceTicker />

        <section className="section-shell grid gap-12 py-24 md:grid-cols-[0.7fr_1.3fr] md:py-36">
          <p data-reveal className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">01 / Why SYNOVA exists</p>
          <div data-reveal><h2 className="display-type text-6xl md:text-8xl">We wanted to build something different.</h2><div className="mt-10 max-w-2xl space-y-6 text-base leading-8 text-foreground/70"><p>SYNOVA started with a simple idea: create an online shopping experience where customers can make decisions based on information they can actually understand and trust.</p><p>Technology accessories are everywhere, but knowing what you are really buying is not always simple. Similar-looking products can have very different quality, specifications, and authenticity. We believe customers deserve clarity instead of confusion.</p><p>That belief became the foundation of SYNOVA. We are building more than a storefront. We are building a technology-commerce brand where product information, authenticity, customer experience, and accountability matter.</p><p>Every part of SYNOVA is being built with the long term in mind — from the products we list to the way information is presented and the systems we create behind the website.</p></div></div>
        </section>

        <section className="bg-paper py-24 text-ink md:py-36">
          <div className="section-shell"><p data-reveal className="text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-50">02 / Our difference</p><h2 data-reveal className="display-type mt-8 max-w-5xl text-[clamp(4rem,11vw,10rem)]">Transparency is not a feature. It is our standard.</h2><p data-reveal className="mt-10 max-w-2xl text-lg leading-8 opacity-70">We do not want customers to feel like they need to become experts before buying an accessory. Our goal is to make the important information clear enough for anyone to understand.</p>
            <div data-reveal className="mt-20 border-y border-ink/25 py-10 md:flex md:items-end md:justify-between"><div><p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] opacity-50">The Authenticity Ledger</p><h3 className="display-type mt-4 max-w-2xl text-5xl md:text-7xl">A foundation for clearer product classification.</h3></div><div className="mt-8 space-y-3 text-sm font-bold uppercase md:mt-0"><p>01 — Clear product classification</p><p>02 — Honest product descriptions</p><p>03 — Better customer decisions</p></div></div>
          </div>
        </section>

        <section className="section-shell py-24 md:py-36"><p data-reveal className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">03 / What we stand for</p><h2 data-reveal className="display-type mt-6 text-6xl md:text-9xl">The principles behind SYNOVA</h2><div data-stagger className="mt-14 grid border-t border-foreground/20 md:grid-cols-3">{principles.map(({ number, icon: Icon, title, text }) => <article key={title} className="border-b border-foreground/20 py-9 md:border-r md:px-8 first:pl-0 last:border-r-0"><div className="flex items-center justify-between text-muted-foreground"><span className="text-xs">{number}</span><Icon className="size-5" /></div><h3 className="display-type mt-14 text-4xl">{title}</h3><p className="mt-5 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></section>

        <section className="overflow-hidden border-y border-foreground/20 py-24 md:py-36"><div className="display-type w-max -translate-x-[5%] whitespace-nowrap text-[clamp(7rem,20vw,18rem)] text-foreground/10">MORE THAN A STORE — MORE THAN A STORE —</div><div className="section-shell relative -mt-6 grid gap-10 md:-mt-16 md:grid-cols-2"><h2 data-reveal className="display-type text-6xl md:text-9xl">We are building the system behind the store.</h2><div data-reveal className="md:pt-14"><p className="text-lg leading-8 text-muted-foreground">The SYNOVA website is the beginning of a larger platform. We are continuously improving the way products are presented, discovered, purchased, delivered, and supported.</p><p className="mt-8 text-sm font-bold uppercase tracking-[0.18em]">Built for today. Designed to scale.</p></div></div></section>

        <section className="section-shell py-24 md:py-36"><div className="grid gap-12 md:grid-cols-2"><div><p data-reveal className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">04 / The people behind SYNOVA</p><h2 data-reveal className="display-type mt-6 text-6xl md:text-8xl">Built by people who believe trust comes first.</h2></div><div data-stagger className="grid grid-cols-2 gap-3 md:pt-10">{[["A", "Akash Arshad"], ["U", "Usama"]].map(([letter, name]) => <div key={name} className="border border-foreground/20 p-5"><div className="display-type flex aspect-square items-center justify-center bg-foreground text-8xl text-background">{letter}</div><h3 className="mt-5 text-sm font-bold">{name}</h3><p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Co-Founder</p></div>)}</div></div></section>

        <section className="bg-paper py-24 text-ink md:py-36"><div className="section-shell grid gap-12 md:grid-cols-[0.7fr_1.3fr]"><p data-reveal className="text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-50">05 / Where we're going</p><div data-reveal><h2 className="display-type text-7xl md:text-9xl">This is only the beginning.</h2><p className="mt-10 max-w-2xl text-lg leading-8 opacity-70">SYNOVA is being built with a long-term vision: to become a trusted technology and e-commerce brand. We are starting with mobile accessories, but the ambition goes much further.</p><p className="mt-6 max-w-2xl text-lg leading-8 opacity-70">Our goal is to create a reliable, transparent, customer-first digital commerce platform — one that earns trust through every product, every order, and every interaction.</p><p className="display-type mt-16 border-t border-ink/20 pt-8 text-5xl">SYNOVA—Built for the next generation of commerce.</p></div></div></section>
      </main>
      <SiteFooter />
    </PageFrame>
  );
}