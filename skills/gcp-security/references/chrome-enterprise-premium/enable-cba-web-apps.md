---
source: https://docs.cloud.google.com/access-context-manager/docs/enable-cba-web-apps
---

# Enable certificate-based access for web applications

Secure access from trusted devices to enterprise web applications on Google Cloud with mutual TLS (mTLS). Components: Access Context Manager (access level requiring certificates), Identity-Aware Proxy (authenticates user access), a Google Cloud HTTPS load balancer (mTLS between users and apps), and Chrome Enterprise Policy (mTLS from Chrome). Run `gcloud components update` first.

## Signature / Usage

Set up the external HTTPS load balancer first (https://docs.cloud.google.com/load-balancing/docs/https/setting-up-https) and note the name of the target HTTPS proxy. Load balancer setup belongs to the `gcp-load-balancing` skill.

### Trust config, Method 1 (Google-issued certificate from Certificate Authority Service)

Create a root CA first, then fetch its PEM and save it to a file.

```bash
gcloud privateca roots describe ROOT_CA_ID \
    --pool=POOL_ID \
    --location=CA_LOCATION \
    --format='value(pemCaCertificates)'
```

### Trust config, Methods 1 and 2: build and import the trust config

Method 2 uses your own PKI deployment with existing certificates and the same steps.

Adapted (not in the official docs): the line `TRUST_CONFIG_NAME=TRUST_CONFIG_NAME` is added because the heredoc below expands `${TRUST_CONFIG_NAME?}`, which fails when the variable is unset.

```bash
ROOT_PEM_FILE=TRUST_ANCHOR_PATH
INT_PEM_FILE1=IM_CERT_PATH
INT_PEM_FILE2=SECOND_IM_CERT_PATH
TRUST_CONFIG_NAME=TRUST_CONFIG_NAME
```

Adapted (not in the official docs): `$` and quotes are added to the file variables (the source `cat ROOT_PEM_FILE` reads a file literally named `ROOT_PEM_FILE`).

```bash
ROOT=$(cat "$ROOT_PEM_FILE" | sed 's/^[ ]*//g' | tr '\n' $ | sed 's/\$/\\n/g')
INT_1=$(cat "$INT_PEM_FILE1" | sed 's/^[ ]*//g' | tr '\n' $ | sed 's/\$/\\n/g')
INT_2=$(cat "$INT_PEM_FILE2" | sed 's/^[ ]*//g' | tr '\n' $ | sed 's/\$/\\n/g')
```

```bash
cat << EOF > trust_config.yaml
name: "${TRUST_CONFIG_NAME?}"
trustStores:
- trustAnchors:
  - pemCertificate: "${ROOT?}"
  intermediateCas:
  - pemCertificate: "${INT_1?}"
  - pemCertificate: "${INT_2?}"
EOF
```

Adapted (not in the official docs): shell variables in arguments are double-quoted.

```bash
gcloud certificate-manager trust-configs import TRUST_CONFIG_NAME \
  --project=GCP_PROJECT \
  --source="${PWD?}/trust_config.yaml"
```

### Create a server TLS policy

Skip if you used Method 3.

```bash
cat << EOF > server_tls_policy.yaml
name: "SERVER_TLS_POLICY_NAME"
mtlsPolicy:
  clientValidationMode: ALLOW_INVALID_OR_MISSING_CLIENT_CERT
  clientValidationTrustConfig: projects/GCP_PROJECT/locations/global/trustConfigs/TRUST_CONFIG_NAME
EOF
```

Adapted (not in the official docs): `SERVER_TLS_POLICY_NAME` is used as a placeholder instead of the unset variable `${SERVER_TLS_POLICY_NAME?}`. The `--source` path is double-quoted.

```bash
gcloud network-security server-tls-policies import SERVER_TLS_POLICY_NAME \
  --project=GCP_PROJECT \
  --source="${PWD?}/server_tls_policy.yaml" \
  --location=global
```

### Attach the TLS policy to the target HTTPS proxy

Adapted (not in the official docs): shell variables in arguments are double-quoted.

```bash
gcloud compute target-https-proxies export TARGET_HTTPS_PROXY_NAME \
    --project=GCP_PROJECT \
    --global \
    --destination="${PWD?}/xlb-mtls-target-proxy.yaml"
```

Adapted (not in the official docs): the policy reference is written on one line (`serverTlsPolicy: //networksecurity...`); the source `echo` put the value on a second line, which is not valid YAML for that field.

```bash
echo "serverTlsPolicy: //networksecurity.googleapis.com/projects/GCP_PROJECT/locations/global/serverTlsPolicies/SERVER_TLS_POLICY_NAME" >> xlb-mtls-target-proxy.yaml
```

Adapted (not in the official docs): shell variables in arguments are double-quoted.

```bash
gcloud compute target-https-proxies import TARGET_HTTPS_PROXY_NAME \
    --project=GCP_PROJECT \
    --global \
    --source="${PWD?}/xlb-mtls-target-proxy.yaml"
```

### Create an access level that requires certificates

Trust config (Methods 1 and 2), PKI-attestation binding; at least one trust config path is required, in the form `certificatemanager.googleapis.com/projects/GCP_PROJECT/locations/global/trustConfigs/TRUST_CONFIG_NAME`:

```text
certIsPkiAttested(origin, ["TLS_POLICY_FULL_RESOURCE_PATH1", "TLS_POLICY_FULL_RESOURCE_PATH2", ...]) == true
```

Google-issued self-signed certificate with Endpoint Verification (Method 3):

```text
certificateBindingState(origin, device) == CertificateBindingState.CERT_MATCHES_EXISTING_DEVICE
```

Create the custom level; `FILE` is a YAML file that contains the PKI-attestation expression above.

```bash
gcloud access-context-manager levels create ACCESS_LEVEL_NAME \
    --title=TITLE \
    --custom-level-spec=FILE \
    --description=DESCRIPTION \
    --policy=POLICY_NAME
```

### Chrome: auto-select the certificate

Set the `AutoSelectCertificateForUrls` policy (Admin console, Devices, Chrome, Settings, User & Browser Settings, Client certificates) for your application URL. Example using the Endpoint Verification certificate:

Adapted (not in the official docs): the policy key is `filter` (lowercase).

```json
{
  "pattern":"https://[*.].mysite.com",
  "filter":{
    "ISSUER":{
      "CN":"Google Endpoint Verification"
    }
  }
}
```

## Options / Props

### Required permissions

| Task | Permission |
|---|---|
| Create a trust config | `certificatemanager.trustconfigs.create` on the project |
| Create a server TLS policy | `certificatemanager.trustconfigs.use` on the trust config; `networksecurity.serverTlsPolicies.create` on the project |
| Attach the policy to the proxy | `compute.targetHttpsProxies.get` (export); `networksecurity.serverTlsPolicies.use` on the policy and `compute.targetHttpsProxies.update` (update) |

### Placeholders

| Name | Meaning |
|---|---|
| `ROOT_CA_ID` / `POOL_ID` / `CA_LOCATION` | Root CA ID, its CA pool ID, CA location |
| `TRUST_ANCHOR_PATH` / `IM_CERT_PATH` / `SECOND_IM_CERT_PATH` | PEM paths: trust anchor, two intermediates |
| `GCP_PROJECT` | Project ID |
| `TARGET_HTTPS_PROXY_NAME` | Target HTTPS proxy created with the load balancer |
| `POLICY_NAME` | Organization access policy |

## Notes

- The server TLS policy example uses `clientValidationMode: ALLOW_INVALID_OR_MISSING_CLIENT_CERT`, which lets connections with invalid or missing client certificates through to the application, so enforcement relies on the access level attached in IAP. The Discovery enum also has `REJECT_INVALID`; the source points to https://docs.cloud.google.com/load-balancing/docs/mtls#mtls_errors for the modes.
- After you create a TLS policy you cannot modify it; to change it, delete it and create a new one. Deleting a policy attached to a proxy can disrupt traffic, so use a test load balancer first.
- Method 3: Endpoint Verification automatically deploys a Google-issued, self-signed certificate to devices, so no trust config is needed (and the TLS policy step is skipped).
- Enforce with IAP: set up IAP (https://docs.cloud.google.com/iap/docs/enabling-compute-howto), then in IAP select the resource, Settings, and enter the access level name in "Access Levels". Gcloud form: https://docs.cloud.google.com/sdk/gcloud/reference/iap/web/set-iam-policy.
- Chrome must be managed (Chrome browser cloud management or Windows group policy). Safari: Keychain Access, select the certificate, File, New Identity Preference, enter the URL. Edge: set the `AutoSelectCertificateForUrls` Edge policy (https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies#content-settings).
- Do not commit or share the generated CA material, PEM files or `trust_config.yaml` files beyond what your organization requires.
- Corrected from the official docs: `cat ROOT_PEM_FILE | sed 's/^[ ]*//g' | ...` (and the same for `INT_PEM_FILE1` / `INT_PEM_FILE2`) without `$`.
- Corrected from the official docs: the heredoc uses `name: "${TRUST_CONFIG_NAME?}"` but the source never assigns `TRUST_CONFIG_NAME`.
- Corrected from the official docs: `gcloud network-security server-tls-policies import ${SERVER_TLS_POLICY_NAME?} \` uses a variable the source never sets (the YAML above uses the literal placeholder `SERVER_TLS_POLICY_NAME`).
- Corrected from the official docs: `echo "serverTlsPolicy:` followed by `//networksecurity.googleapis.com/..."` on a second line, which appends a key with an empty value and a stray line.
- Source inconsistency: Method 2 says the trust config "assumes a basic trust store with a single trust anchor representing a root certificate. No intermediate certificates are specified.", while its steps use the same two-intermediate variables and YAML as Method 1. The steps are kept as written.
- The source also shows Console steps for the access level and IAP. The full flag list for `gcloud compute target-https-proxies` is in the `gcp-compute` skill.
- Adapted from the official docs: `--source=${PWD?}/...` and `--destination=${PWD?}/...` are double-quoted so that a working directory with spaces or glob characters is passed as one argument.
- Corrected from the official docs: the source writes the `AutoSelectCertificateForUrls` key as `Filter`; the Chrome policy definition (https://chromeenterprise.google/policies/?policy=AutoSelectCertificateForUrls) uses `{"pattern":"...","filter":{...}}` with lowercase `filter` (the `ISSUER` / `CN` keys stay uppercase).
- Source: https://docs.cloud.google.com/access-context-manager/docs/enable-cba-web-apps (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-cba.md](./set-up-cba.md)
- [securing-resources-with-certificate-based-access.md](./securing-resources-with-certificate-based-access.md)
- [endpoint-verification-quickstart.md](./endpoint-verification-quickstart.md)
