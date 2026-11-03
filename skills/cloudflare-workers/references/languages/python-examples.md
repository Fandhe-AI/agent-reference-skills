---
source: https://developers.cloudflare.com/workers/languages/python/examples/
---

# Python Workers: Examples

Python-specific examples; more in the Workers Example gallery filtered to Python.

## Signature / Usage

Modules: with `src/module.py` and `src/main.py`, and `main = "src/main.py"` in the Wrangler file, `src` is not part of the import:

```python
import module
```

Parse an incoming request URL:

```python
from workers import WorkerEntrypoint, Response
from urllib.parse import urlparse, parse_qs

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Parse the incoming request URL
        url = urlparse(request.url)
        # Parse the query parameters into a Python dictionary
        params = parse_qs(url.query)

        if "name" in params:
            greeting = "Hello there, {name}".format(name=params["name"][0])
            return Response(greeting)

        if url.path == "/favicon.ico":
          return Response("")

        return Response("Hello world!")
```

Parse JSON / return JSON:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        body = await request.json()  # returns a native Python dict
        name = body["name"]
        return Response("Hello, {name}".format(name=name))
```

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        data = {"greeting": "Hello, World!", "status": "ok"}
        return Response.json(data)
```

Read bundled asset files (file at `src/file.html`):

```python
from pathlib import Path
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        html_file = Path(__file__).parent / "file.html"
        return Response(html_file.read_text(), headers={"Content-Type": "text/html"})
```

Logs:

```python
# To use the JavaScript console APIs
from js import console
from workers import WorkerEntrypoint, Response
# To use the native Python logging
import logging

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Use the console APIs from JavaScript
        # https://developer.mozilla.org/en-US/docs/Web/API/console
        console.log("console.log from Python!")

        # Alternatively, use the native Python logger
        logger = logging.getLogger(__name__)

        # The default level is warning. We can change that to info.
        logging.basicConfig(level=logging.INFO)

        logger.error("error from Python!")
        logger.info("info log from Python!")

        # Or just use print()
        print("print() from Python!")

        return Response("We're testing logging!")
```

Publish to a Queue:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Bindings are available on the 'env' attribute
        # https://developers.cloudflare.com/queues/

        # The default contentType is "json"
        # We can also pass plain text strings
        await self.env.QUEUE.send("hello", contentType="text")
        # Send a JSON payload
        await self.env.QUEUE.send({"hello": "world"})

        return Response.json({"write": "success"})
```

Query D1:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        results = await self.env.DB.prepare("PRAGMA table_list").run()
        # Return a JSON response
        return Response.json(results)
```

Durable Object:

```python
from workers import WorkerEntrypoint, Response, DurableObject

class List(DurableObject):
    async def get_messages(self):
        messages = await self.ctx.storage.get("messages")
        return messages if messages else []

    async def add_message(self, message):
        messages = await self.get_messages()
        messages.append(message)
        await self.ctx.storage.put("messages", messages)
        return

    async def say_hello(self):
        result = self.ctx.storage.sql.exec(
            "SELECT 'Hello, World!' as greeting"
        ).one()

        return result.greeting
```

Cron Trigger:

Adapted (not in the official docs): the handler takes only `(self, controller)`; bindings and context come from `self.env` / `self.ctx`; see Notes.

```python
from workers import WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def scheduled(self, controller):
        # Bindings: self.env, execution context: self.ctx
        print("cron processed")
```

Workflows:

```python
from workers import WorkflowEntrypoint

class MyWorkflow(WorkflowEntrypoint):
    async def run(self, event, step):
        @step.do()
        async def step_a():
            # do some work
            return 10

        @step.do()
        async def step_b():
            # do some work
            return 20

        @step.do(concurrent=True)
        async def my_final_step(step_a, step_b):
            # should return 30
            return step_a + step_b

        await my_final_step()
```

## Notes

- Corrected from the official docs: the official Cron Trigger example declares `scheduled(self, controller, env, ctx)` and says all four parameters are required; class-style Python handlers take no `env` / `ctx` parameters (like `fetch(self, request)`), so the signature is `scheduled(self, controller)` and bindings / context are read from `self.env` / `self.ctx`.
- D1 in depth: https://developers.cloudflare.com/d1/examples/query-d1-from-python-workers/. Durable Objects: https://developers.cloudflare.com/durable-objects/get-started/. Cron Triggers: https://developers.cloudflare.com/workers/configuration/cron-triggers/. Python Workflows: https://developers.cloudflare.com/workflows/python/. Hyperdrive (PostgreSQL/MySQL) from Python Workers: https://developers.cloudflare.com/hyperdrive/examples/python-workers/.
- More examples: `git clone https://github.com/cloudflare/python-workers-examples`.

## Related

- [python-ffi.md](./python-ffi.md)
- [python-basics.md](./python-basics.md)
