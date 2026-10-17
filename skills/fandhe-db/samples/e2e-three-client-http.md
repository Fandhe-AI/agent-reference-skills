---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/Makefile
---

# Three-client e2e harness (HTTP)

NoSQL 表層（`--surface nosql`）へ無改造の HTTP クライアント（curl / urllib / fetch）で実接続し、session → search → close を検証する統合テストを実行する。

## Usage

```bash
make e2e-three-client-http
```

```bash
# make e2e-three-client-http の実体（Makefile より）
cargo test -p fandhe-db-wire-server --test three_client_http_e2e -- --ignored --nocapture --test-threads=1
```

```js
// tests/three_client_http/fetch_client.js の中核（Node >= 18 の組み込み fetch。環境変数 HTTP_* で駆動）
const url = `http://${host}:${port}${target}`;
const headers = { "Content-Type": "application/json" };
if (bearer) headers["Authorization"] = `Bearer ${bearer}`;

const res = await fetch(url, {
  method: "POST",
  headers,
  body,
  redirect: "error",
  signal: AbortSignal.timeout(10000),
});
process.stdout.write(`${res.status}\n${await res.text()}`);
```

```python
# tests/three_client_http/urllib_client.py の中核（標準ライブラリのみ）
import urllib.error
import urllib.request

req = urllib.request.Request(
    f"http://{host}:{port}{target}",
    data=body.encode("utf-8"),
    method="POST",
    headers={"Content-Type": "application/json", "Authorization": f"Bearer {bearer}"},
)
try:
    resp = urllib.request.urlopen(req, timeout=10)
except urllib.error.HTTPError as e:
    resp = e  # 4xx/5xx も「応答あり」として扱う
print(resp.getcode())
print(resp.read().decode("utf-8"))
```

## Notes

- `#[ignore]` テストのため `make ci` には含まれない。要 `curl`・`python3`・`node`（>= 18）・`psql`（SQL 経路パリティ検証用）。`CURL_BIN` / `PYTHON_BIN` / `NODE_BIN` / `PSQL_BIN` で上書き可
- 各テストは実行記録 `[e2e-record]` 行を stderr へ出力する（トークン・資格情報を含まない。`--nocapture` で表示される）。PR への記録様式は upstream の `docs/design/three-client-e2e-harness.md`
- シナリオは session 発行 → search 3 行 → close → 失効後再送の `401` / `28000` で、3 クライアントが共有する。SQL 表層との列名・型・行集合のパリティも検証する
- 外部パッケージ（pip / npm）に依存しない。ツール未検出・非 0 終了は `panic!` で失敗する
- 上記スニペットは upstream のクライアントスクリプトの最小化。upstream は `Bearer` を任意（`HTTP_BEARER` 指定時のみ）とし、応答本文を 2 MiB に制限する

## Related

- [connect-http-curl.md](./connect-http-curl.md)
- [e2e-three-client.md](./e2e-three-client.md)
