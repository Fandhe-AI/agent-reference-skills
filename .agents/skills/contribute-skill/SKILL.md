---
name: contribute-skill
description: ローカルで改修した `skills/<skill-name>/` を upstream リポジトリ (Fandhe-AI/agent-cli-skills 等) へ PR として投稿する。`skills-lock.json` の `source` を読み、`Fandhe-AI/` 以外への push は安全弁で中止。clone → 反映 → セキュリティチェック → ブランチ作成 → push → `gh pr create` を実行。マージ後は sync-skills-lock で hash 更新。「スキルを upstream に貢献」「外部リポジトリに PR」などで使用。
argument-hint: "<skill-name> (例: contribute-skill create-pr)"
user-invocable: true
model: sonnet
---

# contribute-skill

ローカルで改修した `skills/<skill-name>/` を、`skills-lock.json` に記録された upstream リポジトリへ PR として投稿します。

## 前提条件

- `gh` CLI がインストールされ認証済みであること（対象 org への push / PR 権限が必要）
- 対象スキルが `skills-lock.json` に登録されていること
- 対象スキルのローカル改修が最新のコミットに含まれ、作業ツリーが clean であること

## 責務の分離

- **create-pr**: 現在のリポジトリ内でカレントブランチから base へ PR を作成する
- **contribute-skill**: 別リポジトリ（upstream）へ clone → 変更反映 → push → PR 作成を行う

外部リポジトリ貢献は clone / path 変換 / 異なる認証境界が関わるため、別スキルとして分離しています。

## フロー

### Step 1: 引数を検証する

```bash
SKILL_NAME="$ARGUMENTS"

# 空判定ガード: パス解決の前に SKILL_NAME を確定させる
if [[ -z "${SKILL_NAME}" ]]; then
  echo "対象スキルを指定してください。候補:"
  ls -1 skills/ 2>/dev/null
  ls -1 .agents/skills/ 2>/dev/null
  echo "（lockfile 由来のスキルは .agents/skills/ のみに存在する場合がある）"
  exit 1   # ユーザーが選んだスキル名を引数に付けて再実行する
fi

# kebab-case 検証（パストラバーサル防止）: パス解決より前に実施する
if [[ ! "${SKILL_NAME}" =~ ^[a-z][a-z0-9-]+$ ]]; then
  echo "エラー: SKILL_NAME は小文字 kebab-case のみ許可されています: ${SKILL_NAME}"
  exit 1
fi

# override: 環境変数 LOCAL_SKILL_DIR が設定済みならそれを検証して使う
if [[ -n "${LOCAL_SKILL_DIR:-}" ]]; then
  if [[ "${LOCAL_SKILL_DIR}" != "skills/${SKILL_NAME}" && "${LOCAL_SKILL_DIR}" != ".agents/skills/${SKILL_NAME}" ]]; then
    echo "エラー: LOCAL_SKILL_DIR は skills/${SKILL_NAME} か .agents/skills/${SKILL_NAME} のいずれかを指定してください: ${LOCAL_SKILL_DIR}"
    exit 1
  fi
  if [[ ! -d "${LOCAL_SKILL_DIR}" ]]; then
    echo "エラー: 指定された LOCAL_SKILL_DIR が存在しません: ${LOCAL_SKILL_DIR}"
    exit 1
  fi
else
  # 自動解決（両方存在する場合は中止して override を促す）
  have_skills=0; have_agents=0
  [[ -d "skills/${SKILL_NAME}" ]] && have_skills=1
  [[ -d ".agents/skills/${SKILL_NAME}" ]] && have_agents=1
  if [[ "${have_skills}" -eq 1 && "${have_agents}" -eq 1 ]]; then
    echo "エラー: skills/${SKILL_NAME} と .agents/skills/${SKILL_NAME} の両方が存在します。"
    echo "環境変数 LOCAL_SKILL_DIR にどちらかを指定して再実行してください（例: LOCAL_SKILL_DIR=.agents/skills/${SKILL_NAME}）。"
    exit 1
  elif [[ "${have_skills}" -eq 1 ]]; then
    LOCAL_SKILL_DIR="skills/${SKILL_NAME}"
  elif [[ "${have_agents}" -eq 1 ]]; then
    LOCAL_SKILL_DIR=".agents/skills/${SKILL_NAME}"
  else
    echo "エラー: ローカルスキルが見つかりません: skills/${SKILL_NAME} / .agents/skills/${SKILL_NAME}"
    exit 1
  fi
fi
```

