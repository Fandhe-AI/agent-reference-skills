# opt-in テストの詳細

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

SKILL.md「opt-in テストの宣言」節の詳細（宣言の書式・永続化と復旧は同節に残している）。本文は同節から移したままで、「上と同じ」「後述」などは同節から見た表現である。

## 実行を許可するコマンド

**実行を許可するコマンドは `args.optinTestCommands`（人間がラン起動時に明示する承認一覧）が唯一の根拠であり、イシュー本文の宣言だけでは新しいコマンドを持ち込めない**（`make` / `npm run` / `yarn run` / `deno task` 等は任意タスクのディスパッチャーであり、許可ランナー・サブコマンドの形式検証だけでは `make deploy`・`npm run release` のような任意タスク起動を閉じられないため）。イシュー本文の宣言は、正規化（先頭・末尾の空白除去、水平空白の連続を半角スペース 1 個へ畳む）後に `args.optinTestCommands` のいずれかの要素と**文字列完全一致**した場合にのみ採用される。一致しない宣言・`args.optinTestCommands` が未指定 / `[]` の状態での宣言はすべて invalid として実装起動前に `blocked` で停止する（fail-closed）。

## 承認一覧の許可形式

`args.optinTestCommands` の各要素は起動時に許可形式を検証する（`validateOptinCommandForm`。先頭トークンが許可されたテストランナー `make` / `just` / `cargo` / `npm` / `pnpm` / `yarn` / `bun` / `go` / `pytest` / `deno` / `mvn` / `gradle` / `dotnet` / `swift` / `mix` に限る、シェルメタ文字（`; | & $ ` ` `）・改行・`.` に隣接しない `..`（親ディレクトリ参照。`go test ./...` のような `...` を含む値は許可）・`//`・絶対パス引数（トークン先頭または `=` 直後の `/`。例: `cargo test --target-dir /tmp/x`）を含まない）。1 件でも許可形式外なら実装は一切起動せず**起動時エラーで停止**する（`externalChecks` と同じ厳格さ。誤記を黙って読み替えない）。`npm` / `pnpm` / `yarn` / `bun` / `cargo` / `go` / `dotnet` / `swift` / `mix` / `deno` / `mvn` / `gradle` は第 2 トークン（サブコマンド）も `test` 等に制限する。`mvn` は GAV 形式のゴール指定（`groupId:artifactId:goal` 等、`:` を 2 個以上含むトークン）を、`deno` はリモート指定子（`npm:` / `jsr:` / `http:` / `https:` で始まるトークン）を、それぞれ任意プラグイン実行・外部コード取得の迂回経路として追加で拒否する。この形式検証は承認一覧側にのみ効く（承認一覧に載った時点で許可形式である保証が確定するため、イシュー本文の宣言側は正規化 + 完全一致の照合のみを行う）。

## 実行と PR 本文の記録

宣言が採用されたイシューでは、Implement / 回復 Implement エージェントが各コマンドの実行と結果報告（`optinTestRuns`）を必須手順として行う。実行していないものを pass と報告することは禁止し、環境要因で実行できない場合は `not-run` と理由を返す。PR 本文には「## opt-in テスト実行記録」節（見出し 1 行と、コマンドごとの人間可読行 `- opt-in テスト結果: <コマンド> => <result>` + 機械可読マーカー行）が追記される。記録節はホスト検証済みの値（見出し・40 桁 sha・result・承認一覧と一致したコマンド）だけで組む固定形式の行のみから成り、`not-run` の理由などの補足は PR 本文へ書かず返却値・ログにのみ残す。再利用 PR・post-push fix での更新時は、行全体が記録節の見出し・人間可読行・マーカー行の形式に一致する行だけを行頭・行末アンカー付きの固定パターン（`grep -vE`）で全行除去してから書き直すため、見出しの重複や古い記録行は残らず、本文の説明文中に見出しや接頭辞を引用しただけの行は保持される。マーカー行は **HEAD sha を先頭に束縛した書式**（`<!-- optin-test-record: <40 桁 sha> <pass|fail|not-run> <コマンド> -->`）を使う。sha・result は固定形式（空白を含まない）でコマンド文字列（空白を含み得る）の前に置くため、`grep -cxF` の完全一致だけでパースが一意になる。この sha は記録を書くエージェント自身が `git rev-parse HEAD` で取得した、実際に push した（またはこれから push する）HEAD の値である。

