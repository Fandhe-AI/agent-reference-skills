# Quickstart: Flask (Python)

Use Upstash Workflow with Flask via the Python SDK `upstash-workflow`. Example source: `examples/flask` in `upstash/workflow-py`.

## Signature / Usage

```bash
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn upstash-workflow
```

`main.py`:

```python
from flask import Flask
from upstash_workflow.flask import Serve

app = Flask(__name__)
serve = Serve(app)


@serve.route("/api/workflow")
def workflow(context) -> None:
    def _step1() -> None:
        print("initial step ran")

    context.run("initial-step", _step1)

    def _step2() -> None:
        print("second step ran")

    context.run("second-step", _step2)
```

```bash
source .env
flask --app main run -p 8000

curl -X POST https://localhost:8000/api/workflow
# result: {"workflowRunId":"wfr_xxxxxx"}
```

## Variants

Sleep and call use synchronous context methods:

```python
@serve.route("/sleep")
def sleep(context: WorkflowContext[str]) -> None:
    input = context.request_payload

    def _step1() -> str:
        output = some_work(input)
        print("step 1 input", input, "output", output)
        return output

    result1: str = context.run("step1", _step1)

    context.sleep_until("sleep1", time.time() + 3)
    context.sleep("sleep2", 2)
```

```python
response: CallResponse[Dict[str, str]] = context.call(
    "get-data",
    url=f"{context.env.get('UPSTASH_WORKFLOW_URL', 'http://localhost:8000')}/get-data",
    method="POST",
    body={"message": result1},
)
```

Auth:

```python
@serve.route("/auth")
def auth(context: WorkflowContext[str]) -> None:
    if context.headers.get("Authentication") != "Bearer secret_password":
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

- Flask uses `Serve` from `upstash_workflow.flask`, `@serve.route(...)`, plain `def` handlers, and `WorkflowContext` (no `await`), unlike FastAPI's `AsyncWorkflowContext`
- The original installation step reads `pip install fastapi uvicorn upstash-workflow` even on the Flask page (apparent doc copy-paste); Flask itself must also be installed
- Source the `.env` file (`source .env`) before starting the app
- Prerequisites: an Upstash QStash API key, Python and pip

## Related

- [quickstart-fastapi](./quickstart-fastapi.md)
- [quickstart-nextjs-flask](./quickstart-nextjs-flask.md)
- [local-development](./local-development.md)
- [security](./security.md)
