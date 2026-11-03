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

Adapted (not in the official docs): removed `import type { Ai } from "workers-ai"` (no such package; `Ai` is a global type from `@cloudflare/workers-types`); added a fail-closed host allowlist (`ALLOWED_AUDIO_HOSTS`, comma-separated); redirects are rejected (`redirect: "manual"`); the download is capped by `Content-Length` and by the streamed byte count; and the input is restricted to PCM WAV, split on sample-frame boundaries with a fresh WAV header per chunk so every chunk is independently decodable (see Notes).

```ts
import { Buffer } from "node:buffer";

export interface Env {
	AI: Ai;
	// Comma-separated hostnames the Worker may fetch audio from.
	ALLOWED_AUDIO_HOSTS: string;
}

const MAX_AUDIO_BYTES = 25 * 1024 * 1024; // hard cap on the downloaded file
const CHUNK_BYTES = 1024 * 1024; // target ~1MB of PCM data per chunk

/** Reads the body while counting bytes; aborts as soon as the cap is exceeded. */
async function readCapped(response: Response, max: number): Promise<ArrayBuffer> {
	const declared = Number(response.headers.get("Content-Length"));
	if (Number.isFinite(declared) && declared > max) {
		throw new Error("Audio file too large");
	}
	if (!response.body) throw new Error("Empty response body");
	const reader = response.body.getReader();
	const parts: Uint8Array[] = [];
	let total = 0;
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		total += value.byteLength;
		if (total > max) {
			await reader.cancel();
			throw new Error("Audio file too large");
		}
		parts.push(value);
	}
	const out = new Uint8Array(total);
	let offset = 0;
	for (const p of parts) {
		out.set(p, offset);
		offset += p.byteLength;
	}
	return out.buffer;
}

function writeAscii(view: Uint8Array, offset: number, text: string): void {
	for (let i = 0; i < text.length; i++) view[offset + i] = text.charCodeAt(i);
}

/**
 * Splits a PCM WAV file into standalone WAV files. Each piece gets its own
 * RIFF/fmt/data header and contains a whole number of sample frames
 * (blockAlign bytes each), so it can be decoded without the other pieces.
 */
function splitWav(buf: ArrayBuffer, chunkBytes: number): ArrayBuffer[] {
	const view = new DataView(buf);
	const bytes = new Uint8Array(buf);
	const tag = (o: number) => String.fromCharCode(...bytes.subarray(o, o + 4));
	if (buf.byteLength < 12 || tag(0) !== "RIFF" || tag(8) !== "WAVE") {
		throw new Error("Not a RIFF/WAVE file");
	}
	let fmtOffset = -1;
	let fmtSize = 0;
	let dataOffset = -1;
	let dataSize = 0;
	let pos = 12;
	while (pos + 8 <= buf.byteLength) {
		const id = tag(pos);
		const size = view.getUint32(pos + 4, true);
		if (id === "fmt ") {
			fmtOffset = pos + 8;
			fmtSize = size;
		} else if (id === "data") {
			dataOffset = pos + 8;
			dataSize = Math.min(size, buf.byteLength - dataOffset);
			break;
		}
		pos += 8 + size + (size & 1);
	}
	if (fmtOffset < 0 || fmtSize < 16 || dataOffset < 0) {
		throw new Error("Malformed WAV file");
	}
	const format = view.getUint16(fmtOffset, true);
	if (format !== 1) throw new Error("Only PCM WAV is supported");
	const blockAlign = view.getUint16(fmtOffset + 12, true);
	if (blockAlign === 0) throw new Error("Malformed WAV file");

	const framesPerChunk = Math.max(1, Math.floor(chunkBytes / blockAlign));
	const step = framesPerChunk * blockAlign;
	const fmtPad = fmtSize & 1;
	const chunks: ArrayBuffer[] = [];
	for (let start = 0; start < dataSize; start += step) {
		// Drop a trailing partial frame so every piece ends on a frame boundary.
		const len = Math.min(step, dataSize - start) - (Math.min(step, dataSize - start) % blockAlign);
		if (len === 0) break;
		const headerLen = 12 + 8 + fmtSize + fmtPad + 8;
		const out = new Uint8Array(headerLen + len);
		const outView = new DataView(out.buffer);
		writeAscii(out, 0, "RIFF");
		outView.setUint32(4, out.byteLength - 8, true);
		writeAscii(out, 8, "WAVE");
		writeAscii(out, 12, "fmt ");
		outView.setUint32(16, fmtSize, true);
		out.set(bytes.subarray(fmtOffset, fmtOffset + fmtSize), 20);
		const dataHeader = 20 + fmtSize + fmtPad;
		writeAscii(out, dataHeader, "data");
		outView.setUint32(dataHeader + 4, len, true);
		out.set(bytes.subarray(dataOffset + start, dataOffset + start + len), headerLen);
		chunks.push(out.buffer);
	}
	return chunks;
}

/**
 * Fetches the WAV file from the provided URL (no redirects, size-capped)
 * and splits it into independently decodable chunks.
 */
async function getAudioChunks(audioUrl: string): Promise<ArrayBuffer[]> {
	// "manual" returns 3xx responses instead of following them, so the host
	// allowlist cannot be bypassed by a redirect to another host.
	const response = await fetch(audioUrl, { redirect: "manual" });
	if (response.status >= 300 && response.status < 400) {
		throw new Error("Redirects are not allowed");
	}
	if (!response.ok) {
		throw new Error(`Failed to fetch audio: ${response.status}`);
	}
	const arrayBuffer = await readCapped(response, MAX_AUDIO_BYTES);
	return splitWav(arrayBuffer, CHUNK_BYTES);
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

		let audioChunks: ArrayBuffer[];
		try {
			audioChunks = await getAudioChunks(parsed.toString());
		} catch (error) {
			return new Response("Could not fetch or split the audio file", {
				status: 502,
			});
		}
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
curl "http://localhost:8787?url=https://raw.githubusercontent.com/your-username/your-repo/main/your-audio-file.wav"
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

- Adapted from the official docs: invalid `workers-ai` type import removed; allowlist added because the original fetched any user-supplied URL. Set the allowlist with `wrangler.jsonc` `vars` (for example `raw.githubusercontent.com`). The official page used `redirect: "follow"`, which lets an allowed host relay to any other host; the example now uses `redirect: "manual"` and rejects 3xx responses.
- Adapted from the official docs: the original buffered the whole response with `arrayBuffer()` without a limit; the example now checks `Content-Length` and also counts streamed bytes (a missing or wrong `Content-Length` is not trusted), cancelling the read past `MAX_AUDIO_BYTES`.
- Adapted from the official docs: the original sliced raw bytes at fixed 1 MB offsets. For compressed formats such as MP3 that cuts frames and containers mid-stream, so later pieces are not valid standalone files. The example therefore accepts PCM WAV only and rebuilds a WAV header per piece, splitting on sample-frame (`blockAlign`) boundaries. Other formats need decoding and re-encoding with a media library outside the Worker (not covered by the source).
- The compatibility date in the source config is shown as the date the docs were generated; use today's date. `nodejs_compat` needs a compatibility date of 2024-09-23 or later.
- The file is still held in memory (up to `MAX_AUDIO_BYTES`, plus the chunk copies); adjust the cap to your Worker memory limit. Splitting at fixed sizes can still cut a word in half at a chunk boundary, so a transcript may have errors at joins. The endpoint itself is unauthenticated; add authentication if the Worker is public, since each request spends Workers AI usage.
- Tutorial uses C3 with TypeScript and `Worker only` template; Workers config is in cloudflare-wrangler / cloudflare-workers.

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [Tutorials index](./tutorials-index.md)
