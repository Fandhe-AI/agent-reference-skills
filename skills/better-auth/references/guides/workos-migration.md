# Migrating from WorkOS

WorkOS から Better Auth へ移行するためのガイド（Next.js アプリ向け）。

## 主な移行手順

1. **Better Auth の初期化**: DB・メール認証・ソーシャルプロバイダーを設定する
2. **ユーザースキーマの拡張**: WorkOS メタデータと ID を保持するためのカスタムフィールドを追加する:
   ```typescript
   additionalFields: {
       metadata: { type: "json", required: false, defaultValue: null }
   }
   ```
3. **DB スキーマの生成**: `npx auth migrate` で必要なテーブルを作成する
4. **移行スクリプトの実行**: WorkOS のレートリミット（10 秒あたり 1,000 リクエスト）を遵守しながらユーザーをインポートする
5. **アプリケーションコードの更新**: API ルートとページで WorkOS クライアント/ミドルウェアパターンを Better Auth 相当に置き換える
6. **レガシー依存関係の削除**: 移行確認後に WorkOS パッケージをアンインストールする

## 考慮事項

- WorkOS からパスワードハッシュをエクスポートできないため、ユーザーは移行後にパスワードリセットが必要
- 有効なセッションは移行されない（ユーザーは再認証が必要）
- ユーザー中断を最小限にするため移行のタイミングを慎重に計画する

## Related

- [auth0-migration.md](./auth0-migration.md)
- [clerk-migration.md](./clerk-migration.md)
