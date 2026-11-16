---
name: update-docs
description: >
  前回更新コミット (_/.last-update-docs で追跡) からの差分をもとに、指示ファイルのスキル一覧・リポジトリ構造ツリーを更新する。
  更新するのは CLAUDE.md があれば CLAUDE.md、無ければ AGENTS.md の「ある方」のみ（両方あれば CLAUDE.md だけ）。
  新スキル追加時、.claude/agents・.claude/rules・.agents/skills・.codex/agents・.opencode/agents の変更時、
  「ドキュメント更新して」「CLAUDE.md を更新して」「AGENTS.md を更新して」で使用。
  コード内コメント・ドキュメンテーションコメントの補強を依頼された場合にも参照する指針を含む。
model: haiku
user-invocable: true
---

# update-docs

コード変更に基づいて、対象リポジトリの指示ファイル（`CLAUDE.md` または `AGENTS.md` の**ある方**）を更新し、`_/.last-update-docs` に記録します。

更新するのは 1 つだけで、Step 0 で選ぶ。`CLAUDE.md` があれば `CLAUDE.md` だけを更新する（`AGENTS.md` があっても触らない）。`CLAUDE.md` が無く `AGENTS.md` があれば `AGENTS.md` を更新する。どちらも無ければファイルを作らずに報告して止める。以降、選ばれた方を「指示ファイル」と呼ぶ。

## `_/.last-update-docs` ファイル形式

```
commit_hash=<hash>
commit_subject=<1行目>
commit_date=<ISO 8601>
```

このファイルは `.gitignore` で除外されローカル専用。

## フロー

### Step 0: 更新する指示ファイルを選ぶ

このスキルの `scripts/`（SKILL.md と同じディレクトリ）にある `select-target.sh` と `agents-section.sh` を使う。絶対パスは、読み込んだ SKILL.md の場所から求める。**信頼境界:** 次のフェンスは、対象リポジトリ内のスクリプトを `skills/` → `.agents/skills/` → `.claude/skills/` の順に探して実行する。リポジトリの内容を信頼する前提は、このリポジトリのほかのスキルと同じである（信頼できないリポジトリでは実行しない）。各コードフェンスは独立したシェルで実行され得るため、次のフェンスはスクリプトを `skills/` → `.agents/skills/` → `.claude/skills/` の 3 レイアウトから自己完結的に解決する。リポジトリのルートで実行する。

```bash
SELECT_TARGET=""
for CANDIDATE in \
  "skills/update-docs/scripts/select-target.sh" \
  ".agents/skills/update-docs/scripts/select-target.sh" \
  ".claude/skills/update-docs/scripts/select-target.sh"; do
  # 存在確認は -f のみ（vendoring で実行ビットが落ちても bash 経由で起動できる）
  if [[ -f "${CANDIDATE}" ]]; then
    SELECT_TARGET="${CANDIDATE}"
    break
  fi
done
if [[ -z "${SELECT_TARGET}" ]]; then
  echo "エラー: select-target.sh が見つからない（3 レイアウトいずれにも存在しない）" >&2
  exit 1
fi

# 最終行が UPDATE_DOCS_TARGET <claude|agents|none>。非ゼロ終了はそのまま終了ステータスにする
bash "${SELECT_TARGET}" --root .
```

最終行の語彙で次のとおり進む。

| 結果 | 更新する指示ファイル | 以降の扱い |
|------|---------------------|-----------|
| `claude` | `CLAUDE.md` | 従来どおり直接編集する（`CLAUDE.md` がリポジトリ内への symlink のときも可）。`AGENTS.md` があっても読み書きしない（バイト単位で変えない） |
| `agents` | `AGENTS.md` | **update-docs 専用のマーカー区間の中だけ**を `agents-section.sh` で書く（後述）。区間の外は変更しない。`CLAUDE.md` と `AGENTS.md` が同じファイルで、どちらかがシンボリックリンクのときも `agents` になり、stderr に警告が出る（両方が同じ実体への別々のリンクでも同じ）。`AGENTS.md` 自体がリポジトリ内の別ファイルへのシンボリックリンクのときは、リンクを保ったままリンク先の実体へ書く。`CLAUDE.md` として直接書き換えると init-codex 等の管理区間とレビュー観点集を壊し得るためで、`CLAUDE.md` は直接編集しない |
| `none` | なし | ファイルを作らずに、`CLAUDE.md` も `AGENTS.md` も無かったことを報告して止める（Step 1 以降へ進まない） |
| `error-symlink`（終了コード 3） | なし | `CLAUDE.md` か `AGENTS.md` が symlink で、リンク先がリポジトリの外にある・壊れている・通常ファイルでない。リポジトリ外のファイルを書き換えないため、書かずに報告して止める（Step 1 以降へ進まない）。リンクの修正はユーザーに任せる |
| `error-hardlink`（終了コード 3） | なし | `CLAUDE.md` と `AGENTS.md` が同じファイルへのハードリンク。置換でリンクが切れるため、書かずに報告して止める。どちらかを symlink か別ファイルにするようユーザーに案内する |
| 終了コードが上記以外の 0 以外 | なし | 使い方の誤り・ルート不在。原因を報告して止める |

#### `agents` のときの書き込み規則

`AGENTS.md` には init-codex 系の管理区間や、setup-repo-guards が置くレビュー観点集など、人が育てた本文がある。そのため次を守る。

