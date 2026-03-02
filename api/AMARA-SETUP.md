# Amara Chat (Claude) + Lead Email Setup

## 1. Claude / Amara Chat

**Vercel Environment Variables:**
- `ANTHROPIC_API_KEY` — Your Anthropic API key

Amara has full 2 Seasons knowledge: location (Kobape, Abeokuta), prices (₦1.5M–₦5M), contact, amenities, process. She answers questions and can capture leads.

## 2. Lead Email Notifications

When someone shares their details in chat or clicks "Have someone call me", leads are emailed to **godunderGod100@gmail.com** (or `LEADS_EMAIL` if set).

**Vercel Environment Variables:**
- `RESEND_API_KEY` — From [resend.com](https://resend.com) (free tier)
- `LEADS_EMAIL` — Optional, defaults to godunderGod100@gmail.com
- `FROM_EMAIL` — Optional, e.g. `Amara <amara@2seasonsabk.store>`

**Resend setup:**
1. Sign up at resend.com
2. Add and verify your domain (e.g. 2seasonsabk.store)
3. Create an API key
4. Add `RESEND_API_KEY` in Vercel
5. Set `FROM_EMAIL` to an address on your verified domain (e.g. amara@2seasonsabk.store)

## Local testing

```bash
vercel dev
```

Create `.env.local`:
```
ANTHROPIC_API_KEY=your-key
RESEND_API_KEY=your-resend-key
LEADS_EMAIL=godunderGod100@gmail.com
FROM_EMAIL=Amara <amara@2seasonsabk.store>
```
