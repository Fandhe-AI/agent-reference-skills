# llms.txt

Kubb は `llms.txt` と `llms-full.txt` を公開しており、URL またはテキスト貼り付けを受け付ける AI アシスタントにドキュメント全体を渡せる。

## 提供ファイル

| URL | Description |
|-----|-------------|
| `https://kubb.dev/llms.txt` | Table of contents with one-line descriptions per page |
| `https://kubb.dev/llms-full.txt` | Complete documentation in a single file |

## プロンプトでの利用

全体を網羅したい場合は full ファイルを使う。

```text
Read https://kubb.dev/llms-full.txt and answer questions about Kubb.
```

コンテキストが小さい場合は索引を使い、アシスタントに必要なページを順次取得させる。

```text
Use https://kubb.dev/llms.txt to find relevant pages, then read them.
```

## Notes

- 出典: https://kubb.dev/docs/5.x/ai/llmstxt

## Related

- [context7.md](./context7.md)
