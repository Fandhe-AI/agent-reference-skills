# Edge Functions 実装例一覧

主要なユースケースごとの Edge Functions 実装例の概要とコードサンプル。

## 概要

Supabase Edge Functions の代表的な実装パターンを 19 例まとめる。Webhook 処理、メール送信、プッシュ通知、画像生成、ボット、セキュリティ、AI 連携など多岐にわたるユースケースをカバーする。

---

## stripe-webhooks: Stripe Webhook 処理

Stripe からの Webhook イベントを受信・検証して処理する。

```typescript
import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

Deno.serve(async (req: Request) => {
  const signature = req.headers.get('Stripe-Signature')!
  const body = await req.text()

  const event = await stripe.webhooks.constructEventAsync(
    body,
    signature,
    Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
    undefined,
    cryptoProvider,
  )

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Payment completed:', session.id)
      // 注文処理
      break
    case 'invoice.payment_failed':
      console.log('Payment failed')
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

**設定**: `verify_jwt = false`（Stripe からのリクエストに JWT はないため）

---

## send-emails: メール送信（Resend / SendGrid）

Resend API を使ったメール送信。

```typescript
Deno.serve(async (req: Request) => {
  const { to, subject, html } = await req.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
    },
    body: JSON.stringify({
      from: 'Your App <noreply@yourdomain.com>',
      to,
      subject,
      html,
    }),
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

---

## push-notifications: プッシュ通知（FCM）

Firebase Cloud Messaging を使ったプッシュ通知の送信。

```typescript
import { JWT } from 'npm:google-auth-library@9'

Deno.serve(async (req: Request) => {
  const { token, title, body } = await req.json()

  const serviceAccount = JSON.parse(Deno.env.get('FIREBASE_SERVICE_ACCOUNT')!)

  const jwt = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  })

  const accessToken = await jwt.authorize()

  const res = await fetch(
    `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.access_token}`,
      },
      body: JSON.stringify({
        message: {
          token,
          notification: { title, body },
        },
      }),
    },
  )

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

---

## og-image: OG 画像生成

動的な OG 画像を生成して返す。

```typescript
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.6/mod.ts'

Deno.serve(async (req: Request) => {
  const url = new URL(req.url)
  const title = url.searchParams.get('title') || 'Default Title'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a2e',
          color: 'white',
          fontSize: 60,
          fontWeight: 'bold',
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 },
  )
})
```

**設定**: `verify_jwt = false`（og:image タグから直接アクセスされるため）

---

## discord-bot: Discord ボット

Discord のインタラクションを処理するボット。

```typescript
import { verifyKey } from 'npm:discord-interactions@3'

