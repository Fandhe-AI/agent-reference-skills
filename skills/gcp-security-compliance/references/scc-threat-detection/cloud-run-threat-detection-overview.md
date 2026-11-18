---
source: https://docs.cloud.google.com/security-command-center/docs/cloud-run-threat-detection-overview
---

# Cloud Run Threat Detection overview

Cloud Run Threat Detection is a built-in Security Command Center service (Premium and Enterprise (Deprecated) service tiers) that continuously monitors supported Cloud Run resources for common runtime attacks and writes findings in near real time. Runtime detectors look for suspicious binaries and libraries and use natural language processing (NLP) to detect malicious Bash and Python code. Control plane detectors come from Event Threat Detection.

## Signature / Usage

### Runtime detectors that do not run by default

When you enable Cloud Run Threat Detection, most runtime detectors run by default, except for the following. Each detector is managed as an individual module; with the gcloud CLI, `gcloud scc manage services update cloud-run-threat-detection` (abbreviated `crtd`) takes modules through `--module-config-file` (`intended_enablement_state`: `ENABLED`, `DISABLED` or `INHERITED`), and `--validate-only` validates the request without applying it.

```text
- `Credential Access: Find Google Cloud Credentials`
- `Defense Evasion: Base64 Encoded Python Script Executed`
- `Defense Evasion: Launch Code Compiler Tool In Container`
- `Execution: Program Run with Disallowed HTTP Proxy Env`
- `Exfiltration: Launch Remote File Copy Tools in Container`
- `Impact: Remove Bulk Data From Disk`
```

## Options / Props

### Supported resources and execution environments

| Item | Detail |
|---|---|
| Resources | Cloud Run services, Cloud Run jobs, Cloud Run worker pools |
| Runtime detectors | Only Cloud Run resources on the second generation execution environment. After you enable Cloud Run Threat Detection you cannot create a service or revision on the first generation environment. Test workloads on the second generation environment first. To enable runtime detection for a service, deploy a revision that sets the execution environment to the second generation or the default. |
| Control plane detectors | First and second generation execution environments |

### Runtime detectors (display name, API name)

