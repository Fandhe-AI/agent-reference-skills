# Dart/Flutter クライアント (supabase_flutter)

## インストール

### Flutter

```yaml
# pubspec.yaml
dependencies:
  supabase_flutter: ^2.0.0
```

```bash
flutter pub get
```

### Dart (Flutter なし)

```yaml
dependencies:
  supabase: ^2.0.0
```

## 初期化

### Flutter アプリケーション

```dart
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Supabase.initialize(
    url: 'https://<project-ref>.supabase.co',
    anonKey: '<anon-key>',
  );

  runApp(MyApp());
}

// クライアントアクセス
final supabase = Supabase.instance.client;
```

### オプション付き初期化

```dart
await Supabase.initialize(
  url: 'https://<project-ref>.supabase.co',
  anonKey: '<anon-key>',
  authOptions: const FlutterAuthClientOptions(
    authFlowType: AuthFlowType.pkce,
  ),
  realtimeClientOptions: const RealtimeClientOptions(
    logLevel: RealtimeLogLevel.info,
  ),
  storageOptions: const StorageClientOptions(
    retryAttempts: 10,
  ),
);
```

### Dart 単体（Flutter なし）

```dart
import 'package:supabase/supabase.dart';

final supabase = SupabaseClient(
  'https://<project-ref>.supabase.co',
  '<anon-key>',
);
```

## JS版との差分

| 機能 | JavaScript | Dart/Flutter |
|------|-----------|-------------|
| 初期化 | `createClient(url, key)` | `Supabase.initialize(url:, anonKey:)` |
| クライアント参照 | `supabase` 変数 | `Supabase.instance.client` |
| リアルタイム | `channel().on().subscribe()` | `channel().onPostgresChanges().subscribe()` + `stream()` |
| DeepLink | 手動設定 | `FlutterAuthClientOptions` で自動処理 |
| セッション永続化 | localStorage | SharedPreferences (自動) |

## データ操作（CRUD）

### SELECT

```dart
// 全件取得
final data = await supabase.from('countries').select();

// フィルタ付き
final data = await supabase
    .from('countries')
    .select('name, capital')
    .eq('continent', 'Asia')
    .order('name')
    .limit(10);

// 単一行取得
final data = await supabase
    .from('countries')
    .select()
    .eq('id', 1)
    .single();
```

### INSERT

```dart
await supabase.from('countries').insert({
  'name': 'Japan',
  'capital': 'Tokyo',
});

// バルクインサート
await supabase.from('countries').insert([
  {'name': 'Japan', 'capital': 'Tokyo'},
  {'name': 'Korea', 'capital': 'Seoul'},
]);
```

### UPDATE

```dart
await supabase
    .from('countries')
    .update({'capital': 'Kyoto'})
    .eq('name', 'Japan');
```

### DELETE

```dart
await supabase
    .from('countries')
    .delete()
    .eq('name', 'Japan');
```

### UPSERT

```dart
await supabase.from('countries').upsert({
  'id': 1,
  'name': 'Japan',
  'capital': 'Tokyo',
});
```

## stream() メソッド（Flutter 固有）

`stream()` はリアルタイムデータを `Stream<List<Map<String, dynamic>>>` として返す Flutter/Dart 固有の機能。`StreamBuilder` と組み合わせて使用する。

```dart
// StreamBuilder でリアルタイム表示
StreamBuilder<List<Map<String, dynamic>>>(
  stream: supabase.from('messages').stream(primaryKey: ['id']),
  builder: (context, snapshot) {
    if (!snapshot.hasData) {
      return const CircularProgressIndicator();
    }
    final messages = snapshot.data!;
    return ListView.builder(
      itemCount: messages.length,
      itemBuilder: (context, index) {
        return Text(messages[index]['content']);
      },
    );
  },
)

// フィルタ付きストリーム
supabase
    .from('messages')
    .stream(primaryKey: ['id'])
    .eq('room_id', roomId)
    .order('created_at')
    .limit(50);
```

## 認証

### メール/パスワード

```dart
// サインアップ
final response = await supabase.auth.signUp(
  email: 'user@example.com',
  password: 'password123',
);

// サインイン
final response = await supabase.auth.signInWithPassword(
  email: 'user@example.com',
  password: 'password123',
);

// サインアウト
await supabase.auth.signOut();
```

### OAuth (Flutter)

```dart
await supabase.auth.signInWithOAuth(
  OAuthProvider.google,
  redirectTo: 'io.supabase.myapp://login-callback/',
);
```

### DeepLink 設定 (Flutter)

```dart
// FlutterAuthClientOptions で自動対応
await Supabase.initialize(
  url: url,
  anonKey: anonKey,
  authOptions: const FlutterAuthClientOptions(
    authFlowType: AuthFlowType.pkce,
  ),
);
```

### 認証状態リスナー

```dart
supabase.auth.onAuthStateChange.listen((data) {
  final AuthChangeEvent event = data.event;
  final Session? session = data.session;

  switch (event) {
    case AuthChangeEvent.signedIn:
      // サインイン処理
      break;
    case AuthChangeEvent.signedOut:
      // サインアウト処理
      break;
    case AuthChangeEvent.tokenRefreshed:
      // トークンリフレッシュ
      break;
    default:
      break;
  }
});
```

## Storage

```dart
// ファイルアップロード
await supabase.storage.from('avatars').upload(
  'public/avatar.png',
  file,
  fileOptions: const FileOptions(contentType: 'image/png'),
);

// 公開URL取得
final url = supabase.storage.from('avatars').getPublicUrl('public/avatar.png');

// 署名付きURL
final url = await supabase.storage
    .from('avatars')
    .createSignedUrl('public/avatar.png', 3600);

// ダウンロード
final bytes = await supabase.storage.from('avatars').download('public/avatar.png');

// 削除
await supabase.storage.from('avatars').remove(['public/avatar.png']);

// 一覧
final files = await supabase.storage.from('avatars').list(path: 'public');
```

## Realtime（手動チャネル）

```dart
final channel = supabase.channel('room1');

channel
    .onPostgresChanges(
      event: PostgresChangeEvent.insert,
      schema: 'public',
      table: 'messages',
      callback: (payload) {
        print('New message: ${payload.newRecord}');
      },
    )
    .subscribe();

// チャネル解除
supabase.removeChannel(channel);
```

## Edge Functions

```dart
final response = await supabase.functions.invoke(
  'function-name',
  body: {'key': 'value'},
  headers: {'custom-header': 'value'},
);
```

## Flutter 固有の機能

- **`Supabase.initialize()`**: Flutter アプリの起動時に一度だけ呼び出す初期化メソッド
- **`stream()` メソッド**: リアルタイムデータを Dart の `Stream` として取得。`StreamBuilder` と組み合わせて宣言的UI構築
- **DeepLink 自動処理**: `FlutterAuthClientOptions` で OAuth リダイレクトを自動処理
- **`SupabaseAuth` ウィジェット**: 認証状態に応じた画面遷移を管理
- **セッション自動永続化**: SharedPreferences を使用した自動セッション保存
- **`onAuthStateChange` ストリーム**: `Stream<AuthState>` で認証状態変更を監視

## 関連

- [JS クライアント初期化](../client-js/initialization.md) — API サーフェスの参照元
- [JS クライアント Realtime](../client-js/realtime.md) — Realtime リファレンス
- [クイックスタート](../getting-started/quickstarts.md) — Flutter クイックスタート