- **`AGENTS.md` への書き込みは `agents-section.sh` だけで行う。** ファイルの直接編集（エディタ操作・`sed`・リダイレクト等）は禁止する。
- 書くのは `<!-- agent-cli-skills:update-docs:start -->` 〜 `<!-- agent-cli-skills:update-docs:end -->` の中身だけ。区間が無ければ末尾へ追記される。区間の外（管理区間・見出し・観点集）はバイト単位で変わらない。
- 区間に書く内容は、スキル一覧と構成の節（Step 3 の `## Current Skills (N)`・リポジトリ管理スキル・参照スキルの各節と、Repository Structure）。区間の中身を読み、`CLAUDE.md` の場合と同じ更新を施した**全文**を `_/update-docs-section.md` へ書いて（`_/` が無ければ作る）`--block` に渡す。中身に 2 つのマーカー（`update-docs` 用と `agents-md` 用の start / end）の文字列は含めない。
- 区間の外にある同名の節や手書きの記述は更新しない。
- 次のときは書かずに止まるので、結果語彙を報告してユーザーに対応を求める: 自マーカーが片方のみ・重複・逆順（`error-markers`）、`agents-md` 管理区間の内側にある、または内側に含む（`error-nested`）、コードフェンスが閉じていない（`error-fence`）、中身にマーカーがある（`error-block-marker`）、`--block` の中身のファイルがシンボリックリンク（`error-symlink`）、走査のあとに `AGENTS.md` が書き換えられた（`error-changed`。他の更新を上書きしないため。内容を確かめてから再実行する）。自分でマーカーを直したり、スクリプトを迂回したりしない。
- 書き込み後の `AGENTS.md` が 32768 バイト（Codex の既定の読み込み上限）を超えると stderr に警告が出る。書き込みは行われる。報告に警告を含め、一覧の簡素化をユーザーに提案する。

書き込みの手順（Step 3 で区間の中身の全文を `_/update-docs-section.md` へ書いたあとに実行する。ファイルが無いとスクリプトが止まる）。書き込み先は `select-target.sh --print-write-path` が返す物理パスで、`AGENTS.md` がリポジトリ内の別ファイルへのシンボリックリンクでも、リンクは壊さずリンク先の実体へ区間だけを書く。`select-target.sh` がエラー語彙（`error-symlink`・`error-hardlink`）で止めた場合は、その語彙と終了コードをそのまま報告して止まる（上の表と同じ扱い）:

```bash
AGENTS_SECTION=""
for CANDIDATE in \
  "skills/update-docs/scripts/agents-section.sh" \
  ".agents/skills/update-docs/scripts/agents-section.sh" \
  ".claude/skills/update-docs/scripts/agents-section.sh"; do
  if [[ -f "${CANDIDATE}" ]]; then
    AGENTS_SECTION="${CANDIDATE}"
    break
  fi
done
if [[ -z "${AGENTS_SECTION}" ]]; then
  echo "エラー: agents-section.sh が見つからない（3 レイアウトいずれにも存在しない）" >&2
  exit 1
fi

# 書き込み先は select-target.sh が決める。--print-write-path は、選択と同じ検証（リポジトリ内の
# 通常ファイル・symlink を最後まで辿る・ハードリンクは拒否）を通った物理パスだけを返す。
# select-target.sh は agents-section.sh と同じディレクトリにある。
SELECT_TARGET="$(dirname "${AGENTS_SECTION}")/select-target.sh"
if [[ ! -f "${SELECT_TARGET}" ]]; then
  echo "エラー: select-target.sh が見つからない（agents-section.sh と同じディレクトリに無い）" >&2
  exit 1
fi
sel_status=0
SEL_OUT="$(bash "${SELECT_TARGET}" --root . --print-write-path)" || sel_status=$?
if (( sel_status != 0 )); then
  printf '%s\n' "${SEL_OUT}"
  echo "exit=${sel_status}" >&2
  exit "${sel_status}"
fi
if [[ "$(printf '%s\n' "${SEL_OUT}" | tail -n 1)" != "UPDATE_DOCS_TARGET agents" ]]; then
  echo "エラー: 更新対象が AGENTS.md ではないため、区間を書かずに止める（Step 0 の結果を確認する）" >&2
  exit 1
fi
TARGET_FILE="$(printf '%s\n' "${SEL_OUT}" | sed -n 's/^UPDATE_DOCS_WRITE_PATH //p')"
if [[ -z "${TARGET_FILE}" ]]; then
  echo "エラー: 書き込み先のパスを得られないため、区間を書かずに止める" >&2
  exit 1
fi

# 書き込み前に --check で結果語彙（appended / replaced / unchanged）を確かめ、
# 非ゼロ終了はそのままフェンスの終了ステータスにする
BODY="_/update-docs-section.md"
status=0
bash "${AGENTS_SECTION}" --target "${TARGET_FILE}" --block "${BODY}" --check || status=$?
if (( status == 0 )); then
  bash "${AGENTS_SECTION}" --target "${TARGET_FILE}" --block "${BODY}" || status=$?
fi
rm -f "${BODY}"
if (( status != 0 )); then
  echo "exit=${status}" >&2
  exit "${status}"
fi
```

最終行は `UPDATE_DOCS_SECTION_RESULT <appended|replaced|unchanged|error-...>`。`unchanged` なら `AGENTS.md`（リンクのときはリンク先の実体）は書き換えられていない。

### Step 1: 前回の更新コミットを確認する

`_/.last-update-docs` を読み込んで `commit_hash` を取得する。値は**展開する前に**検証し、40 桁の小文字 16 進（`^[0-9a-f]{40}$`）でなければ報告して止める（コマンドやオプションとして解釈される値を後続のシェルへ渡さないため）。ファイルが存在しない場合は初回扱いで、`BASE_COMMIT` は空になる。

```bash
LAST_FILE="_/.last-update-docs"
BASE_HASH=""
if [[ -f "${LAST_FILE}" ]]; then
  BASE_HASH="$(sed -n 's/^commit_hash=//p' "${LAST_FILE}" | head -n 1)"
  if [[ ! "${BASE_HASH}" =~ ^[0-9a-f]{40}$ ]]; then
    echo "エラー: ${LAST_FILE} の commit_hash が 40 桁の小文字 16 進ではないため中止する（ファイルを確認する）" >&2
    exit 1
  fi
fi
# 出力の BASE_COMMIT を Step 2 で使う（空なら初回）
echo "BASE_COMMIT=${BASE_HASH}"
```

