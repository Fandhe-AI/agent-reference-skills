# state_invalid

Cookie ベースの state ストレージ使用時に、OAuth state Cookie の復号・解析に失敗した際のエラー。

## 発生条件

`account.storeStateStrategy: "cookie"` 設定時、OAuth フローの開始からコールバックフェーズの間に state Cookie の復号・解析が失敗した場合に発生する。

## 主な原因

- OAuth フロー開始からコールバックまでの間に `BETTER_AUTH_SECRET` をローテーションした
- プロキシや CDN による Cookie の破損・切り詰め
- Cookie 値が手動で変更または競合している

## 対処方法

**1. シークレットローテーションのタイミング調整**

低トラフィック時間帯にシークレットをローテーションするか、新旧両方のシークレットを移行期間中並行して保持する。

**2. プロキシ・CDN の検証**

プロキシや CDN が Cookie 値を変更・切り詰め・エンコードしていないか確認する。

**3. Cookie の検証**

ブラウザの DevTools で `better-auth.oauth_state` Cookie がリダイレクトからコールバックまで変化していないことを確認する。

**4. ストレージ戦略の変更**

Cookie 復号に依存しない database 戦略への移行を検討する:

```typescript
export const auth = betterAuth({
    account: {
        storeStateStrategy: "database"
    }
})
```

## Related

- [error-state-mismatch.md](./error-state-mismatch.md)
- [error-state-not-found.md](./error-state-not-found.md)
