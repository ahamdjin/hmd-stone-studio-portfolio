# Breadcrumbs on project pages

Replace the "← All projects" back link on project detail pages with a breadcrumb trail.

## What changes

On `/project/:id`, above the project title:

```text
Work  /  Courtyard House
```

- "Work" links back to the homepage project grid; the current project name is plain text (not a link), marked as the current page.
- Styling follows the existing muted metadata style: small uppercase-adjacent grey text (`#666`) with white on hover for the link, separators in a dimmer grey.
- Keeps the same vertical position and spacing the back link occupied, so the page rhythm is unchanged.
- Touch target height stays at 44px minimum for the link.

## Technical notes

- Edit `src/pages/Project.tsx` only: swap the `<Link to="/">← All projects</Link>` block for a `<nav aria-label="Breadcrumb">` containing an ordered list, with `aria-current="page"` on the final item.
- No new dependency or shadcn breadcrumb component — a small inline markup block matches the site's hand-rolled component style.
- Optionally add a `BreadcrumbList` JSON-LD script on the project page for search engines (low cost, improves SERP display). Say if you'd rather skip it.
