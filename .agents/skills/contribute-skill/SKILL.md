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
# 1) まず正規化する（URL 形式は OWNER/REPO へ変換、短縮形はそのまま採用）
case "${SOURCE}" in
  https://github.com/*)
    REPO_SLUG="${SOURCE#https://github.com/}"
    ;;
  *)
    REPO_SLUG="${SOURCE}"
    ;;
esac
# 末尾 .git の除去は両形式共通で行う
# （URL 分岐内のみで除去すると短縮形 'Fandhe-AI/<repo>.git' が .git 付きのまま
#   後段の正規表現を通過してしまうため、検証の前に必ずここで正規化する）
REPO_SLUG="${REPO_SLUG%.git}"

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
# 自前の中間ディレクトリ（例: /tmp/claude-<uid>）は作らない: 他ユーザーが先に
# 作成していた場合 mkdir -p は所有者・権限を検証せず受け入れてしまうため。
# TMPDIR は環境変数であり任意の値を指定され得るため、${TMPDIR:-/tmp} を
# 無条件に信頼せず、mktemp -d に渡す前に実体パス（symlink 解決後）・所有者
# （自分または root）・書き込み権限（他者書き込み可なら sticky bit 必須）を
# fail-closed で検証する。検証対象は実体パス自身だけでなく、ファイルシステム
# ルートまでの全祖先ディレクトリに及ぶ（祖先が攻撃者所有・非 sticky な場合、
# 検証後に祖先側から rename で実体パスごと差し替えられ得るため）。

