---
source: https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro
---

# Introduction to BigQuery data masking

BigQuery data masking (dynamic data masking) obscures column data for selected user groups while still allowing them to query the column. It is built on column-level access control: a data policy maps a data masking rule and principals to a policy tag (or sits directly on a column), and the rule is applied at query time based on the user's roles. Masking takes precedence over other operations involved in the query.

## Signature / Usage

### Workflow

- Set a data policy directly on a column: create a data policy, then assign it to a column (no taxonomy or policy tags needed).
- Mask data with policy tags: (1) set up a taxonomy and policy tags; (2) configure data policies on the policy tags, each mapping a data masking rule and principals to the tag (in the console the rule and principals are created in one step; with the BigQuery Data Policy API you create the data policy and rule in one step and set the principals in a second step); (3) assign the policy tags to table columns; (4) grant the BigQuery Masked Reader role to users who should see masked data. Grant Masked Reader at the data policy level; granting it at project level or higher gives permissions on all data policies under the project, which can cause excess-permission issues.
- The tag can also be used for column-level access control: principals with Data Catalog Fine-Grained Reader see the unmasked data.
- Alternative: data governance tags (Preview) for column-level access control and data masking.

### Search on masked columns

With Masked Reader access and a Hash (SHA-256) rule, use the hash value in `SEARCH`:

```sql
SELECT * FROM myDataset.Customers WHERE SEARCH(Email, "sg172y34shw94fujaweu");
```

With Fine-Grained Reader access, use the actual value:

```sql
SELECT * FROM myDataset.Customers WHERE SEARCH(Email, "jane.doe@example.com");
```

## Options / Props

### Data masking rules

| Rule | Returns | Applies to |
|---|---|---|
| Custom masking routine | The column value after applying a UDF; routine permissions are required to manage the rule | All BigQuery data types except `STRUCT` (support beyond `STRING` and `BYTES` is limited); output depends on the function |
| Date year mask | Value truncated to the year (`DATE` 2030-07-17 becomes 2030-01-01; `DATETIME` 2030-07-17T01:45:06 becomes 2030-01-01T00:00:00; `TIMESTAMP` 2030-07-17 01:45:06 becomes 2030-01-01 00:00:00); truncation uses UTC (change with the `@@time_zone` system variable) | `DATE`, `DATETIME`, `TIMESTAMP` |
| Default masking value | A default value by data type; hides the value but reveals the type; of little use in `JOIN`s | All types except as noted below |
| Email mask | Replaces the username of a valid email with `XXXXX` (`abc123@gmail.com` becomes `XXXXX@gmail.com`); otherwise returns the SHA-256 hash of the value (`randomtext` becomes `jQHDyQuj7vJcveEe59ygb3Zcvj0B5FJINBzgM6Bypgw=`; `test@gmail@gmail.com` becomes `Qdje6MO+GLwI0u+KyRyAICDjHbLF1ImxRqaW08tY52k=`) | `STRING` |
| First four characters | First 4 characters, rest replaced by `XXXXX`; values of 4 characters or fewer are returned SHA-256 hashed | `STRING` |
| Last four characters | Last 4 characters, rest replaced by `XXXXX`; values of 4 characters or fewer are returned SHA-256 hashed | `STRING` |
| Hash (SHA-256) | SHA-256 of the value, type preserving (a `STRING` stays `STRING`); usable in `JOIN`s | `STRING`, `BYTES` |
| Random hash | Salted hash with a unique random salt per query; non-deterministic across queries; joins only within the same query and only if the data policies belong to the same Google Cloud project; supported only with data policies set on columns, not policy tags | `STRING`, `BYTES` |
| Nullify | `NULL`; hides both value and type; of little use in `JOIN`s | All types |

### Default masking value by data type

