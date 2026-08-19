---
name: update-docs
description: >
  前回更新コミット (_/.last-update-docs で追跡) からの差分をもとに CLAUDE.md のスキル一覧・リポジトリ構造ツリーを更新する。
  新スキル追加時、.claude/agents/ や .claude/rules/ の変更時、「ドキュメント更新して」「CLAUDE.md を更新して」などで使用。
  コード内コメント・ドキュメンテーションコメントの補強を依頼された場合にも参照する指針を含む。
model: haiku
---

# update-docs

コード変更に基づいて `CLAUDE.md` を更新し、`_/.last-update-docs` に記録します。

## `_/.last-update-docs` ファイル形式

```
commit_hash=<hash>
commit_subject=<1行目>
commit_date=<ISO 8601>
```

このファイルは `.gitignore` で除外されローカル専用。

## フロー

### Step 1: 前回の更新コミットを確認する

`_/.last-update-docs` を読み込んで `commit_hash` を取得。
ファイルが存在しない場合は初回扱いとして直近のコミットを基準にする。

### Step 2: 変更内容を確認する

```bash
git log <commit_hash>..HEAD --oneline
git diff <commit_hash>..HEAD --stat
```

変更されたファイルと内容を把握する。

### Step 3: CLAUDE.md を更新する

#### Current Skills の更新

スキルを2系統に分けて列挙し、`CLAUDE.md` の `## Current Skills` セクションと「リポジトリ管理スキル」セクションをそれぞれ更新する。

**系統 A: `skills/` 配下の配布可能スキル（カウント対象）**

```bash
ls -d skills/*/SKILL.md | sed 's|skills/||;s|/SKILL.md||' | sort
```

- スキル数のカウントを更新: `## Current Skills (N)`（N は系統 A のみ）
- カンマ区切りのスキル名一覧を更新

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

| 区分 | 実体の所在 | N に含めるか | 記載先 |
|------|-----------|------------|--------|
| B1 | `skills/<name>/`（`.claude/skills/<name>` は symlink で、解決先が `skills/<name>` の実パスと一致することを検証済み） | 含める（系統 A の列挙で既に計上済み。B1 を理由に N を増減させない） | `## Current Skills (N)` |
| B2 | `.claude/skills/<name>/` が `SKILL.md` を持つ実ディレクトリで、`skills/<name>/` にも `skills-lock.json` にも該当しない | 含めない | 「リポジトリ管理スキル（.claude/skills/ に配置）」 |
| B3 | `.agents/skills/<name>/` が `SKILL.md` を持つ実体で、`.claude/skills/<name>` がその実体を指す symlink であることを検証済み | 含めない | 「参照スキル（.claude/skills/ に配置）」 |
| B4 | 誤配置・判定不能（`skills-lock.json` 掲載の実ディレクトリ、symlink 先不一致・非 symlink、`jq` 不在でタイブレーク未実施 等） | 含めない | CLAUDE.md には記載しない（stderr へ警告のみ。手動対応が必要な構成問題として扱う） |

B1・B2・B3 の抽出コマンド（シェル関数として定義する。「検証」節でも**同一の関数**を呼び出すため、
コマンド本体はここに一度だけ記述する）。いずれも「注意事項」のタイブレークを関数自体に組み込んだ
自己完結スクリプトとし、抽出コマンドと注意事項の記述が食い違わないようにする。全コマンドとも
**判定できない・条件を満たさないケースは B1/B2/B3 から除外して stderr へ警告する（fail-closed）**。
除外分は B4 として扱い、下記の件数整合式で回収する:

