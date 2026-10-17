---
source: https://ai.google.dev/gemini-api/docs/generate-content/robotics-overview, https://ai.google.dev/gemini-api/docs/generate-content/robotics-spatial, https://ai.google.dev/gemini-api/docs/generate-content/robotics-agentic, https://ai.google.dev/gemini-api/docs/generate-content/robotics-orchestration, https://ai.google.dev/gemini-api/docs/generate-content/robotics-video-progress
---

# Gemini Robotics ER (generateContent)

Gemini Robotics ER (embodied reasoning) models are vision-language models that let robots perceive and interact with the physical world: spatial and temporal reasoning, multi-step planning, and orchestration of robots and tools. Preview. Aggregated sections, one per source under https://ai.google.dev/gemini-api/docs/generate-content/: `robotics-overview` (primary), `robotics-spatial`, `robotics-agentic`, `robotics-orchestration`, `robotics-video-progress`.

## Signature / Usage

### Overview and pointing (robotics-overview)

```python
from google import genai
from google.genai import types

PROMPT = """
          Point to no more than 10 items in the image. The label returned
          should be an identifying name for the object detected.
          The answer should follow the json format: [{"point": <point>,
          "label": <label1>}, ...]. The points are in [y, x] format
          normalized to 0-1000.
        """
client = genai.Client()

uploaded_file = client.files.upload(file="my-image.png")

response = client.models.generate_content(
    model="gemini-robotics-er-2-preview",
    contents=[
        types.Part.from_uri(
            file_uri=uploaded_file.uri,
            mime_type=uploaded_file.mime_type
        ),
        PROMPT
    ],
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_level="high")
    ),
)

print(response.text)
```

```json
[
  {"point": [376, 508], "label": "small banana"},
  {"point": [287, 609], "label": "larger banana"},
  {"point": [223, 303], "label": "pink starfruit"}
]
```

| Model endpoint | Description |
| --- | --- |
| `gemini-robotics-er-2-preview` | Standard ER 2 model; builds on Gemini 3.5 Flash with improved spatial reasoning, video moment finding, video progress classification, multi-robot orchestration, multi-step tool use |
| `gemini-robotics-er-2-streaming-preview` | Optimized for real-time streaming via the Live API; low-latency robot agents with continuous audio and video input |

Notes:

- API surface: generateContent (REST `v1beta/models/gemini-robotics-er-2-preview:generateContent`); the streaming endpoint uses the Live API.
- Upgrade from ER 1.6 by replacing `model="gemini-robotics-er-1.6-preview"` with `gemini-robotics-er-2-preview` or `gemini-robotics-er-2-streaming-preview`; the source states Gemini Robotics ER 1.6 will be shut down at the end of August (see the deprecations page referenced by the source).
- Capabilities: spatial reasoning (points, tracking in video, bounding boxes, trajectories), agentic vision (code execution for image manipulation), task orchestration with custom robot APIs, streaming (ER 2 Streaming endpoint only), video progress (ER 2 only).
- Coordinates are normalized to 0-1000 in `[y, x]` format. Best practices: plain natural language, crop or zoom small objects, break complex tasks into steps, query multiple times and average for high-precision tasks.
- Limitations: unrestricted API keys return `403 Forbidden` (add key restrictions in AI Studio); use `medium` thinking for a latency/performance balance; hallucinations possible. Safety: you are responsible for a safe environment around the robot. A Privacy Notice in the source requires notice and consent for identifiable persons whose voice, imagery, or likeness may be collected.

### Spatial reasoning (robotics-spatial)

```python
prompt = """
          Detect all objects in this image and return bounding boxes.
          The answer should follow the JSON format:
          [{"label": <label>, "y": <y_min>, "x": <x_min>,
            "y2": <y_max>, "x2": <x_max>}, ...]
          where coordinates are normalized to 0-1000.
        """

image_response = client.models.generate_content(
  model="gemini-robotics-er-2-preview",
  contents=[
    types.Part.from_bytes(
      data=image_bytes,
      mime_type='image/png',
    ),
    prompt
  ],
  config = types.GenerateContentConfig(
      thinking_config=types.ThinkingConfig(thinking_level="low")
  )
)
```

Trajectory prompt:

```python
prompt = """
          Generate a trajectory for the robotic arm to pick up the red pen
          and place it in the organizer. Return a list of waypoints as JSON:
          [{"step": <int>, "point": [y, x], "action": <description>}, ...]
          where coordinates are normalized to 0-1000.
        """
```

Notes:

- Sections: point to objects, tracking objects in a video (ER 2, prompt "Point to the red ball in every frame where it appears."), object detection and bounding boxes, trajectories, and worked examples (making room for a laptop, packing a lunch).

### Agentic vision (robotics-agentic)

Code execution lets ER models manipulate images and apply logic before answering.

