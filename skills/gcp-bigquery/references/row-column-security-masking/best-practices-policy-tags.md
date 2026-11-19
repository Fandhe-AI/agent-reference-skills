---
source: https://docs.cloud.google.com/bigquery/docs/best-practices-policy-tags
---

# Best practices for policy tags

Policy tags enforce column-level access control and dynamic data masking on sensitive table data. Organize them as a hierarchical taxonomy of data classes so that a small set of tags manages permissions across many columns. Policy tags are an alternative to data governance tags.

## Signature / Usage

### Build a hierarchy of data classes

1. List the kinds of data the organization processes (usually a small number of data classes), for example PII data, financial data and customer order history. One policy tag can classify many columns.
2. Identify groups of people that need different access to different data classes, for example business-sensitive data (revenues, customer history) versus personally identifiable data (phone numbers, addresses).
3. Group policy tags in a tree; sometimes a root policy tag that contains all other tags helps.

Example taxonomy: three top-level policy tags **High**, **Medium** and **Low**; **High** contains the leaf tags **Credit card**, **Government ID** and **Biometric**; **Medium** and **Low** have leaf tags similarly.

Policy tags are attached to columns through the table schema (fragment shown for illustration):

```text
[
 ...
 {
   "name": "ssn",
   "type": "STRING",
   "mode": "REQUIRED",
   "policyTags": {
     "names": ["projects/project-id/locations/location/taxonomies/taxonomy-id/policyTags/policytag-id"]
   }
 },
 ...
]
```

## Notes

- Benefits of the hierarchy: grant access to a whole group of tags at once (for example the Data Catalog Fine-Grained Reader role on the **Low** tier); move a tag between tiers (for example **Address** from **Low** to **Medium**) without reclassifying columns; manage many columns by controlling only a few tags.
- You can move a policy tag only through the Data Catalog `PolicyTagManager.UpdatePolicyTag` method.
- Data Catalog metadata search and cataloging are deprecated, but Policy Tag Manager (taxonomies and policy tags) is the column-level security mechanism described here and stays in `gcp-bigquery`.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/column-level-security-intro (the page itself has no code block).
- Source: https://docs.cloud.google.com/bigquery/docs/best-practices-policy-tags (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [column-level-security-intro.md](./column-level-security-intro.md)
- [column-data-masking-intro.md](./column-data-masking-intro.md)
