#!/usr/bin/env bash
# skills-contribute.sh — ローカルスキルを upstream リポジトリへ PR として投稿する実例
#
# 使い方（リポジトリルートから実行）:
#   skills/contribute-skill/scripts/skills-contribute.sh <skill-name> <upstream-repo>
#   （インストール先からは .agents/skills/contribute-skill/scripts/skills-contribute.sh）
# 例: skills/contribute-skill/scripts/skills-contribute.sh create-commit Fandhe-AI/agent-cli-skills
#
# このスクリプトは contribute-skill スキルが使用するコマンド集。
# Claude がフロー全体を制御するため、直接実行時は各ステップを確認しながら進めること。
# リポジトリルートから実行すること。

set -euo pipefail

SKILL_NAME="${1:-}"
UPSTREAM_REPO="${2:-}"

if [[ -z "$SKILL_NAME" || -z "$UPSTREAM_REPO" ]]; then
  echo "使い方: $0 <skill-name> <upstream-repo>"
  echo "例: $0 create-commit Fandhe-AI/agent-cli-skills"
  exit 1
fi

# SKILL_NAME のバリデーション（kebab-case のみ許可、パストラバーサル防止）
if [[ ! "$SKILL_NAME" =~ ^[a-z][a-z0-9-]+$ ]]; then
  echo "エラー: SKILL_NAME は小文字 kebab-case のみ許可されています: ${SKILL_NAME}"
  exit 1
fi

# source の安全弁: 正規化後の OWNER/REPO が Fandhe-AI/<repo>（単一セグメント）に完全一致する場合のみ許可する
# 1) まず正規化する（URL 形式は OWNER/REPO へ変換、短縮形はそのまま採用）
case "$UPSTREAM_REPO" in
  https://github.com/*)
    REPO_SLUG="${UPSTREAM_REPO#https://github.com/}"
    ;;
  *)
    REPO_SLUG="$UPSTREAM_REPO"
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
if [[ ! "$REPO_SLUG" =~ ^Fandhe-AI/[A-Za-z0-9._-]+$ ]]; then
  echo "エラー: 想定外の upstream: $UPSTREAM_REPO — Fandhe-AI/<repo> 形式以外への push は許可されていません"
  exit 1
fi

# 3) '.'・'..' は上記正規表現を通過してしまうため repo 名として明示拒否する
#    （例: 'Fandhe-AI/..git' は .git 除去後に 'Fandhe-AI/.' へ化ける）
case "${REPO_SLUG#Fandhe-AI/}" in
  .|..)
    echo "エラー: 想定外の upstream: $UPSTREAM_REPO — repository 名が不正です"
    exit 1
    ;;
esac

# skills-lock.json に source があれば argv の UPSTREAM_REPO と照合する（誤リポ clone 防止）。
# jq 不在時にこの照合ブロックごと skip すると、lockfile の source 安全弁を経由せず
# 任意のリポジトリを UPSTREAM_REPO として通過させ clone・PR 作成できてしまうため、
# skills-lock.json が存在するのに jq が無い場合は照合を省略せず fail-closed で中止する。
if [[ -f skills-lock.json ]]; then
  if ! command -v jq >/dev/null 2>&1; then
    echo "エラー: jq が見つかりません。skills-lock.json の source 照合に jq の導入が必要です。中止します。" >&2
    exit 1
  fi
  LOCK_SOURCE=$(jq -r ".skills[\"${SKILL_NAME}\"].source // empty" skills-lock.json 2>/dev/null)
  if [[ -n "${LOCK_SOURCE}" ]]; then
    norm_lock="${LOCK_SOURCE#https://github.com/}"; norm_lock="${norm_lock%.git}"
    norm_arg="${UPSTREAM_REPO#https://github.com/}"; norm_arg="${norm_arg%.git}"
    if [[ "${norm_lock}" != "${norm_arg}" ]]; then
      echo "エラー: 指定された upstream (${UPSTREAM_REPO}) が skills-lock.json の source (${LOCK_SOURCE}) と一致しません。中止します。" >&2
      exit 1
    fi
    # sourceType の安全弁: github 以外（欠落・null 含む）は gh repo clone / gh pr create が
    # 成立しないため中止する（contribute-skill/SKILL.md Step 2 と同じガード）。
    # lockfile にエントリが存在する場合のみ検査し、未登録の新規スキル貢献は対象外とする
    LOCK_SOURCE_TYPE=$(jq -r ".skills[\"${SKILL_NAME}\"].sourceType // empty" skills-lock.json 2>/dev/null)
    if [[ "${LOCK_SOURCE_TYPE}" != "github" ]]; then
      echo "エラー: sourceType '${LOCK_SOURCE_TYPE}' は github ではありません。中止します。" >&2
      exit 1
    fi
  fi
