# Reflections

TypeDoc の内部モデル。ソースコード中のすべてのドキュメント対象要素（クラス、関数、プロパティなど）を表現する Reflection 階層。

## シグネチャ

### Reflection 階層

```typescript
// 基底クラス
abstract class Reflection {
  abstract readonly variant: keyof ReflectionVariant;
  id: ReflectionId;
  name: string;
  kind: ReflectionKind;
  flags: ReflectionFlags;
  project: ProjectReflection;
  parent?: Reflection;
  comment?: Comment;
}

// コンテナ (子要素を持つ Reflection の基底)
abstract class ContainerReflection extends Reflection {
  children?: DeclarationReflection[];
  documents?: DocumentReflection[];
  childrenIncludingDocuments?: (DeclarationReflection | DocumentReflection)[];
  groups?: ReflectionGroup[];
  categories?: ReflectionCategory[];
}

// プロジェクト (ルート)
class ProjectReflection extends ContainerReflection {
  readonly variant: "project";
  files: FileRegistry;
  reflections: { [id: number]: Reflection };  // 読み取り専用
  packageName?: string;
  packageVersion?: string;
  readme?: CommentDisplayPart[];
}

// 宣言 (クラス、関数、プロパティなど)
class DeclarationReflection extends ContainerReflection {
  variant: "declaration" | "reference";
  type?: SomeType;
  typeParameters?: TypeParameterReflection[];
  signatures?: SignatureReflection[];
  indexSignatures?: SignatureReflection[];
  getSignature?: SignatureReflection;
  setSignature?: SignatureReflection;
  defaultValue?: string;
  extendedTypes?: SomeType[];
  extendedBy?: ReferenceType[];
  implementedTypes?: SomeType[];
  implementedBy?: ReferenceType[];
  inheritedFrom?: ReferenceType;
  overwrites?: ReferenceType;
  implementationOf?: ReferenceType;
  sources?: SourceReference[];
  packageVersion?: string;
  relevanceBoost?: number;
  typeHierarchy?: DeclarationHierarchy;
}

// シグネチャ
class SignatureReflection extends Reflection {
  readonly variant: "signature";
  parent: DeclarationReflection;
  parameters?: ParameterReflection[];
  typeParameters?: TypeParameterReflection[];
  type?: SomeType;
  overwrites?: ReferenceType;
  inheritedFrom?: ReferenceType;
  implementationOf?: ReferenceType;
  sources?: SourceReference[];
}

// パラメータ
class ParameterReflection extends Reflection {
  readonly variant: "param";
  parent?: SignatureReflection;
  type?: SomeType;
  defaultValue?: string;
}

// 型パラメータ
class TypeParameterReflection extends Reflection {
  readonly variant: "typeParam";
  parent?: DeclarationReflection | SignatureReflection;
  type?: SomeType;       // 制約
  default?: SomeType;    // デフォルト値
  varianceModifier?: VarianceModifier;
}

// リファレンス (インポートされた Reflection)
class ReferenceReflection extends DeclarationReflection {
  readonly variant: "reference";
  getTargetReflection(): Reflection;
  getTargetReflectionDeep(): Reflection;
  tryGetTargetReflection(): Reflection | undefined;
  tryGetTargetReflectionDeep(): Reflection | undefined;
}

// ドキュメント (Markdown ファイル)
class DocumentReflection extends Reflection {
  readonly variant: "document";
  content: CommentDisplayPart[];
  frontmatter: Record<string, unknown>;
  relevanceBoost?: number;
  children?: DocumentReflection[];
}
```

## 主要メソッド

### Reflection (基底クラス)

| メソッド | シグネチャ | 説明 |
|---------|----------|------|
| `getFullName` | `(separator?: string): string` | 完全な階層名を返す |
| `getFriendlyFullName` | `(): string` | ユーザー表示用の名前を返す |
| `getChildByName` | `(arg: string \| string[]): Reflection \| undefined` | 名前で子要素を検索 |
| `hasComment` | `(notRenderedTags?: readonly string[]): boolean` | 表示可能なコメントがあるか |
| `isDeprecated` | `(): boolean` | 非推奨かどうか |
| `kindOf` | `(kind: ReflectionKind \| ReflectionKind[]): boolean` | Reflection の種類をテスト |
| `setFlag` | `(flag: ReflectionFlag, value?: boolean): void` | フラグを設定 |
| `traverse` | `(callback: TraverseCallback): void` | 子要素を走査 (抽象メソッド) |
| `visit` | `(visitor: ReflectionVisitor): void` | ビジターパターンを適用 |
| `toObject` | `(serializer: Serializer): JSONOutput.Reflection` | JSON にシリアライズ |
| `fromObject` | `(de: Deserializer, obj: JSONOutput.Reflection): void` | JSON からデシリアライズ |

#### 型ガードメソッド

| メソッド | 戻り値型 |
|---------|---------|
| `isProject()` | `this is ProjectReflection` |
| `isDeclaration()` | `this is DeclarationReflection` |
| `isSignature()` | `this is SignatureReflection` |
| `isParameter()` | `this is ParameterReflection` |
| `isTypeParameter()` | `this is TypeParameterReflection` |
| `isDocument()` | `this is DocumentReflection` |
| `isContainer()` | `this is ContainerReflection` |
| `isReference()` | `this is ReferenceReflection` |

