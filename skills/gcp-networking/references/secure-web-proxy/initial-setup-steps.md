---
source: https://docs.cloud.google.com/secure-web-proxy/docs/initial-setup-steps
---

# Initial setup steps

One-time setup required before first using Secure Web Proxy: IAM roles, project and billing, APIs, a VPC subnet, a proxy-only subnet and an optional TLS certificate.

## Signature / Usage

### Enable the required APIs

```bash
gcloud services enable \
    compute.googleapis.com \
    certificatemanager.googleapis.com \
    networkservices.googleapis.com \
    networksecurity.googleapis.com \
    privateca.googleapis.com \
    cloudtrace.googleapis.com
```

### Create a VPC subnet

Create one in each region where you deploy a Secure Web Proxy instance. An existing subnet can be reused by setting `purpose` to `PRIVATE`. The VPC subnet is referenced when creating the instance.

```bash
gcloud compute networks subnets create VPC_SUBNET_NAME \
    --purpose=PRIVATE \
    --region=REGION \
    --network=NETWORK_NAME \
    --range=IP_RANGE
```

Replace `VPC_SUBNET_NAME`, `REGION`, `NETWORK_NAME` and `IP_RANGE` (a subnet range such as `10.10.10.0/24`).

### Create a proxy subnet

Create one for each region of deployment. It is not referenced when creating the instance.

```bash
gcloud compute networks subnets create PROXY_SUBNET_NAME \
    --purpose=REGIONAL_MANAGED_PROXY \
    --role=ACTIVE \
    --region=REGION \
    --network=NETWORK_NAME \
    --range=IP_RANGE
```

Replace `IP_RANGE` with a range such as `192.168.0.0/23`.

### Create a self-managed TLS certificate (example)

```bash
openssl req -x509 -newkey rsa:2048 \
    -keyout KEY_PATH \
    -out CERTIFICATE_PATH -days 365 \
    -subj '/CN=SWP_HOST_NAME' -nodes -addext \
    "subjectAltName=DNS:SWP_HOST_NAME"
```

Replace `KEY_PATH` (such as `~/key.pem`), `CERTIFICATE_PATH` (such as `~/cert.pem`) and `SWP_HOST_NAME` (such as `myswp.example.com`). Then upload it to Certificate Manager and deploy it to a load balancer as described in the Certificate Manager regional self-managed certificate guide.

## Options / Props

### IAM roles

| Task | Role |
|------|------|
| Configure policies and provision an instance | Compute Network Admin (`roles/compute.networkAdmin`) |
| Upload explicit Secure Web Proxy TLS certificates | Certificate Manager Editor (`roles/certificatemanager.editor`) |
| Configure distributed tracing and telemetry policies | Network Services Admin (`roles/networkservices.admin`) or Compute Network Admin (`roles/compute.networkAdmin`) |
| View trace spans in Cloud Trace | Cloud Trace User (`roles/cloudtrace.user`) |
| Export trace spans to Trace | Cloud Trace Agent (`roles/cloudtrace.agent`) granted to the Compute Engine service agent `service-PROJECT_NUMBER@compute-system.iam.gserviceaccount.com`, the Network Security service agent `service-PROJECT_NUMBER@gcp-sa-networksecurity.iam.gserviceaccount.com`, and client VM service accounts if client applications generate or propagate spans |
| Optional: manage Compute Engine organization security policies | Compute Organization Security Policy Admin (`roles/compute.orgSecurityPolicyAdmin`) |

### Required APIs

| API | Note |
|-----|------|
| Compute Engine, Certificate Manager, Network Services, Network Security | Required |
| Cloud Trace (`cloudtrace.googleapis.com`) | Required in the console list; needed to trace outbound traffic |
| Certificate Authority Service (`privateca.googleapis.com`) | Required only to configure TLS inspection |

### Subnet sizing

| Item | Value |
|------|-------|
| Proxy subnet recommended size | `/23`, which can store up to 512 proxy-only addresses |

## Notes

- These steps are required only before the first time you use Secure Web Proxy. Billing must be enabled for the project.
- TLS certificates are optional: policy enforcement without deep inspection needs none. They are required only when clients connect to the proxy by using HTTPS. Certificate Manager options: regional Google-managed certificate with per-project DNS authorization, regional Google-managed certificate with Certificate Authority Service, or regional self-managed certificate.
- The generated private key (`KEY_PATH`) must not be committed or shared.
- The source also shows Console steps and project creation (`gcloud projects create PROJECT_ID`, `gcloud config set project PROJECT_ID`).
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/initial-setup-steps (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Full flag list for `gcloud compute networks subnets create` is in the `gcp-compute` skill: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/create

## Related

- [overview.md](./overview.md)
- [quickstart.md](./quickstart.md)
- [tls-inspection-overview.md](./tls-inspection-overview.md)
