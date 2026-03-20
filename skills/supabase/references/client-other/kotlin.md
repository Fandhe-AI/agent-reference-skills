# Kotlin クライアント (supabase-kt)

## インストール

### Gradle (Kotlin DSL)

```kotlin
// build.gradle.kts
plugins {
    id("io.github.jan-tennert.supabase") version "3.0.0"
}

dependencies {
    // BOM（バージョン一括管理）
    implementation(platform("io.github.jan-tennert.supabase:bom:3.0.0"))

    // 必要なプラグインを個別に追加
    implementation("io.github.jan-tennert.supabase:postgrest-kt")
    implementation("io.github.jan-tennert.supabase:auth-kt")
    implementation("io.github.jan-tennert.supabase:storage-kt")
    implementation("io.github.jan-tennert.supabase:realtime-kt")
    implementation("io.github.jan-tennert.supabase:functions-kt")

    // Ktor エンジン（プラットフォームに応じて選択）
    implementation("io.ktor:ktor-client-cio:2.3.0")        // JVM
    implementation("io.ktor:ktor-client-android:2.3.0")     // Android
    implementation("io.ktor:ktor-client-darwin:2.3.0")      // iOS
}
```

### Gradle (Groovy)

```groovy
implementation platform("io.github.jan-tennert.supabase:bom:3.0.0")
implementation "io.github.jan-tennert.supabase:postgrest-kt"
implementation "io.github.jan-tennert.supabase:auth-kt"
```

## 初期化

```kotlin
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.auth.Auth
import io.github.jan.supabase.storage.Storage
import io.github.jan.supabase.realtime.Realtime
import io.github.jan.supabase.functions.Functions

val supabase = createSupabaseClient(
    supabaseUrl = "https://<project-ref>.supabase.co",
    supabaseKey = "<anon-key>"
) {
    // プラグインシステム: 必要な機能のみインストール
    install(Postgrest)
    install(Auth)
    install(Storage)
    install(Realtime)
    install(Functions)
}
```

### オプション付き初期化

```kotlin
val supabase = createSupabaseClient(
    supabaseUrl = "https://<project-ref>.supabase.co",
    supabaseKey = "<anon-key>"
) {
    install(Postgrest) {
        defaultSchema = "public"
    }
    install(Auth) {
        flowType = FlowType.PKCE
        scheme = "myapp"
        host = "login-callback"
    }
    install(Storage) {
        transferTimeout = 120.seconds
    }
    install(Realtime) {
        heartbeatInterval = 15.seconds
    }
}
```

## JS版との差分

| 機能 | JavaScript | Kotlin |
|------|-----------|--------|
| 初期化 | `createClient(url, key)` | `createSupabaseClient(url, key) { install(...) }` |
| 機能追加 | 全機能含む | プラグインシステムで必要な機能のみ |
| クエリ実行 | `supabase.from('table')` | `supabase.from("table")` |
| 型安全 | TypeScript 型 | Kotlinx Serialization |
| マルチプラットフォーム | ブラウザ/Node.js | Android / JVM / iOS / JS |

## プラグインシステム

supabase-kt はプラグインアーキテクチャを採用。必要な機能のみをインストールすることでアプリサイズを最適化。

| プラグイン | 機能 | インポート |
|-----------|------|----------|
| `Postgrest` | データベースCRUD | `postgrest-kt` |
| `Auth` | 認証 | `auth-kt` |
| `Storage` | ファイルストレージ | `storage-kt` |
| `Realtime` | リアルタイム購読 | `realtime-kt` |
| `Functions` | Edge Functions | `functions-kt` |

## データ操作（CRUD）

### モデル定義（Kotlinx Serialization）

```kotlin
@Serializable
data class Country(
    val id: Int,
    val name: String,
    val capital: String? = null
)
```

### SELECT

```kotlin
// 全件取得（型付き）
val countries = supabase.from("countries")
    .select()
    .decodeList<Country>()

// フィルタ付き
val countries = supabase.from("countries")
    .select(columns = Columns.list("name", "capital")) {
        filter {
            eq("continent", "Asia")
        }
        order("name", Order.ASCENDING)
        limit(10)
    }
    .decodeList<Country>()

// 単一行取得
val country = supabase.from("countries")
    .select {
        filter {
            eq("id", 1)
        }
    }
    .decodeSingle<Country>()
```

### INSERT

```kotlin
supabase.from("countries")
    .insert(Country(id = 1, name = "Japan", capital = "Tokyo"))

// バルクインサート
supabase.from("countries")
    .insert(listOf(
        Country(id = 1, name = "Japan", capital = "Tokyo"),
        Country(id = 2, name = "Korea", capital = "Seoul"),
    ))
```

