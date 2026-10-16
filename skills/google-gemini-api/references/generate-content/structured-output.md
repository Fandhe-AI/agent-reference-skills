---
source: https://ai.google.dev/gemini-api/docs/generate-content/structured-output
---

# Structured outputs (generateContent)

Configure Gemini models to generate responses that adhere to a provided JSON Schema. The SDKs define schemas with Pydantic (Python) and Zod (JavaScript); REST takes JSON Schema.

## Signature / Usage

```python
from google import genai
from pydantic import BaseModel, Field
from typing import List, Optional

class Ingredient(BaseModel):
    name: str = Field(description="Name of the ingredient.")
    quantity: str = Field(description="Quantity of the ingredient, including units.")

class Recipe(BaseModel):
    recipe_name: str = Field(description="The name of the recipe.")
    prep_time_minutes: Optional[int] = Field(description="Optional time in minutes to prepare the recipe.")
    ingredients: List[Ingredient]
    instructions: List[str]

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=prompt,
    config={
        "response_format": {"text": {"mime_type": "application/json", "schema": Recipe.model_json_schema()}},
    },
)

recipe = Recipe.model_validate_json(response.text)
print(recipe)
```

```javascript
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const response = await ai.models.generateContent({
  model: "gemini-3.8-flash",
  contents: prompt,
  config: {
    responseFormat: { text: { mimeType: "application/json", schema: zodToJsonSchema(recipeSchema) } },
  },
});

const recipe = recipeSchema.parse(JSON.parse(response.text));
console.log(recipe);
```

REST (`generationConfig.responseFormat.text`):

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-4-argon:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [{
      "parts": [{"text": "Search for all details for the latest Euro."}]
    }],
    "tools": [
      {"googleSearch": {}},
      {"urlContext": {}}
    ],
    "generationConfig": {
        "responseFormat": {
          "text": {
            "mimeType": "application/json",
            "schema": {
            "type": "object",
            "properties": {
                "winner": {"type": "string", "description": "The name of the winner."},
                "final_match_score": {"type": "string", "description": "The final score."},
                "scorers": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "The name of the scorer."
                }
          }
        }
      },
            "required": ["winner", "final_match_score", "scorers"]
        }
    }
  }'
```

Streaming (chunks are valid partial JSON strings to concatenate):

```python
response_stream = client.models.generate_content_stream(
    model="gemini-3.8-flash",
    contents=prompt,
    config={
        "response_format": {"text": {"mime_type": "application/json", "schema": Feedback.model_json_schema()}},
    },
)

for chunk in response_stream:
    print(chunk.candidates[0].content.parts[0].text)
```

## Options / Props

Supported `type` values: `string`, `number`, `integer`, `boolean`, `object`, `array`, and `"null"` in a type array (e.g. `{"type": ["string", "null"]}`). Descriptive: `title`, `description`.

| Type | Properties |
| --- | --- |
| object | `properties`, `required`, `additionalProperties` (boolean or schema) |
| string | `enum`, `format` (`date-time`, `date`, `time`) |
| number / integer | `enum`, `minimum`, `maximum` |
| array | `items`, `prefixItems`, `minItems`, `maxItems` |

Model support (per source table, all marked supported): Gemini 4 Argon, 3.8 Flash, 3.6 Flash, 3.5 Flash-Lite, 3.1 Flash-Lite, 3.1 Pro Preview, 3.1 Flash-Lite Preview, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, 2.0 Flash*, 2.0 Flash-Lite*. (*Gemini 2.0 requires an explicit `propertyOrdering` list within the JSON input.)

## Notes

- API surface: generateContent. The `response_format` / `responseFormat` / `generationConfig.responseFormat.text` field with `mime_type` and `schema` is the shape used on this page.
- The model produces outputs in the same order as the keys in the schema; only a subset of JSON Schema is supported and the model ignores unsupported properties. Very large or deeply nested schemas may be rejected.
- Structured outputs with tools is a Preview feature "available only to Gemini 4 and Gemini 3 series models" (Google Search, URL Context, Code Execution, File Search, Function Calling).
- Structured outputs format the final response; function calling takes action during the conversation.
- Valid JSON syntax does not guarantee semantically correct values; validate in application code.
- Distinct from OpenAI structured outputs and Responses API (openai-api-core skill) and Anthropic structured outputs / Messages API (anthropic-api-core skill). Pydantic and Zod here are only used to produce a JSON Schema for the Gemini request; the zod skill covers Zod itself.

## Related

- [Function calling (generateContent)](./function-calling.md)
- [Combine built-in tools and function calling (generateContent)](./tool-combination.md)
