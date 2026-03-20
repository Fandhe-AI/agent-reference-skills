# C# クライアント (supabase-csharp)

## インストール

### NuGet

```bash
dotnet add package Supabase
```

### Package Manager Console

```powershell
Install-Package Supabase
```

### PackageReference

```xml
<PackageReference Include="Supabase" Version="1.0.0" />
```

## 初期化

```csharp
using Supabase;

var url = "https://<project-ref>.supabase.co";
var key = "<anon-key>";

var supabase = new Supabase.Client(url, key);
await supabase.InitializeAsync();
```

### オプション付き初期化

```csharp
var options = new SupabaseOptions
{
    AutoRefreshToken = true,
    AutoConnectRealtime = true,
    Schema = "public",
    Headers = new Dictionary<string, string>
    {
        { "x-custom-header", "value" }
    }
};

var supabase = new Supabase.Client(url, key, options);
await supabase.InitializeAsync();
```

## JS版との差分

| 機能 | JavaScript | C# |
|------|-----------|-----|
| 初期化 | `createClient(url, key)` | `new Supabase.Client(url, key)` + `InitializeAsync()` |
| モデル定義 | TypeScript 型 / なし | `BaseModel` 継承 + 属性 |
| クエリ | チェーンメソッド | LINQ風メソッドチェーン |
| フィルタ | `.eq('col', val)` | `.Filter("col", Operator.Equals, "val")` |
| 非同期 | `async/await` (Promise) | `async/await` (Task) |

## データ操作（CRUD）

### モデル定義

```csharp
using Postgrest.Attributes;
using Postgrest.Models;

[Table("countries")]
public class Country : BaseModel
{
    [PrimaryKey("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; }

    [Column("capital")]
    public string? Capital { get; set; }

    [Column("continent")]
    public string? Continent { get; set; }
}
```

### SELECT

```csharp
// 全件取得
var response = await supabase.From<Country>().Get();
var countries = response.Models;

// フィルタ付き
var response = await supabase.From<Country>()
    .Filter("continent", Postgrest.Constants.Operator.Equals, "Asia")
    .Order("name", Postgrest.Constants.Ordering.Ascending)
    .Limit(10)
    .Get();

// Select カラム指定
var response = await supabase.From<Country>()
    .Select("name, capital")
    .Get();

// 単一行取得
var response = await supabase.From<Country>()
    .Filter("id", Postgrest.Constants.Operator.Equals, "1")
    .Single();
```

### INSERT

```csharp
var country = new Country
{
    Name = "Japan",
    Capital = "Tokyo"
};

var response = await supabase.From<Country>().Insert(country);

// バルクインサート
var countries = new List<Country>
{
    new Country { Name = "Japan", Capital = "Tokyo" },
    new Country { Name = "Korea", Capital = "Seoul" },
};
var response = await supabase.From<Country>().Insert(countries);
```

### UPDATE

```csharp
var response = await supabase.From<Country>()
    .Filter("name", Postgrest.Constants.Operator.Equals, "Japan")
    .Set(x => x.Capital!, "Kyoto")
    .Update();
```

### DELETE

```csharp
await supabase.From<Country>()
    .Filter("name", Postgrest.Constants.Operator.Equals, "Japan")
    .Delete();
```

### UPSERT

```csharp
var country = new Country
{
    Id = 1,
    Name = "Japan",
    Capital = "Tokyo"
};
var response = await supabase.From<Country>().Upsert(country);
```

## フィルタ演算子

```csharp
using static Postgrest.Constants;

// 等値
.Filter("name", Operator.Equals, "Japan")

// 不等値
.Filter("name", Operator.NotEqual, "Japan")

// 大なり / 小なり
.Filter("population", Operator.GreaterThan, "1000000")
.Filter("population", Operator.LessThan, "1000000")
.Filter("population", Operator.GreaterThanOrEqual, "1000000")
.Filter("population", Operator.LessThanOrEqual, "1000000")

// LIKE / ILIKE
.Filter("name", Operator.Like, "%pan")
.Filter("name", Operator.ILike, "%PAN")

// IN
.Filter("continent", Operator.In, new List<object> { "Asia", "Europe" })

// IS NULL
.Filter("capital", Operator.Is, null)

// 範囲
.Range(0, 9)  // OFFSET 0, LIMIT 10
```

