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
# 短縮形 (Fandhe-AI/<repo>) と URL 形式 (https://github.com/Fandhe-AI/<repo>) の両方を許可する
case "${SOURCE}" in
  Fandhe-AI/*)
    # 短縮形: そのまま使用
    REPO_SLUG="${SOURCE}"
    ;;
  https://github.com/Fandhe-AI/*)
    # URL 形式: OWNER/REPO 形式に正規化し末尾 .git を除去する
    REPO_SLUG="${SOURCE#https://github.com/}"
    REPO_SLUG="${REPO_SLUG%.git}"
    ;;
  *)
    echo "エラー: source '${SOURCE}' は Fandhe-AI org のリポジトリではありません。中止します。"
    exit 1
    ;;
esac

# sourceType が github 以外なら中止（GitHub 以外の source は本スキルの想定外）
if [[ "${SOURCE_TYPE}" != "github" ]]; then
  echo "エラー: sourceType '${SOURCE_TYPE}' は github ではありません。中止します。"
  exit 1
fi
```

- `source` が `Fandhe-AI/`（短縮形）または `https://github.com/Fandhe-AI/`（URL 形式）のいずれでも始まらない場合は **エラーで中止** します（安全弁：見知らぬリポジトリへ意図せず push しないため）。
- `sourceType` が `github` 以外の場合も **エラーで中止** します（GitHub 以外の source は本スキルの想定外であり、`gh repo clone` / `gh pr create` が正常動作しないため）。
- 正規化後の `REPO_SLUG` は以降の Step で `gh repo clone`・`gh pr create --repo` に利用します。

### Step 3: 変更内容を確認する

```bash
git log --oneline -- "${LOCAL_SKILL_DIR}/"
git diff HEAD~1 HEAD -- "${LOCAL_SKILL_DIR}/"
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
WORKDIR="/tmp/claude-${UID_VAL}/contribute-${SKILL_NAME}-${TS}"
mkdir -p "$WORKDIR"
```

`$TMPDIR` が設定されていればそちらを優先します（サンドボックス互換）。

### Step 6: upstream を clone する

```bash
# sandbox 環境では各コマンドに GIT_SSL_NO_VERIFY=1 を前置する（詳細: docs/sandbox-tls.md）
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

upstream 側でスキルがどのパス構造に置かれているか確認します。`UPSTREAM_SKILL_PATH` の決定は以下の優先順位で行います（`cd "$WORKDIR/upstream"` 済みの前提）。

1. ローカルリポジトリの `skills-lock.json`（`${ORIG_DIR}/skills-lock.json`）に当該スキルの `skillPath` があれば、その dirname を `UPSTREAM_SKILL_PATH` に採用する（authoritative）。`skillPath` は upstream での SKILL.md へのパスであることが前提。
2. `skillPath` が無い（lockfile 未登録の新規スキル等）場合のみ、クローン内のディレクトリ存在で判定する。

```bash
# upstream のスキル配置を決定する（skills-lock.json の skillPath を優先）
SKILL_PATH=$(jq -r ".skills[\"${SKILL_NAME}\"].skillPath // empty" "${ORIG_DIR}/skills-lock.json" 2>/dev/null)
if [[ -n "${SKILL_PATH}" ]]; then
  # skillPath は upstream での SKILL.md へのパス。その dirname がスキルディレクトリ
  UPSTREAM_SKILL_PATH="$(dirname "${SKILL_PATH}")"
  mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
else
  # lockfile 未登録（新規スキル等）はクローン内のディレクトリ存在で判定
  if [[ -d "skills/${SKILL_NAME}" ]]; then
    UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
  elif [[ -d ".agents/skills/${SKILL_NAME}" ]]; then
    UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
  elif [[ -d "skills" ]]; then
    # upstream が skills/ 配下で公開している慣習
    UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
    mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
  elif [[ -d ".agents/skills" ]]; then
    # upstream が .agents/skills/ 配下で公開している慣習
    UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
    mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
  else
    echo "警告: upstream にスキルルートが見つかりません。skills/ を既定として新規追加します。"
    UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
    mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
  fi
fi
```

`UPSTREAM_SKILL_PATH` が確定したらコピーを実行します。

```bash
# LOCAL_SKILL_DIR は Step 1 で解決済み（skills/<name>/ または .agents/skills/<name>/）
# ORIG_DIR は Step 6 で cd する前に捕捉済み（cd - は stdout 汚染のため使用しない）
cp -R "${ORIG_DIR}/${LOCAL_SKILL_DIR}/." "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}/"
```

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
git switch -c "contribute/<SKILL_NAME>-${SLUG}"
git add <変更パス>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

ローカルの skills/<SKILL_NAME>/ からの貢献。

EOF
)"
```

- Conventional Commits 形式
- `--no-verify` は使用しない（pre-commit フックを通す）
- co-author は付けない（ローカル規約に合わせる）

### Step 10: push と PR 作成

```bash
# sandbox 環境では各コマンドに GIT_SSL_NO_VERIFY=1 を前置する（詳細: docs/sandbox-tls.md）
git push -u origin "contribute/<SKILL_NAME>-${SLUG}"

gh pr create \
  --repo "${REPO_SLUG}" \
  --base "${DEFAULT_BRANCH:-main}" \
  --title "<type>(<scope>): <subject>" \
  --body "$(cat <<'EOF'
## Summary

- <SKILL_NAME> の改修内容（箇条書き）

## Source

ローカルの [ideas リポジトリ](../../) 側で改修後、`/contribute-skill <SKILL_NAME>` により投稿。

## Test plan

- [ ] SKILL.md を実際に Claude Code で実行
- [ ] Conventional Commits に沿ったメッセージ生成を確認
- [ ] エッジケース確認

EOF
)"
```

`--repo` には Step 2 で正規化した `${REPO_SLUG}`（`OWNER/REPO` 形式）を渡します。URL 形式から `OWNER/REPO` への変換は Step 2 の case 文で完了しています。

Draft PR を作成する場合は `--draft` を付けます（デフォルトはユーザー確認の上で決定）。

### Step 11: PR URL を返す & 後処理案内

- PR URL をユーザーに返す
- 「マージされたら `/sync-skills-lock` を実行して `skills-lock.json` の `computedHash` を更新してください」と案内
- 作業用ディレクトリ `$WORKDIR` は残したまま（成否が確定するまで）

## 注意事項

- **SKILL_NAME は kebab-case のみ許可**：`..` のような値によるパストラバーサルを防ぐため、空判定の直後・パス解決の前に `^[a-z][a-z0-9-]+$` で検証する（security.md A03/A01）
- **`skills/` と `.agents/skills/` の両方が存在する場合は中止**：silently に `skills/` を優先せず、環境変数 `LOCAL_SKILL_DIR` に改修対象パスを指定して再実行を求める。`LOCAL_SKILL_DIR` は `skills/<name>` か `.agents/skills/<name>` の2パスのみ受理し、任意パス指定によるパストラバーサルを防ぐ
- **source が Fandhe-AI org 以外の場合は中止**：`Fandhe-AI/`（短縮形）と `https://github.com/Fandhe-AI/`（URL 形式）のみを許可し、それ以外は意図しない外部リポジトリへの push を防ぐため中止する
- **セキュリティ問題が見つかった場合は中止**：修正後に再実行
- **sandbox 環境での `GIT_SSL_NO_VERIFY=1` 併用**：詳細は後述の「sandbox 環境での実行」節を参照
- **upstream の配置は lockfile の skillPath を正とする**：ローカルの `skills-lock.json` に `skillPath` が登録されている場合はその dirname を `UPSTREAM_SKILL_PATH` に採用し、クローン内のディレクトリ存在判定より優先する。`skillPath` は `SKILL.md` へのパスである前提であり、それ以外の形式の場合は dirname の結果が不正になりうるため注意する。未登録スキル（新規貢献等）の場合のみクローン内ディレクトリ存在でフォールバックし、スキルルートの親ディレクトリ（`skills/` or `.agents/skills/`）の存在で upstream の慣習を検出して決定する。最終デフォルトは `skills/`（より一般的な公開レイアウト）
- **既に同名の branch がある場合**：秒単位スラッグで通常は衝突しないが、万一の場合はユーザーに確認

## sandbox 環境での実行

sandbox で本スキルを実行する場合、ネットワーク越しの GitHub 操作には `GIT_SSL_NO_VERIFY=1` の併用を検討してください。本スキルの主なリモート操作は `gh repo clone` / `git push` / `gh pr create` で、「リモート書き込み」判定は **要** です。コマンド分類の詳細と TLS 検証無効化の注意事項は [`docs/sandbox-tls.md`](../../docs/sandbox-tls.md) を参照してください。

## 既存スキルとの関係

- Step 4 のセキュリティチェック、Step 9 の Conventional Commits、Step 10 の PR body は `create-pr/SKILL.md` の流儀を踏襲
- マージ後は `/sync-skills-lock` で `skills-lock.json` の `computedHash` を更新
