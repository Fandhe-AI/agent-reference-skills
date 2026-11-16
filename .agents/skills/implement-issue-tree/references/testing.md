# テストの流し方と変異テスト

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

`skills/implement-issue-tree/tests/` のテストを速く確かめ、検査が弱くなっていないことを変異で確かめるための手引き。
テストの本数は多い。全スキルの `skills/*/tests` を下記の手順で単独に流すと、3685 件・約 118 秒（Node 24・16 コア・2026-10-26 実測）で終わる。

## 流し方

CI と同じテスト集合の全体実行。CI は `shopt -s globstar failglob; node --test skills/*/tests/**/*.test.mjs`（ubuntu の bash 5）だが、macOS 標準の `/bin/bash` 3.2 には `globstar` が無く、`**` が 1 階層にしか当たらないため `tests/` 直下のテストが漏れても成功する。そこでシェルの展開に頼らず `find` で一覧を作る（zsh・bash 3.2・bash 5 のどれに貼っても同じ動き）。リポジトリのルートで実行する:

```bash
bash -c 'files=$(find -H skills/*/tests \( -type f -o -type l \) -name "*.test.mjs" -not -path "*/.*" | sort); [ -n "$files" ] || { echo "テストが 1 件も見つからない" >&2; exit 1; }; echo "$files" | xargs node --test'
```

- CI の `globstar` とほぼ同じ集合になる: `tests/` 直下とサブディレクトリの両方を含み、ドット始まりのパスは除く（`-not -path "*/.*"`）。起点の `skills/*/tests` が symlink でも辿る（`-H`）。
- `*.test.mjs` の symlink ファイルは含める（CI の glob と同じ）。symlink のディレクトリは対象外（bash の `**` は版や位置で降りる・降りないが変わるため、等価にしない）。
- 0 件のときは node を起動せず非 0 で止まる（CI の `failglob` に相当。`node --test` は 1 件も無くても成功しうる）。
- パスに空白・改行・引用符・バックスラッシュが無いことを前提にしている（`xargs` が解釈するため。このリポジトリのテストは満たす）。

1 ファイルだけ（スクリプトや lib を変えたときは、そのテストと、同じスクリプトを検査するファイルだけを流す）:

```bash
node --test skills/implement-issue-tree/tests/base-merge.test.mjs skills/implement-issue-tree/tests/base-merge-unit.test.mjs
```

Node 24 と 22 を並列に流す（`TMPDIR` を別々の空ディレクトリにして、一時ファイルの残存も確かめる）。引数なしの `wait` は常に 0 を返すので、PID ごとに終了コードを集める:

```bash
t24=$(mktemp -d); t22=$(mktemp -d)
TMPDIR="$t24" bash -c 'files=$(find -H skills/*/tests \( -type f -o -type l \) -name "*.test.mjs" -not -path "*/.*" | sort); [ -n "$files" ] || { echo "テストが 1 件も見つからない" >&2; exit 1; }; echo "$files" | xargs node --test' > "$t24.log" 2>&1 &
p24=$!
TMPDIR="$t22" bash -c 'files=$(find -H skills/*/tests \( -type f -o -type l \) -name "*.test.mjs" -not -path "*/.*" | sort); [ -n "$files" ] || { echo "テストが 1 件も見つからない" >&2; exit 1; }; echo "$files" | xargs volta run --node 22 node --test' > "$t22.log" 2>&1 &
p22=$!
wait "$p24"; r24=$?
wait "$p22"; r22=$?
echo "node24 exit=$r24 node22 exit=$r22"   # 両方 0 であること
ls "$t24" "$t22"   # 空であること（テストが作った一時ディレクトリは trackTmp で消える）
```

テストごとの所要は `--test-reporter=spec` の `(NNN ms)` で分かる。上位は次で出せる。

