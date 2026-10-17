---
source: https://ai.google.dev/gemini-api/docs/function-calling
---

# Function Calling Loop

Declare a function, let the model request a call, execute it, and send a `function_result` back chained by `previous_interaction_id`.

```python
import json

from google import genai

# Step 1: define a function declaration
set_light_values_declaration = {
    "type": "function",
    "name": "set_light_values",
    "description": "Sets the brightness and color temperature of a light.",
    "parameters": {
        "type": "object",
        "properties": {
            "brightness": {
                "type": "integer",
                "description": "Light level from 0 to 100",
            },
            "color_temp": {
                "type": "string",
                "enum": ["daylight", "cool", "warm"],
                "description": "Color temperature",
            },
        },
        "required": ["brightness", "color_temp"],
    },
}

def set_light_values(brightness: int, color_temp: str) -> dict:
    """Set the brightness and color temperature of a room light."""
    return {"brightness": brightness, "colorTemperature": color_temp}

# Step 2: call the model with function declarations
client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Turn the lights down to a romantic level",
    tools=[set_light_values_declaration],
)

fc_step = next((s for s in interaction.steps if s.type == "function_call"), None)

if fc_step is None:
    print(interaction.output_text)
else:
    print(fc_step)

    # Step 3: execute the function
    if fc_step.name == "set_light_values":
        result = set_light_values(**fc_step.arguments)
        print(f"Function execution result: {result}")

    # Step 4: send result back to model
    final_interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=[
            {
                "type": "function_result",
                "name": fc_step.name,
                "call_id": fc_step.id,
                "result": [{"type": "text", "text": json.dumps(result)}],
            }
        ],
        tools=[set_light_values_declaration],
        previous_interaction_id=interaction.id,
    )

    print(final_interaction.output_text)
```

```javascript
import { GoogleGenAI } from '@google/genai';

const setLightValuesTool = {
  type: 'function',
  name: 'set_light_values',
  description: 'Sets the brightness and color temperature of a light.',
  parameters: {
    type: 'object',
    properties: {
      brightness: { type: 'number', description: 'Light level from 0 to 100' },
      color_temp: { type: 'string', enum: ['daylight', 'cool', 'warm'] },
    },
    required: ['brightness', 'color_temp'],
  },
};

function setLightValues(brightness, color_temp) {
  return { brightness: brightness, colorTemperature: color_temp };
}

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: 'gemini-3.8-flash',
  input: 'Turn the lights down to a romantic level',
  tools: [setLightValuesTool],
});

const fcStep = interaction.steps.find(s => s.type === 'function_call');

if (!fcStep) {
  console.log(interaction.output_text);
} else {
  console.log(fcStep);

  let result;
  if (fcStep.name === 'set_light_values') {
    result = setLightValues(fcStep.arguments.brightness, fcStep.arguments.color_temp);
    console.log(`Function execution result: ${JSON.stringify(result)}`);
  }

  const finalInteraction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: [{
      type: 'function_result',
      name: fcStep.name,
      call_id: fcStep.id,
      result: [{ type: 'text', text: JSON.stringify(result) }]
    }],
    tools: [setLightValuesTool],
    previous_interaction_id: interaction.id,
  });

  console.log(finalInteraction.output_text);
}
```

## Notes

- The model does not execute the function; the application extracts `name` and `arguments` from the `function_call` step and runs it.
- Official snippets are stitched together from the guide's Step 1-4 sections; the original Python Step 4 uses `json.dumps` without importing `json`, so the sample adds `import json`.
- The sample adds a guard for responses without a `function_call` step; the original assumes one is always present.
- The guide also covers parallel, compositional, and stateless function calling.
- Different tool-call shape from OpenAI Responses (openai-api-core) and Anthropic tool use (anthropic-api-tools-mcp).
