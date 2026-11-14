---
source: https://aistudio.google.com/docs/decisions-api
---

# Decisions API

Evaluates typed questions (yes/no `noul`, single-select `choice`, rubric `score`) over text, PDFs, audio, images, and video with Gemini Decision 1 (`gemini-decision-1`) and returns calibrated probabilities. It generates zero text tokens, so output token usage is always 0. Beta (`v1beta`): `POST /v1beta/decisions`, SDK method `client.decisions.create`.

## Signature / Usage

Requires SDK 3.2 or later (`pip install -U google-genai` or `npm install @google/genai@latest`). Pass a model, shared input, and a map of questions. Each question requires a type (`noul` for yes/no) and instructions.

```python
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

result = client.decisions.create(
    model="gemini-decision-1",
    input="The blue mug I ordered on Monday arrived cracked on Wednesday.",
    questions={
        "is_damaged": {
            "type": "noul",
            "instructions": "Did the item arrive damaged?",
        },
    },
)

answer = result.answers["is_damaged"]
print(f"P(yes)={answer.noul:.2f} confidence={answer.confidence:.2f}")
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiVersion: "v1beta" });

const result = await ai.decisions.create({
  model: "gemini-decision-1",
  input: "The blue mug I ordered on Monday arrived cracked on Wednesday.",
  questions: {
    is_damaged: {
      type: "noul",
      instructions: "Did the item arrive damaged?",
    },
  },
});

const answer = result.answers?.is_damaged;
if (answer?.type === "noul") {
  console.log(`P(yes)=${answer.noul} confidence=${answer.confidence}`);
}
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/decisions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-decision-1",
    "input": "The blue mug I ordered on Monday arrived cracked on Wednesday.",
    "questions": {
      "is_damaged": {
        "type": "noul",
        "instructions": "Did the item arrive damaged?"
      }
    }
  }'
```

The API returns calibrated probabilities and token usage:

```json
{
  "answers": {
    "is_damaged": { "type": "noul", "noul": 0.99, "confidence": 0.99 }
  },
  "usage": {
    "total_input_tokens": 100,
    "input_tokens_by_modality": [{ "modality": "text", "tokens": 100 }],
    "total_output_tokens": 0,
    "total_tokens": 100
  }
}
```

### Question types

| Question type | Goal | Returns |
| :--- | :--- | :--- |
| Yes/no (`noul`) | Check whether a statement holds | `noul` (0.01 to 0.99), `confidence` |
| Choice (`choice`) | Pick one option from a fixed list | `choice`, `probabilities`, `confidence` |
| Score (`score`) | Rate input against ordered rubric levels | `score`, `probabilities`, `legend`, `confidence` |

Every question runs against the shared input in one forward pass. Questions can't see each other, and latency stays nearly flat when you ask multiple questions.

#### Yes or no (noul)

Returns the calibrated probability that the answer is yes. Add `criteria` (`true_description` / `false_description`) to define what yes and no mean when the question alone is ambiguous.

```python
result = client.decisions.create(
    model="gemini-decision-1",
    input="Customer returned the sweater because they preferred green over blue.",
    questions={
        "is_defect": {
            "type": "noul",
            "instructions": "Is the customer reporting a product defect?",
            "criteria": {
                "true_description": "The product itself is broken or faulty.",
                "false_description": "Preference, sizing, shipping, or pricing complaint.",
            },
        },
    },
)

print(result.answers["is_defect"].noul)
```

Answer:

```json
{ "type": "noul", "noul": 0.03, "confidence": 0.97 }
```

Yes/no probabilities always fall between 0.01 and 0.99. Set thresholds inside that range, since a check above 0.99 never matches.

#### Pick one option (choice)

Scores a fixed set of options and returns the top option and the calibrated probability of every option (summing to 1). `criteria` maps each option ID to a description of when it applies. Use an empty string (`""`) when the option ID is self-explanatory. Before evaluation, the API sorts option keys alphabetically in UTF-8 byte order; changing key order in your JSON request doesn't change option positions, and exact probability ties break to the alphabetically first key.

