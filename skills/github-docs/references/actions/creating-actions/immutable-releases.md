# GitHub Actions -- immutable releases によるアクションのリリース管理

immutable releases と Git タグを組み合わせて、アクションのリリースを管理する方法のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/how-tos/create-and-publish-actions/using-immutable-releases-and-tags-to-manage-your-actions-releases
出典（概念）: https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases

---

## 概要

アクションのリポジトリで immutable releases を有効にすると、次の流れでリリースを管理できる。

1. リリースブランチ上で、リリース候補を開発・検証する。
2. 変更の共有方法を決める。
   - 変更不可のバージョンを公開する場合: リリース固有のタグ（例: `v1.0.0`）で GitHub 上に release を作成する。
   - 後からリリースの Git タグを更新したい場合: GitHub 上に release は作成せず、タグのみ作成する。
     - 既存ワークフローに破壊的変更を含む場合: メジャーバージョンタグ（例: `v1`）
     - 後方互換の新機能を含む場合: マイナーバージョンタグ（例: `v1.1`）
     - 後方互換のバグ修正を含む場合: パッチバージョンタグ（例: `v1.1.1`）
3. GitHub の release に紐付かない Git タグは、利用者が最新の互換バージョンを使えるよう更新する。
   - メジャーバージョン: 関連する最新のマイナーまたはパッチバージョンの Git ref を指すよう更新する。
   - マイナーバージョン: 関連する最新のパッチバージョンの Git ref を指すよう更新する。

---

## タグの移動

可動タグ（`v1` / `v1.1`）は、公式手順ではタグを最新コミットへ付け替える（force push）運用になる。リモートタグの強制更新を伴うため、本リファレンスにはコマンドを転記しない。実行時は公式ページの手順を参照する。immutable release に紐付くタグは公開後に変更できない。

```text
v1     -> v1.1.1 と同じコミット（可動、release なし）
v1.1   -> v1.1.1 と同じコミット（可動、release なし）
v1.1.1 -> 最新パッチ（release なし）
v1.0.0 -> 固定（immutable release 付き）
```

---

## immutable releases が保護するもの

immutable releases は、公開後に assets と関連 Git タグを変更できない release。

- Git タグは移動不可: 公開後、タグは特定コミットに固定され、release が存在する間は削除もできない。immutable release を削除すればタグは削除できるが、同じタグ名は再利用できない。
- release assets は変更・削除不可: release に添付された全ファイル（バイナリ、アーカイブ等）が保護される。
- タイトルとリリースノートは公開後も編集可能。pre-release / latest release の指定も変更可能。
- immutable release の作成時に release attestation（release タグ・コミット SHA・assets を含む暗号学的に検証可能な記録）が自動生成される。
- リポジトリを削除して同名で作り直しても、元リポジトリの immutable release に紐付いていたタグは再利用できない（repository resurrection attack への保護）。

---

## 推奨の公開手順

immutable release は次の手順で公開することが推奨される。

1. release を draft として作成する。
2. 関連する全 assets を draft release に添付する。
3. draft release を公開する。

公開前にすべての assets を揃えることで、immutability の制約を回避する作業が不要になる。

---

## Notes

- 上記の 2 つの方針（release 付きの固定タグ / release 無しの可動タグ）は排他的な選択。可動のメジャー・マイナータグを運用したい場合は release を作成しない。
- 原本のタグ移動手順は全タグの強制 push（`git tag` の強制付け替えと `--tags` 付きの強制送信）であり、危険コマンドの転記禁止に従い本ページには載せていない。
- immutable releases の有効化方法はリポジトリ / organization 設定の別ドキュメント（Preventing changes to your releases）、整合性検証は Verifying the integrity of a release に記載されている。原本ではこれらの手順の詳細は確認していない。

## Related

- [action-metadata.md](./action-metadata.md)
- [javascript-actions.md](./javascript-actions.md)
- [docker-actions.md](./docker-actions.md)
