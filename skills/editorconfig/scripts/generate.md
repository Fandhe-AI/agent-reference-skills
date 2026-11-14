# Generate

設定ファイルの生成。

## Signature / Usage

### editorconfig-checker 初期設定ファイルの生成

```sh
editorconfig-checker -init
```

プロジェクトルートに `.editorconfig-checker.json` を生成する。

## Notes

- Based on the editorconfig-checker v4.0.2 README, fetched 2026-11-14. `-init` creates a configuration; if a `-config` path is given it is created there.
- Source: https://github.com/editorconfig-checker/editorconfig-checker/blob/v4.0.2/README.md (fetched 2026-11-14)

## Related

- [validate](./validate.md) — Validating with editorconfig-checker
