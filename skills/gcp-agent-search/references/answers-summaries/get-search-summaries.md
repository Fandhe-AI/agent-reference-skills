---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/get-search-summaries
---

# Get search summaries

A search summary is a short summarization of the top search results returned in a search response, requested through `contentSearchSpec.summarySpec`. It applies to unstructured and website data only. The `answer` method also returns summaries (also called answers) and has more features for customizing them.

## Signature / Usage

Before you begin: for an unstructured search app, turn on the generative responses option. For a website search app, turn on Enterprise edition features, generative responses and advanced website indexing (requires domain verification).

### Get a search summary

The summary is taken from the extractive answers in the response, so you must also request extractive answers. One `summary` property is returned per response.

```text
"contentSearchSpec":
 {
   "summarySpec":
   {
     "summaryResultCount": 3
   },
   "extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}
 }
```

```text
"summary":
{
  "summaryText": "BigQuery is Google Cloud's fully managed and completely
  serverless enterprise data warehouse. BigQuery supports all data types,
  works across clouds, and has built-in machine learning and business
  intelligence, all within a unified platform."
}
```

### Generate summaries from semantic chunks

Set `useSemanticChunks` to generate the summary from the most relevant document chunks; this increases recall and retrieval compared with the default of using extractive answers. The response returns the summary and the content of each chunk it used (`references`).

Adapted (not in the official docs): the trailing comma after `"includeCitations": CITATIONS_BOOLEAN` is removed, because JSON does not allow a comma before a closing brace.

```text
"contentSearchSpec":
 {
   "summarySpec":
   {
     "useSemanticChunks": SEMANTIC_CHUNK_BOOLEAN,
     "summaryResultCount": SUMMARY_RESULT_COUNT,
     "includeCitations": CITATIONS_BOOLEAN
   }
 }
```

### Get citations

Citations are inline numbers (1-indexed, for example `[1]` or `[2, 3]`) that show which search results each sentence is taken from.

```text
"contentSearchSpec":
 {
   "summarySpec":
   {
     "summaryResultCount": 3,
     "includeCitations": true
   },
   "extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}
 }
```

### Ignore adversarial queries

With `ignoreAdversarialQuery` set to `true`, no summary is returned for adversarial queries (negative comments or queries designed to produce unsafe output); search documents are still returned.

```text
"contentSearchSpec":
 {
   "summarySpec":
   {
     "summaryResultCount": 3,
     "ignoreAdversarialQuery": true
   },
   "extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}
 }
```

```text
"summary":
{
  "summaryText": "We do not have a summary for your query. Here are some
  search results.",
  "summarySkippedReasons": [
   "ADVERSARIAL_QUERY_IGNORED"
 ]
}
```

### Ignore non-summary seeking queries

With `ignoreNonSummarySeekingQuery` set to `true`, no summary is returned for navigational queries such as "SFO airport" or "world cup 2026" (but "why is the sky blue" is summary-seeking). The skipped reason is `NON_SUMMARY_SEEKING_QUERY_IGNORED`.

```text
"contentSearchSpec":
 {
   "summarySpec":
   {
     "summaryResultCount": 3,
     "ignoreNonSummarySeekingQuery": true
   },
   "extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}
 }
```

### Get customized summaries

Provide natural-language instructions in `modelPromptSpec.preamble` (API) or enable summary customization for the search widget in the console (search type must be **Search with an answer** or **Search with follow-ups**).

Adapted (not in the official docs): added `"extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}` next to `summarySpec`, written as in the other summary examples of this page, because the summary is taken from the extractive answers (see Notes).

```text
"contentSearchSpec":
  {
    "summarySpec":
    {
      "summaryResultCount": 3,
      "modelPromptSpec":
      {
        "preamble": "explain like you would to a ten year old"
      }
    },
    "extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}
  }
```

### Specify the summarization model

