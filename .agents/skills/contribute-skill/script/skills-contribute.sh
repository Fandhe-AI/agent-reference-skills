#!/usr/bin/env bash
# skills-contribute.sh — ローカルスキルを upstream リポジトリへ PR として投稿する実例
#
# 使い方: ./script/skills-contribute.sh <skill-name> <upstream-repo>
# 例: ./script/skills-contribute.sh create-commit Fandhe-AI/agent-cli-skills
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

# ローカルスキルのパス確認（skills/ → .agents/skills/ の順で探す）
if [[ -d "skills/${SKILL_NAME}" ]]; then
  LOCAL_SKILL_DIR="skills/${SKILL_NAME}"
elif [[ -d ".agents/skills/${SKILL_NAME}" ]]; then
  LOCAL_SKILL_DIR=".agents/skills/${SKILL_NAME}"
else
  echo "エラー: ローカルスキルが見つかりません: skills/${SKILL_NAME} / .agents/skills/${SKILL_NAME}"
  exit 1
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

# Step 7: upstream のパス構造を確認してコピーする
# upstream 側のパスは skills/<name>/ か .agents/skills/<name>/ かを確認する
UPSTREAM_SKILL_PATH=""
if [[ -d "skills/${SKILL_NAME}" ]]; then
  UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
elif [[ -d ".agents/skills/${SKILL_NAME}" ]]; then
  UPSTREAM_SKILL_PATH=".agents/skills/${SKILL_NAME}"
else
  echo "警告: upstream に ${SKILL_NAME} のパスが見つかりません。新規追加として扱います。"
  UPSTREAM_SKILL_PATH="skills/${SKILL_NAME}"
  mkdir -p "${WORKDIR}/upstream/${UPSTREAM_SKILL_PATH}"
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
