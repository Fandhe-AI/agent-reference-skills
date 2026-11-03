---
source: https://developers.cloudflare.com/workers/languages/python/stdlib/
---

# Python Workers: Standard Library

Python Workers run on Pyodide (CPython on WebAssembly); the full Python standard library is available except for the modules below.

## Signature / Usage

Ephemeral in-memory filesystem access with standard file I/O. Snippet taken from https://developers.cloudflare.com/workers/languages/python/examples/#read-bundled-asset-files-in-your-worker.

```python
from pathlib import Path
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        html_file = Path(__file__).parent / "file.html"
        return Response(html_file.read_text(), headers={"Content-Type": "text/html"})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| curses, dbm, ensurepip, fcntl, grp, idlelib, lib2to3, msvcrt, pwd, resource, syslog, termios, tkinter, turtle.py, turtledemo, venv, winreg, winsound | excluded | Not available. |
| multiprocessing, threading | non-functional | Can be imported but do not work due to WebAssembly VM limitations. |
| pty, tty | non-importable | Present but cannot be imported because they depend on the removed termios package. |
| decimal | limited | Only the C implementation (`_decimal`, compiled to WebAssembly) is available, not `_pydecimal`. |
| pydoc | limited | Help messages for Python builtins are not available. |
| webbrowser | limited | The original module is not available. |

## Notes

- Pyodide mostly behaves identically to CPython; the majority of the CPython test suite passes.
- The filesystem is ephemeral and in-memory: reads/writes via `open()` or `pathlib.Path` work, but all data is lost when the Worker isolate is destroyed and it is not shared between isolate instances. Use KV, R2, or Durable Objects for durable storage.

## Related

- [python-how-it-works.md](./python-how-it-works.md)
- [python.md](./python.md)
