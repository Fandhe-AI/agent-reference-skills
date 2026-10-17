---
source: https://ai.google.dev/gemini-api/docs/robotics-overview
---

# Gemini Robotics ER (aggregated)

Gemini Robotics ER (embodied reasoning) models are vision-language models that let robots perceive and interact with the physical world: spatial and temporal reasoning, multi-step task planning, and orchestration of robots and tools. This page aggregates the overview and five sub-guides, one section each: overview, spatial reasoning, agentic vision, task orchestration, streaming, and video progress. Preview status: "The Gemini Robotics ER model is in preview."

## Signature / Usage

### Gemini Robotics overview

Source: https://ai.google.dev/gemini-api/docs/robotics-overview

```python
from google import genai

PROMPT = """
          Point to no more than 10 items in the image. The label returned
          should be an identifying name for the object detected.
          The answer should follow the json format: [{"point": <point>,
          "label": <label1>}, ...]. The points are in [y, x] format
          normalized to 0-1000.
        """
client = genai.Client()

uploaded_file = client.files.upload(file="my-image.png")

image_response = client.interactions.create(
    model="gemini-robotics-er-2-preview",
    input=[
        {
            "type": "image",
            "uri": uploaded_file.uri,
            "mime_type": uploaded_file.mime_type
        },
        {"type": "text", "text": PROMPT}
    ],
    generation_config={"thinking_level": "high"},
)

print(image_response.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const PROMPT = `
  Point to no more than 10 items in the image. The label returned
  should be an identifying name for the object detected.
  The answer should follow the json format: [{"point": <point>,
  "label": <label1>}, ...]. The points are in [y, x] format
  normalized to 0-1000.
`;
const client = new GoogleGenAI();

const uploadedFile = await client.files.upload({ file: "my-image.png" });

const imageResponse = await client.interactions.create({
  model: "gemini-robotics-er-2-preview",
  input: [
    {
      type: "image",
      uri: uploadedFile.uri,
      mime_type: uploadedFile.mimeType,
    },
    { type: "text", text: PROMPT },
  ],
  generation_config: { thinking_level: "high" },
});

console.log(imageResponse.output_text);
```

Models:

| Model ID | Description |
|---|---|
| `gemini-robotics-er-2-preview` | The standard ER 2 model. Builds on Gemini 3.5 Flash with improved spatial reasoning, video moment finding, video progress classification, multi-robot orchestration, and multi-step tool use. |
| `gemini-robotics-er-2-streaming-preview` | Optimized for real-time streaming using the Live API. For low-latency robot agents that process continuous audio and video input. |

Capabilities:

| Capability | Description |
|---|---|
| Spatial reasoning | Point to objects, track them in video, detect with bounding boxes, plan trajectories. |
| Agentic vision | Use code execution to enhance other capabilities by leveraging image manipulation tools. |
| Task orchestration | Combine spatial reasoning with custom robot APIs to complete long-horizon tasks. |
| Streaming (ER 2 Streaming endpoint only) | Bidirectional streaming for real-time robot agents with low-latency function calling. |
| Video progress (ER 2 only) | Moment finding and progress classification from continuous video feeds. |

- "Gemini Robotics ER 1.6 was deprecated on August 31, 2026." Upgrade by replacing `model="gemini-robotics-er-1.6-preview"` with `model="gemini-robotics-er-2-preview"` or `model="gemini-robotics-er-2-streaming-preview"`.
- Available through the Gemini Developer API with a Gemini API key. "Cloud Storage URIs (`gs://`) are not directly accessible through the Gemini Developer API. Load your images locally or use the Files API."

### Spatial reasoning

Source: https://ai.google.dev/gemini-api/docs/robotics-spatial

Point to objects, track objects in video, detect with 2D bounding boxes, and generate trajectories (sequences of points). Points are normalized `[y, x]` in 0-1000. The output of the point-to-object prompt (Python, same prompt as the overview example) is a JSON array:

```json
[
  {"point": [376, 508], "label": "small banana"},
  {"point": [287, 609], "label": "larger banana"},
  {"point": [223, 303], "label": "pink starfruit"},
  {"point": [435, 172], "label": "paper bag"},
  {"point": [270, 786], "label": "green plastic bowl"},
  {"point": [488, 775], "label": "metal measuring cup"},
  {"point": [673, 580], "label": "dark blue bowl"},
  {"point": [471, 353], "label": "light blue bowl"},
  {"point": [492, 497], "label": "bread"},
  {"point": [525, 429], "label": "lime"}
]
```

- Object tracking in video is available with Gemini Robotics ER 2. Other examples on the page (Python prompts): trajectory for moving a red pen to an organizer, "making room for a laptop" (returns a 2D coordinate of the object to move), and "packing a lunch" (step-by-step instructions with pointed objects). The page links a Robotics cookbook for full runnable code.

### Agentic vision

Source: https://ai.google.dev/gemini-api/docs/robotics-agentic

Robotics ER models can write and execute Python code (code execution) to manipulate images and apply logic before answering. Examples on the page: object detection with zoom and crop, instrument (analog gauge) reading, fluid measurement, circuit board reading, and image annotation. Adapt by replacing the prompt and image, adjusting the requested JSON schema in the prompt, or adding a `system_instruction` to enforce output format and precision.

```python
from google import genai

client = genai.Client()

uploaded_file = client.files.upload(file="sorting.jpeg")

prompt = """
Return JSON in the format {label: val, y: val, x: val, y2: val, x2: val} for
the compostable objects in this scene. Please Zoom and crop the image for a
clearer view. Return an annotated image of the final result with the bounding
boxes drawn on it to the API caller as a part of your process.
"""

interaction = client.interactions.create(
    model="gemini-robotics-er-2-preview",
    input=[
        {
            "type": "image",
            "uri": uploaded_file.uri,
            "mime_type": uploaded_file.mime_type
        },
        {"type": "text", "text": prompt}
    ],
    tools=[{"type": "code_execution"}]
)

print(interaction.output_text)
```

- Code execution is enabled with `tools=[{"type": "code_execution"}]`; the thinking level (`generation_config={"thinking_level": ...}`, see the overview example) is a separate setting.
- Spatial tasks such as object detection perform well with a low thinking level; complex tasks such as counting or weight estimation benefit from a higher thinking level.

### Task orchestration

Source: https://ai.google.dev/gemini-api/docs/robotics-orchestration

Plan tasks and reason about space to drive a pick-and-place operation through a custom robot API (standard ER 2 model; streaming is covered separately). Tools are declared as `type: "function"` definitions; the agentic loop runs `interactions.create`, executes `function_call` steps, and returns `function_result` items with `previous_interaction_id`:

```python
# client = genai.Client(); MODEL_ID, img_b64 and prompt are placeholders (see Notes):
# MODEL_ID = "gemini-robotics-er-2-preview"
# img_b64 = ...  # base64-encoded PNG of the scene
# prompt = ...   # see the source page (pick-and-place instruction)

move_function = {
    "type": "function",
    "name": "move",
    "description": "Moves the arm to the given coordinates.",
    "parameters": {
        "type": "object",
        "properties": {
            "x": {"type": "integer", "description": "X coordinate relative to the origin"},
            "y": {"type": "integer", "description": "Y coordinate relative to the origin"},
            "high": {"type": "boolean", "description": "Set to True to lift the robot arm above the scene for avoiding obstacles. Set to False to place the gripper on the surface."}
        },
        "required": ["x", "y", "high"]
    }
}

set_gripper_state_function = {
    "type": "function",
    "name": "setGripperState",
    "description": "Opens or closes the robot's gripper.",
    "parameters": {
        "type": "object",
        "properties": {
            "opened": {"type": "boolean", "description": "True opens the gripper, False closes the gripper."}
        },
        "required": ["opened"]
    }
}

# 1. Initial Interaction
interaction = client.interactions.create(
    model=MODEL_ID,
    input=[{"type": "user_input", "content": [
        {"type": "image", "data": img_b64, "mime_type": "image/png"},
        {"type": "text", "text": prompt}
    ]}],
    tools=[move_function, set_gripper_state_function],
    generation_config={"thinking_level": "low"}
)

max_steps = 15 # Safety limit to prevent infinite loops
step_count = 0

# 2. The Agentic Loop
while step_count < max_steps:
    step_count += 1

    # Check if the model wants to call any functions
    tool_calls = [step for step in interaction.steps if step.type == "function_call"]

    if not tool_calls:
        break

    function_results = []

    for step in tool_calls:
        # (execute the mock robot function named step.name with step.arguments)
        function_results.append({
            "type": "function_result",
            "name": step.name,
            "call_id": step.id,
            "result": [{"type": "text", "text": '{"status": "success"}'}]
        })

    # 4. Send the results back to the model, passing previous_interaction_id
    # so it remembers the conversation history and generates the NEXT step
    interaction = client.interactions.create(
        model=MODEL_ID,
        previous_interaction_id=interaction.id,
        tools=[move_function, set_gripper_state_function],
        input=function_results
    )
```

