# Microsoft Store Policies

The certification and content standards every Store product must meet, organized into Product Policies (section 10) and Content Policies (section 11).

## Signature / Usage

Reviewed automatically as part of the certification content-compliance phase, and self-checked before submission to avoid certification failures.

## Options / Props

| Section | Covers |
|---|---|
| 10.1 Distinct Function & Value; Accurate Representation | Metadata must accurately reflect the product; unique naming; correct categorization |
| 10.2 Security | No malware, safe browsing engines, uninstall support, direct-link `.msi`/`.exe` distribution rules (10.2.9) |
| 10.3 Product is Testable | Working demo credentials/servers required for review |
| 10.4 Usability | Startup/shutdown behavior, compatibility detection, sunset notifications |
| 10.5 Personal Information | Privacy policy requirements, opt-in consent, secure handling, children's data |
| 10.6 Capabilities | Declared capabilities must match actual use |
| 10.7 Localization | Description and experience must be localized per declared language |
| 10.8 Financial Transactions | In-app purchase API requirements, third-party payment rules, company-account requirement for financial data, pricing transparency |
| 10.9 Notifications | Must respect system notification settings, no disguised/confidential notification content |
| 10.10 Advertising Conduct and Content | Ad content standards, opt-out disclosure, children's advertising rules |
| 10.13 Gaming and Xbox | Xbox network integration, ID@Xbox/Creators program requirements, no game system emulation |
| 10.14 Account Type | When a Company account is mandatory (financial data, business identity) |
| 11.1–11.16 Content Policies | General content rating ceiling, IP/rights, risk of harm, defamation, offensive content, alcohol/tobacco/weapons/drugs, adult content, illegal activity, profanity, region-specific rules, age ratings, user-generated content, third-party storefronts, gambling, child safety, live generative AI disclosure |

## Notes

- Age rating (IARC questionnaire) is mandatory for every submission (11.11) and must be accurate.
- Products using in-app purchase for digital goods/services on games or Xbox must use the Microsoft Store in-product purchase API (10.8.1) — third-party payment is restricted to specific non-game/PC scenarios.
- A Company account is required whenever a product needs financial account information for primary functionality or when the publisher name implies a business entity (10.14).
- Live generative AI content requires explicit metadata disclosure and a submission-time declaration (11.16).
- Certification appeals go through `reportapp@microsoft.com`.

## Related

- [App Certification Process](./app-certification-process.md)
- [Resolve Submission Errors](./resolve-submission-errors.md)
- [Age Ratings](./age-ratings.md)
