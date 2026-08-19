---
name: sync-skills-lock
description: ルート直下の `skills-lock.json` の `computedHash` を upstream リポジトリの最新状態と照合して更新する。`source` が `Fandhe-AI/<repo>` に完全一致しないエントリは clone せず skip (安全弁)。submodule 配下の `skills-lock.json` は触らない。contribute-skill のマージ後や upstream 同期後、「ハッシュ更新」「skills-lock 同期」などで使用。
argument-hint: "[skill-name] (省略時は全スキル)"
user-invocable: true
model: sonnet
---

# sync-skills-lock

ルート直下の `skills-lock.json` の `computedHash` を、upstream リポジトリの現状と照合して更新する。

## 対象ファイル

- **ルート**: 呼び出し元リポジトリ直下の `skills-lock.json` — このスキルが唯一編集するファイル
- **除外**: submodule 配下の `skills-lock.json` — submodule 境界を跨がないため **絶対に触らない**

## 前提条件

- `gh` CLI がインストールされ、認証済みであること
- `node` / `npx` が利用可能であること（`npx skills add` を使用するため）。`skills` CLI は固定版（`SKILLS_CLI_VERSION`）で実行する。値と更新手順は「skills CLI のバージョン固定と更新手順」節を参照
- `file` CLI が利用可能であること（未追跡バイナリファイルの種別表示に使用。未導入の環境では
  種別が `file コマンド未検出` として表示され、承認前にサイズ・git blob ハッシュのみで
  判断することになる。macOS / 主要 Linux ディストリビューションには標準搭載されている）
- ルート直下の `skills-lock.json` が存在すること
- **実行前に `skills-lock.json` に未コミットの変更がないこと**（ステージ済み・未ステージ問わず）。本スキルの実行中に発生する変更は sync 由来のみとなり、`git add skills-lock.json` で全体をステージしても無関係な変更が混入しない
- **対象スキルの `.agents/skills/<name>/` に未コミット変更がないこと**。`npx skills add` は `.agents/skills/<name>/` を upstream の最新版で上書きするため、そのディレクトリに WIP が存在すると即座に失われる。`git checkout` で戻せるのは「最後にコミットされた状態」のみであり、npx 実行前の未コミット編集は復元できない。**未追跡ファイルとして存在する WIP も対象**であり、`git status --porcelain` で検出する

## フロー

### Step 1: 引数を確認し、事前条件を検証する

```bash
TARGET="$ARGUMENTS"  # 空なら全スキル対象

# 引数指定時は kebab-case のみ許可（パストラバーサル防止）
if [[ -n "${TARGET}" && ! "${TARGET}" =~ ^[a-z][a-z0-9-]+$ ]]; then
  echo "エラー: スキル名は小文字 kebab-case のみ許可されています: ${TARGET}"
  exit 1
fi
```

引数ありの場合は該当スキルのみ処理、なしの場合は `skills-lock.json` の全エントリを対象にする。

次に `skills-lock.json` の clean 状態を確認する。未コミット変更（ステージ済み・未ステージ問わず）があれば中止する。

```bash
# skills-lock.json に未コミット変更があれば中止（sync 由来以外の変更の混入を防ぐ）
# git diff 系は untracked を検出しないため porcelain を使う
if [[ -n "$(git status --porcelain -- skills-lock.json)" ]]; then
  echo "エラー: skills-lock.json に未コミットの変更があります。コミットまたは退避してから再実行してください。"
  exit 1
fi
```

### Step 2: upstream 一覧を集計する

`skills-lock.json` を読み、`source` フィールドごとにスキルをグルーピングする（同一リポへの処理を 1 回にまとめるため）。

```
Fandhe-AI/agent-cli-skills:
  - create-commit
  - create-issue
  - ...
```

### Step 3: source を検証する

**安全弁**: 処理前に必ず `source` フィールドが `Fandhe-AI/<repo>` に完全一致することを確認する。前方一致では `../` を含む値が通過し、clone 時の URL パス正規化で組織外リポジトリを対象にできてしまうため、`OWNER/REPO` へ正規化後に厳密な正規表現で検証する。想定外の source は skip してユーザーに警告する。`skills-lock.json` の改ざん・誤設定によって untrusted リポジトリから clone することを防ぐためである。

