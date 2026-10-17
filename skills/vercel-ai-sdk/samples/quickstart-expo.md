---
source: https://ai-sdk.dev/docs/getting-started/expo
---

# Quickstart: Expo

Expo API route streaming with `streamText` and a React Native chat screen using `useChat` with `DefaultChatTransport` and `expo/fetch`.

```bash
pnpm create expo-app@latest my-ai-app
cd my-ai-app
npm i ai @ai-sdk/react zod
```

```tsx
// app/api/chat+api.ts
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'none',
    },
  });
}
```

```ts
// utils.ts
import Constants from 'expo-constants';

export const generateAPIUrl = (relativePath: string) => {
  const origin = Constants.experienceUrl.replace('exp://', 'http://');

  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  if (process.env.NODE_ENV === 'development') {
    return origin.concat(path);
  }

  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_BASE_URL environment variable is not defined',
    );
  }

  return process.env.EXPO_PUBLIC_API_BASE_URL.concat(path);
};
```

```tsx
// app/(tabs)/index.tsx
import { generateAPIUrl } from '@/utils';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { useState } from 'react';
import { View, TextInput, ScrollView, Text, SafeAreaView } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const { messages, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: error => console.error(error, 'ERROR'),
  });

  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View
        style={{
          height: '95%',
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 8,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {messages.map(m => (
            <View key={m.id} style={{ marginVertical: 8 }}>
              <View>
                <Text style={{ fontWeight: 700 }}>{m.role}</Text>
                {m.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return <Text key={`${m.id}-${i}`}>{part.text}</Text>;
                  }
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{ backgroundColor: 'white', padding: 8 }}
            placeholder="Say something..."
            value={input}
            onChange={e => setInput(e.nativeEvent.text)}
            onSubmitEditing={e => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput('');
            }}
            autoFocus={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
```

## Notes

- Requires Expo 52 or higher; `expo/fetch` (not native fetch) enables streaming of chat responses.
- Set `EXPO_PUBLIC_API_BASE_URL` in production so `generateAPIUrl` can resolve the API server base URL.
- If a deployed Expo API route buffers the response despite the streaming headers, the official page suggests hosting the chat endpoint in a separate Vercel Function and pointing `EXPO_PUBLIC_API_BASE_URL` at it.
