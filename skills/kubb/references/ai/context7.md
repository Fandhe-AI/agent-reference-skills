# Context7

Kubb のドキュメントは [Context7](https://context7.com) にライブラリ ID `/kubb-labs/kubb` で索引化されており、AI アシスタントが最新の Kubb ドキュメントを参照できる。

## セットアップ

対話式セットアップを実行し、使う AI アシスタントを選択する。

```shell
npx ctx7 setup
```

選択したオプションに応じて、Context7 を MCP で接続するか、ドキュメント用スキルをインストールする。

## Kubb ドキュメントの利用

プロンプトに `use context7` を含める。ライブラリの探索を省略したい場合は Kubb のライブラリ ID も添える。

```text
Create a kubb.config.ts that generates TypeScript types, a Fetch client, and React Query hooks
from ./petStore.yaml. Use Context7 library /kubb-labs/kubb.
```

## Notes

- アシスタントの指示にルールを書けば、Kubb に関する質問すべてで Context7 を使わせられる
- 出典: https://kubb.dev/docs/5.x/ai/context7

## Related

- [llmstxt.md](./llmstxt.md)
- [mcp.md](./mcp.md)
