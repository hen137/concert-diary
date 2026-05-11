const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    /**
     * Format:
     * <type>([optional scope]): <description>
     *
     * <body>
     *
     * <footer>
     * */

    // Subject/Description Rules:
    'type-empty': [2, 'never'], // enforce that the type is not empty
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'test',
        'perf',
        'refactor',
        'build',
        'ci',
        'chore',
        'docs',
        'style',
      ],
    ], // enforce commit types
    'scope-case': [2, 'always', 'lower-case'], // enforce that if a scope is used, it is in lower-case
    'header-max-length': [2, 'always', 50], // fit the subject line inside 50 characters
    'subject-case': [2, 'always', 'sentence-case'], // start subject line with a capital letter
    'subject-full-stop': [2, 'never', '.'], // avoid trailing period

    // Body Rules:
    'body-leading-blank': [2, 'always'], // body is added by leaving a blank line after the subject line
    'body-max-line-length': [2, 'always', 72], // wrap the body at 72 characters

    // Footer Rules:
    'footer-leading-blank': [2, 'always'], // ensure a blank line precedes the footer
  },
};

export default config;
