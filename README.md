# Today’s Loveliest Thought

A responsive, build-free static website at https://todaysloveliestthought.com, maintained in this repository and hosted on Cloudflare Pages. HTML, CSS, and vanilla JavaScript; no npm install or build step is required.

## Preview

Open `index.html`, or run `python3 -m http.server 8000` from this folder.

## Contents

- `index.html`: public page, private reflection prompts, and inline free-journal signup.
- `styles.css`: responsive brand styling.
- `script.js`: video controls and restricted iframe height listeners.
- `reflection.html`: isolated private reflection form, local download, and clearing controls.
- `analytics.js`: production-only Google Tag Manager loader and privacy defaults.
- `assets/`: supplied artwork, video, sharing image, and icons.

## Private reflections

The reflection form uses only local browser code inside `reflection.html`, embedded with `sandbox="allow-scripts allow-downloads"`. **Never add `allow-same-origin` or third-party scripts to that frame.** Its opaque origin prevents parent-page Analytics and HighLevel from reading the writing. Its Content Security Policy blocks network connections and form submissions. Writing is held in the open frame and can be downloaded as a text file; it is not submitted, stored in browser storage, or sent to HighLevel or Analytics. Only a bounded numeric layout height is posted to the parent. Keep this privacy boundary when making changes.

The journal signup is embedded in a cross-origin iframe. The HighLevel code runs inside that frame, not in the parent page, so it cannot read private reflections. It collects optional first name, required email, and required consent. It does not collect journal entries or prayers. Keep HighLevel embed/tracking scripts out of the parent page. GA4 on the parent is permitted only while the private reflection frame remains isolated as described above.

## Free journal signup — October 1, 2026

The branded journal section embeds the tested HighLevel form:
https://api.leadconnectorhq.com/widget/form/mIYaYT9u8Yje8MxcDUWg

After submitting, visitors receive a confirmation with the free PDF download. End-to-end signup and PDF download were confirmed on October 1, 2026; receipt of the signup was verified in HighLevel.

The journal cover is rendered from the actual printable. Form colors, typography, and spacing are maintained in HighLevel’s Custom CSS; the form and enclosing panel use the original reflection panel's paper color, `#fffdf9`. Both panels share the same border, corner radius, shadow, and responsive padding; their desktop columns also align. The original site-wide palette remains unchanged. The iframe starts with a responsive reserved height, then follows HighLevel's iFrameSizer height messages so the confirmation does not leave a large empty panel. Scrolling remains available for validation and accessibility settings.

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

## Google Analytics and Tag Manager — October 3, 2026

GA4 measurement ID `G-79B3TMK0CM` uses stream `15941366799`. Google Tag Manager container `GTM-TS4MQ72R` owns the single native Google tag, named `TLT | Google tag | GA4`, firing on `Initialization - All Pages`. Its configuration disables Google signals and advertising personalization. Do not add a direct GA4 loader or another configuration tag for this property.

`analytics.js` queues global privacy defaults before loading the GTM container, only on `todaysloveliestthought.com` and `www.todaysloveliestthought.com`. Local and Cloudflare preview hosts do not report traffic. The loader is included once in the page head. There is intentionally no noscript tracking iframe: the GA4 tag requires JavaScript, and the hostname/privacy controls must run before tracking starts. No tag is loaded in `reflection.html`.

Google signals and advertising personalization are disabled. The reported page URL and referrer omit query strings and fragments. Source, medium, campaign, content, and term can be supplied only as short URL-safe UTM labels; do not put personal information into campaign labels. No reflection fields, contact fields, user IDs, enhanced conversion data, or custom lead events are sent by our code. The homepage's Privacy disclosure describes the data flow.

Google's enhanced measurement settings remain controlled in GA4. Both forms are isolated from the parent: the private journal uses an opaque sandbox origin, and the HighLevel signup uses its existing cross-origin iframe. Consequently, a GA4 page tag does not establish confirmed signup tracking. Configure a separate confirmed-success integration before treating `generate_lead` as a key event; never count a journal link click as a successful signup.

Installation and collection are distinct checks. Use the stream's Test installation button and GA4 Realtime/DebugView to confirm downstream receipt. Do not describe the data-collection banner as resolved until Google actually confirms it. Standard report population can lag. No email workflow or social campaign is activated by this site change.
