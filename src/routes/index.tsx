import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Menu, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/synova-hero.jpg.asset.json";
import headphonesAsset from "@/assets/headphones.jpg.asset.json";
import watchAsset from "@/assets/watch.jpg.asset.json";
import campaignAsset from "@/assets/campaign.jpg.asset.json";

const heroImage = heroAsset.url;
const headphonesImage = headphonesAsset.url;
const watchImage = watchAsset.url;
const campaignImage = campaignAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SYNOVA — Verified Objects for Modern Life" },
      { name: "description", content: "Shop verified audio, watches and everyday objects with honest sourcing and fast delivery." },
      { property: "og:title", content: "SYNOVA — Verified Objects for Modern Life" },
      { property: "og:description", content: "Shop verified audio, watches and everyday objects with honest sourcing and fast delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  { name: "Studio One", category: "Audio / Original", price: "Rs. 24,900", image: headphonesImage },
  { name: "Field 01", category: "Time / Original", price: "Rs. 18,500", image: watchImage },
  { name: "Night Form", category: "Outerwear / Edition", price: "Rs. 12,800", image: heroImage },
];

function Index() {
  const scope = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!scope.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.from("[data-hero-line]", { yPercent: 115, duration: 1.05, stagger: 0.09, ease: "power4.out", delay: 0.15 });
        gsap.from("[data-hero-meta]", { opacity: 0, y: 18, duration: 0.8, stagger: 0.08, delay: 0.7 });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, { opacity: 0, y: 50, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%" } });
        });
        gsap.to("[data-parallax-image]", { yPercent: 12, ease: "none", scrollTrigger: { trigger: "[data-campaign]", start: "top bottom", end: "bottom top", scrub: 0.7 } });
        gsap.to("[data-story-word]", { xPercent: -18, ease: "none", scrollTrigger: { trigger: "[data-story]", start: "top bottom", end: "bottom top", scrub: 0.8 } });
      }, scope);
      cleanup = () => context.revert();
    });
    return () => cleanup();
  }, []);

  const addToCart = () => {
    setCartCount((value) => value + 1);
    setCartOpen(true);
  };

  return (
    <div ref={scope} className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/15 bg-background/75 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" onClick={() => setMenuOpen(true)}><Menu /></Button>
          <a href="#top" className="display-type text-3xl">SYNOVA</a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-[0.68rem] font-bold uppercase tracking-[0.18em] md:flex">
            <a className="transition-opacity hover:opacity-50" href="#shop">New arrivals</a>
            <a className="transition-opacity hover:opacity-50" href="#categories">Objects</a>
            <a className="transition-opacity hover:opacity-50" href="#story">Transparency</a>
          </nav>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
            <Button variant="ghost" size="icon" aria-label={`Cart with ${cartCount} items`} onClick={() => setCartOpen(true)} className="relative">
              <ShoppingBag />{cartCount > 0 && <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-foreground text-[0.55rem] text-background">{cartCount}</span>}
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[92svh] overflow-hidden pt-16">
          <img src={heroImage} alt="SYNOVA model wearing black technical outerwear and headphones" width={1536} height={1024} className="absolute inset-0 size-full object-cover object-[65%_center] opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent" />
          <div className="relative flex min-h-[calc(92svh-4rem)] flex-col justify-end px-4 pb-8 md:px-8 md:pb-12">
            <p data-hero-meta className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.26em] text-foreground/70">Issue 01 · Objects for modern life</p>
            <h1 className="display-type max-w-5xl overflow-hidden text-[clamp(3.45rem,18vw,13rem)] md:text-[clamp(5rem,15vw,13rem)]">
              <span className="block overflow-hidden"><span data-hero-line className="block">No smoke.</span></span>
              <span className="block overflow-hidden"><span data-hero-line className="block">Just substance.</span></span>
            </h1>
            <div data-hero-meta className="mt-7 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <p className="max-w-md text-sm leading-6 text-foreground/70">Original or master copy—we label everything exactly as it is. Considered objects, verified sourcing, zero theatre.</p>
              <Button variant="inverted" size="editorial" asChild><a href="#shop">Explore the drop <ArrowDown /></a></Button>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-foreground/20 py-3">
          <div className="ticker-track flex w-max whitespace-nowrap text-xs font-bold uppercase tracking-[0.22em]">
            {[0, 1].map((group) => <div key={group} className="flex">{["Verified authenticity", "Fast Peshawar delivery", "Pay when you receive", "No hidden claims"].map((item) => <span key={`${group}-${item}`} className="flex items-center gap-8 px-8">{item}<span aria-hidden="true">✦</span></span>)}</div>)}
          </div>
        </div>

        <section id="shop" className="px-4 py-20 md:px-8 md:py-28">
          <div data-reveal className="mb-10 flex items-end justify-between border-b border-foreground/20 pb-5">
            <div><p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Freshly verified</p><h2 className="display-type text-6xl md:text-8xl">New objects</h2></div>
            <span className="hidden text-xs uppercase tracking-[0.18em] md:block">01—03 / Selected</span>
          </div>
          <div className="grid gap-x-3 gap-y-14 md:grid-cols-3">
            {products.map((product, index) => (
              <article data-reveal key={product.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                  <img src={product.image} alt={product.name} width={1024} height={1280} loading="lazy" className="size-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
                  <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em]">0{index + 1}</span>
                  <Button variant="inverted" size="icon" aria-label={`Add ${product.name} to cart`} onClick={addToCart} className="absolute bottom-3 right-3 transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"><Plus /></Button>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div><h3 className="text-sm font-bold uppercase">{product.name}</h3><p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">{product.category}</p></div>
                  <p className="text-sm">{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section data-campaign className="relative h-[90svh] min-h-[620px] overflow-hidden">
          <img data-parallax-image src={campaignImage} alt="SYNOVA night campaign featuring two men in black streetwear" width={1536} height={1024} loading="lazy" className="absolute -inset-y-[12%] left-0 h-[124%] w-full object-cover grayscale" />
          <div className="absolute inset-0 bg-background/35" />
          <div className="relative flex h-full flex-col justify-between p-4 py-10 md:p-8 md:py-14">
            <p data-reveal className="text-[0.65rem] font-bold uppercase tracking-[0.22em]">Campaign 001 / After dark</p>
            <div data-reveal><h2 className="display-type max-w-5xl text-[clamp(4.5rem,13vw,12rem)]">Move different.</h2><Button variant="inverted" size="editorial" className="mt-7" asChild><a href="#categories">See the edit <ArrowRight /></a></Button></div>
          </div>
        </section>

        <section id="categories" className="bg-paper px-4 py-20 text-ink md:px-8 md:py-28">
          <p data-reveal className="mb-10 text-[0.65rem] font-bold uppercase tracking-[0.22em] opacity-60">Browse by instinct</p>
          {["Sound", "Time", "Carry", "Wear"].map((category, index) => (
            <a data-reveal key={category} href="#shop" className="group flex items-center justify-between border-t border-ink/25 py-4 last:border-b md:py-6">
              <span className="display-type text-6xl transition-transform duration-300 group-hover:translate-x-3 md:text-9xl">{category}</span>
              <span className="flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em]"><span>0{index + 1}</span><ArrowRight className="transition-transform group-hover:translate-x-2" /></span>
            </a>
          ))}
        </section>

        <section id="story" data-story className="overflow-hidden px-4 py-24 md:px-8 md:py-36">
          <div data-story-word className="display-type w-max whitespace-nowrap text-[clamp(7rem,22vw,20rem)] text-foreground/10">Radical transparency — Radical transparency —</div>
          <div className="relative -mt-8 grid gap-12 md:-mt-20 md:grid-cols-2">
            <h2 data-reveal className="display-type text-6xl md:text-9xl">The label is the promise.</h2>
            <div data-reveal className="max-w-lg md:pt-12"><p className="text-xl leading-8">We do not blur the line between original and reproduction. Every object is inspected, described and priced for what it actually is.</p><div className="mt-10 grid grid-cols-2 gap-6 border-t border-foreground/20 pt-5 text-[0.65rem] font-bold uppercase tracking-[0.16em]"><span>01 / Checked by hand</span><span>02 / Honest grading</span><span>03 / Local delivery</span><span>04 / Direct support</span></div></div>
          </div>
        </section>

        <section className="border-y border-foreground/20 px-4 py-20 md:px-8 md:py-28">
          <div data-reveal className="mx-auto max-w-5xl text-center"><p className="mb-8 text-5xl">“</p><blockquote className="display-type text-5xl leading-none md:text-8xl">Finally, a store that tells you exactly what you’re buying.</blockquote><p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Hamza K. · Verified buyer · Peshawar</p></div>
        </section>

        <section className="grid bg-paper text-ink md:grid-cols-2">
          <div className="border-b border-ink/20 p-6 py-16 md:border-b-0 md:border-r md:p-12 md:py-24"><p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-60">The dispatch</p><h2 className="display-type text-6xl md:text-8xl">Less noise.<br />Better objects.</h2></div>
          <div className="flex flex-col justify-end p-6 py-16 md:p-12 md:py-24"><p className="mb-8 max-w-md text-sm leading-6 opacity-70">Occasional new arrivals, sourcing notes and useful recommendations. No inbox clutter.</p>{submitted ? <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em]"><Check /> You’re on the list.</p> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="flex border-b border-ink"><input required type="email" aria-label="Email address" placeholder="EMAIL ADDRESS" className="min-w-0 flex-1 bg-transparent py-4 text-xs font-bold tracking-[0.16em] outline-none placeholder:text-ink/50" /><Button type="submit" variant="ghost" size="icon" aria-label="Join newsletter"><ArrowRight /></Button></form>}</div>
        </section>
      </main>

      <footer className="px-4 pb-6 pt-16 md:px-8"><div className="grid gap-10 border-b border-foreground/20 pb-12 md:grid-cols-3"><div><p className="display-type text-5xl">SYNOVA</p><p className="mt-3 text-xs text-muted-foreground">Peshawar, Pakistan</p></div><div className="grid grid-cols-2 gap-6 text-xs uppercase leading-7"><div><a href="#shop" className="block hover:opacity-50">Shop</a><a href="#story" className="block hover:opacity-50">About</a></div><div><a href="mailto:hello@synova.store" className="block hover:opacity-50">Contact</a><a href="#top" className="block hover:opacity-50">Instagram</a></div></div><p className="max-w-xs text-xs leading-5 text-muted-foreground md:justify-self-end">Original or master copy. Clearly labelled, carefully checked, delivered with confidence.</p></div><div className="flex justify-between pt-5 text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground"><span>© 2026 SYNOVA</span><span>Objects with nothing to hide</span></div></footer>

      {menuOpen && <div className="fixed inset-0 z-[70] bg-background p-4"><div className="flex items-center justify-between"><span className="display-type text-3xl">SYNOVA</span><Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></Button></div><nav className="mt-20 flex flex-col">{[["New arrivals", "#shop"], ["Objects", "#categories"], ["Transparency", "#story"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="display-type border-t border-foreground/20 py-5 text-6xl last:border-b">{label}</a>)}</nav></div>}

      <div className={`fixed inset-y-0 right-0 z-[80] w-full max-w-md border-l border-foreground/20 bg-background p-5 transition-transform duration-500 ${cartOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!cartOpen}>
        <div className="flex items-center justify-between border-b border-foreground/20 pb-5"><h2 className="text-xs font-bold uppercase tracking-[0.2em]">Your selection ({cartCount})</h2><Button variant="ghost" size="icon" aria-label="Close cart" onClick={() => setCartOpen(false)}><X /></Button></div>
        <div className="flex h-[calc(100%-5rem)] flex-col justify-between py-8">{cartCount === 0 ? <div><p className="display-type text-6xl">Your bag is quiet.</p><p className="mt-4 text-sm text-muted-foreground">Add something worth carrying.</p></div> : <div><div className="flex gap-4"><img src={headphonesImage} alt="Studio One headphones" className="h-28 w-24 object-cover" /><div className="flex flex-1 justify-between"><div><p className="text-sm font-bold uppercase">Studio One</p><p className="mt-1 text-xs text-muted-foreground">Black / Original</p><div className="mt-5 flex items-center gap-3"><Button variant="ghost" size="icon" onClick={() => setCartCount((value) => Math.max(0, value - 1))} aria-label="Remove one"><Minus /></Button><span className="text-sm">{cartCount}</span><Button variant="ghost" size="icon" onClick={() => setCartCount((value) => value + 1)} aria-label="Add one"><Plus /></Button></div></div><p className="text-sm">Rs. 24,900</p></div></div><div className="mt-8 border-t border-foreground/20 pt-5 text-xs uppercase tracking-[0.12em]"><div className="flex justify-between"><span>Delivery</span><span>Free</span></div><p className="mt-4 text-muted-foreground">Checkout becomes available when Shopify is connected.</p></div></div>}
          <Button variant="inverted" size="editorial" disabled={cartCount === 0} className="w-full">Checkout <ArrowRight /></Button>
        </div>
      </div>
      {cartOpen && <button aria-label="Close cart overlay" className="fixed inset-0 z-[75] cursor-default bg-background/70 backdrop-blur-sm" onClick={() => setCartOpen(false)} />}
    </div>
  );
}
