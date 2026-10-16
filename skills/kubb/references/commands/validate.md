# kubb validate

パイプラインを実行せずに Swagger/OpenAPI ドキュメントが有効かを検証するコマンド。CI やコミット前に spec の誤りを早期検出するために使う。

## Signature / Usage

```shell
kubb validate ./petStore.yaml
```

成功時の出力は `✅ Validation success`。入力は URL も可（例: `https://petstore3.swagger.io/api/v3/openapi.json`）。

## Arguments

| Name | Required | Description |
| --- | --- | --- |
| `<input>` | `true` | 検証する Swagger/OpenAPI ドキュメントのパスまたは URL |

## Notes

- spec が無効な場合は非ゼロの終了ステータスを返す。pre-commit フックや CI ステップとしてビルドを失敗させる用途に使える。
- 出典: https://kubb.dev/docs/5.x/reference/commands/validate （kubb@5.11.0 の docs/5.x/reference/commands/validate.md）

## Related

- [generate](./generate.md)
- [mcp](./mcp.md)