```python
result = client.decisions.create(
    model="gemini-decision-1",
    input="I was charged twice for my order.",
    questions={
        "department": {
            "type": "choice",
            "instructions": "Which department should handle this request?",
            "criteria": {
                "billing": "Payments, invoices, and refunds.",
                "technical": "Problems using the product.",
                "shipping": "Delivery and tracking.",
                "other": "Anything outside these categories.",
            },
        },
    },
)

answer = result.answers["department"]
print(answer.choice, answer.confidence, answer.probabilities)
```

Answer:

```json
{
  "type": "choice",
  "choice": "billing",
  "probabilities": { "billing": 0.99, "shipping": 0.004, "other": 0.003, "technical": 0.002 },
  "confidence": 0.99
}
```

Choice questions always distribute probability across your options, even when none fits. Threshold confidence to catch low-certainty inputs, pair the question with a separate yes/no scope check, or add a catch-all option such as "other" with an explicit description. Avoid positional keys like "none_of_the_above": alphabetical sorting places it ahead of keys like "shipping" and "technical" instead of last.

#### Rate on a scale (score)

Rates the input across ordered levels. `criteria` is an array of non-empty level descriptions ordered from lowest to highest (2 to 255 levels, with 2 to 10 recommended for most rubrics), indexed starting at 0. The returned score is the probability-weighted average of the level indices, so it can fall between levels, and `legend` maps each index back to its description.

```python
result = client.decisions.create(
    model="gemini-decision-1",
    input="Export fails in Safari but works in Chrome.",
    questions={
        "severity": {
            "type": "score",
            "instructions": "How severe is this issue for the user?",
            "criteria": [
                "Cosmetic: appearance only, no lost functionality.",
                "Workaround available: a task fails, but another way works.",
                "Fully blocked: a task fails with no workaround.",
            ],
        },
    },
)

answer = result.answers["severity"]
print(answer.score, answer.confidence, answer.probabilities)
```

Answer:

```json
{
  "type": "score",
  "score": 1.12,
  "legend": {
    "0": "Cosmetic: appearance only, no lost functionality.",
    "1": "Workaround available: a task fails, but another way works.",
    "2": "Fully blocked: a task fails with no workaround."
  },
  "probabilities": { "0": 0.03, "1": 0.83, "2": 0.15 },
  "confidence": 0.83
}
```

Because different probability distributions can produce the same expected value (here 1.12, sitting just above level 1), check the per-level probabilities and confidence alongside the score when inputs can split across levels. When your code needs a discrete level, pick the entry with the highest probability:

```python
level = max(answer.probabilities, key=answer.probabilities.get)  # "1"
print(answer.legend[level])  # "Workaround available: ..."
```

To compare scales with different numbers of levels, divide the score by the highest level index to normalize it between 0 and 1.

### Ask multiple questions

Put independent questions about the same input in one request. Shared input counts once per request regardless of how many questions you ask (each question adds only its own instructions and criteria), and question types can be mixed. This example routes a support ticket using order data and the customer message.

```python
import json
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

order = {"order": {"id": "8821", "item": "headphones", "price_usd": 240}, "tier": "Gold"}
message = {"message": "Audio cuts out on the left earcup. Fix it today or I cancel my membership."}

result = client.decisions.create(
    model="gemini-decision-1",
    input=[
        {"type": "text", "text": json.dumps(order) + "\n"},
        {"type": "text", "text": json.dumps(message)},
    ],
    questions={
        "is_defect": {
            "type": "noul",
            "instructions": "Does `message` describe a hardware defect?",
        },
        "next_action": {
            "type": "choice",
            "instructions": "What is the right resolution given `tier` and `order`?",
            "criteria": {
                "instant_refund": "Refund without return. Low value or clear fault.",
                "replacement_shipment": "Ship a replacement. Customer returns the original.",
                "troubleshooting_flow": "The issue may be fixable by the customer.",
                "human_escalation": "",
            },
        },
        "churn_risk": {
            "type": "score",
            "instructions": "How likely is the customer to churn if the issue is not resolved now?",
            "criteria": [
                "No churn signal",
                "Mild frustration",
                "Mentions alternatives",
                "Threatens to cancel",
            ],
        },
    },
)

a = result.answers
if a["is_defect"].noul > 0.9 and a["next_action"].confidence > 0.6:
    action = a["next_action"].choice
else:
    action = "human_escalation"

print(action, a["churn_risk"].score)
```

