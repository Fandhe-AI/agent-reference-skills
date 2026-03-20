# GitHub Actions -- JavaScript アクション

JavaScript アクションの作成方法のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-javascript-action

---

## 概要

JavaScript アクションは Node.js ランタイムで実行され、Linux、Windows、macOS の全ランナーで動作する。`@actions/core` や `@actions/github` などの公式ツールキットを使用して GitHub API と対話する。

---

## プロジェクトセットアップ

```bash
mkdir my-action && cd my-action
npm init -y
npm install @actions/core @actions/github
```

---

## action.yml メタデータ

```yaml
name: 'My JavaScript Action'
description: 'Description of what this action does'
author: 'Your Name'

inputs:
  who-to-greet:
    description: 'Who to greet'
    required: true
    default: 'World'

outputs:
  time:
    description: 'The time we greeted you'

runs:
  using: 'node20'
  main: 'dist/index.js'
```

### runs セクションのキー

| キー | 必須 | 説明 |
|---|---|---|
| `using` | はい | Node.js ランタイムバージョン: `node20` または `node24` |
| `main` | はい | アクションのエントリポイントファイル |
| `pre` | いいえ | `main` の前に実行されるセットアップスクリプト |
| `pre-if` | いいえ | `pre` スクリプトの実行条件 |
| `post` | いいえ | `main` の後に実行されるクリーンアップスクリプト |
| `post-if` | いいえ | `post` スクリプトの実行条件 |

---

## @actions/core パッケージ

ワークフローコマンド、入出力変数、終了ステータス、デバッグメッセージへのインターフェース。

### 主要関数

```javascript
import * as core from '@actions/core';

// 入力の取得
const name = core.getInput('who-to-greet');            // 必須入力
const debug = core.getInput('debug', { required: false }); // オプション入力
const list = core.getMultilineInput('items');           // 複数行入力

// 出力の設定
core.setOutput('time', new Date().toTimeString());

// ログ出力
core.debug('Debug message');      // デバッグ（ACTIONS_STEP_DEBUG=true 時のみ表示）
core.info('Info message');        // 情報
core.notice('Notice message');    // 通知（アノテーション）
core.warning('Warning message');  // 警告（アノテーション）
core.error('Error message');      // エラー（アノテーション）

// ログのグループ化
core.startGroup('Group name');
core.info('Grouped message');
core.endGroup();

// 環境変数の設定
core.exportVariable('MY_VAR', 'value');

// PATH への追加
core.addPath('/custom/path');

// シークレットのマスキング
core.setSecret('sensitive-value');

// 失敗の設定
core.setFailed('Action failed with error');

// 状態の保存（pre/post スクリプト間で共有）
core.saveState('key', 'value');
const state = core.getState('key');
```

---

## @actions/github パッケージ

認証済み Octokit REST クライアントと GitHub Actions コンテキストへのアクセスを提供する。

```javascript
import * as github from '@actions/github';

// コンテキストへのアクセス
const { context } = github;
console.log(context.repo);         // { owner: '...', repo: '...' }
console.log(context.sha);          // コミット SHA
console.log(context.ref);          // ref
console.log(context.actor);        // アクター
console.log(context.workflow);     // ワークフロー名
console.log(context.payload);      // webhook ペイロード
console.log(context.eventName);    // イベント名

// 認証済み Octokit クライアント
const octokit = github.getOctokit(core.getInput('github-token'));

// API 呼び出し例: Issue へのコメント
await octokit.rest.issues.createComment({
  ...context.repo,
  issue_number: context.issue.number,
  body: 'Hello from my action!',
});

// API 呼び出し例: PR のファイル一覧
const { data: files } = await octokit.rest.pulls.listFiles({
  ...context.repo,
  pull_number: context.payload.pull_request.number,
});
```

---

## アクションコードの例

```javascript
// src/index.js
import * as core from '@actions/core';
import * as github from '@actions/github';

try {
  // 入力の取得
  const nameToGreet = core.getInput('who-to-greet');
  core.info(`Hello ${nameToGreet}!`);

  // 出力の設定
  const time = new Date().toTimeString();
  core.setOutput('time', time);

  // webhook ペイロードの取得
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  core.debug(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```

---

## ビルドとバンドル

`node_modules` をコミットする代わりに、バンドラーを使用してアクションコードと依存関係を 1 つのファイルにまとめる。

### Rollup を使用

```bash
npm install --save-dev rollup @rollup/plugin-commonjs @rollup/plugin-node-resolve
```

```javascript
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    esModule: true,
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [commonjs(), nodeResolve({ preferBuiltins: true })],
};
```

```bash
npx rollup --config rollup.config.js
```

### ncc を使用（代替）

```bash
npm install --save-dev @vercel/ncc
npx ncc build src/index.js -o dist
```

---

## プロジェクト構造

```
my-action/
  action.yml
  src/
    index.js
  dist/
    index.js       # バンドル済み（コミットする）
  package.json
  package-lock.json
  rollup.config.js
  README.md
```

---

## リリースとバージョニング

```bash
git add action.yml dist/ package.json package-lock.json
git commit -m "Initial release"
git tag -a v1.0.0 -m "Release v1.0.0"
git tag -fa v1 -m "Update v1 tag"   # メジャーバージョンタグを更新
git push origin main --follow-tags
git push origin v1 --force           # メジャーバージョンタグを強制更新
```

ユーザーは以下のように参照する:
- `uses: owner/my-action@v1` -- メジャーバージョン（推奨）
- `uses: owner/my-action@v1.0.0` -- 正確なバージョン
- `uses: owner/my-action@abc123` -- コミット SHA（最も安全）

---

## pre/post スクリプト

セットアップとクリーンアップの処理を分離できる。

```yaml
runs:
  using: 'node20'
  pre: 'dist/setup.js'
  pre-if: runner.os == 'Linux'
  main: 'dist/index.js'
  post: 'dist/cleanup.js'
  post-if: always()
```

`pre` と `post` スクリプト間で状態を共有するには `core.saveState()` と `core.getState()` を使用する。
