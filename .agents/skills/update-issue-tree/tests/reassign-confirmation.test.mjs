// Step 3 / Step 4 の付け替え（reassign-sub-issue.sh）の明示承認を固定する回帰テスト。
//
// 付け替えは DELETE → POST で元に戻せるが、変更前は対象を提示した後のユーザーの明示の返答が
// 必須だった。起動時の包括的な指示（「確認なしで進めてよい」）だけで非対話に実行できるようにすると、
// ベースの AGENTS.md が禁じる承認境界の後退になる（PR #812 の codex 指摘）。
// そのため付け替えの承認は Step 2 / Step 3 とも、起動時の「確認なしで」では省けない形で書く。
// Step 2 は付け替え以外の確認だけ起動時の省略を認め、Step 3 の定型文と矛盾しないことを確かめる。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_MD = join(dirname(fileURLToPath(import.meta.url)), '..', 'SKILL.md');
const text = readFileSync(SKILL_MD, 'utf8');

// `### Step N:` から次の `### ` 見出し（または `## `）までを取り出す
function section(n) {
  const start = text.indexOf(`### Step ${n}:`);
  assert.ok(start >= 0, `Step ${n} の見出しが無い`);
  const rest = text.slice(start + 1);
  const m = rest.match(/\n#{2,3} /);
  return m ? rest.slice(0, m.index + 1) : rest;
}

// Step 2 の非対話の扱いは 2 つの箇条書き (a) / (b) に分かれる。それぞれの本文を取り出す。
// (b) の下には入れ子の依存の扱いが続くため、(b) は次の非入れ子の行（空行）までを返す。
function nonInteractiveBranches() {
  const s = section(2);
  const aStart = s.indexOf('- (a) ');
  const bStart = s.indexOf('- (b) ');
  assert.ok(aStart >= 0, 'Step 2 に (a) の箇条書きが無い');
  assert.ok(bStart > aStart, 'Step 2 に (b) の箇条書きが無い、または (a) より前にある');
  const bEnd = s.indexOf('\n\n', bStart);
  assert.ok(bEnd > bStart, '(b) の箇条書きの終端が無い');
  return { before: s.slice(0, aStart), a: s.slice(aStart, bStart), b: s.slice(bStart, bEnd), after: s.slice(bEnd) };
}

test('Step 3 は「確認なしで」が返答にならない明示承認の定型文を持つ', () => {
  const s = section(3);
  assert.match(s, /この会話の中でユーザーの明示の返答を得るまで `scripts\/reassign-sub-issue\.sh`/);
  assert.match(s, /起動時の指示に含まれる「確認なしで」「そのまま進めて」等は、この確認の返答にならない/);
  assert.match(s, /返答を得られない環境（非対話実行）のうち、起動時に確認を省く明示がある場合（Step 2 の \(b\)）では、実行せずに/);
});

test('Step 3 に起動時の確認省略の明示を承認とみなす文が無い', () => {
  const s = section(3);
  assert.doesNotMatch(s, /起動時の指示に確認を省くことの明示/);
  assert.doesNotMatch(s, /省くことの明示（例: 「確認なしで進めてよい」）が含まれている場合/);
  assert.doesNotMatch(s, /通常の確認で足りる/);
});

test('Step 4 に付け替えの承認を緩める文が無い', () => {
  const s = section(4);
  assert.doesNotMatch(s, /起動時の指示に確認を省くことの明示/);
});

test('Step 2 は付け替えの確認を起動時の「確認なしで」で省けないと明記する', () => {
  const s = section(2);
  assert.match(s, /付け替え（`REASSIGN_PLAN` \/ `ORPHAN_PLAN` の対象/);
  assert.match(s, /起動時の「確認なしで」では省けない/);
  assert.match(s, /対象を提示した後のユーザーの明示の返答に限り承認とみなす/);
});

test('Step 2 の起動時の確認省略は付け替え以外の変更に限られる', () => {
  const s = section(2);
  assert.match(s, /付け替え以外の変更（ラベル同期・新 Phase 親の新設・分解）の確認は省いて続行してよい/);
  // 省略を認める文が付け替えを含む包括的な形に戻っていないこと
  assert.doesNotMatch(s, /に限り、確認を省いて続行してよい/);
});

// 非対話で付け替えの返答が得られないときの扱いは、起動時の指示に確認を省く明示があるかで分かれる。
// (a) 明示が無ければ何も書かずに止まる。(b) 明示があれば付け替えだけをスキップして続ける。
// スキップと続行の文が (a) の後に結びつかず、後の文が勝って承認なしの書き込みが走る形に戻さない
// （PR #812 の Bugbot 指摘）。
test('Step 2 の非対話の扱いは起動時の明示の有無で (a) / (b) に分かれる', () => {
  const { before } = nonInteractiveBranches();
  assert.match(before, /非対話実行）の扱いは、起動時の指示に確認を省く明示があるかで次の 2 つに分かれる。/);
});

test('Step 2 の (a) は明示が無い非対話実行で書き込まず止まり続行規則を適用しない', () => {
  const { a } = nonInteractiveBranches();
  assert.match(a, /^- \(a\) 起動時の指示に確認を省く明示が無い非対話実行/);
  assert.match(a, /書き込みを一切せず、棚卸し対象と確認事項を報告して止める/);
  assert.match(a, /以降の手順（Step 3〜8）へ進まない/);
  assert.match(a, /\(b\) の続行規則は適用しない/);
  // スキップ・続行の文は (a) の下に現れない
  assert.doesNotMatch(a, /だけをスキップ/);
  assert.doesNotMatch(a, /依存しない手順は続ける/);
  assert.doesNotMatch(a, /全書き込みは止めない/);
});

test('Step 2 の (b) は明示がある非対話実行で付け替えだけをスキップし承認済みの他の手順を続ける', () => {
  const { b } = nonInteractiveBranches();
  assert.match(b, /^- \(b\) 起動時の指示に確認を省く明示がある非対話実行/);
  assert.match(b, /全書き込みは止めない/);
  assert.match(b, /非対話で付け替えの返答が得られない場合は付け替え（Step 3 \/ Step 4）だけをスキップし/);
  assert.match(b, /起動時の指示で承認済みの付け替えに依存しない手順は続ける/);
  assert.match(b, /この \(b\) の場合にだけ適用する/);
});

test('スキップと続行の文は (b) の下にだけ現れ (a) と前置きには現れない', () => {
  const { before, a, b, after } = nonInteractiveBranches();
  for (const re of [
    /非対話で付け替えの返答が得られない場合は付け替え（Step 3 \/ Step 4）だけをスキップし/,
    /依存しない手順は続ける/,
  ]) {
    assert.match(b, re);
    assert.doesNotMatch(before, re);
    assert.doesNotMatch(a, re);
    assert.doesNotMatch(after, re);
  }
});

test('Step 2 は後続手順ごとの付け替えへの依存を (b) の入れ子として書く', () => {
  const s = section(2);
  // 依存の扱いは (b) の箇条書き（先頭の行より深い入れ子）に収まり、(a) には無い
  const { a, b } = nonInteractiveBranches();
  assert.doesNotMatch(a, /Step 5（新 Phase 親の新設）/);
  assert.match(b, /\n {2}- Step 5（新 Phase 親の新設）と Step 7（分解）は/);
  assert.match(b, /\n {2}- Step 6（ラベル同期）は/);
  assert.match(b, /\n {2}- Step 8（ルート本文の更新）は/);
  assert.match(b, /\n {2}- Step 9 の要確認事項にスキップした付け替えの対象を記載する/);
  assert.match(s, /Step 5（新 Phase 親の新設）と Step 7（分解）は[^。]*続ける/);
  assert.match(s, /Step 6（ラベル同期）は[^。]*付け替えをスキップしたときは対象の issue を同期の対象から外す/);
  assert.match(s, /Step 8（ルート本文の更新）は[^。]*続け[^。]*`REASSIGNED_COUNT` \/ `ORPHAN_COUNT` へ `0` を代入する/);
  assert.match(s, /Step 9 の要確認事項にスキップした付け替えの対象を記載する/);
});

test('Step 3 の非対話の扱いは付け替えだけをスキップし他の手順を止めない', () => {
  const s = section(3);
  assert.match(s, /付け替え（Step 3 \/ Step 4）だけをスキップする/);
  assert.match(s, /起動時の指示で承認済みの付け替えに依存しない手順は続ける/);
  // 条件（Step 2 の (b)）がスキップの文より前に置かれ、(a) はこの節へ進まない
  assert.match(s, /非対話実行）のうち、起動時に確認を省く明示がある場合（Step 2 の \(b\)）では、実行せずに[^。]*付け替え（Step 3 \/ Step 4）だけをスキップする/);
  assert.match(s, /（Step 2 の \(a\)）は、何も書かずに止まるため、この節へ進まない/);
});

test('Step 2 と Step 3 に非対話で全書き込みを止める形の文言が残っていない', () => {
  for (const n of [2, 3]) {
    const s = section(n);
    // 無条件に「返答を得られない環境では〜報告して止める」とする旧形（付け替え以外まで止める）
    assert.doesNotMatch(s, /承認が無く対話もできない環境（非対話実行）では、書き込みをせず確認事項を報告して止める。/);
    assert.doesNotMatch(s, /実行せずに、対象（件数・タイトル等）と確認事項を報告して止める/);
  }
});

test('Step 2 は付け替えの受け皿としてだけ要る新 Phase 親をスキップ時に作らないと書く', () => {
  const s = section(2);
  assert.match(s, /付け替え・再配置の受け皿としてだけ必要になった新 Phase 親は、付け替えをスキップしたときは作らない/);
});

test('検証節はスキップした付け替え対象の残置を Step 9 の記録と突き合わせる例外にする', () => {
  const start = text.indexOf('\n## 検証');
  assert.ok(start >= 0, '検証節が無い');
  const rest = text.slice(start + 1);
  const m = rest.match(/\n## /);
  const v = m ? rest.slice(0, m.index + 1) : rest;
  assert.match(v, /Step 2 の \(b\) により Step 3 \/ Step 4 をスキップした対象は、残置のままになるためこの確認の例外として扱い/);
});

test('Step 2 に「全書き込みを止める」の字面が残っていない', () => {
  assert.doesNotMatch(section(2), /全書き込みを止める/);
  assert.doesNotMatch(section(3), /全書き込みを止める/);
});