| Display name | API name | What it detects |
|---|---|---|
| Command and Control: Steganography Tool Detected | `CLOUD_RUN_STEGANOGRAPHY_TOOL_DETECTED` | A steganography tool was executed |
| Credential Access: Find Google Cloud Credentials | `CLOUD_RUN_FIND_GCP_CREDENTIALS` | Command searching for Google Cloud keys or passwords (disabled by default) |
| Credential Access: GPG Key Reconnaissance | `CLOUD_RUN_GPG_KEY_RECONNAISSANCE` | Command searching for GPG keys |
| Credential Access: Search Private Keys or Passwords | `CLOUD_RUN_SEARCH_PRIVATE_KEYS_OR_PASSWORDS` | Command searching for private keys, passwords or credentials |
| Defense Evasion: Base64 ELF File Command Line | `CLOUD_RUN_BASE64_ELF_FILE_CMDLINE` | Process argument is an encoded ELF file |
| Defense Evasion: Base64 Encoded Python Script Executed | `CLOUD_RUN_BASE64_ENCODED_PYTHON_SCRIPT_EXECUTED` | Process argument is a base64-encoded Python script (disabled by default) |
| Defense Evasion: Base64 Encoded Shell Script Executed | `CLOUD_RUN_BASE64_ENCODED_SHELL_SCRIPT_EXECUTED` | Process argument is a base64-encoded shell script |
| Defense Evasion: Launch Code Compiler Tool In Container | `CLOUD_RUN_LAUNCH_CODE_COMPILER_TOOL_IN_CONTAINER` | Code compiler launched in the container (disabled by default) |
| Execution: Added Malicious Binary Executed | `CLOUD_RUN_ADDED_MALICIOUS_BINARY_EXECUTED` | Malicious per threat intelligence, not in the original image |
| Execution: Added Malicious Library Loaded | `CLOUD_RUN_ADDED_MALICIOUS_LIBRARY_LOADED` | Malicious library, not in the original image |
| Execution: Added Malicious Skill Executed | `CLOUD_RUN_ADDED_MALICIOUS_SKILL_EXECUTED` | Malicious skill executed, not in the original image |
| Execution: Added Malicious Skill Loaded | `CLOUD_RUN_ADDED_MALICIOUS_SKILL_LOADED` | Malicious skill loaded, not in the original image |
| Execution: Built in Malicious Binary Executed | `CLOUD_RUN_BUILT_IN_MALICIOUS_BINARY_EXECUTED` | Malicious per threat intelligence, included in the original image |
| Execution: Built-in Malicious Skill Executed | `CLOUD_RUN_BUILT_IN_MALICIOUS_SKILL_EXECUTED` | Malicious skill included in the original image |
| Execution: Container Escape | `CLOUD_RUN_CONTAINER_ESCAPE` | Process tried to break out of container isolation |
| Execution: Fileless Execution in /memfd: | `CLOUD_RUN_FILELESS_EXECUTION_DETECTION_MEMFD` | Process run from an in-memory file descriptor |
| Execution: Kubernetes Attack Tool Execution | `CLOUD_RUN_KUBERNETES_ATTACK_TOOL_EXECUTION` | Kubernetes-specific attack tool executed |
| Execution: Local Reconnaissance Tool Execution | `CLOUD_RUN_LOCAL_RECONNAISSANCE_TOOL_EXECUTION` | Reconnaissance tool not typical for the container |
| Execution: Malicious Python executed | `CLOUD_RUN_MALICIOUS_PYTHON_EXECUTED` | ML model classified executed Python as malicious; cannot be enabled and generates no findings in a location with data residency enabled |
| Execution: Modified Malicious Binary Executed | `CLOUD_RUN_MODIFIED_MALICIOUS_BINARY_EXECUTED` | Malicious, in the original image, modified at runtime |
| Execution: Modified Malicious Library Loaded | `CLOUD_RUN_MODIFIED_MALICIOUS_LIBRARY_LOADED` | Malicious library, in the original image, modified at runtime |
| Execution: Modified Malicious Skill Executed | `CLOUD_RUN_MODIFIED_MALICIOUS_SKILL_EXECUTED` | Malicious skill executed, modified at runtime |
| Execution: Modified Malicious Skill Loaded | `CLOUD_RUN_MODIFIED_MALICIOUS_SKILL_LOADED` | Malicious skill loaded, modified at runtime |
| Execution: Netcat Remote Code Execution in Container | `CLOUD_RUN_NETCAT_REMOTE_CODE_EXECUTION_IN_CONTAINER` | Netcat executed in the container |
| Execution: Possible Arbitrary Command Execution through CUPS (CVE-2024-47076) | `CLOUD_RUN_POSSIBLE_ARBITRARY_COMMAND_EXECUTION_THROUGH_CUPS` | `foomatic-rip` executing common shell programs |
| Execution: Possible Remote Command Execution Detected | `CLOUD_RUN_POSSIBLE_REMOTE_COMMAND_EXECUTION_DETECTED` | UNIX commands spawned through a network socket |
| Execution: Program Run with Disallowed HTTP Proxy Env | `CLOUD_RUN_PROGRAM_RUN_WITH_DISALLOWED_HTTP_PROXY_ENV` | Program run with a disallowed HTTP proxy variable (disabled by default) |
| Execution: Socat Reverse Shell Detected | `CLOUD_RUN_SOCAT_REVERSE_SHELL_DETECTED` | `socat` used to create a reverse shell |
| Execution: Suspicious OpenSSL Shared Object Loaded | `CLOUD_RUN_SUSPICIOUS_OPENSSL_SHARED_OBJECT_LOADED` | OpenSSL loaded a custom shared object |
| Exfiltration: Launch Remote File Copy Tools in Container | `CLOUD_RUN_LAUNCH_REMOTE_FILE_COPY_TOOLS_IN_CONTAINER` | Remote file copy tool run (disabled by default) |
| Impact: Detect Malicious Cmdlines | `CLOUD_RUN_DETECT_MALICIOUS_CMDLINES` | Destructive command arguments |
| Impact: Remove Bulk Data From Disk | `CLOUD_RUN_REMOVE_BULK_DATA_FROM_DISK` | Bulk data deletion (disabled by default) |
| Impact: Suspicious cryptocurrency mining activity using the Stratum Protocol | `CLOUD_RUN_SUSPICIOUS_CRYPTO_MINING_ACTIVITY_USING_STRATUM_PROTOCOL` | Process communicating over the Stratum protocol |
| Malicious Script Executed | `CLOUD_RUN_MALICIOUS_SCRIPT_EXECUTED` | ML model classified executed Bash as malicious; cannot be enabled and generates no findings in a location with data residency enabled |
| Malicious URL Observed | `CLOUD_RUN_MALICIOUS_URL_OBSERVED` | URL in a process argument list matches Google Safe Browsing unsafe-resource lists |
| Privilege Escalation: Abuse of Sudo For Privilege Escalation (CVE-2019-14287) | `CLOUD_RUN_ABUSE_SUDO_FOR_PRIVILEGE_ESCALATION` | `sudo` before v1.8.28 exploit attempt |
| Privilege Escalation: Polkit Local Privilege Escalation Vulnerability (CVE-2021-4034) | `CLOUD_RUN_POLKIT_LOCAL_PRIVILEGE_ESCALATION_VULNERABILITY` | Non-root `pkexec` with privilege-escalating environment |
| Privilege Escalation: Sudo Potential Privilege Escalation (CVE-2021-3156) | `CLOUD_RUN_SUDO_POTENTIAL_PRIVILEGE_ESCALATION` | `sudo` or `sudoedit` (versions 1.9.5p2 and earlier) with exploit arguments |
| Reverse Shell | `CLOUD_RUN_REVERSE_SHELL` | Process started with stream redirection to a remote socket (`stdin` bound) |
| Unexpected Child Shell | `CLOUD_RUN_UNEXPECTED_CHILD_SHELL` | A process that does not normally invoke shells spawned one |

