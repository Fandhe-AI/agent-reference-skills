---
source: https://docs.cloud.google.com/support/docs/capture-browser-trace
---

# Browser Trace Capture and Cloud Billing Support

Capture HAR files and performance profiles to attach to console-issue cases, and reach Cloud Billing support (free for all Google Cloud accounts).

## Signature / Usage

HAR capture (Chrome; Edge, Firefox, and Safari follow the same pattern in their own DevTools Network tools):

```
1. In the Google Cloud console, navigate to the page where you are encountering the issue.
2. Right-click anywhere on the page and choose Inspect.
3. In DevTools, select the Network tab (recording starts automatically).
4. Select Preserve log.
5. Click Clear network log.
6. Reproduce the issue in the console.
7. Click Export HAR (sanitized) and save the file.
```

Performance profile (Chrome): DevTools **Performance** tab, **Record and reload**, reproduce the issue (records up to 10 seconds or until the buffer is full; use **Record** / **Stop** for longer), then **Save profile** > **Save trace**.

Cloud Billing support: console **Billing support** page, **Get billing support** opens the Billing Assistant. Billing Account Administrators can also use **Help and support**, select product **Billing**, **Get billing support**. Non-administrators use the Support Contact Troubleshooter (suspended billing account, payment method errors, locked-out projects, unknown charges, and similar cases).

## Options / Props

| Browser | HAR export control | Performance tool |
|---------|--------------------|------------------|
| Chrome | Network tab, Preserve log, **Export HAR (sanitized)** | Performance tab, **Record and reload**, **Save profile** > **Save trace** |
| Edge | Network tab, Preserve log, **Export HAR** | Performance tool, **Start profiling and reload page**, **Save profile** |
| Firefox | Network tab, **Settings** > **Persist Logs**, **Settings** > **Save All As HAR** | Firefox Profiler (enable popup), **Web Developer** settings, **Start Recording**, **Upload Local Profile** > **Download** |
| Safari | Enable developer tools, **Develop** > **Show Web Inspector**, Network tab, **Preserve Log**, **Export** | Timelines tab, **Stop recording once page loads**, **Export** |

## Notes

- Warning: HAR files can contain sensitive data such as cookies and submitted form values. Edit the file in a text editor or use the HAR sanitizer (HAR Analyzer) to redact before uploading.
- Upload the saved HAR or profile as an attachment to the support case.
- Billing support requires the Billing Account Administrator role on at least one Cloud Billing account; resold customers contact their reseller. Google Maps Platform billing cases (English only) require Project Owner or Editor on a project with a Maps Platform API enabled. Google Workspace billing is handled in Google Workspace Admin Help.
- Source: https://docs.cloud.google.com/support/docs/capture-browser-trace, https://docs.cloud.google.com/support/docs/get-billing-support (retrieved 2026-11-14; CC BY 4.0)

## Related

- [support-cases.md](./support-cases.md)
- [best-practices.md](./best-practices.md)
