# Authentication

Secure and seamless user authentication flows supporting multiple sign-in methods.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- ログイン・サインアップページを構築するとき
- メール + パスワード認証フォームが必要なとき
- OTP（ワンタイムパスワード）認証画面を作るとき
- ソーシャルログイン（Google, GitHub 等）ボタン付きフォームが必要なとき
- Web3 ウォレット接続付きログインを構築するとき
- ワークスペース選択付きログインフローが必要なとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"authentication"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `login-with-email-and-password-01` | Login With Email And Password 01 | paid |
| `login-with-email-and-password-02` | Login With Email And Password 02 | paid |
| `login-with-email-and-password-03` | Login With Email And Password 03 | paid |
| `login-with-otp-01` | Login With Otp 01 | paid |
| `social-login-with-email-01` | Social Login With Email 01 | paid |
| `social-login-with-email-02` | Social Login With Email 02 | paid |
| `social-login-with-email-03` | Social Login With Email 03 | paid |
| `social-login-with-email-04` | Social Login With Email 04 | paid |
| `web3-login-with-email-01` | Web3 Login With Email 01 | paid |
| `workspace-login-01` | Workspace Login 01 | paid |