### Step 2: 変更内容を確認する

Step 1 の `BASE_COMMIT` の値を単一引用符の中に入れて実行する。シェルの状態は呼び出しごとに消えるため、フェンスの中でも形式を検証し直す。初回（空）は直近 10 件のコミットを見て、現在の構成を Step 3 で全件確認する。

```bash
BASE_HASH='<Step 1 の BASE_COMMIT の値>'
if [[ -z "${BASE_HASH}" ]]; then
  git log -n 10 --oneline
elif [[ "${BASE_HASH}" =~ ^[0-9a-f]{40}$ ]]; then
  git log "${BASE_HASH}..HEAD" --oneline
  git diff "${BASE_HASH}..HEAD" --stat
  # 次の場所の変更は、一覧・構造ツリーの更新対象になる
  git diff --name-only "${BASE_HASH}..HEAD" -- \
    skills .claude/agents .claude/rules .claude/skills \
    .agents/skills .codex/agents .opencode/agents
else
  echo "エラー: BASE_COMMIT が 40 桁の小文字 16 進ではないため中止する" >&2
  exit 1
fi
```

変更されたファイルと内容を把握する。

### Step 3: 指示ファイルを更新する

Step 0 で選んだ指示ファイル（`CLAUDE.md` または `AGENTS.md`）を更新する。`AGENTS.md` のときは、ここで作った内容を Step 0 の手順で `agents-section.sh` に渡して書き込む（直接編集しない）。

#### Current Skills の更新

スキルを2系統に分けて列挙し、指示ファイルの `## Current Skills` セクションと「リポジトリ管理スキル」セクションをそれぞれ更新する。

**系統 A: 配布可能スキルの全列挙（カウント対象）**

上流リポジトリ（`skills/` を持つ）では `skills/` を列挙する。`skills/` を持たない消費側
リポジトリでは `.agents/skills/` を列挙する（該当ディレクトリが無い場合も含めて空集合として
扱い、非ゼロ終了で手順を止めない）。

```bash
# -L で symlink を追従する（skills/<name> や .agents/skills/<name> がディレクトリへの
# symlink の場合でも SKILL.md を取りこぼさないため。classify_b の候補集合も -L 付きで
# 全列挙しており、-L 無しだと系統 A と B1 の計上件数が食い違う）。
if [ -d skills ]; then
  find -L skills -mindepth 2 -maxdepth 2 -name SKILL.md | sed -E 's#^skills/##; s#/SKILL.md$##' | sort
elif [ -d .agents/skills ]; then
  find -L .agents/skills -mindepth 2 -maxdepth 2 -name SKILL.md | sed -E 's#^\.agents/skills/##; s#/SKILL.md$##' | sort
fi
# いずれのディレクトリも無ければ何も出力しない（空集合。エラー終了しない）
```

- スキル数のカウントを更新: `## Current Skills (N)`（N は系統 A のみ）
- カンマ区切りのスキル名一覧を更新
- 指示ファイル（`AGENTS.md` のときは update-docs の区間）に `## Current Skills` セクションが存在しない場合は新規作成する
- `.claude/` が無く `.agents/skills/` だけにスキルがあるリポジトリ（Codex / OpenCode だけを使う構成）でも、`skills/` が無ければ上のコマンドが `.agents/skills/` を列挙するため、系統 A で数える（数え漏れない）。系統 B の `WARN: .claude/skills/<name> から実体へ到達できない` はこの構成では想定内で、同じスキルは系統 A で計上済みのため B2・B3 の節には載せない

**系統 B: `.claude/skills/` / `.agents/skills/` 配下のスキルの全列挙（列挙対象。カウントの扱いは内訳による）**

下記の `-L` 付き find は「`.claude/skills/` と `.agents/skills/` から見える全スキル」を
取りこぼしなく列挙するためのコマンドであり、後述「注意事項」にある `-L` 無しの
`find .claude/skills ... -type d`（実ディレクトリだけの抽出。用途が異なる）とは別物。
用途の違いは「注意事項」節を参照。

```bash
# -L で symlink を追従し、.claude/skills/（symlink）と .agents/skills/（実体）の
# 両レイアウトを網羅する。SKILL.md を持つディレクトリのみを抽出し重複排除する。
# （npx skills add は .agents/skills/ に実体を置き .claude/skills/ から symlink する）
find -L .claude/skills .agents/skills -mindepth 1 -maxdepth 1 -type d \
  -exec test -f '{}/SKILL.md' ';' -print 2>/dev/null \
  | sed -E 's#.*/##' | sort -u
```

`find -L` で symlink を追従するため、`.claude/skills/` 配下が symlink でも、また
スキル実体が `.agents/skills/` 側にある場合でも取りこぼさない（`-type d` 単独だと
symlink エントリを除外してしまうため `-L` が必須）。`-exec test -f '{}/SKILL.md' ';'`
はシェル再展開を経由しないため、ディレクトリ名に空白等が含まれても安全。

系統 B の各エントリは**実体の所在**でさらに 3 分類され、`## Current Skills (N)` の
N に含めるかどうかはこの内訳で決まる（系統 B という区分自体がカウントの可否を
決めるわけではない）。

分類は「`.claude/skills/<name>` 自身が symlink か」「`.agents/skills/<name>` 自身が symlink
先か」といった symlink の**位置**では判定しない。`.claude/skills` ディレクトリ自体が
`.agents/skills` を指す symlink であるレイアウト（親 symlink 型）では、配下の
`.claude/skills/<name>` は symlink ではなく実ディレクトリに見える（親越しに見える実体）ため、
symlink の有無を見る判定はこのレイアウトで成立しない。そのため判定基準は「`.claude/skills/<name>`
から `cd -P && pwd -P` で物理解決した先が、`skills/<name>` または `.agents/skills/<name>` の
物理解決先と一致するか」とする。この方式は親 symlink 型・子 symlink 型（`.claude/skills/<name>`
自身が symlink）・実ディレクトリ型のいずれでも同じロジックで判定できる。