| Data type | Default masking value |
|---|---|
| `STRING` | "" |
| `BYTES` | b'' |
| `INTEGER` | 0 |
| `FLOAT` | 0.0 |
| `NUMERIC` | 0 |
| `BOOLEAN` | `FALSE` |
| `TIMESTAMP` | 1970-01-01 00:00:00 UTC |
| `DATE` | 1970-01-01 |
| `TIME` | 00:00:00 |
| `DATETIME` | 1970-01-01T00:00:00 |
| `GEOGRAPHY` | POINT(0 0) |
| `BIGNUMERIC` | 0 |
| `ARRAY` | \[\] |
| `STRUCT` | NOT_APPLICABLE (policy tags can't be applied to `STRUCT` columns, but can be associated with the leaf fields) |
| `JSON` | null |

### Masking rule comparison

| Masking option | Type | Joinability | Security strength |
|---|---|---|---|
| Nullify | Predefined | No | Highest: no information leakage about the original value. |
| Default masking value | Predefined | No | Highest: no information leakage about the original value. |
| Email mask | Predefined | No | Moderate: the domain stays visible and can reveal organizational affiliation; weaker when the pool of individuals in the domain is small; a non-email value is hashed with SHA-256 (moderate). |
| First four characters | Predefined | No | Low to Moderate; Very Low when SHA-256 is applied to strings of 4 characters or fewer (rainbow-table reverse lookup). |
| Last four characters | Predefined | No | Low to Moderate; Very Low when SHA-256 is applied to strings of 4 characters or fewer. |
| Date year mask | Predefined | No | Moderate: leaks partial information, vulnerable to statistical analysis. |
| Random hash | Predefined | Yes (within the same query) | High: per-query secret random salt; good against precomputed table attacks; joins across queries are not possible. |
| Hash (SHA-256) | Predefined | Yes | Moderate: deterministic, vulnerable to rainbow table, known-plaintext and statistical attacks; joins across queries are possible. |
| Custom masking routine, SHA-256 | Custom | Yes | Moderate: same as predefined SHA-256. |
| Custom masking routine, Salted SHA-256 | Custom | Yes | High, contingent on salt protection: consistent secret salt hardcoded in the UDF; restrict access to the UDF definition (BigQuery redacts constants from execution details); the salt is consistent across queries using that UDF so joins across queries work. |
| Custom masking routine, AEAD Encryption | Custom | Yes | High, contingent on key management: with a KMS wrapped keyset the querying user typically needs `cloudkms.cryptoKeyVersions.useToDecryptViaDelegation` on the KMS key, which allows both encryption and decryption, so protect the wrapped keyset; a user with the wrapped key can decrypt (unmask) the data. |

### Rule priority when several data policies apply

Up to nine data policies can be set per policy tag (one is reserved for column-level access control settings). If a user matches several, BigQuery applies the highest-ranked rule:

| Rank | Rule |
|---|---|
| 1 | Custom masking routine |
| 2 | Random Hash |
| 3 | Hash (SHA-256) |
| 4 | Email mask |
| 5 | Last four characters |
| 6 | First four characters |
| 7 | Date year mask |
| 8 | Default masking value |
| 9 | Nullify |

### Roles and permissions

| Purpose | Role/ID | Permissions | Notes |
|---|---|---|---|
| Manage taxonomies and policy tags | Data Catalog Policy Tag Admin (`datacatalog.categoryAdmin`) | `datacatalog.categories.getIamPolicy`, `datacatalog.categories.setIamPolicy`, `datacatalog.taxonomies.create`, `datacatalog.taxonomies.delete`, `datacatalog.taxonomies.get`, `datacatalog.taxonomies.getIamPolicy`, `datacatalog.taxonomies.list`, `datacatalog.taxonomies.setIamPolicy`, `datacatalog.taxonomies.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list` | Project level. |
| Create and manage data policies | BigQuery Data Policy Admin (`bigquerydatapolicy.admin`), BigQuery Admin (`bigquery.admin`) or BigQuery Data Owner (`bigquery.dataOwner`) | `bigquery.dataPolicies.create`, `delete`, `get`, `getIamPolicy`, `list`, `setIamPolicy`, `update` (all `bigquery.dataPolicies.*`) | `create` and `list` apply at project level, the others at data policy level. Also needs `datacatalog.taxonomies.get`. |
| Attach policy tags to columns | Data Catalog Policy Tags Admin or Viewer (for `datacatalog.taxonomies.get`); BigQuery Admin (`roles/bigquery.admin`) or BigQuery Data Owner (`roles/bigquery.dataOwner`) (for `bigquery.tables.setCategory`) | `datacatalog.taxonomies.get`, `bigquery.tables.setCategory` | Both permissions are required. |
| Query masked data | Masked Reader (`bigquerydatapolicy.maskedReader`) | `bigquery.dataPolicies.maskedGet` | Can be granted only on Resource Manager resources (projects, folders, organizations); the user also needs permission to query the table. |
| Read unmasked data | Fine-Grained Reader (`datacatalog.categoryFineGrainedReader`) | `datacatalog.categories.fineGrainedGet` | Policy tag level. |

How the roles interact: with both roles the result depends on where each is granted in the policy tag hierarchy; Fine-Grained Reader alone sees unmasked data; Masked Reader alone sees masked data; neither gets permission denied. To run `SELECT * FROM` on a table with secured or masked columns, the user needs Masked Reader or Fine-Grained Reader on all those columns; otherwise name allowed columns or use `SELECT * EXCEPT (restricted_columns) FROM`.

### Compatibility with other BigQuery features

| Feature | Compatibility |
|---|---|
| BigQuery API `tabledata.list` | Not compatible; needs full access (Fine-Grained Reader) to all returned columns |
| BigLake tables | Compatible; policies enforced |
| BigQuery Storage Read API | Compatible; policies enforced |
| BigQuery BI Engine | Compatible; policies enforced but queries with masking are not accelerated (can slow Data Studio reports and make them more expensive) |
| BigQuery Omni | Compatible; policies enforced on Omni tables |
| Collation | Partially compatible; masking is applied before collation, which can give unexpected results (for example case-insensitive matching may not work); custom masking routines that normalize data can work around it |
| Copy jobs | Not compatible; needs full access to all source columns (Fine-Grained Reader) |
| Data export | Compatible; Masked Reader exports masked data, Fine-Grained Reader exports unmasked data |
| Row-level security | Only with non-subquery row access policies; masking is applied on top of row-level security; subquery policies need Fine-Grained Reader on the columns they reference |
| Search | Partially compatible; use search criteria that match your access level; the search index is used only with Fine-Grained Reader access; Nullify / Default masking value results are rarely useful search criteria |
| Snapshots | Not compatible; needs full access to all source columns (Fine-Grained Reader) |
| Table renaming | Compatible |
| Time travel | Compatible with time decorators and `FOR SYSTEM_TIME AS OF`; the policy tags of the current schema apply to retrieved data |
| Query caching | Partly compatible; results are cached about 24 hours and invalidated on table data or schema changes |
| Wildcard table queries | Not compatible; needs full access to all referenced columns on all matching tables (Fine-Grained Reader) |

## Notes

- This feature may not be available when using reservations that are created with certain BigQuery editions; see the BigQuery editions introduction.
- The `datacatalog.googleapis.com` API must remain enabled to create and manage the policy tags and taxonomies used for data masking and column-level security. Data Catalog metadata search and catalog features are deprecated and transitioning to Knowledge Catalog; the Policy Tag Manager service (taxonomies and policy tags), its API methods and audit logs, and the `roles/datacatalog` IAM roles are not deprecated.
- SHA-256 is deterministic and needs no encryption keys, so an attacker can brute-force original values by hashing all candidates and comparing. SHA-256 collisions are negligible for real-world datasets, so hashing rules are reliable for join integrity.
- Authorization inheritance: roles are evaluated from the policy tag on the column up each ascending level of the taxonomy until the user is found to have permissions or the top is reached, and the first assigned role found wins. Example: a column tagged `Financial`; a user in both ftes@example.com and analysts@example.com who is granted Fine-Grained Reader by `Financial` sees unmasked data; a user only in ftes@example.com who is granted Masked Reader by the parent `Confidential` sees SHA-256 hashed data; with Fine-Grained Reader granted higher and Masked Reader lower, the user gets masked data. To apply one data policy to several levels, set it on the topmost tag that should be covered (set on tag 1 to cover 1, 1a, 1ai, 1b, 1bi, 1bii; on tag 1b to cover 1b and its children).
- Incompatible features: the masked column is treated as a secured column and only Fine-Grained Reader users get access; a Masked Reader gets access denied and the service does not look further up the hierarchy.
- Cost: with Nullify or Default Masking Value the masked column is not scanned at all, so fewer bytes are processed.
- Example output (`SELECT * FROM Accounts;`): data-users@example.com (Masked Reader on `PII` and `Confidential`) sees NULL / "" / 0 values; accounting@example.com (Fine-Grained Reader on `SSN`) sees SSN values; sales-exec@example.com (Fine-Grained Reader on `Confidential`) sees Priority and Lifetime value; fin-dev@example.com (Masked Reader on `Financial`) sees a hashed Lifetime value; other users get access denied.
- Restrictions: up to nine data policies per policy tag (one reserved for column-level access control); data policies, their policy tags and any routines that use them must be in the same project; the project containing the taxonomy must belong to an organization; taxonomies are scoped to an organization, so after migrating a project recreate taxonomies, tags and data policies in the destination organization, explicitly grant folder-level `roles/bigquery.admin` and `roles/datacatalog.admin` or `roles/datacatalog.categoryAdmin`, and update the columns to reference the new tags; hierarchy depth at most five levels; once a taxonomy has a data policy on at least one tag, access control is enforced automatically and can be turned off only after deleting all its data policies; with existing materialized views, repeated record masking queries on the base table fail (delete the materialized view or create it in another dataset); queries with masking on partitioned or clustered columns are not supported; legacy SQL is not supported.
- Custom masking routines: all types except `STRUCT` (masking applies only to leaf fields of a `STRUCT`); deleting a routine does not delete the data policies that use it, they are left with an empty masking rule (Masked Readers on other data policies of the same tag still see masked data, others see `Permission denied.`; dangling references may be cleaned after seven days); only one custom masking routine per policy tag.
- Caching caveat: if a user's Fine-Grained Reader role is replaced by Masked Reader within 24 hours of a cached query, that user can still see the unmasked cached result when rerunning the same query.
- The only code on the source page is the two `SEARCH` examples; the rest is console workflow and figures.
- The source recommends granting Masked Reader at the data policy level and also says the role can be granted only on Resource Manager resources (projects, folders, organizations); both statements are kept as written. The IAM role definition (`roles/bigquerydatapolicy.maskedReader`) states the latter.
- Source: https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [column-level-security-intro.md](./column-level-security-intro.md)
- [column-level-security-writes.md](./column-level-security-writes.md)
- [best-practices-policy-tags.md](./best-practices-policy-tags.md)
- [row-level-security-intro.md](./row-level-security-intro.md)
