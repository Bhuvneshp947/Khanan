import { useEffect, type RefObject } from "react";

export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!scope.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dispose = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (!scope.current) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.from("[data-page-title]", { yPercent: 110, duration: 0.7, ease: "power3.out", stagger: 0.04, clearProps: "all" });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 26,
            duration: 0.55,
            ease: "power2.out",
            delay: 0,
            clearProps: "all",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.from(Array.from(group.children), {
            opacity: 0,
            x: (index) => index % 2 === 0 ? -36 : 36,
            y: 18,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((image) => {
          gsap.to(image, {
            yPercent: 12,
            scale: 1.18,
            ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.7 },
          });
        });
        gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
          const headings = section.querySelectorAll("h2, h3");
          if (!headings.length) return;
          gsap.from(headings, {
            opacity: 0,
            yPercent: 18,
            duration: 0.55,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          });
        });
      }, scope);
      dispose = () => context.revert();
    });

    return () => dispose();
  }, [scope]);
}