---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/check-grounding
---

# Check grounding

The check grounding API determines how grounded a piece of text (the answer candidate) is in a given set of reference texts (the facts). It returns an overall support score from 0 to 1 and citations to the facts that support each claim. A sentence is treated as a single claim; a claim that is only partially entailed by the facts is not considered grounded. Latency is designed to be less than 500ms.

## Signature / Usage

### Obtain a support score

Call the `groundingConfigs.check` method. Run the command by itself and type each value on its own line at the prompts, in this order: `CANDIDATE`, then `TEXT_0`, `VALUE_A0`, `VALUE_B0`, `TEXT_1`, `VALUE_A1`, `VALUE_B1`, `TEXT_2`, `VALUE_A2`, `VALUE_B2`; `jq` (required) encodes each one as a JSON string, and nothing is sent if a value is missing or empty. A line that follows the command in the same paste or script is read as a value. `ATTRIBUTE_A` and `ATTRIBUTE_B` are attribute names and stay in the command.

Adapted (not in the official docs): the request body is built with `jq -n --arg candidate "$CANDIDATE" --arg text_0 "$TEXT_0" --arg value_a0 "$VALUE_A0" ... '{...}'` from the values read by one `IFS= read -r` per placeholder, rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"CANDIDATE"`, `"TEXT_n"` and `"VALUE_An"` / `"VALUE_Bn"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error (for example an unreplaced number or boolean placeholder) stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `CITATION_THRESHOLD` is unquoted in the `jq` program: replace it with a number from 0 through 1 (left unreplaced, it is a `jq` error and nothing is sent). The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset TOKEN` at its start also drops an `export` of that variable in your shell, so the new value is not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; unset TOKEN; IFS= read -r CANDIDATE &&
IFS= read -r TEXT_0 && IFS= read -r VALUE_A0 && IFS= read -r VALUE_B0 &&
IFS= read -r TEXT_1 && IFS= read -r VALUE_A1 && IFS= read -r VALUE_B1 &&
IFS= read -r TEXT_2 && IFS= read -r VALUE_A2 && IFS= read -r VALUE_B2 &&
[ -n "$CANDIDATE" ] &&
[ -n "$TEXT_0" ] && [ -n "$VALUE_A0" ] && [ -n "$VALUE_B0" ] &&
[ -n "$TEXT_1" ] && [ -n "$VALUE_A1" ] && [ -n "$VALUE_B1" ] &&
[ -n "$TEXT_2" ] && [ -n "$VALUE_A2" ] && [ -n "$VALUE_B2" ] &&
BODY=$(jq -n --arg candidate "$CANDIDATE" \
  --arg text_0 "$TEXT_0" --arg value_a0 "$VALUE_A0" --arg value_b0 "$VALUE_B0" \
  --arg text_1 "$TEXT_1" --arg value_a1 "$VALUE_A1" --arg value_b1 "$VALUE_B1" \
  --arg text_2 "$TEXT_2" --arg value_a2 "$VALUE_A2" --arg value_b2 "$VALUE_B2" '{
  "answerCandidate": $candidate,
  "facts": [
  {
    "factText": $text_0,
    "attributes": {"ATTRIBUTE_A": $value_a0,"ATTRIBUTE_B": $value_b0}
  },
  {
    "factText": $text_1,
    "attributes": {"ATTRIBUTE_A": $value_a1,"ATTRIBUTE_B": $value_b1}
  },
  {
    "factText": $text_2,
    "attributes": {"ATTRIBUTE_A": $value_a2,"ATTRIBUTE_B": $value_b2}
  }
  ],
  "groundingSpec": {
    "citationThreshold": CITATION_THRESHOLD
  }
}') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/groundingConfigs/default_grounding_config:check" \
--data @- )
```

### Obtain claim-level scores

Set `enableClaimLevelScore` to `true` in `groundingSpec`; each claim then also returns a score from 0 to 1. Remove the field or set it to `false` to turn the feature off.

Run the command by itself and type the answer candidate on one line at the prompt (the facts are the source's fixed example text); nothing is sent if the input ends first or the line is empty.

Adapted (not in the official docs): removed the trailing comma after `"enableClaimLevelScore": true` that makes the JSON body invalid. Also, the request body is built with `jq -n --arg candidate "$CANDIDATE" '{...}'` from the text read by `IFS= read -r CANDIDATE`, rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"CANDIDATE"` inside the single-quoted `-d '{...}'` argument; every other field is unchanged. The body is built in its own step (`BODY=$(jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error (for example an unreplaced number or boolean placeholder) stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset TOKEN` at its start also drops an `export` of that variable in your shell, so the new value is not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; unset TOKEN; IFS= read -r CANDIDATE &&
[ -n "$CANDIDATE" ] &&
BODY=$(jq -n --arg candidate "$CANDIDATE" '{
    "answerCandidate": $candidate,
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
    }') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
    curl --fail-with-body -X POST \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    -H "Content-Type: application/json" \
    "https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/groundingConfigs/default_grounding_config:check" \
    --data @- )
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
- Corrected from the official docs: the first block wrote `"citationThreshold": "CITATION_THRESHOLD"`, which sends that text if left as is; `citationThreshold` is a `double` in the `discoveryengine.v1` Discovery document ("If unset, the threshold will default to 0.6."), so the placeholder is unquoted. The claim-level block's `"0.6"` is kept as written: the proto3 JSON mapping says for `double` "Either numbers or strings are accepted." (https://protobuf.dev/programming-guides/json/ , retrieved 2026-11-21).
- The source also shows a Python sample (`discoveryengine_v1.GroundedGenerationServiceClient`, `check_grounding`), example facts, and tables of example answer candidates with their responses.
- Former name: Agent Search was Vertex AI Search; the API is still Discovery Engine (`discoveryengine.googleapis.com`).
- Corrected from the official docs: both requests write free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"answerCandidate": "CANDIDATE"`, `"factText": "TEXT_0"`, `"attributes": {"ATTRIBUTE_A": "VALUE_A0","ATTRIBUTE_B": "VALUE_B0"}` and the same for facts 1 and 2). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"`, `\` or a line break makes the JSON invalid, so the bodies are built with `jq --arg` from standard input and sent with `--data @-`.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset TOKEN` at its start also drops an `export` of that variable in the calling shell, so the value is not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/check-grounding (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-search-summaries.md](./get-search-summaries.md)
- [stream-answer.md](./stream-answer.md)