Some decisions depend on another, for example picking a repair category only if the item is damaged. Either send a second request after you read the first answer, or ask both questions in one request and ignore the answer you don't need.

### Answers, probabilities, and confidence

- Top value: probability of yes for binary questions, most likely option for choice questions, or probability-weighted expected level for score questions.
- Probabilities: on choice and score answers, a map of calibrated probabilities across all options or levels (summing to 1). For yes/no answers, the probability of no is 1 minus the yes probability.
- Confidence: estimated probability (from 0 to 1) that the top answer is right. Equals the top outcome's probability, or `max(noul, 1 - noul)` for yes/no questions.

Use the answer value to pick an action and confidence to decide whether to run it automatically:

```python
answer = result.answers["department"]
if answer.confidence >= 0.7:
    route_to(answer.choice)
else:
    route_to("human_review")
```

Set thresholds using labeled examples from your own traffic. Weigh the cost of a false positive against a false negative.

### Input

The `input` field accepts text, image, audio, video, and PDF document blocks using the same content block schema as the Interactions API (tool-call, tool-result, and thought blocks aren't supported):

```none
Input   = string | Content | Content[]
Content = TextContent | ImageContent | AudioContent | VideoContent | DocumentContent
```

| Block | Fields | Supported MIME types |
| :--- | :--- | :--- |
| `text` | `text` | n/a |
| `image` | `data` or `uri`, `mime_type`, optional `resolution` | `image/png`, `image/jpeg`, `image/webp`, `image/heic`, `image/heif`, `image/gif`, `image/bmp`, `image/tiff` |
| `audio` | `data` or `uri`, `mime_type` | `audio/wav`, `audio/mp3`, `audio/mpeg`, `audio/aiff`, `audio/aac`, `audio/ogg`, `audio/flac`, `audio/m4a`, `audio/opus`, `audio/webm`, `audio/l16`, `audio/alaw`, `audio/mulaw` |
| `video` | `data` or `uri`, `mime_type`, optional `resolution` | `video/mp4`, `video/mpeg`, `video/mov`, `video/avi`, `video/webm`, `video/wmv`, `video/x-flv`, `video/3gpp` |
| `document` | `data` or `uri`, `mime_type` | `application/pdf` |

- Inline data accepts base64-encoded bytes (up to 100 MB per request, or 50 MB for PDFs).
- URI inputs accept Files API URIs (`file.uri`) and public or signed HTTPS URLs (up to 15 MB per external URL).
- Always set the MIME type to the real file format. The API rejects generic octet-stream types and content that doesn't match the block type.
- The API concatenates adjacent text blocks in `input` and `instructions` in order with no separator. Include your own spaces or newlines (`\n`) between blocks.
- Input can't be empty.

Serialize JSON objects and arrays to a string and pass them as text so keys inside your payload stay plain data rather than content blocks. In your question instructions, refer to JSON fields by their key path:

```python
state = json.dumps({"customer": {"tier": "Gold"}, "order": {"id": "8821", "age_days": 14}})
```

#### Documents (PDF)

Pass a PDF up to 50 MB as inline base64 bytes. For larger or reusable files, upload them with the Files API.

```python
import base64
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

with open("invoice.pdf", "rb") as f:
    pdf_b64 = base64.b64encode(f.read()).decode("utf-8")

result = client.decisions.create(
    model="gemini-decision-1",
    input=[
        {
            "type": "document",
            "data": pdf_b64,
            "mime_type": "application/pdf",
        },
    ],
    questions={
        "has_po_number": {
            "type": "noul",
            "instructions": "Does the invoice include a purchase order (PO) number?",
        },
        "expense_category": {
            "type": "choice",
            "instructions": "Which expense category fits this invoice?",
            "criteria": {
                "cloud_infrastructure": "Servers, GPU compute, hosting, or storage.",
                "software_licenses": "SaaS subscriptions or seat licenses.",
                "travel": "Flights, hotels, meals, or ground transport.",
                "other": "Anything outside these categories.",
            },
        },
    },
)

po = result.answers["has_po_number"]
category = result.answers["expense_category"]
print(po.noul, category.choice, category.confidence)
```

#### Images

Pass local image bytes as base64 or pass a URI, and set `resolution` to trade visual detail against token cost.

```python
import base64
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

with open("earcup.jpg", "rb") as f:
    image_b64 = base64.b64encode(f.read()).decode("utf-8")

result = client.decisions.create(
    model="gemini-decision-1",
    input=[
        {"type": "text", "text": "Customer photo for return request #8821."},
        {
            "type": "image",
            "data": image_b64,
            "mime_type": "image/jpeg",
            "resolution": "low",  # Supported values: "low", "medium", "high", "ultra_high"
        },
    ],
    questions={
        "visible_damage": {
            "type": "noul",
            "instructions": "Does the photo show physical damage to the device? Ignore the packaging.",
        },
    },
)

print(result.answers["visible_damage"].noul)
```

#### Audio

Pass a public or signed HTTPS URL, upload local recordings with the Files API, or send inline base64 bytes. The model evaluates spoken words, pacing, and vocal tone without a separate transcription step.

```python
result = client.decisions.create(
    model="gemini-decision-1",
    input=[
        {
            "type": "audio",
            "uri": "https://storage.googleapis.com/generativeai-downloads/audio/rehearsing.wav",
            "mime_type": "audio/wav",
        },
    ],
    questions={
        "mentions_launch": {
            "type": "noul",
            "instructions": "Is the speaker talking about a product campaign launch?",
        },
        "delivery": {
            "type": "score",
            "instructions": "How fluent and prepared does the speaker sound?",
            "criteria": [
                "Hesitant, searching for notes, or self-correcting.",
                "Mostly steady with minor pauses.",
                "Polished, fluent, and confident throughout.",
            ],
        },
    },
)

print(result.answers["mentions_launch"].noul, result.answers["delivery"].score)
```

For local files or recordings larger than 15 MB, upload once with the Files API and pass the returned URI (the same pattern works for PDFs, images, and video):

```python
uploaded = client.files.upload(file="support_call.wav")
audio_block = {"type": "audio", "uri": uploaded.uri, "mime_type": uploaded.mime_type}
```

#### Video

Pass video through the Files API, a public or signed HTTPS URL, or inline base64 bytes. Set `resolution` to `low` when fine visual detail isn't needed.

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/decisions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-decision-1",
    "input": [
      {
        "type": "video",
        "uri": "https://storage.googleapis.com/generativeai-downloads/videos/ForBiggerBlazes.mp4",
        "mime_type": "video/mp4",
        "resolution": "low"
      }
    ],
    "questions": {
      "shows_fire": {
        "type": "noul",
        "instructions": "Does the video show fire or flames?"
      }
    }
  }'
