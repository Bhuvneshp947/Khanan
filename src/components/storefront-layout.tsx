import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, CreditCard, Menu, PackageCheck, ShieldCheck, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const tickerItems = [
  "Delivering to major cities across Pakistan",
  "Cash on Delivery or pay online & save",
  "Order confirmed on WhatsApp before dispatch",
  "7 Day Easy Replacement Guarantee",
];

export function ServiceTicker() {
  return (
    <div className="overflow-hidden border-y border-foreground/20 bg-foreground py-3 text-background">
      <div className="ticker-track flex w-max whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.18em]">
        {[0, 1].map((group) => (
          <div key={group} className="flex">
            {tickerItems.map((item) => <span key={`${group}-${item}`} className="flex items-center gap-8 px-8">{item}<span aria-hidden="true">✦</span></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader({ cartCount = 0, onCart }: { cartCount?: number; onCart?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [{ label: "Shop", to: "/" as const, hash: "products" }, { label: "About", to: "/about" as const }, { label: "Contact", to: "/contact" as const }];
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/15 bg-background/80 backdrop-blur-xl">
        <div className="section-shell flex h-16 items-center justify-between">
          <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" onClick={() => setMenuOpen(true)}><Menu /></Button>
          <Link to="/" className="display-type text-3xl">SYNOVA</Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-9 text-[0.68rem] font-bold uppercase tracking-[0.18em] md:flex">
            {links.map((link) => <Link key={link.label} to={link.to} hash={link.hash} activeProps={{ className: "opacity-50" }} className="transition-opacity hover:opacity-50">{link.label}</Link>)}
          </nav>
          {onCart ? (
            <Button variant="ghost" onClick={onCart} className="relative text-[0.65rem] font-bold uppercase tracking-[0.14em]">Bag {cartCount > 0 && <span>({cartCount})</span>}</Button>
          ) : <div className="w-16" />}
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-background p-4">
          <div className="flex items-center justify-between"><Link to="/" onClick={() => setMenuOpen(false)} className="display-type text-3xl">SYNOVA</Link><Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></Button></div>
          <nav className="mt-20 flex flex-col">{links.map((link) => <Link key={link.label} to={link.to} hash={link.hash} onClick={() => setMenuOpen(false)} className="display-type border-t border-foreground/20 py-5 text-6xl last:border-b">{link.label}</Link>)}</nav>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);
  const benefits = [
    { icon: ShieldCheck, title: "100% Authenticity", text: "Original & Master Copies clearly disclosed." },
    { icon: PackageCheck, title: "Nationwide Delivery", text: "Fast & reliable shipping across Pakistan." },
    { icon: CreditCard, title: "Secure Payments", text: "Cash on Delivery & Instant Online Pay." },
  ];
  return (
    <footer className="border-t border-foreground/20">
      <div className="section-shell grid border-b border-foreground/20 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 border-b border-foreground/20 py-8 md:border-b-0 md:border-r md:px-8 first:pl-0 last:border-r-0"><Icon className="mt-1 size-5 shrink-0" /><div><h3 className="text-xs font-bold uppercase tracking-[0.12em]">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p></div></div>)}
      </div>
      <div className="section-shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div><p className="display-type text-6xl">SYNOVA</p><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Premium mobile accessories built around radical transparency. We explicitly disclose product grade and authenticity details.</p></div>
        <div><p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Explore</p><div className="space-y-2 text-sm"><Link to="/" hash="products" className="block hover:opacity-50">All Products</Link><Link to="/about" className="block hover:opacity-50">About Us</Link><Link to="/contact" className="block hover:opacity-50">Contact Us</Link></div></div>
        <div><p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Customer care</p><div className="space-y-2 text-sm text-muted-foreground"><p>Privacy Policy</p><p>Terms & Conditions</p><p>Shipping Policy</p><p>Returns & Refunds</p><p>Warranty Policy</p></div></div>
        <div><p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.18em]">Stay updated</p><p className="mb-6 text-sm leading-6 text-muted-foreground">Subscribe to get special offers, free giveaways, and product release updates.</p>{subscribed ? <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"><CheckCircle2 className="size-4" /> Subscribed</p> : <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }} className="flex border-b border-foreground/40"><input required type="email" aria-label="Email address" placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground" /><Button type="submit" variant="ghost" size="icon" aria-label="Subscribe"><ArrowRight /></Button></form>}<div className="mt-8 text-xs leading-5"><p className="font-bold uppercase tracking-[0.12em]">Direct support</p><a href="https://wa.me/923295480628" className="mt-2 block text-muted-foreground hover:text-foreground">WhatsApp: +92 329 5480628</a><a href="mailto:synova.com.pk@gmail.com" className="block text-muted-foreground hover:text-foreground">synova.com.pk@gmail.com</a></div></div>
      </div>
      <div className="section-shell flex flex-col gap-2 border-t border-foreground/20 py-5 text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground md:flex-row md:justify-between"><span>© 2026 SYNOVA. All rights reserved.</span><span>Built on transparency. Designed for trust.</span></div>
    </footer>
  );
}

export function PageFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`min-h-screen bg-background text-foreground ${className}`}>{children}</div>;
}