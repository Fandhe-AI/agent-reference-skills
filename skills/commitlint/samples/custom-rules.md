# Custom Rules

Override or extend rules in `commitlint.config.js` to enforce project-specific conventions.

```javascript
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Restrict allowed commit types
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'chore', 'refactor']],
    // Limit header to 100 characters
    'header-max-length': [2, 'always', 100],
    // Require scope
    'scope-empty': [2, 'never'],
    // Disallow uppercase in subject
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
  },
};
```

Rule tuple format: `[severity, applicable, value]`

| Severity | Meaning |
| --- | --- |
| `0` | disabled |
| `1` | warning |
| `2` | error (blocks commit) |

Applicable is `'always'` (condition must hold) or `'never'` (condition must not hold).

## Notes

- Rules defined locally override any rules inherited from `extends`
- Setting severity to `0` disables a rule that comes from a shared config
- Run `npx commitlint --print-config` to see the final merged ruleset
- Use `--strict` flag to treat warnings as errors (exit code 2 for warnings, 3 for errors)