```bash
# B1: 配布スキル（.claude/skills/<name> が skills/<name> を指す symlink であることを検証）
# タイブレーク: 1) .claude/skills/<name> が symlink でない → B1 に含めない（symlink 化されて
#                  いない、または実ディレクトリ配置。B2 側の判定に委ねる。警告なし）
#               2) symlink の解決先（`cd -P` で正規化した絶対パス）が skills/<name> の実パスと
#                  一致する → B1 として出力
#               3) symlink だが解決先が一致しない（例: .agents/skills/ 等への誤配置）→
#                  除外し stderr へ警告（B4 扱い）
extract_b1() {
  ls -d skills/*/SKILL.md 2>/dev/null | sed -E 's#skills/##; s#/SKILL\.md##' | sort -u |
    while read -r n; do
      [ -L ".claude/skills/${n}" ] || continue
      actual=$(cd ".claude/skills/${n}" 2>/dev/null && pwd -P)
      expected=$(cd "skills/${n}" 2>/dev/null && pwd -P)
      if [ -n "${actual}" ] && [ "${actual}" = "${expected}" ]; then
        printf '%s\n' "${n}"
        continue
      fi
      echo "WARN: .claude/skills/${n} は symlink だがリンク先が skills/${n} と一致しない（B4 扱い）" >&2
    done
}

# B2: リポジトリ管理スキル
# タイブレーク: 1) .claude/skills/<name>/SKILL.md が無い → スキルではない（対象外。full 集合にも
#                  含まれないため B4 にも計上しない）
#               2) skills/<name> に実体がある → 除外（配布スキル。B1 側で計上済み）
#               3) skills-lock.json があるのに jq が使えない → 判定不能。除外し stderr へ警告
#                  （fail-closed。誤って B2 に含めない。B4 として扱う）
#               4) jq の終了ステータスで判定: 0=掲載あり→symlink 化されていない誤配置として
#                  B4 扱い（update-docs は構成を変更しない）／1=掲載なし→B2 継続／
#                  0・1 以外=jq 実行時エラー（不正な JSON 等）→判定不能として B4 扱い
#                  （0/1 以外を「掲載なし」と誤読しないことが fail-closed の要）
#               5) 残った実ディレクトリのみを B2 として出力
extract_b2() {
  find .claude/skills -mindepth 1 -maxdepth 1 -type d 2>/dev/null | sed -E 's#.*/##' | sort |
    while read -r n; do
      if [ ! -f ".claude/skills/${n}/SKILL.md" ]; then
        echo "WARN: .claude/skills/${n} に SKILL.md が無くスキルではない（対象外。B4 にも計上しない）" >&2
        continue
      fi
      [ -d "skills/${n}" ] && continue
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
      printf '%s\n' "${n}"
    done
}

# B3: 参照スキル
# タイブレーク: 1) .agents/skills/<name>/SKILL.md が無い → スキルではない（対象外。full 集合にも
#                  含まれないため B4 にも計上しない）
#               2) skills/<name> に実体がある → 除外（配布スキル。B1 側で計上済み）
#               3) .claude/skills/<name> が symlink で、その解決先が .agents/skills/<name> と
#                  一致する → B3 として出力
#               4) symlink でない、または解決先が一致しない → 除外し stderr へ警告（B4 扱い）
extract_b3() {
  find .agents/skills -mindepth 1 -maxdepth 1 -type d 2>/dev/null | sed -E 's#.*/##' | sort |
    while read -r n; do
      if [ ! -f ".agents/skills/${n}/SKILL.md" ]; then
        echo "WARN: .agents/skills/${n} に SKILL.md が無くスキルではない（対象外。B4 にも計上しない）" >&2
        continue
      fi
      [ -d "skills/${n}" ] && continue
      if [ -L ".claude/skills/${n}" ]; then
        actual=$(cd ".claude/skills/${n}" 2>/dev/null && pwd -P)
        expected=$(cd ".agents/skills/${n}" 2>/dev/null && pwd -P)
        if [ -n "${actual}" ] && [ "${actual}" = "${expected}" ]; then
          printf '%s\n' "${n}"
          continue
        fi
        echo "WARN: .claude/skills/${n} は symlink だがリンク先が .agents/skills/${n} と一致しない（B4 扱い）" >&2
      else
        echo "WARN: .agents/skills/${n} に実体があるが .claude/skills/${n} が symlink ではない（B4 扱い）" >&2
      fi
    done
}

```

