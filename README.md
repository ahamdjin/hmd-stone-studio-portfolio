# HMD Stone — cinematic countertop website

React + TypeScript + Vite + Framer Motion. This project replaces the Lovable architecture-portfolio demo with a design-led, animated experience for **HMD Stone**, a countertop service business.

## Current pages
- Home — editorial intro, parallax image hero, ticker, manifesto, services, interactive material library, scroll-controlled horizontal inspiration exhibition, process timeline, conversion call to action.
- Services — installation and surface categories.
- Materials — interactive quartz, marble, quartzite, and granite **illustrative** studies.
- About — brand positioning without fictional staff, reviews, address, project counts, or years in business.
- Contact — a useful project-brief composer (copies to clipboard; **does not submit**).

## Animation and accessibility
- Framer Motion cinematic transitions, masks, spring-based magnetic CTA, clip reveal typography, scroll-linked images and progress.
- Sticky horizontal gallery on desktop; natural vertical gallery on narrow displays.
- Simplified experiences when the visitor enables *Reduce motion*.
- Mobile menu supports Escape, and auto-closes when navigating.

## Image collection
The active pages use 15 original AI-generated concept images, matched to the olive-black, bone and champagne palette. These are **not HMD Stone completed jobs** or exact supplier product samples. Optimized WebP assets are in `public/images/generated/`; full-resolution PNG originals, generation prompts and the asset manifest are in `output/imagegen/`. Preview all 15 at `/generated-gallery.html`. Existing concept-image disclosures remain visible.

## Go-live checklist
1. Approve the generated concept imagery or replace it with approved real project photography before presenting any image as completed HMD Stone work.
2. Confirm accurate business address, service areas, phone, email, business hours, services, and actual project images with HMD Stone. Do not add unverified claims.
3. Connect the contact form to a verified email or CRM endpoint (e.g. GoHighLevel), protect against spam, give real delivery/error feedback, add data-handling notice. Current form only copies a project brief.
4. Replace the concept material swatches with approved samples if representing specific products, and add care notes.
5. Add legal/privacy pages and update SEO metadata and social share image after final photography.
6. Run npm ci && npm run build, then test with real mobile devices, keyboard, and reduced-motion mode.

The old Lovable template components remain in the repository for reference but are **not used** by the new route tree. Remove them in a later cleanup pass after confirming the new design.