引数が空の場合はパス解決に進まず、`skills/` と `.agents/skills/` の候補一覧を表示して終了します。Claude はその一覧をユーザーに提示し、スキル名を選んでもらってから再実行を促してください。後続の Step では `${LOCAL_SKILL_DIR}/` を使ってローカルパスを参照します。
`skills/` と `.agents/skills/` の**両方にディレクトリが存在する場合は中止**し、環境変数 `LOCAL_SKILL_DIR` に改修対象のパス（`skills/<name>` か `.agents/skills/<name>` のいずれか）を指定して再実行するよう案内します（silently に `skills/` を優先しません）。環境変数 `LOCAL_SKILL_DIR` が設定済みの場合は、許可された2パスのいずれかであること・実在することを検証してから採用し、自動解決をスキップします。どちらにも存在しなければエラーで中止します。

### Step 2: upstream を特定する

ルートの `skills-lock.json` を読み、`skills.<SKILL_NAME>.source` を取り出します。

```bash
# jq が使えるなら jq で取得する
SOURCE=$(jq -r ".skills[\"${SKILL_NAME}\"].source" skills-lock.json)
SOURCE_TYPE=$(jq -r ".skills[\"${SKILL_NAME}\"].sourceType" skills-lock.json)

# 安全弁: Fandhe-AI org 以外への push を拒否する
# 1) まず正規化する（短縮形はそのまま、URL 形式は OWNER/REPO へ変換し末尾 .git を除去）
case "${SOURCE}" in
  https://github.com/*)
    REPO_SLUG="${SOURCE#https://github.com/}"
    REPO_SLUG="${REPO_SLUG%.git}"
    ;;
  *)
    REPO_SLUG="${SOURCE}"
    ;;
esac

# 2) 正規化後の値を厳密検証する: owner は Fandhe-AI 固定、repo は単一セグメントのみ許可する
#    [A-Za-z0-9._-]+ は '/'・'?'・'#'・空文字を含められないため、
#    パストラバーサル（../）・余剰パスセグメント・クエリ・フラグメントをすべて拒否できる
#    （前方一致 case では `Fandhe-AI/../../attacker/repo` のような値が誤って通過していた）
if [[ ! "${REPO_SLUG}" =~ ^Fandhe-AI/[A-Za-z0-9._-]+$ ]]; then
  echo "エラー: source '${SOURCE}' は Fandhe-AI/<repo> 形式ではありません。中止します。"
  exit 1
fi

# 3) '.'・'..' は上記正規表現を通過してしまうため repo 名として明示拒否する
#    （例: 'Fandhe-AI/..git' は .git 除去後に 'Fandhe-AI/.' へ化ける）
case "${REPO_SLUG#Fandhe-AI/}" in
  .|..)
    echo "エラー: source '${SOURCE}' の repository 名が不正です。中止します。"
    exit 1
    ;;
esac

# sourceType が github 以外なら中止（GitHub 以外の source は本スキルの想定外）
if [[ "${SOURCE_TYPE}" != "github" ]]; then
  echo "エラー: sourceType '${SOURCE_TYPE}' は github ではありません。中止します。"
  exit 1
fi
```

