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
        gsap.from("[data-page-title]", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.08 });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 42,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.from(Array.from(group.children), {
            opacity: 0,
            y: 36,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 84%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((image) => {
          gsap.to(image, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.7 },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-campaign]").forEach((section) => {
          const image = section.querySelector("img");
          const copy = section.querySelector("h2");
          if (!image || !copy) return;
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 85%", end: "bottom 20%", scrub: 0.8 },
          });
          timeline.fromTo(image, { scale: 1.16 }, { scale: 1.03, ease: "none" }, 0)
            .fromTo(copy, { yPercent: 35, opacity: 0.25 }, { yPercent: 0, opacity: 1, ease: "none" }, 0);
        });
      }, scope);
      dispose = () => context.revert();
    });

    return () => dispose();
  }, [scope]);
}