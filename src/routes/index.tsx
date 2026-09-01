import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Minus, Plus, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageFrame, ServiceTicker, SiteFooter, SiteHeader } from "@/components/storefront-layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import heroAsset from "@/assets/synova-hero.jpg.asset.json";
import powerHeroAsset from "@/assets/power-hero.jpg.asset.json";
import campaignAsset from "@/assets/campaign.jpg.asset.json";
import headphonesAsset from "@/assets/headphones.jpg.asset.json";
import gr02Asset from "@/assets/gr02-holder.jpg.asset.json";
import gemanAsset from "@/assets/geman-powerbank.jpg.asset.json";
import hifastAsset from "@/assets/hifast-powerbank.jpg.asset.json";
import jcell103Asset from "@/assets/jcell-103.jpg.asset.json";
import jcell133Asset from "@/assets/jcell-133.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SYNOVA — Power Banks, Chargers & Mobile Accessories" },
      { name: "description", content: "Shop SYNOVA power banks, fast chargers, ear buds and mobile holders with disclosed authenticity and Cash on Delivery across Pakistan." },
      { property: "og:title", content: "SYNOVA — Power Banks, Chargers & Mobile Accessories" },
      { property: "og:description", content: "Shop SYNOVA power banks, fast chargers, ear buds and mobile holders with disclosed authenticity and Cash on Delivery across Pakistan." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: powerHeroAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: powerHeroAsset.url },
    ],
  }),
  component: Index,
});

const heroSlides = [
  {
    tag: "GaN Fast Charging",
    title: ["Maximum output.", "Zero thermal", "throttling."],
    text: "Compact GaN fast chargers built with intelligent temperature control for laptops, tablets, and phones.",
    cta: "Shop Fast Chargers",
    image: powerHeroAsset.url,
    alt: "Compact fast charger with braided cable on a dark surface",
  },
  {
    tag: "Desk & Everyday Power",
    title: ["Engineered for", "clean desks and", "heavy workloads."],
    text: "Precision-built mounts and high-capacity power banks rated for daily travel and long shifts.",
    cta: "Explore Desktop Gear",
    image: heroAsset.url,
    alt: "Editorial monochrome shot of premium mobile accessories",
  },
];

const categories = ["All", "Chargers", "Power Bank", "Ear buds", "Mobile Holder"] as const;

const products = [
  { name: "GR-02 (2-in-1 Semi-Automatic Dashboard & Air Vent Mobile Holder)", category: "Mobile Holder", price: "Rs. 1,999", was: "Rs. 2,499", image: gr02Asset.url },
  { name: "Geman GP-37 30000mAh 22.5W Supper Fast Charging Power Bank", category: "Power Bank", price: "Rs. 4,899", was: "Rs. 5,999", image: gemanAsset.url },
  { name: "HI-FAST HP-27 50,000mAh Ultra-Capacity Power Bank (66.5W Fast Charge)", category: "Power Bank", price: "Rs. 6,499", was: "Rs. 7,999", image: hifastAsset.url },
  { name: "J-Cell J-103 10,000mAh Portable Power Bank", category: "Power Bank", price: "Rs. 1,699", was: "Rs. 2,200", image: jcell103Asset.url },
  { name: "J-Cell J-133 10,000mAh Power System Specifications", category: "Power Bank", price: "Rs. 2,599", was: "Rs. 2,700", image: jcell133Asset.url },
];

const categoryCards = [
  { name: "Chargers", image: powerHeroAsset.url },
  { name: "Power Bank", image: gemanAsset.url },
  { name: "Ear buds", image: headphonesAsset.url },
  { name: "Mobile Holder", image: gr02Asset.url },
];