- `source` は正規化後の `OWNER/REPO` が `^Fandhe-AI/[A-Za-z0-9._-]+$` に完全一致する場合のみ許可します（安全弁：見知らぬリポジトリへ意図せず push しないため）。`../` を含むパストラバーサル・クエリ（`?x=1`）・フラグメント（`#frag`）・余剰パスセグメント（`/extra`）を含む値は正規表現に一致せずエラーで中止します。検証は必ず `.git` 除去などの正規化の**後**に行います（正規化前に検証すると `Fandhe-AI/..git` のような値が正規化後に別の値へ化けてすり抜けるため）。
- `sourceType` が `github` 以外の場合も **エラーで中止** します（GitHub 以外の source は本スキルの想定外であり、`gh repo clone` / `gh pr create` が正常動作しないため）。
- 正規化後の `REPO_SLUG` は以降の Step で `gh repo clone`・`gh pr create --repo` に利用します。

### Step 3: 変更内容を確認する

```bash
git log --oneline -- "${LOCAL_SKILL_DIR}/"
# HEAD~1 の有無を明示的に判定する（git diff は差分ありでも終了コード 0 のため || で分岐しない）
if git rev-parse --verify -q HEAD~1 >/dev/null; then
  git diff HEAD~1 HEAD -- "${LOCAL_SKILL_DIR}/"
else
  # 親コミットがない場合（初回コミット・shallow clone 等）は空ツリーと HEAD を比較する
  # （作業ツリー差分ではコミット済み・クリーンな状態で空になるため使わない）
  git diff "$(git hash-object -t tree /dev/null)" HEAD -- "${LOCAL_SKILL_DIR}/"
fi
```

ユーザーに「この改修内容で upstream に PR を作ってよいか」を確認します。

### Step 4: セキュリティチェック（必須）

`create-pr` と同様に以下をレビューします。

- 認証・認可の実装漏れ
- API キー・シークレットのハードコーディング
- XSS の可能性（ドキュメントでも外部埋め込みが含まれる場合）
- 入力バリデーションの欠如
- OWASP Top 10

問題があれば upstream 貢献を中止し、ユーザーに警告します。

### Step 5: 作業用ディレクトリを用意する

```bash
UID_VAL=$(id -u)
TS=$(date +%Y%m%d-%H%M%S)
# $TMPDIR が設定されていればそちらを優先する（サンドボックス互換: /tmp が書き込み不可の環境がある）
WORKDIR="${TMPDIR:-/tmp/claude-${UID_VAL}}/contribute-${SKILL_NAME}-${TS}"
mkdir -p "$WORKDIR"
```

### Step 6: upstream を clone する

```bash
# cd する前にローカルリポジトリのルートを捕捉する（cd - は stdout を汚染するため使用しない）
ORIG_DIR="$(pwd)"
gh repo clone "${REPO_SLUG}" "$WORKDIR/upstream"
cd "$WORKDIR/upstream"
```

デフォルトブランチを取得して `DEFAULT_BRANCH` に設定します。

```bash
DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's|refs/remotes/origin/||')
echo "デフォルトブランチ: ${DEFAULT_BRANCH:-main}"
```

### Step 7: 変更を反映する

upstream 側でスキルがどのパス構造に置かれているか確認します。`UPSTREAM_SKILL_PATH` の決定は、クローンしたリポジトリのレイアウトのみで判定します（`cd "$WORKDIR/upstream"` 済みの前提）。

`skills-lock.json` の `skillPath` はローカル install パスであり upstream リポジトリ内の配置ではないため、使用しません。

```bash
# upstream のスキル配置はクローンしたリポジトリのレイアウトで判定する
# （skills-lock.json の skillPath はローカル install パスであり upstream の配置ではないため使わない）
if [[ -d "skills/${SKILL_NAME}" ]]; then
  UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
elif [[ -d ".agents/skills/${SKILL_NAME}" ]]; then
  UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
elif [[ -d "skills" ]]; then
  # upstream が skills/ 配下で公開している慣習
  UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
elif [[ -d ".agents/skills" ]]; then
  # upstream が .agents/skills/ 配下で公開している慣習
  UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
else
  echo "警告: upstream にスキルルートが見つかりません。skills/ を既定として新規追加します。"
  UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
fi
```

