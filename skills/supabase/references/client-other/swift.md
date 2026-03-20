# Swift クライアント (supabase-swift)

## インストール

### Swift Package Manager (SPM)

```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/supabase/supabase-swift.git", from: "2.0.0")
]
```

Xcode: File > Add Package Dependencies > `https://github.com/supabase/supabase-swift.git`

## 初期化

```swift
import Supabase

let supabase = SupabaseClient(
    supabaseURL: URL(string: "https://<project-ref>.supabase.co")!,
    supabaseKey: "<anon-key>"
)
```

### オプション付き初期化

```swift
let supabase = SupabaseClient(
    supabaseURL: URL(string: "https://<project-ref>.supabase.co")!,
    supabaseKey: "<anon-key>",
    options: SupabaseClientOptions(
        db: .init(schema: "public"),
        auth: .init(
            flowType: .pkce,
            redirectToURL: URL(string: "myapp://login-callback")
        ),
        global: .init(
            headers: ["x-custom-header": "value"]
        )
    )
)
```

## JS版との差分

| 機能 | JavaScript | Swift |
|------|-----------|-------|
| 初期化 | `createClient(url, key)` | `SupabaseClient(supabaseURL:, supabaseKey:)` |
| 非同期処理 | `async/await` (Promise) | `async/await` (Swift Concurrency) |
| レスポンス型 | 動的型 | Codable プロトコルによる型安全 |
| リアルタイム | コールバック | `AsyncStream` / コールバック |
| エラー処理 | `try/catch` | `do/try/catch` + 型付きエラー |

## データ操作（CRUD）

### モデル定義（Codable）

```swift
struct Country: Codable, Identifiable {
    let id: Int
    let name: String
    let capital: String?
}
```

### SELECT

```swift
// 全件取得（型付き）
let countries: [Country] = try await supabase
    .from("countries")
    .select()
    .execute()
    .value

// フィルタ付き
let countries: [Country] = try await supabase
    .from("countries")
    .select("name, capital")
    .eq("continent", value: "Asia")
    .order("name")
    .limit(10)
    .execute()
    .value

// 単一行取得
let country: Country = try await supabase
    .from("countries")
    .select()
    .eq("id", value: 1)
    .single()
    .execute()
    .value
```

### INSERT

```swift
try await supabase
    .from("countries")
    .insert(Country(id: 1, name: "Japan", capital: "Tokyo"))
    .execute()

// バルクインサート
try await supabase
    .from("countries")
    .insert([
        Country(id: 1, name: "Japan", capital: "Tokyo"),
        Country(id: 2, name: "Korea", capital: "Seoul"),
    ])
    .execute()
```

### UPDATE

```swift
struct CountryUpdate: Codable {
    let capital: String
}

try await supabase
    .from("countries")
    .update(CountryUpdate(capital: "Kyoto"))
    .eq("name", value: "Japan")
    .execute()
```

### DELETE

```swift
try await supabase
    .from("countries")
    .delete()
    .eq("name", value: "Japan")
    .execute()
```

### UPSERT

```swift
try await supabase
    .from("countries")
    .upsert(Country(id: 1, name: "Japan", capital: "Tokyo"))
    .execute()
```

## 認証

### メール/パスワード

```swift
// サインアップ
let response = try await supabase.auth.signUp(
    email: "user@example.com",
    password: "password123"
)

// サインイン
let session = try await supabase.auth.signIn(
    email: "user@example.com",
    password: "password123"
)

// サインアウト
try await supabase.auth.signOut()

// セッション取得
let session = try await supabase.auth.session

// ユーザー取得
let user = try await supabase.auth.user()
```

### OAuth

```swift
try await supabase.auth.signInWithOAuth(
    provider: .google,
    redirectTo: URL(string: "myapp://login-callback")
)
```

### Apple でサインイン

