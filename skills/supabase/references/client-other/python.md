# Python クライアント (supabase-py)

## インストール

```bash
pip install supabase
```

## 初期化

### 同期クライアント

```python
from supabase import create_client, Client

url: str = "https://<project-ref>.supabase.co"
key: str = "<anon-key>"
supabase: Client = create_client(url, key)
```

### 非同期クライアント

```python
from supabase import acreate_client, AsyncClient

url: str = "https://<project-ref>.supabase.co"
key: str = "<anon-key>"
supabase: AsyncClient = await acreate_client(url, key)
```

## オプション付き初期化

```python
from supabase import create_client, ClientOptions

supabase = create_client(
    url,
    key,
    options=ClientOptions(
        schema="public",
        headers={"x-custom-header": "value"},
        auto_refresh_token=True,
        persist_session=True,
    )
)
```

## JS版との差分

| 機能 | JavaScript | Python |
|------|-----------|--------|
| クライアント生成 | `createClient(url, key)` | `create_client(url, key)` |
| 非同期クライアント | なし（全て非同期） | `acreate_client()` / `AsyncClient` |
| 同期クライアント | なし | `create_client()` / `Client` (SyncClient) |
| 命名規則 | camelCase | snake_case |
| RPC 呼び出し | `supabase.rpc('name', params)` | `supabase.rpc('name', params)` |

## データ操作（CRUD）

### SELECT

```python
# 全件取得
response = supabase.table("countries").select("*").execute()

# フィルタ付き
response = (
    supabase.table("countries")
    .select("name, capital")
    .eq("continent", "Asia")
    .order("name")
    .limit(10)
    .execute()
)

# 結果アクセス
data = response.data
count = response.count
```

### INSERT

```python
response = (
    supabase.table("countries")
    .insert({"name": "Japan", "capital": "Tokyo"})
    .execute()
)

# バルクインサート
response = (
    supabase.table("countries")
    .insert([
        {"name": "Japan", "capital": "Tokyo"},
        {"name": "Korea", "capital": "Seoul"},
    ])
    .execute()
)
```

### UPDATE

```python
response = (
    supabase.table("countries")
    .update({"capital": "Kyoto"})
    .eq("name", "Japan")
    .execute()
)
```

### DELETE

```python
response = (
    supabase.table("countries")
    .delete()
    .eq("name", "Japan")
    .execute()
)
```

### UPSERT

```python
response = (
    supabase.table("countries")
    .upsert({"id": 1, "name": "Japan", "capital": "Tokyo"})
    .execute()
)
```

## 認証

```python
# サインアップ
response = supabase.auth.sign_up({
    "email": "user@example.com",
    "password": "password123",
})

# サインイン
response = supabase.auth.sign_in_with_password({
    "email": "user@example.com",
    "password": "password123",
})

# サインアウト
supabase.auth.sign_out()

# セッション取得
session = supabase.auth.get_session()

# ユーザー取得
user = supabase.auth.get_user()
```

## Storage

```python
# ファイルアップロード
with open("photo.png", "rb") as f:
    supabase.storage.from_("avatars").upload(
        path="public/avatar.png",
        file=f,
        file_options={"content-type": "image/png"},
    )

# 公開URL取得
url = supabase.storage.from_("avatars").get_public_url("public/avatar.png")

# 署名付きURL
url = supabase.storage.from_("avatars").create_signed_url(
    "public/avatar.png", 3600
)

# ファイルダウンロード
data = supabase.storage.from_("avatars").download("public/avatar.png")

# ファイル削除
supabase.storage.from_("avatars").remove(["public/avatar.png"])

# ファイル一覧
files = supabase.storage.from_("avatars").list("public")
```

## Realtime

```python
# チャネル購読
channel = supabase.channel("room1")

def on_message(payload):
    print("Received:", payload)

channel.on_postgres_changes(
    event="INSERT",
    schema="public",
    table="messages",
    callback=on_message,
).subscribe()
```

## Edge Functions

```python
response = supabase.functions.invoke(
    "function-name",
    invoke_options={
        "body": {"key": "value"},
        "headers": {"custom-header": "value"},
    },
)
```

## Python 固有の機能

- **SyncClient / AsyncClient**: 同期・非同期を明示的に選択可能
- **snake_case API**: Python の命名規則に準拠
- **型ヒント対応**: mypy / pyright 互換
- **Pydantic モデルとの統合**: レスポンスデータを Pydantic モデルにマッピング可能
- **コンテキストマネージャ**: `with` 構文でリソース管理

## 関連

- [JS クライアント初期化](../client-js/initialization.md) — API サーフェスの参照元
- [JS クライアント Database](../client-js/database-crud.md) — CRUD 操作リファレンス
