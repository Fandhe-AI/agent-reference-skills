# ガイドの読み方

fandhe-backend のガイド群は「どう使うか」に特化し、内部要件・設計記録とは責務を分離している。3層の対象読者を想定し、全読者にまず Getting Started から読み始めることを推奨する。

## 対象読者

1. **一次消費者**: Fandhe 内部のサービスチームがフレームワークを採用する層
2. **二次消費者**: 一次消費者が構築したサービスを利用するチーム
3. **外部ユーザー**: OSS 公開後に直接リポジトリを利用するコミュニティユーザー

## ガイド構成

| ドキュメント | 内容 |
| --- | --- |
| Getting Started | 依存追加から最小サーバ起動まで |
| Feature Samples | Cargo feature 別（websocket / graphql 等）の最小実装例 |
| Tutorial | 段階的な学習パス（拡張点実装まで） |
| Extension Points | カスタム拡張の構築ガイド |
| Response Streaming | ストリーミング機能の実装 |
| Graceful Shutdown | 適切なシャットダウン処理 |

## Notes

- サンプルコードの二重管理をしない方針。実行可能なサンプルは `crates/core/examples/` と `crates/core/src/lib.rs` の doctest を正とし、ガイドはそれらへの導線と実行手順のみを提供する（サンプル更新時のドキュメントドリフト防止）
- 追加情報源として `examples/`（Next.js 風の独立サンプル）と `templates/app/`（実運用向け雛形）がある

## Related

- [tutorial](./tutorial.md)
- [feature-samples](./feature-samples.md)
- [extension-points](./extension-points.md)
- [streaming](./streaming.md)
- [graceful-shutdown](./graceful-shutdown.md)
