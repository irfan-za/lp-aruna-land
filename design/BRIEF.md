# ARUNA LAND: image-only design review

## Scope and approval gate
Bos requested a fictional Indonesian premium housing/property development company template for jasawebsite.id, image previews BEFORE website implementation. Bos delegated brand/content decisions and APPROVED direction A, Garden Editorial. Two desktop raster compositions and a mobile composition were rendered with Pillow and visually inspected. The local Git repository is initialized on main and bos has created the empty GitHub repository. No website application has been scaffolded, no commits have been made, and nothing is deployed or listed.

## Working brief (inferred, not client facts)
1. Business: ARUNA LAND, fictional Indonesian housing developer and private-home design/build company.
2. Problem: buyers and landowners need to evaluate design quality and project execution before making contact.
3. Audience: Indonesian families seeking premium housing and landowners commissioning a private residence.
4. Differentiation: tropical architecture, considered space planning, transparent design/build process. These are positioning placeholders, not verified company claims.
5. Offer: project portfolio, housing development information, private site visit or consultation. No invented discounts or guarantees.
6. Outcome: understand project character and initiate a qualified conversation.
7. Proof: illustrative project portfolio only; no fabricated testimonials, awards, years, delivery counts or certifications.
8. Brand: architectural, calm, refined. Indonesian copy. Manrope typography, sharp rectangular controls, forest-green/stone palette for A or charcoal/sage for B.
9. Assets: Unsplash image URLs in asset-sources.json; geometric A wordmark. Brand/project names fictional. Stock images are illustrative, not documented company projects or verified Indonesian locations.
10. CTA: Jadwalkan Kunjungan; secondary intent Lihat Portofolio. Future consultation fields may include name, phone/WhatsApp, desired project and visit preference; not implemented.

## Directions
- A Garden Editorial (recommended): light stone/forest, split hero, asymmetric portfolio grid, design/build positioning, clear visit CTA.
- B Architectural Cinema: charcoal/sage, immersive photograph-led hero, project-index composition, clear visit CTA.
- A mobile: independent 430px-wide raster layout, not a tested responsive website. Desktop boards are 1440 x 2420.

## Deliverables
- aruna-a-garden-editorial.png
- aruna-b-architectural-cinema.png
- aruna-a-mobile.png
- aruna-a-first-screen.png
- aruna-b-first-screen.png
- aruna-comparison.png

## Approved implementation and continuation
- Framework: plain React + Vite with strict TypeScript, single-page application. No TanStack Start, SSR, or server functions for this project. The user's latest phrase "React Feed" is interpreted from their preceding explicit React/Vite request, not as a new package name.
- Styling: Tailwind CSS. Animation: Motion. Primitives: shadcn/ui. Package manager: pnpm only.
- Deploy: standalone static Cloudflare Pages, output dist/. No runtime is needed. Do not silently substitute the marketplace's shared Worker.
- Source: https://github.com/irfan-za/lp-aruna-land.git, already configured as origin. Branch main. SSH read access to the empty private repository succeeded with /home/zah/.ssh/id_ed25519. HTTPS currently has no username/token helper, so preserve the exact HTTPS origin and configure its push transport via SSH if needed, without exposing credentials.
- Source role: /home/zah/.hermes/profiles/nova/SOUL.md was updated at bos's explicit request to support React/Vite and TanStack Start according to requirements. The running session still contains the old framework-only rule; use a fresh session that loads the revised role before scaffolding the React/Vite app.
- Existing files: design assets only. Original JPEGs and Manrope font have been preserved in design/source-assets/. The Pillow renderer and its isolated .venv are cached under /home/zah/.hermes/profiles/nova/cache/scratch/aruna-concepts/. Provenance URLs are in design/asset-sources.json. Optimize images to WebP with responsive widths and self-host fonts.
- Tooling: /home/zah/.local/share/pnpm/bin/pnpm is available (11.15.0). Bare pnpm is not on PATH. pnpm-workspace.yaml requires allowBuilds as a map for esbuild on pnpm 11. Current host has roughly 4 GB RAM; avoid unrelated heavy builds and respect low-memory verification limits.
- Continue with production website implementation, automated verification, desktop/mobile visual QA, and static deployment. Keep fictional brand/project/photo disclaimers. Do not fabricate submission success or send demo leads to an arbitrary real phone number.
- Bos requested eventual publishing to main. Resolve any still-loaded conflicting PR workflow instruction before remote source writes. No listing POST without listing-summary approval.
