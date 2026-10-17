---
source: https://ai.google.dev/gemini-api/docs/generate-content/google-search, https://ai.google.dev/gemini-api/docs/generate-content/maps-grounding, https://ai.google.dev/gemini-api/docs/generate-content/url-context, https://ai.google.dev/gemini-api/docs/generate-content/code-execution, https://ai.google.dev/gemini-api/docs/generate-content/computer-use, https://ai.google.dev/gemini-api/docs/generate-content/file-search
---

# Built-in tools (generateContent)

Built-in tools for `generateContent`, aggregated one section per source: Google Search grounding (primary), Google Maps grounding, URL context, code execution, computer use, and File Search. Sources: `generate-content/google-search`, `maps-grounding`, `url-context`, `code-execution`, `computer-use`, `file-search` (all under https://ai.google.dev/gemini-api/docs/generate-content/).

## Signature / Usage

### Grounding with Google Search

Connects Gemini to real-time web content and cites sources.

```python
from google import genai
from google.genai import types

client = genai.Client()

grounding_tool = types.Tool(
    google_search=types.GoogleSearch()
)

config = types.GenerateContentConfig(
    tools=[grounding_tool]
)

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Who won the euro 2024?",
    config=config,
)

print(response.text)
```

```javascript
const groundingTool = {
  googleSearch: {},
};

const config = {
  tools: [groundingTool],
};
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {"text": "Who won the euro 2024?"}
        ]
      }
    ],
    "tools": [
      {
        "google_search": {}
      }
    ]
  }'
```

Grounding response (`groundingMetadata`):

```json
"groundingMetadata": {
  "webSearchQueries": [
    "UEFA Euro 2024 winner",
    "who won euro 2024"
  ],
  "searchEntryPoint": {
    "renderedContent": "<!-- HTML and CSS for the search widget -->"
  },
  "groundingChunks": [
    {"web": {"uri": "https://vertexaisearch.cloud.google.com.....", "title": "aljazeera.com"}},
    {"web": {"uri": "https://vertexaisearch.cloud.google.com.....", "title": "uefa.com"}}
  ],
  "groundingSupports": [
    {
      "segment": {"startIndex": 0, "endIndex": 85, "text": "Spain won Euro 2024, defeatin..."},
      "groundingChunkIndices": [0]
    }
  ]
}
```

Inline citations pattern:

```python
def add_citations(response):
    text = response.text
    supports = response.candidates[0].grounding_metadata.grounding_supports
    chunks = response.candidates[0].grounding_metadata.grounding_chunks

    # Sort supports by end_index in descending order to avoid shifting issues when inserting.
    sorted_supports = sorted(supports, key=lambda s: s.segment.end_index, reverse=True)

    for support in sorted_supports:
        end_index = support.segment.end_index
        if support.grounding_chunk_indices:
            # Create citation string like [1](link1)[2](link2)
            citation_links = []
            for i in support.grounding_chunk_indices:
                if i < len(chunks):
                    uri = chunks[i].web.uri
                    citation_links.append(f"[{i + 1}]({uri})")

            citation_string = ", ".join(citation_links)
            text = text[:end_index] + citation_string + text[end_index:]

    return text
```

Notes:

- `searchEntryPoint` holds the HTML and CSS for the required Search Suggestions (see the Terms of Service); `groundingSupports` links a text `segment` (`startIndex`, `endIndex`) to `groundingChunkIndices`.
- Pricing: for Gemini 3 and newer models, billed for each search query the model executes; 5,000 free search requests per month shared across all Gemini 3 and newer models, then $14 per 1,000 search requests; empty web search queries are ignored. Gemini 2.5 or older models are billed per prompt.
- Supported models: Gemini 3.8 Flash, 3.6 Flash, 3.5 Flash-Lite, 3.1 Flash-Lite, 3.1 Flash Image Preview, 3.1 Pro Preview, 3 Pro Image Preview, 3 Flash Preview, 3.1 Flash-Lite Preview, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, 2.0 Flash. Older models use a `google_search_retrieval` tool; for current models use `google_search`.
- Can be combined with code execution, URL context, and Grounding with Google Maps (supported on Gemini 3.5 Flash-Lite and later); Gemini 3 models also combine built-in tools with function calling.

### Grounding with Google Maps

```python
response = client.models.generate_content(
    model='gemini-3.8-flash',
    contents=prompt,
    config=types.GenerateContentConfig(
        # Turn on grounding with Google Maps
        tools=[types.Tool(google_maps=types.GoogleMaps())],
        # Optionally provide the relevant location context (this is in Los Angeles)
        tool_config=types.ToolConfig(retrieval_config=types.RetrievalConfig(
            lat_lng=types.LatLng(
                latitude=34.050481, longitude=-118.248526))),
    ),
)
```

```json
{
  "contents": [{
    "parts": [
      {"text": "Restaurants near here."}
    ]
  }],
  "tools": [{"googleMaps": {}}],
  "toolConfig":  {
    "retrievalConfig": {
      "latLng": {
        "latitude": 40.758896,
        "longitude": -73.985130
      }
    }
  }
}
```

Notes:

- `groundingChunks[].maps` carries `uri`, `placeId`, `title`; `groundingSupports` as above. The tool is off by default and must be explicitly enabled; it supports no multimodal inputs or outputs beyond text; text search behaves like Maps (local queries use the coordinates).
- Pricing: Gemini 3 and newer billed per executed search query (5,000 free requests per month shared across all Gemini 3 and newer models, then $14 per 1,000 search queries); Gemini 2.5 and older billed per search prompt ($25 per 1,000 grounded prompts), only when at least one Maps grounded result is returned.
- Restrictions: no high-risk activities such as emergency response services; no distribution in Google Maps Platform Prohibited Territories.
- Supported models: Gemini 4 Argon, 3.8 Flash, 3.6 Flash, 3.5 Flash-Lite, 3.1 Pro Preview, 3.1 Flash-Lite, 3 Flash Preview, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite.

### URL context

```python
from google import genai
from google.genai.types import Tool, GenerateContentConfig

client = genai.Client()
model_id = "gemini-3.8-flash"

tools = [
  {"url_context": {}},
]

response = client.models.generate_content(
    model=model_id,
    contents=f"Compare the ingredients and cooking times from the recipes at {url1} and {url2}",
    config=GenerateContentConfig(
        tools=tools,
    )
)

# For verification, you can inspect the metadata to see which URLs the model retrieved
print(response.candidates[0].url_context_metadata)
```

```json
"url_context_metadata": {
  "url_metadata": [
    {
      "retrieved_url": "https://www.foodnetwork.com/recipes/ina-garten/perfect-roast-chicken-recipe-1940592",
      "url_retrieval_status": "URL_RETRIEVAL_STATUS_SUCCESS"
    }
  ]
}
```

Notes:

- Two-step retrieval: internal index cache first, then live fetch when the URL is not indexed. Content retrieved counts as input tokens (`tool_use_prompt_token_count` in `usage_metadata`). Failing safety check yields `URL_RETRIEVAL_STATUS_UNSAFE`.
- Limits: up to 20 URLs per request; 34MB maximum per URL; public URLs only (no localhost, private networks, or tunneling services such as ngrok). Supported content: text (text/html, application/json, text/plain, text/xml, text/css, text/javascript, text/csv, text/rtf), image (image/png, image/jpeg, image/bmp, image/webp), PDF. Not supported: paywalled content, YouTube videos, Google Workspace files, video and audio files. Only provided URLs are fetched, not nested links.
- Supported models: Gemini 3.8 Flash, 3.6 Flash, 3.5 Flash-Lite, 3.1 Pro Preview, 3.1 Flash-Lite, 3 Flash Preview, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite.

### Code execution

```python
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="What is the sum of the first 50 prime numbers? "
    "Generate and run code for the calculation, and make sure you get all 50.",
    config=types.GenerateContentConfig(
        tools=[types.Tool(code_execution=types.ToolCodeExecution)]
    ),
)

for part in response.candidates[0].content.parts:
    if part.text is not None:
        print(part.text)
    if part.executable_code is not None:
        print(part.executable_code.code)
    if part.code_execution_result is not None:
        print(part.code_execution_result.output)
```

```javascript
config: {
  tools: [{ codeExecution: {} }],
},
```

Notes:

- Python only: "Gemini is only able to execute code in Python." Maximum runtime 30 seconds; the model may regenerate code up to 5 times on error; works best with text and CSV files; input in `part.inlineData` or `part.fileData`, output files always `part.inlineData`; only `matplotlib` for graph rendering; you cannot install your own libraries.
- Billing: no additional charge for enabling; generated code and execution results count as output tokens; the original prompt, generated code, and results are intermediate tokens billed as input tokens.
- Supported libraries: attrs, chess, contourpy, fpdf, geopandas, imageio, jinja2, joblib, jsonschema, jsonschema-specifications, lxml, matplotlib, mpmath, numpy, opencv-python, openpyxl, packaging, pandas, pillow, protobuf, pylatex, pyparsing, PyPDF2, python-dateutil, python-docx, python-pptx, reportlab, scikit-learn, scipy, seaborn, six, striprtf, sympy, tabulate, tensorflow, toolz, xlrd.
- Combine with Grounding with Google Search; for Gemini 3 combinations with custom tools you must pass back `id` and `thought_signature`.

### Computer use

```python
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Search for 'Gemini API' on Google.",
    config=types.GenerateContentConfig(
        tools=[types.Tool(
            computer_use=types.ComputerUse(
                environment=types.Environment.ENVIRONMENT_BROWSER,
            )
        )]
    )
)

print(response.text)
```

```javascript
config: {
  tools: [{
    computerUse: {
      environment: "ENVIRONMENT_BROWSER",
    }
  }]
}
```

Environments (`environment` values): `ENVIRONMENT_BROWSER`, `ENVIRONMENT_MOBILE`, `ENVIRONMENT_DESKTOP`. Browser actions (arguments include `intent`): click, double_click, triple_click, middle_click, right_click, mouse_down, mouse_up, move (all `x`, `y` int 0-999), type (`text`, optional `press_enter`), drag_and_drop (`start_x`, `start_y`, `end_x`, `end_y`), wait (`seconds`), press_key / key_down / key_up (`key`), hotkey (`keys`), take_screenshot, scroll (`x`, `y`, `direction`, `magnitude_in_pixels`), go_back, navigate (`url`), go_forward. Mobile adds open_app (`app_name`), list_apps, long_press (`seconds`).

Custom function exclusion:

```python
types.Tool(
    computer_use=types.ComputerUse(
        environment="ENVIRONMENT_MOBILE",
        excluded_predefined_functions=["click"]
    )
),
```

Notes:

- Loop: send request with screenshot, receive `function_call` (with `intent` for Gemini 3.x and optional `safety_decision`: allowed, `require_confirmation`, or blocked), execute it client-side (scale normalized coordinates; e.g. Playwright), then send a new screenshot in a `function_result`. Run in a sandboxed VM or container.
- The page says it needs the `google-genai` Python SDK version `2.7.0` or higher for the `ComputerUse` configuration shown; `enable_prompt_injection_detection=True` opts in to screenshot scanning; safety policy categories include `FINANCIAL_TRANSACTIONS`.
- Source warning: "As a Preview capability, Computer Use may contain errors and security vulnerabilities."
- Models: Gemini 3.8 Flash (`gemini-3.8-flash`, recommended), Gemini 3.5 Flash-Lite (`gemini-3.5-flash-lite`), Gemini 3 Flash Preview (`gemini-3-flash-preview`). Computer Use is a client-side tool with built-in context circulation.

### File Search

```python
from google import genai
from google.genai import types
import time

client = genai.Client()

# File name will be visible in citations
file_search_store = client.file_search_stores.create(
    config={
        'display_name': 'your-fileSearchStore-name',
        'embedding_model': 'models/gemini-embedding-2'
    }
)

operation = client.file_search_stores.upload_to_file_search_store(
  file='sample.txt',
  file_search_store_name=file_search_store.name,
  config={
      'display_name' : 'display-file-name',
  }
)

while not operation.done:
    time.sleep(5)
    operation = client.operations.get(operation)

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="""Can you tell me about [insert question]""",
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                file_search=types.FileSearch(
                    file_search_store_names=[file_search_store.name]
                )
            )
        ]
    )
)

print(response.text)
```

Notes:

- File Search imports, chunks, and indexes data for retrieval-augmented generation (RAG); multimodal via `gemini-embedding-001` (text) and `gemini-embedding-2` (image/multimodal). Audio and video formats are not currently supported.
- Embeddings have no TTL and persist until deleted or the model is deprecated; the temporary `File` object is deleted after 48 hours. Storage and query-time embeddings are free; indexing embeddings and retrieved tokens are charged.
- Limits: 100 MB per document; store size by tier: Free 1 GB, Tier 1 10 GB, Tier 2 100 GB, Tier 3 1 TB; keep each store under 20 GB; backend size is about 3 times the input size.
- Limitations per the source: not supported in the Live API; "File Search cannot be combined with other tools like Grounding with Google Search, URL Context, etc. at this time", while a separate source section says Gemini 3 models support combining built-in tools (like File Search) with function calling.
- Supported models: Gemini 3.8 Flash, 3.6 Flash, 3.5 Flash-Lite, 3.1 Pro Preview, 3.1 Flash-Lite, 3 Flash Preview, 2.5 Pro, 2.5 Flash-Lite.

## Notes

- Sources: <https://ai.google.dev/gemini-api/docs/generate-content/google-search> (Google Search), <https://ai.google.dev/gemini-api/docs/generate-content/maps-grounding> (Google Maps), <https://ai.google.dev/gemini-api/docs/generate-content/url-context> (URL context), <https://ai.google.dev/gemini-api/docs/generate-content/code-execution> (Code execution), <https://ai.google.dev/gemini-api/docs/generate-content/computer-use> (Computer use), <https://ai.google.dev/gemini-api/docs/generate-content/file-search> (File Search).
- The official Maps REST sample writes `tools` as an object; it is corrected here to an array (`"tools": [{"googleMaps": {}}]`).
- Official Python samples pass the class `types.ToolCodeExecution` (not an instance); the google-genai SDK coerces it to `ToolCodeExecution()` (verified with google-genai 2.31.0).
- API surface: generateContent (REST `tools` array). Each built-in tool here is a `generateContent` tool; combination with custom functions is covered in the tool-combination page.
- Distinct from Anthropic server tools and tool use (anthropic-api-tools-mcp skill) and OpenAI built-in tools / Agents SDK (openai-agents skill). File Search store and embeddings are Gemini-hosted RAG; for external vector databases see upstash (Vector) and fandhe-db.

## Related

- [Combine built-in tools and function calling (generateContent)](./tool-combination.md)
- [Function calling (generateContent)](./function-calling.md)
- [Files API and file input methods (generateContent)](./files.md)
- [Google Search grounding (tools-grounding)](../tools-grounding/google-search.md)
- [Maps grounding (tools-grounding)](../tools-grounding/maps-grounding.md)
- [URL context (tools-grounding)](../tools-grounding/url-context.md)
- [Code execution (tools-grounding)](../tools-grounding/code-execution.md)
- [Computer use (tools-grounding)](../tools-grounding/computer-use.md)
- [File Search (tools-grounding)](../tools-grounding/file-search.md)
