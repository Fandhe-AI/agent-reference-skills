---
source: https://docs.cloud.google.com/iam/docs/create-managed-workload-identities
---

# Managed Workload Identities (Compute Engine and GKE)

Configure managed workload identities (SPIFFE identities with automatically provisioned X.509 certificates) for Compute Engine VMs and GKE fleet clusters.

## Signature / Usage

### Compute Engine

Roles: a Security Administrator creates the pool, configures the CA, creates identities, and defines the attestation policy; a Compute Administrator enables managed workload identities on VMs / managed instance groups. Enable `iam.googleapis.com` and `privateca.googleapis.com`.

```bash
gcloud services enable iam.googleapis.com privateca.googleapis.com
```

Create a pool in `TRUST_DOMAIN` mode (pool ID: 4-32 chars, lowercase alphanumeric and dashes, cannot be changed):

```
gcloud iam workload-identity-pools create POOL_ID \
  --location="global" \
  --mode="TRUST_DOMAIN"
```

```
gcloud iam workload-identity-pools describe POOL_ID \
  --location="global"
```

```
mode: TRUST_DOMAIN
name: projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID
state: ACTIVE
```

Default (Google-managed, no-cost, shared root of trust) CA:

```
gcloud iam workload-identity-pools update TRUST_DOMAIN_NAME \
    --location="global" \
    --use-default-shared-ca \
    --project=PROJECT_ID
```

Custom CA through Certificate Authority Service (charged separately): create an Enterprise-tier root CA pool and root CA, a subordinate CA pool and subordinate CA (`gcloud privateca pools create`, `roots create`, `subordinates create`), then bind the subordinate CA pool with an issuance config:

