---
source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-other-clouds
---

# Workload Identity Federation with AWS, Azure, and Kubernetes clusters

Provider setup, attribute mappings, credential configuration, and workload deployment for AWS IAM credentials, Microsoft Entra ID (Azure), and AKS / EKS / self-managed Kubernetes clusters.

## Signature / Usage

### AWS provider (AWS IAM Credentials mechanism)

```bash
gcloud iam workload-identity-pools providers create-aws PROVIDER_ID \
  --location="global" \
  --workload-identity-pool="POOL_ID" \
  --account-id="ACCOUNT_ID" \
  --attribute-mapping="MAPPINGS" \
  --attribute-condition="CONDITIONS"
```

```bash
gcloud iam workload-identity-pools providers create-aws example-provider \
  --location="global" \
  --workload-identity-pool="pool-1" \
  --account-id="123456789000" \
  --attribute-mapping="google.subject=assertion.arn"
```

AWS mapping for an EC2 instance with an attached role, and an attribute condition limiting to assumed roles:

```text
google.subject=assertion.arn
attribute.account=assertion.account
attribute.aws_role=assertion.arn.extract('assumed-role/{role_name}/')
attribute.aws_ec2_instance=assertion.arn.extract('assumed-role/{role_and_session}').extract('/{session}')
assertion.arn.startsWith('arn:aws:sts::AWS_ACCOUNT_ID:assumed-role/')
```

```text
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.aws_ec2_instance/EC2_INSTANCE_ID
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.aws_role/ROLE_NAME
```

Credential configuration for AWS (add `--enable-imdsv2` if you use IMDSv2) and Azure:

```bash
gcloud iam workload-identity-pools create-cred-config \
    projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --service-account-token-lifetime-seconds=SERVICE_ACCOUNT_TOKEN_LIFETIME \
    --aws \
    --sts-location=REGION \
    --output-file=FILEPATH.json
```

```bash
gcloud iam workload-identity-pools create-cred-config \
    projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --service-account-token-lifetime-seconds=SERVICE_ACCOUNT_TOKEN_LIFETIME \
    --azure \
    --app-id-uri APPLICATION_ID_URI \
    --sts-location=REGION \
    --output-file=FILEPATH.json
```

### Azure (Microsoft Entra ID) provider

```bash
gcloud iam workload-identity-pools providers create-oidc PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --issuer-uri="ISSUER_URI" \
    --allowed-audiences="APPLICATION_ID_URI" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

```bash
gcloud iam workload-identity-pools providers create-oidc example-provider \
    --location="global" \
    --workload-identity-pool="pool-1" \
    --issuer-uri="https://sts.windows.net/00000000-1111-2222-3333-444444444444" \
    --allowed-audiences="api://my-app" \
    --attribute-mapping="google.subject=assertion.sub,google.groups=assertion.groups"
```

```text
google.subject=assertion.sub
google.subject=assertion.sub.extract('/eid1/c/pub/t/{sub_claim}')
```

Inspect Azure token claims from a VM with a managed identity, then paste into `https://jwt.ms/`:

```bash
curl \
  "http://169.254.169.254/metadata/identity/oauth2/token?resource=APP_ID_URI&api-version=2018-02-01" \
  -H "Metadata: true" | jq -r .access_token
```

### Kubernetes (AKS / EKS / self-managed)

Mapping and condition:

```text
google.subject=assertion.sub,
attribute.namespace=assertion['kubernetes.io']['namespace'],
attribute.service_account_name=assertion['kubernetes.io']['serviceaccount']['name'],
attribute.pod=assertion['kubernetes.io']['pod']['name']
assertion['kubernetes.io']['namespace'] in ['backend', 'monitoring']
```

Find the issuer:

```bash
az aks show -n NAME -g RESOURCE_GROUP --query "oidcIssuerProfile.issuerUrl" -otsv
aws eks describe-cluster --name NAME --query "cluster.identity.oidc.issuer" --output text
kubectl get --raw /.well-known/openid-configuration | jq -r .issuer
kubectl get --raw /openid/v1/jwks > cluster-jwks.json
```

Provider (AKS / EKS use the issuer only; self-managed clusters also upload the JWKS):

```bash
gcloud iam workload-identity-pools providers create-oidc WORKLOAD_PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --issuer-uri="ISSUER" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS" \
    --jwk-json-path="cluster-jwks.json"
```

Grant direct resource access to a Kubernetes ServiceAccount:

```bash
kubectl create serviceaccount KSA_NAME --namespace NAMESPACE
```

```bash
gcloud projects add-iam-policy-binding projects/PROJECT_ID \
    --role=roles/container.clusterViewer \
    --member=principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/MAPPED_SUBJECT \
    --condition=None
```

Alternative via service account impersonation:

```bash
gcloud iam service-accounts create IAM_SA_NAME \
    --project=IAM_SA_PROJECT_ID
```

```bash
gcloud projects add-iam-policy-binding IAM_SA_PROJECT_ID \
    --member="serviceAccount:IAM_SA_NAME@IAM_SA_PROJECT_ID.iam.gserviceaccount.com" \
    --role="ROLE"
```

