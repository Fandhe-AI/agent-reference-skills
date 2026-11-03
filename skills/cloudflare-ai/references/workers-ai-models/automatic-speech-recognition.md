---
source: https://developers.cloudflare.com/workers-ai/models/whisper/, https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/, https://developers.cloudflare.com/workers-ai/models/whisper-tiny-en/, https://developers.cloudflare.com/workers-ai/models/nova-3/, https://developers.cloudflare.com/workers-ai/models/flux/, https://developers.cloudflare.com/workers-ai/models/smart-turn-v2/, https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-workers-ai-whisper-with-chunking/
---

# Automatic Speech Recognition Models

Speech-to-text models (Whisper, Deepgram Nova 3 and Flux) plus the Pipecat turn-detection model that the catalog lists under "Dumb Pipe".

## Signature / Usage

None of the model pages has a usage example. Snippet taken from https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-workers-ai-whisper-with-chunking/ (`Env` is the Worker's generated environment type with an `AI` binding).

Adapted (not in the official docs): base64 encoding uses `btoa` over the bytes instead of Node's `Buffer` (no `nodejs_compat` needed), and the `vad_filter` comment uses a boolean; see Notes.

```ts
async function transcribeChunk(
	chunkBuffer: ArrayBuffer,
	env: Env,
): Promise<string> {
	const bytes = new Uint8Array(chunkBuffer);
	let binary = "";
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	const base64 = btoa(binary);
	const res = await env.AI.run("@cf/openai/whisper-large-v3-turbo", {
		audio: base64,
		// Optional parameters (uncomment and set if needed):
		// task: "transcribe",   // or "translate"
		// language: "en",
		// vad_filter: false,
		// initial_prompt: "Provide context if needed.",
		// prefix: "Transcription:",
	});
	return res.text; // Assumes the transcription result includes a "text" property.
}
```

## Options / Props

### Models

| Model ID | Provider | Properties as stated | Unit pricing |
|----------|----------|----------------------|--------------|
| `@cf/openai/whisper` | OpenAI | General-purpose speech recognition; multilingual recognition, speech translation, language identification; Zero data retention | $0.000453 per audio minute |
| `@cf/openai/whisper-large-v3-turbo` | OpenAI | ASR and speech translation; Batch; Zero data retention | $0.000513 per audio minute |
| `@cf/openai/whisper-tiny-en` | OpenAI | Beta; English-only Whisper Tiny; Zero data retention | — |
| `@cf/deepgram/nova-3` | Deepgram | Batch, Partner, Real-time, Zero data retention | $0.0052 per audio minute, $0.0092 per audio minute (websocket) |
| `@cf/deepgram/flux` | Deepgram | Conversational speech recognition for voice agents; Partner, Real-time, Zero data retention | $0.0077 per audio minute (websocket) |
| `@cf/pipecat-ai/smart-turn-v2` | Pipecat | Open-source native audio turn detection (task "Dumb Pipe"); Batch, Real-time, Zero data retention | $0.000338 per audio minute |

### whisper-large-v3-turbo input

| Name | Type | Default | Description |
|------|------|---------|-------------|
| audio | one of | — | Required. Not expanded in the source (the tutorial passes a base64 string). |
| task | string | transcribe | 'translate' or 'transcribe'. |
| language | string | — | Language of the audio being transcribed or translated. |
| vad_filter | boolean | false | Preprocess the audio with a voice activity detection model. |
| initial_prompt | string | — | Text prompt providing context on the audio contents. |
| prefix | string | — | Prefix appended to the beginning of the transcription output; can guide the result. |
| beam_size | integer | 5 | Beams for beam-search decoding. |
| condition_on_previous_text | boolean | true | Setting to false may help prevent hallucination loops. |
| no_speech_threshold | number | 0.6 | Segments with no-speech probability above this are skipped. |
| compression_ratio_threshold | number | 2.4 | Filters segments with high compression ratio. |
| log_prob_threshold | number | -1 | Filters segments with low average log probability. |
| hallucination_silence_threshold | number | — | Optional threshold in seconds to skip silent periods. |

Output: `transcription_info` (object), `text`, `word_count`, `segments` (array), `vtt` (WebVTT string).

### whisper and whisper-tiny-en

Input is a binary string (`format: binary`) or an object (option 2 is shown with the output fields). Output: `text` (the transcription), `word_count` (number), `words` (array), `vtt` (string).

### nova-3 input (`audio` object required)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| audio | object | — | Required. |
| custom_topic_mode | string | — | enum: extended, strict. |
| custom_topic | string | — | Custom topics to detect (up to 100). |
| custom_intent_mode | string | — | enum: extended, strict. |
| custom_intent | string | — | Custom intents to detect. |
| detect_entities | boolean | — | Extract key entities. |
| detect_language | boolean | — | Identify the dominant language. |
| diarize | boolean | — | Recognize speaker changes; words get a speaker number starting at 0. |
| dictation | boolean | — | As stated in the source: identify and extract key entities from content. |
| encoding | string | — | enum: linear16, flac, mulaw, amr-nb, amr-wb, opus, speex, g729. |
| extra | string | — | Arbitrary key-value pairs attached to the API response. |
| filler_words | boolean | — | Transcribe fillers like 'uh' and 'um'. |
| keyterm | string | — | Key term prompting. |
| keywords | string | — | Keyword boosting/suppression. |
| language | string | — | BCP-47 language tag hint. |
| measurements | boolean | — | Convert spoken measurements to abbreviations. |
| mip_opt_out | boolean | — | Opt out of the Deepgram Model Improvement Program (see page for pricing impacts). |
| mode | string | — | enum: general, medical, finance. |
| multichannel | boolean | — | Transcribe each audio channel independently. |
| numerals | boolean | — | Convert written numbers to numerals. |
| paragraphs | boolean | — | Split audio into paragraphs. |
| profanity_filter | boolean | — | Convert or remove recognized profanity. |
| punctuate | boolean | — | Add punctuation and capitalization. |
| redact | string | — | Remove sensitive information. |
| replace | string | — | Search for terms and replace them. |
| search | string | — | Search for terms or phrases. |
| sentiment | boolean | — | Recognize sentiment. |
| smart_format | boolean | — | Apply readability formatting. |
| topics | boolean | — | Detect topics. |
| utterances | boolean | — | Segment speech into semantic units. |
| utt_split | number | — | Seconds to wait before detecting a pause. |
| channels | number | — | Number of channels in the audio. |
| interim_results | boolean | — | Ongoing transcription updates; supported only for websockets. |
| endpointing | string | — | How long to wait before finalizing; can be set to false to disable. |
| vad_events | boolean | — | Speech Started messages; supported only for websockets. |
| utterance_end_ms | boolean | — | Time before sending an UtteranceEnd message; use with interim_results; websockets only. |

Output: `results` (object).

### flux input (websocket)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| encoding | string | — | enum: linear16 (raw signed little-endian 16-bit PCM). |
| sample_rate | string | — | Pattern `^[0-9]+$`; sample rate in Hz. |
| eager_eot_threshold | string | — | End-of-turn confidence to fire an eager end-of-turn event; valid values 0.3 - 0.9. |
| eot_threshold | string | 0.7 | Confidence required to finish a turn; valid values 0.5 - 0.9. |
| eot_timeout_ms | string | 5000 | Turn finishes this long after speech regardless of confidence. Pattern `^[0-9]+$`. |
| keyterm | string | — | Key term prompting. |
| mip_opt_out | string | false | enum: true, false. |
| tag | string | — | Label requests for usage reporting. |

Response event fields: `request_id`, `sequence_id`, `event` (Update, StartOfTurn, EagerEndOfTurn, TurnResumed, EndOfTurn), `turn_index`, `audio_window_start`, `audio_window_end`, `transcript`, `words`, `end_of_turn_confidence`.

### smart-turn-v2

Input is an object (not expanded in the source). Output: `is_complete` (boolean, true if end-of-turn was detected) and `probability` (number).

## Notes

- Nova 3 pricing depends on transport: WebSocket $0.0092 per audio minute output (836.36 neurons per audio minute output); regular HTTP $0.0052 per audio minute output (472.73 neurons per audio minute output).
- Adapted from the official docs: the tutorial snippet uses Node's `Buffer` (and `Buffer.from(arrayBuffer, "binary")`, where the encoding argument is ignored for ArrayBuffers), which requires Node.js compatibility in the Worker. The snippet uses `btoa` over the bytes instead. The tutorial slices a file into 1 MB chunks, so the string-building loop stays small; it is a pattern, not a model-page example.
- Corrected from the official docs: the tutorial's commented option `vad_filter: "false"` is a string while the schema type is boolean; the snippet comment uses `false`.
- Whisper-family pages mark `whisper-tiny-en` as Beta; no page in this group carries a deprecation flag.

## Related

- [text-to-speech.md](./text-to-speech.md)
- [translation.md](./translation.md)