Adapted (not in the official docs): indentation restored (the official Compute Engine YAML sample lost its nesting). The `inlineCertificateIssuanceConfig` wrapper is kept as in the official page (the GKE page's `cic.json` sample also wraps the config in it).

```yaml
inlineCertificateIssuanceConfig:
  caPools:
    REGION: projects/PROJECT_ID/locations/REGION/caPools/SUBORDINATE_CA_POOL_ID
  keyAlgorithm: RSA_2048
  lifetime: 86400s
  rotationWindowPercentage: 50
```

```
gcloud iam workload-identity-pools update POOL_ID \
   --location="global" \
   --inline-certificate-issuance-config-file=ISSUANCE_CONFIG_FILE
```

Authorize the pool's identities on each subordinate CA pool.

Adapted (not in the official docs): removed the stray `/name` segment from the `principalSet` path.

```
gcloud privateca pools add-iam-policy-binding SUBORDINATE_CA_POOL_ID \
  --location=REGION \
  --role=roles/privateca.workloadCertificateRequester \
  --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/*"
```

```
gcloud privateca pools add-iam-policy-binding SUBORDINATE_CA_POOL_ID \
  --location=REGION \
  --role=roles/privateca.poolReader \
  --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/*"
```

Namespace and managed identity (IDs: 2-63 chars, lowercase alphanumeric and dashes, immutable):

```
gcloud iam workload-identity-pools namespaces create NAMESPACE_ID \
    --workload-identity-pool="POOL_ID" \
    --location="global"

gcloud iam workload-identity-pools managed-identities create MANAGED_IDENTITY_ID \
    --namespace="NAMESPACE_ID" \
    --workload-identity-pool="POOL_ID" \
    --location="global"
```

```
spiffe://POOL_ID.global.PROJECT_NUMBER.workload.id.goog/ns/NAMESPACE_ID/sa/MANAGED_IDENTITY_ID
```

Attestation policy (which workloads may receive the identity):

```
gcloud iam workload-identity-pools managed-identities set-attestation-rules MANAGED_IDENTITY_ID \
   --namespace=NAMESPACE_ID \
   --workload-identity-pool=POOL_ID \
   --policy-file=PATH_TO_POLICY_JSON_FILE \
   --location=global
```

```
gcloud iam workload-identity-pools managed-identities add-attestation-rule MANAGED_IDENTITY_ID \
   --namespace=NAMESPACE_ID \
   --workload-identity-pool=POOL_ID \
   --google-cloud-resource='//compute.googleapis.com/projects/WORKLOAD_PROJECT_NUMBER/type/Instance/attached_service_account.uid/SERVICE_ACCOUNT_UID' \
   --location=global
```

Optional trust federation between pools:

Adapted (not in the official docs): indentation restored so `additionalTrustBundles` is nested under `inlineTrustConfig`, as in the GKE page's JSON sample (the official Compute Engine YAML sample lost its nesting).

```yaml
inlineTrustConfig:
  additionalTrustBundles:
    POOL_ID.global.PROJECT_NUMBER.workload.id.goog:
      trustAnchors:
      - pemCertificate: "---BEGIN CERTIFICATE---\nPEM_ENCODED_CERTIFICATE\n---END CERTIFICATE---"
```

```
gcloud iam workload-identity-pools update POOL_ID \
  --location="global" \
  --inline-trust-config-file=TRUST_CONFIG_FILE
```

### GKE fleet clusters

```
gcloud container clusters update CLUSTER_NAME \
--workload-pool=PROJECT_ID.svc.id.goog \
--enable-fleet \
--fleet-project=PROJECT_ID
```

Deploy a test Pod (Google-managed pool; for a self-managed pool use `trustDomain: fleet-project/tenancy-scope`):

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  namespace: KUBERNETES_NAMESPACE
  name: example-pod
spec:
  containers:
  - name: main
    image: debian
    command: ['sleep', 'infinity']
    volumeMounts:
    - name: fleet-spiffe-credentials
      mountPath: /var/run/secrets/workload-spiffe-credentials
      readOnly: true
  nodeSelector:
    iam.gke.io/gke-metadata-server-enabled: "true"
  volumes:
  - name: fleet-spiffe-credentials
    csi:
      driver: podcertificate.gke.io
      volumeAttributes:
        signerName: spiffe.gke.io/fleet-svid
        trustDomain: fleet-project/svc.id.goog
EOF
```

```bash
kubectl exec -it example-pod -n KUBERNETES_NAMESPACE -- ls  /var/run/secrets/workload-spiffe-credentials
kubectl exec -it example-pod --namespace=KUBERNETES_NAMESPACE -- cat /var/run/secrets/workload-spiffe-credentials/certificates.pem | openssl x509 -noout -text > certfile
```

SPIFFE IDs for GKE:

```text
Google-managed pool: spiffe://PROJECT_ID.svc.id.goog/ns/KUBERNETES_NAMESPACE/sa/default
Self-managed pool:   spiffe://POOL_NAME.global.POOL_HOST_PROJECT_NUMBER.workload.id.goog/ns/KUBERNETES_NAMESPACE/sa/default
```

## Options / Props

| Pool type (GKE) | Characteristics |
|-----------------|-----------------|
| Google-managed | Created automatically when clusters join a fleet; no subresources (namespaces, identities, providers); GKE workloads only; namespace sameness, all clusters equally privileged. |
| Self-managed | Own identity hierarchy (namespaces, identities) and attestation policies; any workload type; set as the fleet scope-tenancy pool for mixed-trust fleets (requires team scopes and fleet namespaces). |

## Notes

- A pool for managed workload identities on Compute Engine must be created in `TRUST_DOMAIN` mode. If `mode: TRUST_DOMAIN` is missing from `describe`, check the gcloud billing/quota project and update gcloud.
- Resources (clusters, root CA, subordinate CAs) may live in separate projects; pass `--project` for each.
- For Autopilot clusters, omit `--enable-workload-identity` and the `nodeSelector` in the PodSpec.
- The self-managed Pod's Kubernetes namespace must match the fleet namespace in the team scope.
- Corrected from the official docs: the issuance-config and trust-config YAML samples on the Compute Engine page lost their indentation and are re-indented here (the `inlineCertificateIssuanceConfig` / `inlineTrustConfig` wrappers are kept, as in the official pages); the `principalSet` member paths had a stray `/name` segment, which is removed.
- Source: https://docs.cloud.google.com/iam/docs/create-managed-workload-identities (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/create-managed-workload-identities-gke (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [workload-identity-federation-best-practices.md](./workload-identity-federation-best-practices.md)
- [workforce-identity-federation.md](./workforce-identity-federation.md)
