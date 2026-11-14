---
source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-x509-certificates
---

# Workload Identity Federation with X.509 certificates

Authenticate workloads that hold an mTLS client certificate by registering your CAs (trust anchors and intermediate CAs) as a trust store in a workload identity pool provider, then obtain short-lived Google Cloud credentials over mTLS.

## Signature / Usage

### Generate self-signed certificates (example)

```bash
cat > example.cnf << EOF
[req]
distinguished_name = empty_distinguished_name
[empty_distinguished_name]
# Kept empty to allow setting via -subj command-line argument.
[ca_exts]
basicConstraints=critical,CA:TRUE
keyUsage=keyCertSign
extendedKeyUsage=clientAuth
[leaf_exts]
keyUsage=critical,Digital Signature, Key Encipherment
basicConstraints=critical, CA:FALSE
EOF
```

```bash
openssl req -x509 \
    -new -sha256 -newkey rsa:2048 -nodes \
    -days 3650 -subj '/CN=root' \
    -config example.cnf \
    -extensions ca_exts \
    -keyout root.key -out root.cert
```

```bash
openssl req \
    -new -sha256 -newkey rsa:2048 -nodes \
    -subj '/CN=int' \
    -config example.cnf \
    -extensions ca_exts \
    -keyout int.key -out int.req
```

```bash
openssl x509 -req \
    -CAkey root.key -CA root.cert \
    -set_serial 1 \
    -days 3650 \
    -extfile example.cnf \
    -extensions ca_exts \
    -in int.req -out int.cert
```

```bash
openssl req -new -sha256 -newkey rsa:2048 -nodes \
    -subj '/CN=example' \
    -config example.cnf \
    -extensions leaf_exts \
    -keyout leaf.key -out leaf.req
```

```bash
openssl x509 -req \
    -CAkey int.key -CA int.cert \
    -set_serial 1 -days 1 \
    -extfile example.cnf \
    -extensions leaf_exts \
    -in leaf.req -out leaf.cert
```

### Format certificates and create the trust store

```bash
export ROOT_CERT=$(cat root.cert | sed 's/^[ ]*//g' | sed -z '$ s/\n$//' | tr '\n' $ | sed 's/\$/\\n/g')
```

```bash
export INTERMEDIATE_CERT=$(cat int.cert | sed 's/^[ ]*//g' | sed -z '$ s/\n$//' | tr '\n' $ | sed 's/\$/\\n/g')
```

```bash
cat << EOF > trust_store.yaml
trustStore:
  trustAnchors:
  - pemCertificate: "${ROOT_CERT}"
  intermediateCas:
  - pemCertificate: "${INTERMEDIATE_CERT}"
EOF
```

### Pool and provider

```
gcloud iam workload-identity-pools create POOL_ID \
    --location="global" \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
```

```
gcloud iam workload-identity-pools providers create-x509 PROVIDER_ID \
    --location=global \
    --workload-identity-pool="POOL_ID" \
    --trust-store-config-path="TRUST_STORE_CONFIG" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

Mapping and condition examples:

```
google.subject=assertion.subject.dn.cn
```

```
assertion.san.uri=="spiffe://example/path"
```

### Credential and certificate configuration

Direct resource access:

```
gcloud iam workload-identity-pools create-cred-config \
  projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID \
    --credential-cert-path=CLIENT_CERT_PATH \
    --credential-cert-private-key-path=CLIENT_PRIVATE_KEY_PATH \
    --credential-cert-trust-chain-path=TRUST_CHAIN_PATH \
    --sts-location=REGION \
    --output-file=FILEPATH.json
```

With service account impersonation (also adds `--service-account` and a token lifetime):

```
gcloud iam workload-identity-pools create-cred-config \
  projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --service-account-token-lifetime-seconds=SERVICE_ACCOUNT_TOKEN_LIFETIME \
    --credential-cert-path=CLIENT_CERT_PATH \
    --credential-cert-private-key-path=CLIENT_PRIVATE_KEY_PATH \
    --credential-cert-trust-chain-path=TRUST_CHAIN_PATH \
    --sts-location=REGION \
    --output-file=FILEPATH.json
```

Point Application Default Credentials at the config:

```
  export GOOGLE_APPLICATION_CREDENTIALS=`pwd`/FILEPATH.json
```

```
  $env:GOOGLE_APPLICATION_CREDENTIALS = Resolve-Path 'FILEPATH.json'
