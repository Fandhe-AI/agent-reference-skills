# unable_to_create_user

認証中にユーザーの作成に失敗した際のエラー。OAuth または SSO ベースのサインアップフローで主に発生する。

## 主な原因

1. **DB の問題**: 接続エラー・タイムアウト・トランザクション失敗
2. **スキーマの問題**: 必須ユーザーフィールドの不足または型の不一致
3. **制約違反**: 重複メールアドレスやユニークキーの競合
4. **スキーマの不整合**: DB 構造と Better Auth の期待値のズレ
5. **フックのエラー**: `databaseHooks.user.create` でのカスタムフックの例外
6. **アダプターの設定ミス**: DB クライアントまたはアダプターの設定不正

## 対処方法

1. **DB 接続の確認**: DB がアクセス可能か、接続プールを確認し、タイムアウトを確認する
2. **スキーマの検証**: 必須ユーザーフィールドが正しいデータ型で存在し、ユニーク制約の競合がないことを確認する
3. **マイグレーションの実行**: `npx auth migrate` で DB スキーマを最新の Better Auth バージョンに合わせる
4. **カスタムフックの確認**: `databaseHooks.user.create` の実装がエラーや無効な値を返していないか確認する
5. **ログの確認**: ユーザー作成中の具体的なエラーをサーバーログで確認する

## Related

- [error-unable-to-create-session.md](./error-unable-to-create-session.md)
- [error-internal-server-error.md](./error-internal-server-error.md)
