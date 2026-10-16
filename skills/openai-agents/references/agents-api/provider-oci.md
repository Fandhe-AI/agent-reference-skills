# Oracle Cloud Infrastructure (OCI)

OCI GenAI Sandboxes (beta) as a self-hosted sandbox provider using application-managed provisioning: your application creates and deletes both the Agents API session and the OCI sandbox. Contact your Oracle account manager for beta access.

## Signature / Usage

IAM policies (replace the placeholders):

```text
allow group <group-name> to manage generative-ai-sandbox in compartment <compartment-name>
allow group <group-name> to manage generative-ai-project in compartment <compartment-name>
```

Setup:

```bash
uv venv --python 3.14
source .venv/bin/activate
uv pip install --upgrade oci-cli
uv pip install "/path/to/oci-<beta-version>-py3-none-any.whl"

oci session authenticate --profile-name Sandbox --region us-chicago-1

export OCI_SANDBOX_PROJECT_ID="ocid1.generativeaiproject..."
export OPENAI_API_KEY="..."
export OPENAI_EXECUTOR_API_KEY="..."
```

## Options / Props

| Setting | Default |
|---------|---------|
| `OCI_SANDBOX_PROFILE` | `Sandbox` |
| `OCI_SANDBOX_REGION` | `us-chicago-1` |
| `OCI_SANDBOX_ENDPOINT` | `https://inference.generativeai.<region>.oci.oraclecloud.com` |
| `OCI_SANDBOX_RUNTIME` | `python-3.11` |
| `OCI_SANDBOX_SHAPE` | `SMALL` |
| `OCI_SANDBOX_EXPIRATION` | `PT30M` (30 minutes) |

## Notes

- Create a sandbox-enabled Generative AI Project and grant the IAM permissions above. Use a sandbox runtime with Node.js and `npm` (the example requests `python-3.11`; choose a compatible custom runtime if it lacks `npm`).
- If outbound traffic is restricted allow HTTPS to `registry.npmjs.org` (install Codex), HTTPS to `api.openai.com`, and secure WebSocket to `codex-cloud-environments.chatgpt.com`.
- Install the beta SDK (supplied by Oracle during onboarding) after the CLI; installing or upgrading `oci-cli` afterward can replace it with the PyPI `oci` package. The beta SDK must include `oci.generative_ai_sandbox`; preview releases may rename sandbox APIs. In your own application use `oci.auth.signers.SecurityTokenSigner` and `GenerativeAiSandboxClient`.
- Flow: (1) create a self-hosted session with `/workspace` as its working directory, save session and environment IDs; (2) create an OCI GenAI Sandbox and wait for `RUNNING`; (3) install Codex and write `/workspace/brief.txt`; (4) start `codex exec-server` with the environment ID and key (pass only the environment key as `CODEX_API_KEY`); (5) open the stream, send input, wait for completion, read `/workspace/plan.md`; (6) stop and delete the sandbox and delete the Agents API session, attempting both even if one fails.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/oci (fetched 2026-10). Cookbook: `examples/agents_api/sandboxes/oci/application_managed`.

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