fi

# symlink 境界の共通判定（fail-closed）: 相対経路 rel の全要素を先頭から累積検査し、
# いずれかが symlink なら該当パスを SYMLINK_COMPONENT に設定して 1 を返す。
# 第2引数 base を与えると base 配下の相対経路として検査する（省略時はカレント基準）。
# 末尾要素だけの -L 検査では親（例: .claude 自体がリポジトリ外を指す symlink）を
# すり抜けるため、候補判定・override 検証・upstream 配置判定・rm 前検証の
# すべての経路判定でこの関数を使い「どの経路要素が symlink でも候補と数えない」を一貫させる。
assert_no_symlink_components() {
  local rel="$1" prefix="${2:+${2}/}" acc="" part
  local -a parts
  SYMLINK_COMPONENT=""
  IFS='/' read -r -a parts <<< "${rel}"
  for part in "${parts[@]}"; do
    acc="${acc:+${acc}/}${part}"
    if [[ -L "${prefix}${acc}" ]]; then
      SYMLINK_COMPONENT="${prefix}${acc}"
      return 1
    fi
  done
  return 0
}

# ローカルスキルのパス確認（override: 環境変数 LOCAL_SKILL_DIR が設定済みならそれを検証して使う）
if [[ -n "${LOCAL_SKILL_DIR:-}" ]]; then
  case "${LOCAL_SKILL_DIR}" in
    "skills/${SKILL_NAME}"|".agents/skills/${SKILL_NAME}"|".claude/skills/${SKILL_NAME}") ;;
    *)
      echo "エラー: LOCAL_SKILL_DIR は skills/${SKILL_NAME} / .agents/skills/${SKILL_NAME} / .claude/skills/${SKILL_NAME} のいずれかを指定してください: ${LOCAL_SKILL_DIR}"
      exit 1
      ;;
  esac
  # .claude/skills/<name> は skills/<name> への symlink 慣習があるため、symlink が
  # 指定された場合は実体側パスの指定を促す（git log / git diff が symlink 先の内容を
  # 追跡できず、後続 Step の差分表示が空になるため）。末尾要素だけでなく
  # 全中間要素（例: .claude → .claude/skills）も累積検査し、親ディレクトリが
  # symlink のパス指定も fail-closed で拒否する（自動解決側の候補判定と同一関数で対称）
  if ! assert_no_symlink_components "${LOCAL_SKILL_DIR}"; then
    echo "エラー: LOCAL_SKILL_DIR の経路に symlink が含まれています。実体側のパスを指定してください: ${SYMLINK_COMPONENT} -> $(readlink "${SYMLINK_COMPONENT}")"
    exit 1
  fi
  if [[ ! -d "${LOCAL_SKILL_DIR}" ]]; then
    echo "エラー: 指定された LOCAL_SKILL_DIR が存在しません: ${LOCAL_SKILL_DIR}"
    exit 1
  fi