function Index() {
  const scope = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  useScrollReveal(scope);

  useEffect(() => {
    const id = window.setInterval(() => setSlide((value) => (value + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(id);
  }, []);

  const visible = useMemo(() => (filter === "All" ? products : products.filter((product) => product.category === filter)), [filter]);
  const active = heroSlides[slide]!;

  return (
    <PageFrame>
      <SiteHeader cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <main ref={scope}>
        <section className="relative overflow-hidden pt-24 md:pt-28">
          <div className="pointer-events-none absolute -left-40 top-10 size-[36rem] rounded-full bg-foreground/[0.07] blur-3xl" />
          <div className="section-shell grid items-center gap-10 pb-16 md:grid-cols-2 md:gap-14 md:pb-24">
            <div key={slide} className="animate-fade-in">
              <span className="inline-block rounded-full border border-foreground/25 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.2em]">{active.tag}</span>
              <h1 className="display-type mt-7 text-[clamp(3rem,11vw,7rem)]">
                {active.title.map((line, index) => <span key={line} className="block overflow-hidden"><span data-page-title className="block" style={{ animationDelay: `${index * 60}ms` }}>{line}</span></span>)}
              </h1>
              <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">{active.text}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button variant="editorial" size="editorial" asChild><a href="#products">{active.cta} <ArrowRight /></a></Button>
                <Button variant="editorialOutline" size="editorial" asChild><a href="#categories">Browse All</a></Button>
              </div>
              <div className="mt-10 flex gap-2">
                {heroSlides.map((item, index) => (
                  <button key={item.tag} type="button" aria-label={`Show ${item.tag}`} onClick={() => setSlide(index)} className={`h-[3px] w-12 transition-all duration-500 ${index === slide ? "bg-foreground" : "bg-foreground/25 hover:bg-foreground/60"}`} />
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-foreground/15">
              <img data-parallax src={active.image} alt={active.alt} width={1280} height={960} className="h-[320px] w-full scale-110 object-cover transition-transform duration-1000 md:h-[520px]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-transparent" />
            </div>
          </div>
          <div className="section-shell flex items-center gap-3 pb-10 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-muted-foreground"><ArrowDown className="soft-pulse size-4" /> Scroll to explore</div>
        </section>

        <ServiceTicker />

        <section id="products" className="section-shell py-20 md:py-28">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-foreground/20 pb-6">
            <div>
              <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">All Products</p>
              <h2 className="display-type text-6xl md:text-8xl">The full lineup</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category} type="button" onClick={() => setFilter(category)} className={`rounded-full border px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${filter === category ? "border-foreground bg-foreground text-background" : "border-foreground/25 hover:border-foreground hover:-translate-y-0.5"}`}>{category}</button>
              ))}
            </div>
          </div>

          <div data-stagger className="mt-12 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product, index) => (
              <article key={product.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card">
                  <img src={product.image} alt={product.name} width={1024} height={1280} loading="lazy" className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.16em] backdrop-blur">{product.category}</span>
                  <Button variant="editorial" size="icon" aria-label={`Add ${product.name} to bag`} onClick={() => { setCartCount((value) => value + 1); setCartOpen(true); }} className="absolute bottom-3 right-3 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"><Plus /></Button>
                </div>
                <h3 className="mt-5 text-sm font-bold leading-6">{product.name}</h3>
                <p className="mt-2 flex items-center gap-3 text-sm"><span>{product.price}</span><span className="text-xs text-muted-foreground line-through">{product.was}</span><span className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">0{index + 1}</span></p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
          <img data-parallax src={campaignAsset.url} alt="SYNOVA night campaign" width={1536} height={1024} loading="lazy" className="absolute -inset-y-[10%] h-[120%] w-full object-cover grayscale" />
          <div className="absolute inset-0 bg-background/55" />
          <div className="section-shell relative flex h-full flex-col justify-between py-14">
            <p data-reveal className="text-[0.62rem] font-bold uppercase tracking-[0.22em]">Campaign 001 / Power, disclosed</p>
            <div data-reveal><h2 className="display-type max-w-4xl text-[clamp(3.5rem,12vw,11rem)]">Charge different.</h2><Button variant="editorial" size="editorial" className="mt-8" asChild><a href="#categories">Shop by category <ArrowRight /></a></Button></div>
          </div>
        </section>

        <section id="categories" className="section-shell py-20 md:py-28">
          <p data-reveal className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">Shop by Category</p>
          <h2 data-reveal className="display-type mt-5 text-6xl md:text-8xl">Find your gear</h2>
          <div data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((category) => (
              <button key={category.name} type="button" onClick={() => { setFilter(category.name as (typeof categories)[number]); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }} className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-foreground/15 text-left">
                <img src={category.image} alt={category.name} width={800} height={1000} loading="lazy" className="size-full object-cover grayscale transition-all duration-[900ms] group-hover:scale-110 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="display-type text-4xl">{category.name}</h3>
                  <span className="mt-2 flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-all duration-300 group-hover:gap-4 group-hover:text-foreground">Shop now <ArrowRight className="size-3" /></span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="overflow-hidden border-y border-foreground/20 py-20 md:py-28">
          <div className="display-type w-max whitespace-nowrap text-[clamp(6rem,20vw,18rem)] text-foreground/10">Radical transparency — Radical transparency —</div>
          <div className="section-shell relative -mt-6 grid gap-10 md:-mt-14 md:grid-cols-2">
            <h2 data-reveal className="display-type text-6xl md:text-8xl">The label is the promise.</h2>
            <div data-reveal className="md:pt-10"><p className="text-lg leading-8 text-muted-foreground">Original or master copy — every listing states exactly what you receive, with clear specs and honest pricing.</p><div className="mt-9 grid grid-cols-2 gap-5 border-t border-foreground/20 pt-6 text-[0.62rem] font-bold uppercase tracking-[0.16em]"><span>01 / Checked by hand</span><span>02 / Honest grading</span><span>03 / Nationwide delivery</span><span>04 / WhatsApp support</span></div></div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <div className={`fixed inset-y-0 right-0 z-[80] w-full max-w-md border-l border-foreground/20 bg-background p-5 transition-transform duration-500 ${cartOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!cartOpen}>
        <div className="flex items-center justify-between border-b border-foreground/20 pb-5"><h2 className="text-xs font-bold uppercase tracking-[0.2em]">Your bag ({cartCount})</h2><Button variant="ghost" size="icon" aria-label="Close cart" onClick={() => setCartOpen(false)}><X /></Button></div>
        <div className="flex h-[calc(100%-5rem)] flex-col justify-between py-8">
          {cartCount === 0 ? (
            <div><p className="display-type text-5xl">Your bag is quiet.</p><p className="mt-4 text-sm text-muted-foreground">Add something worth carrying.</p></div>
          ) : (
            <div>
              <div className="flex gap-4"><img src={gemanAsset.url} alt="Geman GP-37 power bank" className="h-28 w-24 rounded-md object-cover" /><div className="flex flex-1 justify-between"><div><p className="text-sm font-bold">Selected items</p><p className="mt-1 text-xs text-muted-foreground">Cash on Delivery available</p><div className="mt-5 flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Remove one" onClick={() => setCartCount((value) => Math.max(0, value - 1))}><Minus /></Button><span className="text-sm">{cartCount}</span><Button variant="ghost" size="icon" aria-label="Add one" onClick={() => setCartCount((value) => value + 1)}><Plus /></Button></div></div></div></div>
              <p className="mt-8 border-t border-foreground/20 pt-5 text-xs text-muted-foreground">Checkout becomes available once a store is connected.</p>
            </div>
          )}
          <Button variant="editorial" size="editorial" disabled={cartCount === 0} className="w-full">Checkout <ArrowRight /></Button>
        </div>
      </div>
      {cartOpen && <button aria-label="Close cart overlay" className="fixed inset-0 z-[75] cursor-default bg-background/70 backdrop-blur-sm" onClick={() => setCartOpen(false)} />}
    </PageFrame>
  );
}