```python
response = client.models.generate_content(
    model="gemini-robotics-er-2-preview",
    contents=[
        types.Part.from_bytes(
            data=image_bytes,
            mime_type='image/jpeg',
        ),
        prompt
    ],
    config = types.GenerateContentConfig(
        tools=[types.Tool(code_execution=types.ToolCodeExecution)],
    )
)
```

Notes:

- Examples: object detection with zoom and crop (prompt asks to "Zoom and crop the image for a clearer view" and return an annotated image), reading an analog gauge, measuring fluid in a container, reading circuit board markings, image annotation. Spatial tasks such as detection perform well at a low thinking level; counting or weight estimation benefit from `high`.

### Task orchestration (robotics-orchestration)

Mock pick-and-place through a custom robot API using function calling in a loop.

```python
move_declaration = types.FunctionDeclaration(
    name="move",
    description="Moves the arm to the given coordinates.",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "x": types.Schema(type=types.Type.INTEGER, description="X coordinate relative to the origin"),
            "y": types.Schema(type=types.Type.INTEGER, description="Y coordinate relative to the origin"),
            "high": types.Schema(type=types.Type.BOOLEAN, description="Set to True to lift the robot arm above the scene. Set to False to place the gripper on the surface."),
        },
        required=["x", "y", "high"],
    ),
)

robot_tools = types.Tool(function_declarations=[move_declaration, set_gripper_state_declaration])

max_steps = 15  # Safety limit to prevent infinite loops
step_count = 0

# The Agentic Loop
while step_count < max_steps:
    step_count += 1

    response = client.models.generate_content(
        model="gemini-robotics-er-2-preview",
        contents=contents,
        config=types.GenerateContentConfig(
            tools=[robot_tools],
            thinking_config=types.ThinkingConfig(thinking_level="low"),
        ),
    )

    # Add model response to conversation history
    contents.append(response.candidates[0].content)

    # Check for function calls
    function_calls = [part for part in response.candidates[0].content.parts if part.function_call]

    if not function_calls:
        # Model is done calling functions
        print("Sequence complete.")
        print(f"Model Summary: {response.text}")
        break

    # Execute function calls and collect results
    function_response_parts = []
    for part in function_calls:
        fc = part.function_call
        if fc.name == "move":
            move(**fc.args)
        elif fc.name == "setGripperState":
            setGripperState(**fc.args)

        function_response_parts.append(
            types.Part.from_function_response(
                name=fc.name,
                response={"status": "success"},
            )
        )

    # Send function results back to model
    contents.append(types.Content(role="user", parts=function_response_parts))
```

Notes:

- The loop executes returned function calls (`move`, `setGripperState`), appends `Part.from_function_response(...)` results, and repeats until no function call or the step limit. The mock robot API and output are illustrative.

### Video progress (robotics-video-progress)

ER 2 only (`gemini-robotics-er-2-preview`; not available on ER 1.6). Moment finding returns the timestamp of a key event; progress classification assigns a video to one of five completion brackets (0-20%, 20-40%, 40-60%, 60-80%, 80-100%).

```python
prompt = """
At what timestamp (in seconds) does the task reach successful completion?
Return a JSON object: {"completion_time_seconds": <float>}.
If the task is not completed, return {"completion_time_seconds": null}.
"""

response = client.models.generate_content(
    model="gemini-robotics-er-2-preview",
    contents=[
        types.Part.from_bytes(data=video_bytes, mime_type="video/mp4"),
        prompt,
    ],
)

print(response.text)
```

```json
{"progress_level": "0-20" | "20-40" | "40-60" | "60-80" | "80-100"}
```

## Notes

- Sources: <https://ai.google.dev/gemini-api/docs/generate-content/robotics-overview> (Overview and pointing), <https://ai.google.dev/gemini-api/docs/generate-content/robotics-spatial> (Spatial reasoning), <https://ai.google.dev/gemini-api/docs/generate-content/robotics-agentic> (Agentic vision), <https://ai.google.dev/gemini-api/docs/generate-content/robotics-orchestration> (Task orchestration), <https://ai.google.dev/gemini-api/docs/generate-content/robotics-video-progress> (Video progress).
- Preview source warning: "The Gemini Robotics ER model is currently in preview."
- Official Python samples pass the class `types.ToolCodeExecution` (not an instance); the google-genai SDK coerces it to `ToolCodeExecution()` (verified with google-genai 2.31.0).
- Full runnable code is referenced to the Robotics cookbook (google-gemini/robotics-samples) in the source. Robotics streaming (`robotics-streaming`) is covered in the live-realtime and Interactions-side robotics pages, not here.

## Related

- [Function calling (generateContent)](./function-calling.md)
- [Thinking (generateContent)](./thinking.md)
- [Multimodal understanding (generateContent)](./multimodal-understanding.md)
- Gemini Robotics ER (Interactions API tree)