```

Media resolution on image and video blocks (`low`, `medium`, `high`, or `ultra_high`) controls token cost and visual detail. Ultra-high resolution applies to images only; audio and document blocks don't use resolution settings.

## Options / Props

Request fields:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `model` | string | yes | Model ID: `gemini-decision-1`. |
| `input` | string, `Content`, or `Content[]` | yes | Shared context for all questions (text, image, audio, video, or PDF document). |
| `questions` | map of string to `Question` | yes | 1 to 1,000 questions. You choose the keys (`[A-Za-z0-9_-]+`, up to 64 characters). Answers come back under the same keys. |

Every question has:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `type` | `noul`, `choice`, or `score` | yes | Question type. |
| `instructions` | string, `TextContent`, or `TextContent[]` | yes | The question to evaluate against the input. Text only. |
| `criteria` | depends on type | choice and score: yes. noul: no. | The possible answers. |

The response contains:

| Field | Type | Description |
| :--- | :--- | :--- |
| `answers` | map of string to `Answer` | One answer per question, under the same keys as `questions`. Each answer has a type that matches its question. |
| `usage` | `Usage` | Input token counts by modality (text, image, and audio, with video frames and PDF page images counted as image tokens) and 0 output tokens. Only input tokens are billed. |

When input safety filters block a request, the API returns an HTTP `400 Bad Request` error instead of `answers`. The JSON `error` object includes a `message` and a `code` (`safety`, `prohibited_content`, `blocklist`, `image_safety`, or `content_blocked`):

```json
{
  "error": {
    "code": "safety",
    "message": "Request blocked due to safety violations (harmful content). Please modify your input and retry."
  }
}
```

### Limits

| Limit | Value |
| :--- | :--- |
| Questions per request | 1 to 1,000 (bounded by the 262,144-token context window) |
| Options per choice question | 2 to 255 |
| Levels per score question | 2 to 255 non-empty strings (2 to 10 recommended for most rubrics) |
| Question key | 1 to 64 ASCII characters matching `[A-Za-z0-9_-]+` |
| Option key | 1 to 128 characters (up to 512 UTF-8 bytes). Internal ASCII spaces are allowed. Leading or trailing spaces, control characters, and non-ASCII spaces aren't allowed. |
| Context window | 262,144 tokens across shared input and all questions |
| JSON nesting depth | 100 levels |
| Media per request | Same as the Interactions API |
| Question instructions | Text only |

When a request exceeds a limit or fails key validation, the API returns HTTP 400 with an error message that names the rule you exceeded.

### Limitations

- Available on the Gemini Developer API (v1beta) with Gemini Decision 1 only.
- Question instructions accept text only. Media inside questions isn't supported.
- The Decisions API doesn't support YouTube URLs or direct Cloud Storage (`gs://`) URIs. Pass media using a Files API URI, a public or signed HTTPS URL, or inline base64 bytes.
- Conversation history, thought, and tool-call blocks aren't supported as input blocks. Serialize multi-turn context as text.
- The Decisions API doesn't support context caching, Batch API, or Flex or Priority inference. Repeated input across requests counts in full.