```bash
gcloud iam service-accounts add-iam-policy-binding \
  IAM_SA_NAME@IAM_SA_PROJECT_ID.iam.gserviceaccount.com \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/MAPPED_SUBJECT" \
    --role=roles/iam.workloadIdentityUser
```

Deploy: credential configuration, ConfigMap, and a Pod with a projected token:

```bash
gcloud iam workload-identity-pools create-cred-config \
    projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/WORKLOAD_PROVIDER_ID \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --credential-source-file=/var/run/service-account/token \
    --credential-source-type=text \
    --sts-location=REGION \
    --output-file=credential-configuration.json
```

```bash
kubectl create configmap CONFIGMAP_NAME \
  --from-file credential-configuration.json \
  --namespace NAMESPACE
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example
  namespace: NAMESPACE
spec:
  containers:
  - name: example
    image: google/cloud-sdk:alpine
    command: ["/bin/sh", "-c", "gcloud auth login --cred-file \"${GOOGLE_APPLICATION_CREDENTIALS}\" && gcloud auth list && sleep 600"]
    volumeMounts:
    - name: token
      mountPath: "/var/run/service-account"
      readOnly: true
    - name: workload-identity-credential-configuration
      mountPath: "/etc/workload-identity"
      readOnly: true
    env:
    - name: GOOGLE_APPLICATION_CREDENTIALS
      value: "/etc/workload-identity/credential-configuration.json"

  serviceAccountName: KSA_NAME
  volumes:
  - name: token
    projected:
      sources:
      - serviceAccountToken:
          audience: https://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/WORKLOAD_PROVIDER_ID
          expirationSeconds: 3600
          path: token
  - name: workload-identity-credential-configuration
    configMap:
      name: CONFIGMAP_NAME
```

```bash
kubectl exec example --namespace NAMESPACE -- gcloud auth list
```

## Options / Props

| Item | Details |
|---|---|
| AWS mechanisms | AWS outbound identity federation (AWS acts as an OIDC IdP; follow the OIDC provider guide) or AWS IAM Credentials (verified via `GetCallerIdentity`; no AWS-side configuration) |
| AWS source attributes | `account`, `arn`, `userid` (from `GetCallerIdentity`) |
| AWS env vars when no metadata server | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` or `AWS_DEFAULT_REGION`, optional `AWS_SESSION_TOKEN` |
| `create-aws --account-id` | 12-digit AWS account number |
| Azure `--issuer-uri` | Tenant ID GUID, sometimes `https://sts.windows.net/TENANT_ID`; verify via the JWT's `iss` |
| Azure `--allowed-audiences` | The Application ID URI of the Entra ID application |
| `google.subject` limit | 127 characters (use `extract` for long Azure `sub`) |
| Kubernetes token claims | `sub` (`system:serviceaccount:NAMESPACE:KSA_NAME`), `"kubernetes.io".namespace`, `"kubernetes.io".serviceaccount.name`, `"kubernetes.io".pod.name` |
| Cluster prerequisites | AKS: OIDC issuer enabled; EKS: no change; self-managed: Kubernetes 1.20+ and `kube-apiserver` ServiceAccount token volume projection; cluster need not be internet-reachable |

## Notes

- Do the pool/provider setup once per AWS account, Entra tenant, or cluster; reuse for many workloads and projects. Use a dedicated project for pools and providers; enable the IAM, Resource Manager, Service Account Credentials, and Security Token Service APIs. The `gcp-` prefix is reserved for pool and provider IDs.
- Azure: the application grants all tenant users token access by default; restrict with app role assignments. Managed identity tokens carry the Object ID in `sub`; choose a unique, non-reassignable claim otherwise.
- For GKE clusters use Workload Identity Federation for GKE (see the GKE documentation) rather than this guide.
- The self-managed Kubernetes provider command does not validate the uploaded JWKS; a malformed or stale JWKS yields `Error connecting to the given credential's issuer`. Refresh the JWKS when cluster keys rotate.
- Direct resource access is recommended; fall back to service account impersonation where an API has federation limitations. Use the project number, not the project ID, in principal identifiers. Grant least-privilege roles.
- Warning: `--condition=None` on `add-iam-policy-binding` is required by the official command when the policy already has conditional bindings; it grants an unconditional binding on the project.
- Adapted from the official docs: the Pod command quotes `${GOOGLE_APPLICATION_CREDENTIALS}`, and the verification step uses `gcloud auth list` instead of `gcloud auth print-access-token` so the access token is not printed to logs.
- Client library minimum versions and `GOOGLE_APPLICATION_CREDENTIALS` / `gcloud auth login --cred-file` usage are the same as in the OIDC and SAML page.
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-other-clouds
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-kubernetes
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [wif-oidc-saml-providers.md](./wif-oidc-saml-providers.md)
- [wif-troubleshooting.md](./wif-troubleshooting.md)
- gcp-client-libraries covers ADC code.
