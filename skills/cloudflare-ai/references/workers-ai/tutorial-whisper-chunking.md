---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-workers-ai-whisper-with-chunking/
---

# Tutorial: Whisper-large-v3-turbo with chunking

Transcribe large audio files by fetching them, splitting into 1 MB chunks, and calling `@cf/openai/whisper-large-v3-turbo` per chunk.

## Signature / Usage

```jsonc
{
	"ai": {
		"binding": "AI"
	},
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-11-03"
}
```

Adapted (not in the official docs): removed `import type { Ai } from "workers-ai"` (no such package; `Ai` is a global type from `@cloudflare/workers-types`), and added a fail-closed host allowlist (`ALLOWED_AUDIO_HOSTS`, comma-separated) so the Worker is not an open fetch proxy.

```ts
import { Buffer } from "node:buffer";

export interface Env {
	AI: Ai;
	// Comma-separated hostnames the Worker may fetch audio from.
	ALLOWED_AUDIO_HOSTS: string;
}

/**
 * Fetches the audio file from the provided URL and splits it into chunks.
 * This function explicitly follows redirects.
 */
async function getAudioChunks(audioUrl: string): Promise<ArrayBuffer[]> {
	const response = await fetch(audioUrl, { redirect: "follow" });
	if (!response.ok) {
		throw new Error(`Failed to fetch audio: ${response.status}`);
	}
	const arrayBuffer = await response.arrayBuffer();

	// Example: Split the audio into 1MB chunks.
	const chunkSize = 1024 * 1024; // 1MB
	const chunks: ArrayBuffer[] = [];
	for (let i = 0; i < arrayBuffer.byteLength; i += chunkSize) {
		const chunk = arrayBuffer.slice(i, i + chunkSize);
		chunks.push(chunk);
	}
	return chunks;
}

/**
 * Transcribes a single audio chunk using the Whisper-large-v3-turbo model.
 */
async function transcribeChunk(
	chunkBuffer: ArrayBuffer,
	env: Env,
): Promise<string> {
	const base64 = Buffer.from(chunkBuffer, "binary").toString("base64");
	const res = await env.AI.run("@cf/openai/whisper-large-v3-turbo", {
		audio: base64,
		// Optional parameters (uncomment and set if needed):
		// task: "transcribe",   // or "translate"
		// language: "en",
		// vad_filter: "false",
		// initial_prompt: "Provide context if needed.",
		// prefix: "Transcription:",
	});
	return res.text; // Assumes the transcription result includes a "text" property.
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		// Extract the audio URL from the query parameters.
		const { searchParams } = new URL(request.url);
		const audioUrl = searchParams.get("url");

		if (!audioUrl) {
			return new Response("Missing 'url' query parameter", { status: 400 });
		}

		// Fail closed: only fetch https URLs on explicitly allowed hosts.
		const allowed = (env.ALLOWED_AUDIO_HOSTS ?? "")
			.split(",")
			.map((h) => h.trim())
			.filter(Boolean);
		let parsed: URL;
		try {
			parsed = new URL(audioUrl);
		} catch {
			return new Response("Invalid 'url' query parameter", { status: 400 });
		}
		if (parsed.protocol !== "https:" || !allowed.includes(parsed.hostname)) {
			return new Response("Host not allowed", { status: 403 });
		}

		const audioChunks: ArrayBuffer[] = await getAudioChunks(parsed.toString());
		let fullTranscript = "";

		// Process each chunk and build the full transcript.
		for (const chunk of audioChunks) {
			try {
				const transcript = await transcribeChunk(chunk, env);
				fullTranscript += transcript + "\n";
			} catch (error) {
				fullTranscript += "[Error transcribing chunk]\n";
			}
		}

		return new Response(fullTranscript, {
			headers: { "Content-Type": "text/plain" },
		});
	},
} satisfies ExportedHandler<Env>;
```

```sh
curl "http://localhost:8787?url=https://raw.githubusercontent.com/your-username/your-repo/main/your-audio-file.mp3"
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| audio | string | — | Base64-encoded audio chunk. |
| task | string | — | Optional: `transcribe` or `translate`. |
| language | string | — | Optional, for example `en`. |
| vad_filter | string | — | Optional (shown as `"false"` in the source comment). |
| initial_prompt | string | — | Optional context. |
| prefix | string | — | Optional. |
| url (query) | string | — | Direct link to the audio file (for GitHub, the raw file URL). |

## Notes

- Adapted from the official docs: invalid `workers-ai` type import removed; allowlist added because the original fetched any user-supplied URL. Set the allowlist with `wrangler.jsonc` `vars` (for example `raw.githubusercontent.com`); redirects are still followed, so only allow trusted hosts.
- The compatibility date in the source config is shown as the date the docs were generated; use today's date. `nodejs_compat` needs a compatibility date of 2024-09-23 or later.
- Chunking by byte size splits the file arbitrarily (not on audio frame boundaries) and the whole file is buffered in memory; very large files can exceed Worker memory limits.
- Tutorial uses C3 with TypeScript and `Worker only` template; Workers config is in cloudflare-wrangler / cloudflare-workers.

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [Tutorials index](./tutorials-index.md)
