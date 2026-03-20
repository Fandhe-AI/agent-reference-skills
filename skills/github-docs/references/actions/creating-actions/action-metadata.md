# GitHub Actions -- action.yml メタデータ構文

カスタムアクションの `action.yml` メタデータファイルの構文リファレンス。

公式ドキュメント: https://docs.github.com/en/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions

---

## トップレベルキー

| キー | 必須 | 説明 |
|---|---|---|
| `name` | はい | アクションの表示名。Actions タブや Marketplace で表示される |
| `description` | はい | アクションの簡単な説明 |
| `author` | いいえ | アクションの作者名 |
| `inputs` | いいえ | 入力パラメータの定義 |
| `outputs` | いいえ | 出力パラメータの定義 |
| `runs` | はい | 実行構成 |
| `branding` | いいえ | Marketplace でのブランディング設定 |

---

## inputs

アクションが受け取る入力パラメータを定義する。

```yaml
inputs:
  node-version:
    description: 'Node.js version to use'
    required: true
  cache:
    description: 'Enable caching'
    required: false
    default: 'true'
  old-param:
    description: 'Deprecated parameter'
    deprecationMessage: 'Use new-param instead'
```

### 入力のプロパティ

| プロパティ | 必須 | 説明 |
|---|---|---|
| `description` | はい | 入力の説明 |
| `required` | いいえ | 必須かどうか。デフォルト: `false` |
| `default` | いいえ | デフォルト値（文字列） |
| `deprecationMessage` | いいえ | 非推奨メッセージ。使用されると警告が表示される |

### 入力 ID のルール

- 英数字、`-`（ハイフン）、`_`（アンダースコア）が使用可能
- 英字または `_` で始まる必要がある
- 大文字小文字を区別しない

### 環境変数としてのアクセス

入力は `INPUT_<NAME>` 環境変数として自動的に設定される:
- 大文字に変換される
- スペースは `_` に変換される
- 例: `who-to-greet` → `INPUT_WHO-TO-GREET`

---

## outputs

アクションが提供する出力パラメータを定義する。

### Docker / JavaScript アクション

```yaml
outputs:
  version:
    description: 'The detected version'
  status:
    description: 'Build status'
```

| プロパティ | 必須 | 説明 |
|---|---|---|
| `description` | はい | 出力の説明 |

### 複合アクション

複合アクションでは追加で `value` キーが必須。

```yaml
outputs:
  version:
    description: 'The detected version'
    value: ${{ steps.detect.outputs.version }}
```

| プロパティ | 必須 | 説明 |
|---|---|---|
| `description` | はい | 出力の説明 |
| `value` | はい | 出力値（ステップの出力を参照） |

### 出力の制限

| 項目 | 制限 |
|---|---|
| ジョブあたりの出力 | 最大 1 MB |
| ワークフローあたりの出力合計 | 最大 50 MB |

---

## runs

アクションの実行方法を定義する。3 つのタイプがある。

### JavaScript アクション

```yaml
runs:
  using: 'node20'
  main: 'dist/index.js'
  pre: 'dist/setup.js'
  pre-if: runner.os == 'Linux'
  post: 'dist/cleanup.js'
  post-if: always()
```

| キー | 必須 | 説明 |
|---|---|---|
| `using` | はい | `node20` または `node24` |
| `main` | はい | エントリポイントファイル |
| `pre` | いいえ | `main` の前に実行されるセットアップスクリプト |
| `pre-if` | いいえ | `pre` の実行条件。デフォルト: `always()` |
| `post` | いいえ | `main` の後に実行されるクリーンアップスクリプト |
| `post-if` | いいえ | `post` の実行条件。デフォルト: `always()` |

### Docker コンテナアクション

```yaml
runs:
  using: 'docker'
  image: 'Dockerfile'
  entrypoint: '/entrypoint.sh'
  args:
    - ${{ inputs.who-to-greet }}
  env:
    CUSTOM_VAR: 'value'
  pre-entrypoint: 'setup.sh'
  post-entrypoint: 'cleanup.sh'
```

| キー | 必須 | 説明 |
|---|---|---|
| `using` | はい | `docker` |
| `image` | はい | Docker イメージ（`Dockerfile` またはDocker イメージ参照） |
| `entrypoint` | いいえ | Dockerfile の ENTRYPOINT を上書き |
| `args` | いいえ | ENTRYPOINT に渡す引数の配列 |
| `env` | いいえ | コンテナ内の環境変数 |
| `pre-entrypoint` | いいえ | `entrypoint` の前に実行されるスクリプト |
| `post-entrypoint` | いいえ | `entrypoint` の後に実行されるスクリプト |

#### image の形式

```yaml
# ローカル Dockerfile
image: 'Dockerfile'

# Docker Hub
image: 'docker://alpine:3.18'

# GitHub Container Registry
image: 'docker://ghcr.io/owner/image:tag'
```

### 複合アクション

```yaml
runs:
  using: 'composite'
  steps:
    - name: Setup
      uses: actions/setup-node@v4
      with:
        node-version: '20'

    - name: Build
      run: npm run build
      shell: bash
      working-directory: ./src

    - name: Test
      run: npm test
      shell: bash
      if: inputs.skip-tests != 'true'
      continue-on-error: true
      env:
        CI: true
```