```bash
REPO_SLUG="${SOURCE#https://github.com/}"
REPO_SLUG="${REPO_SLUG%.git}"
if [[ ! "$REPO_SLUG" =~ ^Fandhe-AI/[A-Za-z0-9._-]+$ ]] \
   || [[ "$REPO_SLUG" == "Fandhe-AI/." || "$REPO_SLUG" == "Fandhe-AI/.." ]]; then
  echo "警告: 想定外の source: $SOURCE — このスキルは skip します"
  continue
fi
```

### Step 4–7: 対象スキルを1つずつ処理する（ループ）

対象スキルそれぞれについて、次の 4→5→6→7 を順に実行し、**1スキル完了後に次スキルへ進む**。全スキル sync であっても同時に複数スキルを処理せず、1スキルずつ完結させること。

#### Step 4: npx skills add で computedHash を更新する

`sha256sum` などで手動計算するのではなく、`npx skills add` に計算を任せる。これにより CLI の内部アルゴリズムと完全に一致する。

```bash
# 当該スキルの install ツリーに未コミット変更があれば npx が上書きするため skip
# git diff 系は untracked を検出しないため porcelain を使う（未追跡 WIP も保護対象）
if [[ -n "$(git status --porcelain -- ".agents/skills/${SKILL_NAME}/")" ]]; then
  echo "警告: .agents/skills/${SKILL_NAME}/ に未コミット変更（未追跡含む）があります。npx の上書きで失われるため skip します。"
  continue
fi

# skills CLI (vercel-labs/skills) は固定版でのみ実行する（未固定 npx はレジストリ
# 最新版の無検証即時実行になり、差分確認・承認より前に走る supply chain 経路になる）。
# 1つ目の --yes は npx 自体のインストール確認プロンプトのスキップ、末尾の --yes は
# skills CLI へ渡す確認プロンプトのスキップで、別物（位置で区別される）。
SKILLS_CLI_VERSION="1.5.22"   # scripts/skills-lock-update.sh と同一値。更新手順は下記節を参照

# CLI に computedHash を更新させる。固定版が解決できない場合（該当版の不存在・
# レジストリ障害）は npx が非ゼロ終了する。その場合は当該スキルを中止（skip）し、
# 固定版を外した再実行はしない（fail-closed。暗黙の最新版フォールバックはしない）。
# ここでの fail-closed は「他スキルへの処理を止めない」という Step 1/3 の他の skip
# 分岐と同じ意味であり、「script 全体を停止する」という意味ではない
# （`scripts/skills-lock-update.sh` 単体実行時の set -euo pipefail による停止とは別軸。
# 詳細は下記「skills CLI のバージョン固定と更新手順」節の fail-closed 記述を参照）。
npx --yes "skills@${SKILLS_CLI_VERSION}" add "${SOURCE}" --skill "${SKILL_NAME}" --yes || {
  echo "警告: skills@${SKILLS_CLI_VERSION} の実行が失敗しました（該当版の不存在・レジストリ障害・ダウンロード中断等、原因は問わない）。"
  # 失敗が部分書き込み後に発生した場合、skills-lock.json / .agents/skills/${SKILL_NAME}/ が
  # 中途半端な状態のまま残り得る。次スキルの `git add skills-lock.json`（Step 7）が
  # この残置変更を承認済みの変更と一緒に stage してしまわないよう、Step 6 の却下時と
  # 同じ手順で当該スキル分のみを即座にリバートしてから skip する。
  # 2つのパスを1つの `git checkout --` に渡すとアトミックに扱われ、どちらか一方が
  # 「追跡対象なし」（初回具現化・untracked のみの書き込み時）で pathspec エラーになると
  # コマンド全体が失敗し、もう一方（skills-lock.json）も復元されないまま continue してしまう。
  # 必ず1コマンド1パスで分離し、一方の失敗が他方の復元を阻害しないようにする。
  git checkout -- skills-lock.json
  git checkout -- ".agents/skills/${SKILL_NAME}/" 2>/dev/null || true
  git clean -fd ".agents/skills/${SKILL_NAME}/"
  echo "警告: 固定版を外した再実行はせず、当該スキルの変更をリバートして skip します。"
  continue
}
```

`npx skills add` は以下を行う:

- upstream の最新スキルをダウンロード
- インストール先（`.agents/skills/<name>/`）を最新化
- `skills-lock.json` の `computedHash` を CLI 算出値で更新

