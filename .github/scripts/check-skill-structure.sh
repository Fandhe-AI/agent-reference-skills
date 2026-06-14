#!/usr/bin/env bash
# skills/ 配下のスキル構造を検証する CI チェック。
# 追加依存なし (bash + grep + awk) で self-hosted runner 上に即実行できる。
# 検証内容:
#   1. 各 skills/<name>/SKILL.md が frontmatter (--- 始まり) を持つ
#   2. frontmatter に name / description / user-invocable キーがある
#   3. name の値がディレクトリ名と一致する
#   4. skills-lock.json が妥当な JSON である (JSON ツールがある場合のみ)
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${repo_root}"

errors=0
err() {
  echo "::error::$*"
  errors=$((errors + 1))
}

# --- 1〜3. 各スキルの SKILL.md frontmatter を検証 ---
shopt -s nullglob
found=0
for skill_md in skills/*/SKILL.md; do
  found=$((found + 1))
  name_expected="$(basename "$(dirname "${skill_md}")")"

  # frontmatter は 1 行目が '---' である必要がある
  if [ "$(head -n 1 "${skill_md}")" != "---" ]; then
    err "${skill_md}: frontmatter が '---' で始まっていない"
    continue
  fi

  # 1 行目の '---' の次から 2 つ目の '---' までを frontmatter として抽出
  fm="$(awk 'NR==1 { next } /^---[[:space:]]*$/ { exit } { print }' "${skill_md}")"

  for key in name description user-invocable; do
    if ! printf '%s\n' "${fm}" | grep -qE "^${key}:"; then
      err "${skill_md}: frontmatter に '${key}:' が無い"
    fi
  done

  # name の値がディレクトリ名と一致するか検証。
  # name: が無い場合 grep が非ゼロ終了するが、pipefail + set -e で全体を中断させず
  # 残りのスキルも検証してサマリを出せるよう `|| true` で握り潰す
  # (値が空なら下の比較を skip するため誤検知にはならない)。
  name_value="$(printf '%s\n' "${fm}" \
    | grep -E '^name:' | head -n 1 \
    | sed -E 's/^name:[[:space:]]*//; s/[[:space:]]*$//' || true)"
  if [ -n "${name_value}" ] && [ "${name_value}" != "${name_expected}" ]; then
    err "${skill_md}: name '${name_value}' がディレクトリ名 '${name_expected}' と不一致"
  fi
done

if [ "${found}" -eq 0 ]; then
  err "skills/*/SKILL.md が 1 つも見つからない"
fi
echo "checked ${found} skill(s)"

# --- 4. skills-lock.json の JSON 妥当性 (利用可能なツールで best-effort 検証) ---
if [ -f skills-lock.json ]; then
  if command -v node >/dev/null 2>&1; then
    node -e 'JSON.parse(require("fs").readFileSync("skills-lock.json","utf8"))' \
      || err "skills-lock.json が妥当な JSON でない"
  elif command -v python3 >/dev/null 2>&1; then
    python3 -c 'import json; json.load(open("skills-lock.json"))' \
      || err "skills-lock.json が妥当な JSON でない"
  elif command -v jq >/dev/null 2>&1; then
    jq empty skills-lock.json || err "skills-lock.json が妥当な JSON でない"
  else
    echo "::warning::JSON 検証ツール (node/python3/jq) が無く skills-lock.json の検証を skip"
  fi
fi

if [ "${errors}" -gt 0 ]; then
  echo "::error::スキル構造検証で ${errors} 件の問題を検出"
  exit 1
fi
echo "skill structure check passed"