### Pricing

Pricing section "Gemini Decision 1" of the official pricing page: free tier input is free of charge; paid tier input is $0.10 per 1M tokens (text, image, video, audio, PDF); no output price (0 output tokens); context caching not available. Each request bills shared input tokens once regardless of question count; each question adds tokens for its own instructions, criteria, and formatting. Batch API isn't supported.

## Notes

- Best practices (official): keep each question focused on one decision or rubric; write the full question in `instructions` because the model never sees question keys; give each choice option and score level a short description and keep score scales linear (score averages array indices, so 1/10/100/1000 scales skew the expected value); plan for inputs that fit no option; prefer positive phrasing; send only the fields the questions need; compare numbers, dates, and durations in code; treat input as untrusted and keep a human or a second check on high-stakes actions.
- Use the Decisions API for calibrated probabilities over closed-ended outcomes (routing, policy checks, scoring, tool selection). Use the Interactions API for generated text, structured outputs following your own JSON schema, tool calls with arguments, and multi-step reasoning.
- This is Gemini's classifier-style API (calibrated probabilities, zero output tokens). It is distinct from the LLM guardrails / evals of anthropic-prompt-eval, openai-agents, and openai-evals-tuning.
- Model: `gemini-decision-1` (Gemini Decision 1) takes text, image, video, audio, and PDF input, has a 262,144-token input limit and a 0 output token limit (up to 1,000 questions per request), and does not support audio generation, Batch API, caching, code execution, computer use, file search, Flex inference, or function calling. Released November 11, 2026 together with the Decisions API; SDK method `client.decisions.create` was added in google-genai (Python) and @google/genai (JavaScript) 3.2.0.
- Source: https://aistudio.google.com/docs/decisions-api (fetched 2026-11-14)
- Source: https://aistudio.google.com/docs/models/gemini-decision-1 (fetched 2026-11-14)
- Source: https://aistudio.google.com/docs/pricing (fetched 2026-11-14)
- Source: https://aistudio.google.com/docs/changelog (fetched 2026-11-14)

## Related

- [Text generation](./text-generation.md)
- [Structured outputs](./structured-output.md)
- [Decisions API REST reference](../rest-reference/decisions.md)