このブロックは `extract_b1`・`extract_b2`・`extract_b3` の**関数定義のみ**を含み、
実行は含まない（「検証」節がこのブロックをそのまま `source` する前提のため。関数呼び出しを
ここに含めると、source した時点で listing の副作用が走り、検証時の出力と混同される）。
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

- `CLAUDE.md` の「リポジトリ管理スキル（.claude/skills/ に配置）」「参照スキル（.claude/skills/ に配置）」の各セクションを B2・B3 で更新する
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
数値例（実測スナップショット）は `skills/update-docs/references/measurement-example.md` を
参照（本リポジトリ専用の値であり、他リポジトリでの期待値ではない）。

#### Repository Structure の更新

以下の変更があった場合に構造ツリーを更新する:

- `.claude/agents/` にエージェント定義が追加・削除された
- `.claude/rules/` にルールが追加・削除された
- `.claude/skills/` にワークフロースキルが追加・削除された

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

更新したファイルの一覧と変更内容を表示する。

## 検証

更新後、以下で完了を確認する。

```bash
# CLAUDE.md のスキル数が実ディレクトリ数と一致しているか確認
grep "^## Current Skills" CLAUDE.md
ls -d skills/*/SKILL.md | wc -l
```

- `## Current Skills (N)` の N がカウントと一致すること
- スキル名一覧に追加・削除したスキルが反映されていること
- `_/.last-update-docs` が最新コミットの hash で更新されていること

系統 B（B2・B3）を更新した場合は、以下も**新規実行**して確認する（既存ログ・前回結果の
流用は不可。`.claude/rules/verification.md` の 5 段階ゲートに従う）。`extract_b1`・`extract_b2`・
`extract_b3` は「Step 3」で定義した関数と**同一のもの**を呼び出す（コマンドの重複記載による
食い違いを避けるため、ここでは関数本体を再掲せず、Step 3 の bash ブロックを事前に
source またはコピーしてから以下を実行する）。stderr（`WARN:` 行）は人間向けの理由説明として
保持しつつ、B4 の**件数**は次の名前集合の差分で算出する（stderr の行数を数えない。
同一名が B2・B3 双方の理由で除外されると行数は二重計上され、逆にどちらのループの走査対象
にもならない別ターゲット symlink は 1 行も出ないため取りこぼす）。各変数は `sed '/^$/d'` で
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

- B2 の出力（stdout）が `CLAUDE.md` の「リポジトリ管理スキル（.claude/skills/ に配置）」節と一致すること
- B3 の出力（stdout）が `CLAUDE.md` の「参照スキル（.claude/skills/ に配置）」節と一致すること
- B1/B2/B3 の排他性チェック（`comm -12` 3本）がいずれも空出力であること（重複があれば
  B2・B3 抽出コマンドのタイブレークに誤りがある）
- B1（系統 A で計上済み）+ B2 + B3 + B4（名前集合差分で算出した件数）が、`-L` 付き全列挙の
  件数と一致すること
- `b4` が空でない場合、対応する `WARN:` 行の内容を確認し、CLAUDE.md のどのセクションにも
  含めないこと（B4 は記載対象外）

## 注意事項