系統 A の列挙元は `skills/` の有無で切り替わる（Step 3 系統 A 参照）ため、B1/B3 の判定も
`skills/` ディレクトリ自体の有無で分岐する。**上流レイアウト**（`skills/` あり。系統 A の
列挙元は `skills/`）と**消費側レイアウト**（`skills/` なし。系統 A の列挙元は `.agents/skills/`）
の 2 通りがあり、`.agents/skills/<name>` への一致がどちらに分類されるかが変わる。

| 区分 | 実体の所在 | N に含めるか | 記載先 |
|------|-----------|------------|--------|
| B1 | `skills/<name>/`（`.claude/skills/<name>` の物理解決先が `skills/<name>` の物理解決先と一致することを検証済み）。**消費側レイアウトでは加えて** `.agents/skills/<name>/`（`.claude/skills/<name>` の物理解決先が `.agents/skills/<name>` の物理解決先と一致することを検証済み）も B1 に含む（系統 A の列挙元が `.agents/skills/` であるため、同じ実体への一致は系統 A で既に計上済み） | 含める（系統 A の列挙で既に計上済み。B1 を理由に N を増減させない） | `## Current Skills (N)` |
| B2 | `.claude/skills/<name>/` が `SKILL.md` を持つ実体で、`skills/<name>/` にも `.agents/skills/<name>/` にも該当せず、`skills-lock.json` にも掲載されていない | 含めない | 「リポジトリ管理スキル（.claude/skills/ に配置）」 |
| B3 | **上流レイアウト限定**: `.agents/skills/<name>/` が `SKILL.md` を持つ実体で、`.claude/skills/<name>` の物理解決先が `.agents/skills/<name>` の物理解決先と一致することを検証済み（`.claude/skills/<name>` 自身が symlink である子 symlink 型・`.claude/skills` 自体が symlink である親 symlink 型のいずれも該当）。`skills/<name>` とは別実体の参照スキルという位置づけのため、`skills/` が存在する上流レイアウトでのみ成立する。消費側レイアウトでは同じ一致は B1 として扱う（B3 に該当するケースが存在しない） | 含めない | 「参照スキル（.claude/skills/ に配置）」 |
| B4 | 誤配置・判定不能（`skills-lock.json` 掲載の実ディレクトリ、物理解決先の不一致・到達不能、別ターゲットへの symlink、`jq` 不在でタイブレーク未実施 等） | 含めない | 指示ファイルには記載しない（stderr へ警告のみ。手動対応が必要な構成問題として扱う） |

B1・B2・B3 の抽出コマンド（シェル関数として定義する。「検証」節でも**同一の関数**を呼び出すため、
コマンド本体はここに一度だけ記述する）。分類の核は単一の分類器 `classify_b`（名前ごとに排他的な
1 分類を出力する）に集約し、`extract_b1`・`extract_b2`・`extract_b3` はその出力を区分でフィルタする
薄いラッパーとして定義する（Step 3・検証節はこの 3 関数を呼び出す）。
いずれも「注意事項」のタイブレークを `classify_b` 自体に組み込んだ自己完結スクリプトとし、
分類ロジックと注意事項の記述が食い違わないようにする。**判定できない・条件を満たさないケースは
B1/B2/B3 から除外して stderr へ警告する（fail-closed）**。除外分は B4 として扱い、下記の件数整合式で
回収する:

```bash
# 物理パス正規化ヘルパー。symlink（子 symlink 型・親 symlink 型）・実ディレクトリの
# いずれの経路で見えるエントリも `cd -P` で辿った物理パスへ正規化することで、
# symlink の位置に依存しない解決先ベースの判定を可能にする。
# 到達不能（エントリ不在・broken symlink）の場合は空文字列を返す。
resolve() { cd -P -- "$1" 2>/dev/null && pwd -P; }

# classify_b: 系統 B の各名前を B1/B2/B3 のいずれか 1 分類（該当しなければ B4 警告のみ）へ
# 排他的に振り分ける単一分類器。「名前ごとに 1 回だけ判定する」構造で排他性を保証する。
# 出力は "<区分>\t<名前>" 形式（B1/B2/B3 のみ。B4 は stdout に出さず stderr へ WARN する）。
#
# 候補集合: -L 付き全列挙（SKILL.md を持つディレクトリのみ）。「SKILL.md を持たない
# エントリは対象外（B4 にも計上しない）」の既存挙動は、この候補集合の構築自体で維持される。
#
# 判定順序（上から順・排他）:
#   1. .claude/skills/<n> の物理解決先が空（エントリ不在・broken symlink）→ B4 警告
#   2. skills/<n> の物理解決先が非空 かつ 一致 → B1
#   3. skills/<n> の物理解決先が非空 かつ 不一致 → B4 警告（配布実体と解決先不一致）
#   4. .agents/skills/<n> の物理解決先が非空 かつ 一致 →
#        - skills/ ディレクトリが存在する（上流・二重役割レイアウト）→ B3
#          （親 symlink 型・子 symlink 型の双方をこの 1 条件で吸収する。skills/<n> とは
#          別実体の参照スキルという位置づけのため上流レイアウトに限定する）
#        - skills/ ディレクトリが存在しない（消費側レイアウト。系統 A の列挙元は
#          .agents/skills/ そのもの）→ B1（系統 A で既に計上済みの実体へのリンクであり、
#          B3 に分類すると A のカウントと矛盾する）
#   5. .agents/skills/<n> の物理解決先が非空 かつ 不一致 → B4 警告（参照/配布実体と解決先不一致）
#   6. .claude/skills/<n> の物理解決先が .claude/skills 自体の物理解決先直下（.claude/skills/<n>
#      と等価）→ B2 候補 → skills-lock.json タイブレーク（jq 不在→B4／jq exit 0→掲載あり
#      誤配置として B4／exit 1→B2／それ以外→解析失敗として B4。既存の B2 タイブレークをそのまま踏襲）
#   7. 上記いずれにも該当しない（別ターゲットへの symlink 等）→ B4 警告
classify_b() {
  find -L .claude/skills .agents/skills -mindepth 1 -maxdepth 1 -type d \
    -exec test -f '{}/SKILL.md' ';' -print 2>/dev/null \
    | sed -E 's#.*/##' | sort -u |
    while read -r n; do
      p=$(resolve ".claude/skills/${n}")
      if [ -z "${p}" ]; then
        echo "WARN: .claude/skills/${n} から実体へ到達できない（未配置・broken symlink 等。B4 扱い）" >&2
        continue
      fi

      s=$(resolve "skills/${n}")
      if [ -n "${s}" ]; then
        if [ "${p}" = "${s}" ]; then
          printf 'B1\t%s\n' "${n}"
        else
          echo "WARN: .claude/skills/${n} の解決先が skills/${n} と一致しない（B4 扱い）" >&2
        fi
        continue
      fi

      a=$(resolve ".agents/skills/${n}")
      if [ -n "${a}" ]; then
        if [ "${p}" = "${a}" ]; then
          # skills/ が存在しない消費側レイアウトでは .agents/skills/ が系統 A の
          # 列挙元そのものであるため、この一致は B3（参照スキル）ではなく B1
          # （系統 A で計上済みの実体へのリンク）として扱う。B3 のまま倒すと
          # 「A に含める」と「B3 は N に含めない」が矛盾する。
          if [ -d skills ]; then
            printf 'B3\t%s\n' "${n}"
          else
            printf 'B1\t%s\n' "${n}"
          fi
        else
          echo "WARN: .claude/skills/${n} の解決先が .agents/skills/${n} と一致しない（B4 扱い）" >&2
        fi
        continue
      fi

      c=$(resolve ".claude/skills")
      if [ -n "${c}" ] && [ "${p}" = "${c}/${n}" ]; then
        if [ -f skills-lock.json ]; then
          if ! command -v jq >/dev/null 2>&1; then
            echo "WARN: jq が見つからないため ${n} の skills-lock.json タイブレークを判定できない（B4 扱い。jq を導入するか手動確認する）" >&2
            continue
          fi
          jq -e --arg n "${n}" '.skills[$n] != null' skills-lock.json >/dev/null 2>&1
          jq_status=$?
          # jq の終了ステータスは 0=真（掲載あり）/ 1=偽（掲載なし）/ それ以外=実行時
          # エラー（不正な JSON 等）の3値。0/1 以外を「掲載なし」と誤読すると
          # 壊れた skills-lock.json のときに誤配置スキルが素通りして B2 に混入する
          # ため、エラーは fail-closed で B4 に倒す（jq 不在時と同じ扱い）。
          if [ "${jq_status}" = "0" ]; then
            echo "WARN: ${n} は .claude/skills/ が実ディレクトリのまま skills-lock.json に掲載されている（symlink 化検討対象。B4 扱い）" >&2
            continue
          elif [ "${jq_status}" != "1" ]; then
            echo "WARN: skills-lock.json の解析に失敗した（jq exit=${jq_status}）ため ${n} のタイブレークを判定できない（B4 扱い）" >&2
            continue
          fi
        fi
        printf 'B2\t%s\n' "${n}"
        continue
      fi

      echo "WARN: ${n} は skills/ にも .agents/skills/ にも対応する実体がなく、.claude/skills 直下の実体でもない（別ターゲットへの symlink 等。B4 扱い）" >&2
    done
}

extract_b1() { classify_b | awk -F'\t' '$1 == "B1" { print $2 }'; }
extract_b2() { classify_b | awk -F'\t' '$1 == "B2" { print $2 }'; }
extract_b3() { classify_b | awk -F'\t' '$1 == "B3" { print $2 }'; }

```

このブロックは `resolve`・`classify_b`・`extract_b1`・`extract_b2`・`extract_b3` の
**関数定義のみ**を含み、実行は含まない（「検証」節がこのブロックをそのまま `source` する前提の
ため。関数呼び出しをここに含めると、source した時点で listing の副作用が走り、検証時の出力と
混同される）。`extract_b1`/`extract_b2`/`extract_b3` はそれぞれ呼び出しのたびに `classify_b`
（内部で候補集合の走査を行う）を独立に実行するため、複数回呼び出すと stderr の `WARN:` 行も
その回数分出力される（人間向けの理由説明として許容する。件数算出は「検証」節の名前集合差分で
行い、stderr の行数には依存しない）。
Step 3 でのカウント用途には、このブロックを読み込んだ**別のシェル**で
`extract_b2` と `extract_b3` を呼び出す（標準出力がそのまま各セクションの掲載一覧になる）:

```bash
extract_b2   # リポジトリ管理スキルの掲載一覧
extract_b3   # 参照スキルの掲載一覧
```

分類の原則は**実体の所在を第一基準**とする。`skills-lock.json` の `skills` キーの掲載一覧は
上流リポジトリでは参照スキルのみ、消費側リポジトリでは配布スキル全件を指し、リポジトリの
役割によって意味が反転するため、実体の所在だけで判別できない曖昧ケースのタイブレークにのみ
使う（詳細は「注意事項」の実ディレクトリ型リポジトリの節を参照。上記 B2 コマンドはこの
タイブレークを実装済みであり、`jq` が無い環境ではタイブレーク判定自体を行わず B4 として
除外・報告する。フェイルクローズにより、判定できないケースを誤って B2 に含めることはない）。

- 指示ファイルの「リポジトリ管理スキル（.claude/skills/ に配置）」「参照スキル（.claude/skills/ に配置）」の各セクションを B2・B3 で更新する
- セクションが存在しない場合は新規作成する

**件数整合式（プレースホルダー。対象リポジトリで都度実測する）**: 系統 A・B1・B2・B3・B4 の
件数は対象リポジトリの構成変更のたびに変わるため、`SKILL.md` 本文には固定値を持たない。
各系統の抽出コマンドを実行し、次の 2 本の等式が実測値で成立することを確認する。