**重要な副作用**: `npx skills add` はインストール済みファイルを最新の upstream 版で上書きする。upstream との同期が目的のため、これは意図した動作である。上記の per-skill clean ガードは `git status --porcelain` を使い、ステージ済み・未ステージ・**未追跡ファイルも含めて**検出する。WIP がある場合は npx 実行前に skip するため、未コミット編集の消失は防止される。

**注意**: clean ガードを通過したスキルについては、npx が即座に `skills-lock.json` と `.agents/skills/<name>/` を書き換える。ユーザー承認（Step 6）の前に変更が確定するため、承認しない場合は Step 6 の案内に従いリバートが必要。

#### Step 5: 当該スキルの差分を表示する

`git diff` は未追跡ファイルを表示しない。Step 4 の clean ガード（`git status --porcelain`）により
`npx skills add` 実行前の当該ディレクトリは必ず clean であるため、**upstream 側でファイルが増えた
ケースでは、その新規ファイルは例外なく未追跡になる**。tracked diff だけを見せて Step 6 の承認判断へ
進むと、その内容を一切確認しないまま承認できてしまうため、tracked 差分と未追跡ファイルの内容を分けて
両方提示する。

```bash
# 当該スキルにスコープした tracked 差分を表示する
git diff -- skills-lock.json ".agents/skills/${SKILL_NAME}/"

# 未追跡ファイルを列挙し、内容を diff 形式で表示する。
# この集合は Step 7（承認・git add）が新規に取り込む集合、Step 6（拒否・git clean -fd）が
# 削除する集合と同一（.gitignore 対象を除く非追跡ファイル）であり、
# 「プレビュー = 承認 = 拒否」の 3 経路が同じ対象を扱うことを保証する。
# git ls-files の既定出力は改行区切りのため、ファイル名自体に改行を含む未追跡ファイルが
# あると 1 パスが複数の存在しないパスへ分割される。分割後の各 git diff は失敗し || true で
# 握り潰される一方、Step 7 の git add は実ファイルをそのまま取り込むため、内容を表示しない
# まま承認できてしまう（-z / NUL 区切りで防ぐ）。
UNTRACKED_COUNT=0
# git ls-files をプロセス置換へ直接つなぐと、set -euo pipefail はその終了コードを
# 検査しない。失敗（破損 index・権限エラー等）しても while は0回実行され「なし」と
# 誤表示するため、一時ファイルへ書き出し if ! ... で明示的に終了コードを検査する
# （scripts/skills-lock-update.sh と同一のガード）。
UNTRACKED_LIST_FILE="$(mktemp)"
trap 'rm -f "${UNTRACKED_LIST_FILE}"' EXIT
if ! git ls-files -z --others --exclude-standard -- ".agents/skills/${SKILL_NAME}/" > "${UNTRACKED_LIST_FILE}"; then
  echo "エラー: git ls-files が失敗し、未追跡ファイルの一覧化を確認できません。中止します。" >&2
  exit 1
fi
while IFS= read -r -d '' f; do
  if [[ "${UNTRACKED_COUNT}" -eq 0 ]]; then
    echo "==> 新規（未追跡）ファイル — 承認時に git add で取り込まれる集合:"
  fi
  UNTRACKED_COUNT=$((UNTRACKED_COUNT + 1))
  # 空ファイルは git diff --no-index が差分を出力しないため、diff の見出しだけでは
  # どのファイルが追加されるか分からない。先に printf でファイル名自体を明示してから
  # 内容の diff を表示する（0 byte のファイルでも名前は必ず見える）。
  printf '%s\n' "--- ${f} ---"
  # バイナリファイルは git diff --no-index が "Binary files ... differ" としか出力せず、
  # 追加される中身を一切提示しない。numstat の追加/削除行数が両方 "-" になる出力で
  # バイナリ判定し、内容の代わりに種別・サイズ・ハッシュを明示することで、中身を
  # 確認できないまま承認（Step 7 の git add）だけが通ってしまう非対称を防ぐ。
  NUMSTAT="$(git diff --no-index --numstat -- /dev/null "${f}" 2>/dev/null || true)"
  if [[ "${NUMSTAT}" == -$'\t'-$'\t'* ]]; then
    FILE_SIZE="$(wc -c < "${f}" | tr -d '[:space:]')"
    if command -v file >/dev/null 2>&1; then
      FILE_TYPE="$(file -b -- "${f}" 2>/dev/null || echo "unknown")"
    else
      FILE_TYPE="file コマンド未検出"
    fi
    FILE_HASH="$(git hash-object -- "${f}")"
    # object format は repository 設定依存（既定 sha1 / 拡張 sha256）で出力桁数が変わる
    # （sha1: 40 桁 / sha256: 64 桁）。固定表記 "git-blob-sha1" だと sha256 リポジトリで
    # 実際のアルゴリズムと表示が食い違うため、表記自体をアルゴリズム非依存にする。
    OBJECT_FORMAT="$(git rev-parse --show-object-format 2>/dev/null || echo unknown)"
    printf '%s\n' "==> バイナリファイル（内容は表示されません）: type=${FILE_TYPE} size=${FILE_SIZE}bytes git-blob-hash(${OBJECT_FORMAT})=${FILE_HASH}"
  else
    # --no-index は index を変更しない（git add -N は使わない。Step 6 の拒否経路が
    # index からの git checkout -- で承認済み他スキルの hash を復元する設計に依存しており、
    # intent-to-add エントリの混入はその復元設計と干渉するため）。
    # 差分ありのとき exit 1 を返す仕様のため、表示専用のこの呼び出しに限り || true で
    # set -e の中断を避ける。
    git diff --no-index -- /dev/null "${f}" || true
  fi
done < "${UNTRACKED_LIST_FILE}"
if [[ "${UNTRACKED_COUNT}" -eq 0 ]]; then
  echo "==> 新規（未追跡）ファイル: なし"
fi
```

