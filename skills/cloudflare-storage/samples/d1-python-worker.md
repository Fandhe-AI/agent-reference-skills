---
source: https://developers.cloudflare.com/d1/examples/query-d1-from-python-workers/
---

# Query D1 from Python Workers

Bind a D1 database to a Python Worker and run a query via `self.env.DB`.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "python-and-d1",
	"main": "src/entry.py",
	"compatibility_flags": [ // Required for Python Workers
		"python_workers"
	],
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"d1_databases": [
		{
			"binding": "DB", // This will be how you refer to your database in your Worker
			"database_name": "YOUR_DATABASE_NAME",
			"database_id": "YOUR_DATABASE_ID"
		}
	]
}
```

```python
from workers import Response, WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Do anything else you'd like on request here!

        try:
            # Query D1 - we'll list all tables in our database in this example
            results = await self.env.DB.prepare("PRAGMA table_list").run()
            # Return a JSON response
            return Response.json(results)
        except Exception as e:
            return Response.json({"error": "Database query failed"}, status=500)
```

```sh
npx wrangler deploy
```

## Notes

- `compatibility_flags = ["python_workers"]` is required. `compatibility_date` on official pages is the docs build date ("Set this to today's date"); use your own.
- The `binding` value must exactly match the attribute used in Python (`self.env.DB`).
- Related: [D1 README](../references/d1/README.md), [worker-binding-api](../references/d1/worker-binding-api.md).
