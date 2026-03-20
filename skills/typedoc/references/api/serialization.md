# Serialization

TypeDoc のシリアライゼーションシステム。Reflection モデルと JSON 間の変換を行う Serializer と Deserializer クラス。

## シグネチャ

### Serializer

```typescript
class Serializer extends EventDispatcher<SerializerEvents> {
  // 静的イベント
  static readonly EVENT_BEGIN: "begin";
  static readonly EVENT_END: "end";

  // プロパティ
  projectRoot: NormalizedPath;
  project: Models.ProjectReflection;

  // コアメソッド
  projectToObject(
    value: Models.ProjectReflection,
    projectRoot: NormalizedPath
  ): JSONOutput.ProjectReflection;

  toObject<T extends { toObject(serializer: Serializer): ModelToObject<T> }>(
    value: T | undefined
  ): ModelToObject<T> | undefined;

  toObjectsOptional<T extends { toObject(serializer: Serializer): ModelToObject<T> }>(
    value: T[] | undefined
  ): ModelToObject<T>[] | undefined;

  // コンポーネント管理
  addSerializer<T extends object>(serializer: SerializerComponent<T>): void;
  removeSerializer(serializer: SerializerComponent<any>): void;

  // イベントメソッド
  on<K extends keyof SerializerEvents>(
    event: K,
    listener: (...args: SerializerEvents[K]) => void,
    priority?: number
  ): void;
  off<K extends keyof SerializerEvents>(
    event: K,
    listener: (...args: SerializerEvents[K]) => void
  ): void;
  trigger<K extends keyof SerializerEvents>(
    event: K,
    ...args: SerializerEvents[K]
  ): void;
}
```

### Deserializer

```typescript
class Deserializer {
  // プロパティ
  logger: Logger;
  projectRoot: NormalizedPath;
  oldIdToNewId: Record<ReflectionId, ReflectionId | undefined>;
  oldFileIdToNewFileId: Record<FileId, FileId | undefined>;
  project: ProjectReflection | undefined;
  reflectionBuilders: Record<string, Function>;
  typeBuilders: Record<string, Function>;

  // コアメソッド
  constructor(logger: Logger);

  reviveProject(
    name: string,
    projectObj: JSONOutput.ProjectReflection,
    options: { projectRoot: NormalizedPath; registry: FileRegistry }
  ): ProjectReflection;

  reviveProjects(
    name: string,
    projects: readonly JSONOutput.ProjectReflection[],
    options: {
      projectRoot: NormalizedPath;
      registry: FileRegistry;
      alwaysCreateEntryPointModule: boolean;
    }
  ): ProjectReflection;

  revive<T>(obj: T | undefined): T | undefined;
  reviveMany<T>(arr: T[] | undefined): T[] | undefined;

  constructReflection<T>(obj: JSONOutput.Reflection): T;
  constructType(obj: JSONOutput.SomeType): Models.SomeType;
  reviveType(obj: JSONOutput.SomeType | undefined): Models.SomeType | undefined;

  fromObject<T>(receiver: T, obj: unknown): void;

  addDeserializer(deserializer: DeserializerComponent): void;
  defer(cb: (project: ProjectReflection) => void): void;
}
```

## 主要メソッド

### Serializer

#### projectToObject()

```typescript
projectToObject(
  value: Models.ProjectReflection,
  projectRoot: NormalizedPath
): JSONOutput.ProjectReflection
```

プロジェクト Reflection 全体を JSON オブジェクトに変換する。begin/end イベントを発火する。

#### toObject()

```typescript
toObject<T>(value: T | undefined): ModelToObject<T> | undefined
```

個々のモデルオブジェクトを JSON 表現に変換する。各モデルの `toObject()` メソッドを呼び出す。

#### toObjectsOptional()

```typescript
toObjectsOptional<T>(value: T[] | undefined): ModelToObject<T>[] | undefined
```

オプションのモデル配列をシリアライズする。

#### addSerializer()

```typescript
addSerializer<T extends object>(serializer: SerializerComponent<T>): void
```

カスタムシリアライザーコンポーネントを追加する。

#### removeSerializer()

```typescript
removeSerializer(serializer: SerializerComponent<any>): void
```

シリアライザーコンポーネントを削除する。

### Deserializer

#### reviveProject()

```typescript
reviveProject(
  name: string,
  projectObj: JSONOutput.ProjectReflection,
  options: { projectRoot: NormalizedPath; registry: FileRegistry }
): ProjectReflection
```

単一の JSON プロジェクトを ProjectReflection に復元する。

#### reviveProjects()

```typescript
reviveProjects(
  name: string,
  projects: readonly JSONOutput.ProjectReflection[],
  options: {
    projectRoot: NormalizedPath;
    registry: FileRegistry;
    alwaysCreateEntryPointModule: boolean;
  }
): ProjectReflection
```

複数の JSON プロジェクトを処理し、統合された ProjectReflection を返す。

#### constructReflection()

```typescript
constructReflection<T>(obj: JSONOutput.Reflection): T
```

JSON から Reflection インスタンスを構築する。`variant` フィールドに基づいて適切なクラスを選択する。

#### constructType()

```typescript
constructType(obj: JSONOutput.SomeType): Models.SomeType
```

JSON から Type インスタンスを構築する。`type` フィールドに基づいて適切なクラスを選択する。

#### defer()

```typescript
defer(cb: (project: ProjectReflection) => void): void
```

