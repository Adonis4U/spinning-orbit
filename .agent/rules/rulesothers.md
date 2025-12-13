---
trigger: always_on
---

## Committing & pull requests

- Break work into small, logical commits with descriptive messages.  Follow the **conventional commits** style if possible (`feat: add multi‑coupon support`, `fix: correct price display`).
- Before opening a PR, ensure that the project builds (`npm run build`), passes ESLint/TypeScript checks and formats via Prettier.
- A PR must include:
  1. clear description of changes. A summary of the changes and why they’re needed.
  2. Screenshots (or gifs) showing the feature on mobile, tablet and desktop.
  3. A checklist verifying that the change is responsive, translated, accessible and free of console errors.
  4. A second checklist: [ ] EN strings [ ] PL strings [ ] Lighthouse basic pass [ ] no console errors.
- Link the PR to its corresponding issue or task number when applicable.