```bash
node --test --test-reporter=spec skills/implement-issue-tree/tests/*.test.mjs 2>&1 \
  | grep -E '^[✔✖] ' | sed -E 's/^. (.*) \(([0-9.]+)ms\)$/\2\t\1/' | sort -rn | head -30
```

壁時計の kill を実際に待つ `observe-pr-inconclusive.test.mjs` は、マシンの高負荷時（load average が数十）にまれに落ちる。落ちたらそのファイルだけを単独で再実行して、負荷由来か本物の退行かを切り分ける。

```bash
node --test skills/implement-issue-tree/tests/observe-pr-inconclusive.test.mjs
```

単独でも落ちるなら負荷ではなく退行として扱う（閾値は緩めず、skip もしない）。

## 速いテストの書き方（このスキルで使っている型）

- **判定ロジックは表で 1 回の起動に**: 入力の形を表で網羅したいスクリプトは、判定だけの純関数を `scripts/lib/` へ
  ロジックを変えずに切り出し（例: `lib/base-merge-lib.sh`）、テストは 1 回の bash 起動で表の全ケースを渡して
  1 行ずつ結果を返させる（`base-merge-unit.test.mjs`）。エンドツーエンド（実 git・push まで）は代表だけにする。
  bash 3.2 と 5 の両方で回す（構文・組み込み・文字クラスの解釈が版で変わり得る）。
- **git サンドボックスはテンプレートをコピー**: `tests/lib/git-sandbox.mjs` は、オプションの組ごとに bare の origin と
  clone を 1 回だけ実 git で作り、テストごとにコピーして origin の URL だけ書き換える（約 0.5 秒 → 数十ミリ秒）。
- **bash ごとにファイルを分ける**: `base-merge.test.mjs`（1 つ目の bash）と `base-merge-alt-bash.test.mjs`（2 つ目以降）は
  `tests/lib/base-merge-suite.mjs` の同じテスト一式を登録する。`node --test` はファイル単位で並列に走るので、
  2 つの bash を回しても所要は 1 つ分で済む。
- **実時間を待つケースは縮尺を変えずに同時に待つ**: 壁時計の kill を待つケース（`observe-pr-*`）は
  `tests/lib/run-async.mjs` の `spawnAsync` で子を起動し、`describe(…, { concurrency: N }, …)` で重ねる。
  ハングする偽 gh の `sleep` 秒数は `hangSeconds` でケース・bash ごとに一意にする（残存確認が他のケースの sleep を数えない）。
- **同期のテスト（`spawnSync`）は同じ describe に入れない**: イベントループを塞ぐので、同時に待っているケースの経過時間の
  測定（子の終了をこのプロセスが受け取るまで）が延び、「制限を超えて待たない」という上限の検査が偽の赤になる。
  経過時間を検査する describe は非同期のテストだけにし、同期のテストは describe の外に置く。
  同時実行で上限の検査が赤になったら、閾値を緩めずに describe の `concurrency` を下げる（閾値が検査する性質そのものである）。
- **重い計算は 1 回だけ**: 実物の開発ファイル（約 900 KB）のビルドとトークン照合は 1 回約 7 秒かかる。
  `build-workflow.test.mjs` は実物への `--check` を読み込み時に子プロセスで 1 回だけ始め、結果を複数のテストで共有する。
  CLI の起動の形（symlink など）を見るテストは小さい入力で足りる。
- **一時ディレクトリは `trackTmp`**: `mkdtempSync` の戻り値を `trackTmp(...)` で包む。プロセス終了時に必ず消える
  （スキルは個別に配布されるため、`update-issue-tree` は自分のコピーを持つ）。

## 変異テスト（`tests/tools/mutate.mjs`）

テストを書き換えたあと、検査が弱くなっていないかを「実装に 1 か所だけ欠陥を入れた変異体」で確かめる。
作業ツリーは書き換えない（スキルのディレクトリを深さを保って一時ディレクトリへコピーし、コピー上で置換・再ビルド・
テストを行う）。変異体に対して関連するテストファイルだけを流し、赤なら `KILLED`（検査が欠陥を捕まえた）、緑なら
`SURVIVED`（検査が欠陥を見逃した）と判定する。

