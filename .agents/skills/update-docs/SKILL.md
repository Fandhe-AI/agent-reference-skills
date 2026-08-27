---
name: update-docs
description: >
  前回更新コミット (_/.last-update-docs で追跡) からの差分をもとに CLAUDE.md のスキル一覧・リポジトリ構造ツリーを更新する。
  新スキル追加時、.claude/agents/ や .claude/rules/ の変更時、「ドキュメント更新して」「CLAUDE.md を更新して」などで使用。
  コード内コメント・ドキュメンテーションコメントの補強を依頼された場合にも参照する指針を含む。
model: haiku
user-invocable: true
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

分類は「`.claude/skills/<name>` 自身が symlink か」「`.agents/skills/<name>` 自身が symlink
先か」といった symlink の**位置**では判定しない。`.claude/skills` ディレクトリ自体が
`.agents/skills` を指す symlink であるレイアウト（親 symlink 型）では、配下の
`.claude/skills/<name>` は symlink ではなく実ディレクトリに見える（親越しに見える実体）ため、
symlink の有無を見る判定はこのレイアウトで成立しない。そこで判定基準を「`.claude/skills/<name>`
から `cd -P && pwd -P` で物理解決した先が、`skills/<name>` または `.agents/skills/<name>` の
物理解決先と一致するか」に置き換える。この方式は親 symlink 型・子 symlink 型（`.claude/skills/<name>`
自身が symlink）・実ディレクトリ型のいずれでも同じロジックで判定できる。

| 区分 | 実体の所在 | N に含めるか | 記載先 |
|------|-----------|------------|--------|
| B1 | `skills/<name>/`（`.claude/skills/<name>` の物理解決先が `skills/<name>` の物理解決先と一致することを検証済み） | 含める（系統 A の列挙で既に計上済み。B1 を理由に N を増減させない） | `## Current Skills (N)` |
| B2 | `.claude/skills/<name>/` が `SKILL.md` を持つ実体で、`skills/<name>/` にも `.agents/skills/<name>/` にも該当せず、`skills-lock.json` にも掲載されていない | 含めない | 「リポジトリ管理スキル（.claude/skills/ に配置）」 |
| B3 | `.agents/skills/<name>/` が `SKILL.md` を持つ実体で、`.claude/skills/<name>` の物理解決先が `.agents/skills/<name>` の物理解決先と一致することを検証済み（`.claude/skills/<name>` 自身が symlink である子 symlink 型・`.claude/skills` 自体が symlink である親 symlink 型のいずれも該当） | 含めない | 「参照スキル（.claude/skills/ に配置）」 |
| B4 | 誤配置・判定不能（`skills-lock.json` 掲載の実ディレクトリ、物理解決先の不一致・到達不能、別ターゲットへの symlink、`jq` 不在でタイブレーク未実施 等） | 含めない | CLAUDE.md には記載しない（stderr へ警告のみ。手動対応が必要な構成問題として扱う） |

B1・B2・B3 の抽出コマンド（シェル関数として定義する。「検証」節でも**同一の関数**を呼び出すため、
コマンド本体はここに一度だけ記述する）。分類の核は単一の分類器 `classify_b`（名前ごとに排他的な
1 分類を出力する）に集約し、`extract_b1`・`extract_b2`・`extract_b3` はその出力を区分でフィルタする
薄いラッパーとして定義する。既存の呼び出しインターフェース（Step 3・検証節で
`extract_b1`/`extract_b2`/`extract_b3` をそのまま呼び出す形）はこの変更後も変わらない。
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
#   4. .agents/skills/<n> の物理解決先が非空 かつ 一致 → B3
#      （親 symlink 型・子 symlink 型の双方をこの 1 条件で吸収する）
#   5. .agents/skills/<n> の物理解決先が非空 かつ 不一致 → B4 警告（参照実体と解決先不一致）
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
          printf 'B3\t%s\n' "${n}"
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
- **`.claude/skills/` の実ディレクトリ抽出（用途が異なる点に注意）**: `find .claude/skills -maxdepth 1 -mindepth 1 -type d`（`-L` を付けない）は「symlink ではない実ディレクトリ = そのリポジトリ固有の管理スキル」を狙った抽出コマンドだが、**`.claude/skills` 自体が `.agents/skills` を指す symlink であるレイアウト（親 symlink 型）では、配下の全エントリが symlink ではなく実ディレクトリに見えるため、このコマンドは常に空を返し B2 判定には使えない。** 系統 B の分類は `classify_b`（`resolve` による物理解決先の比較）を基準とし、`-L` 無し find は用途を持たない。全列挙が必要な場面では必ず `-L` 付きの版（上記 `classify_b` の候補集合構築コマンド）を使う
- **`github-docs` 等の扱い**: `.claude/skills/github-docs`（子 symlink 型なら symlink、親 symlink 型なら実ディレクトリに見える）の物理解決先が `.agents/skills/github-docs` の物理解決先と一致するため、`classify_b` は `github-docs`・`anthropic-claude-code` 等を B3（参照スキル）に分類する。これは B2 からの除外であって `CLAUDE.md` からの除外ではなく、「参照スキル（.claude/skills/ に配置）」節に記載する
- **実ディレクトリ型リポジトリでの振る舞い**: `.claude/skills/<name>` が実ディレクトリで配置されているリポジトリ（`.claude/skills` が実ディレクトリ運用の消費側リポジトリ等）では、実体が `.claude/skills/<name>` 直下にあるかどうかだけで判定すると外部取り込みスキルまで拾ってしまい「リポジトリ管理スキル」節が過大になり得る。`classify_b` は物理解決先の一致を優先することで、実ディレクトリか symlink かに関わらず次の順でタイブレークする:
  1. 物理解決先が `skills/<name>/` の物理解決先と一致する → 配布スキル（系統 A・B1）。リポジトリ管理スキルではない
  2. 物理解決先が `.agents/skills/<name>/` の物理解決先と一致する → 参照スキル（B3）
  3. `skills-lock.json` があるのに `jq` が使えない → 判定不能。`jq` 不在時にタイブレーク自体をスキップして誤って B2 に含めることは fail-closed 原則に反するため、B4（判定不能）として除外し stderr へ警告する
  4. `skills-lock.json` の `skills` キーに名前がある → 外部から取り込んだスキルが symlink 化されていない誤配置。リポジトリ管理スキルではなく、symlink 化を検討すべき構成上の問題として B4 で報告する（update-docs 自身は構成を変更しない）
  5. 上記いずれにも該当しない実体のみをリポジトリ管理スキル（B2）として扱う
- **B3 の解決先検証**: `.agents/skills/<name>` に実体があるだけでは B3 に分類しない。
  `.claude/skills/<name>` の物理解決先（`cd -P` で正規化した絶対パス）が `.agents/skills/<name>`
  の物理解決先と一致することまで確認する（親 symlink 型では `.claude/skills/<name>` 自身は
  symlink ではないため、「symlink であること」は要求条件にしない）。解決先が不一致・
  `.claude/skills/<name>` から実体へ到達できない場合は「参照スキルとして未リンク／誤配置」で
  あり B4 として除外し stderr へ警告する（誤って B3 に含めない）
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