- The loop on the page uses `max_steps = 15` as a "Safety limit to prevent infinite loops" (initialized above together with `step_count`). `client`, `MODEL_ID`, `img_b64` and `prompt` are undefined on the source page's snippet (cookbook context); placeholders are noted in the comment above. The snippet above abbreviates the per-call branch (calling `move(**arguments)` or `setGripperState(**arguments)` by `function_name`) into a comment; the full code is on the source page.

### Streaming for robotics

Source: https://ai.google.dev/gemini-api/docs/robotics-streaming

Requires `gemini-robotics-er-2-streaming-preview` (not available on ER 1.6 or the standard `gemini-robotics-er-2-preview`). Integrates with the Live API: stateful WebSocket (WSS) connection; input is raw 16-bit PCM audio at 16kHz little-endian, JPEG images (<= 1 FPS) and text; output is text. Three steps: declare robot capabilities as tools (physical actions must use `"behavior": "BLOCKING"`), stream multimodal input into a persistent `live.connect` session, and handle `tool_call` messages in a receive loop that replies with `tool_response`.

```python
import asyncio
import os
from google import genai
from google.genai import types

MODEL = "gemini-robotics-er-2-streaming-preview"

# ── Tool definitions ─────────────────────────────────────────────────────────
tools = [
   {
       "function_declarations": [
           {
               "name": "navigate",
               "description": "Navigate the robot to a named waypoint.",
               "behavior": "BLOCKING",
               "parameters": {
                   "type": "OBJECT",
                   "properties": {"name": {"type": "STRING"}},
                   "required": ["name"],
               },
           },
           # Add more function definitions here
       ]
   }
]

# ── Stub tool executor (replace with real robot SDK calls) ───────────────────
def execute_tool(name: str, args: dict) -> dict:
   print(f"  [Tool] {name}({args})")
   return {"status": "success"}

# ── Input helpers ────────────────────────────────────────────────────────────
def send_text(session, text: str):
   """Send a text turn."""
   return session.send_client_content(
       turns=types.Content(role="user", parts=[types.Part(text=text)]),
       turn_complete=True,
   )

def send_image(session, image_bytes: bytes, prompt: str = ""):
   """Send a JPEG image with an optional text prompt."""
   parts = [
       types.Part(
           inline_data=types.Blob(data=image_bytes, mime_type="image/jpeg")
       )
   ]
   if prompt:
       parts.append(types.Part(text=prompt))
   return session.send_client_content(
       turns=types.Content(role="user", parts=parts),
       turn_complete=True,
   )

def send_audio(session, audio_chunk: bytes):
   """Stream a chunk of raw PCM audio (16-bit, 16 kHz, mono)."""
   return session.send_realtime_input(
       media=types.Blob(data=audio_chunk, mime_type="audio/pcm;rate=16000")
   )

# ── Receive loop ─────────────────────────────────────────────────────────────
async def receive_loop(session):
   """Print model text and handle tool calls until the session ends."""
   async for message in session.receive():
       if message.server_content:
           sc = message.server_content
           if sc.model_turn and sc.model_turn.parts:
               for part in sc.model_turn.parts:
                   if part.text:
                       print(f"Model: {part.text}", end="", flush=True)
           if sc.turn_complete:
               print("\n[Turn Complete]")
       elif message.tool_call:
           responses = []
           for call in message.tool_call.function_calls:
               print(f"\n[Tool Call] {call.name}({call.args})")
               result = execute_tool(call.name, call.args)
               responses.append(
                   types.FunctionResponse(
                       name=call.name,
                       response=result,
                       id=call.id,
                   )
               )
           await session.send_tool_response(function_responses=responses)

# ── Main ─────────────────────────────────────────────────────────────────────
async def main():
   client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
   config = types.LiveConnectConfig(
       response_modalities=["TEXT"],
       tools=tools,
       system_instruction=types.Content(
           parts=[types.Part(text="You are a robot controller. Use tools to execute commands.")]
       ),
   )
   async with client.aio.live.connect(model=MODEL, config=config) as session:
       recv_task = asyncio.create_task(receive_loop(session))
       try:
           # Connect robot perception callbacks and user inputs to the helpers above.
           # (Start a heartbeat task here, inside the same try, if you use one.)
           await recv_task
       finally:
           recv_task.cancel()

asyncio.run(main())
```

