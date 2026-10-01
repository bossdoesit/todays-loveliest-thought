# Today’s Loveliest Thought

A responsive, build-free static website at https://todaysloveliestthought.com, maintained in this repository and hosted on Cloudflare Pages. HTML, CSS, and vanilla JavaScript; no npm install or build step is required.

## Preview

Open `index.html`, or run `python3 -m http.server 8000` from this folder.

## Contents

- `index.html`: public page, private reflection prompts, and inline free-journal signup.
- `styles.css`: responsive brand styling.
- `script.js`: local reflection controls and a restricted iframe height listener.
- `assets/`: supplied artwork, video, sharing image, and icons.

## Private reflections

The reflection form uses only local browser code. Writing is held in the open page and can be downloaded as a text file; it is not submitted, stored in browser storage, or sent to HighLevel. No HighLevel tracking or form-embed script runs on this page. Keep this privacy boundary when making changes.

The journal signup is embedded in a cross-origin iframe. The HighLevel code runs inside that frame, not in the parent page, so it cannot read private reflections. It collects optional first name, required email, and required consent. It does not collect journal entries or prayers. Keep third-party embed and tracking scripts out of the parent page.

## Free journal signup — October 1, 2026

The branded journal section embeds the tested HighLevel form:
https://api.leadconnectorhq.com/widget/form/mIYaYT9u8Yje8MxcDUWg

After submitting, visitors receive a confirmation with the free PDF download. End-to-end signup and PDF download were confirmed on October 1, 2026; receipt of the signup was verified in HighLevel.

The journal cover is rendered from the actual printable. Form colors, typography, and spacing are maintained in HighLevel’s Custom CSS; the form and enclosing panel use the page's warm cream, `#fff8ee`. The iframe starts with a responsive reserved height, then follows HighLevel's iFrameSizer height messages so the confirmation does not leave a large empty panel. Scrolling remains available for validation and accessibility settings.

The local height listener checks both the exact iframe window and its `https://api.leadconnectorhq.com` origin, then accepts only bounded numeric heights for that frame ID. It sends only the resize initialization string. It does not relay URL parameters, collect fields, retain contact data, or load HighLevel's parent-page embed/tracking script. The protocol was checked against the official `https://link.msgsndr.com/js/form_embed.js` on October 1, 2026. Keep this boundary when maintaining the integration.

The four-email welcome workflow is saved in Draft and does not send yet. Publishing the website link does not activate that workflow. Contacts captured while it is in Draft will need an intentional, consent-respecting enrollment plan when email sending launches.

The paid journal remains planned. There is no checkout, price, or paid-product availability claim.

## Privacy and publishing

Commit source changes here. Cloudflare Pages publishes the connected repository. Never place home addresses, private plans, CRM exports, campaign notes, credentials, or subscriber data in this public repository.

Keep the founder faceless in public content. Configure sender authentication and appropriate unsubscribe/postal details before launching promotional email. Keep each visitor’s private reflection separate from signup data.

## Editing and brand assets

Edit headings and copy in `index.html`. Palette variables are at the top of `styles.css`. Replace artwork in `assets/` with matching filenames or update the HTML references. The supplied wordmark is artwork, not a licensed font file.

The sunflower, butterfly, and crescent artwork is used intact for the favicon sizes. Review rights before adding new artwork or fonts.

## Hero video and sharing card

The October 1, 2026 supplied 15-second video plays once, muted, without a visible playback button. The updated ending supplies the poster. Reduced-motion preferences and autoplay refusal leave the poster visible. The 16:9 composition is preserved on mobile.

`assets/og-image.jpg` is the 1200 × 630 sharing card. Canonical, Open Graph, sitemap, and robots settings use the live domain.
