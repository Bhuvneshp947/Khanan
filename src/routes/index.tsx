import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, MapPin, Minus, Plus, User, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { type FormEvent } from "react";
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
import portronicsAdaptoImage from "@/assets/portronics-adapto-66.jpg";
import samsungChargerImage from "@/assets/samsung-40w-charger.jpg";
import noiseBudsImage from "@/assets/noise-buds-x2.jpg";
import portronicsBudsImage from "@/assets/portronics-twins-32.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KHANAN — Power Banks, Chargers & Mobile Accessories" },
      { name: "description", content: "Shop SYNOVA power banks, fast chargers, ear buds and mobile holders with disclosed authenticity and Cash on Delivery across Pakistan." },
      { property: "og:title", content: "KHANAN — Power Banks, Chargers & Mobile Accessories" },
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
  {
    tag: "Wireless, uninterrupted",
    title: ["Clear calls.", "Deep sound.", "All day power."],
    text: "Smart wireless earbuds with clear microphones, quick charging, and a fit designed for every part of your day.",
    cta: "Shop Ear Buds",
    image: noiseBudsImage,
    alt: "Black true wireless earbuds floating above their charging case",
  },
];

const categories = ["All", "Chargers", "Power Bank", "Ear buds", "Mobile Holder"] as const;

const products = [
  { name: "GR-02 (2-in-1 Semi-Automatic Dashboard & Air Vent Mobile Holder)", category: "Mobile Holder", price: "Rs. 1,999", amount: 1999, was: "Rs. 2,499", image: gr02Asset.url, details: "Secure dashboard and air-vent mounting with quick one-hand adjustment." },
  { name: "Geman GP-37 30000mAh 22.5W Supper Fast Charging Power Bank", category: "Power Bank", price: "Rs. 4,899", amount: 4899, was: "Rs. 5,999", image: gemanAsset.url, details: "High-capacity portable power with 22.5W fast charging for long days." },
  { name: "HI-FAST HP-27 50,000mAh Ultra-Capacity Power Bank (66.5W Fast Charge)", category: "Power Bank", price: "Rs. 6,499", amount: 6499, was: "Rs. 7,999", image: hifastAsset.url, details: "Ultra-capacity backup power with up to 66.5W fast charging." },
  { name: "J-Cell J-103 10,000mAh Portable Power Bank", category: "Power Bank", price: "Rs. 1,699", amount: 1699, was: "Rs. 2,200", image: jcell103Asset.url, details: "Compact everyday backup power in a travel-ready form." },
  { name: "J-Cell J-133 10,000mAh Power System Specifications", category: "Power Bank", price: "Rs. 2,599", amount: 2599, was: "Rs. 2,700", image: jcell133Asset.url, details: "A compact 10,000mAh charging system for dependable daily use." },
  { name: "Portronics Adapto 66 (2.4A Dual USB Wall Charger)", category: "Chargers", price: "₹299.00", amount: 299, image: portronicsAdaptoImage, brand: "Portronics", details: "Dual USB ports charge two standard devices at once; includes a 1M micro-USB cable." },
  { name: "Samsung 40W Type A & Type C 2-Port Fast Charger", category: "Chargers", price: "Rs. 2,999", amount: 2999, image: samsungChargerImage, brand: "Samsung", details: "Dual fast charging up to 25W on Type-C and 15W on Type-A, with built-in safety protection." },
  { name: "Noise Buds X2 Truly Wireless Bluetooth Earbuds", category: "Ear buds", price: "₹1,799", amount: 1799, image: noiseBudsImage, brand: "Noise", details: "Long battery life, quad microphones for clear calls, and fast charging." },
  { name: "Portronics Harmonics Twins 32 In-Ear TWS Smart Earbuds with HD Mic", category: "Ear buds", price: "₹772", amount: 772, image: portronicsBudsImage, brand: "Portronics", details: "Bluetooth 5.4, touch controls, HD microphone, and water resistance." },
];

type Product = (typeof products)[number];
type CartLine = { product: Product; quantity: number };
type Customer = { name: string; email: string; phone: string; address: string; city: string };