- Added `import os`, which the source page's streaming example omits although `main()` reads `os.environ`. `execute_tool` is a stub to replace with a real robot SDK, as on the source page.
- The source page's main() cancels recv_task immediately after create_task (a skeleton); this page awaits the receive task inside try/finally so the session stays open.
- Only blocking function calls are supported when using the Live API for robotics.
- Video frames alone do not trigger a new reasoning turn; to enable proactive reasoning implement a heartbeat that periodically sends the latest camera frame followed by a short text prompt (video input is rate-limited to one frame per second). Sending a new prompt while the model is generating acts as an interruption (barge-in) that cancels in-flight reasoning and tool calls; wait for the previous turn to complete (`er_turn_done`).
- Gemini Robotics ER 2 returns text; route completed responses to a separate TTS provider (such as Gemini TTS) via a callback, or declare TTS as a tool.
- Use cases: multi-robot coordination, continuous monitoring, warehouse and logistics. Examples on GitHub: google-gemini/robotics-samples (live-api).

### Video progress

Source: https://ai.google.dev/gemini-api/docs/robotics-video-progress

Requires Gemini Robotics ER 2 (`gemini-robotics-er-2-preview`); not available on ER 1.6. Two capabilities: moment finding (timestamp of a key event) and progress classification (five completion brackets: 0-20%, 20-40%, 40-60%, 60-80%, 80-100%).

```python
from google import genai

client = genai.Client()

uploaded_file = client.files.upload(file="task_video.mp4")

prompt = """
At what timestamp (in seconds) does the task reach successful completion?
Return a JSON object: {"completion_time_seconds": <float>}.
If the task is not completed, return {"completion_time_seconds": null}.
"""

interaction = client.interactions.create(
    model="gemini-robotics-er-2-preview",
    input=[
        {
            "type": "video",
            "uri": uploaded_file.uri,
            "mime_type": uploaded_file.mime_type
        },
        {"type": "text", "text": prompt}
    ],
)

print(interaction.output_text)
```

Progress classification uses the same call with this prompt:

```text
Watch this video and classify the task progress level at the final frame.
Return a JSON object with the progress bracket:
{"progress_level": "0-20" | "20-40" | "40-60" | "60-80" | "80-100"}.
```

## Notes

- Preview models: API behavior and model IDs may change; model IDs are transcribed verbatim from the docs fetched 2026-10-16.
- Page also has Java, Go and REST variants for the overview example; the REST example on the page uses a `parts` / `inlineData` body shape; not reproduced here.
- This skill treats Robotics ER as multimodal input and function-calling use of the Interactions API (`client.interactions.create`); the streaming endpoint uses the Live API (v1beta only, see the live-realtime category).
- Distinct from the Gemini Live API voice sessions and Realtime audio products of other vendors (openai-realtime-audio skill); not a robot SDK.
- Full runnable code for all sub-guides is in the Robotics cookbook (google-gemini/robotics-samples on GitHub); the generate-content mirror (`generate-content/robotics-overview` and siblings) is covered in the generate-content category.
- API availability: Interactions API (standard ER 2); Live API (streaming ER 2). Docs fetched 2026-10-16.

## Related

- [files-api](./files-api.md)
- [video-understanding](./video-understanding.md)
- [image-understanding](./image-understanding.md)
- [Gemini Robotics ER (generateContent tree)](../generate-content/robotics.md)
