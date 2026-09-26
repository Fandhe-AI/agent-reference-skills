// 最小限の引数パーサー。外部依存を増やさないため Node 標準の util.parseArgs を薄くラップする。
import { parseArgs as nodeParseArgs } from "node:util";

export class ArgError extends Error {}

/**
 * @param {string[]} argv process.argv.slice(2)
 * @param {object} options node:util parseArgs の options 相当（type/default/multiple）
 * @param {string[]} [allowPositionals]
 */
export function parseFlags(argv, options, { allowPositionals = false } = {}) {
  try {
    const { values, positionals } = nodeParseArgs({
      args: argv,
      options,
      allowPositionals,
      strict: true,
    });
    return { values, positionals };
  } catch (err) {
    throw new ArgError(err.message);
  }
}

export function requireString(values, name) {
  const v = values[name];
  if (typeof v !== "string" || v.length === 0) {
    throw new ArgError(`--${name} は必須の文字列引数です`);
  }
  return v;
}
