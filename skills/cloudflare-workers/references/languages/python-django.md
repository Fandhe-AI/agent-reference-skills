---
source: https://developers.cloudflare.com/workers/languages/python/packages/django/
---

# Django on Python Workers

Django runs on Python Workers through WSGI or ASGI adaptors; D1 and Durable Objects can serve as database backends via `django-cf`.

## Signature / Usage

Quick start:

```bash
uv run pywrangler init django-worker --template https://github.com/cloudflare/python-workers-examples/tree/main/django
cd django-worker
uv run pywrangler dev
```

WSGI (`src/index.py`):

```python
import os

from django.core.wsgi import get_wsgi_application
from workers import wsgi

# your Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")

app = get_wsgi_application()

Default = wsgi.entrypoint(app)
```

ASGI (`src/index.py`):

```python
import os

from django.core.asgi import get_asgi_application
from workers import asgi

# your Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")

app = get_asgi_application()

Default = asgi.entrypoint(app)
```

Read a secret in settings (`src/app/settings.py`), created with `uv run pywrangler secret put DJANGO_SECRET_KEY`:

```python
from workers import env

SECRET_KEY = env.DJANGO_SECRET_KEY
```

## Notes

- Python Workers is optimized for ASGI, but WSGI also works with Django. Bindings are exposed to the application through `scope["env"]`. (Source inconsistency: the prose says "`workers.wsgi.fetch` / `asgi.fetch`" while the first two snippets use `entrypoint`; `wsgi.fetch(application, request, self.env)` appears in the D1 example below.)
- D1 and Durable Objects backends need `django-cf` (`dependencies = ["django", "django-cf"]`). Both are SQLite-compatible, drive the synchronous Django ORM (serve through WSGI), and do NOT support transactions: `@transaction.atomic` is a no-op and rollback does not work.
- D1 backend: add a `d1_databases` binding (`binding`, `database_name`, `database_id`), then in settings:

```python
DATABASES = {
    "default": {
        "ENGINE": "django_cf.db.backends.d1",
        # should match the binding name in your wrangler.jsonc
        "CLOUDFLARE_BINDING": "DB",
    }
}
```

```python
import os

from django.core.wsgi import get_wsgi_application
from workers import WorkerEntrypoint, wsgi

# your Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")

application = get_wsgi_application()

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return await wsgi.fetch(application, request, self.env)
```

- Durable Objects backend: bind with `durable_objects.bindings` (`name: "DO_STORAGE"`, `class_name: "DjangoDurableObject"`) and `migrations` (`tag: "v1"`, `new_sqlite_classes: ["DjangoDurableObject"]`); settings use `"ENGINE": "django_cf.db.backends.do"`:

```python
import os

from django.core.wsgi import get_wsgi_application
from django_cf.db.backends.do.storage import set_storage
from workers import WorkerEntrypoint, DurableObject, wsgi

# your Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")

application = get_wsgi_application()

class DjangoDurableObject(DurableObject):
    def __init__(self, ctx, env):
        super().__init__(ctx, env)

        # Tell Django to use the Durable Object storage
        set_storage(self.ctx.storage.sql)

    async def fetch(self, request):
        return await wsgi.fetch(application, request, self.env)

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        id = self.env.DO_STORAGE.idFromName("my-do-backend")
        stub = self.env.DO_STORAGE.get(id)
        return await stub.fetch(request)
```

- Examples in `cloudflare/python-workers-examples`: `django` and `django-todo-d1`.

## Related

- [python-packages.md](./python-packages.md)
- [python-flask.md](./python-flask.md)
- [python-fastapi.md](./python-fastapi.md)