```bash
node skills/implement-issue-tree/tests/tools/mutate.mjs --list                  # 定義の一覧
node skills/implement-issue-tree/tests/tools/mutate.mjs --run U02-host-suffix   # 1 件
node skills/implement-issue-tree/tests/tools/mutate.mjs --run all --jobs 4      # 同梱の定義を全件
# どのテストが捕まえるかの切り分け（tests/ 内のファイルを指定）
node skills/implement-issue-tree/tests/tools/mutate.mjs --run U02-host-suffix --tests base-merge-unit.test.mjs
# 別の版のスキル（git archive で取り出した main など）に同じ変異を当てて検出力を比べる
node skills/implement-issue-tree/tests/tools/mutate.mjs --skill <スキルのディレクトリ> --def <定義ファイル> --run all
# Node 22 で（実行器ごと包む。テストも同じ node で走る）
volta run --node 22 node skills/implement-issue-tree/tests/tools/mutate.mjs --run all
```

- `INVALID` は判定できなかった場合: 置換が当たらない、テストランナーが signal で終了した（exit なし）、実行されたテストが
  0 件（全 skip・0 件登録）。緑でも `SURVIVED` とは数えない。
- 変異 1 件ごとに期限がある（既定 600 秒、`--timeout SEC` で変更）。超えたら孫プロセスを含む子プロセス群を止めて
  `KILLED (by: timeout)` と報告する。
- 定義は `tests/tools/mutations.mjs`（`id`・`file`・`from`・`to`・`tests`・`note`）。`from` は対象ファイルにちょうど
  1 か所だけ当たること（0 か所・2 か所以上は `INVALID`）。実装を変えて当たらなくなった定義は
  `tests/mutate-tool.test.mjs` が赤にする。`--def FILE` で別の定義ファイルも読める。
- `.sh`・`.src.js`・`build-workflow.mjs` を変えた変異体は、埋め込みハッシュが変わるため生成物を再ビルドしてから流す
  （しないと「ハッシュ不一致」で偽の赤になる）。再ビルドがトークン照合などで中止した変異体は `KILLED (by: build)`
  （出荷用のビルドゲートで止まる）。
- `SURVIVED` は「検査が弱い」か「変異が挙動を変えない（等価変異）」のどちらか。後者は、置換のあとの挙動を読んで
  確かめる（例: 先に別の検査が同じ入力を拒否しているなら等価）。判断がつかないときは `--skill` で変異前の版のテストに
  同じ変異を当て、旧テストでも緑なら退行ではない。
- 整数秒の時計の境界に依存する検査（壁時計の余裕）は、負荷が高いと変異を見逃すことがある。判定は `--jobs 1` の静かな
  環境で繰り返して見る。
- `node --test` の中から実行器を呼ぶと環境変数 `NODE_TEST_CONTEXT` が子の `node --test` へ引き継がれ、赤でも exit 0 を
  返す。実行器は子へ渡す環境からこれを外している（外さないと全変異が `SURVIVED` になる）。

## opt-in テスト記録ゲートの観測（Issue #603）

