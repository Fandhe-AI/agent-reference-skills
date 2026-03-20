# useLens

型安全にネストされたフォームデータを操作するためのレンズ（Lens）パターンのフック。`@hookform/lenses` パッケージとして提供される。フォームの深いネスト構造に対してフォーカス、変換、マッピングを行い、コンポーネントの再利用性を高める。

## インストール

```bash
npm install @hookform/lenses
```

## シグネチャ

```typescript
useLens<TFieldValues>(
  props: { control: Control<TFieldValues> },
  deps?: DependencyList
): Lens<TFieldValues>
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `control` | `Control<TFieldValues>` | はい | - | `useForm` から取得する制御オブジェクト |
| `dependencies` | `DependencyList` | いいえ | `[]` | レンズキャッシュをクリアするための依存配列 |

## Return: Lens\<T\> のメソッド

| Name | Returns | Description |
|------|---------|-------------|
| `focus(path)` | `Lens<PathValue>` | ネスト構造の特定パスにフォーカスする |
| `reflect(fn)` | `Lens<NewStructure>` | レンズ構造を変換し、コンポーネント合成に使用する |
| `map(fields, callback)` | `R[]` | 配列フィールドを `useFieldArray` と統合してイテレートする |
| `interop()` | `{ control, name }` | React Hook Form API と接続するための `control` と `name` を返す |
| `interop(fn)` | `ReturnType<fn>` | コールバック関数で `control` と `name` を受け取り、任意の値を返す |
| `narrow<T>()` | `Lens<T>` | ユニオン型を型安全にナローイングする |
| `assert<T>()` | `void` | ランタイム型アサーションでナローイングする |
| `defined()` | `Lens<NonNullable<T>>` | `null` / `undefined` を型から除外する |
| `cast<T>()` | `Lens<T>` | 型を強制的に変更する（安全でない） |

## コード例

### 基本的な使い方: focus

```tsx
import { useForm } from "react-hook-form";
import { useLens } from "@hookform/lenses";

type FormData = {
  profile: {
    name: string;
    contact: {
      email: string;
      phone: string;
    };
  };
};

function App() {
  const { handleSubmit, control } = useForm<FormData>();
  const lens = useLens({ control });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <ProfileForm lens={lens.focus("profile")} />
      <button type="submit">送信</button>
    </form>
  );
}

function ProfileForm({ lens }: { lens: Lens<FormData["profile"]> }) {
  return (
    <div>
      <input
        {...lens.focus("name").interop((ctrl, name) => ctrl.register(name))}
      />
      <input
        {...lens
          .focus("contact")
          .focus("email")
          .interop((ctrl, name) => ctrl.register(name))}
      />
    </div>
  );
}
```

### reflect によるデータ構造の変換

```tsx
function App() {
  const { control } = useForm<{
    firstName: string;
    lastName: string;
    children: { name: string; surname: string }[];
  }>();

  const lens = useLens({ control });

  return (
    <PersonForm
      lens={lens.reflect(({ firstName, lastName }) => ({
        name: firstName,
        surname: lastName,
      }))}
    />
  );
}

// PersonForm は { name, surname } の構造を期待する再利用可能コンポーネント
function PersonForm({ lens }: { lens: Lens<{ name: string; surname: string }> }) {
  return (
    <div>
      <input {...lens.focus("name").interop((ctrl, name) => ctrl.register(name))} />
      <input {...lens.focus("surname").interop((ctrl, name) => ctrl.register(name))} />
    </div>
  );
}
```

### map で配列フィールドを操作

```tsx
import { useFieldArray } from "@hookform/lenses/rhf";

function ItemList({ lens }: { lens: Lens<{ name: string }[]> }) {
  const { fields, append, remove } = useFieldArray(lens.interop());

  return (
    <div>
      {lens.map(fields, (value, itemLens, index) => (
        <div key={value.id}>
          <input
            {...itemLens
              .focus("name")
              .interop((ctrl, name) => ctrl.register(name))}
          />
          <button type="button" onClick={() => remove(index)}>
            削除
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "" })}>
        追加
      </button>
    </div>
  );
}
```

### interop で useController と接続

```tsx
import { useController } from "react-hook-form";

function ControlledInput({ lens }: { lens: Lens<string> }) {
  const { field, fieldState } = useController(lens.interop());

  return (
    <div>
      <input {...field} />
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </div>
  );
}
```

### narrow でユニオン型をナローイング

```tsx
type Animal =
  | { type: "dog"; breed: string }
  | { type: "cat"; indoor: boolean };

function DogForm({ lens }: { lens: Lens<Animal> }) {
  // 判別ユニオン型のナローイング
  const dogLens = lens.narrow("type", "dog");
  // dogLens は Lens<{ type: 'dog'; breed: string }> 型

  return (
    <input
      {...dogLens
        .focus("breed")
        .interop((ctrl, name) => ctrl.register(name))}
    />
  );
}
```

### defined で null/undefined を除外

```tsx
function RequiredField({ lens }: { lens: Lens<string | undefined> }) {
  const definedLens = lens.defined();
  // definedLens は Lens<string> 型

  return (
    <input
      {...definedLens.interop((ctrl, name) => ctrl.register(name))}
    />
  );
}
```

## 重要なルール

1. **control は必須**: `control` は `useForm` フックから取得したものを使用すること。
2. **レンズのキャッシュ**: 同じパスに対する `focus` は同一のレンズインスタンスを返す。パフォーマンスのため、`reflect` に渡す関数はメモ化を推奨。
3. **dependencies の用途**: 外部状態の変更に応じてレンズキャッシュをクリアする場合に `dependencies` を使用する。
4. **型安全性の維持**: 全てのレンズ操作で TypeScript の型推論が完全に機能する。`cast` は型安全性をバイパスするため、極力使用を避けること。
5. **useFieldArray との統合**: 配列操作には `@hookform/lenses/rhf` から `useFieldArray` をインポートして `lens.interop()` と組み合わせる。
6. **React Compiler 対応**: React Compiler は `reflect` に渡される副作用のない関数を自動的に最適化する。