Adapted (not in the official docs): added `"summaryResultCount": 3` to `summarySpec` and `"extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}` to `contentSearchSpec`, the values of the source's own summary example, because the source's summary procedure says a summary request "specifies values for `summaryResultCount` and `maxExtractiveAnswerCount`"; the model version and every other field are unchanged. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
"https://discoveryengine.googleapis.com/v1/projects/exampleproject/locations/global/collections/default_collection/dataStores/exampledatastore/servingConfigs/default_search:search" \
-d '{
  "query": "what is bigquery",
  "contentSearchSpec": {
    "summarySpec": {
      "summaryResultCount": 3,
      "modelSpec": {
        "version": "preview"
      }
    },
    "extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}
  }
}' )
```

## Options / Props

### summarySpec fields

| Field | Description |
|-------|-------------|
| `summaryResultCount` | Number of top results to generate the summary from. If fewer results are returned, all are used. Maximum `10` when using semantic chunks; maximum `5` in the citations, adversarial-query, non-summary-seeking and customization sections. |
| `maxExtractiveAnswerCount` (in `extractiveContentSpec`) | Number of extractive answers per search result. Default 0, maximum 1 (as stated on this page). |
| `useSemanticChunks` | Boolean. `true` generates the summary from semantic chunks. |
| `includeCitations` | Boolean. Whether citations are returned. With chunk mode turned on when the data store was created, citations refer to chunks; otherwise to source documents. |
| `ignoreAdversarialQuery` | Boolean. No summary for adversarial queries. |
| `ignoreNonSummarySeekingQuery` | Boolean. No summary for non-summary seeking queries. |
| `modelPromptSpec.preamble` | Customization instruction. |
| `modelSpec.version` | Model to use; see the table below. |

### Citation metadata fields

| Field | Description |
|-------|-------------|
| `summaryText` | The summary with citation numbers. |
| `citations` | For each cited sentence, the citation metadata. |
| `startIndex` / `endIndex` | Start and end of the sentence, measured in unicode bytes. |
| `sources` | The `referenceIndex` of each source in the sentence's citation. `referenceIndex` is 0-indexed, and the first source's value isn't always returned explicitly. |
| `references` | Metadata (`title`, `docName`, `uri`) of each reference cited. |

### modelSpec.version values

| Value | Description |
|-------|-------------|
| `stable` | Default when no value is specified. Points to a GA model version fine-tuned for answer generation; the target changes as new GA versions are released and old ones are discontinued. |
| `preview` | Points to the latest Gemini model for question answering. |
| A version name | For example `gemini-3.5-flash/answer_gen/v1`. |

## Notes

- By default search summaries don't include citations. The source says: "Search summaries can include Markdown-formatted text and simple HTML tags commonly understood by Markdown parsers. For this reason, consider using a Markdown parser in your application to render Markdown text."
- Rendering safely (not in the official docs): the summary is generated from the indexed documents, so its HTML is untrusted content. When you render it with a Markdown parser, disable raw HTML in the parser, or sanitize the rendered HTML with an allowlist-based HTML sanitizer, before inserting it into the DOM.
- Customization best practices: request only one customization at a time (do not combine, such as an HTML table in French) and limit what end users can request, for example with a selector of predefined customizations. Adherence to natural-language instructions can't be guaranteed.
- Some statements may lack citations (statements that need no grounding, or no valid reference found); in rare cases citations are attributed incorrectly. Complex documents may be parsed incorrectly, and complex reasoning queries can yield hallucinations.
- The `maxExtractiveAnswerCount` maximum is stated as 1 here and as 5 on the snippets page ([snippets.md](./snippets.md)); the `discoveryengine.v1` Discovery document says at most five answers are returned per result. Both statements are kept as written.
- The REST reference for `summarySkippedReasons` in `discoveryengine.v1` lists more values than the two shown here (for example `OUT_OF_DOMAIN_QUERY_IGNORED`, `POTENTIAL_POLICY_VIOLATION`, `NO_RELEVANT_CONTENT`).
- The JSON fragments are shown as `text` because they are partial request bodies. The source also shows full response examples (semantic chunks, citations), a console procedure, and a pointer to healthcare data search; these are omitted.
- Former name: Agent Search was Vertex AI Search; the API is still Discovery Engine (`discoveryengine.googleapis.com`).
- Deprecated: "Agent Search for healthcare is deprecated and won't be available after May 15, 2027." (https://docs.cloud.google.com/generative-ai-app-builder/docs/prepare-data, retrieved 2026-11-21).
- Source inconsistency (search summaries): the feature table of the advanced-features page says "Search summarization without advanced generative answer features | Enterprise edition", while its "Generative responses" section says "You must turn on the Generative responses option to obtain search responses with these features:" and lists "Search summarization", and the get-search-summaries page says "For an unstructured search app: Turn on the generative responses option." (for a website search app: Enterprise edition features, Generative responses and advanced website indexing). The `discoveryengine` `v1` Discovery document also lists the summary skipped reason `LLM_ADDON_NOT_ENABLED` ("Google skips the summary if the LLM addon is not enabled."). All statements are kept as written; check the edition and add-on before relying on summaries.
- Corrected from the official docs: the source's semantic-chunks fragment writes `"includeCitations": CITATIONS_BOOLEAN,` with a trailing comma before the closing `}` of `summarySpec`; JSON does not allow trailing commas, so the comma is removed.
- Corrected from the official docs: the source's customized-summary fragment has `summarySpec` only, while the same page says "The summary itself is taken from the extractive answers returned in the response. Therefore, to get a summary, you must also get extractive answers with your search results." and gives `maxExtractiveAnswerCount` "The default value is 0 and the maximum is 1."; the fragment adds `"extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}` as the page's other summary fragments write it. The semantic-chunks fragment is left without it, because that page section describes semantic chunks as an alternative to "the default behavior of using extractive answers".
- Corrected from the official docs: the source's model-version example sends only `"summarySpec": {"modelSpec": {"version": "preview"}}`, while the same page says "to get a summary, you must also get extractive answers with your search results" and "To get a search summary, follow these steps: 1. Submit a search request that includes `contentSearchSpec.summarySpec` and specifies values for `summaryResultCount` and `maxExtractiveAnswerCount`." Its own summary example uses `"summaryResultCount": 3` and `"extractiveContentSpec": { "maxExtractiveAnswerCount" : 1}`, so the example adds those two values. The `discoveryengine.v1` Discovery document describes `summaryResultCount` only as "The number of top results to generate the summary from." and does not say what happens when it is unset.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/get-search-summaries (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [snippets.md](./snippets.md)
- [answer-generation-models.md](./answer-generation-models.md)
- [check-grounding.md](./check-grounding.md)
- [responsible-ai.md](./responsible-ai.md)
