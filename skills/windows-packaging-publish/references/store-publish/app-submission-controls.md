# App Submission Controls (MSIX / MSI-EXE / PWA)

Partner Center submission controls for deleting a draft submission (or the whole app) and cancelling certification / review. Steps differ slightly per product type.

## Signature / Usage

MSIX and PWA — delete a draft submission, then the app:

```text
1. Apps and Games overview page -> open the app (only an app that is not submitted or live on the Store can be deleted).
2. Product submission card (or product update card for an update) -> Delete submission.
3. Confirm. If no draft submissions remain, you can delete the app:
   app overview page -> 3 dots beside the app name -> Delete product -> confirm.
```

MSIX and PWA — cancel certification:

```text
Application overview page -> Certification status card (Product release section)
  -> 3 dots on the far right -> Cancel certification -> confirm.
```

MSI/EXE — delete a draft / cancel review:

```text
Delete:  Application overview page -> App setup card -> 3 dots (top right) -> Delete -> confirm.
Cancel:  New app:        App setup card  -> 3 dots -> Cancel review -> confirm.
         App update:     Update app card -> 3 dots -> Cancel review -> confirm.
```

## Options / Props

| Product type | Delete draft | Cancel |
|---|---|---|
| MSIX | Product submission / product update card -> **Delete submission**; then **Delete product** | Certification status card -> **Cancel certification** |
| PWA | Same as MSIX | Same as MSIX |
| MSI/EXE | App setup card menu -> **Delete** | App setup card (new app) or Update app card (update) menu -> **Cancel review** |

## Notes

- Only an app that is not submitted and not live on the Store can be deleted.
- MSI/EXE: after confirming cancel review, it may take up to a minute for the app to go back to draft state.
- Source pages: `/windows/apps/publish/publish-your-app/{msix,msi,pwa}/app-submission-control`.

## Related

- [Create App Submission](./create-app-submission.md)
- [Publish an App Update](./publish-app-update.md)
- [MSI/EXE App Publishing](./msi-exe-publishing.md)
- [PWA Submission Flow (Partner Center)](./pwa-submission.md)
