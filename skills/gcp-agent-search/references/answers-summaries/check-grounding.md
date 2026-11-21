---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/check-grounding
---

# Check grounding

The check grounding API determines how grounded a piece of text (the answer candidate) is in a given set of reference texts (the facts). It returns an overall support score from 0 to 1 and citations to the facts that support each claim. A sentence is treated as a single claim; a claim that is only partially entailed by the facts is not considered grounded. Latency is designed to be less than 500ms.

## Signature / Usage

### Obtain a support score

Call the `groundingConfigs.check` method.

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/groundingConfigs/default_grounding_config:check" \
-d '{
  "answerCandidate": "CANDIDATE",
  "facts": [
  {
    "factText": "TEXT_0",
    "attributes": {"ATTRIBUTE_A": "VALUE_A0","ATTRIBUTE_B": "VALUE_B0"}
  },
  {
    "factText": "TEXT_1",
    "attributes": {"ATTRIBUTE_A": "VALUE_A1","ATTRIBUTE_B": "VALUE_B1"}
  },
  {
    "factText": "TEXT_2",
    "attributes": {"ATTRIBUTE_A": "VALUE_A2","ATTRIBUTE_B": "VALUE_B2"}
  }
  ],
  "groundingSpec": {
    "citationThreshold": "CITATION_THRESHOLD"
  }
}'
```

### Obtain claim-level scores

Set `enableClaimLevelScore` to `true` in `groundingSpec`; each claim then also returns a score from 0 to 1. Remove the field or set it to `false` to turn the feature off.

Adapted (not in the official docs): removed the trailing comma after `"enableClaimLevelScore": true` that makes the JSON body invalid.

```bash
    curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    "https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/groundingConfigs/default_grounding_config:check" \
    -d '{
    "answerCandidate": "CANDIDATE",
    "facts": [
     {
      "factText": "Titanic is a 1997 American epic romantic disaster movie. It was directed, written, and co-produced by James Cameron. The movie is about the 1912 sinking of the RMS Titanic. It stars Kate Winslet and Leonardo DiCaprio. The movie was released on December 19, 1997. It received positive critical reviews. The movie won 11 Academy Awards, and was nominated for fourteen total Academy Awards.",
      "attributes": {"author":"Simple Wikipedia"}
     },
     {
      "factText": "James Cameron&#39;s \"Titanic\" is an epic, action-packed romance set against the ill-fated maiden voyage of the R.M.S. Titanic; the pride and joy of the White Star Line and, at the time, the largest moving object ever built. She was the most luxurious liner of her era -- the \"ship of dreams\" -- which ultimately carried over 1,500 people to their death in the ice cold waters of the North Atlantic in the early hours of April 15, 1912.",
      "attributes": {"author":"Simple Wikipedia"}
     }
    ],
    "groundingSpec": {
      "citationThreshold": "0.6",
      "enableClaimLevelScore": true
    }
    }'
```

## Options / Props

### Request inputs

| Name | Type / limit | Description |
|------|--------------|-------------|
| `answerCandidate` | Maximum 4096 tokens | Any text whose grounding you want to check. A token is a word in a sentence or a period; "They wore off-the-rack clothes in 2024." is seven tokens (six words and a period). |
| `facts` | Up to 200 facts, each with a maximum of 10k characters | Text segments used as references (`factText`), each with optional metadata `attributes` (key-value pairs such as `author` or `title`). |
| `groundingSpec.citationThreshold` | Float from 0 through 1; default `0.6` if unset | A higher threshold yields fewer but stronger citations; a lower one yields more but weaker citations. |
| `groundingSpec.enableClaimLevelScore` | Boolean | `true` returns a claim-level support score for each claim. |

### Response outputs

| Name | Description |
|------|-------------|
| Support score | Number from 0 to 1; loosely approximates the fraction of claims found grounded in one or more facts. |
| Cited chunks | Portions of the input facts that support the answer candidate. |
| Claims and citations | Connect each claim (typically a sentence) to one or more cited chunks. A claim is demarcated by start and end positions, which are byte positions of the UTF-8 encoded claim string, not characters. |
| Claim-level support score | Number from 0 to 1 per claim, returned when claim-level scoring is enabled. |
| Grounding check required | Boolean per claim. `false` means the claim (for example "Here is what I found.") needs no grounding and no citations are returned; `true` means a check was performed. |

## Notes

- Google recommends against supplying one very large fact. Break large facts into smaller facts and supply attributes (for example title, author or URL).
- The source notes that, in the example requests, double quotes are escaped with a backslash and the apostrophe is replaced by its HTML character entity (`&#39;`).
- Corrected from the official docs: the claim-level example request wrote `"enableClaimLevelScore": true,` with a trailing comma before `}`, which is invalid JSON; it is kept here without that comma. The claim-level template (`"enableClaimLevelScore": "ENABLE_CLAIM_LEVEL_SCORE",` and `},` before `]`, also trailing commas) is left out.
- `citationThreshold` is a `double` in the `discoveryengine.v1` Discovery document; the source passes it as a quoted string, which is kept in the first block.
- The source also shows a Python sample (`discoveryengine_v1.GroundedGenerationServiceClient`, `check_grounding`), example facts, and tables of example answer candidates with their responses.
- Former name: Agent Search was Vertex AI Search; the API is still Discovery Engine (`discoveryengine.googleapis.com`).
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/check-grounding (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-search-summaries.md](./get-search-summaries.md)
- [stream-answer.md](./stream-answer.md)
