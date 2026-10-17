---
source: https://ai.google.dev/gemini-api/docs/structured-output
---

# Structured outputs

Configure `response_format` so Gemini returns JSON that adheres to a JSON Schema. The SDKs also accept Pydantic (Python) and Zod (JavaScript) schemas.

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

prompt = """
Please extract the recipe from the following text.
The user wants to make delicious chocolate chip cookies.
They need 2 and 1/4 cups of all-purpose flour, 1 teaspoon of baking soda,
1 teaspoon of salt, 1 cup of unsalted butter (softened), 3/4 cup of granulated sugar,
3/4 cup of packed brown sugar, 1 teaspoon of vanilla extract, and 2 large eggs.
For the best part, they'll need 2 cups of semisweet chocolate chips.
First, preheat the oven to 375°F (190°C). Then, in a small bowl, whisk together the flour,
baking soda, and salt. In a large bowl, cream together the butter, granulated sugar, and brown sugar
until light and fluffy. Beat in the vanilla and eggs, one at a time. Gradually beat in the dry
ingredients until just combined. Finally, stir in the chocolate chips. Drop by rounded tablespoons
onto ungreased baking sheets and bake for 9 to 11 minutes.
"""

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=prompt,
    response_format={
        "type": "text",
        "mime_type": "application/json",
        "schema": Recipe.model_json_schema()
    },
)

recipe = Recipe.model_validate_json(interaction.output_text)
print(recipe)
```

```javascript
// Note: Ensure zod is installed (npm install zod)
import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const recipeJsonSchema = {
  type: "object",
  properties: {
    recipe_name: {
      type: "string",
      description: "The name of the recipe."
    },
    prep_time_minutes: {
        type: "integer",
        description: "Optional time in minutes to prepare the recipe."
    },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the ingredient."},
          quantity: { type: "string", description: "Quantity of the ingredient, including units."}
        },
        required: ["name", "quantity"]
      }
    },
    instructions: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["recipe_name", "ingredients", "instructions"]
};

const recipeSchema = z.fromJSONSchema(recipeJsonSchema);

const client = new GoogleGenAI({});

const prompt = `
Please extract the recipe from the following text.
The user wants to make delicious chocolate chip cookies.
They need 2 and 1/4 cups of all-purpose flour, 1 teaspoon of baking soda,
1 teaspoon of salt, 1 cup of unsalted butter (softened), 3/4 cup of granulated sugar,
3/4 cup of packed brown sugar, 1 teaspoon of vanilla extract, and 2 large eggs.
For the best part, they'll need 2 cups of semisweet chocolate chips.
First, preheat the oven to 375°F (190°C). Then, in a small bowl, whisk together the flour,
baking soda, and salt. In a large bowl, cream together the butter, granulated sugar, and brown sugar
until light and fluffy. Beat in the vanilla and eggs, one at a time. Gradually beat in the dry
ingredients until just combined. Finally, stir in the chocolate chips. Drop by rounded tablespoons
onto ungreased baking sheets and bake for 9 to 11 minutes.
`;

const interaction = await client.interactions.create({
  model: "gemini-3.8-flash",
  input: prompt,
  response_format: {
    type: 'text',
    mime_type: 'application/json',
    schema: recipeJsonSchema
  },
});

const recipe = recipeSchema.parse(JSON.parse(interaction.output_text));
console.log(recipe);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "Generate an organization chart for a small team.\nThe manager is Alice, who manages Bob and Charlie. Bob manages David.",
      "response_format": {
        "type": "text",
        "mime_type": "application/json",
        "schema": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "employee_id": { "type": "integer" },
            "reports": {
              "type": "array",
              "description": "A list of employees reporting to this employee.",
              "items": {
                "$ref": "#"
              }
            }
          },
          "required": ["name", "employee_id", "reports"]
        }
      }
    }'
```

Structured outputs with built-in tools (Gemini 3 series, Preview):

```python
from google import genai
from pydantic import BaseModel, Field
from typing import List

class MatchResult(BaseModel):
    winner: str = Field(description="The name of the winner.")
    final_match_score: str = Field(description="The final match score.")
    scorers: List[str] = Field(description="The name of the scorer.")

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.1-pro-preview",
    input="Search for all details for the latest Euro.",
    tools=[{"type": "google_search"}, {"type": "url_context"}],
    response_format={
        "type": "text",
        "mime_type": "application/json",
        "schema": MatchResult.model_json_schema()
    },
)
```

## Options / Props

Supported JSON Schema subset:

| Name | Type | Description |
|------|------|-------------|
| type | string | `string`, `number`, `integer`, `boolean`, `object`, `array`, `null` (allow null via type array, e.g. `{"type": ["string", "null"]}`) |
| title / description | string | Guide the model; short and long description of a property |
| properties / required / additionalProperties | object | For `object`: property schemas, mandatory names, whether unlisted properties are allowed (boolean or schema) |
| enum / format | string | For `string`: fixed set of values; syntax such as `date-time`, `date`, `time` |
| enum / minimum / maximum | number | For `number` and `integer`: allowed values, inclusive bounds |
| items / prefixItems / minItems / maxItems | array | Item schema, tuple-like leading schemas, item count bounds |

`response_format` entry fields used here:

| Name | Type | Description |
|------|------|-------------|
| type | string | `text` |
| mime_type | string | `application/json` |
| schema | object | JSON Schema for the response |

## Notes

- Availability: Interactions API.
- Configure `response_format` with an object (or an array containing an object) of type `text` and `mime_type` `application/json`; the schema goes in `schema`.
- Streamed chunks of a structured output are valid partial JSON strings that concatenate into the final JSON object (use `stream: true`).
- Structured Outputs format the final response; Function Calling takes action during the conversation (the model asks you to perform a task before its final answer).
- Combining structured outputs with built-in tools (Grounding with Google Search, URL Context, Code Execution, File Search, Function Calling) is a Preview feature available only to Gemini 3 series models.
- Validate values in your application: output is syntactically correct JSON but may be semantically incorrect.
- Limitations: only a subset of JSON Schema is supported; very large or deeply nested schemas may be rejected.
- Migration (May 2026 breaking changes): `response_mime_type` is removed; `response_format` is now a polymorphic object (or array) with a `type` discriminator (`text`, `audio`, `image`). Wrap the schema as `{"type": "text", "mime_type": "application/json", "schema": ...}`.
- Distinct from OpenAI structured outputs in the Responses API (`openai-api-core`) and Anthropic structured outputs (`anthropic-api-core`). Zod and Pydantic are only schema authoring helpers here; see the `zod` skill for the Zod library itself.

## Related

- [Text generation](./text-generation.md)
- [Streaming interactions](./streaming.md)