**B4 は stderr の `WARN:` 件数を数えるのではなく、名前集合の差分で求める**
（`B4 = B − (B1 ∪ B2 ∪ B3)`、名前ベースの `comm` で算出）。件数の単純合算では、
同じ名前が B2・B3 双方のループで異なる理由により WARN される場合（例: `skills-lock.json`
掲載かつ symlink 化もされていない実ディレクトリ型リポジトリの誤配置スキル）に二重計上され、
逆に「B2 にも B3 にも該当せず、かつどちらのループの走査対象にもならない」ケース
（`.claude/skills/<name>` が `skills/<name>` でも `.agents/skills/<name>` でもない
別ターゲットへの symlink 等）は WARN 自体が出ないため取りこぼす。名前集合の差分であれば
これらのケースも機械的に B4 として回収でき、`WARN:` はあくまで人間向けの理由説明として
併用する（下記「検証」節の実行手順を参照）。

| 等式 | 意味 |
|------|------|
| `B1 + B2 + B3 + B4 = B（-L 付き全列挙）` | 系統 B の内訳（B1/B2/B3/B4）が全列挙件数と一致する（`B4 = B − (B1 ∪ B2 ∪ B3)` の名前集合差分で算出。B1/B2/B3 が互いに排他であることも合わせて確認する） |
| `A − B1 = B1 に現れない配布スキル数` | 系統 A のうち `.claude/skills/` に symlink されていない配布スキルの件数 |

等式が成立しない場合は、B2・B3 の抽出コマンド（タイブレーク含む）またはカウント方法に
誤りがある。B4 が 1 件以上出た場合は、対応する `WARN:` の内容に従って手動で構成を
確認する（symlink 化・タイブレーク再実施等。update-docs 自身は構成を変更しない）。具体的な
数値例（実測スナップショット）は [references/measurement-example.md](references/measurement-example.md)
（本 SKILL.md と同じディレクトリ配下。上流リポジトリ `agent-cli-skills` 専用の値であり、
他リポジトリでの期待値ではない）を参照。

#### Repository Structure の更新

以下の変更があった場合に構造ツリーを更新する:

- `.claude/agents/` にエージェント定義が追加・削除された
- `.claude/rules/` にルールが追加・削除された
- `.claude/skills/` にワークフロースキルが追加・削除された
- `.agents/skills/` にスキルが追加・削除された
- `.codex/agents/` に Codex のエージェント定義が追加・削除された
- `.opencode/agents/` に OpenCode のエージェント定義が追加・削除された

#### その他の更新対象

- インストール方法の変更
- 新しいコンベンションの追加
- スキル構造（Skill Anatomy）の変更

### Step 4: `_/.last-update-docs` を更新する

```bash
git log -1 --format="%H"  # commit_hash
git log -1 --format="%s"  # commit_subject
git log -1 --format="%cI" # commit_date (ISO 8601)
```

取得した情報で `_/.last-update-docs` を更新:

```
commit_hash=abc123def456
commit_subject=feat(playwright): Playwright リファレンススキルを追加
commit_date=2026-03-21T10:00:00+09:00
```

### Step 5: 更新内容を報告する

更新したファイルの一覧と変更内容を表示する。`AGENTS.md` を更新したときは `agents-section.sh` の結果語彙（`appended` / `replaced` / `unchanged`）と、サイズ超過の警告があればそれも含める。`none` で止めたときは、どちらの指示ファイルも無かったので何も作っていないことを報告する。

## 検証

更新後、以下で完了を確認する。

```bash
# 指示ファイル（Step 0 で選んだ CLAUDE.md または AGENTS.md）のスキル数が実ディレクトリ数と一致しているか確認
TARGET_FILE=CLAUDE.md   # agents を選んだときは AGENTS.md
grep "^## Current Skills" "${TARGET_FILE}"
if [ -d skills ]; then
  find -L skills -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l
elif [ -d .agents/skills ]; then
  find -L .agents/skills -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l
else
  echo 0
fi
```

- `## Current Skills (N)` の N がカウントと一致すること
- スキル名一覧に追加・削除したスキルが反映されていること
- `_/.last-update-docs` が最新コミットの hash で更新されていること

系統 B（B2・B3）を更新した場合は、以下も**新規実行**して確認する（既存ログ・前回結果の
流用は不可。対象リポジトリに `.claude/rules/verification.md` が存在する場合はその 5 段階ゲートに従う）。`extract_b1`・`extract_b2`・
`extract_b3` は「Step 3」で定義した `classify_b` ベースの関数と**同一のもの**を呼び出す
（コマンドの重複記載による食い違いを避けるため、ここでは関数本体を再掲せず、Step 3 の bash
ブロックを事前に source またはコピーしてから以下を実行する）。排他性は `classify_b` が
「名前ごとに 1 回だけ判定する」構造で保証するが、`comm -12` の排他性チェックは実装ミスに
対する回帰検出として引き続き実行する。stderr（`WARN:` 行）は人間向けの理由説明として
保持しつつ、B4 の**件数**は次の名前集合の差分で算出する（stderr の行数を数えない。
`extract_b1`/`extract_b2`/`extract_b3` は呼び出しのたびに `classify_b` を独立実行するため、
同一名の WARN が複数回の呼び出しにまたがって重複出力されることがあり、行数はそもそも件数の
根拠にならない）。各変数は `sed '/^$/d'` で
空行を必ず除去してから保持する（`comm` は空文字列の変数を「空行 1 件を含む集合」として
比較するため、空行を残したまま `comm -12` にかけると、双方が空集合のケースで空行同士が
一致し「重複あり」の誤検出になる）:

