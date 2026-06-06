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
- **実行前に `skills-lock.json` に未コミットの変更がないこと**（ステージ済み・未ステージ問わず）。本スキルの実行中に発生する変更は sync 由来のみとなり、`git add skills-lock.json` で全体をステージしても無関係な変更が混入しない
- **対象スキルの `.agents/skills/<name>/` に未コミット変更がないこと**。`npx skills add` は `.agents/skills/<name>/` を upstream の最新版で上書きするため、そのディレクトリに WIP が存在すると即座に失われる。`git checkout` で戻せるのは「最後にコミットされた状態」のみであり、npx 実行前の未コミット編集は復元できない

## フロー

### Step 1: 引数を確認し、事前条件を検証する

```bash
TARGET="$ARGUMENTS"  # 空なら全スキル対象
```

引数ありの場合は該当スキルのみ処理、なしの場合は `skills-lock.json` の全エントリを対象にする。

次に `skills-lock.json` の clean 状態を確認する。未コミット変更（ステージ済み・未ステージ問わず）があれば中止する。

```bash
# skills-lock.json に未コミット変更があれば中止（sync 由来以外の変更の混入を防ぐ）
if ! git diff --quiet -- skills-lock.json || ! git diff --cached --quiet -- skills-lock.json; then
  echo "エラー: skills-lock.json に未コミットの変更があります。コミットまたは退避してから再実行してください。"
  exit 1
fi
```

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

### Step 4–7: 対象スキルを1つずつ処理する（ループ）

対象スキルそれぞれについて、次の 4→5→6→7 を順に実行し、**1スキル完了後に次スキルへ進む**。全スキル sync であっても同時に複数スキルを処理せず、1スキルずつ完結させること。

#### Step 4: npx skills add で computedHash を更新する

`sha256sum` などで手動計算するのではなく、`npx skills add` に計算を任せる。これにより CLI の内部アルゴリズムと完全に一致する。

```bash
# 当該スキルの install ツリーに未コミット変更があれば npx が上書きするため skip
if ! git diff --quiet -- ".agents/skills/${SKILL_NAME}/" || ! git diff --cached --quiet -- ".agents/skills/${SKILL_NAME}/"; then
  echo "警告: .agents/skills/${SKILL_NAME}/ に未コミット変更があります。npx の上書きで失われるため skip します。"
  continue
fi

# CLI に computedHash を更新させる（--yes で確認プロンプトをスキップ）
npx skills add "${SOURCE}" --skill "${SKILL_NAME}" --yes
```

`npx skills add` は以下を行う:

- upstream の最新スキルをダウンロード
- インストール先（`.agents/skills/<name>/`）を最新化
- `skills-lock.json` の `computedHash` を CLI 算出値で更新

**重要な副作用**: `npx skills add` はインストール済みファイルを最新の upstream 版で上書きする。upstream との同期が目的のため、これは意図した動作である。上記の per-skill clean ガードにより、WIP がある場合は npx 実行前に skip するため、未コミット編集の消失は防止される。

**注意**: clean ガードを通過したスキルについては、npx が即座に `skills-lock.json` と `.agents/skills/<name>/` を書き換える。ユーザー承認（Step 6）の前に変更が確定するため、承認しない場合は Step 6 の案内に従いリバートが必要。

#### Step 5: 当該スキルの差分を表示する

```bash
# 当該スキルにスコープした差分のみ表示する
git diff skills-lock.json ".agents/skills/${SKILL_NAME}/"
```

変更点を確認し、更新された `computedHash` の内容をユーザーに提示する。

#### Step 6: ユーザーに当該スキルの承認を求める

差分がある場合のみ、ユーザーに「この更新を適用してよいか」を確認する。

**却下された場合**は当該スキルのみ即座にリバートして**次スキルへ continue**する（全体を中止しない）:

```bash
# 当該スキルの変更のみをリバート
git checkout -- skills-lock.json ".agents/skills/${SKILL_NAME}/"
```

このリバートは「次スキルの `npx skills add` 実行前」に行うため、`skills-lock.json` から戻るのは当該スキル分のみである。承認済みの他スキルはすでに stage 済みのため影響を受けない。

#### Step 7: 承認されたスキルを stage する（ループ内で積み上げる）

```bash
# 当該スキルのファイルのみをステージング
git add skills-lock.json ".agents/skills/${SKILL_NAME}/"
```

`skills-lock.json` は単一 JSON ファイルのため行単位での部分ステージは現実的でない。しかし Step 1 の事前ガードで実行開始時の clean 状態を保証しているため、ファイル全体をステージしても sync 由来の変更のみが含まれ、無関係な編集が混入することはない。このコマンドをループ内で実行することで、複数スキルの全スキル sync でも処理した全スキルが過不足なく stage に積み上がる。

### Step 8: コミット提案（ループ後に1回だけ実行）

ループ完了後、stage 済みの全承認スキルをまとめて1コミットにする。

```bash
git commit -m "$(cat <<'EOF'
chore(skills-lock): upstream の最新ハッシュと同期

<変更内容の要約>
EOF
)"
```

ユーザーにコミットしてよいか確認する。承認済みスキルが1つもなかった場合（全却下・差分なし）はコミットせずその旨を伝える。

## 注意事項

- **全スキル sync での途中却下**: 1スキルずつ承認・stage を行うため、途中で却下しても承認済みスキルの stage は保持される。全スキル処理後に一括コミットする
- **`skills-lock.json` は実行前 clean 前提で全体をステージする**: 単一 JSON ファイルのため部分ステージは現実的でない。Step 1 の事前ガードで clean を保証し、sync 由来以外の変更の混入を防ぐ
- **ルートの `skills-lock.json` のみを編集**: submodule 配下は手を付けない
- **source prefix 検証（必須）**: `source` が `Fandhe-AI/` または `https://github.com/Fandhe-AI/` で始まらないエントリは skip する（`contribute-skill` と同じ安全弁）。`skills-lock.json` の改ざんや誤設定から防御するため
- **`npx skills add --yes` は上書き確認をスキップする**: upstream に破壊的変更がある場合は `git diff` で内容を必ず確認すること
- **新スキルの取扱い**: ローカルに存在するが upstream に未登録のスキル（`contribute-skill`, `sync-skills-lock` 自身など）は、upstream マージ後に登録する。マージ前に `computedHash` を勝手に書き込まない
- **sandbox 環境での実行**: ネットワーク越しの GitHub 操作には `GIT_SSL_NO_VERIFY=1` の併用を検討する（詳細は `docs/sandbox-tls.md` を参照）

## 既存スキルとの関係

- `contribute-skill` でスキル改修が upstream にマージされた後に本スキルを実行する運用を推奨
- `create-commit` の Conventional Commits を踏襲（Step 8）
- 実行可能コマンド集として `script/skills-lock-update.sh` を参照