デシリアライゼーション完了後に実行されるコールバックを遅延登録する。相互参照の解決に使用する。

## 主要プロパティ

### Serializer プロパティ

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `projectRoot` | `NormalizedPath` | シリアライゼーション中に設定されるプロジェクトルート |
| `project` | `ProjectReflection` | シリアライゼーション中に設定されるプロジェクト |

### Deserializer プロパティ

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `logger` | `Logger` | ロギングインスタンス |
| `projectRoot` | `NormalizedPath` | デシリアライゼーション中に設定される |
| `oldIdToNewId` | `Record<ReflectionId, ReflectionId \| undefined>` | 旧 ID から新 ID へのマッピング |
| `oldFileIdToNewFileId` | `Record<FileId, FileId \| undefined>` | 旧ファイル ID から新ファイル ID へのマッピング |
| `project` | `ProjectReflection \| undefined` | 現在のプロジェクト |
| `reflectionBuilders` | `object` | variant → ビルダー関数のマッピング |
| `typeBuilders` | `object` | type kind → ビルダー関数のマッピング |

## イベント

### Serializer イベント

| イベント | 値 | 説明 |
|--------|---|------|
| `EVENT_BEGIN` | `"begin"` | シリアライゼーション開始時 |
| `EVENT_END` | `"end"` | シリアライゼーション完了時 |

## JSONOutput 名前空間

シリアライズされた JSON の型定義。外部ツールで TypeDoc の JSON 出力を消費する際に使用する。

### 主要インターフェース

```typescript
namespace JSONOutput {
  interface ProjectReflection {
    id: number;
    name: string;
    variant: "project";
    kind: number;
    children?: DeclarationReflection[];
    groups?: ReflectionGroup[];
    categories?: ReflectionCategory[];
    packageName?: string;
    packageVersion?: string;
    readme?: CommentDisplayPart[];
    // ...
  }

  interface DeclarationReflection {
    id: number;
    name: string;
    variant: "declaration";
    kind: number;
    type?: SomeType;
    signatures?: SignatureReflection[];
    children?: DeclarationReflection[];
    // ...
  }

  interface SignatureReflection {
    id: number;
    name: string;
    variant: "signature";
    kind: number;
    parameters?: ParameterReflection[];
    typeParameters?: TypeParameterReflection[];
    type?: SomeType;
    // ...
  }

  // SomeType は各型の JSON 表現のユニオン
  type SomeType =
    | ArrayType
    | ConditionalType
    | IndexedAccessType
    | InferredType
    | IntersectionType
    | IntrinsicType
    | LiteralType
    | MappedType
    | OptionalType
    | PredicateType
    | QueryType
    | ReferenceType
    | RestType
    | TemplateLiteralType
    | TupleType
    | TypeOperatorType
    | UnionType
    | UnknownType;
}
```

## コード例

### JSON への出力

```typescript
import { Application } from "typedoc";

const app = await Application.bootstrapWithPlugins({
  entryPoints: ["src/index.ts"],
});

const project = await app.convert();
if (project) {
  // JSON ファイルへの出力
  await app.generateJson(project, "./api.json");

  // プログラムから JSON オブジェクトを取得
  const jsonObj = app.serializer.projectToObject(project, "/path/to/project");
}
```

### JSON からの復元

```typescript
import { Application, Models } from "typedoc";
import * as fs from "fs";

const app = await Application.bootstrapWithPlugins();

const jsonData = JSON.parse(fs.readFileSync("./api.json", "utf-8"));
const project = app.deserializer.reviveProject(
  "MyProject",
  jsonData,
  {
    projectRoot: "/path/to/project" as any,
    registry: new Models.FileRegistry(),
  }
);

// 復元された ProjectReflection を使用
await app.generateDocs(project, "./docs");
```

### カスタムシリアライザー

```typescript
import { Application, Serializer, DeclarationReflection } from "typedoc";

export function load(app: Application) {
  // シリアライゼーション開始時のリスナー
  app.serializer.on(Serializer.EVENT_BEGIN, () => {
    app.logger.info("Serialization started");
  });

  // シリアライゼーション完了時のリスナー
  app.serializer.on(Serializer.EVENT_END, () => {
    app.logger.info("Serialization completed");
  });
}
```

### JSON 出力の後処理

```typescript
import { Application } from "typedoc";
import * as fs from "fs";

const app = await Application.bootstrapWithPlugins({
  entryPoints: ["src/index.ts"],
});

const project = await app.convert();
if (project) {
  const json = app.serializer.projectToObject(project, "/path/to/project");

  // JSON を加工
  const enhanced = {
    ...json,
    generatedAt: new Date().toISOString(),
    generatorVersion: Application.VERSION,
  };

  fs.writeFileSync("./api-enhanced.json", JSON.stringify(enhanced, null, 2));
}
```

## 注意点

- `Serializer` は `EventDispatcher` を継承し、begin/end イベントを発火する
- `Deserializer` はイベントを発火しない
- `JSONOutput` 名前空間の型は外部ツールで JSON を消費する際に有用
- `Deserializer.defer()` はデシリアライゼーション完了後に実行されるため、相互参照の解決に適している
- `oldIdToNewId` マッピングは複数プロジェクトを統合する際の ID 衝突を解決する
- JSON 出力の形式は TypeDoc のバージョン間で変更される可能性がある

## 関連

- [Application](./application.md)
- [Reflections](./reflections.md)
- [Types](./types.md)
- [アーキテクチャ概要](../development/overview.md)
