---
source: https://ai.google.dev/gemini-api/docs/live-api/best-practices
---

# Live API best practices

Guidance for system instructions, tool definitions, prompts, language, streaming, context management, session management, and billing in the Live API.

## Signature / Usage

Instruct the response language (verbatim system-instruction line):

```text
RESPOND IN {OUTPUT_LANGUAGE}. YOU MUST RESPOND UNMISTAKABLY IN {OUTPUT_LANGUAGE}.
```

Tool definition with invocation conditions (one function of the source's career-coach example):

```json
{
  "name": "create_client_profile",
  "description": "Creates a new client profile with their personal details. Returns a unique client ID. \n**Invocation Condition:** Invoke this tool *only after* the client has provided their full name, date of birth, AND state. This should only be called once at the beginning of the 'Intake' step.",
  "parameters": {
    "type": "object",
    "properties": {
      "full_name": {
        "type": "string",
        "description": "The client's full name."
      },
      "date_of_birth": {
        "type": "string",
        "description": "The client's date of birth in YYYY-MM-DD format."
      },
      "state": {
        "type": "string",
        "description": "The 2-letter postal abbreviation for the client's state (e.g., 'NY', 'CA')."
      }
    },
    "required": ["full_name", "date_of_birth", "state"]
  }
}
```

System instruction structure used in the example (persona, conversational rules, guardrails):

```text
**Persona:**
You are Laura, a career coach from Brooklyn, NY. ...

**Conversational Rules:**

1. **Introduce yourself:** Warmly greet the client.

2. **Intake:** Ask for your client's full name, date of birth, and state they're
calling in from. Call `create_client_profile` to create a new patient profile.

**Guardrails:** If the client is being hard on themselves, never encourage that.
```

## Options / Props

| Topic | Guidance |
|-------|----------|
| System instructions | Define persona, conversational rules, and guardrails, in this order; separate each agent into a distinct SI. Delineate one-time elements from conversational loops; put tool calls within a flow in distinct sentences; use the word "unmistakably" to guide precision |
| Tools | Include names, descriptions, parameters, and invocation conditions |
| Prompts | Give examples of what the model should and shouldn't do; one prompt per persona or role; prefer prompt chaining over multi-page prompts; the model performs best on tasks with single function calls |
| Starting the conversation | Live API expects user input before it responds; include a prompt asking it to greet the user to initiate |
| Streaming chunk size | Send audio in chunks of 20ms to 40ms |
| Client buffering | Don't buffer input audio significantly (such as 1 second); send small chunks (20ms - 100ms) |
| Resampling | Resample microphone input (often 44.1kHz or 48kHz) to 16kHz |
| Interruption | On `server_content` with `"interrupted": true`, immediately discard the client-side audio buffer |
| Context | Use `ContextWindowCompressionConfig` for long sessions; native audio accumulates approximately 25 tokens per sec of audio |

## Notes

- The page opens with a warning: "Preview: The Live API is in preview."
- Session management: enable context window compression (without it, audio-only sessions are limited to 15 minutes and audio-video to 2 minutes); implement session resumption (tokens valid for 2 hours after the last session terminates); handle GoAway messages (`timeLeft`); handle `generationComplete`.
- Billing: Live API bills strictly by token usage; each turn is charged for all tokens in the session context window (past tokens are re-processed each turn, so cost per turn grows as the session lengthens). Native audio tokens are billed at the standard audio input rate every turn. When `inputAudioTranscription` or `outputAudioTranscription` is enabled, transcription text tokens are additionally charged at the text token output rate.
- Cost control: set `contextWindowCompression` with a compression trigger (e.g., 25,000 tokens) and a sliding window (e.g., 8,000 tokens); subsequent turns bill only for retained history plus new tokens.
- Proactive audio: when enabled, input tokens are charged the entire time the API is listening and output tokens only when it responds. Proactive audio is permanently enabled in `gemini-3.8-live` and `gemini-3.8-live-extended-thinking`, and not supported in `gemini-3.1-flash-live-preview` (billed only when you actively stream input). For pricing see the Gemini API pricing page.
- Availability: Live API is v1beta only.

## Related

- [Session management with Live API](./session-management.md)
- [Live API capabilities guide](./capabilities.md)
- [Tool use with Live API](./tool-use.md)
