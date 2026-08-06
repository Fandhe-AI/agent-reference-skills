# Realtime speech-to-text transcription

Stream microphone audio to the Realtime API over WebSocket and receive incremental transcript deltas as speech arrives.

```javascript
// Configure a transcription-only session (no model spoken responses)
ws.send(JSON.stringify({
  type: "session.update",
  session: {
    type: "transcription",
    audio: {
      input: {
        format: { type: "audio/pcm", rate: 24000 },
        transcription: { model: "gpt-live-transcribe" },
        turn_detection: null,
      },
    },
  },
}));

// Stream base64-encoded PCM16 audio chunks
ws.send(JSON.stringify({
  type: "input_audio_buffer.append",
  audio: base64Pcm16,
}));

// Manually commit a turn when turn_detection is disabled
ws.send(JSON.stringify({
  type: "input_audio_buffer.commit",
}));

// Receive incremental and final transcripts
ws.on("message", (data) => {
  const event = JSON.parse(data);

  if (event.type === "conversation.item.input_audio_transcription.delta") {
    process.stdout.write(event.delta);
  }

  if (event.type === "conversation.item.input_audio_transcription.completed") {
    console.log("\nFinal transcript:", event.transcript);
  }
});
```

## Notes

- OpenAI Realtime API の例。低遅延のライブ文字起こし向け。事前録音ファイルの一括変換は `file-transcription.md` を使う
- `ws` は `websocket-server-connection.md` で確立した接続を想定
- `turn_detection: null` にすると自動区切りが無効になり、`input_audio_buffer.commit` を明示送信する必要がある
- `item_id` を使うと複数ターンにまたがるイベントを正しく突き合わせられる