### ProjectReflection

| メソッド | シグネチャ | 説明 |
|---------|----------|------|
| `getReflectionById` | `(id: number): Reflection \| undefined` | ID で Reflection を取得 |
| `getReflectionsByKind` | `(kind: ReflectionKind): Reflection[]` | 種類でフィルタリング |
| `getChildrenByKind` | `(kind: ReflectionKind): DeclarationReflection[]` | 直接の子を種類でフィルタリング |
| `registerReflection` | `(reflection, id?, filePath?)` | Reflection をインデックスに登録 |
| `registerSymbolId` | `(reflection, id)` | シンボル ID を関連付け |
| `removeReflection` | `(reflection)` | Reflection をドキュメントから削除 |
| `mergeReflections` | `(source, target)` | Reflection を統合 (内部用) |
| `getReflectionFromSymbolId` | `(symbolId): Reflection \| undefined` | シンボル ID から取得 |

### DeclarationReflection

| メソッド | シグネチャ | 説明 |
|---------|----------|------|
| `getAllSignatures` | `(): SignatureReflection[]` | すべてのシグネチャを取得 |
| `getNonIndexSignatures` | `(): SignatureReflection[]` | インデックスシグネチャ以外を取得 |
| `getProperties` | `(): DeclarationReflection[]` | プロパティを取得 |
| `hasGetterOrSetter` | `(): boolean` | getter/setter があるか |
| `getChildOrTypePropertyByName` | `(path: string[]): DeclarationReflection \| undefined` | 名前パスで検索 |
| `addChild` | `(child: Reflection): void` | 子要素を追加 |
| `removeChild` | `(child): void` | 子要素を削除 |

### ReferenceReflection

| メソッド | シグネチャ | 説明 |
|---------|----------|------|
| `getTargetReflection` | `(): Reflection` | 参照先 Reflection を取得 |
| `getTargetReflectionDeep` | `(): Reflection` | チェーンされた参照を完全に解決 |
| `tryGetTargetReflection` | `(): Reflection \| undefined` | 安全に参照先を取得 |
| `tryGetTargetReflectionDeep` | `(): Reflection \| undefined` | 安全に深い参照を解決 |

### DocumentReflection

| メソッド | シグネチャ | 説明 |
|---------|----------|------|
| `addChild` | `(child: DocumentReflection): void` | 子ドキュメントを追加 |

## 主要プロパティ

### ReflectionKind (列挙型)

主な種類:

| 値 | 説明 |
|---|------|
| `Project` | プロジェクトルート |
| `Module` | モジュール |
| `Namespace` | 名前空間 |
| `Enum` | 列挙型 |
| `EnumMember` | 列挙型メンバー |
| `Variable` | 変数 |
| `Function` | 関数 |
| `Class` | クラス |
| `Interface` | インターフェース |
| `Constructor` | コンストラクタ |
| `Property` | プロパティ |
| `Method` | メソッド |
| `CallSignature` | 呼び出しシグネチャ |
| `IndexSignature` | インデックスシグネチャ |
| `ConstructorSignature` | コンストラクタシグネチャ |
| `Parameter` | パラメータ |
| `TypeLiteral` | 型リテラル |
| `TypeParameter` | 型パラメータ |
| `Accessor` | アクセサ |
| `GetSignature` | getter シグネチャ |
| `SetSignature` | setter シグネチャ |
| `TypeAlias` | 型エイリアス |
| `Reference` | リファレンス |
| `Document` | ドキュメント |

## コード例

### Reflection の走査

```typescript
import {
  Application,
  Converter,
  Context,
  DeclarationReflection,
  ReflectionKind,
} from "typedoc";

export function load(app: Application) {
  app.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    const project = context.project;

    // すべてのクラスを取得
    const classes = project.getReflectionsByKind(ReflectionKind.Class);
    for (const cls of classes) {
      if (cls.isDeclaration()) {
        console.log(`Class: ${cls.name}`);

        // メソッドを取得
        const methods = cls.getChildrenByKind(ReflectionKind.Method);
        for (const method of methods) {
          console.log(`  Method: ${method.name}`);
        }
      }
    }
  });
}
```

### Reflection の修正

```typescript
import { Application, Converter, DeclarationReflection } from "typedoc";

export function load(app: Application) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (_context: Context, reflection: DeclarationReflection) => {
      // コメントの追加
      if (!reflection.comment) {
        reflection.comment = new Comment();
      }

      // Reflection の削除
      if (reflection.name.startsWith("__internal")) {
        const project = reflection.project;
        project.removeReflection(reflection);
      }
    }
  );
}
```

### ビジターパターン

```typescript
import { ReflectionVisitor } from "typedoc";

const visitor: ReflectionVisitor = {
  declaration(reflection) {
    console.log(`Declaration: ${reflection.name}`);
  },
  signature(reflection) {
    console.log(`Signature: ${reflection.name}`);
  },
  parameter(reflection) {
    console.log(`Parameter: ${reflection.name}`);
  },
};

project.visit(visitor);
```

## 関連

- [Types](./types.md)
- [Converter](./converter.md)
- [Serialization](./serialization.md)
- [アーキテクチャ概要](../development/overview.md)