```bash
# B1・B2・B3・全列挙（B）を名前集合として求め、B4 = B − (B1 ∪ B2 ∪ B3) を算出する
# （extract_b1 / extract_b2 / extract_b3 は Step 3 で定義した関数）
# stderr（WARN:）はリダイレクトしない。ここで 2>/dev/null を付けると
# 「WARN は人間向けの理由説明として保持する」という方針に反して破棄されてしまう。
# $(...) はデフォルトで標準出力のみを捕捉するため、変数への代入はこのままで安全であり、
# WARN 行はコマンド実行時にそのまま端末（実際の stderr）へ表示される。
b1=$(extract_b1 | sort -u | sed '/^$/d')
b2=$(extract_b2 | sort -u | sed '/^$/d')
b3=$(extract_b3 | sort -u | sed '/^$/d')
full=$(find -L .claude/skills .agents/skills -mindepth 1 -maxdepth 1 -type d \
  -exec test -f '{}/SKILL.md' ';' -print 2>/dev/null | sed -E 's#.*/##' | sort -u | sed '/^$/d')

union=$(printf '%s\n%s\n%s\n' "${b1}" "${b2}" "${b3}" | sed '/^$/d' | sort -u)
b4=$(comm -23 <(printf '%s\n' "${full}" | sed '/^$/d') <(printf '%s\n' "${union}" | sed '/^$/d'))
printf '%s\n' "${b4}"   # B4 の名前一覧（空なら B4=0）

# B1/B2/B3 が互いに排他か（重複があれば以下のいずれかが空でない出力を返す）。
# `printf '%s\n' "${b1}"` は b1 が空文字列でも改行 1 行を出力してしまうため、
# process substitution 側でも毎回 `sed '/^$/d'` を通す（変数へ保持した時点で
# 空行を除いていても、展開のたびに空行が復活しうる。ここを省くと双方が
# 空集合のケースで空行同士が一致し「重複あり」の誤検出になる）
comm -12 <(printf '%s\n' "${b1}" | sed '/^$/d') <(printf '%s\n' "${b2}" | sed '/^$/d')
comm -12 <(printf '%s\n' "${b1}" | sed '/^$/d') <(printf '%s\n' "${b3}" | sed '/^$/d')
comm -12 <(printf '%s\n' "${b2}" | sed '/^$/d') <(printf '%s\n' "${b3}" | sed '/^$/d')
```

- B2 の出力（stdout）が指示ファイルの「リポジトリ管理スキル（.claude/skills/ に配置）」節と一致すること
- B3 の出力（stdout）が指示ファイルの「参照スキル（.claude/skills/ に配置）」節と一致すること
- B1/B2/B3 の排他性チェック（`comm -12` 3本）がいずれも空出力であること（重複があれば
  B2・B3 抽出コマンドのタイブレークに誤りがある）
- B1（系統 A で計上済み）+ B2 + B3 + B4（名前集合差分で算出した件数）が、`-L` 付き全列挙の
  件数と一致すること
- `b4` が空でない場合、対応する `WARN:` 行の内容を確認し、指示ファイルのどのセクションにも
  含めないこと（B4 は記載対象外）。`.claude/skills/` が無いリポジトリ（`.agents/skills/` だけにスキルがある構成）では
  全スキルが B4 の `WARN:` になるが想定内で、系統 A が数えており `B1 + B2 + B3 + B4 = B` も成立する

## 注意事項

- 更新対象は Step 0 で選んだ指示ファイル 1 つだけ（`CLAUDE.md` があれば `CLAUDE.md`、無ければ `AGENTS.md`）。両方あるときの `AGENTS.md` は読み書きしない。ただし両者が同じファイルで一方が symlink のときは `AGENTS.md` として区間だけを更新し、`CLAUDE.md` を直接書き換えない（ハードリンクのときは書かずに止める）。どちらも無いときは作らずに報告して止める
- `AGENTS.md` を更新するときの書き込みは `agents-section.sh` だけで行い、update-docs 専用のマーカー区間の外（init-codex 系の管理区間・レビュー観点集など）を変更しない
- 個別スキルの `SKILL.md` や `references/` は更新対象外
- 自動生成ファイルは更新対象外
- `_/.last-update-docs` が `.gitignore` に追加されているか確認する
- **`.claude/skills/` の実ディレクトリ抽出（用途が異なる点に注意）**: `find .claude/skills -maxdepth 1 -mindepth 1 -type d`（`-L` を付けない）は「symlink ではない実ディレクトリ = そのリポジトリ固有の管理スキル」を狙った抽出コマンドだが、**`.claude/skills` 自体が `.agents/skills` を指す symlink であるレイアウト（親 symlink 型）では、配下の全エントリが symlink ではなく実ディレクトリに見えるため、このコマンドは常に空を返し B2 判定には使えない。** 系統 B の分類は `classify_b`（`resolve` による物理解決先の比較）を基準とし、`-L` 無し find は用途を持たない。全列挙が必要な場面では必ず `-L` 付きの版（上記 `classify_b` の候補集合構築コマンド）を使う
- **`github-docs` 等の扱い**: `.claude/skills/github-docs`（子 symlink 型なら symlink、親 symlink 型なら実ディレクトリに見える）の物理解決先が `.agents/skills/github-docs` の物理解決先と一致するため、`classify_b` は本リポジトリ（`skills/` が存在する上流レイアウト）では `github-docs`・`anthropic-claude-code` 等を B3（参照スキル）に分類する。これは B2 からの除外であって指示ファイルからの除外ではなく、「参照スキル（.claude/skills/ に配置）」節に記載する。`skills/` を持たない消費側レイアウトでは同じ一致は B1 として扱われる（上記分類表参照）
- **実ディレクトリ型リポジトリでの振る舞い**: `.claude/skills/<name>` が実ディレクトリで配置されているリポジトリ（`.claude/skills` が実ディレクトリ運用の消費側リポジトリ等）では、実体が `.claude/skills/<name>` 直下にあるかどうかだけで判定すると外部取り込みスキルまで拾ってしまい「リポジトリ管理スキル」節が過大になり得る。`classify_b` は物理解決先の一致を優先することで、実ディレクトリか symlink かに関わらず次の順でタイブレークする:
  1. 物理解決先が `skills/<name>/` の物理解決先と一致する → 配布スキル（系統 A・B1）。リポジトリ管理スキルではない
  2. 物理解決先が `.agents/skills/<name>/` の物理解決先と一致する →
     `skills/` ディレクトリが存在する（上流・二重役割レイアウト）場合のみ参照スキル（B3）。
     `skills/` ディレクトリが存在しない消費側レイアウトでは `.agents/skills/` が系統 A の
     列挙元そのものであるため、同じ一致は B3 ではなく配布スキル（系統 A・B1）として扱う
  3. `skills-lock.json` があるのに `jq` が使えない → 判定不能。`jq` 不在時にタイブレーク自体をスキップして誤って B2 に含めることは fail-closed 原則に反するため、B4（判定不能）として除外し stderr へ警告する
  4. `skills-lock.json` の `skills` キーに名前がある → 外部から取り込んだスキルが symlink 化されていない誤配置。リポジトリ管理スキルではなく、symlink 化を検討すべき構成上の問題として B4 で報告する（update-docs 自身は構成を変更しない）
  5. 上記いずれにも該当しない実体のみをリポジトリ管理スキル（B2）として扱う
