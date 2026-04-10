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

| ID | Name | Access | Description |
|----|------|--------|-------------|
| `login-with-email-and-password-01` | Login With Email And Password 01 | paid | 中央揃え1カラム。メール＋パスワード＋Checkbox＋Googleボタン |
| `login-with-email-and-password-02` | Login With Email And Password 02 | paid | 2カラム（左:画像、右:フォーム）。ソーシャルログイン4種＋Separator付き |
| `login-with-email-and-password-03` | Login With Email And Password 03 | paid | 2カラム（左:フォーム、右:画像）。Avatar＋アイコン付きField＋中央揃え |
| `login-with-otp-01` | Login With Otp 01 | paid | 中央揃え1カラム。PinInput（6桁）によるOTP確認画面 |
| `social-login-with-email-01` | Social Login With Email 01 | paid | 中央揃え1カラム。Google/GitHub＋Separator＋メール入力のみ |
| `social-login-with-email-02` | Social Login With Email 02 | paid | 中央揃え1カラム。Google/GitHub/Apple＋メール入力＋利用規約リンク |
| `social-login-with-email-03` | Social Login With Email 03 | paid | 中央揃え1カラム。GitHub/GitLab/Bitbucket＋SSO＋大きめロゴ |
| `social-login-with-email-04` | Social Login With Email 04 | paid | 2カラム（左:フォーム、右:画像）。ヘッダーバー＋ソーシャル3種＋メール入力 |
| `web3-login-with-email-01` | Web3 Login With Email 01 | paid | 中央揃え1カラム。MetaMask/Coinbase/WalletConnect＋メール入力 |
| `workspace-login-01` | Workspace Login 01 | paid | 中央揃え1カラム。ワークスペースURL入力（.chakra.com）＋Separator＋リンク |
