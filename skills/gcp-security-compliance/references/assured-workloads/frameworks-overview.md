---
source: https://docs.cloud.google.com/assured-workloads/docs/frameworks-overview
---

# Overview of Assured Workloads frameworks

Preview: frameworks for Assured Workloads provide cloud controls for data residency, access and personnel, equivalent to those of Assured Workloads folders, and are built from software-defined controls that assess support for multiple compliance programs within a folder or project.

## Signature / Usage

### Create a V2 workload with a compliance framework

The page has no code block. In the gcloud help, `gcloud assured workloads create --version=v2` takes a compliance framework (`--framework`) and cloud control configurations. This help example creates an environment in organization `123` and `us-central1` that onboards the existing project `projects/456` with the compliance framework `fedramp-moderate` and a control configuration from `controls.yaml`.

```bash
gcloud assured workloads create my-workload --organization=123 \
    --location=us-central1 --description="My Workload" \
    --target-project=projects/456 --framework=fedramp-moderate \
    --cloud-control-configs-from-file=controls.yaml --version=v2
```

## Options / Props

### Components

| Component | Description |
|---|---|
| Rule | A technical item within a cloud control that lets you meet a compliance, security or privacy requirement. Rules can be organization policies, IAM policies, cloud settings, and detection logic based on Common Expression Language (CEL). |
| Cloud control | A set of rules and associated metadata (remediation instructions, finding severity) that defines the security or compliance intent for a folder or project. A library of built-in cloud controls is included and you can create your own. Some cloud controls need extra information, for example the permitted regions for a control that checks where workloads run. |
| Framework | A collection of cloud controls and regulatory controls that represent security best practices or industry-defined standards; may map cloud controls to regulatory controls such as data boundaries like FedRAMP Moderate or IL2. Built-in frameworks can be customized, or you can create your own. |
| Framework deployment | The binding between a particular framework and a folder or project when you deploy the framework. |

### Cloud control modes

| Mode | Behavior |
|---|---|
| Detective | The cloud control is applied to the defined resources for monitoring; violations are detected and findings generated, and no preventive action is taken automatically. |
| Preventive | The cloud control is applied and the rules actively enforced; any resource activity that violates it is blocked. |

### Supported Assured Workloads data boundary frameworks

| Framework | Stage |
|---|---|
| Data Boundary for FedRAMP High | Preview |
| Data Boundary for FedRAMP Moderate | Preview |
| Data Boundary for Impact Level 2 (IL2) | Preview |
| Data Boundary for Impact Level 4 (IL4) | Preview |
| Data Boundary for Impact Level 5 (IL5) | Preview |
| Data Boundary for International Traffic in Arms (ITAR) | Preview |
| Data Boundary for Criminal Justice Information Systems (CJIS) | Preview |
| EU Data Boundary | Not marked Preview in the source |
| EU Data Boundary and Support | Preview |
| Switzerland Data Boundary | Not marked Preview in the source |
| UK Data Boundary | Not marked Preview in the source |
| US Data Boundary | Not marked Preview in the source |
| US Data Boundary and Support | Preview |

## Notes

- Preview: this feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support.
- Deploying frameworks in Assured Workloads is a Preview feature and you must be added to an allowlist; the source links a sign-up form for allowlist access.
- Ways to use frameworks: choose a predefined data boundary to enforce and monitor compliance, define your own compliant and secure configuration, view dashboards of your environment's alignment, and audit cloud environments including evidence collection and reports.
- The Assured Workloads Frameworks page in the Google Cloud console lists all available frameworks, which can be deployed in Assured Workloads or, depending on your Audit Manager subscription tier, audited.
- The source's component table places its header separator row after the last row; the table above keeps the same component / description pairs.
- The create example onboards an existing project into an Assured Workloads environment, which applies the framework's controls to it; try it on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/assured-workloads/docs/frameworks-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [control-packages.md](./control-packages.md)
- [eu-data-boundary.md](./eu-data-boundary.md)
