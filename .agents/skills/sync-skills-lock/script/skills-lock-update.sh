#!/usr/bin/env bash
# skills-lock-update.sh — skills-lock.json の computedHash を npx skills add で更新する
#
# 使い方: ./script/skills-lock-update.sh <skill-name> <source-repo>
# 例: ./script/skills-lock-update.sh github-docs Fandhe-AI/agent-reference-skills
#
# このスクリプトは sync-skills-lock スキルが使用する実例コマンド集。
# リポジトリルートから実行すること。

set -euo pipefail

SKILL_NAME="${1:-}"
SOURCE_REPO="${2:-}"

if [[ -z "$SKILL_NAME" || -z "$SOURCE_REPO" ]]; then
  echo "使い方: $0 <skill-name> <source-repo>"
  echo "例: $0 github-docs Fandhe-AI/agent-reference-skills"
  exit 1
fi

# source の安全弁: Fandhe-AI/ または https://github.com/Fandhe-AI/ のみ許可
case "$SOURCE_REPO" in
  Fandhe-AI/*)
    ;;
  https://github.com/Fandhe-AI/*)
    ;;
  *)
    echo "エラー: 想定外の source: $SOURCE_REPO — Fandhe-AI/ 以外の source は許可されていません"
    exit 1
    ;;
esac

# gh CLI の認証確認
if ! gh auth status &>/dev/null; then
  echo "エラー: gh CLI が認証されていません。gh auth login を実行してください。" >&2
  exit 1
fi

echo "==> skills-lock.json を更新中: ${SKILL_NAME} (source: ${SOURCE_REPO})"
echo ""

# 更新前の computedHash を表示
echo "変更前の computedHash:"
SKILL_NAME_VAR="${SKILL_NAME}" python3 - <<'PYEOF'
import json, os, sys
skill = os.environ['SKILL_NAME_VAR']
try:
    with open('skills-lock.json') as f:
        lock = json.load(f)
    skills = lock.get('skills', {})
    if skill in skills:
        print(skills[skill].get('computedHash', '(computedHash なし)'))
    else:
        print('(未登録)')
except FileNotFoundError:
    print('(skills-lock.json が見つかりません)', file=sys.stderr)
    sys.exit(1)
PYEOF

echo ""

# npx skills add で CLI に computedHash を更新させる
# --yes / -y で確認プロンプトをスキップ
npx skills add "${SOURCE_REPO}" --skill "${SKILL_NAME}" --yes

echo ""
echo "==> 更新完了。変更内容:"
git diff skills-lock.json

echo ""
echo "コミットするには:"
echo "  git add skills-lock.json"
echo "  git add .agents/skills/"
echo "  git commit -m 'chore(skills-lock): ${SKILL_NAME} の computedHash を upstream と同期'"