`UPSTREAM_SKILL_PATH` が確定したらコピーを実行します。`cp -R` は追加・上書きのみで削除を伝搬しないため、ローカルで削除したファイルが upstream 側に残存してしまいます。これを避けるため、宛先ディレクトリを一度消してから作り直し、コピーし直す（delete-then-copy）方式を取ります。

```bash
# 削除伝搬のための同期: cp -R は削除を反映しないため、宛先を消してからコピーする
# 安全弁: 削除対象が clone 内の想定スキルパス（2 形態のみ）であることを検証してから rm する
case "${UPSTREAM_SKILL_PATH}" in
  "skills/${SKILL_NAME}"|".agents/skills/${SKILL_NAME}") ;;
  *)
    echo "エラー: 想定外の UPSTREAM_SKILL_PATH です: ${UPSTREAM_SKILL_PATH}"
    exit 1
    ;;
esac
rm -rf "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
# LOCAL_SKILL_DIR は Step 1 で解決済み（skills/<name>/ または .agents/skills/<name>/）
# ORIG_DIR は Step 6 で cd する前に捕捉済み（cd - は stdout 汚染のため使用しない）
cp -R "${ORIG_DIR}/${LOCAL_SKILL_DIR}/." "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}/"
```

削除対象は必ず `${WORKDIR}/upstream/` 配下（clone 用の一時ディレクトリ）に閉じ、`UPSTREAM_SKILL_PATH` が `skills/<name>` か `.agents/skills/<name>` の 2 形態以外なら `rm -rf` の前に中止します。新規スキル追加（宛先未存在）の場合も `rm -rf` は無害に成功し、直後の `mkdir -p` で作成されます。

### Step 8: 差分を確認する

```bash
cd "$WORKDIR/upstream"
git status
git diff
```

ユーザーに差分を見せ、内容が意図通りか確認します。

### Step 9: ブランチ作成・コミット

```bash
SLUG=$(date +%Y%m%d-%H%M%S)
git switch -c "contribute/${SKILL_NAME}-${SLUG}"
git add "${UPSTREAM_SKILL_PATH}/"
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

ローカルの skills/<SKILL_NAME>/ からの貢献。

EOF
)"
```

- `git add "${UPSTREAM_SKILL_PATH}/"` はパス指定 add のため、Step 7 の delete-then-copy で消えたファイルの削除（`D`）も含めて stage されます
- Conventional Commits 形式
- `--no-verify` は使用しない（pre-commit フックを通す）
- co-author は付けない（ローカル規約に合わせる）

### Step 10: push と PR 作成

```bash
git push -u origin "contribute/${SKILL_NAME}-${SLUG}"

# 貢献元リポジトリの OWNER/REPO を取得する（PR body の Source 節に使用。
# 本スキルは任意のリポジトリから実行されるため、特定リポジトリ名を固定しない）
SRC_REPO=$(git -C "${ORIG_DIR}" remote get-url origin 2>/dev/null \
  | sed -E 's#^(git@github\.com:|https://github\.com/)##; s#\.git$##')
[[ -n "${SRC_REPO}" ]] || SRC_REPO=$(basename "${ORIG_DIR}")

gh pr create \
  --repo "${REPO_SLUG}" \
  --base "${DEFAULT_BRANCH:-main}" \
  --title "<type>(<scope>): <subject>" \
  --body "$(cat <<'EOF'
## Summary

- <SKILL_NAME> の改修内容（箇条書き）

## Source

ローカルの <SRC_REPO> 側で改修後、`/contribute-skill <SKILL_NAME>` により投稿。

## Test plan

- [ ] SKILL.md を実際に Claude Code で実行
- [ ] Conventional Commits に沿ったメッセージ生成を確認
- [ ] エッジケース確認

EOF
)"
```

`--repo` には Step 2 で正規化した `${REPO_SLUG}`（`OWNER/REPO` 形式）を渡します。URL 形式から `OWNER/REPO` への変換は Step 2 の case 文で完了しています。

