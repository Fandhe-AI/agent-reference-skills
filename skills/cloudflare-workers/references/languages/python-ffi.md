---
source: https://developers.cloudflare.com/workers/languages/python/ffi/
---

# Python Workers: Foreign Function Interface (FFI)

Via Pyodide, Python Workers can call JavaScript: bindings, JavaScript globals (`Request`, `Response`, `fetch()`), and any API accessible in JavaScript.

## Signature / Usage

Declare a KV binding:

```jsonc
{
	"main": "./src/index.py",
	"kv_namespaces": [
		{
			"binding": "FOO",
			"id": "<YOUR_KV_NAMESPACE_ID>"
		}
	]
}
```

Use it through `env`:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        await self.env.FOO.put("bar", "baz")
        bar = await self.env.FOO.get("bar")
        return Response(bar) # returns "baz"
```

Convert Python to JavaScript with Pyodide's `to_js`:

```python
from js import Object
from pyodide.ffi import to_js as _to_js

from workers import WorkerEntrypoint, Response

# to_js converts between Python dictionaries and JavaScript Objects
def to_js(obj):
   return _to_js(obj, dict_converter=Object.fromEntries)
```

Use a JavaScript global directly from the `js` module:

```python
from workers import WorkerEntrypoint
from js import Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response.new("Hello World!")
```

## Notes

- The recommended way to access JavaScript globals in a more Pythonic way is the `workers` module (from the `workers-runtime-sdk` package); import from `js` only when direct access is needed.
- Pyodide FFI details: https://pyodide.org/en/stable/usage/type-conversions.html; `pyodide.ffi.to_js`: https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.to_js.

## Related

- [python-examples.md](./python-examples.md)
- [python-basics.md](./python-basics.md)
- [python.md](./python.md)
