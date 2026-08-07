# Text-to-speech synthesis

Convert written text into spoken audio with the speech endpoint (non-realtime, one-shot synthesis).

```javascript
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();
const speechFile = path.resolve("./speech.mp3");

const mp3 = await openai.audio.speech.create({
  model: "gpt-4o-mini-tts",
  voice: "coral",
  input: "Today is a wonderful day to build something people love!",
  instructions: "Speak in a cheerful and positive tone.",
});

const buffer = Buffer.from(await mp3.arrayBuffer());
await fs.promises.writeFile(speechFile, buffer);
```

```python
from pathlib import Path
from openai import OpenAI

client = OpenAI()
speech_file_path = Path(__file__).parent / "speech.mp3"

with client.audio.speech.with_streaming_response.create(
    model="gpt-4o-mini-tts",
    voice="coral",
    input="Today is a wonderful day to build something people love!",
    instructions="Speak in a cheerful and positive tone.",
) as response:
    response.stream_to_file(speech_file_path)
```

```bash
curl https://api.openai.com/v1/audio/speech \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini-tts",
    "input": "Today is a wonderful day to build something people love!",
    "voice": "coral",
    "instructions": "Speak in a cheerful and positive tone."
  }' \
  --output speech.mp3
```

## Notes

- OpenAI Realtime API の例ではなく、通常の HTTP `audio.speech` エンドポイント。会話しながら都度音声出力する用途は `voice-agent-basic.md` の `output.voice` 設定を使う
- 組み込み音声は 13 種（alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer, verse, marin, cedar）
- 出力フォーマットは MP3 (既定) / Opus / AAC / FLAC / WAV / PCM
- `instructions` で話し方（トーン・速度など）を自然言語で指示できる
