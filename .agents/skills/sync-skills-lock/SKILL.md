---
name: sync-skills-lock
description: ルート直下の `skills-lock.json` の `computedHash` を upstream リポジトリの最新状態と照合して更新する。`source` が `Fandhe-AI/` で始まらないエントリは clone せず skip (安全弁)。submodule 配下の `skills-lock.json` は触らない。contribute-skill のマージ後や upstream 同期後、「ハッシュ更新」「skills-lock 同期」などで使用。
argument-hint: "[skill-name] (省略時は全スキル)"
user-invocable: true
model: sonnet
---

# sync-skills-lock

ルート直下の `skills-lock.json` の `computedHash` を、upstream リポジトリの現状と照合して更新する。

## 対象ファイル

- **ルート**: 呼び出し元リポジトリ直下の `skills-lock.json` — このスキルが唯一編集するファイル
- **除外**: submodule 配下の `skills-lock.json` — submodule 境界を跨がないため **絶対に触らない**

## 前提条件

- `gh` CLI がインストールされ、認証済みであること
- `node` / `npx` が利用可能であること（`npx skills add` を使用するため）
- ルート直下の `skills-lock.json` が存在すること

## フロー

### Step 1: 引数を確認する

```bash
TARGET="$ARGUMENTS"  # 空なら全スキル対象
```

引数ありの場合は該当スキルのみ処理、なしの場合は `skills-lock.json` の全エントリを対象にする。

### Step 2: upstream 一覧を集計する

`skills-lock.json` を読み、`source` フィールドごとにスキルをグルーピングする（同一リポへの処理を 1 回にまとめるため）。

```
Fandhe-AI/agent-cli-skills:
  - create-commit
  - create-issue
  - ...
```

### Step 3: source を検証する

**安全弁**: 処理前に必ず `source` フィールドが信頼された prefix で始まっていることを確認する。`Fandhe-AI/` の短縮形と `https://github.com/Fandhe-AI/` の URL 形式の両方を許可する。想定外の source は skip してユーザーに警告する。`skills-lock.json` の改ざん・誤設定によって untrusted リポジトリから clone することを防ぐためである。

```bash
case "$SOURCE" in
  Fandhe-AI/*)
    ;; # 短縮形 OK
  https://github.com/Fandhe-AI/*)
    ;; # URL 形式 OK
  *)
    echo "警告: 想定外の source: $SOURCE — このスキルは skip します"
    continue
    ;;
esac
```

### Step 4: npx skills add で computedHash を更新する

`sha256sum` などで手動計算するのではなく、`npx skills add` に計算を任せる。これにより CLI の内部アルゴリズムと完全に一致する。

```bash
# CLI に computedHash を更新させる（--yes で確認プロンプトをスキップ）
npx skills add "${SOURCE}" --skill "${SKILL_NAME}" --yes

# 変更確認
git diff skills-lock.json
```

`npx skills add` は以下を行う:

- upstream の最新スキルをダウンロード
- インストール先（`.agents/skills/<name>/`）を最新化
- `skills-lock.json` の `computedHash` を CLI 算出値で更新

**重要な副作用**: `npx skills add` はインストール済みファイルを最新の upstream 版で上書きする。upstream との同期が目的のため、これは意図した動作である。

**注意**: このコマンドは即座に `skills-lock.json` と `.agents/skills/<name>/` を書き換える。ユーザー承認（Step 6）の前に変更が確定するため、承認しない場合は Step 6 の案内に従いリバートが必要。

### Step 5: 差分を表示する

```bash
git diff skills-lock.json
```

変更点を確認し、更新された `computedHash` の内容をユーザーに提示する。

### Step 6: ユーザーに承認を求める

差分がある場合のみ、ユーザーに「この更新を適用してよいか」を確認する。

承認がなければ以下のコマンドで変更を元に戻してから中止する（`<name>` は対象スキル名に置換）:

```bash
# skills-lock.json をリバート
git checkout skills-lock.json

# インストール済みスキルファイルをリバート（<name> を置換）
git checkout -- .agents/skills/<name>/
```

変更を元に戻した後、作業を中止する。

### Step 7: git add する

`npx skills add` がすでに `skills-lock.json` と `.agents/skills/<name>/` を更新済みのため、ファイル更新は不要。ステージングのみ行う。

```bash
# skills-lock.json と対象スキルのファイルのみをステージング（他スキルの変更を混入させない）
git add skills-lock.json
git add ".agents/skills/${SKILL_NAME}/"
```

### Step 8: コミット提案

```bash
git commit -m "$(cat <<'EOF'
chore(skills-lock): upstream の最新ハッシュと同期

<変更内容の要約>
EOF
)"
```

ユーザーにコミットしてよいか確認する。差分がなかった場合はコミットせずその旨を伝える。

## 注意事項

- **ルートの `skills-lock.json` のみを編集**: submodule 配下は手を付けない
- **source prefix 検証（必須）**: `source` が `Fandhe-AI/` または `https://github.com/Fandhe-AI/` で始まらないエントリは skip する（`contribute-skill` と同じ安全弁）。`skills-lock.json` の改ざんや誤設定から防御するため
- **`npx skills add --yes` は上書き確認をスキップする**: upstream に破壊的変更がある場合は `git diff` で内容を必ず確認すること
- **新スキルの取扱い**: ローカルに存在するが upstream に未登録のスキル（`contribute-skill`, `sync-skills-lock` 自身など）は、upstream マージ後に登録する。マージ前に `computedHash` を勝手に書き込まない
- **sandbox 環境での実行**: ネットワーク越しの GitHub 操作には `GIT_SSL_NO_VERIFY=1` の併用を検討する（詳細は `docs/sandbox-tls.md` を参照）

## 既存スキルとの関係

- `contribute-skill` でスキル改修が upstream にマージされた後に本スキルを実行する運用を推奨
- `create-commit` の Conventional Commits を踏襲（Step 8）
- 実行可能コマンド集として `script/skills-lock-update.sh` を参照
