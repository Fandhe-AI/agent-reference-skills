# Partner Center Roles and Custom Permissions

Standard roles and custom (account-level and product-level) permissions for Partner Center users, groups and Microsoft Entra ID applications in the Windows apps developer program.

## Signature / Usage

```text
Add or edit a user / group / Microsoft Entra application
  -> "Roles applicable to developer programs": select standard role(s)
  -> or "Customize permissions": toggle each permission (No access / Read only / Read/write)
     product-level rows: "All products", each product, and per-product "All add-ons" / each add-on
```

## Options / Props

Standard roles:

| Role | Description |
|---|---|
| Manager | Complete access except changing tax and payout settings; manages Partner Center users. Creating/deleting users in the Entra tenant depends on the account's Entra permissions (global administrator) |
| Developer | Upload packages, submit apps and add-ons, view Usage report, Cross-Device Experiences; no financial info or account settings |
| Business Contributor | View Health and Usage reports; can't create/submit products, change account settings, or view financial info |
| Finance Contributor | View payout reports, financial info, acquisition reports; no changes to apps, add-ons, or settings |
| Marketer | View non-financial analytic reports; no changes |

Selected feature access by role (O = Account owner, M = Manager, D = Developer, BC = Business Contributor, FC = Finance Contributor, Mk = Marketer):

| Feature | O | M | D | BC | FC | Mk |
|---|---|---|---|---|---|---|
| Acquisition report (incl. Near Real Time) | View | View | None | None | View | None |
| Feedback report/responses | View + send | View + send | View + send | None | None | View + send |
| Health report | View | View | View | View | None | None |
| Usage report | View | View | View | View | None | None |
| Payout account / Tax profile | Update | None | None | None | Update | None |
| Payout summary | View | None | None | None | View | None |
| Self serve sales | Update | None | None | None | None | Update |

Custom permission levels: **No access**, **Read only**, **Read/write**, **Mixed** (display-only indicator when All products and individual products differ).

Account-level custom permissions (cannot be limited to products): Account settings, Account users, Account-level ad performance report, Ad campaigns, Contact info, Customer groups, Forums Private Space, Manage product groups*, New apps, New bundles*, Order Xbox Dev Kits*, Partner services*, Payout account, Payout summary, Relying parties*, Request disc*, Sandboxes*, Tax profile, Test accounts*, Ticketing Administrator, Xbox devices (* = not available to all accounts; no effect if the account isn't enabled).

Product-level custom permissions by category:

| Category | Permissions |
|---|---|
| Analytics | Acquisitions (incl. Near Real Time), Usage, Health (incl. Near Real Time), Reviews, Xbox analytics (all Read only) |
| Monetization | Promotional codes, Store sale events* |
| Publishing | Product Setup, Pricing and availability, Properties, Age ratings, Packages, Store listings, Store submission, New submission creation, New add-ons, Name reservations, Royalty program publishing (listed as "TBD" in the source) |
| Xbox Live* | Relying Parties, Partner Services, Xbox Test Accounts (and per Sandbox), Xbox Devices (and per Sandbox), App Channels, Service Configuration, Tools Access, Proprietary access |

## Notes

- The account owner (the person who first created the account with a Microsoft account, not an Entra-added user) is the only one with complete access, including deleting apps, managing all users, and changing financial and account settings.
- Without custom permissions each user/group/application needs at least one standard role. Same roles and permissions apply to users, groups and Entra applications; multiple roles can be combined. If a user's role differs from a group's, the user gets both sets of functionality.
- Users with the standard role Owner, Manager or Developer access all products regardless of custom permissions. By default Owner/Manager have all custom permissions; other roles get few.
- Selections for **All products** apply to current and future products; select products individually to avoid that. **All add-ons** applies to current and future add-ons of that product. Add-ons don't inherit parent product selections (except permissions such as Promotional codes, which apply to all add-ons), and some can't be set for add-ons (e.g. Customer feedback).
- Some permissions only allow Read only (analytics); some have no distinction between Read only and Read/write. Responding to reviews needs the Contact customer permission, not Reviews read/write.
- Store submission and New submission creation grant no access when set to read-only.
- Ad mediation, Ad performance, Affiliates performance and App install ads reports were deprecated from account-level custom permissions.
- Not applicable to the Microsoft Edge program, which doesn't support assigning roles. Hardware Developer Program and Windows Desktop Application Program use their own role docs.

## Related

- [Partner Center Users, Groups, and Entra Applications](./partner-center-users-entra.md)
- [Developer Account](./developer-account.md)
- [Reserve App Name](./reserve-app-name.md)