- `tests/optin-record-unit.test.mjs`（`scripts/lib/optin-record-lib.sh` の表: 宣言コマンドの許可形・本文の正規化・マーカー行の固定文字列一致〔pass は行全体・fail と not-run は部分一致で、U+3000・NBSP・U+2028 が付いた行も数える〕・pass と pass 以外の件数・パイプの途中の失敗は偽の tr / sed / grep で `return 1`。bash ごと）・`tests/observe-pr-optin-record.test.mjs`（偽 gh で実スクリプトを bash 3.2 / 5 の両方で実行: 件数・`gh pr view` が 1 回・`-R` 束縛・取得失敗と応答の形の違いは `err:1`・`body` が null は 0 件・引数の誤りは exit 2 で gh を呼ばない・`inputSha256` が個数と順序を束縛・全角空白付きの fail 行・本文の文字列が標準出力と標準エラーに出ないこと・偽の tr の失敗は `err:1`）・`tests/optin-record-gate.test.mjs`（ホスト: 封筒の nonce・sha256・入力の不一致と payload の形の拒否、観測失敗の haiku → sonnet の 1 回取り直しと全件不合格、プロンプトが固定コマンドの実行と転記だけであること・本文を取得せず測り直さない権限境界の文が入っていること・Unicode の空白付きの pass 以外の行でゲートが不合格になること）。マーカー行の書式（writer = `optinRecordMarkerLine`・`optinRecordRewriteLines`、reader = lib）の往復は `optin-tests-gate.test.mjs` の群 F が本物の lib で検査する。
- 変異テスト: `node skills/implement-issue-tree/tests/tools/mutate.mjs --run OR1-optin-count-substring …`（`OR1`〜`OR14`）。

## 外部チェック観測と対象外ラベルの取得（`repo-scan.sh`・計画 C の P4）

- `tests/repo-scan-unit.test.mjs`（lib の表。形式検査・整列・収集・入力の束縛・payload の正規形を 1 回の bash 起動で）・`tests/repo-scan.test.mjs` と `tests/repo-scan-alt-bash.test.mjs`（偽 gh `tests/lib/gh-repo-scan-stub.mjs` で実スクリプトを bash ごとに並列実行。本体は `tests/lib/repo-scan-suite.mjs`）・`tests/repo-scan-host.test.mjs`（ホストの封筒照合の表・プロンプトの配線・返却スキーマ・実スクリプトの標準出力をホストの照合に通す結合）。
  - 偽 gh は `--jq` を応答の JSON に単体の jq で適用する（スクリプトが渡す jq フィルタそのものが実行される）。呼び出しは `calls.log` に残り、GET だけであること・`-f` を使わないこと・ラベルがパーセントエンコードされることを検査する。
  - 旧コマンド（切り出し前の origin/main がプロンプトへ埋め込んでいた文字列）は `tests/fixtures/repo-scan-old-external-checks-main.txt` と `repo-scan-old-skip-labels-main.txt` に凍結し、同じ偽 gh の応答で実行した結果と新スクリプトの結果を突き合わせる（apps・番号・存在確認・失敗が一致）。差が出る入力は『意図した差』として別テストで固定する（app が null の check-run を新版は落とす・check-runs の取得失敗の HTTP エラー本文を新版は apps に混ぜない）。
  - ロケール: `LC_ALL` を `C` / `en_US.UTF-8` / `ja_JP.UTF-8` に変えても出力が同じこと（並び・番号の数値順・全角文字の absent）。
  - 取り違え: ラベルの並びが違う入力で作られた封筒はホストの入力の束縛で拒否され、そのラベルの結果として採られない（`repo-scan-host`）。
  - リポジトリの束縛（Issue #808）: `--repo` の省略は exit 2。`args.repo` が無いランでは起動行の `--repo` と期待する `inputSha256` がツリー取得の封筒の `repo` になり、`args.repo` の束縛先（base 取り込み・通知コメントなど）には入らない。封筒の `repo` が形式不正なら repo-scan.sh を起動しない（`repo-scan-host`）。`fetch-tree.sh` は `--repo` を省くとルートの `repository_url` から `repo` を出し、形が違えば exit 5（`fetch-tree`）。
  - check-runs のページ送り（Issue #809）: 偽 gh は `page=N` で N ページ目を切り出し、`<sha>@N` でページ単位の失敗を注入できる。150 件目にだけある外部 App が apps に入る・ちょうど 100 件なら 2 ページ目まで読む・ページの取得失敗と件数行の形の違いは `errs`・上限 10 ページまで埋まっていれば `errs` に数えて 11 ページ目を読まない・3 PR すべて上限でも gh は 31 回で封筒は上限内（`repo-scan`）。
  - 交わり（Issue #807）: 5,000 件の open issue を持つラベルでも、`--numbers` と交わらない番号は出力に入らず封筒は上限内。交わりが上限を超えれば exit 7。`--numbers` の形（昇順・重複なし・上限 100,000 バイト）の誤りは exit 2。番号の形の違う行があれば交わりの外でもそのラベルは failed。ホストは open ノードだけを昇順で渡し、集合を束縛しない封筒を拒否する（`repo-scan`・`repo-scan-unit`・`skip-labels`・`repo-scan-host` の実スクリプト結合）。
