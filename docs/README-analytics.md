# Analytics setup (one-time, 30 seconds)

All HTML pages in `/docs/` include a GoatCounter tracking snippet:

```html
<script data-goatcounter="https://zaragoza-ab.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

## To activate tracking

1. Go to **https://www.goatcounter.com/signup**
2. Use **site code:** `zaragoza-ab`
3. Confirm via email
4. That's it — all pages will start reporting pageviews automatically.

## Why GoatCounter?

- **Free** for non-commercial use (unlimited pageviews under 100k/month).
- **Privacy-friendly**: no cookies, no third-party data sharing, GDPR-compliant out of the box.
- **No cookie banner needed** — doesn't use cookies.
- **Open source** — can self-host later if the project grows.

## What you'll see

- Pageviews per path (e.g., which categories get most traffic)
- Referrers (which websites link here)
- Browser/OS stats
- Anonymous session counts

## Alternative if you prefer

- **Cloudflare Web Analytics** (also free, privacy-friendly) — requires Cloudflare account
- **Plausible** ($9/month) — prettier dashboard, same privacy model
- **Umami** (self-hosted, free) — requires a server
