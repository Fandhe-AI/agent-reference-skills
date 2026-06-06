#!/usr/bin/env bash
# skills-contribute.sh — ローカルスキルを upstream リポジトリへ PR として投稿する実例
#
# 使い方（リポジトリルートから実行）:
#   skills/contribute-skill/script/skills-contribute.sh <skill-name> <upstream-repo>
#   （インストール先からは .agents/skills/contribute-skill/script/skills-contribute.sh）
# 例: skills/contribute-skill/script/skills-contribute.sh create-commit Fandhe-AI/agent-cli-skills
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

# source の安全弁: Fandhe-AI/ または https://github.com/Fandhe-AI/ のみ許可
case "$UPSTREAM_REPO" in
  Fandhe-AI/*)
    ;;
  https://github.com/Fandhe-AI/*)
    ;;
  *)
    echo "エラー: 想定外の upstream: $UPSTREAM_REPO — Fandhe-AI/ 以外への push は許可されていません"
    exit 1
    ;;
esac

# ローカルスキルのパス確認（override: 環境変数 LOCAL_SKILL_DIR が設定済みならそれを検証して使う）
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
    echo "環境変数 LOCAL_SKILL_DIR にどちらかを指定して再実行してください（例: LOCAL_SKILL_DIR=.agents/skills/${SKILL_NAME} $0 ${SKILL_NAME} ${UPSTREAM_REPO}）。"
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

echo "==> contribute-skill: ${SKILL_NAME} → ${UPSTREAM_REPO}"
echo ""

# Step 3: 変更内容を確認する
echo "--- ローカル変更履歴 ---"
git log --oneline -- "${LOCAL_SKILL_DIR}/"
echo ""
echo "--- 最新差分 ---"
git diff HEAD~1 HEAD -- "${LOCAL_SKILL_DIR}/" 2>/dev/null || git diff -- "${LOCAL_SKILL_DIR}/"
echo ""

# Step 5: 作業用ディレクトリを用意する
UID_VAL=$(id -u)
TS=$(date +%Y%m%d-%H%M%S)
WORKDIR="/tmp/claude-${UID_VAL}/contribute-${SKILL_NAME}-${TS}"
mkdir -p "$WORKDIR"
echo "==> 作業ディレクトリ: $WORKDIR"

# Step 6: upstream を clone する
# cd する前にローカルリポジトリのルートを捕捉する（cd - は stdout 汚染があるため使用しない）
ORIG_DIR="$(pwd)"
echo "==> upstream を clone 中..."
gh repo clone "${UPSTREAM_REPO}" "${WORKDIR}/upstream"
cd "${WORKDIR}/upstream"

DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's|refs/remotes/origin/||')
echo "    デフォルトブランチ: ${DEFAULT_BRANCH:-main}"

# UPSTREAM_REPO を OWNER/REPO 形式へ正規化する（URL 形式の場合に gh pr create が失敗するのを防ぐ）
REPO_SLUG="${UPSTREAM_REPO#https://github.com/}"
REPO_SLUG="${REPO_SLUG%.git}"

# Step 7: upstream のスキル配置を決定する（skills-lock.json の skillPath を優先）
# skillPath は upstream での SKILL.md へのパス。その dirname がスキルディレクトリ。
# ORIG_DIR は cd 前に捕捉済み（クローン側ではなくローカルリポジトリの lockfile を読む）
UPSTREAM_SKILL_PATH=""
SKILL_PATH=$(jq -r ".skills[\"${SKILL_NAME}\"].skillPath // empty" "${ORIG_DIR}/skills-lock.json" 2>/dev/null)
if [[ -n "${SKILL_PATH}" ]]; then
  # skillPath が登録されている場合はその dirname を採用（authoritative）
  UPSTREAM_SKILL_PATH="$(dirname "${SKILL_PATH}")"
  mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
else
  # lockfile 未登録（新規スキル等）はクローン内のディレクトリ存在で判定
  if [[ -d "skills/${SKILL_NAME}" ]]; then
    UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
  elif [[ -d ".agents/skills/${SKILL_NAME}" ]]; then
    UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
  else
    echo "警告: upstream に ${SKILL_NAME} のパスが見つかりません。新規追加として扱います。"
    UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
    mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
  fi
fi

echo "==> upstream パス: ${UPSTREAM_SKILL_PATH}"
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
