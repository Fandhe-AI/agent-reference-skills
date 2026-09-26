// make skill sample (node-pnpm): @make-sample/cli
//
// Consumes @make-sample/core via a pnpm workspace:* dependency to show
// intra-workspace linking, not a Make-managed file dependency.

import { sum, formatGreeting } from "@make-sample/core";

export function main(argv) {
  const [name, ...numbers] = argv;
  const total = numbers.map(Number).reduce((acc, n) => sum(acc, n), 0);
  return `${formatGreeting(name ?? "world")} total=${total}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(main(process.argv.slice(2)));
}
