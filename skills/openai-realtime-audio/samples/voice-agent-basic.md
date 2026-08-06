# Basic voice agent configuration

Configure a speech-to-speech Realtime session with instructions, an output voice, and a callable function tool, then handle the resulting function call over the data channel / WebSocket.

```javascript
// 1. Configure the session: audio-only output, voice, and behavior instructions
dataChannel.send(JSON.stringify({
  type: "session.update",
  session: {
    model: "gpt-realtime-2.1",
    output_modalities: ["audio"],
    audio: {
      input: { format: { type: "audio/pcm", rate: 24000 } },
      output: { voice: "marin" },
    },
    instructions: "Speak clearly and briefly.",
    tools: [{
      type: "function",
      name: "generate_horoscope",
      description: "Give today's horoscope for an astrological sign.",
      parameters: {
        type: "object",
        properties: {
          sign: { type: "string", enum: ["Aries", "Taurus", "Gemini"] },
        },
        required: ["sign"],
      },
    }],
    tool_choice: "auto",
  },
}));

// 2. When the model decides to call the tool, `response.done` includes the
//    function name/arguments. Run your own logic, then return the result:
dataChannel.send(JSON.stringify({
  type: "conversation.item.create",
  item: {
    type: "function_call_output",
    call_id: "call_sHlR7iaFwQ2YQOqm",
    output: JSON.stringify({ horoscope: "You will soon meet a new friend." }),
  },
}));
```

## Notes

- OpenAI Realtime API の例。`dataChannel` は `webrtc-browser-session.md` の `dc`、もしくは `websocket-server-connection.md` の `ws` に読み替えてよい
- クライアントイベント（`session.update`, `conversation.item.create` 等）でセッションを操作し、サーバーイベント（`response.done` 等）で状態変化を受け取る非同期プロトコル
- Agents SDK（`RealtimeAgent` / `RealtimeSession`）を使ったオーケストレーションは openai-agents スキルの範囲。ここでは生の Realtime API イベントのみを扱う
- function call の結果を返した後、通常は `response.create` を送って続きの応答を生成させる
