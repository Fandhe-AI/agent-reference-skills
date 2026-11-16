// スキル名の検証正規表現の一致を固定する回帰テスト。
//
// SKILL.md の本文（エージェント側の事前検証）は `^[a-z0-9]+(-[a-z0-9]+)*$`、フェンスと
// scripts/skills-contribute.sh は `^[a-z][a-z0-9-]+$` で食い違っていた（`a`・`9abc` は本文だけ通り、
// `ab-`・`a--b` はスクリプトだけ通る）。本文・フェンス・注意事項・スクリプトが同じ文字列であることと、
// スクリプトの判定の表を固定する。
//
// スクリプトは SKILL_NAME 検証の直後に upstream の検証へ進むため、upstream に許可外の値を渡して
// 入力検証の段で止める（clone・gh・lock 読み取りに到達しない）。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, chmodSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SKILL_MD = resolve(HERE, '../SKILL.md');
const SCRIPT = resolve(HERE, '../scripts/skills-contribute.sh');
const EXPECTED = '^[a-z][a-z0-9-]+$';

// 1 か所だけに一致することを確かめてから取り出す（置き場所が増減したら気づけるように）
function only(text, re, label) {
  const ms = [...text.matchAll(re)];
  assert.equal(ms.length, 1, `${label} の一致数が 1 ではない: ${ms.length}`);
  return ms[0][1];
}

test('本文・フェンス・注意事項・スクリプトの正規表現が同じ文字列', () => {
  const md = readFileSync(SKILL_MD, 'utf8');
  const sh = readFileSync(SCRIPT, 'utf8');
  const found = {
    body: only(md, /エージェント側で `([^`]+)`（kebab-case のスキル名）/g, '本文'),
    fence: only(md, /\[\[ ! "\$\{SKILL_NAME\}" =~ (\S+) \]\]/g, 'フェンス'),
    note: only(md, /空判定の直後・パス解決の前に `([^`]+)` で検証/g, '注意事項'),
    script: only(sh, /\[\[ ! "\$SKILL_NAME" =~ (\S+) \]\]/g, 'スクリプト'),
  };
  for (const [k, v] of Object.entries(found)) assert.equal(v, EXPECTED, k);
});

function run(name) {
  const dir = mkdtempSync(join(tmpdir(), 'contrib-name-'));
  try {
    const bin = join(dir, 'bin');
    mkdirSync(bin);
    const log = join(dir, 'calls.log');
    for (const cmd of ['gh', 'git', 'jq']) {
      writeFileSync(join(bin, cmd), `#!/bin/sh\necho "${cmd} $*" >> "${log}"\nexit 1\n`);
      chmodSync(join(bin, cmd), 0o755);
    }
    const work = join(dir, 'work');
    mkdirSync(work);
    const r = spawnSync('bash', [SCRIPT, name, 'attacker/repo'], {
      cwd: work,
      encoding: 'utf8',
      env: { ...process.env, PATH: `${bin}:${process.env.PATH}` },
    });
    return { ...r, called: existsSync(log) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// [入力, スクリプトが受け付けるか]
const TABLE = [
  ['a', false],
  ['1', false],
  ['9abc', false],
  ['2fa', false],
  ['ab-', true],
  ['a--b', true],
  ['create-pr', true],
];

for (const [name, accepted] of TABLE) {
  test(`スクリプトの判定: ${name} は ${accepted ? '通る' : '拒否'}`, () => {
    const r = run(name);
    assert.equal(r.status, 1);
    const out = r.stdout + r.stderr;
    if (accepted) {
      assert.doesNotMatch(out, /SKILL_NAME は小文字 kebab-case/);
      assert.match(out, /想定外の upstream/);
    } else {
      assert.match(out, /SKILL_NAME は小文字 kebab-case/);
    }
    assert.equal(r.called, false, '入力検証の段で止まり外部コマンドを呼ばない');
    // 本文の正規表現（エージェント側の事前検証）でも同じ判定になる
    assert.equal(new RegExp(EXPECTED).test(name), accepted);
  });
}