body の `<SRC_REPO>` は上で取得した貢献元リポジトリの `OWNER/REPO`（origin 未設定時はディレクトリ名）に置き換えます（heredoc はクォート済みのため Claude が実値で埋める。特定リポジトリ名のハードコード禁止）。

Draft PR を作成する場合は `--draft` を付けます（デフォルトはユーザー確認の上で決定）。

### Step 11: PR URL を返す & 後処理案内

- PR URL をユーザーに返す
- 「マージされたら `/sync-skills-lock` を実行して `skills-lock.json` の `computedHash` を更新してください」と案内
- 作業用ディレクトリ `$WORKDIR` は残したまま（成否が確定するまで）

## 注意事項

- **SKILL_NAME は kebab-case のみ許可**：`..` のような値によるパストラバーサルを防ぐため、空判定の直後・パス解決の前に `^[a-z][a-z0-9-]+$` で検証する（security.md A03/A01）
- **`skills/` と `.agents/skills/` の両方が存在する場合は中止**：silently に `skills/` を優先せず、環境変数 `LOCAL_SKILL_DIR` に改修対象パスを指定して再実行を求める。`LOCAL_SKILL_DIR` は `skills/<name>` か `.agents/skills/<name>` の2パスのみ受理し、任意パス指定によるパストラバーサルを防ぐ
- **source が Fandhe-AI org 以外の場合は中止**：前方一致（`Fandhe-AI/*` 等）ではなく、正規化（`.git` 除去等）後の `OWNER/REPO` が `^Fandhe-AI/[A-Za-z0-9._-]+$` に完全一致するかで判定する。`../` によるパストラバーサル・クエリ・フラグメント・余剰パスセグメントを含む値、および repo 名が `.`／`..` になる値は中止し、意図しない外部リポジトリへの push を防ぐ
- **セキュリティ問題が見つかった場合は中止**：修正後に再実行
- **upstream の配置はクローンしたリポジトリのレイアウトで判定する**：`skills-lock.json` の `skillPath` はローカル install パス（例: `.agents/skills/github-docs/SKILL.md`）であり、upstream リポジトリ内の配置ではない。`skillPath` の dirname を `UPSTREAM_SKILL_PATH` に採用してはならない。判定順は `skills/<name>` の存在 → `.agents/skills/<name>` の存在 → スキルルート親ディレクトリ（`skills/` or `.agents/skills/`）の慣習 → 最終デフォルト `skills/`（より一般的な公開レイアウト）
- **宛先は消してからコピーする（削除伝搬）**：`cp -R` は追加・上書きのみで削除を反映しないため、ローカルで削除したファイルが upstream 側に残存してしまう。`rm -rf` 前に `UPSTREAM_SKILL_PATH` が `skills/<name>` か `.agents/skills/<name>` のいずれかであることを case 文で検証し、それ以外の値なら中止する。削除対象は必ず clone 用の一時ディレクトリ（`${WORKDIR}/upstream/`）配下のみに閉じ、それ以外のファイルには一切触れない
- **既に同名の branch がある場合**：秒単位スラッグで通常は衝突しないが、万一の場合はユーザーに確認

## sandbox 環境での実行

このスキルは sandbox 環境では実行できない。ネットワークアクセス・ファイルシステムへの書き込みが必要なため、通常の Claude Code セッションで実行すること。

## 検証

PR 作成後、以下で完了を確認する。

```bash
# PR が作成されたことを確認
gh pr view --repo "${REPO_SLUG}" --web

# または URL を直接確認（Step 11 で出力済み）
```

- PR URL が返されること
- PR のタイトル・差分が意図した内容であること
- `sync-skills-lock` 実行案内が出力されていること

## 既存スキルとの関係

- Step 4 のセキュリティチェック、Step 9 の Conventional Commits、Step 10 の PR body は `create-pr/SKILL.md` の流儀を踏襲
- マージ後は `sync-skills-lock` で `skills-lock.json` の `computedHash` を更新