- **B3 の解決先検証**: `.agents/skills/<name>` に実体があるだけでは B3 に分類しない。
  `.claude/skills/<name>` の物理解決先（`cd -P` で正規化した絶対パス）が `.agents/skills/<name>`
  の物理解決先と一致することまで確認する（親 symlink 型では `.claude/skills/<name>` 自身は
  symlink ではないため、「symlink であること」は要求条件にしない）。解決先が不一致・
  `.claude/skills/<name>` から実体へ到達できない場合は「参照スキルとして未リンク／誤配置」で
  あり B4 として除外し stderr へ警告する（誤って B3 に含めない）。この B3 判定自体が
  `skills/` ディレクトリの存在する上流レイアウトに限定される点は上記の分類表・タイブレーク
  一覧を参照（消費側レイアウトでは同じ解決先一致を B1 として扱う）
- **`.agents/skills/` だけにあるスキル**: `.claude/skills/` が無く `.agents/skills/<name>/SKILL.md` だけがある構成では、`skills/` が無ければ系統 A が `.agents/skills/` を列挙して数えるため `## Current Skills (N)` の N に入る（系統 B では B4 の `WARN:` になるが、系統 A で計上済みなので B2・B3 の節には載せない）。`skills/` がある上流レイアウトで `.agents/skills/<name>` だけが `.claude/skills/` から未リンクの場合は、系統 A の対象外で B4 になり、どの節にも載らない。この構成では `.claude/skills/<name>` へのリンクを作るか別管理にするかを手動で決める（update-docs 自身は構成を変更しない）
- **空出力の扱い**: `2>/dev/null` はディレクトリ不在（例: `.agents/skills` が無いリポジトリ）を許容する目的に限る。空出力を即座に「0 件」と判断せず、対象ディレクトリ自体の存在を先に確認する

## コード内コメントの観点（任意）

コメント補強を依頼された場合に適用する指針。指示ファイル（CLAUDE.md / AGENTS.md）の同期とは独立した作業として実施する。

### 基本方針

コメントは「何をするか」ではなく「このパッケージ・サービスにおける対象の役割」を記述する。
後続の読み手（人間およびエージェント）は渡された情報からしか判断できないため、以下の観点を明示する。

- **呼び出し元からの観点** — このシンボルが呼び出し元にとって何を提供するか
- **呼び出し先からの観点** — このシンボルが依存している外部サービス・モジュールとの関係
- **他ファイル・他サービスとの文脈** — 同じプロセスや隣接サービスにおける位置づけ

### 記述のポイント

- 実装の詳細（アルゴリズムの手順）ではなく、**役割・責務・境界**を述べる
- 変数名・型から自明な情報は繰り返さない。読み手が別ファイルを開かなくても文脈を把握できる情報を補う
- 公開 API（エクスポートされる関数・型・定数）は必ずコメントを付ける。非公開シンボルは複雑な場合のみ
- サービス間通信やイベント駆動の箇所では、どのイベント・エンドポイントと接続しているかを明記する

### 詳細規約の参照先

対象リポジトリのコメント規約（CLAUDE.md / AGENTS.md / CONTRIBUTING / `.claude/rules/code-comment-style.md` 等）があれば、形式・言語・長さ・禁止事項はそれに従う。無ければ次の要点に従う。

- 形式は言語の慣習に従うドキュメンテーションコメント（JSDoc / docstring / rustdoc 等）にし、先頭の要約行に役割・責務を 1〜2 行で書く
- インラインコメントは what ではなく why（制約・背景・仕様上の都合）を書く。参照すべき Issue 番号・仕様書 URL があれば記載する
- コードを読めば自明な逐語的説明や、シグネチャの繰り返しは書かない。解決済みの経緯だけのコメントは削除する
- 言語・文体・長さは、対象リポジトリの既存コメントに合わせる

## sandbox 環境での実行

このスキルは sandbox 環境で実行できる。ネットワーク越しの操作は行わず、使うのは `git log` / `git diff` などローカルの git 読み取りとファイル入出力だけである。書き込み先は指示ファイル（`CLAUDE.md` または `AGENTS.md`・ワークスペース内）、`_/.last-update-docs`、`_/update-docs-section.md`（`AGENTS.md` を更新するときだけ・書き込み後に削除する）で、`.git`・`.agents`・`.codex` へは書かない（`.agents/skills`・`.codex/agents` は変更の検知のために読むだけ）。`agents-section.sh` は作業用の一時ファイルを OS の一時ディレクトリ（`TMPDIR`）に作り、終了時に消す。Codex の既定 sandbox でも、これらの書き込み先はワークスペース内なので昇格は要らない。`_/` に書けない環境では、書けなかったことを報告して止める。