- 既存テストの stub が `plan:skip-labels` に平らな `{ entries: [{ i, x, numbers }] }` を返す場合は、`tests/lib/stub-run.mjs` が封筒に包む（`wrapSkipLabelsReply`。x = 1 は absent、entries に無い添字は failed）。`detect:external-checks` の既定の応答は `externalChecksReply(prompt)`。
- 変異テスト: `node skills/implement-issue-tree/tests/tools/mutate.mjs --run RS1-script-null-app-kept …`（`RS1`〜`RS35`・`FT-repo-from-cwd-blank`）。

## 状態ファイルのハッシュ取得 `state.sh verify`（Issue #603 計画 C の P5）

- `tests/state-verify-script.test.mjs`（`scripts/lib/state-verify-lib.sh` と `state.sh verify` を実 jq で実行。bash 3.2 と 5 の両方）: 封筒（正規形・sha256・nonce・`inputSha256` がファイルとページを束縛）・100 件ごとのページ送り（250 件 = 3 ページ・ちょうど 100 件 = 1 ページ・0 件 = 1 ページ）・`nofile` と `error` の区別（壊れた JSON・空・配列・`items` の型違い〔`false` を含む〕・非負整数の number でない高水位〔`false`・`"4096"`・`-1`・`1.5`、Bytes と Version の両方〕・16 桁以上のキー〔要求したページに無くても〕・シンボリックリンク〔リンク先が正しいファイルでも・リンク切れでも〕・ディレクトリ・権限なし。無い・null の `items` と高水位は従来どおり ok）・外部由来の文字列を出さない・引数の誤りは exit 2・ロケール（C / UTF-8 / 未設定）で同じ封筒・sha256 のツールが無ければ exit 3・**何も書かないこと**（バイト・mtime・inode・ディレクトリの内容・`TMPDIR` が不変、無いファイルのとき `_/issue-trees` を作らない、書き込み不可でも成功、ライブラリのコード行に書き込みの綴りが無い、verify の分岐が `trap`・一時ファイル・`st_rewrite` より前にある）。差分テストは、P5 より前のインラインのコマンド（`OLD_COMMAND`）を同じ入力に流し、キーのダイジェスト・件数・高水位・項目ごとのハッシュの一致（サンプル・DEL と日本語・入れ子・数字以外のキー・先頭ゼロ・`items` なし / null・257 件）と、`error` になる入力を 2 種類に分けて確かめる: 従来が使えない・誤った値を返した入力（壊れた JSON・`items` が配列・複数の値・改行を含むキー・非整数の高水位）と、従来は値を返したが受理しない入力（16 桁以上のキー・`items` や高水位の `false`。停止側に厳しくした分）。5000 件の最終ページの時間も測る。
- `tests/state-verify-host.test.mjs`（ホスト。stub agent が `tests/lib/signed-output.mjs` の `stateVerifyReply` で、従来の平らな照合入力を node:crypto で独立に封筒へ変換して返す）: 250 件の 3 ページ（label・`--page`・nonce がページごと）・転記ミスは sonnet で取り直す・別の呼び出しの nonce の流用は停止・別のページ / 別のファイルの封筒を受理しない・`error` は sonnet へ回さず停止し `nofile` に倒さない（読込側が新規作成を申告していても）・ページ間の食い違い・重複キー・不正なキーは null・ページ上限 50（超える封筒は受理して sonnet へ回さず、2 ページ目を取らずに専用の文で停止する。再実行・退避を勧めない。偽の封筒〔pages 51〕で `loadState` を通しで確かめる）・返却スキーマに自由形式の object が無い。既存の `state:load-verify` のスタブは `tests/lib/stub-run.mjs` が封筒に包む（`stateVerifyReply`。ほかの自前のハンドラは各テストが包む）。`tests/state-load-verify.test.mjs` は `verifyLoadedItems` の表と `loadState` の振る舞いを意味を変えずに維持する。
- 変異テスト: `node skills/implement-issue-tree/tests/tools/mutate.mjs --run SV1-verify-error-as-nofile …`（`SV1`〜`SV23`。ホストの nonce・入力の束縛・error の扱い・ページの一致・上限〔上限超過で止める・無効扱いにしない〕、スクリプトのページ位置・キーの選別・改行を含むキーの拒否・書き込みの混入・書き込みモードの引数・`items` と高水位〔Bytes・Version〕の型・シンボリックリンク・全キーでの桁数検査・ページの値を 1 回の jq でまとめて取る経路〔項目そのものが文字列なら 1 件ずつ取り直す・行の欠け / 余り・jq の失敗を畳まない〕）。
- 終了時の照合の予備（PR #810 の codex 指摘）: `tests/agent-call-budget.test.mjs` が `terminalVerifyReserve` の表（100 件以下 0・101 件 2・3,000 件 58・5,000 件以上 98）、`agentBudgetHold` が最初の着手にも課すこと、状態 3,000 件のラン（照合 30 ページ × 2 回・しきい値 N で着手し N − 1 で着手しない）、大きなツリーの既存の予算テストの必要量に予備が入ることを固定する。`tests/fetch-tree-pages-host.test.mjs` はページ読みの事前検査、`tests/closed-skip-cleanup.test.mjs` は後始末のゲートの配線。変異 `TV1`〜`TV10`。

