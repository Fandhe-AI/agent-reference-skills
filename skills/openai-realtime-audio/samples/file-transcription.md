# File-based speech-to-text transcription

Transcribe a pre-recorded audio file with the (non-realtime) transcriptions endpoint.

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();
const transcription = await openai.audio.transcriptions.create({
  file: fs.createReadStream("audio.wav"),
  model: "gpt-transcribe",
});
console.log(transcription.text);
```

```python
from openai import OpenAI

client = OpenAI()
audio_file = open("audio.wav", "rb")
transcription = client.audio.transcriptions.create(
    model="gpt-transcribe",
    file=audio_file,
)
print(transcription.text)
```

```bash
curl --request POST \
  --url https://api.openai.com/v1/audio/transcriptions \
  --header "Authorization: Bearer $OPENAI_API_KEY" \
  --form file=@audio.mp3 \
  --form model=gpt-transcribe
```

## Notes

- OpenAI Realtime API の例ではなく、通常の HTTP `audio.transcriptions` エンドポイント。ライブ音声のストリーミング文字起こしは `realtime-transcription-stream.md` を使う
- 対応ファイルは最大 25MB、MP3 / WAV / M4A / WebM など
- `model` に `gpt-transcribe` を指定する（Realtime 用の `gpt-live-transcribe` とは別モデル）
