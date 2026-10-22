# IndexNow notification

Prepared 2026-10-11. No notification or deployment is performed by preparing these files. Existing Bing Webmaster site and sitemap setup is separate.

`public/indexnow-verification.txt` is deliberately public domain-ownership verification data, as required by the [IndexNow protocol](https://www.indexnow.org/documentation). It is not a private account/API credential. No GitHub secret or dependency is needed. The script never prints its value.

The notifier defaults to dry-run and validates distinct HTTPS canonical HTML URLs on swotbee.com, excluding query/fragment URLs, redirects and noindex pages. The public key file must be deployed and match locally before submission. The notifier does not submit the whole sitemap on each run: provide only newly added or genuinely changed public URLs.

```bash
node scripts/notify-indexnow.mjs --urls /path/to/changed-urls.json --dry-run
node scripts/notify-indexnow.mjs --urls /path/to/changed-urls.json --submit --receipt /tmp/indexnow-release-YYYYMMDD.json
```

The input is a newline list, a JSON array of URLs, or objects containing a `url` field, such as the scoped article manifest. `--submit` is an explicit remote mutation and needs authorization. A receipt is required; an existing receipt is never overwritten or automatically resubmitted. Inspect a failed receipt and endpoint status before deciding whether a new attempt is appropriate. A timeout before a receipt is saved is an uncertain submission outcome; check Bing before retrying. Use a separate dated receipt for later authorized releases.

This is a manual publish-step integration, not a scheduled job or automatic Pages workflow. Automated changed-URL selection can be added separately after this is reviewed. No private tokens, analytics data or customer data are sent. The protocol requires the public ownership key, its URL and the changed public URL list. A successful response confirms receipt, not crawling, indexing or rankings. IndexNow is not Google's indexing-request API.

Before activation: review and authorize deployment of this three-file change, run the repository build, verify the live key file and then authorize the desired URL notification. Website deployment still follows docs/development.md.