### UPDATE

```kotlin
supabase.from("countries")
    .update({
        set("capital", "Kyoto")
    }) {
        filter {
            eq("name", "Japan")
        }
    }
```

### DELETE

```kotlin
supabase.from("countries")
    .delete {
        filter {
            eq("name", "Japan")
        }
    }
```

### UPSERT

```kotlin
supabase.from("countries")
    .upsert(Country(id = 1, name = "Japan", capital = "Tokyo"))
```

## 認証

### メール/パスワード

```kotlin
// サインアップ
supabase.auth.signUpWith(Email) {
    email = "user@example.com"
    password = "password123"
}

// サインイン
supabase.auth.signInWith(Email) {
    email = "user@example.com"
    password = "password123"
}

// サインアウト
supabase.auth.signOut()

// セッション取得
val session = supabase.auth.currentSessionOrNull()

// ユーザー取得
val user = supabase.auth.retrieveUserForCurrentSession()
```

### OAuth

```kotlin
supabase.auth.signInWith(Google) {
    // Android の場合
}
```

### 認証状態監視

```kotlin
supabase.auth.sessionStatus.collect { status ->
    when (status) {
        is SessionStatus.Authenticated -> {
            println("Authenticated: ${status.session.user?.email}")
        }
        is SessionStatus.NotAuthenticated -> {
            println("Not authenticated")
        }
        is SessionStatus.LoadingFromStorage -> {
            println("Loading session...")
        }
        is SessionStatus.NetworkError -> {
            println("Network error")
        }
    }
}
```

## Storage

```kotlin
// ファイルアップロード
supabase.storage.from("avatars").upload(
    path = "public/avatar.png",
    data = fileBytes,
    upsert = false
)

// 公開URL取得
val url = supabase.storage.from("avatars")
    .publicUrl("public/avatar.png")

// 署名付きURL
val url = supabase.storage.from("avatars")
    .createSignedUrl("public/avatar.png", expiresIn = 3600.seconds)

// ダウンロード
val bytes = supabase.storage.from("avatars")
    .downloadAuthenticated("public/avatar.png")

// 削除
supabase.storage.from("avatars")
    .delete("public/avatar.png")

// 一覧
val files = supabase.storage.from("avatars")
    .list("public")
```

## Realtime

```kotlin
val channel = supabase.channel("room1")

val changes = channel.postgresChangeFlow<PostgresAction.Insert>(schema = "public") {
    table = "messages"
}

channel.subscribe()

changes.collect { change ->
    println("New record: ${change.record}")
}
```

## Edge Functions

```kotlin
val response = supabase.functions.invoke("function-name") {
    body = buildJsonObject {
        put("key", "value")
    }
}
```

## Compose Multiplatform 対応

### Compose での認証状態管理

```kotlin
@Composable
fun App() {
    val sessionStatus by supabase.auth.sessionStatus.collectAsState()

    when (sessionStatus) {
        is SessionStatus.Authenticated -> HomeScreen()
        is SessionStatus.NotAuthenticated -> LoginScreen()
        else -> LoadingScreen()
    }
}
```

### ViewModel での使用

```kotlin
class CountryViewModel : ViewModel() {
    private val _countries = MutableStateFlow<List<Country>>(emptyList())
    val countries: StateFlow<List<Country>> = _countries

    fun loadCountries() {
        viewModelScope.launch {
            _countries.value = supabase.from("countries")
                .select()
                .decodeList()
        }
    }
}
```

## Kotlin 固有の機能

- **プラグインシステム**: `install()` で必要な機能のみを組み込み。アプリサイズ最適化
- **Kotlinx Serialization**: `@Serializable` によるコンパイル時型安全デコード
- **Kotlin Coroutines / Flow**: `suspend` 関数、`Flow` によるリアクティブ処理
- **Compose Multiplatform**: `collectAsState()` で状態管理との統合
- **Kotlin Multiplatform (KMP)**: Android, iOS, JVM, JS で同一コード共有
- **DSL ビルダー**: フィルタ、更新をKotlin DSLで記述（`filter { eq(...) }`）
- **Ktor エンジン選択**: プラットフォームごとに最適な HTTP エンジンを選択

## 関連

- [JS クライアント初期化](../client-js/initialization.md) — API サーフェスの参照元
- [JS クライアント Auth](../client-js/auth.md) — Auth リファレンス
- [クイックスタート](../getting-started/quickstarts.md) — Kotlin クイックスタート
