---
source: https://docs.cloud.google.com/security-command-center/docs/ai-protection-overview
---

# AI Protection overview

AI Protection in Security Command Center (SCC) manages the security posture of AI workloads: AI asset inventory, vulnerabilities, risk (attack paths), over-privileged agents, compliance and threat detection. It is available with organization-level and project-level SCC activations; the **AI Security** dashboard shows aggregated data for all projects and resources, or for the selected project, depending on the activation scope. Standard, Premium and Enterprise (Deprecated) service tiers apply; capabilities differ per tier.

## Signature / Usage

### Grant dashboard-only access (Security Center Admin Viewer)

`RESOURCE_TYPE` is `organizations` or `projects`, `RESOURCE_ID` the numeric organization or project ID.

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
  --member=user:USER_EMAIL_ID \
  --role=roles/securitycenter.adminViewer
```

## Options / Props

### Capabilities by service tier

| Capability | Tier condition |
|---|---|
| Assess your AI asset inventory | Standard, Premium, Enterprise (Deprecated) |
| Identify vulnerabilities (CVEs and plaintext secrets in agentic workloads deployed with Agent Runtime) | Premium and Enterprise (Deprecated) |
| Identify risks (Attack Path Simulation and predefined security graph rules; agents and MCP servers as high-value resources) | Premium and Enterprise (Deprecated) |
| Detect over-privileged agents (Agent Runtime agents with excessive permissions) | No tier given in the capability list; lost after a downgrade to Standard (see the downgrade table) |
| Manage compliance | Standard: baseline findings with Security Essentials. Premium and Enterprise: advanced framework compliance |
| Detect and manage threats | No tier given in the capability list; the threat detection services below are Premium and Enterprise (Deprecated) |

### Detection services

| Service | Tier | Notes |
|---|---|---|
| AI Discovery service | Premium, Enterprise (Deprecated) | Built in; uses Cloud Monitoring data to discover AI models and whether Model Armor protects them. On the Standard tier it does not detect Gemini models. |
| Compliance Manager frameworks | Standard, Premium, Enterprise (Deprecated) | Deployed automatically in detective mode. Security Essentials: all tiers. Google Recommended AI Essentials - Gemini Enterprise Agent Platform: Premium and Enterprise. |
| Event Threat Detection rules for Gemini Enterprise Agent Platform assets | Premium, Enterprise (Deprecated) | See the category list below. |
| Agent Platform Threat Detection for Agent Runtime | Premium, Enterprise (Deprecated); Preview | Runtime threat detection for agents deployed to Agent Runtime. |
| Agent Platform Vulnerability Assessment | Premium, Enterprise (Deprecated); Preview | Vulnerabilities and plaintext secrets (credentials, keys, access tokens, certificates) in Gemini Enterprise Agent Platform container images. |
| Notebook Security Scanner | Premium, Enterprise (Deprecated); Preview | Scans Colab Enterprise notebooks for vulnerabilities in Python packages. |
| Sensitive Data Protection | Premium, Enterprise (Deprecated) | Discovery service that finds, classifies and protects sensitive data (PII). |
| Model Armor | Standard, Premium, Enterprise (Deprecated) | Findings appear in SCC after Model Armor is enabled and integrated with AI components. On Standard, AI Protection does not support Gemini models. |
| Risk Engine | Premium, Enterprise (Deprecated) | Attack exposure scores and attack paths to high-value resources. |

### Event Threat Detection finding categories for AI assets

| Category | Finding |
|---|---|
| Persistence | New AI API Method; New Geography for AI Service; IAM Anomalous Grant to Agentic Identity; Sensitive AI Permission Added to Custom Role; Sensitive Role Granted by AI Agent; Sensitive Role Granted to External AI Agent |
| Privilege Escalation | Anomalous Impersonation of Service Account for AI Admin Activity; Anomalous Service Account Impersonator for AI Data Access; Anomalous Multistep Service Account Delegation for AI Admin Activity; Anomalous Multistep Service Account Delegation for AI Data Access; Anomalous Service Account Impersonator for AI Admin Activity |
| Initial Access | Dormant Service Account Activity in AI Service |
| Credential Access | Agentic Identity Credential Used Outside of Google Cloud |
| Defense Evasion | Project Level Token Creator Role Granted to AI Agent; Folder Level Token Creator Role Granted to AI Agent; Organization Level Token Creator Role Granted to AI Agent |

### Agent Platform Threat Detection finding categories (Preview)

| Category | Finding |
|---|---|
| Command and Control | Steganography Tool Detected |
| Credential Access | Find Google Cloud Credentials; GPG Key Reconnaissance; Search Private Keys or Passwords |
| Defense Evasion | Base64 ELF File Command Line; Base64 Encoded Python Script Executed; Base64 Encoded Shell Script Executed; Launch Code Compiler Tool In Container |
| Execution | Netcat Remote Code Execution in Container; Possible Arbitrary Command Execution through CUPS (CVE-2024-47177); Possible Remote Command Execution Detected; Program Run with Disallowed HTTP Proxy Env; Socat Reverse Shell Detected; Suspicious OpenSSL Shared Object Loaded; Malicious Python executed; Container Escape; Kubernetes Attack Tool Execution; Local Reconnaissance Tool Execution; Unexpected Child Shell |
| Exfiltration | Launch Remote File Copy Tools in Container |
| Impact | Detect Malicious Cmdlines; Remove Bulk Data from Disk; Suspicious crypto mining activity using the Stratum Protocol; Malicious Script Executed; Malicious URL Observed |
| Privilege Escalation | Abuse of Sudo For Privilege Escalation (CVE-2019-14287); Polkit Local Privilege Escalation Vulnerability (CVE-2021-4034); Sudo Potential Privilege Escalation (CVE-2021-3156) |

### Supported resources

| Discovery mechanism / resource | Detail |
|---|---|
| Declarative AI assets | Assets that AI lifecycle management tools (such as Gemini Enterprise Agent Platform) track. |
| Inferred AI assets | General-purpose assets (compute, storage) that process AI data or workloads. |
| Model-as-a-Service (API only) | Assets that make programmatic calls into first-party or third-party AI models. |
| Gemini Enterprise & Agent search apps | AI systems that perceive their environment, make decisions and act. |
| Endpoints | Shown as **Agent Platform endpoints** in the **AI resources** tab of the **Assets page**. |
| Data sources | BigQuery tables, Cloud Storage, Agent Platform datasets, Gemini Enterprise datastores. |
| Models | Foundation, fine-tuned, standard first-party and custom models; examples: Gemini (Premium and Enterprise (Deprecated) only), Llama, translation models, custom task models. |
| MCP servers | Identified when cataloged in Agent Registry; requires the App Hub API configured in each project that hosts an MCP server. |

### Impact of downgrading from Premium or Enterprise to Standard

| Area | Effect |
|---|---|
| Detection services | SCC disables detection services and Compliance Manager frameworks that Standard does not support. |
| Investigative features | Lost: attack path simulations for AI assets, agent vulnerability assessment, detection of over-privileged agents. |
| Findings | Findings from Compliance Manager frameworks not supported on Standard become inactive. |
| Upgrading back | Advanced features are restored, but removed framework deployments are not recovered; redeploy them manually. |

## Notes

- Enterprise tier shutdown: "The Security Command Center Enterprise service tier will shut down on May 21, 2027. If your organization uses the Enterprise service tier, then the organization will automatically move to the Premium service tier on or after May 21, 2027."
- Custom Compliance Manager frameworks are copies of built-in frameworks for your tier; controls can be added or removed and the frameworks applied to specific organizations, folders or projects. Limitation: you cannot assign AI Protection frameworks to applications.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/configure-ai-protection.
- Inconsistency kept from the source: the AI Discovery service carries a Premium and Enterprise (Deprecated) tier note, while the body also describes its behavior on the Standard tier (no Gemini model detection).
- Source use cases (financial services, healthcare, manufacturing) are illustrative and omitted here.
- Source: https://docs.cloud.google.com/security-command-center/docs/ai-protection-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-ai-protection.md](./configure-ai-protection.md)
- [model-armor.md](./model-armor.md)
