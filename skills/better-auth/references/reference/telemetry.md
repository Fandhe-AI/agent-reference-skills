# Telemetry

Better Auth が収集するオプションの匿名使用状況データ。バージョン 1.3.5 から利用可能。**デフォルトで無効**。

## 収集されるデータ

- 匿名プロジェクト識別子（非可逆ハッシュ）
- ランタイム環境（Node, Bun, Deno とバージョン）
- デプロイコンテキスト（development, production, test, CI）
- フレームワークと DB の検出（Next.js, PostgreSQL, Prisma 等のバージョン情報）
- システム仕様（プラットフォーム, アーキテクチャ, CPU, メモリ, Docker/WSL）
- パッケージマネージャー情報
- `betterAuth` オプションのリダクト済み設定（機密値はブール値や汎用識別子に変換）

CLI 操作（generate, migrate）は結果と関連アダプター情報も収集する。

## 収集されないデータ

メールアドレス・ユーザー名・トークン・シークレット・クライアント ID・クライアントシークレット・DB URL。

## 有効化・無効化

```typescript
// 有効化
export const auth = betterAuth({
    telemetry: { enabled: true }
})

// デバッグモード（収集内容を確認）
export const auth = betterAuth({
    telemetry: { debug: true }
})
```

環境変数で無効化:

```
BETTER_AUTH_TELEMETRY=0
```

テスト中は明示的に上書きしない限り自動で無効化される。

## Related

- [instrumentation.md](./instrumentation.md)
- [options.md](./options.md)
