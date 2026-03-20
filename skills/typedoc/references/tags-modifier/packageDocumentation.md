# @packageDocumentation

コメントブロックをファイル全体のドキュメントとしてマークするモディファイアタグ。直後の宣言ではなくファイル自体を説明する。

## 構文

```
/**
 * ファイルの説明
 * @packageDocumentation
 */
```

## 詳細説明

`@packageDocumentation` タグは、コメントブロックがファイルの直後の宣言ではなく、ファイル自体のドキュメントであることを示す。

このタグを含むコメントブロックは、ファイルの最初のコメントとして配置する必要がある。import 文よりも前に置くことが推奨される。このタグがない場合、import 文の前のコメントは import 文のドキュメントとして解釈されてしまう。

`@module` タグは同等の機能を提供し、セマンティック的により明確な場合は `@module` の使用が推奨される。

## コード例

### 基本的な使用法

```typescript
// file1.ts
/**
 * This is the doc comment for file1.ts
 *
 * @packageDocumentation
 */
import * as lib from "lib";
```

### 詳細なファイルドキュメント

```typescript
/**
 * ユーザー認証モジュール。
 *
 * このモジュールは、JWT ベースの認証フローを提供する。
 * OAuth 2.0 プロバイダーとの統合もサポートしている。
 *
 * @packageDocumentation
 */
import { sign, verify } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export class AuthService {
    // ...
}
```

## 注意点

- ファイルの最初のコメントとして配置する必要がある
- import 文より前に配置することが推奨される
- TSDoc 仕様に準拠: https://tsdoc.org/pages/tags/packagedocumentation/
- `@module` タグが同等の機能を提供する代替手段

## 関連

- [@module](../tags-block/module.md)
