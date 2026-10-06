// skills-contribute.sh の lock 照合ガード（fail-closed）の回帰テスト。
// ガードは clone より前に中止する契約。gh スタブの呼び出し有無と stderr で通過/中止を判定する。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT = resolve(dirname(fileURLToPath(import.meta.url)), '../scripts/skills-contribute.sh');
const UP = 'Fandhe-AI/agent-cli-skills';

function run({ lock, name = 'foo', upstream = UP }) {
  const dir = mkdtempSync(join(tmpdir(), 'contrib-guard-'));
  try {
    const bin = join(dir, 'bin');
    mkdirSync(bin);
    const log = join(dir, 'gh.log');
    writeFileSync(join(bin, 'gh'), `#!/bin/sh\necho "$@" >> "${log}"\nexit 1\n`);
    chmodSync(join(bin, 'gh'), 0o755);
    const work = join(dir, 'work');
    mkdirSync(work);
    if (lock !== undefined) writeFileSync(join(work, 'skills-lock.json'), lock);
    mkdirSync(join(work, 'skills/foo'), { recursive: true });
    writeFileSync(join(work, 'skills/foo/SKILL.md'), '---\nname: foo\n---\n');
    const r = spawnSync('bash', [SCRIPT, name, upstream], {
      cwd: work,
      encoding: 'utf8',
      env: { ...process.env, PATH: `${bin}:${process.env.PATH}` },
    });
    return { ...r, ghCalled: existsSync(log) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const entry = (o) => JSON.stringify({ version: 1, skills: { foo: o } });

test('1 lock なしは中止', () => {
  const r = run({});
  assert.equal(r.status, 1);
  assert.match(r.stderr, /skills-lock\.json が見つかりません/);
  assert.equal(r.ghCalled, false);
});

test('2 未登録は中止', () => {
  const r = run({ lock: JSON.stringify({ version: 1, skills: { bar: { source: UP, sourceType: 'github' } } }) });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /登録されていない/);
  assert.equal(r.ghCalled, false);
});

test('3 source 欠落は中止', () => {
  const r = run({ lock: entry({ sourceType: 'github' }) });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /source がありません/);
  assert.equal(r.ghCalled, false);
});

test('4 source 空文字は中止', () => {
  const r = run({ lock: entry({ source: '', sourceType: 'github' }) });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /source がありません/);
  assert.equal(r.ghCalled, false);
});

test('5 壊れた JSON は中止', () => {
  const r = run({ lock: '{not json' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /解析できません/);
  assert.equal(r.ghCalled, false);
});

test('6 source 不一致は中止', () => {
  const r = run({ lock: entry({ source: 'Fandhe-AI/other', sourceType: 'github' }) });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /一致しません/);
  assert.equal(r.ghCalled, false);
});

test('7 sourceType が github 以外は中止', () => {
  const r = run({ lock: entry({ source: UP, sourceType: 'local' }) });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /sourceType/);
  assert.equal(r.ghCalled, false);
});

test('8 正常はガードを通過する', () => {
  const r = run({ lock: entry({ source: UP, sourceType: 'github' }) });
  assert.match(r.stdout, /==> contribute-skill: foo/);
  assert.doesNotMatch(r.stderr, /skills-lock\.json|source がありません|一致しません|sourceType/);
});

test('9 SKILL_NAME に .. を含むと中止', () => {
  const r = run({ lock: entry({ source: UP, sourceType: 'github' }), name: '../foo' });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /kebab-case/);
  assert.equal(r.ghCalled, false);
});