- `CLAUDE.md` のみが更新対象。個別スキルの `SKILL.md` や `references/` は対象外
- 自動生成ファイルは更新対象外
- `_/.last-update-docs` が `.gitignore` に追加されているか確認する
- **`.claude/skills/` の実ディレクトリ抽出（用途が異なる点に注意）**: `find .claude/skills -maxdepth 1 -mindepth 1 -type d`（`-L` を付けない）は「symlink ではない実ディレクトリ = そのリポジトリ固有の管理スキル」だけを狙って抽出するコマンドであり、上記「系統 B」の全列挙（`-L` 付き）とは目的が異なる。全列挙が必要な場面では必ず `-L` 付きの版を使う。symlink を除外することがこの抽出の条件そのものであり、両者は矛盾ではなく用途の使い分けである
- **`github-docs` 等の扱い**: `find -type d`（`-L` なし）はシンボリックリンクを除外するため、`github-docs`・`anthropic-claude-code` 等は「リポジトリ管理スキル」節の対象からは自動的に外れる。ただしこれは B2 からの除外であって `CLAUDE.md` からの除外ではない。これらは系統 B の内訳では B3（参照スキル）に分類され、「参照スキル（.claude/skills/ に配置）」節に記載する
- **実ディレクトリ型リポジトリでの振る舞い**: `.claude/skills/<name>` が symlink ではなく実ディレクトリで配置されているリポジトリ（`.claude/skills` が実ディレクトリ運用の消費側リポジトリ等）では、`-L` 無しの抽出が外部取り込みスキルまで拾ってしまい「リポジトリ管理スキル」節が過大になり得る。実ディレクトリか否かだけで判定せず、次の順でタイブレークする（B2 抽出コマンドはこのタイブレークを実装済み）:
  1. 実体が `skills/<name>/` にもある → 配布スキル（系統 A・B1）。リポジトリ管理スキルではない
  2. `skills-lock.json` があるのに `jq` が使えない → 判定不能。`jq` 不在時にタイブレーク自体をスキップして誤って B2 に含めることは fail-closed 原則に反するため、B4（判定不能）として除外し stderr へ警告する
  3. `skills-lock.json` の `skills` キーに名前がある → 外部から取り込んだスキルが symlink 化されていない誤配置。リポジトリ管理スキルではなく、symlink 化を検討すべき構成上の問題として B4 で報告する（update-docs 自身は構成を変更しない）
  4. 上記いずれにも該当しない実ディレクトリのみをリポジトリ管理スキル（B2）として扱う
- **B3 の symlink 検証**: `.agents/skills/<name>` に実体があるだけでは B3 に分類しない。
  `.claude/skills/<name>` が symlink であり、かつその解決先（`cd -P` で正規化した絶対パス）が
  `.agents/skills/<name>` の解決先と一致することまで確認する。symlink でない・別の場所を指す
  symlink・symlink 自体が存在しない場合は「参照スキルとして未リンク／誤配置」であり B4 として
  除外し stderr へ警告する（誤って B3 に含めない）
- **空出力の扱い**: `2>/dev/null` はディレクトリ不在（例: `.agents/skills` が無いリポジトリ）を許容する目的に限る。空出力を即座に「0 件」と判断せず、対象ディレクトリ自体の存在を先に確認する

## コード内コメントの観点（任意）

コメント補強を依頼された場合に適用する指針。CLAUDE.md 同期とは独立した作業として実施する。

### 基本方針

コメントは「何をするか」ではなく「このパッケージ・サービスにおける対象の役割」を記述する。
後続の読み手（Claude を含む）は渡された情報からしか判断できないため、以下の観点を明示する。

- **呼び出し元からの観点** — このシンボルが呼び出し元にとって何を提供するか
- **呼び出し先からの観点** — このシンボルが依存している外部サービス・モジュールとの関係
- **他ファイル・他サービスとの文脈** — 同じプロセスや隣接サービスにおける位置づけ

### 記述のポイント

- 実装の詳細（アルゴリズムの手順）ではなく、**役割・責務・境界**を述べる
- 変数名・型から自明な情報は繰り返さない。読み手が別ファイルを開かなくても文脈を把握できる情報を補う
- 公開 API（エクスポートされる関数・型・定数）は必ずコメントを付ける。非公開シンボルは複雑な場合のみ
- サービス間通信やイベント駆動の箇所では、どのイベント・エンドポイントと接続しているかを明記する

### 詳細規約の参照先

コメントスタイルの詳細（形式・言語・長さ・禁止事項）は対象リポジトリの `.claude/rules/code-comment-style.md` に従う。
当該ファイルが存在しない場合は、対象リポジトリの既存コメントスタイルに合わせる。