変更点を確認し、更新された `computedHash` の内容と未追跡ファイルの中身を合わせてユーザーに提示する。

#### Step 6: ユーザーに当該スキルの承認を求める

差分がある場合のみ、ユーザーに「この更新を適用してよいか」を確認する。Step 5 のプレビュー
（`git ls-files --others --exclude-standard`）・本 Step の拒否（`git clean -fd`）・Step 7 の承認
（`git add`）は同じ集合（追跡ファイルの変更 + 非 ignore の未追跡ファイル）を対象とする。
`.gitignore` 対象はいずれの経路でも扱わない。

**却下された場合**は当該スキルのみ即座にリバートして**次スキルへ continue**する（全体を中止しない）:

```bash
# 当該スキルの変更のみをリバート（追跡ファイル）。
# git checkout -- <file> は HEAD ではなく「index（ステージ）」の内容を作業ツリーへ復元する。
# 前スキルの承認変更は git add で既に index に載っているため、checkout 後の作業ツリーにも
# 引き継がれ、承認済み computedHash が消えることはない。
# 2つのパスを1つの `git checkout --` に渡すとアトミックに扱われ、どちらか一方が
# 「追跡対象なし」（初回具現化・untracked のみの書き込み時）で pathspec エラーになると
# コマンド全体が失敗し、もう一方（skills-lock.json）も復元されない。必ず1コマンド1パスで
# 分離し、一方の失敗が他方の復元を阻害しないようにする。
git checkout -- skills-lock.json
git checkout -- ".agents/skills/${SKILL_NAME}/" 2>/dev/null || true
# npx が新規作成した未追跡ファイルも削除（Step 4 の clean ガードで実行前は clean を保証済み）
# ${SKILL_NAME} は kebab-case 検証済みのため、対象は当該スキルディレクトリ配下に限定される
git clean -fd ".agents/skills/${SKILL_NAME}/"
```

Step 4 の clean ガードにより `npx` 実行前の当該ディレクトリは clean（未追跡含む）であることが保証されているため、`git clean` で削除される未追跡ファイルは `npx` が作成したものに限られる。`git clean` の対象は kebab-case 検証済みの `${SKILL_NAME}` 配下のみに限定されており、リポジトリ全体には影響しない。

このリバートは「次スキルの `npx skills add` 実行前」に行うため、`skills-lock.json` から戻るのは当該スキル分のみである。`git checkout --` は HEAD ではなく index から復元するため、承認済みの他スキルの hash は index にも作業ツリーにも保持されており、影響を受けない。

#### Step 7: 承認されたスキルを stage する（ループ内で積み上げる）

