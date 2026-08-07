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

// 2. When the model decides to call the tool, `response.done` carries the
//    function call item (name/arguments/call_id) in `response.output`.
dataChannel.addEventListener("message", (event) => {
  const serverEvent = JSON.parse(event.data);
  if (serverEvent.type !== "response.done") return;

  const functionCall = serverEvent.response.output.find(
    (item) => item.type === "function_call" && item.name === "generate_horoscope"
  );
  if (!functionCall) return;

  const { sign } = JSON.parse(functionCall.arguments);

  // 3. Run your own logic, then echo the real `call_id` back with the result.
  dataChannel.send(JSON.stringify({
    type: "conversation.item.create",
    item: {
      type: "function_call_output",
      call_id: functionCall.call_id,
      output: JSON.stringify({ horoscope: `${sign}: You will soon meet a new friend.` }),
    },
  }));

  // 4. Trigger the model to continue the conversation with the tool result.
  dataChannel.send(JSON.stringify({ type: "response.create" }));
});
```

## Notes

- OpenAI Realtime API の例。`dataChannel` は `webrtc-browser-session.md` の `dc`、もしくは `websocket-server-connection.md` の `ws` に読み替えてよい
- クライアントイベント（`session.update`, `conversation.item.create` 等）でセッションを操作し、サーバーイベント（`response.done` 等）で状態変化を受け取る非同期プロトコル
- `call_id` はサーバーが生成する ID なので、`response.done` の `response.output` から該当する `function_call` item を parse して取り出す。ハードコードした値をそのまま送ると実際の `call_id` と一致せずフローが止まる
- Agents SDK（`RealtimeAgent` / `RealtimeSession`）を使ったオーケストレーションは openai-agents スキルの範囲。ここでは生の Realtime API イベントのみを扱う
- function call の結果を返した後、`response.create` を送って続きの応答を生成させる