```

### REST: trust chain and token exchange

```bash
export LEAF_CERT=$(openssl x509 -in leaf.cert -out leaf.der -outform DER && cat leaf.der | openssl enc -base64 -A)
```

```bash
export INTERMEDIATE_CERT=$(openssl x509 -in int.cert -out int.der -outform DER && cat int.der | openssl enc -base64 -A)
```

Adapted (not in the official docs): the trust chain is built as a JSON array of the base64 certificates and embedded as the `subject_token` string with `jq --arg`. The official sample sends the literal text `TRUST_CHAIN` because the variable sits inside a single-quoted body and is never expanded.

```bash
export TRUST_CHAIN="[\"${LEAF_CERT}\", \"${INTERMEDIATE_CERT}\"]"
```

```bash
REQUEST_BODY="$(jq -n --arg chain "${TRUST_CHAIN}" '{
    subject_token_type: "urn:ietf:params:oauth:token-type:mtls",
    grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
    audience: "WORKLOAD_IDENTITY_POOL_URI",
    requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
    scope: "https://www.googleapis.com/auth/cloud-platform",
    subject_token: $chain
}')"

curl --key CLIENT_CERT_KEY \
--cert CLIENT_CERT \
--request POST 'https://sts.mtls.googleapis.com/v1/token' \
--header "Content-Type: application/json" \
--data-raw "${REQUEST_BODY}"
```

Regional endpoint form: `https://sts.REGION.rep.mtls.googleapis.com/v1/token`. Optional impersonation:

```
curl -X POST 'https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/SERVICE_ACCOUNT_EMAIL:generateAccessToken' \
    -H "Content-Type: application/json; charset=utf-8" \
    -H "Authorization: Bearer STS_TOKEN" \
    -d '{"scope": ["https://www.googleapis.com/auth/cloud-platform"]}'
```

```bash
curl -X GET 'https://storage.googleapis.com/my_object' -H "Authorization: Bearer $ACCESS_TOKEN"
```

## Options / Props

Certificate attributes usable in mappings (as `assertion.<attribute>`):

| Attribute | Description |
|-----------|-------------|
| `serialNumberHex` | Serial number |
| `subject.dn.cn` / `subject.dn.o` / `subject.dn.ou` | Subject common name / organization / last organization unit |
| `issuer.dn.cn` / `issuer.dn.o` / `issuer.dn.ou` | Issuer common name / organization / last organization unit |
| `san.dns` / `san.uri` | First SAN DNS name / URI |
| `sha256Fingerprint` | SHA256 leaf certificate hash (Base64) |

Limits:

| Item | Limit |
|------|-------|
| Trust anchors | 3 (each at most 32 KB) |
| Intermediate certificates | 10 (each should not exceed 32 KB) |
| Name constraints during root/intermediate validation | 10 |
| Intermediates with the same Subject and SPKI per trust store | 5 |
| Certificate chain depth (including root and client) | 5 |
| Intermediate evaluations when building the chain | 100 |
| Key types | RSA 2048 to 4096 bits; ECDSA P-256 or P-384 (RSA-2048 and P-256 recommended) |
| Maximum leaf certificate lifetime | 390 days |

## Notes

- Required roles on the project: `roles/iam.workloadIdentityPoolAdmin` and `roles/iam.serviceAccountAdmin`. Enable the IAM, Resource Manager, Service Account Credentials, and STS APIs; use a dedicated project for pools.
- Choose a unique, immutable certificate attribute for `google.subject` to protect against spoofing; the default is `assertion.subject.dn.cn`. Granting access to the entire pool is risky, especially if the trust anchors contain a well-known public root CA; restrict with an attribute condition.
- The trust store accepts certificates from third-party CAs, private CAs, or self-signed roots. Self-signed certificates in the examples are for testing only.
- Context-Aware Access can enforce an mTLS binding to mitigate token replay (see the Chrome Enterprise Premium doc on CBA for workloads).
- `create-cred-config` also writes a certificate configuration file to `~/.config/gcloud/certificate_config.json` (Linux, macOS) or `%APPDATA%\gcloud\certificate_config.json` (Windows). Client libraries find it in the extracted ZIP path, the default gcloud path, or `GOOGLE_API_CERTIFICATE_CONFIG`. Update `cert_path` and `key_path` in a console-downloaded certificate config.
- Token lifetimes over one hour need the `constraints/iam.allowServiceAccountCredentialLifetimeExtension` org policy constraint. Prefer regional STS endpoints (for example `https://sts.us-central1.rep.mtls.googleapis.com`).
- Grant access (direct resource access or `roles/iam.workloadIdentityUser` impersonation) exactly as in the grant-access page.
- Client library minimums: Go `cloud.google.com/go/auth` 0.16.0 with `google.golang.org/api` 0.189.0; other languages are listed in the source.
- Adapted from the official docs: the REST token-exchange example builds the request body with `jq --arg` so the generated `TRUST_CHAIN` is actually sent as `subject_token` (the official sample sends the literal string `TRUST_CHAIN`).
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-x509-certificates (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Grant access and download credential config](./wif-grant-access-and-download-config.md)
- [Active Directory](./wif-active-directory.md)