## ツリー取得（Issue #668）

- `tests/fetch-tree-unit.test.mjs`（lib の表）・`tests/fetch-tree.test.mjs` と `tests/fetch-tree-alt-bash.test.mjs`（偽 gh `tests/lib/gh-tree-stub.mjs` で実スクリプトを bash ごとに並列実行。本体は `tests/lib/fetch-tree-suite.mjs`）・`tests/fetch-tree-host.test.mjs`（stub agent で実装スクリプト全体を実行し、検査値の照合と取り直しを確かめる）。`tests/fetch-tree-failure.test.mjs`（偽 gh の実スクリプトの終了コード 5 / 6 / 7 と stderr をホストのログ・最終例外で確かめる。1 回目と最終の文面の出し分け・未信頼値の扱い・schema）。期待する検査値は `tests/lib/signed-output.mjs` の `treeFetchReply` が node:crypto で独立に計算する。
  - opt-in テスト宣言 optinTests（TSV 第 7 欄・`optinSha256`）: `fetch-tree-suite` は値に n を含む宣言が残ること（jq の `\n` が `n` に化ける fail-open の回帰）・コードフェンス内の宣言・タブ → 空白・許可外の文字と NBSP が 1 文字ずつ `?` になること・1 値 300 文字超で先頭 299 文字 + `?`・21 件以上で先頭 19 件 + `?`・closed と本文 null は `[]`・本文が文字列でも null でもなければ exit 5（本文は標準エラーに出ない）・title が空でも 7 欄の分割がずれないこと・同じ行で閉じない宣言のノードは `["?"]`（#802）・値の合計 1,000 文字超は `["?"]` で第 7 欄は 1 ノード 1,061 バイト以下（#803）・本文の上限 65,536 文字近くの最悪形（閉じない開始・`<!--` / `-->` の連続・空白とタブ 64,000・など）が 5 秒未満で終わること〔閉じた宣言 2,500 件の 1 行は既存の scan の経路で、値だけを検査し時間は固定しない〕。`fetch-tree-unit` は `ft_optin_digest` の表と、シェルとホストの `treeOptinDigest` / `treeNodesDigest` / `treeStructDigest` の一致、`optin_list` の表（閉じない宣言の判定・合計の境界 1,000 / 1,001・切り詰めの後で数えること）と、固定シードで生成した 400 本文を JS の正規表現による独立実装と突き合わせる生成的テスト（1 回の jq 起動）。`fetch-tree-optin.test.mjs` は実スクリプトの封筒と TSV をホストの `verifyTreeFetchResult` / `parseOptinTestDeclarations` へ通す結合（1 要素の書き換え・追加・消去・並べ替えは digest 不一致・`?` を含む値・切り詰めた値・件数超過の `?`・閉じない宣言と合計超過の `["?"]` はすべて invalid〔承認一覧が空でも〕）。`fetch-tree-host` / `fetch-tree-pages-host` は optinTests の書き写し誤りの取り直し・2 回続くと停止（title のように続行しない）・形の検査。変異 FT18〜32（FT26〜29 は閉じない宣言の判定、FT30〜32 は合計の上限）。
  - title だけの書き写し誤り（Issue #687）: `fetch-tree-host` は構造 5 欄の変異は取り直し・title のみは取り直し後に採用 / 警告つき続行（`treeFetch.titleMismatch`）・試行 1 の構造検証済みノードへのフォールバック・約 570 ノード規模・`structSha256` と `taskIdSha256` の欠落 / 不一致の拒否（タスク ID の転記欠落は fail-closed）、`fetch-tree-unit` は `ft_struct_digest` の表（title 非依存・順序非依存）。変異 FT14〜17。
  - ページ読み（Issue #673・#690）: 大きなツリーで取得モードが封筒だけを出すこと・各ページ（`--nonce` 必須）が 24000 バイト以下でページの封筒（`inputSha256` の束縛・ダイジェスト）が独立計算と一致・連結が全 TSV と `nodesSha256` / `tsvSha256` に一致。ホストの配線は `fetch-tree-pages-host.test.mjs`（3 ページの連結と順序・1 ページだけの取り直し・2 回不一致で停止と片づけ・不正な `dir` / ページ数 31 / 予算不足で起動しない・全体照合の失敗は取り直さない・約 1460 ノードの合成ツリー・ページを跨ぐ兄弟のタスク ID が declared-deps で解決されスケジューラが待つこと〔対照つき〕・ページ読みのプロンプトに兄弟 ID の突き合わせ指示が無く単一ページには残ること・兄弟 ID 上限超過の親はページ経路で停止し単一ページでは警告のみ）・一時ディレクトリの権限と `--release` 後の消去・`--dir` の検証（形・シンボリックリンク・余計なファイル）・30 ページ超の exit 7・TMPDIR が使えないときの exit 4。lib の `ft_page_count` / `ft_page_slice` / `ft_page_dir_name_ok` は `fetch-tree-unit.test.mjs` の表、`pages` の転記漏れ・書き換えは `fetch-tree-host.test.mjs`、プロンプトの配線は `tree-completeness.test.mjs`。
- 既存テストの stub が `plan:issue-tree` に平らな `{ nodes }` を返す場合は、`tests/lib/stub-run.mjs` が封筒に包む（`wrapTreeReply`。封筒の形・null・Error はそのまま通す）。
- 変異テスト: `node skills/implement-issue-tree/tests/tools/mutate.mjs --run FT1-host-digest-unchecked …`（`FT1`〜`FT10`）。