| キー | 必須 | 説明 |
|---|---|---|
| `using` | はい | `composite` |
| `steps` | はい | 実行ステップの配列 |

#### ステップで使用可能なキー

| キー | 必須 | 説明 |
|---|---|---|
| `run` | `uses` と排他 | シェルコマンド |
| `shell` | `run` 使用時は必須 | シェルの種類 |
| `uses` | `run` と排他 | 使用するアクション |
| `with` | いいえ | アクションへの入力 |
| `name` | いいえ | ステップの表示名 |
| `id` | いいえ | ステップ ID |
| `if` | いいえ | 実行条件 |
| `env` | いいえ | 環境変数 |
| `working-directory` | いいえ | ワーキングディレクトリ |
| `continue-on-error` | いいえ | 失敗しても続行するか |

---

## branding

GitHub Marketplace でアクションを視覚的に識別するためのブランディング設定。

```yaml
branding:
  icon: 'package'
  color: 'blue'
```

### icon

Feather アイコン（v4.28.0）の名前を指定する。

使用可能なアイコン例:
`activity`, `airplay`, `alert-circle`, `alert-triangle`, `anchor`, `archive`, `arrow-*`, `at-sign`, `award`, `bar-chart`, `bell`, `bluetooth`, `bold`, `book`, `bookmark`, `box`, `briefcase`, `calendar`, `camera`, `cast`, `check-*`, `chevron-*`, `chrome`, `circle`, `clipboard`, `clock`, `cloud`, `code`, `command`, `compass`, `copy`, `cpu`, `credit-card`, `crop`, `crosshair`, `database`, `delete`, `disc`, `download`, `droplet`, `edit`, `external-link`, `eye`, `fast-forward`, `feather`, `file`, `film`, `filter`, `flag`, `folder`, `gift`, `git-*`, `globe`, `grid`, `hard-drive`, `hash`, `headphones`, `heart`, `help-circle`, `home`, `image`, `inbox`, `info`, `italic`, `layers`, `layout`, `life-buoy`, `link`, `list`, `lock`, `log-*`, `mail`, `map`, `maximize`, `menu`, `message-*`, `mic`, `minimize`, `minus`, `monitor`, `moon`, `more-*`, `move`, `music`, `navigation`, `octagon`, `package`, `paperclip`, `pause`, `pen-tool`, `percent`, `phone`, `pie-chart`, `play`, `plus`, `pocket`, `power`, `printer`, `radio`, `refresh-*`, `repeat`, `rewind`, `rotate-*`, `rss`, `save`, `scissors`, `search`, `send`, `server`, `settings`, `share`, `shield`, `shopping-*`, `shuffle`, `sidebar`, `skip-*`, `slash`, `sliders`, `smartphone`, `speaker`, `square`, `star`, `stop-circle`, `sun`, `sunrise`, `sunset`, `tablet`, `tag`, `target`, `terminal`, `thermometer`, `thumbs-*`, `toggle-*`, `trash`, `trending-*`, `triangle`, `truck`, `tv`, `type`, `umbrella`, `underline`, `unlock`, `upload`, `user`, `users`, `video`, `voicemail`, `volume`, `watch`, `wifi`, `wind`, `x`, `x-circle`, `x-square`, `zap`, `zoom-*`

使用不可のアイコン: `coffee`, `columns`, `divide-circle`, `divide-square`, `divide`, `frown`, `hexagon`, `key`, `meh`, `mouse-pointer`, `smile`, `tool`, `x-octagon`

### color

使用可能な色:
`white`, `black`, `yellow`, `blue`, `green`, `orange`, `red`, `purple`, `gray-dark`

---

## 完全な例

### JavaScript アクション

```yaml
name: 'Setup and Cache Dependencies'
description: 'Install Node.js and cache npm dependencies'
author: 'Your Name'

branding:
  icon: 'package'
  color: 'green'

inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '20'
  working-directory:
    description: 'Working directory'
    required: false
    default: '.'

outputs:
  cache-hit:
    description: 'Whether cache was hit'

runs:
  using: 'node20'
  main: 'dist/index.js'
  post: 'dist/cleanup.js'
  post-if: success()
```

### Docker アクション

```yaml
name: 'Custom Linter'
description: 'Run custom linting on the codebase'
author: 'Your Name'

branding:
  icon: 'check-circle'
  color: 'blue'

inputs:
  config-path:
    description: 'Path to linter config'
    required: false
    default: '.lintrc.yml'

outputs:
  issues-found:
    description: 'Number of issues found'

runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - '--config'
    - ${{ inputs.config-path }}
```

### 複合アクション

```yaml
name: 'Build and Test'
description: 'Build the project and run tests'
author: 'Your Name'

inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '20'

outputs:
  test-result:
    description: 'Test execution result'
    value: ${{ steps.test.outputs.result }}

runs:
  using: 'composite'
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'

    - run: npm ci
      shell: bash

    - run: npm run build
      shell: bash

    - id: test
      run: |
        npm test && echo "result=pass" >> $GITHUB_OUTPUT || echo "result=fail" >> $GITHUB_OUTPUT
      shell: bash
```