```swift
import AuthenticationServices

// Apple Sign In ボタンからの credential を使用
let credential: ASAuthorizationAppleIDCredential = ...
let idToken = String(data: credential.identityToken!, encoding: .utf8)!

let session = try await supabase.auth.signInWithIdToken(
    credentials: .init(
        provider: .apple,
        idToken: idToken
    )
)
```

### AuthChangeEvent（認証状態監視）

```swift
// AsyncStream による状態監視
for await (event, session) in supabase.auth.authStateChanges {
    switch event {
    case .initialSession:
        // 初回セッション読み込み
        break
    case .signedIn:
        // サインイン
        print("Signed in: \(session?.user.email ?? "")")
    case .signedOut:
        // サインアウト
        print("Signed out")
    case .tokenRefreshed:
        // トークンリフレッシュ
        break
    case .userUpdated:
        // ユーザー情報更新
        break
    case .passwordRecovery:
        // パスワードリカバリ
        break
    case .mfaChallengeVerified:
        // MFA 検証完了
        break
    }
}
```

## Storage

```swift
// ファイルアップロード
let fileData: Data = ...
try await supabase.storage
    .from("avatars")
    .upload(
        path: "public/avatar.png",
        file: fileData,
        options: FileOptions(contentType: "image/png")
    )

// 公開URL取得
let url = try supabase.storage
    .from("avatars")
    .getPublicURL(path: "public/avatar.png")

// 署名付きURL
let url = try await supabase.storage
    .from("avatars")
    .createSignedURL(path: "public/avatar.png", expiresIn: 3600)

// ダウンロード
let data = try await supabase.storage
    .from("avatars")
    .download(path: "public/avatar.png")

// 削除
try await supabase.storage
    .from("avatars")
    .remove(paths: ["public/avatar.png"])

// 一覧
let files = try await supabase.storage
    .from("avatars")
    .list(path: "public")
```

## Realtime

```swift
let channel = supabase.channel("room1")

let changes = channel.postgresChange(
    InsertAction.self,
    schema: "public",
    table: "messages"
)

await channel.subscribe()

for await change in changes {
    print("New record: \(change.record)")
}
```

## Edge Functions

```swift
struct FunctionResponse: Codable {
    let message: String
}

let response: FunctionResponse = try await supabase.functions.invoke(
    "function-name",
    options: .init(body: ["key": "value"])
)
```

## iOS/macOS 向け設定

### Info.plist（DeepLink 設定）

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>myapp</string>
        </array>
    </dict>
</array>
```

### SwiftUI での認証状態管理

```swift
@main
struct MyApp: App {
    @State private var isAuthenticated = false

    var body: some Scene {
        WindowGroup {
            Group {
                if isAuthenticated {
                    HomeView()
                } else {
                    LoginView()
                }
            }
            .task {
                for await (event, _) in supabase.auth.authStateChanges {
                    isAuthenticated = event == .signedIn
                }
            }
        }
    }
}
```

## Swift 固有の機能

- **Codable 統合**: レスポンスを Swift の構造体に自動デコード（型安全）
- **Swift Concurrency**: `async/await` ネイティブ対応、`AsyncStream` によるリアルタイム監視
- **AuthChangeEvent**: `.initialSession`, `.signedIn`, `.signedOut`, `.tokenRefreshed`, `.userUpdated`, `.passwordRecovery`, `.mfaChallengeVerified`
- **Apple Sign In 統合**: `ASAuthorizationAppleIDCredential` を直接使用可能
- **iOS/macOS 対応**: Universal Links、URL Schemes によるDeepLink処理
- **型付きエラーハンドリング**: `do/try/catch` による詳細なエラー処理

## 関連

- [JS クライアント初期化](../client-js/initialization.md) — API サーフェスの参照元
- [ソーシャルログイン](../auth/social-login.md) — Apple Sign In 設定
- [クイックスタート](../getting-started/quickstarts.md) — iOS クイックスタート
