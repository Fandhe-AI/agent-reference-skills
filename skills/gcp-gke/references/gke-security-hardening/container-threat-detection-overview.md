---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-container-threat-detection-overview
---

# Container Threat Detection overview

Container Threat Detection is a built-in Security Command Center service that continuously monitors Container-Optimized OS node images, evaluating changes and remote access attempts to detect runtime attacks in near-real time. It alerts in Security Command Center and optionally Cloud Logging, and uses natural language processing (NLP) to detect malicious Bash and Python code. It is available only with the Premium or Enterprise service tier.

## Signature / Usage

### Modules that control environment variables and CLI arguments in findings

Module identifiers (verbatim from the source):

```text
REPORT_ENVIRONMENT_VARIABLES
REPORT_CLI_ARGUMENTS
```

Enable or disable modules, and exclude environment variables or CLI arguments, as described in https://docs.cloud.google.com/security-command-center/docs/how-to-use-container-threat-detection.

## Options / Props

### How it works

1. Instrumentation collects low-level behavior in the guest kernel and executed scripts; a user mode watcher DaemonSet passes event and container information (best effort; container information can be dropped from a finding) to a detector service.
2. The detector analyzes events; Bash and Python scripts are analyzed with NLP.
3. Incidents are written as findings to Security Command Center and optionally Cloud Logging. If no incident is found nothing is stored; kernel and detector data are ephemeral.

### Detectors disabled by default

`ADDED_BINARY_EXECUTED`, `ADDED_LIBRARY_LOADED`, `PAM_D_MODIFICATION` (Preview), `ACCESS_SENSITIVE_FILES_ON_NODES` (Preview), `FIND_GCP_CREDENTIALS`, `DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM` (Preview), `LAUNCH_CODE_COMPILER_TOOL_IN_CONTAINER`, `ROOT_CERTIFICATE_INSTALLED` (Preview), `INGRESS_NIGHTMARE_VULNERABILITY_EXPLOITATION` (Preview), `PROGRAM_RUN_WITH_DISALLOWED_HTTP_PROXY_ENV`, `SUSPICIOUS_CRON_MODIFICATION` (Preview), `LAUNCH_REMOTE_FILE_COPY_TOOLS_IN_CONTAINER`, `MODIFY_LD_SO_PRELOAD` (Preview).

### Detectors (module : severity)

