# Enhanced monochrome storefront

## Build
- Replace the placeholder home page with a complete black-and-white fashion/lifestyle storefront inspired by the supplied reference.
- Add an editorial hero, marquee, product collections, campaign imagery, category navigation, brand story, testimonial/social proof, newsletter, and compact footer.
- Use polished responsive layouts for mobile, tablet, and desktop, with accessible navigation and clear product actions.

## Motion and interaction
- Add GSAP-powered scroll reveals, text animation, pinned/parallax campaign moments, and a smooth scrolling experience with restrained timing and reduced-motion support.
- Add fast CSS hover interactions for navigation, product imagery, buttons, and cards without excessive filters or layout shifts.
- Keep animation transforms GPU-friendly and avoid the laggy always-running effects seen in the reference.

## Visual system
- Establish a strict black, white, and neutral token system with bold editorial typography, sharp image crops, compact radii, and strong contrast.
- Generate cohesive monochrome campaign/product imagery and serve it through the project asset flow.
- Preserve the requested dark-first experience while using white sections selectively for editorial rhythm.

## Technical details
- Implement in the existing TanStack Start home route and Tailwind v4 design system.
- Add GSAP only for scroll choreography; use CSS for immediate hover/focus transitions.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify the build and inspect the live page at desktop and mobile widths, including animation behavior and overflow.

## Commerce scope
- Build the full storefront experience with demo catalog content and interactions.
- Shopify connection was declined, so live catalog, inventory, cart, and checkout integration will remain unconnected until Shopify is enabled.