## マージ前の記録ゲート

マージ前（新規マージ経路のみ。`recoveryOnly` では適用しない）に、宣言コマンドごとに PR 本文の pass マーカー行が 1 件以上・pass 以外のマーカー行が 0 件であることを、読み取り専用の記録観測エージェント（`optin-record-verify:#N`）が `observe-pr.sh --mode optin-record` の封筒の転記で確認する（Issue #603。かつてはエージェントが gh・正規化・grep の手順を 1 KB 超のコマンド列として書き写して実行していたが、書き写しの誤りで結果が黙って変わり得たためスクリプトへ移した。本文テキスト自体はコンテキスト・返却値に載せない。merge-exec と同じコンテキスト分離契約）。宣言コマンドは `--optin-cmd '<コマンド>'`（宣言の順に繰り返す）で渡り、封筒の入力のハッシュが PR 番号・repo・コマンドの個数と並びを束縛するため、書き写しでコマンドが欠けた・順序が変わった観測はホストの照合で拒否される。観測できなかった（封筒の照合・取得・形の失敗）ときは観測エージェントを sonnet で 1 回だけ取り直し、なお失敗なら全件不合格として `blocked` で止める。合格の観測は、別のエージェント（`optin-record-reverify:#N`）・別の nonce で取り直した 2 回目と一致したときだけ採る（Issue #804。片方だけの捏造・不一致・2 回目の観測失敗は merge-exec を起動せず `blocked`）。**この件数は「現在の PR headRefOid に対するマーカー行」のみを数える**（スクリプトは `gh pr view --json body,headRefOid` を単一呼び出しで取得し、headRefOid が 40 桁 sha として取得できなければ取得失敗 = 全件不合格として扱う。封筒の `headSha` が merge-exec の期待 HEAD になる）。base 取り込み（`baseMergePrompt`）や別の push で HEAD が変わった後の古い記録・fix 前の記録は、sha が一致しないため grep に一切ヒットせず「存在しないもの」として扱われ、自動的に不合格になる（記録がどの HEAD に対する結果かを束縛しないと、古い pass マーカーが残っているだけでゲートを通過し得るため）。不足があればマージせず `blocked`（`blockedReason: quality`）で停止し、終端理由に不足コマンドを明記する。**この PR 本文ベースの判定は、Merge ループの post-push fix が再実行した実測（`optinFixState`。runs と対象 HEAD の headSha を状態ファイルへ永続化し monitoring 再開時に復元する）と AND で重ねられる**: fix の実測に非 pass が 1 件でも残っていれば、PR 本文が pass のままでも不合格として扱う（PR 本文更新の失敗・省略による fail-open を防ぐ多層防御。fix の headSha が現在の headRefOid と一致する場合のみ override が働き、HEAD がさらに進んだ後は無介入で PR 本文側の sha 束縛判定に委ねる — 古い実測で新しい HEAD の PR を永久に止めない）。

## merge-exec への期待 HEAD sha

merge-exec 呼び出し直前に確定したこの検証済み headRefOid は、**期待 HEAD sha として merge-exec へも渡す**（TOCTOU 対策）。merge-exec は手順 2 で自己取得する headRefOid がこの期待値と一致することを追加で確認し、不一致なら `reason: head-moved` で辞退する。この期待値は `--match-head-commit` の入力にはならない（`--match-head-commit` には merge-exec の自己取得値のみを使う）うえ、一致条件を追加するだけでマージ許可を広げる入力にはならないため、「monitor 出力をマージ経路の入力に使わない」という分離原則とは矛盾しない。宣言テストが無いイシューでは expectedHeadSha は空文字のまま渡され、merge-exec のプロンプト・挙動は完全に不変。