## 認証

### メール/パスワード

```csharp
// サインアップ
var session = await supabase.Auth.SignUp(
    email: "user@example.com",
    password: "password123"
);

// サインイン
var session = await supabase.Auth.SignIn(
    email: "user@example.com",
    password: "password123"
);

// サインアウト
await supabase.Auth.SignOut();

// セッション取得
var session = supabase.Auth.CurrentSession;

// ユーザー取得
var user = supabase.Auth.CurrentUser;
```

### OAuth

```csharp
var signInUrl = await supabase.Auth.SignIn(
    Supabase.Gotrue.Constants.Provider.Google,
    new SignInOptions
    {
        RedirectTo = "myapp://login-callback"
    }
);
// signInUrl をブラウザで開く
```

### 認証状態リスナー

```csharp
supabase.Auth.AddStateChangedListener((sender, changed) =>
{
    switch (changed)
    {
        case Supabase.Gotrue.Constants.AuthState.SignedIn:
            Console.WriteLine("Signed in");
            break;
        case Supabase.Gotrue.Constants.AuthState.SignedOut:
            Console.WriteLine("Signed out");
            break;
        case Supabase.Gotrue.Constants.AuthState.TokenRefreshed:
            Console.WriteLine("Token refreshed");
            break;
        case Supabase.Gotrue.Constants.AuthState.UserUpdated:
            Console.WriteLine("User updated");
            break;
    }
});
```

## Storage

```csharp
// ファイルアップロード
var bytes = await File.ReadAllBytesAsync("photo.png");
await supabase.Storage.From("avatars").Upload(
    bytes,
    "public/avatar.png",
    new Supabase.Storage.FileOptions
    {
        ContentType = "image/png"
    }
);

// 公開URL取得
var url = supabase.Storage.From("avatars").GetPublicUrl("public/avatar.png");

// 署名付きURL
var url = await supabase.Storage.From("avatars")
    .CreateSignedUrl("public/avatar.png", 3600);

// ダウンロード
var bytes = await supabase.Storage.From("avatars")
    .Download("public/avatar.png");

// 削除
await supabase.Storage.From("avatars")
    .Remove(new List<string> { "public/avatar.png" });

// 一覧
var files = await supabase.Storage.From("avatars").List("public");
```

## Realtime

```csharp
// チャネル購読
var channel = supabase.Realtime.Channel("room1");

channel.Register(new PostgresChangesOptions(
    "public",
    "messages",
    listenType: PostgresChangesOptions.ListenType.Inserts
));

channel.AddPostgresChangeHandler(
    PostgresChangesOptions.ListenType.Inserts,
    (sender, change) =>
    {
        Console.WriteLine($"New record: {change.Payload.Record}");
    }
);

await channel.Subscribe();
```

## Edge Functions

```csharp
var response = await supabase.Functions.Invoke(
    "function-name",
    new InvokeFunctionOptions
    {
        Body = new Dictionary<string, object>
        {
            { "key", "value" }
        },
        Headers = new Dictionary<string, string>
        {
            { "custom-header", "value" }
        }
    }
);
```

## RPC (ストアドプロシージャ)

```csharp
var response = await supabase.Rpc(
    "get_countries_by_continent",
    new Dictionary<string, object>
    {
        { "continent_name", "Asia" }
    }
);
```

## .NET 固有の機能

- **`BaseModel` 継承**: モデルクラスに `[Table]`, `[PrimaryKey]`, `[Column]` 属性でマッピング
- **LINQ風クエリ**: `.Filter()`, `.Order()`, `.Limit()`, `.Range()` によるメソッドチェーン
- **`Set()` メソッド**: ラムダ式によるプロパティ指定でのアップデート
- **`Task` ベース非同期**: `async/await` パターンでの非同期処理
- **`AddStateChangedListener`**: イベントベースの認証状態監視
- **NuGet パッケージ管理**: .NET エコシステムとの統合
- **`InitializeAsync()`**: クライアント初期化が非同期（セッション復元のため）

## 関連

- [JS クライアント初期化](../client-js/initialization.md) — API サーフェスの参照元
- [JS クライアント Database](../client-js/database-crud.md) — CRUD リファレンス
- [クイックスタート](../getting-started/quickstarts.md) — フレームワーク一覧
