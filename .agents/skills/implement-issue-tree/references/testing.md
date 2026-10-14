# テストの流し方と変異テスト

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

`skills/implement-issue-tree/tests/` のテストを速く確かめ、検査が弱くなっていないことを変異で確かめるための手引き。
テストの本数は多い（2800 件超）が、全体は単独で約 105 秒（Node 24・16 コア・2026-10 実測）で終わる。

## 流し方

CI と同じ全体（`failglob` でテストが 1 件も見つからない事故を落とす）:

```bash
bash -c 'shopt -s globstar failglob; node --test skills/*/tests/**/*.test.mjs'
```

1 ファイルだけ（スクリプトや lib を変えたときは、そのテストと、同じスクリプトを検査するファイルだけを流す）:

```bash
node --test skills/implement-issue-tree/tests/base-merge.test.mjs skills/implement-issue-tree/tests/base-merge-unit.test.mjs
```

Node 24 と 22 を並列に流す（`TMPDIR` を別々の空ディレクトリにして、一時ファイルの残存も確かめる）:

```bash
t24=$(mktemp -d); t22=$(mktemp -d)
TMPDIR="$t24" bash -c 'shopt -s globstar failglob; node --test skills/*/tests/**/*.test.mjs' > "$t24.log" 2>&1 &
TMPDIR="$t22" bash -c 'shopt -s globstar failglob; volta run --node 22 node --test skills/*/tests/**/*.test.mjs' > "$t22.log" 2>&1 &
wait
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
