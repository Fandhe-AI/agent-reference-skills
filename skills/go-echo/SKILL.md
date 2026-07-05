---
name: go-echo
description: >
  Echo (LabStack) — Go Web framework リファレンス。routing（Group）、echo.Context、
  Bind、Validator、HTTPError、HTTPErrorHandler、middleware（JWT, CORS, CSRF,
  BasicAuth, Gzip, Recover, Logger, RateLimiter）、Renderer、WebSocket、SSE、
  AutoTLS 実装例。
user-invocable: false
---

## ディレクトリ構成

```text
skills/go-echo/
  SKILL.md
  references/
    getting-started/
      README.md
      quickstart.md
      installation.md
      customization.md
    routing/
      README.md
      route-registration.md
      any-match.md
      match-types.md
      path-parameters.md
      query-parameters.md
      groups.md
      static-routes.md
      named-routes-reverse.md
    context/
      README.md
      context.md
      request.md
      response.md
      storage.md
      binding.md
    request-binding/
      README.md
      bind.md
      default-binder.md
      custom-binder.md
      fluent-binder.md
      bind-unmarshaler.md
      validator.md
      request-data.md
    response/
      README.md
      string.md
      html.md
      json.md
      jsonp.md
      xml.md
      blob.md
      stream.md
      file.md
      attachment.md
      inline.md
      no-content.md
      redirect.md
      response-hooks.md
      static-files.md
      templates.md
    error-handling/
      README.md
      http-error.md
      http-error-handler.md
      returning-errors-from-handlers.md
      error-propagation-in-middleware.md
    middleware/
      README.md
      middleware-overview.md
      auth-basic-auth.md
      auth-key-auth.md
      auth-jwt.md
      security-cors.md
      security-csrf.md
      security-secure.md
      util-gzip.md
      util-decompress.md
      util-recover.md
      util-logger.md
      util-request-id.md
      util-rate-limiter.md
      util-context-timeout.md
      util-body-limit.md
      util-body-dump.md
      util-static.md
      util-proxy.md
      util-rewrite.md
      util-redirect.md
      util-trailing-slash.md
      util-method-override.md
      util-session.md
  samples/
    README.md
    hello-world.md
    crud-api.md
    jwt-authentication.md
    websocket.md
    server-sent-events.md
    file-upload.md
    file-download.md
    graceful-shutdown.md
    template-rendering.md
    custom-middleware.md
  scripts/
    README.md
    install.md
    run.md
    test.md
    tls.md
    dev-tools.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Echo アプリの最小構成・インストール・Validator/Binder/Renderer 差し替えを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| ルート登録・Group・path/query parameter・静的ルート・reverse routing を知りたい | routing | [references/routing/README.md](references/routing/README.md) |
| echo.Context のメソッド・per-request storage・Context 拡張を知りたい | context | [references/context/README.md](references/context/README.md) |
| リクエストボディ・path/query/header の Bind、custom binder、Validator 実装を知りたい | request-binding | [references/request-binding/README.md](references/request-binding/README.md) |
| JSON/XML/HTML/Blob/Stream/File/Template でレスポンスを返したい | response | [references/response/README.md](references/response/README.md) |
| HTTPError・カスタム HTTPErrorHandler・handler/middleware でのエラー伝播を知りたい | error-handling | [references/error-handling/README.md](references/error-handling/README.md) |
| JWT/BasicAuth/KeyAuth 認証、CORS/CSRF/Secure、Gzip/Recover/Logger/RateLimiter などの middleware を知りたい | middleware | [references/middleware/README.md](references/middleware/README.md) |
| 典型的な使い方を知りたい（CRUD API, JWT 認証, WebSocket, SSE, ファイルアップロード/ダウンロード, graceful shutdown, テンプレートレンダリング, カスタム middleware） | samples | [samples/README.md](samples/README.md) |
| インストール・実行・テスト・AutoTLS/TLS・開発ツールのコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
