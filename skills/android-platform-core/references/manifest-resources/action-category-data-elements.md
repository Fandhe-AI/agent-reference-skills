# action / category / data elements

The `<action>`, `<category>`, and `<data>` sub-elements of `<intent-filter>` define what implicit intents a component accepts. This page is the manifest schema reference; see the app-components category (same skill) for the intent-filter matching algorithm.

## Signature / Usage

```xml
<activity android:name=".ShareActivity" android:exported="false">
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data
            android:scheme="https"
            android:host="example.com"
            android:pathPrefix="/share"
            android:mimeType="text/plain" />
    </intent-filter>
</activity>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` (action) | String | required | The intent action string this filter accepts, e.g. `android.intent.action.SEND`. A filter with no `<action>` rejects all intents. |
| `android:name` (category) | String | required | A category the intent must carry to match, e.g. `android.intent.category.DEFAULT`. `startActivity()` adds `CATEGORY_DEFAULT` implicitly, so filters meant to receive implicit intents must declare it. |
| `android:scheme` | String | — | URI scheme (`http`, `content`, `file`, custom). Case-sensitive, specified without a trailing colon. Other URI attributes are ignored unless `scheme` is set. |
| `android:host` | String | — | URI authority host; meaningless without `scheme`. Supports a leading `*` wildcard for subdomains (`*.example.com`). Case-sensitive (unlike the formal RFC) — always specify hosts in lowercase. |
| `android:port` | String | — | URI authority port; meaningful only when `scheme` and `host` are also set. |
| `android:path` | String | — | Complete literal URI path; must start with `/` and match the whole path. |
| `android:pathPrefix` | String | — | Partial URI path matched against the initial part only. |
| `android:pathSuffix` | String | — | Partial URI path matched against the ending part. API 31+. |
| `android:pathPattern` | String | — | Complete path with simple wildcards (`.`, `*`, `.*`); lazy matching, no backtracking. |
| `android:pathAdvancedPattern` | String | — | Complete path with regex-like syntax (`.`, `[...]`, `*`, `+`, `{...}`); matched in real time with no backtracking support. Requires double-escaping in XML. API 31+. |
| `android:mimeType` | String | — | MIME type, e.g. `image/jpeg`; subtype may be `*`. Case-sensitive. The most commonly declared `<data>` attribute on its own. |
| `android:fragment` / `fragmentPrefix` / `fragmentSuffix` / `fragmentPattern` / `fragmentAdvancedPattern` | String | — | URI fragment matchers (value after `#`, without the `#`). API 35+, only honored inside `<uri-relative-filter-group>`. |
| `android:query` / `queryPrefix` / `querySuffix` / `queryPattern` / `queryAdvancedPattern` | String | — | URI query-parameter matchers (value after `?`, without the `?`). API 35+, only honored inside `<uri-relative-filter-group>`. |

## Notes

- All three are contained in: `<intent-filter>`. `<action>`/`<category>` take only `android:name`; `<data>` takes only URI/MIME attributes.
- All `<data>` elements contained within the same `<intent-filter>` contribute to one pooled filter — their scheme/host/port/path/mimeType attributes are combined, not tested as independent OR alternatives (splitting one `<data>` with several attributes into several single-attribute `<data>` elements in the same filter is equivalent).
- Introduced API level 1; fragment/query `<data>` attributes require API 35 and are ignored outside `<uri-relative-filter-group>`.
- For the intent resolution algorithm (three-test matching, implicit MIME/URI defaults) see `intent-filters.md` in this skill's app-components category.

## Related

- [queries element](./queries-element.md)
- [uri-relative-filter-group element](./uri-relative-filter-group-element.md)
- [Intent filters and resolution](../app-components/intent-filters.md)
