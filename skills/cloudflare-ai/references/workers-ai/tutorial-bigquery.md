---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/using-bigquery-with-workers-ai/
---

# Tutorial: BigQuery data with Workers AI

Query Google BigQuery from a Worker with a service-account JWT and feed rows to `@cf/meta/llama-3.1-8b-instruct` for tags and sentiment.

## Signature / Usage

Store the service-account fields as secrets:

```sh
npx wrangler secret put BQ_CLIENT_EMAIL
npx wrangler secret put BQ_PRIVATE_KEY
npx wrangler secret put BQ_PRIVATE_KEY_ID
npx wrangler secret put BQ_PROJECT_ID
```

Local development values (add `.dev.vars` to `.gitignore`):

```plaintext
BQ_CLIENT_EMAIL="<your_service_account_id>@<your_project_id>.iam.gserviceaccount.com"
BQ_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----<content_of_your_private_key>-----END PRIVATE KEY-----\n"
BQ_PRIVATE_KEY_ID="<your_private_key_id>"
BQ_PROJECT_ID="<your_project_id>"
```

Adapted (not in the official docs): `.dev.vars` used `BQ_CLIENT_KEY` while the code reads `BQ_PRIVATE_KEY` (aligned); `setExpirationTime(expiryAt)` with `expiryAt = now` expired the token at issue time, so `"1h"` is used; an `ACCESS_TOKEN` bearer check (fail closed when unset) protects the endpoint; Step 2's `console.log` of secrets is omitted; a response with neither `rows` nor `error` now returns an empty list instead of leaving `formattedResults` undefined, and the AI-step failure returns status 500.

```js
import * as jose from "jose";

const generateBQJWT = async (env) => {
	const algorithm = "RS256";
	const audience = "https://bigquery.googleapis.com/";
	const privateKey = await jose.importPKCS8(env.BQ_PRIVATE_KEY, algorithm);

	// Generate signed JSON Web Token (JWT)
	return new jose.SignJWT()
		.setProtectedHeader({
			typ: "JWT",
			alg: algorithm,
			kid: env.BQ_PRIVATE_KEY_ID,
		})
		.setIssuer(env.BQ_CLIENT_EMAIL)
		.setSubject(env.BQ_CLIENT_EMAIL)
		.setAudience(audience)
		.setExpirationTime("1h")
		.setIssuedAt()
		.sign(privateKey);
};

const queryBQ = async (bgJWT, path) => {
	const bqEndpoint = `https://bigquery.googleapis.com${path}`;
	const query = "SELECT text FROM hn.news_sampled LIMIT 3";
	const response = await fetch(bqEndpoint, {
		method: "POST",
		body: JSON.stringify({
			query: query,
		}),
		headers: {
			Authorization: `Bearer ${bgJWT}`,
		},
	});
	return response.json();
};

const formatRows = (rowsWithoutFieldNames, fields) => {
	// Index to fieldName
	const fieldsByIndex = new Map();

	fields.forEach((field, index) => {
		fieldsByIndex.set(index, field.name);
	});

	const rowsWithFieldNames = rowsWithoutFieldNames.map((row) => {
		// Map rows into an array of objects with field names
		let newRow = {};
		row.f.forEach((field, index) => {
			const fieldName = fieldsByIndex.get(index);
			if (fieldName) {
				newRow = { ...newRow, [fieldName]: field.v };
			}
		});
		return newRow;
	});

	return rowsWithFieldNames;
};

const generateTags = (data, env) => {
	return env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
		prompt: `Create three one-word tags for the following text. return only these three tags separated by a comma. don't return text that is not a category.Lowercase only. ${JSON.stringify(data)}`,
	});
};

const generateSentimentScore = (data, env) => {
	return env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
		prompt: `return a float number between 0 and 1 measuring the sentiment of the following text. 0 being negative and 1 positive. return only the number, no text. ${JSON.stringify(data)}`,
	});
};

const getAIGeneratedContent = (data, env, aiHandler) => {
	let results = data?.map((dataPoint) => {
		return aiHandler(dataPoint, env);
	});
	return Promise.all(results);
};

export default {
	async fetch(request, env, ctx) {
		// Fail closed: require a bearer token before touching BigQuery or Workers AI
		if (
			!env.ACCESS_TOKEN ||
			request.headers.get("Authorization") !== `Bearer ${env.ACCESS_TOKEN}`
		) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Create JWT to authenticate the BigQuery API call
		let bqJWT;
		try {
			bqJWT = await generateBQJWT(env);
		} catch (error) {
			console.log(error);
			return new Response("An error has occurred while generating the JWT", {
				status: 500,
			});
		}

		// Fetch results from BigQuery
		let ticketInfo;
		try {
			ticketInfo = await queryBQ(
				bqJWT,
				`/bigquery/v2/projects/${env.BQ_PROJECT_ID}/queries`,
			);
		} catch (error) {
			console.log(error);
			return new Response("An error has occurred while querying BQ", {
				status: 500,
			});
		}

		// Transform output format into array of objects with named fields
		let formattedResults;
		if ("rows" in ticketInfo) {
			formattedResults = formatRows(ticketInfo.rows, ticketInfo.schema.fields);
		} else if ("error" in ticketInfo) {
			return new Response(ticketInfo.error.message, { status: 500 });
		} else {
			// e.g. a query that returned zero rows has no `rows` key
			return Response.json({ data: [] });
		}

		// Generate AI summaries and sentiment scores
		let summaries, sentimentScores;
		try {
			summaries = await getAIGeneratedContent(
				formattedResults,
				env,
				generateTags,
			);
			sentimentScores = await getAIGeneratedContent(
				formattedResults,
				env,
				generateSentimentScore,
			);
		} catch {
			return new Response(
				"There was an error while generating the text summaries or sentiment scores",
				{ status: 500 },
			);
		}

		// Add AI summaries and sentiment scores to previous results
		formattedResults = formattedResults?.map((formattedResult, i) => {
			if (sentimentScores[i].response && summaries[i].response) {
				return {
					...formattedResult,
					sentiment: parseFloat(sentimentScores[i].response).toFixed(2),
					tags: summaries[i].response.split(",").map((result) => result.trim()),
				};
			}
		});

		const response = { data: formattedResults };

		return new Response(JSON.stringify(response), {
			headers: { "Content-Type": "application/json" },
		});
	},
};
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| BQ_CLIENT_EMAIL | secret | — | `client_email` from the GCP key file. |
| BQ_PRIVATE_KEY | secret | — | `private_key` from the key file (without surrounding double quotes when using `wrangler secret put`). |
| BQ_PRIVATE_KEY_ID | secret | — | `private_key_id`. |
| BQ_PROJECT_ID | secret | — | `project_id`. |
| ACCESS_TOKEN | secret | — | Added: bearer token required by the endpoint. |

## Notes

- Adapted from the official docs: see the marker above. The source built the Worker step by step with `...` fragments; only the final combined code is kept.
- The key file is sensitive: use the minimum BigQuery read role for the service account and never commit the key or `.dev.vars`.
- Secrets are only available once deployed; use `.dev.vars` locally. Install `jose` with `npm i jose`.
- The BigQuery service account and query are Google Cloud concepts; sampled tables must be cloned to your own GCP namespace to run job queries.
- Source reference architecture: https://developers.cloudflare.com/reference-architecture/diagrams/ai/bigquery-workers-ai/ ; for scheduled ingestion use a Cron Trigger (cloudflare-workers).

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [Tutorial: RAG](./tutorial-rag.md)
- [Tutorials index](./tutorials-index.md)
