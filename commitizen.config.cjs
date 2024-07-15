const custom = require('@digitalroute/cz-conventional-changelog-for-jira/configurable');

module.exports = custom({
  list: ['feat', 'fix', 'test', 'docs', 'chore'],
  jiraPrepend: '[',
  jiraAppend: ']',
  exclamationMark: true,
  jiraPrefix: 'GIT',
  types: {
    feat: {
      description: '✨ A new feature',
    },
    fix: {
      description: '🪲  A bug fix',
    },
    docs: {
      description: '📖 Documentation only changes',
    },
    test: {
      description: '🧪 Adding missing tests or correcting existing tests',
    },
    chore: {
      description: "🚧 Other changes that don't modify src or test files",
    },
  },
  skipScope: true,
});
