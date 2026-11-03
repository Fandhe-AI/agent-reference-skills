---
source: https://developers.cloudflare.com/d1/tutorials/import-to-d1-with-rest-api/
---

# Bulk import to D1 using REST API

Import SQL into D1 through the REST API import flow: init, upload to the returned URL, ingest, then poll.

```js
import crypto from "crypto";
import { faker } from "@faker-js/faker";

const TARGET_TABLE = "";
const ACCOUNT_ID = "";
const DATABASE_ID = "";
const D1_API_KEY = "";
const D1_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/import`;
const uploadSize = 500;
const headers = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${D1_API_KEY}`,
};

// Generate Fake data
const data = Array.from({ length: uploadSize }, () => ({
	id: Math.floor(Math.random() * 1000000),
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
						return `'${String(val).replace(/'/g, "").replace(/"/g, "'")}'`;
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

	while (true) {
		const pollResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify(payload),
		});

		const result = await pollResponse.json();
		console.log("Poll Response:", result.result);

		const { success, error } = result.result;

		if (
			success ||
			(!success && error === "Not currently importing anything.")
		) {
			break;
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
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

		const uploadData = await initResponse.json();
		const uploadUrl = uploadData.result.upload_url;
		const filename = uploadData.result.filename;

		// 2. Upload to R2
		const r2Response = await fetch(uploadUrl, {
			method: "PUT",
			body: sqlInsert,
		});

		const r2Etag = r2Response.headers.get("ETag").replace(/"/g, "");

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

		const ingestData = await ingestResponse.json();
		console.log("Ingestion Response:", ingestData);

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
- Known page defects: the step-by-step snippets reference `sqlInsert` and `crypto` before they are defined, and the prose says 2500 rows while `uploadSize` is 500. The final fence above is self-consistent.
- A `statement too long` error means the SQL must be split into smaller batches (see import-export-data).
- Related: [import-export-data](../references/d1/import-export-data.md), [D1 README](../references/d1/README.md).
