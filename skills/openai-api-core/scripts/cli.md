# cli

Official `openai` CLI (terminal client for the OpenAI API — not to be confused with the Codex CLI, which is covered by the `openai-codex` skill).

## CLI のインストール（Homebrew）

```bash
brew install openai/tools/openai
```

## CLI のインストール（Go）

```bash
go install 'github.com/openai/openai-cli/cmd/openai@latest'
```

古い Python SDK に含まれるレガシー `openai` コマンドと名前が衝突する場合があるため注意する。

## 認証設定

```bash
export OPENAI_API_KEY="sk-..."
```

Admin API を叩く場合は `OPENAI_ADMIN_KEY` を、エンドポイントをリダイレクトする場合は `OPENAI_BASE_URL` を設定する（詳細は `auth.md` を参照）。

## テキスト生成（responses create）

```bash
openai responses create --model gpt-5.6 --input "Say hello in one sentence."
```

## 画像入力を伴う responses create（YAML 入力 + JSON パス変換）

```bash
openai responses create \
  --model gpt-5.6 \
  --raw-output \
  --transform 'output.#(type=="message").content.0.text' <<'YAML'
input:
  - role: user
    content:
      - type: input_text
        text: What is in this image?
      - type: input_image
        image_url: https://openai-documentation.vercel.app/images/cat_and_otter.png
YAML
```

## 画像生成 + base64 デコードして保存

```bash
openai images generate --model gpt-image-2 --prompt "[description]" \
  --format yaml --transform 'data.0.b64_json' | base64 --decode > output.png
```

## 音声の文字起こし

```bash
openai audio:transcriptions create --model gpt-4o-transcribe --file ./speech.mp3
```

## 出力形式・変換オプション

`--format` は `json` / `yaml` / `jsonl` / `raw` を指定できる。`--transform` は GJSON パス構文でレスポンスの一部を抽出する。