else
  # 自動解決（複数存在する場合は中止して override を促す）
  have_skills=0; have_agents=0; have_claude=0
  # 各候補は経路の全要素（.claude 等の最上位親を含む）が実体の場合のみ数える。
  # .claude/skills/<name> は skills/<name> への symlink 慣習があり、symlink 経由の候補は
  # 実体側候補で検出されるため数えない（重複カウント防止）。加えて .claude 自体が
  # リポジトリ外を指す symlink の場合も候補と数えず、外部内容を upstream へ
  # コピーする経路を fail-closed で遮断する
  [[ -d "skills/${SKILL_NAME}" ]] && assert_no_symlink_components "skills/${SKILL_NAME}" && have_skills=1
  [[ -d ".agents/skills/${SKILL_NAME}" ]] && assert_no_symlink_components ".agents/skills/${SKILL_NAME}" && have_agents=1
  [[ -d ".claude/skills/${SKILL_NAME}" ]] && assert_no_symlink_components ".claude/skills/${SKILL_NAME}" && have_claude=1
  if (( have_skills + have_agents + have_claude > 1 )); then
    echo "エラー: ${SKILL_NAME} の実体が skills/ / .agents/skills/ / .claude/skills/ の複数に存在します。"
    echo "環境変数 LOCAL_SKILL_DIR にどれかを指定して再実行してください（例: LOCAL_SKILL_DIR=.agents/skills/${SKILL_NAME} $0 ${SKILL_NAME} ${UPSTREAM_REPO}）。"
    exit 1
  elif [[ "${have_skills}" -eq 1 ]]; then
    LOCAL_SKILL_DIR="skills/${SKILL_NAME}"
  elif [[ "${have_agents}" -eq 1 ]]; then
    LOCAL_SKILL_DIR=".agents/skills/${SKILL_NAME}"
  elif [[ "${have_claude}" -eq 1 ]]; then
    LOCAL_SKILL_DIR=".claude/skills/${SKILL_NAME}"
  else
    echo "エラー: ローカルスキルが見つかりません: skills/${SKILL_NAME} / .agents/skills/${SKILL_NAME} / .claude/skills/${SKILL_NAME}"
    exit 1
  fi
fi

echo "==> contribute-skill: ${SKILL_NAME} → ${UPSTREAM_REPO}"
echo ""

# Step 3: 変更内容を確認する
echo "--- ローカル変更履歴 ---"
git log --oneline -- "${LOCAL_SKILL_DIR}/"
echo ""
echo "--- 最新差分 ---"
# HEAD~1 の有無を明示的に判定する（git diff は差分ありでも終了コード 0 のため || で分岐しない）
if git rev-parse --verify -q HEAD~1 >/dev/null; then
  git diff HEAD~1 HEAD -- "${LOCAL_SKILL_DIR}/"
else
  # 親コミットがない場合（初回コミット・shallow clone 等）は空ツリーと HEAD を比較する
  # （作業ツリー差分ではコミット済み・クリーンな状態で空になるため使わない）
  git diff "$(git hash-object -t tree /dev/null)" HEAD -- "${LOCAL_SKILL_DIR}/"
fi
echo ""

# Step 5: 作業用ディレクトリを用意する
# 自前の中間ディレクトリ（例: /tmp/claude-<uid>）は作らない: そのディレクトリを
# 他ユーザーが先に作成していた場合、mkdir -p は所有者・権限を検証せず受け入れてしまい、
# 親ディレクトリの所有者が配下のエントリを rename・置換できてしまう（sticky bit の
# 保護は親ディレクトリ自体が信頼できる場合のみ有効）。
# TMPDIR は環境変数であり呼び出し元が任意の値（他ユーザー所有のディレクトリ・
# symlink 越しの差し替え先等）を指定できるため、${TMPDIR:-/tmp} を無条件に
# 信頼済みルートとは扱わない。mktemp -d へ渡す前に実体パス（symlink 解決後）を
# 求め、実在ディレクトリであること・所有者が自分または root であること・
# group/other 書き込み可能な場合は sticky bit（他者による rename/置換を阻止）が
# 設定されていることを fail-closed で検証する。検証したパスと mktemp に渡す
# パスを一致させることで「検証対象と使用対象がずれる」種類のすり抜けを防ぐ。
# さらに、検証対象を TMP_ROOT_REAL 単体に限定すると、その祖先ディレクトリが
# 攻撃者所有・非 sticky な書き込み可能ディレクトリだった場合に検証後 rename で
# TMP_ROOT_REAL ごと差し替えられてしまう（検証窓の外側からの置換）。そのため
# TMP_ROOT_REAL からファイルシステムルートまでの全祖先ディレクトリへ同じ基準を
# 適用する。

# 単一ディレクトリに対して 所有者=自分 or root／他者書き込み可なら sticky bit
# 必須、を fail-closed で判定する（TMP_ROOT_REAL と全祖先ディレクトリで共用）。
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
# 上記で検証済みの実体パス（TMP_ROOT_REAL）に対して mktemp -d を直接呼び、
# 中間ディレクトリを挟まず mode 700 のディレクトリを原子的（mkdtemp(3) の O_EXCL 相当）
# に新規作成する。これにより Step 7 の rm -rf 前検証と実行の間の TOCTOU 窓へ
# 他プロセスが介入する経路を断つ（openat/O_NOFOLLOW ベースの完全な原子的削除は
# シェルスクリプトの範囲外のため、非予測可能かつ専有の作業ディレクトリで代替する）。
WORKDIR=$(mktemp -d "${TMP_ROOT_REAL}/contribute-${SKILL_NAME}-XXXXXXXX")
echo "==> 作業ディレクトリ: $WORKDIR"

