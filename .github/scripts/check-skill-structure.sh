#!/usr/bin/env bash
# スキルリポジトリ共通の構造検証 CI チェック（統一版）。
# agent-cli-skills / agent-util-skills / agent-reference-skills の 3 実装を
# 検証項目の和集合として統合したもので、どのスキルリポのルートでもそのまま動く。
# 追加依存なし (bash + grep + awk + sed。JSON 検証のみ node/python3/jq のいずれかを利用) で
# ubuntu-latest / self-hosted runner 上に即実行できる。
# 検証内容:
#   1. 各 skills/<name>/SKILL.md が frontmatter (--- 始まり) を持つ
#   2. frontmatter に name / description / user-invocable キーがある
#      (user-invocable の値は true / false のみ許容)
#   3. name の値がディレクトリ名と一致する
#   4. .claude/skills/<name> 配下の symlink がリンク切れでない (実ディレクトリは対象外)
#   5. skills-lock.json が存在し妥当な JSON である
set -euo pipefail

# 検証対象リポジトリのルートを解決する。優先順位:
#   1. 第 1 引数（明示指定。テンプレート未配備のリポを外から検査する用途）
#   2. カレントディレクトリ（skills/ を持つ場合。CI は
#      `bash .github/scripts/check-skill-structure.sh` とリポルートから呼ぶためここで確定する。
#      未配備のドラフト置き場から `cd <repo> && bash <このスクリプト>` で実行するケースも同経路）
#   3. スクリプト位置基準の ../..（.github/scripts/ へ配備済みでサブディレクトリから
#      呼ばれた場合の fallback。ドラフト置き場では隣に雛形スタブが並び得るため最後に回す）
if [ -n "${1:-}" ]; then
  repo_root="$(cd "$1" && pwd)"
elif [ -d skills ]; then
  repo_root="$(pwd)"
else
  repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
fi
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

  # name / description は全リポ共通の必須キー。user-invocable は util / reference が
  # 要求していたもので、統一版では全リポ必須へ引き上げる（未対応リポは fail が期待動作）。
  for key in name description user-invocable; do
    if ! printf '%s\n' "${fm}" | grep -qE "^${key}:"; then
      err "${skill_md}: frontmatter に '${key}:' が無い"
    fi
  done

  # user-invocable はキーの存在だけでなく値も検証する。キー存在のみの検証では
  # 空値や `yes` / `on` 等の YAML 真偽値もどきが素通りし、消費側 (スキル読み込み) の
  # 挙動が不定になるため、値を true / false の 2 値に限定する
  # (キー不在は上のループでエラー済みのため、ここではキーがある場合のみ判定する)。
  if printf '%s\n' "${fm}" | grep -qE '^user-invocable:'; then
    ui_value="$(printf '%s\n' "${fm}" \
      | grep -E '^user-invocable:' | head -n 1 \
      | sed -E 's/^user-invocable:[[:space:]]*//; s/[[:space:]]*$//' || true)"
    if [ "${ui_value}" != "true" ] && [ "${ui_value}" != "false" ]; then
      err "${skill_md}: user-invocable の値 '${ui_value}' が不正 (true / false のみ許容)"
    fi
  fi

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

# --- 4. .claude/skills/ 配下の symlink リンク切れ検証 ---
# .claude/skills/ には skills/ への symlink のほか、実ディレクトリ
# (cli の create-skill / create-agent 等) や別ソースへの symlink (github-docs) も
# 混在し得る（skill-vendoring-layout 方針で混在は許容）。symlink のみを対象に
# リンク切れを検出し、実ディレクトリは検査対象外として許容する。
# .claude/skills 自体を持たないリポでも動くよう、不在は skip する。
if [ -d .claude/skills ]; then
  link_found=0
  for entry in .claude/skills/*; do
    if [ -L "${entry}" ]; then
      link_found=$((link_found + 1))
      if [ ! -e "${entry}" ]; then
        err ".claude/skills/$(basename "${entry}"): symlink がリンク切れ ($(readlink "${entry}"))"
      fi
    fi
  done
  echo "checked ${link_found} symlink(s) under .claude/skills/"
fi

# --- 5. skills-lock.json の存在と JSON 妥当性 ---
# skills-lock.json は必須ファイル。不在を黙って skip すると「検証済み」を偽る
# (CI / ワークフローのコメントが矛盾する) ため、不在は明確にエラーにする。
if [ ! -f skills-lock.json ]; then
  err "skills-lock.json が存在しない (必須ファイル)"
elif command -v node >/dev/null 2>&1; then
  node -e 'JSON.parse(require("fs").readFileSync("skills-lock.json","utf8"))' \
    || err "skills-lock.json が妥当な JSON でない"
elif command -v python3 >/dev/null 2>&1; then
  python3 -c 'import json; json.load(open("skills-lock.json"))' \
    || err "skills-lock.json が妥当な JSON でない"
elif command -v jq >/dev/null 2>&1; then
  jq empty skills-lock.json || err "skills-lock.json が妥当な JSON でない"
else
  echo "::warning::JSON 検証ツール (node/python3/jq) が無く skills-lock.json の JSON 検証を skip (存在は確認済み)"
fi

if [ "${errors}" -gt 0 ]; then
  echo "::error::スキル構造検証で ${errors} 件の問題を検出"
  exit 1
fi
echo "skill structure check passed"
