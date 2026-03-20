# Layer Dependency

インポートは下位レイヤーへの一方向のみ許可する。

## Rule

スライス内のモジュールは、**厳密に下位のレイヤー**に位置するスライスの Public API からのみインポートできる。上位レイヤーや同一レイヤーのスライスからインポートしてはならない。

レイヤーの順序（上位 → 下位）: `app` > `pages` > `widgets` > `features` > `entities` > `shared`

## Good

```ts
// features/search/ui/SearchBar.tsx
import { User } from "entities/user";          // features → entities (OK)
import { Input } from "shared/ui/input";        // features → shared (OK)

// pages/home/ui/HomePage.tsx
import { SearchBar } from "features/search";    // pages → features (OK)
import { UserCard } from "entities/user";        // pages → entities (OK)

// widgets/header/ui/Header.tsx
import { SearchBar } from "features/search";    // widgets → features (OK)
```

## Bad

```ts
// entities/user/model/user.ts
import { SearchBar } from "features/search";    // entities → features (NG: 上位)

// features/cart/model/cart.ts
import { Product } from "features/product";      // features → features (NG: 同一レイヤー)

// shared/ui/button.tsx
import { User } from "entities/user";            // shared → entities (NG: 上位)
```

## Why

一方向の依存関係により:

- 変更の影響範囲が予測可能になる（下位レイヤーの変更は上位にのみ波及）
- 循環依存を構造的に防止する
- 各レイヤーを独立してテスト・リファクタリングできる
- コードの見通しが良くなり、新メンバーが構造を理解しやすい