# Step 6: upstream を clone する
# cd する前にローカルリポジトリのルートを捕捉する（cd - は stdout 汚染があるため使用しない）
ORIG_DIR="$(pwd)"
echo "==> upstream を clone 中..."
gh repo clone "${UPSTREAM_REPO}" "${WORKDIR}/upstream"
cd "${WORKDIR}/upstream"

DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's|refs/remotes/origin/||')
echo "    デフォルトブランチ: ${DEFAULT_BRANCH:-main}"

# REPO_SLUG は冒頭の安全弁ブロックで正規化・検証済み（OWNER/REPO 形式）のためここでは再正規化しない
# （二重管理を避け、検証済みの値を一貫して使う）

# Step 7: upstream のスキル配置を決定する（クローンしたリポジトリのレイアウトで判定）
# skills-lock.json の skillPath はローカル install パスであり upstream の配置ではないため使わない
# 各候補は assert_no_symlink_components で経路の全要素（.claude 等の最上位親を含む）が
# 実体の場合のみ採用する。upstream 側の clone に symlink（例: .claude がリポジトリ外を指す）
# が含まれていても、その経路をコピー先と数えず fail-closed で次候補へフォールバックする
UPSTREAM_SKILL_PATH=""
if [[ -d "skills/${SKILL_NAME}" ]] && assert_no_symlink_components "skills/${SKILL_NAME}"; then
  UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
elif [[ -d ".agents/skills/${SKILL_NAME}" ]] && assert_no_symlink_components ".agents/skills/${SKILL_NAME}"; then
  UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
elif [[ -d ".claude/skills/${SKILL_NAME}" ]] && assert_no_symlink_components ".claude/skills/${SKILL_NAME}"; then
  # upstream が .claude/skills/ 配下に実体を置いている慣習（例: create-skill / create-agent）。
  # .claude/skills/<name> は skills/<name> への symlink である慣習も併存するため、
  # 経路のどこかが symlink の場合は採用しない
  # （symlink の場合は解決先の実体が上の skills/ / .agents/skills/ 分岐で検出される）
  UPSTREAM_SKILL_PATH=".claude/skills/${SKILL_NAME}"
elif [[ -d "skills" ]] && assert_no_symlink_components "skills"; then
  # upstream が skills/ 配下で公開している慣習
  UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
elif [[ -d ".agents/skills" ]] && assert_no_symlink_components ".agents/skills"; then
  # upstream が .agents/skills/ 配下で公開している慣習
  UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
elif [[ -d ".claude/skills" ]] && assert_no_symlink_components ".claude/skills"; then
  # upstream が .claude/skills/ を実体スキルルートとして公開している慣習。
  # 新規スキル（upstream にまだ存在しない）は上の個別パス判定に掛からないため、
  # 親ディレクトリの存在で判定する。.claude / .claude/skills が symlink の場合は
  # 実体側ルートが上の skills/ / .agents/skills/ 分岐で検出されるため採用しない
  UPSTREAM_SKILL_PATH=".claude/skills/${SKILL_NAME}"
else
  echo "警告: upstream にスキルルートが見つかりません。skills/ を既定として新規追加します。"
  UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
fi

echo "==> upstream パス: ${UPSTREAM_SKILL_PATH}"

# 削除伝搬のための同期: cp -R は追加・上書きのみで削除を反映しないため、
# ローカルで削除したファイルが upstream 側に残存してしまう。宛先を消してから作り直す（delete-then-copy）。
# 安全弁: 削除対象が clone 内の想定スキルパス（3 形態のみ）であることを検証してから rm する
case "${UPSTREAM_SKILL_PATH}" in
  "skills/${SKILL_NAME}"|".agents/skills/${SKILL_NAME}"|".claude/skills/${SKILL_NAME}") ;;
  *)
    echo "エラー: 想定外の UPSTREAM_SKILL_PATH です: ${UPSTREAM_SKILL_PATH}"
    exit 1
    ;;
esac