| Detector | Module | Severity |
|----------|--------|----------|
| Added Binary Executed | `ADDED_BINARY_EXECUTED` | Low |
| Added Library Loaded | `ADDED_LIBRARY_LOADED` | Low |
| Collection: Pam.d Modification (Preview, file monitoring) | `PAM_D_MODIFICATION` | not stated |
| Command and Control: Steganography Tool Detected | `STEGANOGRAPHY_TOOL_DETECTED` | Critical |
| Command and Control: Piped Encoded Download | `PIPED_ENCODED_DOWNLOAD` | Medium |
| Command and Control: Piped Encoded Code Execution Detected | `PIPED_ENCODED_CODE_EXECUTION` | High |
| Credential Access: Access Sensitive Files On Nodes (Preview, file monitoring) | `ACCESS_SENSITIVE_FILES_ON_NODES` | not stated |
| Credential Access: Find Google Cloud Credentials | `FIND_GCP_CREDENTIALS` | Low |
| Credential Access: GPG Key Reconnaissance | `GPG_KEY_RECONNAISSANCE` | Critical |
| Credential Access: Search Private Keys or Passwords | `SEARCH_PRIVATE_KEYS_OR_PASSWORDS` | Low |
| Defense Evasion: Base64 ELF File Command Line | `BASE64_ELF_FILE_CMDLINE` | Medium |
| Defense Evasion: Base64 Encoded Python Script Executed | `BASE64_ENCODED_PYTHON_SCRIPT_EXECUTED` | Medium |
| Defense Evasion: Base64 Encoded Shell Script Executed | `BASE64_ENCODED_SHELL_SCRIPT_EXECUTED` | Medium |
| Defense Evasion: Disable or Modify Linux Audit System (Preview, file monitoring) | `DISABLE_OR_MODIFY_LINUX_AUDIT_SYSTEM` | not stated |
| Defense Evasion: Launch Code Compiler Tool In Container | `LAUNCH_CODE_COMPILER_TOOL_IN_CONTAINER` | Low |
| Defense Evasion: Root Certificate Installed (Preview, file monitoring) | `ROOT_CERTIFICATE_INSTALLED` | not stated |
| Execution: Added Malicious Binary Executed | `ADDED_MALICIOUS_BINARY_EXECUTED` | Critical |
| Execution: Added Malicious Library Loaded | `ADDED_MALICIOUS_LIBRARY_LOADED` | Critical |
| Execution: Added Malicious Skill Executed / Loaded | `ADDED_MALICIOUS_SKILL_EXECUTED` / `ADDED_MALICIOUS_SKILL_LOADED` | Critical |
| Execution: Built in Malicious Binary Executed | `BUILT_IN_MALICIOUS_BINARY_EXECUTED` | Critical |
| Execution: Built-in Malicious Skill Executed | `BUILT_IN_MALICIOUS_SKILL_EXECUTED` | Critical |
| Execution: Container Escape | `CONTAINER_ESCAPE` | Critical |
| Execution: Fileless Execution in /memfd: | `FILELESS_EXECUTION_DETECTION_MEMFD` | High |
| Execution: Ingress Nightmare Vulnerability Execution (Preview, CVE-2025-1974) | `INGRESS_NIGHTMARE_VULNERABILITY_EXPLOITATION` | Medium |
| Execution: Kubernetes Attack Tool Execution | `KUBERNETES_ATTACK_TOOL_EXECUTION` | Critical |
| Execution: Local Reconnaissance Tool Execution | `LOCAL_RECONNAISSANCE_TOOL_EXECUTION` | Critical |
| Execution: Malicious Python executed (ML model) | `MALICIOUS_PYTHON_EXECUTED` | Critical |
| Execution: Modified Malicious Binary Executed | `MODIFIED_MALICIOUS_BINARY_EXECUTED` | Critical |
| Execution: Modified Malicious Library Loaded | `MODIFIED_MALICIOUS_LIBRARY_LOADED` | Critical |
| Execution: Modified Malicious Skill Executed / Loaded | `MODIFIED_MALICIOUS_SKILL_EXECUTED` / `MODIFIED_MALICIOUS_SKILL_LOADED` | Critical |
| Execution: Netcat Remote Code Execution in Container | `NETCAT_REMOTE_CODE_EXECUTION_IN_CONTAINER` | Low |
| Execution: Possible Arbitrary Command Execution through CUPS (CVE-2024-47076) | `POSSIBLE_ARBITRARY_COMMAND_EXECUTION_THROUGH_CUPS` | Critical |
| Execution: Possible Remote Command Execution Detected | `POSSIBLE_REMOTE_COMMAND_EXECUTION_DETECTED` | Medium |
| Execution: Program Run with Disallowed HTTP Proxy Env | `PROGRAM_RUN_WITH_DISALLOWED_HTTP_PROXY_ENV` | Low |
| Execution: Socat Reverse Shell Detected | `SOCAT_REVERSE_SHELL_DETECTED` | Medium |
| Execution: Suspicious Cron Modification (Preview, file monitoring) | `SUSPICIOUS_CRON_MODIFICATION` | not stated |
| Execution: Suspicious OpenSSL Shared Object Loaded | `SUSPICIOUS_OPENSSL_SHARED_OBJECT_LOADED` | Critical |
| Exfiltration: Launch Remote File Copy Tools in Container | `LAUNCH_REMOTE_FILE_COPY_TOOLS_IN_CONTAINER` | Low |
| Impact: Detect Malicious Cmdlines | `DETECT_MALICIOUS_CMDLINES` | Critical |
| Impact: Remove Bulk Data From Disk | `REMOVE_BULK_DATA_FROM_DISK` | Low |
| Impact: Suspicious crypto mining activity using the Stratum Protocol | `SUSPICIOUS_CRYPTO_MINING_ACTIVITY_USING_STRATUM_PROTOCOL` | High |
| Malicious Script Executed (ML model, Bash) | `MALICIOUS_SCRIPT_EXECUTED` | Critical |
| Malicious URL Observed (Google Safe Browsing lists) | `MALICIOUS_URL_OBSERVED` | Medium |
| Persistence: Modify ld.so.preload (Preview, file monitoring) | `MODIFY_LD_SO_PRELOAD` | not stated |
| Privilege Escalation: Abuse of Sudo For Privilege Escalation (CVE-2019-14287) | `ABUSE_SUDO_FOR_PRIVILEGE_ESCALATION` | Critical |
| Privilege Escalation: Fileless Execution in /dev/shm | `FILELESS_EXECUTION_DETECTION_SHM` | High |
| Privilege Escalation: Polkit Local Privilege Escalation Vulnerability (CVE-2021-4034) | `POLKIT_LOCAL_PRIVILEGE_ESCALATION_VULNERABILITY` | Critical |
| Privilege Escalation: Sudo Potential Privilege Escalation (CVE-2021-3156) | `SUDO_POTENTIAL_PRIVILEGE_ESCALATION` | Critical |
| Reverse Shell | `REVERSE_SHELL` | Critical |
| Unexpected Child Shell | `UNEXPECTED_CHILD_SHELL` | Critical |

## Notes

- Service tiers: the Security Command Center Enterprise tier shuts down on May 21, 2027; organizations on it automatically move to Premium on or after that date.
- File monitoring detectors (Pam.d, sensitive files, audit system, root certificate, cron, ld.so.preload) watch file operations on the node and have specific GKE version requirements (https://docs.cloud.google.com/security-command-center/docs/how-to-use-container-threat-detection#gke-version). Workloads with heavy file I/O such as CI/CD can degrade, so evaluate before enabling in production.
- Other security detection tools installed in the cluster can impair Container Threat Detection; the source recommends not installing any in a protected cluster.
- `MALICIOUS_PYTHON_EXECUTED` and `MALICIOUS_SCRIPT_EXECUTED` can't be enabled, and generate no findings, in locations where data residency is enabled.
- Host-kernel monitoring does not observe syscalls inside GKE Sandbox containers (see `sandbox-pods.md`).
- Each detector's description and detection input are in the source table; this page keeps module names and severities only. Container Threat Detection here is a runtime detection service; Security Command Center in general is planned in `gcp-security`.
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-container-threat-detection-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [sandbox-pods.md](./sandbox-pods.md)
- [about-configuration-scanning.md](./about-configuration-scanning.md)
- [hardening-your-cluster.md](./hardening-your-cluster.md)