```bash
# 当該スキルのファイルのみをステージング（tracked 変更 + Step 5 で提示した未追跡ファイル）
git add skills-lock.json ".agents/skills/${SKILL_NAME}/"
```

`skills-lock.json` は単一 JSON ファイルのため行単位での部分ステージは現実的でない。しかし Step 1 の事前ガードで実行開始時の clean 状態を保証しているため、ファイル全体をステージしても sync 由来の変更のみが含まれ、無関係な編集が混入することはない。このコマンドをループ内で実行することで、複数スキルの全スキル sync でも処理した全スキルが過不足なく stage に積み上がる。

### Step 8: コミット提案（ループ後に1回だけ実行）

ループ完了後、stage 済みの全承認スキルをまとめて1コミットにする。

```bash
git commit -m "$(cat <<'EOF'
chore(skills-lock): upstream の最新ハッシュと同期

<変更内容の要約>
EOF
)"
```

ユーザーにコミットしてよいか確認する。承認済みスキルが1つもなかった場合（全却下・差分なし）はコミットせずその旨を伝える。

## skills CLI のバージョン固定と更新手順

**Why**: `npx skills add` をバージョン未固定で実行すると、npx はローカルキャッシュに無い場合レジストリのその時点の最新版を確認なしで即時取得・実行する。`skills`（vercel-labs/skills）パッケージが乗っ取られた場合、これは任意コード実行の経路になる。しかもこの実行は Step 5 の差分確認・Step 6 のユーザー承認より**前**に走るため、source の `Fandhe-AI/<repo>` 完全一致検証では防げない。exact 版（`X.Y.Z`。dist-tag・`^`/`~` レンジは禁止）への固定が信頼アンカーになる。

**固定版の決め方**:
1. `npm view skills version` で現在の latest を確認する
2. `npm view skills repository.url` が `vercel-labs/skills` であることを確認する
3. `npm view skills time --json` 等で公開日時が不自然でないことを確認する
4. upstream リポジトリの該当タグ間の差分・リリースノートを確認し、問題なければ採用する

**更新手順**:
1. `scripts/skills-lock-update.sh` の `SKILLS_CLI_VERSION` と、本ファイルの Step 4 フェンス内の `SKILLS_CLI_VERSION` を**同一コミット**で更新する（値は完全一致させる）
2. `node --test skills/sync-skills-lock/tests/` で両ファイルの一致を検証する
3. 1 スキルで実際に実行し、差分が正常であることを確認する
4. `chore(sync-skills-lock): skills CLI を X.Y.Z へ更新` でコミットする

**fail-closed**: 固定版が解決できない場合（該当版の不存在・レジストリ障害）は `npx` が非ゼロ終了する。黙って最新版へフォールバックする経路は存在せず、dist-tag・レンジ指定への書き換えも禁止する。この失敗時の停止範囲は実行経路によって異なる: `scripts/skills-lock-update.sh` を単体実行した場合はスクリプト全体が `set -euo pipefail` により即座に停止する。一方、本ファイルの Step 4 フェンス（複数スキルをループで処理する経路）では、`npx` の失敗を検出したら Step 6 の却下時と同じ手順（`git checkout --` / `git clean -fd`）で当該スキル分の部分書き込みをリバートしてから skip（`continue`）して次スキルへ進む — Step 1/3 の他の skip 分岐と同じ制御フローであり、ループ全体を停止させるものではない。リバートを挟まずに skip すると、失敗が部分書き込み後に発生した場合の残置変更を次スキルの `git add`（Step 7）が承認済み変更と一緒に stage してしまい得るため必須の手順である。

## 注意事項