# symlink 境界検証（fail-closed）: 上記 case allowlist は UPSTREAM_SKILL_PATH の
# 文字列形式のみを検証しており、clone 内の中間ディレクトリが実行中に symlink へ
# 差し替えられた場合には対応できない。rm -rf の直前に以下 2 点を実体パスで再確認する。
#   (a) clone ルートから削除対象までの各中間パス要素が symlink でないこと
#   (b) 削除対象の親ディレクトリの正規パス（pwd -P）が clone ルート配下であること
# いずれかに違反する場合は削除を実行せずエラー終了する。
# 残存する境界: 検証（pwd -P 確認）と rm -rf 実行の間に、書き込み権限を持つ別プロセスが
# 検証済みディレクトリ自体を改名・移動する可能性は原理上残る。これを検査と削除を単一の
# システムコールで不可分にして完全に閉じるには openat(..., O_NOFOLLOW) ベースの
# コンパイル済みヘルパーが必要であり、シェルスクリプトの範囲外とする。代わりに
# Step 5 で $WORKDIR を mode 700（同一 uid 専有）の非予測可能なパスとして作成し、
# 同一 uid の敵対プロセスは脅威モデル外とする（そのようなプロセスは本スクリプト自体
# も書き換え可能なため、追加防御しても意味がない）。
CLONE_ROOT="${WORKDIR}/upstream"
DELETE_TARGET="${CLONE_ROOT}/${UPSTREAM_SKILL_PATH}"
CLONE_ROOT_REAL="$(cd "${CLONE_ROOT}" && pwd -P)"

if ! assert_no_symlink_components "${UPSTREAM_SKILL_PATH}" "${CLONE_ROOT}"; then
  echo "エラー: 削除対象の経路に symlink が含まれています: ${SYMLINK_COMPONENT}"
  exit 1
fi

DELETE_PARENT="$(dirname "${DELETE_TARGET}")"
DELETE_LEAF="$(basename "${DELETE_TARGET}")"
if [[ -d "${DELETE_PARENT}" ]]; then
  # cd -P + 相対 rm で検証と削除の間の TOCTOU を閉じる: 上記ループでの検証後に
  # 中間ディレクトリが symlink へ差し替えられても、rm はパス文字列を再解決せず
  # cd -P が確定した実体（プロセスの cwd）に対して相対的に動作するため影響を受けない。
  # cd -P 自体は symlink を辿るため、cd 直後に物理パスを再検証してから rm する
  # （検証と削除の間に別の文字列解決を挟まないことで TOCTOU の窓を最小化する）。
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
    # leaf 自体が symlink に差し替えられていても、rm -rf はリンク先を辿らず
    # リンク自体のみを削除するため clone 外には影響しない
    rm -rf -- "${DELETE_LEAF}"
  )
fi
mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
cp -R "${ORIG_DIR}/${LOCAL_SKILL_DIR}/." "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}/"

# Step 8: 差分を確認する
echo ""
echo "--- upstream での変更差分 ---"
git status
git diff
echo ""

# Step 9: ブランチ作成・コミット（実際の実行は Claude が行う）
SLUG=$(date +%Y%m%d-%H%M%S)
BRANCH="contribute/${SKILL_NAME}-${SLUG}"

echo "==> 次のステップ（Claude が実行します）:"
echo "  git switch -c '${BRANCH}'"
echo "  git add ${UPSTREAM_SKILL_PATH}/"
echo "  git commit -m '<type>(<scope>): <subject>'"
echo "  git push -u origin '${BRANCH}'"
echo "  gh pr create --repo ${REPO_SLUG} --base ${DEFAULT_BRANCH:-main} --title '<title>' --body '...'"
echo ""
echo "作業ディレクトリ: ${WORKDIR}/upstream"
# 呼び出し元（SKILL.md）が後続 Step（差分確認・commit・push・PR 作成）で使う
# 作業 clone と upstream 側のスキルパスを機械的に取得できるよう、標準出力の
# 最終行群に機械可読な key=value を出力する。呼び出し元はこれらの値を唯一の
# 正とし、Step 5〜7 で別途算出した値（別 clone を前提に計算されている可能性がある）
# ではなく、ここで確定した値を後続処理に使うこと。
echo "CONTRIBUTE_SKILL_WORKDIR=${WORKDIR}/upstream"
echo "CONTRIBUTE_SKILL_UPSTREAM_PATH=${UPSTREAM_SKILL_PATH}"
