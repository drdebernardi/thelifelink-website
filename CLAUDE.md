# Notes for Claude

This is The Life Link's website (Astro static site, deployed on Vercel from GitHub `main`). People who work on it are not developers. They make changes by asking Claude. Explain things in plain language and keep it short.

## Who can change what

- **Dr. Michael DeBernardi (CEO, owner):** anything on the site. He approves every change before it goes live.
- **HR Director:** only these files.
  - `src/data/jobs.json` (job postings)
  - `src/data/news.json` (press items on the Events & News page)
  - `src/data/newsletter.json` plus images in `public/assets/newsletters/` (the newsletter section)
  - new images in `public/assets/news/`
- If anyone asks for a change outside their files, do not make it. Say it needs Dr. DeBernardi's approval and offer to write the request for him.

## How a change gets made

1. Edit only the data files. Read the `_help` line at the top of each file first.
2. Check the JSON is valid (for example `python3 -m json.tool src/data/jobs.json`). If you can run it, also run `npm run build`; it must finish with no errors.
3. Do NOT commit or push. The person reviews the changes in GitHub Desktop, commits to a new branch, and opens a pull request. Dr. DeBernardi reviews the Vercel preview and merges. Vercel then publishes in about a minute.
4. Dr. DeBernardi can commit to `main` directly when he is the one asking.

## Job postings (`src/data/jobs.json`)

- To add a posting, copy a whole job object (from `{` to `}`) and change the words. Give it a new unique `id` (lowercase, dashes).
- To hide a posting, set `"active": false`. To remove it, delete it. With no active postings the page shows a "no open positions" message.
- `applyUrl` is where the Apply button goes. Never guess it. Ask.
- In `paragraphs`, `**bold**` makes bold text.
- `showWellbeing` shows the "A Workplace That Values Your Well-Being" band.
- The equal opportunity text is in `legal` at the top of the file. Do not change it without Dr. DeBernardi's approval.

## Rules

- Always write "The Life Link".
- Official address: 2000 St. Michael's Drive, Santa Fe, NM 87505. Flag any page showing 2325 Cerrillos Road.
- Never invent facts, names, pay, dates, requirements, stats, phone numbers, emails or links. Ask.
- Never put client names or any health or private information on the site.
- Never put secrets (tokens, keys, passwords) in the repo. Use Vercel environment variables.
- Flag problems rather than silently deleting content.
- 505getfree.org is a separate site. Link to it, do not merge it.

## Where things live

- `src/data/site.ts`: address, phone, donate link, social links, contact form address, main menu.
- `src/data/*.json`: page content. `jobs.json`, `news.json`, `newsletter.json`, `home.json`, `about.json`, `programs.json`, `impact.json`, `events.json` (stories, staff, board), `getinvolved.json`, `contact.json`, `donate.json`.
- `src/pages/*.astro`: page layout. `src/components/`: header and footer.
- `public/assets/`: photos and images. `public/assets/og/`: link-preview images (1200x630, one per page; regenerate if page titles change).

## Accessibility (keep passing)

The site was audited to WCAG 2.1 AA with zero violations. When changing colors keep text contrast at 4.5:1 or better (navy `#141f4d` text on teal or gold fills; no white on teal). Keep one `<h1>` per page, heading levels in order, alt text on photos, and `<main id="main">` on every page.

## Open items (ask Dr. DeBernardi before changing)

- Contact form sends through Formspree. It stays hidden (call-only) until the Formspree address is pasted into `contactFormUrl` in `src/data/site.ts`. No published email by design (spam).
- Facebook: https://www.facebook.com/thelifelinkorg is set in `src/data/site.ts`. Confirm it opens the public page when signed out.
- Job Apply links: set `applyUrl` per job in `src/data/jobs.json` to the link for that single job on Indeed (not the company page). Empty means the button reads "Ask about this job" and opens an email to the HR address (`hrEmail` in site.ts, hr@thelifelink.org). Each posting also shows "Questions about this job? Email ...". This is the only published email on the site, by design.
- Old-site URL redirects: add to `vercel.json` once the old URL list is known.