# 単一ディレクトリに対して 所有者=自分 or root／他者書き込み可なら sticky bit
# 必須、を fail-closed で判定する（実体パスと全祖先ディレクトリで共用）。
check_dir_trusted() {
  local dir="$1" owner mode
  owner=$(stat -c '%u' "$dir" 2>/dev/null || stat -f '%u' "$dir")
  if [[ "$owner" != "$(id -u)" && "$owner" != "0" ]]; then
    echo "エラー: ディレクトリの所有者が不正です（自分でも root でもありません）: ${dir}" >&2
    return 1
  fi
  mode=$(stat -c '%a' "$dir" 2>/dev/null || stat -f '%Lp' "$dir")
  if [[ ! "$mode" =~ ^[0-7]{3,4}$ ]]; then
    echo "エラー: ディレクトリのパーミッションを取得できません: ${dir}" >&2
    return 1
  fi
  if (( (8#$mode & 8#022) != 0 )) && [[ ! -k "$dir" ]]; then
    echo "エラー: ディレクトリが他者から書き込み可能なのに sticky bit が設定されていません: ${dir}（mode ${mode}）" >&2
    return 1
  fi
  return 0
}

TMP_ROOT="${TMPDIR:-/tmp}"
TMP_ROOT_REAL=$(cd -P "$TMP_ROOT" 2>/dev/null && pwd -P) || TMP_ROOT_REAL=""
if [[ -z "$TMP_ROOT_REAL" || ! -d "$TMP_ROOT_REAL" ]]; then
  echo "エラー: TMPDIR が実在するディレクトリを指していません: ${TMP_ROOT}" >&2
  exit 1
fi
# TMP_ROOT_REAL 自身とその全祖先（ルートまで）を検証する
CHECK_DIR="$TMP_ROOT_REAL"
while true; do
  check_dir_trusted "$CHECK_DIR" || exit 1
  [[ "$CHECK_DIR" == "/" ]] && break
  CHECK_DIR="$(dirname "$CHECK_DIR")"
done
WORKDIR=$(mktemp -d "${TMP_ROOT_REAL}/contribute-${SKILL_NAME}-XXXXXXXX")
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

Step 7 で `skills-contribute.sh` を実行すると、同スクリプトが自分自身で `gh repo clone` を行い、独自の `WORKDIR` を新規作成します。Step 7 実行後は、この Step で作成した `WORKDIR`/clone ではなく、スクリプトが返した `WORKDIR` を Step 8 以降で使用します（詳細は Step 7 参照）。

### Step 7: 変更を反映する

**このステップは手順を個別に打鍵せず、必ず本スキル自身のスクリプト（`skills-contribute.sh`）を実行してください。** 同スクリプトには rm -rf 前の symlink 境界検証（TOCTOU 対策込み）が実装されており、以下の断片だけを個別に実行すると検証が欠落します。

`skills-contribute.sh` は upstream 側でスキルがどのパス構造に置かれているか（`UPSTREAM_SKILL_PATH`。`skills-lock.json` の `skillPath` はローカル install パスであり upstream 内の配置ではないため使用しません）の判定と、`cp -R` の delete-then-copy 反映を内部で行う自己完結型スクリプトです。判定・反映のロジックは後述の参考コードのとおりです。

`LOCAL_SKILL_DIR` は Step 1 で解決した**貢献対象スキル**（`$ARGUMENTS`）のパスであり、本スキル（contribute-skill）自身の配置とは無関係です。スクリプトの実行パスに `LOCAL_SKILL_DIR` を流用すると、貢献対象が contribute-skill 以外の場合に存在しないパスを参照してしまいます。実行するスクリプト自身の配置は別変数 `CONTRIBUTE_SKILL_DIR` として、本スキル（contribute-skill）自身のインストール場所から解決してください。

`skills-contribute.sh` は呼び出し時のカレントディレクトリを貢献元リポジトリのルートとして `LOCAL_SKILL_DIR`・`skills-lock.json` を探索し、内部で自分自身の `gh repo clone` と `WORKDIR`（clone 先）を新規作成します。そのため実行直前に必ず Step 6 で捕捉済みの `ORIG_DIR`（clone 前のローカルリポジトリルート）へ `cd` し直してください。スクリプトの標準出力最終行群が返す `CONTRIBUTE_SKILL_WORKDIR=<path>` と `CONTRIBUTE_SKILL_UPSTREAM_PATH=<path>` を捕捉し、Step 6 で作成した `WORKDIR` および（後述の参考コードで示す判定ロジックの）`UPSTREAM_SKILL_PATH` をこれらの値で上書きします。これにより Step 8 以降が参照する `${WORKDIR}/upstream` と `${UPSTREAM_SKILL_PATH}` は、スクリプトが実際に使った clone・実際に反映したパスと一致します（Step 6 で別途 clone した内容や、参考コードを個別実行して得た値は使用しません）。

```bash
# 本スキル自身（contribute-skill）の配置を ORIG_DIR 基準の絶対パスで解決する。
# LOCAL_SKILL_DIR（貢献対象）とは別物。
# override: 環境変数 CONTRIBUTE_SKILL_DIR が設定済みならそれを検証して使う
if [[ -n "${CONTRIBUTE_SKILL_DIR:-}" ]]; then
  if [[ "${CONTRIBUTE_SKILL_DIR}" != "${ORIG_DIR}/skills/contribute-skill" && "${CONTRIBUTE_SKILL_DIR}" != "${ORIG_DIR}/.agents/skills/contribute-skill" ]]; then
    echo "エラー: CONTRIBUTE_SKILL_DIR は ${ORIG_DIR}/skills/contribute-skill か ${ORIG_DIR}/.agents/skills/contribute-skill のいずれかを指定してください: ${CONTRIBUTE_SKILL_DIR}"
    exit 1
  fi
  if [[ ! -d "${CONTRIBUTE_SKILL_DIR}" ]]; then
    echo "エラー: 指定された CONTRIBUTE_SKILL_DIR が存在しません: ${CONTRIBUTE_SKILL_DIR}"
    exit 1
  fi
else
  # 自動解決。Step 1 の LOCAL_SKILL_DIR 解決と同じ fail-closed 方針: 両方存在する場合は
  # どちらを使うべきか判断できないため中止する（silently に skills/ を優先しない）。
  have_contribute_skills=0; have_contribute_agents=0
  [[ -d "${ORIG_DIR}/skills/contribute-skill" ]] && have_contribute_skills=1
  [[ -d "${ORIG_DIR}/.agents/skills/contribute-skill" ]] && have_contribute_agents=1
  if [[ "${have_contribute_skills}" -eq 1 && "${have_contribute_agents}" -eq 1 ]]; then
    echo "エラー: ${ORIG_DIR}/skills/contribute-skill と ${ORIG_DIR}/.agents/skills/contribute-skill の両方が存在します。"
    echo "環境変数 CONTRIBUTE_SKILL_DIR にどちらかを指定して再実行してください（例: CONTRIBUTE_SKILL_DIR=${ORIG_DIR}/.agents/skills/contribute-skill）。"
    exit 1
  elif [[ "${have_contribute_skills}" -eq 1 ]]; then
    CONTRIBUTE_SKILL_DIR="${ORIG_DIR}/skills/contribute-skill"
  elif [[ "${have_contribute_agents}" -eq 1 ]]; then
    CONTRIBUTE_SKILL_DIR="${ORIG_DIR}/.agents/skills/contribute-skill"
  else
    echo "エラー: contribute-skill 自身の配置が見つかりません（${ORIG_DIR}/skills/contribute-skill / ${ORIG_DIR}/.agents/skills/contribute-skill）。"
    exit 1
  fi
fi

# skills-contribute.sh は自分自身で clone するため、呼び出し前に必ずローカルリポジトリ
# ルートへ cd し直す。LOCAL_SKILL_DIR は通常の変数代入では子プロセスへ継承されない
# （export されていない）ため明示的に渡す。標準出力はそのまま表示しつつ変数へも捕捉する。
cd "${ORIG_DIR}"
SCRIPT_OUTPUT=$(LOCAL_SKILL_DIR="${LOCAL_SKILL_DIR}" "${CONTRIBUTE_SKILL_DIR}/script/skills-contribute.sh" "${SKILL_NAME}" "${REPO_SLUG}" | tee /dev/stderr)

# スクリプトが実際に使った作業 clone・upstream スキルパスを Step 8 以降の唯一の正として採用する。
# Step 6 で mktemp した WORKDIR、および以下の参考コードで計算され得る UPSTREAM_SKILL_PATH は
# この値で上書きする。以降 "${WORKDIR}/upstream" は常にスクリプトが cp -R でコピーした clone を、
# "${UPSTREAM_SKILL_PATH}" は常にスクリプトが実際に反映したパスを指す。
SCRIPT_UPSTREAM_DIR=$(echo "${SCRIPT_OUTPUT}" | grep '^CONTRIBUTE_SKILL_WORKDIR=' | tail -1 | cut -d= -f2-)
UPSTREAM_SKILL_PATH=$(echo "${SCRIPT_OUTPUT}" | grep '^CONTRIBUTE_SKILL_UPSTREAM_PATH=' | tail -1 | cut -d= -f2-)
if [[ -z "${SCRIPT_UPSTREAM_DIR}" || ! -d "${SCRIPT_UPSTREAM_DIR}" ]]; then
  echo "エラー: skills-contribute.sh の出力から作業ディレクトリ（CONTRIBUTE_SKILL_WORKDIR）を取得できませんでした。"
  exit 1
fi
if [[ -z "${UPSTREAM_SKILL_PATH}" ]]; then
  echo "エラー: skills-contribute.sh の出力から upstream スキルパス（CONTRIBUTE_SKILL_UPSTREAM_PATH）を取得できませんでした。"
  exit 1
fi
WORKDIR="$(dirname "${SCRIPT_UPSTREAM_DIR}")"
cd "${SCRIPT_UPSTREAM_DIR}"
```

以下は `skills-contribute.sh` が内部で実行する処理（`UPSTREAM_SKILL_PATH` の判定・delete-then-copy）の参考コードです。上記のスクリプト実行によって既に完了しているため、個別に実行する必要はありません（実行すると Step 6 の clone 側に対して重複適用してしまいます）。

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

```bash
# 削除伝搬のための同期: cp -R は削除を反映しないため、宛先を消してからコピーする
# 安全弁1: 削除対象が clone 内の想定スキルパス（2 形態のみ）であることを検証してから rm する
case "${UPSTREAM_SKILL_PATH}" in
  "skills/${SKILL_NAME}"|".agents/skills/${SKILL_NAME}") ;;
  *)
    echo "エラー: 想定外の UPSTREAM_SKILL_PATH です: ${UPSTREAM_SKILL_PATH}"
    exit 1
    ;;
esac

# 安全弁2: 実体パスでの symlink 境界検証（fail-closed）。安全弁1 の case allowlist は
# 文字列形式のみの検証であり、clone 内の中間ディレクトリ（skills / .agents 等）が
# 実行中に symlink へ差し替えられた場合には対応できないため、rm -rf の直前に
# 以下を実体パスで再確認する（詳細な実装は script/skills-contribute.sh を参照）。
#   (a) clone ルートから削除対象までの各中間パス要素が symlink でないこと
#   (b) 削除対象の親ディレクトリの正規パス（pwd -P）が clone ルート配下であること
#   (c) 検証と削除の間の TOCTOU を閉じるため、検証済みの親ディレクトリへ cd -P した
#       cwd に対して相対パスで rm する（パス文字列を再解決しない）
# いずれかに違反する場合は削除を実行せずエラー終了する。
CLONE_ROOT="${WORKDIR}/upstream"
DELETE_TARGET="${CLONE_ROOT}/${UPSTREAM_SKILL_PATH}"
CLONE_ROOT_REAL="$(cd "${CLONE_ROOT}" && pwd -P)"
check_dir="${CLONE_ROOT}"
IFS='/' read -ra UPSTREAM_SKILL_PATH_PARTS <<< "${UPSTREAM_SKILL_PATH}"
for part in "${UPSTREAM_SKILL_PATH_PARTS[@]}"; do
  check_dir="${check_dir}/${part}"
  if [[ -L "${check_dir}" ]]; then
    echo "エラー: 削除対象の経路に symlink が含まれています: ${check_dir}"
    exit 1
  fi
done
DELETE_PARENT="$(dirname "${DELETE_TARGET}")"
DELETE_LEAF="$(basename "${DELETE_TARGET}")"
if [[ -d "${DELETE_PARENT}" ]]; then
  (
    cd -P -- "${DELETE_PARENT}" || exit 1
    PARENT_REAL="$(pwd -P)"
    case "${PARENT_REAL}/" in
      "${CLONE_ROOT_REAL}/"*) ;;
      *)
        echo "エラー: 削除対象の親ディレクトリが clone ルート配下ではありません: ${PARENT_REAL}"
        exit 1
        ;;
    esac
    rm -rf -- "${DELETE_LEAF}"
  )
fi
mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
# LOCAL_SKILL_DIR は Step 1 で解決済み（skills/<name>/ または .agents/skills/<name>/）
# ORIG_DIR は Step 6 で cd する前に捕捉済み（cd - は stdout 汚染のため使用しない）
cp -R "${ORIG_DIR}/${LOCAL_SKILL_DIR}/." "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}/"
```

削除対象は必ず `${WORKDIR}/upstream/` 配下（clone 用の一時ディレクトリ）に閉じ、`UPSTREAM_SKILL_PATH` が `skills/<name>` か `.agents/skills/<name>` の 2 形態以外なら `rm -rf` の前に中止します。加えて中間パスの symlink 化・TOCTOU に対する実体パス検証を rm 直前に行います。新規スキル追加（宛先未存在）の場合も削除処理は無害にスキップされ、直後の `mkdir -p` で作成されます。

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
- **`skills/` と `.agents/skills/` の両方が存在する場合は中止**：silently に `skills/` を優先せず、環境変数 `LOCAL_SKILL_DIR` に改修対象パスを指定して再実行を求める。`LOCAL_SKILL_DIR` は `skills/<name>` か `.agents/skills/<name>` の2パスのみ受理し、任意パス指定によるパストラバーサルを防ぐ。Step 7 で本スキル自身（contribute-skill）の配置を解決する `CONTRIBUTE_SKILL_DIR` も同じ fail-closed 方針を取り、`skills/contribute-skill` と `.agents/skills/contribute-skill` の両方が存在する場合は silently に `skills/` を優先せず中止して環境変数 `CONTRIBUTE_SKILL_DIR` での指定を求める（LOCAL_SKILL_DIR とは非対称にしない）
- **source が Fandhe-AI org 以外の場合は中止**：前方一致（`Fandhe-AI/*` 等）ではなく、正規化（`.git` 除去等）後の `OWNER/REPO` が `^Fandhe-AI/[A-Za-z0-9._-]+$` に完全一致するかで判定する。`../` によるパストラバーサル・クエリ・フラグメント・余剰パスセグメントを含む値、および repo 名が `.`／`..` になる値は中止し、意図しない外部リポジトリへの push を防ぐ
- **セキュリティ問題が見つかった場合は中止**：修正後に再実行
- **upstream の配置はクローンしたリポジトリのレイアウトで判定する**：`skills-lock.json` の `skillPath` はローカル install パス（例: `.agents/skills/github-docs/SKILL.md`）であり、upstream リポジトリ内の配置ではない。`skillPath` の dirname を `UPSTREAM_SKILL_PATH` に採用してはならない。判定順は `skills/<name>` の存在 → `.agents/skills/<name>` の存在 → スキルルート親ディレクトリ（`skills/` or `.agents/skills/`）の慣習 → 最終デフォルト `skills/`（より一般的な公開レイアウト）
- **宛先は消してからコピーする（削除伝搬）**：`cp -R` は追加・上書きのみで削除を反映しないため、ローカルで削除したファイルが upstream 側に残存してしまう。`rm -rf` 前に `UPSTREAM_SKILL_PATH` が `skills/<name>` か `.agents/skills/<name>` のいずれかであることを case 文で検証し、それ以外の値なら中止する。加えて rm -rf 直前に実体パス（symlink 境界・clone ルート配下チェック、cd -P + 相対 rm による TOCTOU 対策）を再検証する。削除対象は必ず clone 用の一時ディレクトリ（`${WORKDIR}/upstream/`）配下のみに閉じ、それ以外のファイルには一切触れない。**Step 7 は必ず `${CONTRIBUTE_SKILL_DIR}/script/skills-contribute.sh`（本スキル自身の配置から別途解決したパス。貢献対象のパスである `LOCAL_SKILL_DIR` とは別物）経由で実行し、断片コマンドの個別打鍵で検証を省略しない**
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
