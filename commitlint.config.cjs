module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*):\s\[(\w*-\d+)\]\s(.*)$/,
      headerCorrespondence: ['type', 'ticket', 'subject'],
    },
  },
  rules: {
    'type-empty': [0, 'always'],
    'jira-ticket': [0, 'always'],
    'subject-empty': [0, 'always'],
    'subject-good': [0, 'always'],
  },
  plugins: [
    {
      rules: {
        'jira-ticket': (config) => {
          const { ticket } = config;

          return [ticket?.match(/[A-Z]+-[0-9]+/), `Your subject should contain the JIRA ticket`];
        },
        'subject-good': (config) => {
          const { subject } = config;

          return [
            subject?.match(/^(?!(\b(testing|updated|update|test|wip|initial|setup|create)\b)$)\w+\s+\w+.*$/i),
            `Please use a meaningful commit message. Please refrain using only one word as the commit message`,
          ];
        },
      },
    },
  ],
};
