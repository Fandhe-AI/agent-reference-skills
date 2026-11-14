---
source: https://docs.cloud.google.com/docs/authentication/api-keys
---

# Apply API key restrictions

Unrestricted API keys are insecure. Restrict keys by API (which APIs may be called) and by application (which websites, IP addresses, or apps may use the key). Setting both is recommended.

## Signature / Usage

### API restrictions

An API-unrestricted key can be used with all APIs that accept Google Cloud keys. The API must be enabled in the project first. In the console and gcloud you must add at least one API restriction to create a key; with REST, keys are unrestricted unless the request body includes `restrictions.apiTargets`.

Console: **Credentials** > key > **API restrictions** > **Restrict key** > select APIs > **Save**.

gcloud: get the key ID (not the display name or key string) with `gcloud services api-keys list`, then update. All service names must be provided; they replace existing services on the key.

```bash
gcloud services api-keys update KEY_ID \
--api-target=service=SERVICE_1 --api-target=service=SERVICE_2
```

REST: list keys (the ID is the `uid` field), then patch (returns a long-running operation):

```json
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys/"
```

```json
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
--data '{
"restrictions" : {
"apiTargets": [
  {
    "service": "SERVICE_1"
  },
  {
    "service" : "SERVICE_2"
  }
]
}
}' \
"https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys/KEY_ID?updateMask=restrictions"
```

### Application restrictions

Only one application restriction type can be applied at a time.

| Option | Application type | Notes |
|---|---|---|
| Websites | Web applications | Specifies the websites that can use the key. |
| IP addresses | Applications called by specific servers | Servers or cron jobs that can use the key. The only restriction available for authorization keys. |
| Android apps | Android applications | Specifies the Android application that can use the key. |
| iOS apps | iOS applications | Specifies the iOS bundles that can use the key. |

#### Websites

Add HTTP referrers, e.g. `https://example.com`. Limited wildcard support: `*` may replace a subdomain or path but not appear mid-URL (`*.example.com` is valid; `mysubdomain*.example.com` isn't). If a port is included, only that port matches; otherwise any port.

| Scenario | Restrictions |
|---|---|
| Allow a specific URL | Add a URL with an exact path, e.g. `www.example.com/path`, `www.example.com/path/path`. Browsers with a referrer policy that sends only the origin for cross-origin requests can't use keys with page-specific URL restrictions. |
| Allow any URL in your site | Set two URLs in `allowedReferers`: `example.com/*` and `*.example.com/*`. |
| Allow any URL in a single subdomain or naked domain | Set two URLs: the domain without trailing slash (`www.example.com`, `sub.example.com`, `example.com`) and with a path wildcard (`www.example.com/*`, `sub.example.com/*`, `example.com/*`). |

Console: key > **Application restrictions** > **Websites** > **Add** each > **Done** > **Save**. Referrers provided replace existing ones.

```bash
gcloud services api-keys update KEY_ID \
 --allowed-referrers="ALLOWED_REFERRER_1"
```

```json
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
--data '{
"restrictions" : {
"browserKeyRestrictions": {
  "allowedReferrers": ["ALLOWED_REFERRER_1"]
}
}
}' \
"https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys/KEY_ID?updateMask=restrictions"
```

#### IP addresses

Specify external IP addresses of callers (web servers, cron jobs) as IPv4 (`198.51.100.1`), IPv6 (`2001:db8::1`), or CIDR subnets (`198.51.100.0/24`, `2001:db8::/64`). Internal IP addresses and `localhost` aren't supported. Private Google Access uses internal IP addresses by design; to restrict by network there, set up a VPC Service Controls perimeter instead.

Console: key > **Application restrictions** > **IP addresses** > **Add** > **Done** > **Save**.

```bash
gcloud services api-keys update KEY_ID \
--allowed-ips="ALLOWED_IP_ADDR_1"
```

```json
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
--data '{
"restrictions" : {
  "serverKeyRestrictions": {
    "allowedIps": ["ALLOWED_IP_ADDR_1"]
  }
}
}' \
"https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys/KEY_ID?updateMask=restrictions"
```

#### Android apps

Provide the package name and 20-byte SHA-1 certificate fingerprint of each app. Requests must send the `X-Android-Package` and `X-Android-Cert` HTTP headers. Bypassing this restriction is straightforward; also add API restrictions and monitor usage.

```bash
gcloud services api-keys update KEY_ID \
--allowed-application=sha1_fingerprint=SHA1_FINGERPRINT_1,package_name=PACKAGE_NAME_1 \
--allowed-application=sha1_fingerprint=SHA1_FINGERPRINT_2,package_name=PACKAGE_NAME_2
```

```json
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
--data '{
"restrictions" : {
"androidKeyRestrictions": {
  "allowedApplications": [
    {
      "sha1Fingerprint": "SHA1_FINGERPRINT_1",
      "packageName": "PACKAGE_NAME_1"
    }
 ]
}
}
}' \
"https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys/KEY_ID?updateMask=restrictions"
```

#### iOS apps

Provide each app's bundle ID; requests must send the `X-Ios-Bundle-Identifier` HTTP header. Bypassing this restriction is straightforward; also add API restrictions and monitor usage.

```bash
gcloud services api-keys update KEY_ID \
--allowed-bundle-ids=ALLOWED_BUNDLE_ID_1,ALLOWED_BUNDLE_ID_2
```

```json
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
--data '{
"restrictions" : {
"iosKeyRestrictions": {
  "allowedBundleIds": ["ALLOWED_BUNDLE_ID_1","ALLOWED_BUNDLE_ID_2"]
}
}
}' \
"https://apikeys.googleapis.com/v2/projects/PROJECT_ID/locations/global/keys/KEY_ID?updateMask=restrictions"
```

### List API keys that don't have restrictions

Use Cloud Asset Inventory: enable the Cloud Asset Inventory API in the project you run commands from, ensure your account has a role to call it, then:

```
gcloud asset list \
  --SCOPE \
  --asset-types=apikeys.googleapis.com/Key \
  --content-type=resource \
  --filter="FILTER"
```

`SCOPE` is `project=PROJECT_ID`, `folder=FOLDER_ID`, or `organization=ORGANIZATION_ID`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `-resource.data.restrictions:*` | `FILTER` value | Keys missing all restrictions. |
| `-resource.data.restrictions.apiTargets:*` | `FILTER` value | Keys missing API restrictions. |
| `-resource.data.restrictions.browserKeyRestrictions:*` | `FILTER` value | Keys missing website restrictions. |
| `-resource.data.restrictions.serverKeyRestrictions:*` | `FILTER` value | Keys missing IP address restrictions. |
| `-resource.data.restrictions.androidKeyRestrictions:*` | `FILTER` value | Keys missing Android restrictions. |
| `-resource.data.restrictions.iosKeyRestrictions:*` | `FILTER` value | Keys missing iOS restrictions. |

## Notes

- Every restriction update replaces the existing list of that type; send the full set each time. REST `keys.patch` returns a long-running operation to poll.
- The literal `allowedReferers` spelling appears in the website scenario table of the source, while the REST field is `allowedReferrers`; both are reproduced as published.
- Android and iOS restrictions are easy to bypass; combine with API restrictions and monitoring. Treat key strings as secrets regardless of restrictions.
- Java, Python sample code for restrictions is not reproduced (fetched copies corrupted); per-language code belongs to the `gcp-client-libraries` skill.
- Source: https://docs.cloud.google.com/docs/authentication/api-keys (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-api-keys.md](./manage-api-keys.md)
- [api-key-best-practices.md](./api-key-best-practices.md)
- [use-api-keys.md](./use-api-keys.md)
