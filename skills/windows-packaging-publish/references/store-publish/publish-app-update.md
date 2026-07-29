# Publish an App Update

Shipping an update to an already-live Store listing through Partner Center — distinct from the first-time submission flow and from the code-driven `StoreContext` update API.

## Signature / Usage

1. Sign in to Partner Center and open the product's overview page.
2. Start the update submission:
   - **MSIX / PWA**: in the **Product release** section, click **Start update**. A new submission is created, seeded from the previous submission.
   - **MSI/EXE**: open the **Update app** section — an update submission is already created for you, seeded from the previous submission.
   - **Add-on**: on the add-on's page, click **Update**.
3. Revisit only the sections that need changes — **Pricing and availability**, **Properties**, **Age ratings**, **Packages**, **Store listing**, **Submission options** — and save each.
4. Publish the update:
   - **MSIX / PWA**: click **Submit for certification** on the App overview page.
   - **MSI/EXE**: click **Publish** on the Manage Store listing page (package changes are saved separately — see Notes).
   - **Add-on**: click **Submit to the Store**.

## Options / Props

| Product type | Entry point | Submission seeded from previous? |
|---|---|---|
| MSIX | Product release section → **Start update** | Yes |
| PWA | Product release section → **Start update** | Yes |
| MSI/EXE | **Update app** section (submission pre-created) | Yes |
| Add-on | Add-on page → **Update** | Yes |

## Notes

- A previously published app can be updated at any time; there is no separate "unpublish first" step.
- MSI/EXE package changes are saved through their own sub-step: after editing package details, click **Save draft**, confirm the package appears on the Manage Packages page, then **Save All** to upload it — this precedes the final **Publish** click.
- The Store does not push MSI/EXE updates to existing customers automatically or manually; only new customers are guaranteed the latest version from the Store. In-app update delivery to existing users depends on the app's own installer supporting it.
- Add-on updates are submitted and published independently of the parent app — most add-on changes (price, description, etc.) don't require a full app update.
- Updates to MSI/EXE apps remain subject to the Application Developer Agreement and Microsoft Store Policies; if an update adds functionality requiring written customer consent, that consent must be obtained per applicable law in each distributed market.
- This portal-driven flow is distinct from the programmatic `StoreContext`-based in-app update/package APIs and from gradual package rollout, which controls how a published update's packages are staged out after submission.

## Related

- [Create App Submission](./create-app-submission.md)
- [MSI/EXE App Publishing](./msi-exe-publishing.md)
- [PWA Submission Flow (Partner Center)](./pwa-submission.md)
- [Add-on (In-App Product) Submission](./add-on-submission.md)
- [Upload App Packages](./upload-app-packages.md)
- [Gradual Package Rollout](./gradual-package-rollout.md)
- [StoreContext](./store-context.md)