Deno.serve(async (req: Request) => {
  const publicKey = Deno.env.get('DISCORD_PUBLIC_KEY')!
  const signature = req.headers.get('X-Signature-Ed25519')!
  const timestamp = req.headers.get('X-Signature-Timestamp')!
  const body = await req.text()

  const isValid = await verifyKey(body, signature, timestamp, publicKey)
  if (!isValid) {
    return new Response('Invalid signature', { status: 401 })
  }

  const interaction = JSON.parse(body)

  if (interaction.type === 1) {
    // PING
    return new Response(JSON.stringify({ type: 1 }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (interaction.type === 2) {
    // APPLICATION_COMMAND
    return new Response(
      JSON.stringify({
        type: 4,
        data: { content: `Hello from Supabase Edge Functions!` },
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response('Unknown interaction', { status: 400 })
})
```

---

## telegram-bot: Telegram ボット

Telegram Bot API の Webhook を処理する。

```typescript
const TELEGRAM_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!

Deno.serve(async (req: Request) => {
  const update = await req.json()

  if (update.message?.text) {
    const chatId = update.message.chat.id
    const text = update.message.text

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `You said: ${text}`,
      }),
    })
  }

  return new Response('ok')
})
```

---

## slack-bot-mention: Slack ボット

Slack のイベントを受信して応答する。

```typescript
Deno.serve(async (req: Request) => {
  const body = await req.json()

  // URL 検証チャレンジ
  if (body.type === 'url_verification') {
    return new Response(JSON.stringify({ challenge: body.challenge }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // メンションイベント
  if (body.event?.type === 'app_mention') {
    const slackToken = Deno.env.get('SLACK_BOT_TOKEN')!

    await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${slackToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: body.event.channel,
        text: `Hello! You mentioned me: "${body.event.text}"`,
      }),
    })
  }

  return new Response('ok')
})
```

---

## screenshots: Puppeteer スクリーンショット

Puppeteer を使って Web ページのスクリーンショットを撮影する。

```typescript
import puppeteer from 'https://deno.land/x/puppeteer@16.2.0/mod.ts'

Deno.serve(async (req: Request) => {
  const { url } = await req.json()

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto(url, { waitUntil: 'networkidle2' })

  const screenshot = await page.screenshot({ encoding: 'binary' })

  await browser.close()

  return new Response(screenshot, {
    headers: { 'Content-Type': 'image/png' },
  })
})
```

---

## image-manipulation: 画像処理

画像のリサイズや変換を行う。

```typescript
import { ImageMagick, MagickGeometry, initializeImageMagick } from 'npm:@imagemagick/magick-wasm@0.0.30'

await initializeImageMagick()

Deno.serve(async (req: Request) => {
  const formData = await req.formData()
  const file = formData.get('image') as File
  const width = parseInt(formData.get('width') as string) || 300

  const buffer = new Uint8Array(await file.arrayBuffer())

  let result: Uint8Array

  ImageMagick.read(buffer, (image) => {
    const geometry = new MagickGeometry(width)
    geometry.height = 0 // アスペクト比を維持
    image.resize(geometry)
    image.write((data) => {
      result = data
    })
  })

  return new Response(result!, {
    headers: { 'Content-Type': 'image/png' },
  })
})
```

---

## cloudflare-turnstile: CAPTCHA 検証

Cloudflare Turnstile トークンのサーバーサイド検証。

```typescript
Deno.serve(async (req: Request) => {
  const { token } = await req.json()

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: Deno.env.get('TURNSTILE_SECRET_KEY'),
      response: token,
    }),
  })

  const data = await res.json()

  return new Response(
    JSON.stringify({ success: data.success }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

---

## rate-limiting: Upstash Redis レート制限

Upstash Redis を使ったレート制限の実装。

```typescript
import { Ratelimit } from 'npm:@upstash/ratelimit@1'
import { Redis } from 'npm:@upstash/redis@1'

const redis = new Redis({
  url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
  token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'), // 60秒間に10リクエスト
  analytics: true,
})

Deno.serve(async (req: Request) => {
  const identifier = req.headers.get('x-forwarded-for') || 'anonymous'

  const { success, limit, remaining, reset } = await ratelimit.limit(identifier)

  const headers = {
    'Content-Type': 'application/json',
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  }

  if (!success) {
    return new Response(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429, headers },
    )
  }

  return new Response(
    JSON.stringify({ message: 'Request accepted' }),
    { headers },
  )
})
```

---

## semantic-search: pgvector セマンティック検索

OpenAI Embeddings と pgvector を使ったセマンティック検索。

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from 'npm:openai@4'

const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') })

Deno.serve(async (req: Request) => {
  const { query } = await req.json()

  // クエリをベクトル化
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query,
  })
  const queryEmbedding = embeddingResponse.data[0].embedding

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // pgvector で類似検索
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.78,
    match_count: 10,
  })

  return new Response(JSON.stringify({ results: data }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

---

## sentry-monitoring: Sentry 連携

Sentry でエラーモニタリングを行う。

```typescript
import * as Sentry from 'npm:@sentry/deno'

Sentry.init({
  dsn: Deno.env.get('SENTRY_DSN'),
  tracesSampleRate: 1.0,
})

Deno.serve(async (req: Request) => {
  try {
    const { action } = await req.json()

    if (action === 'error') {
      throw new Error('Test error for Sentry')
    }

    return new Response(JSON.stringify({ status: 'ok' }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    Sentry.captureException(error)
    await Sentry.flush(2000)

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
```

---

## github-actions: CI/CD

GitHub Actions での自動デプロイ（deploy.md 参照）。Edge Functions のテストとデプロイを CI/CD パイプラインに組み込む。

```yaml
name: Test and Deploy Edge Functions
on:
  push:
    branches: [main]
    paths: ['supabase/functions/**']

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v1
      - run: deno test supabase/functions/tests/
      - uses: supabase/setup-cli@v1
      - run: supabase functions deploy --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

---

## amazon-bedrock: AWS Bedrock 画像生成

Amazon Bedrock を使った画像生成。

```typescript
import { BedrockRuntimeClient, InvokeModelCommand } from 'npm:@aws-sdk/client-bedrock-runtime'

const client = new BedrockRuntimeClient({
  region: Deno.env.get('AWS_REGION') || 'us-east-1',
  credentials: {
    accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID')!,
    secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY')!,
  },
})

Deno.serve(async (req: Request) => {
  const { prompt } = await req.json()

  const command = new InvokeModelCommand({
    modelId: 'stability.stable-diffusion-xl-v1',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      text_prompts: [{ text: prompt }],
      cfg_scale: 10,
      steps: 50,
    }),
  })

  const response = await client.send(command)
  const responseBody = JSON.parse(new TextDecoder().decode(response.body))

  return new Response(
    JSON.stringify({ image: responseBody.artifacts[0].base64 }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

---

## elevenlabs: 音声合成

ElevenLabs API を使ったテキスト音声合成。

```typescript
Deno.serve(async (req: Request) => {
  const { text, voice_id } = await req.json()

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voice_id || '21m00Tcm4TlvDq8ikWAM'}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': Deno.env.get('ELEVENLABS_API_KEY')!,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    },
  )

  const audioBuffer = await res.arrayBuffer()

  return new Response(audioBuffer, {
    headers: { 'Content-Type': 'audio/mpeg' },
  })
})
```

---

## mcp-server: MCP サーバー

Model Context Protocol（MCP）サーバーを Edge Function として実装する。

```typescript
Deno.serve(async (req: Request) => {
  const body = await req.json()

  // MCP プロトコルのリクエストを処理
  if (body.method === 'initialize') {
    return new Response(
      JSON.stringify({
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'supabase-mcp-server',
          version: '1.0.0',
        },
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  if (body.method === 'tools/list') {
    return new Response(
      JSON.stringify({
        tools: [
          {
            name: 'query_database',
            description: 'Query the Supabase database',
            inputSchema: {
              type: 'object',
              properties: {
                table: { type: 'string' },
                limit: { type: 'number' },
              },
              required: ['table'],
            },
          },
        ],
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  if (body.method === 'tools/call') {
    const { name, arguments: args } = body.params
    // ツール呼び出しの処理
    return new Response(
      JSON.stringify({
        content: [{ type: 'text', text: `Executed ${name}` }],
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(
    JSON.stringify({ error: 'Unknown method' }),
    { status: 400, headers: { 'Content-Type': 'application/json' } },
  )
})
```

## 注意点

- Webhook 受信用の関数は `verify_jwt = false` に設定すること（外部サービスからの直接呼び出しに JWT がないため）
- 外部 API のキーはすべて `supabase secrets set` で設定し、コードにハードコードしないこと
- Stripe Webhook では必ず署名検証を行うこと
- プッシュ通知の送信には Firebase のサービスアカウントキーが必要
- 画像処理系は CPU/メモリを多く消費するため、メモリ制限の引き上げを検討すること
- レート制限は外部ストレージ（Redis 等）を使うことで、Edge Functions のステートレス性に対応する
- MCP サーバーは実験的な機能であり、仕様が変更される可能性がある

## 関連

- [概要](./overview.md)
- [デプロイ](./deploy.md)
- [シークレット管理](./secrets.md)
- [認証・CORS](./auth.md)
