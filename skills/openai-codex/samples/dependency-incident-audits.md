# Audit dependency incidents

Turn a public package advisory into a safe repo-audit plan.

```text
Help me audit this repository for exposure to this public package advisory: [advisory URL].

Stay read-only unless I explicitly approve a remediation step.

First, summarize:
- affected packages and version ranges
- authoritative sources versus broader reports
- what evidence would prove exposure in this repo
- what evidence would rule it out

Then inspect:
- package manifests and lock files
- CI workflows and permissions
- install, build, and postinstall scripts
- vendored artifacts, containers, or generated bundles if relevant
- cache or token exposure paths if the advisory involves CI or publishing

Return:
- evidence status: confirmed exposure, needs verification, or ruled out
- severity and blast-radius notes
- file references for every repo-specific claim
- caveats and recommended next steps

Do not install packages, run lifecycle scripts, build the project, execute untrusted code, rotate credentials, or clean up files unless I explicitly approve that step.
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). `suggestedEffort: high`. The GitHub plugin inspects repository files, pull requests, workflows, and security-relevant history
- Best for: engineering and security teams responding to public package or supply chain advisories; incident reviews that must gather evidence without installing packages or running untrusted code