- **全スキル sync での途中却下**: 1スキルずつ承認・stage を行うため、途中で却下しても承認済みスキルの stage は保持される。全スキル処理後に一括コミットする
- **`skills-lock.json` は実行前 clean 前提で全体をステージする**: 単一 JSON ファイルのため部分ステージは現実的でない。Step 1 の事前ガードで clean を保証し、sync 由来以外の変更の混入を防ぐ
- **ルートの `skills-lock.json` のみを編集**: submodule 配下は手を付けない
- **source 完全一致検証（必須）**: `source` を `OWNER/REPO` へ正規化した上で `Fandhe-AI/<repo>` に完全一致しないエントリは skip する（`contribute-skill` と同じ安全弁）。前方一致では `../` を含む値が通過してしまうため、完全一致の正規表現で検証する。`skills-lock.json` の改ざんや誤設定から防御するため
- **`npx skills add --yes` は上書き確認をスキップする**: upstream に破壊的変更がある場合は `git diff` で内容を必ず確認すること
- **新スキルの取扱い**: ローカルに存在するが upstream に未登録のスキル（`contribute-skill`, `sync-skills-lock` 自身など）は、upstream マージ後に登録する。マージ前に `computedHash` を勝手に書き込まない
- **Step 5 のプレビューは index を変更しない**: 未追跡ファイルの表示に `git add -N`（intent-to-add）ではなく `git diff --no-index` を使う。Step 6 の拒否経路が index からの `git checkout --` で承認済み他スキルの hash を復元する設計に依存しており、i-t-a エントリの混入はその復元設計と干渉するため
- **skills CLI は固定版で実行する**: `npx skills add` はバージョン未固定で実行しない。固定版の決め方・更新手順は「skills CLI のバージョン固定と更新手順」節を参照

## sandbox 環境での実行

このスキルはネットワーク越しの GitHub 操作（`npx skills add` による上流リポジトリの取得等）を必須とする。該当コマンドはコマンド単位で sandbox 無効にして実行する。ネットワーク遮断を解除できない環境では実行できない。

## 検証

コミット後、以下で完了を確認する。

```bash
# skills-lock.json が更新済みであることを確認
git show HEAD -- skills-lock.json | grep computedHash

# 差分なし（sync 完了）を確認
git status --porcelain skills-lock.json
```

- コミットに sync 対象スキルの `computedHash` 更新が含まれること
- ステージ・未ステージに残留変更がないこと

### 未追跡ファイル可視化の手動回帰確認

upstream にファイルが増えたケース（Step 5 のプレビュー拡張が効いているか）は、npx を実行せずに
未追跡ファイルを模擬して確認できる。フラットファイルの追加と、upstream が新規サブディレクトリ
ごと追加する典型ケース（`references/` 等）の両方を確認する。**両ケースで手順3の照合方法が異なる**
点に注意する（後述）。

```bash
# 1a. clean な状態で検証用ファイル（フラット）を作成し、npx が新規ファイルを増やした直後の状態を再現する
touch ".agents/skills/${SKILL_NAME}/__preview_regression_check__.md"

# 1b. 新規サブディレクトリごと追加されるケースも作成する
mkdir -p ".agents/skills/${SKILL_NAME}/__preview_regression_dir__"
touch ".agents/skills/${SKILL_NAME}/__preview_regression_dir__/new.md"

# 2. Step 5 のプレビュー部（上記コマンド）を実行し、両方の検証用ファイルの内容（0 byte でも
#    「新規（未追跡）ファイル — 承認時に git add で取り込まれる集合:」の一覧に、サブディレクトリ
#    配下のファイルも含めてフルパスで名前が出ること）が表示されることを確認する
#    （プレビューは git ls-files ベースのため、ディレクトリではなく個々のファイルパスを列挙する）

# 3. git clean -fdn（dry-run）の一覧と照合する。
#    フラットファイルはプレビューの行と `git clean -fdn` の行が完全一致する。
#    新規サブディレクトリは `git clean -fdn` が個々のファイルではなく親ディレクトリを
#    まとめて1行（`Would remove <dir>/`）で報告するため、行単位の完全一致では照合できない。
#    この場合はプレビューの各ファイルパスが `git clean -fdn` のいずれかの出力行（ファイル
#    自身、またはその祖先ディレクトリ）で始まることを確認する（前方一致で照合する）。
#    完全一致を要求すると、正常に動作しているプレビューを「壊れている」と誤診断する。
git clean -fdn -- ".agents/skills/${SKILL_NAME}/"

# 4. 検証用ファイル・ディレクトリを削除して原状復帰する
rm ".agents/skills/${SKILL_NAME}/__preview_regression_check__.md"
rm -rf ".agents/skills/${SKILL_NAME}/__preview_regression_dir__"
```

## 既存スキルとの関係

- `contribute-skill` でスキル改修が upstream にマージされた後に本スキルを実行する運用を推奨
- `create-commit` の Conventional Commits を踏襲（Step 8）
- 実行可能コマンド集として `scripts/skills-lock-update.sh` を参照
