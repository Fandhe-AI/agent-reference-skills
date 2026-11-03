---
source: https://developers.cloudflare.com/d1/tutorials/import-to-d1-with-rest-api/
---

# Bulk import to D1 using REST API

Import SQL into D1 through the REST API import flow: init, upload to the returned URL, ingest, then poll.

Adapted (not in the official docs): SQL string literals are escaped by doubling single quotes; `pollImport` and the request steps check HTTP/API errors, throw on a failed import and stop after a maximum wait; random `id` values are not generated (SQLite assigns them); see Notes.

```js
import crypto from "crypto";
import { faker } from "@faker-js/faker";

const TARGET_TABLE = "";
const ACCOUNT_ID = "";
const DATABASE_ID = "";
const D1_API_KEY = "";
const D1_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/import`;
const uploadSize = 500;
const MAX_WAIT_MS = 5 * 60 * 1000;
const headers = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${D1_API_KEY}`,
};

// Generate Fake data
const data = Array.from({ length: uploadSize }, () => ({
	text: faker.lorem.paragraph(),
	date_added: new Date().toISOString().slice(0, 19).replace("T", " "),
}));

// Make SQL insert statements
function makeSqlInsert(data, tableName, skipCols = []) {
	const columns = Object.keys(data[0]).join(",");
	const values = data
		.map((row) => {
			return (
				"(" +
				Object.values(row)
					.map((val) => {
						if (skipCols.includes(val) || val === null || val === "") {
							return "NULL";
						}
						return `'${String(val).replace(/'/g, "''")}'`;
					})
					.join(",") +
				")"
			);
		})
		.join(",");

	return `INSERT INTO ${tableName} (${columns}) VALUES ${values};`;
}

const sqlInsert = makeSqlInsert(data, TARGET_TABLE);

async function pollImport(bookmark) {
	const payload = {
		action: "poll",
		current_bookmark: bookmark,
	};

	const deadline = Date.now() + MAX_WAIT_MS;

	while (Date.now() < deadline) {
		const pollResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify(payload),
		});

		if (!pollResponse.ok) {
			throw new Error(`Poll request failed: HTTP ${pollResponse.status}`);
		}

		const result = await pollResponse.json();
		console.log("Poll Response:", result.result);

		if (result.success === false || !result.result) {
			throw new Error(`Poll API error: ${JSON.stringify(result.errors ?? result)}`);
		}

		const { success, error } = result.result;

		if (success) {
			return; // import finished
		}
		if (error === "Not currently importing anything.") {
			return; // no import in progress: treated as finished, as in the official loop
		}
		if (error) {
			throw new Error(`Import failed: ${error}`); // success:false with a real error
		}

		// success:false without an error: still in progress
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	throw new Error(`Import did not finish within ${MAX_WAIT_MS} ms`);
}

// Upload to D1
async function uploadToD1() {
	// 1. Init upload
	const hashStr = crypto.createHash("md5").update(sqlInsert).digest("hex");

	try {
		const initResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify({
				action: "init",
				etag: hashStr,
			}),
		});

		if (!initResponse.ok) {
			throw new Error(`Init failed: HTTP ${initResponse.status}`);
		}
		const uploadData = await initResponse.json();
		if (!uploadData.success || !uploadData.result) {
			throw new Error(`Init API error: ${JSON.stringify(uploadData.errors ?? uploadData)}`);
		}
		const uploadUrl = uploadData.result.upload_url;
		const filename = uploadData.result.filename;

		// 2. Upload to R2
		const r2Response = await fetch(uploadUrl, {
			method: "PUT",
			body: sqlInsert,
		});

		if (!r2Response.ok) {
			throw new Error(`Upload failed: HTTP ${r2Response.status}`);
		}
		const r2Etag = (r2Response.headers.get("ETag") ?? "").replace(/"/g, "");

		// Verify etag
		if (r2Etag !== hashStr) {
			throw new Error("ETag mismatch");
		}

		// 3. Start ingestion
		const ingestResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify({
				action: "ingest",
				etag: hashStr,
				filename,
			}),
		});

		if (!ingestResponse.ok) {
			throw new Error(`Ingest failed: HTTP ${ingestResponse.status}`);
		}
		const ingestData = await ingestResponse.json();
		console.log("Ingestion Response:", ingestData);
		if (!ingestData.success || !ingestData.result) {
			throw new Error(`Ingest API error: ${JSON.stringify(ingestData.errors ?? ingestData)}`);
		}

		// 4. Polling
		await pollImport(ingestData.result.at_bookmark);

		return "Import completed successfully";
	} catch (e) {
		console.error("Error:", e);
		return "Import failed";
	}
}

async function runImport() {
	const result = await uploadToD1();
	console.log(result);
}

runImport();
```

## Notes

- This is the page's "final code" fence. The API token needs Account > D1 > Edit; keep it in an environment variable in production. The target table must already exist (`CREATE TABLE IF NOT EXISTS TargetD1Table (id INTEGER PRIMARY KEY, text TEXT, date_added TEXT);`).
- Corrected from the official docs: the official `makeSqlInsert` deletes every single quote and then turns every double quote into a single quote (`.replace(/'/g, "").replace(/"/g, "'")`), which silently alters data and produces invalid SQL for values containing `"`; the SQL-standard escape `''` is used instead. Set `TARGET_TABLE`, `ACCOUNT_ID`, `DATABASE_ID` and `D1_API_KEY` (the empty strings are placeholders; the table name is interpolated unescaped, so use a trusted name).
- Adapted from the official docs: the official `pollImport` loops forever on a failed import (`success: false` with a specific `error`) and never checks HTTP status or the API envelope. The sample throws on HTTP/API errors and on any other `error`, and gives up after `MAX_WAIT_MS`. The official page documents only the `success` flag and the `Not currently importing anything.` message as end conditions, so those two stay as "finished" and `success: false` without an `error` is treated as still in progress; confirm the exact poll response fields against the D1 REST API reference for your use.
- Adapted from the official docs: the official generator sets `id: Math.floor(Math.random() * 1000000)`; 500 random ids from 1,000,000 values collide in about 12% of runs (and more on re-runs), which fails the whole INSERT on `id INTEGER PRIMARY KEY`. The `id` column is omitted from the INSERT so SQLite assigns the rowid.
- Known page defects: the step-by-step snippets reference `sqlInsert` and `crypto` before they are defined, and the prose says 2500 rows while `uploadSize` is 500. The final fence above is self-consistent.
- A `statement too long` error means the SQL must be split into smaller batches (see import-export-data).
- Related: [import-export-data](../references/d1/import-export-data.md), [D1 README](../references/d1/README.md).