const categoryCards = [
  { name: "Chargers", image: powerHeroAsset.url },
  { name: "Power Bank", image: gemanAsset.url },
  { name: "Ear buds", image: headphonesAsset.url },
  { name: "Mobile Holder", image: gr02Asset.url },
];

const trustCards = [
  { title: "100% Genuine", text: "Verified Product", number: "01" },
  { title: "1 Year", text: "Brand Warranty", number: "02" },
  { title: "Packaging Video", text: "See Your Product", number: "03" },
  { title: "Fast Delivery", text: "All Over Pakistan", number: "04" },
];

function Index() {
  const scope = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [accountMode, setAccountMode] = useState<"signin" | "signup">("signup");
  const [customer, setCustomer] = useState<Customer>(() => {
    if (typeof window === "undefined") return { name: "", email: "", phone: "", address: "", city: "" };
    try { return JSON.parse(window.localStorage.getItem("synova-customer") || "null") || { name: "", email: "", phone: "", address: "", city: "" }; } catch { return { name: "", email: "", phone: "", address: "", city: "" }; }
  });
  useScrollReveal(scope);

  useEffect(() => {
    const id = window.setInterval(() => setSlide((value) => (value + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(id);
  }, []);

  const visible = useMemo(() => (filter === "All" ? products : products.filter((product) => product.category === filter)), [filter]);
  const active = heroSlides[slide]!;
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cart.reduce((total, line) => total + line.product.amount * line.quantity, 0);
  const addToCart = (product: Product) => {
    setCart((lines) => {
      const existing = lines.find((line) => line.product.name === product.name);
      return existing ? lines.map((line) => line.product.name === product.name ? { ...line, quantity: line.quantity + 1 } : line) : [...lines, { product, quantity: 1 }];
    });
    setSelectedProduct(null);
    setCartOpen(true);
  };
  const changeQuantity = (productName: string, amount: number) => setCart((lines) => lines.map((line) => line.product.name === productName ? { ...line, quantity: line.quantity + amount } : line).filter((line) => line.quantity > 0));
  const beginCheckout = () => { setSelectedProduct(null); setCartOpen(false); setCheckoutOpen(true); setOrderDone(false); };
  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem("synova-customer", JSON.stringify(customer));
    const orderLines = cart.map(({ product, quantity }) => `${product.name} | Qty: ${quantity} | Price: ${product.price}`).join("\n");
    const message = `New KHANAN COD Order\n\nCustomer: ${customer.name}\nEmail: ${customer.email}\nDelivery phone: ${customer.phone}\nAddress: ${customer.address}, ${customer.city}\n\nProducts:\n${orderLines}\n\nTotal: Rs. ${cartTotal.toLocaleString()}\nPayment: Cash on Delivery`;
    void fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to: "bhuvneshp947@gmail.com", message }) }).catch(() => undefined);
    window.open(`https://wa.me/923299780675?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setOrderDone(true);
  };

  return (
    <PageFrame>
      <SiteHeader cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <main ref={scope}>
        <section className="relative overflow-hidden pt-24 md:pt-28">
          <div className="section-shell grid items-center gap-10 pb-16 md:grid-cols-2 md:gap-14 md:pb-24">
            <div key={`copy-${slide}`} className="hero-copy-enter">
              <span className="inline-block rounded-full border border-foreground/25 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.2em]">{active.tag}</span>
              <h1 className="display-type mt-7 text-[clamp(3rem,11vw,7rem)]">
                {active.title.map((line) => <span key={line} className="block overflow-hidden"><span data-page-title className="block">{line}</span></span>)}
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
            <div key={`media-${slide}`} className="hero-media-enter relative overflow-hidden rounded-2xl border border-foreground/15">
              <img data-parallax src={active.image} alt={active.alt} width={1280} height={960} className="h-[320px] w-full scale-110 object-cover md:h-[520px]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-transparent" />
            </div>
          </div>
          <div className="section-shell flex items-center gap-3 pb-10 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-muted-foreground"><ArrowDown className="soft-pulse size-4" /> Scroll to explore</div>
        </section>

        <ServiceTicker />

        <section className="section-shell py-12 md:py-16">
          <div data-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustCards.map((card) => <article key={card.number} className="trust-card group relative overflow-hidden rounded-2xl border border-foreground/15 bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-foreground/60 hover:bg-foreground hover:text-background"><span className="text-[0.6rem] font-bold tracking-[0.2em] opacity-50">{card.number}</span><h2 className="display-type mt-12 text-4xl">{card.title}</h2><p className="mt-3 text-xs uppercase tracking-[0.16em] opacity-60">{card.text}</p><div className="mt-8 h-px w-8 bg-current transition-all duration-500 group-hover:w-full" /></article>)}
          </div>
        </section>

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
              <article key={product.name} className="group cursor-pointer" onClick={() => setSelectedProduct(product)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedProduct(product); }} role="button" tabIndex={0}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card">
                  <img src={product.image} alt={product.name} width={1024} height={1280} loading="lazy" className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.16em] backdrop-blur">{product.category}</span>
                  <Button variant="editorial" size="icon" aria-label={`Add ${product.name} to bag`} onClick={(event) => { event.stopPropagation(); addToCart(product); }} className="absolute bottom-3 right-3 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"><Plus /></Button>
                </div>
                {product.brand && <p className="mt-5 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">{product.brand}</p>}
                <h3 className={`${product.brand ? "mt-2" : "mt-5"} text-sm font-bold leading-6`}>{product.name}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{product.details}</p>
                <p className="mt-3 flex flex-wrap items-center gap-3 text-sm"><span>{product.price}</span>{product.was && <span className="text-xs text-muted-foreground line-through">{product.was}</span>}<span className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">0{index + 1}</span></p>
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
          <div className="ticker-track flex w-max whitespace-nowrap text-[clamp(6rem,20vw,18rem)] text-foreground/10" aria-hidden="true">
            {[0, 1].map((group) => <span key={group} className="display-type shrink-0">Radical transparency — Radical transparency — </span>)}
          </div>
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
            <div className="overflow-y-auto">
              {cart.map(({ product, quantity }) => <div key={product.name} className="flex gap-3 border-b border-foreground/15 py-4 first:pt-0"><img src={product.image} alt={product.name} className="h-20 w-16 rounded-md object-cover" /><div className="min-w-0 flex-1"><p className="text-sm font-bold leading-5">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.price}</p><div className="mt-3 flex items-center gap-3"><Button variant="ghost" size="icon" aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(product.name, -1)}><Minus /></Button><span className="text-sm">{quantity}</span><Button variant="ghost" size="icon" aria-label={`Add one ${product.name}`} onClick={() => changeQuantity(product.name, 1)}><Plus /></Button></div></div></div>)}
            </div>
          )}
          <div className="border-t border-foreground/20 pt-5"><div className="mb-5 flex items-center justify-between text-sm font-bold"><span>Total</span><span>Rs. {cartTotal.toLocaleString()}</span></div><Button variant="editorial" size="editorial" disabled={cartCount === 0} onClick={beginCheckout} className="w-full">Checkout <ArrowRight /></Button></div>
        </div>
      </div>
      {cartOpen && <button aria-label="Close cart overlay" className="fixed inset-0 z-[75] cursor-default bg-background/70 backdrop-blur-sm" onClick={() => setCartOpen(false)} />}

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Product details">
          <div className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl border border-foreground/20 bg-card md:grid-cols-2">
            <button type="button" aria-label="Close product details" onClick={() => setSelectedProduct(null)} className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-background/80 transition-transform hover:rotate-90"><X className="size-4" /></button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="h-72 w-full object-cover md:h-full" />
            <div className="p-7 md:p-10"><p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">{selectedProduct.brand || selectedProduct.category}</p><h2 className="display-type mt-4 text-5xl">{selectedProduct.name}</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">{selectedProduct.details}</p><p className="mt-7 text-2xl font-bold">{selectedProduct.price}</p>{selectedProduct.was && <p className="mt-1 text-xs text-muted-foreground line-through">{selectedProduct.was}</p>}<div className="mt-8 grid gap-3"><Button variant="editorial" size="editorial" onClick={() => addToCart(selectedProduct)}>Add to cart <Plus /></Button><Button variant="editorialOutline" size="editorial" onClick={() => { addToCart(selectedProduct); setCartOpen(false); setCheckoutOpen(true); }}>Buy now <ArrowRight /></Button></div></div>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-background/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Checkout">
          <div className="relative w-full max-w-2xl rounded-2xl border border-foreground/20 bg-card p-6 md:p-9">
            <button type="button" aria-label="Close checkout" onClick={() => setCheckoutOpen(false)} className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full transition-transform hover:rotate-90"><X className="size-4" /></button>
            {orderDone ? <div className="py-12 text-center"><div className="mx-auto flex size-16 items-center justify-center rounded-full bg-foreground text-background"><Check /></div><h2 className="display-type mt-7 text-6xl">Order started.</h2><p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">We saved your details and will confirm your order on WhatsApp before dispatch. Our delivery partner will call you on {customer.phone}.</p><Button variant="editorial" size="editorial" className="mt-8" onClick={() => { setCheckoutOpen(false); setCart([]); }}>Done <Check /></Button></div> : <form onSubmit={submitOrder}>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Secure checkout</p><h2 className="display-type mt-3 text-6xl">Complete order</h2>
              <div className="mt-7 flex gap-2 border-b border-foreground/15 pb-3"><button type="button" className={`text-xs font-bold uppercase tracking-[0.14em] ${accountMode === "signup" ? "opacity-100" : "text-muted-foreground"}`} onClick={() => setAccountMode("signup")}>Sign up</button><span className="text-muted-foreground">/</span><button type="button" className={`text-xs font-bold uppercase tracking-[0.14em] ${accountMode === "signin" ? "opacity-100" : "text-muted-foreground"}`} onClick={() => setAccountMode("signin")}>Sign in</button></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-[0.12em]">Full name<input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} className="mt-2 w-full border-b border-foreground/25 bg-transparent px-0 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" placeholder="Your name" /></label><label className="text-xs font-bold uppercase tracking-[0.12em]">Email<input required type="email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} className="mt-2 w-full border-b border-foreground/25 bg-transparent px-0 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" placeholder="you@example.com" /></label><label className="text-xs font-bold uppercase tracking-[0.12em]">Delivery phone<input required type="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} className="mt-2 w-full border-b border-foreground/25 bg-transparent px-0 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" placeholder="03XX XXXXXXX" /></label><label className="text-xs font-bold uppercase tracking-[0.12em]">City<input required value={customer.city} onChange={(event) => setCustomer({ ...customer, city: event.target.value })} className="mt-2 w-full border-b border-foreground/25 bg-transparent px-0 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" placeholder="Lahore" /></label><label className="text-xs font-bold uppercase tracking-[0.12em] sm:col-span-2">Complete address<textarea required value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} className="mt-2 min-h-20 w-full resize-none border-b border-foreground/25 bg-transparent px-0 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" placeholder="House, street, area" /></label></div>
              <div className="mt-8"><p className="text-xs font-bold uppercase tracking-[0.12em]">Payment method</p><div className="mt-3 flex items-center gap-3 rounded-xl border border-foreground bg-foreground p-4 text-background"><MapPin className="size-5" /><span><strong className="block text-sm">Cash on delivery (COD)</strong><small className="opacity-70">Pay our delivery partner when your order arrives</small></span></div></div>
              <div className="mt-8 flex items-center justify-between border-t border-foreground/20 pt-5"><div><p className="text-xs text-muted-foreground">Total to pay</p><p className="text-xl font-bold">Rs. {cartTotal.toLocaleString()}</p></div><Button variant="editorial" size="editorial" type="submit">Place COD order <ArrowRight /></Button></div><p className="mt-4 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground"><User className="size-3" /> Your address is saved securely on this device for faster checkout.</p>
            </form>}
          </div>
        </div>
      )}
    </PageFrame>
  );
}