### Control plane detectors (through Event Threat Detection, enabled by default)

| Display name | API name | Log source | Default severity |
|---|---|---|---|
| Impact: Cryptomining Commands | `CLOUD_RUN_JOBS_CRYPTOMINING_COMMANDS` | IAM System Event audit logs | High |
| Execution: Cryptomining Docker Image | `CLOUD_RUN_CRYPTOMINING_DOCKER_IMAGES` | IAM System Event audit logs | High |
| Privilege Escalation: Default Compute Engine Service Account SetIAMPolicy | `CLOUD_RUN_SERVICES_SET_IAM_POLICY` | Admin Activity logs | Low |

## Notes

- How it works: a watcher process collects container and event information for the whole duration of a workload; events are analyzed (NLP for Bash and Python); incidents become findings, nothing else is stored, and collected data is ephemeral.
- Known issue: if the watcher process stops prematurely in a running instance, it does not restart; the instance stops sending telemetry, Cloud Run Threat Detection logs are absent from instance logs, and there is no indicator that the watcher stopped.
- Source inconsistency kept as written: this page names the CUPS detector `CVE-2024-47076`; the Agent Platform Threat Detection page names the same detector `CVE-2024-47177`.
- The service name `cloud-run-threat-detection` (`crtd`) and the `--module-config-file` / `--validate-only` flags come from the help of `gcloud scc manage services update` (gcloud 593.0.0): https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/update
- Detector descriptions are condensed to one phrase each; the source gives longer attack-context text per detector. For deprecated and shut down rules, see the Security Command Center Deprecations page.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization using it automatically moves to the Premium service tier on or after that date.
- Cloud Run Threat Detection is a Security Command Center service; Cloud Run deployment itself is in the `gcp-run` skill.
- Source: https://docs.cloud.google.com/security-command-center/docs/cloud-run-threat-detection-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview-threats.md](./overview-threats.md)
- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
- [agent-platform-threat-detection-overview.md](./agent-platform-threat-detection-overview.md)
