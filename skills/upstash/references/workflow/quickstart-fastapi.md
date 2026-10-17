# Quickstart: FastAPI (Python)

Use Upstash Workflow with FastAPI via the Python SDK `upstash-workflow`. Example source: `examples/fastapi` in `upstash/workflow-py`.

## Signature / Usage

```bash
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn upstash-workflow
```

`main.py`:

```python
from fastapi import FastAPI
from upstash_workflow.fastapi import Serve

app = FastAPI()
serve = Serve(app)


@serve.post("/api/workflow")
async def workflow(context) -> None:
    async def _step1() -> None:
        print("initial step ran")

    await context.run("initial-step", _step1)

    async def _step2() -> None:
        print("second step ran")

    await context.run("second-step", _step2)
```

```bash
source .env
uvicorn main:app --reload

curl -X POST http://localhost:8000/api/workflow
# result: {"workflowRunId":"wfr_xxxxxx"}
```

## Variants

Sleep (`context.sleep_until("sleep1", time.time() + 3)` and `context.sleep("sleep2", 2)`):

```python
@serve.post("/sleep")
async def sleep(context: AsyncWorkflowContext[str]) -> None:
    input = context.request_payload

    async def _step1() -> str:
        output = some_work(input)
        print("step 1 input", input, "output", output)
        return output

    result1: str = await context.run("step1", _step1)

    await context.sleep_until("sleep1", time.time() + 3)
    await context.sleep("sleep2", 2)
```

Call (`context.call` returns a `CallResponse`):

```python
response: CallResponse[Dict[str, str]] = await context.call(
    "get-data",
    url=f"{context.env.get('UPSTASH_WORKFLOW_URL', 'http://localhost:8000')}/get-data",
    method="POST",
    body={"message": result1},
)
```

Auth (custom authorization via headers):

```python
@serve.post("/auth")
async def auth(context: AsyncWorkflowContext[str]) -> None:
    if context.headers.get("authentication") != "Bearer secret_password":
        print("Authentication failed.")
        return
    # ... steps
```

## Environment Variables

Create `.env` (uses `export` lines) with one of:

| Option | `.env` |
|--------|--------|
| Local QStash server (`npx @upstash/qstash-cli dev`; no billing, runs not logged in the Upstash Console) | `export QSTASH_URL="http://127.0.0.1:8080"` and `export QSTASH_TOKEN="<QSTASH_TOKEN>"` (values printed by the CLI) |
| Local tunnel (connects to production QStash; logs visible in the Upstash Console) | `export QSTASH_TOKEN="***"` and `export UPSTASH_WORKFLOW_URL="<UPSTASH_WORKFLOW_URL>"` |

## Notes

- Python SDK (`upstash_workflow`), not the TypeScript `@upstash/workflow`; handlers use `async def` with `AsyncWorkflowContext` and `context.request_payload`
- Source the `.env` file (`source .env`) before starting the app
- This page documents the `npx @upstash/qstash-cli dev` approach; the TypeScript quickstarts use `QSTASH_DEV=true`
- Prerequisites: an Upstash QStash API key, Python and pip
- The original curl uses `https://localhost:8000`; corrected to `http://localhost:8000` because the local uvicorn dev server does not use TLS
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/quickstarts/fastapi

## Related

- [quickstart-flask](./quickstart-flask.md)
- [quickstart-nextjs-fastapi](./quickstart-nextjs-fastapi.md)
- [local-development](./local-development.md)
- [security](./security.md)
