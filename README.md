![acot](docs/assets/repository-header.png)

<p align="center">
  Accessibility Testing Framework
</p>

<p align="center">
  <a href="https://github.com/acot-a11y/acot/actions?workflow=CI"><img src="https://img.shields.io/github/workflow/status/acot-a11y/acot/CI?logo=github&style=flat-square" alt="GitHub Workflow Status" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/acot-a11y/acot?label=license&style=flat-square" alt="MIT LICENSE" /></a>
</p>

---

<p align="center">
  <strong>!! THE ACOT IS STILL IN ALPHA STATUS AND MAY BE BROKEN BY THE UPGRADE !!</strong>
</p>

---

## Overview

> More accessible web, all over the world.

acot is an open-source Accessibility Testing Framework that uses headless Chrome ([puppeteer](https://github.com/puppeteer/puppeteer)) to provide means of testing any website or web app. It supports for making the Web accessible with a flexible, highly reliable rule set that leverages browser-native APIs such as the AOM and DOM.

### Reliability

- By using the results rendered by the browser, a highly reliable audit is possible.
- acot provides original rules. In addition, it offers rules based on the proven [axe](https://github.com/dequelabs/axe-core).

### Extensibility

- You can use the rules published in the [ESLint](https://eslint.org/) like plugin system.
- It's easy to implement and publish the rule sets you need for your team.
- The divided packages allow you to assemble a custom workflow that works best for your team.

### Portability

- You can create and publish your own configuration with Sharable Config.
- Provides Custom Runner for integration with Storybook.

## Getting Started

Install via npm:

```bash
$ npm install --save-dev @acot/cli

# or

$ npm install --save-dev @acot/cli puppeteer
```

You can build the configuration file and install the dependent packages with the following commands:

```bash
$ npx acot init
```

![Running acot init command](./docs/assets/acot-init.gif)

And then, the `run` subcommand performs an audit based on the configuration file.

```bash
$ npx acot run
```

![Running acot run command](./docs/assets/acot-run.gif)

See the [CLI documentation](./packages/cli) for details.

## Configuration

If you use acot as the CLI, you can configure the audit via configuration file.  
Usually, when you create a configuration file called `acot.config.js`, acot will automatically use that configuration file.

**The simple configuration is as follows (`acot.config.js`):**

```javascript
module.exports = {
  presets: ['@acot/wcag'],
  extends: ['preset:@acot/wcag/recommended'],
  origin: 'http://localhost:8000',
  connection: {
    command: 'npm run serve',
  },
  paths: ['/', '/path', '/path/to', '/path/to/dir'],
  rules: {
    '@acot/wcag/interactive-has-enough-size': 'warn',
    '@acot/wcag/page-has-valid-lang': 'off',
    '@example/foo/bar': [
      'error',
      {
        /* options */
      },
    ],
  },
};
```

See the [Configuration](./docs/configuration.md) for details.

## Requirements

- Node.js 12.10.0+ (require [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled))
- Puppeteer 5.4.0+ (require [aria handler](https://github.com/puppeteer/puppeteer/releases/tag/v5.4.0))

## Documentation

- [Configuration](./docs/configuration.md)
- [Command Line Interface](./packages/cli)
- [Core API](./packages/core)
- [Develoepr Guide](./docs/developer-guide.md)

## Packages

acot has a feature which is divided into several packages.

### Foundations

| Package                            | Version                                                                                                           | Description                             |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| [@acot/core](./packages/core/)     | [![npm](https://img.shields.io/npm/v/@acot/core?style=flat-square)](https://www.npmjs.com/package/@acot/core)     | acot core API.                          |
| [@acot/cli](./packages/cli/)       | [![npm](https://img.shields.io/npm/v/@acot/cli?style=flat-square)](https://www.npmjs.com/package/@acot/cli)       | acot command line tool.                 |
| [@acot/config](./packages/config/) | [![npm](https://img.shields.io/npm/v/@acot/config?style=flat-square)](https://www.npmjs.com/package/@acot/config) | A module to manipulate configs of acot. |

### Configs / Presets

| Package                                                | Version                                                                                                                               | Description                     |
| :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------ |
| [@acot/acot-config](./packages/acot-config/)           | [![npm](https://img.shields.io/npm/v/@acot/acot-config?style=flat-square)](https://www.npmjs.com/package/@acot/acot-config)           | A basic acot rule set.          |
| [@acot/acot-preset-wcag](./packages/acot-preset-wcag/) | [![npm](https://img.shields.io/npm/v/@acot/acot-preset-wcag?style=flat-square)](https://www.npmjs.com/package/@acot/acot-preset-wcag) | A WCAG-based rule set for acot. |
| [@acot/acot-preset-axe](./packages/acot-preset-axe/)   | [![npm](https://img.shields.io/npm/v/@acot/acot-preset-axe?style=flat-square)](https://www.npmjs.com/package/@acot/acot-preset-axe)   | An axe rule set for acot.       |

### Runners

| Package                                                          | Version                                                                                                                                         | Description                                                                      |
| :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| [@acot/acot-runner](./packages/acot-runner/)                     | [![npm](https://img.shields.io/npm/v/@acot/acot-runner?style=flat-square)](https://www.npmjs.com/package/@acot/acot-runner)                     | An acot default runner.                                                          |
| [@acot/acot-runner-sitemap](./packages/acot-runner-sitemap/)     | [![npm](https://img.shields.io/npm/v/@acot/acot-runner-sitemap?style=flat-square)](https://www.npmjs.com/package/@acot/acot-runner-sitemap)     | An acot custom runner reading audit pages from sitemap.                          |
| [@acot/acot-runner-storybook](./packages/acot-runner-storybook/) | [![npm](https://img.shields.io/npm/v/@acot/acot-runner-storybook?style=flat-square)](https://www.npmjs.com/package/@acot/acot-runner-storybook) | An acot custom runner for [Storybook](https://github.com/storybookjs/storybook). |

### Reporters

| Package                                                        | Version                                                                                                                                       | Description                                      |
| :------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| [@acot/acot-reporter-pretty](./packages/acot-reporter-pretty/) | [![npm](https://img.shields.io/npm/v/@acot/acot-reporter-pretty?style=flat-square)](https://www.npmjs.com/package/@acot/acot-reporter-pretty) | An acot default reporter.                        |
| [@acot/acot-reporter-dot](./packages/acot-reporter-dot/)       | [![npm](https://img.shields.io/npm/v/@acot/acot-reporter-dot?style=flat-square)](https://www.npmjs.com/package/@acot/acot-reporter-dot)       | A dot reporter for [@acot/cli](./packages/cli/). |

### Utilities

| Package                                                | Version                                                                                                                               | Description                                                                          |
| :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| [@acot/find-chrome](./packages/find-chrome/)           | [![npm](https://img.shields.io/npm/v/@acot/find-chrome?style=flat-square)](https://www.npmjs.com/package/@acot/find-chrome)           | Find Chrome available in your runtime environment.                                   |
| [@acot/html-pickup](./packages/html-pickup/)           | [![npm](https://img.shields.io/npm/v/@acot/html-pickup?style=flat-square)](https://www.npmjs.com/package/@acot/html-pickup)           | Use the CSS Selector to pick up the elements from the HTML string.                   |
| [@acot/schema-validator](./packages/schema-validator/) | [![npm](https://img.shields.io/npm/v/@acot/schema-validator?style=flat-square)](https://www.npmjs.com/package/@acot/schema-validator) | A simple wrapper module for [schema-utils](https://github.com/webpack/schema-utils). |

## FAQ

_T.B.A_

## Contributing

We are always welcoming your contribution :clap:

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT © wadackel](./LICENSE)
