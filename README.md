# babel-vite

<!-- prettier-ignore-start -->
[![Build Status](https://img.shields.io/github/workflow/status/OpenSourceRaidGuild/babel-vite/validate?logo=github&style=flat-square)](https://github.com/OpenSourceRaidGuild/babel-vite/actions?query=workflow%3Avalidate)
[![codecov](https://img.shields.io/codecov/c/github/OpenSourceRaidGuild/babel-vite.svg?style=flat-square)](https://codecov.io/gh/OpenSourceRaidGuild/babel-vite)
[![All Contributors](https://img.shields.io/github/all-contributors/OpenSourceRaidGuild/babel-vite?color=orange&style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/OpenSourceRaidGuild/babel-vite/blob/master/CODE_OF_CONDUCT.md)

[![Discord](https://img.shields.io/discord/808364903822917662.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/grS89HWeYh)
[![Watch on GitHub](https://img.shields.io/github/watchers/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://github.com/OpenSourceRaidGuild/babel-vite/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://github.com/OpenSourceRaidGuild/babel-vite/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20babel-preset-vite%20by%20OpenSourceRaidGuild%20https%3A%2F%2Fgithub.com%2FOpenSourceRaidGuild%2Fbabel-vite%20%F0%9F%91%8D)
<!-- prettier-ignore-end -->

> Please note: this plugin is intended to provide an approximation of some of Vite specific
> transformations when running the code in non-Vite environment, for example, running tests with a
> NodeJS based test runner.
>
> **The functionality within these transformations should not be relied upon in production.**

This repo includes the following presets and plugins:

- [babel-preset-vite](./packages/babel-preset-vite)
  - [babel-plugin-transform-vite-meta-env](./packages/babel-plugin-transform-vite-meta-env)
  - [babel-plugin-transform-vite-meta-glob](./packages/babel-plugin-transform-vite-meta-glob)
  - [babel-plugin-transform-vite-meta-hot](./packages/babel-plugin-transform-vite-meta-hot)

For installation, usage and example, please refer to the documentation in the above packages.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="12.5%"><a href="https://github.com/mpeyper"><img src="https://avatars.githubusercontent.com/u/23029903?v=4?s=100" width="100px;" alt="Michael Peyper"/><br /><sub><b>Michael Peyper</b></sub></a><br /><a href="https://github.com/OpenSourceRaidGuild/babel-vite/commits?author=mpeyper" title="Code">💻</a> <a href="https://github.com/OpenSourceRaidGuild/babel-vite/commits?author=mpeyper" title="Tests">⚠️</a> <a href="https://github.com/OpenSourceRaidGuild/babel-vite/commits?author=mpeyper" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="12.5%"><a href="https://github.com/nobrayner"><img src="https://avatars.githubusercontent.com/u/40751395?v=4?s=100" width="100px;" alt="Braydon Hall"/><br /><sub><b>Braydon Hall</b></sub></a><br /><a href="https://github.com/OpenSourceRaidGuild/babel-vite/commits?author=nobrayner" title="Code">💻</a></td>
      <td align="center" valign="top" width="12.5%"><a href="https://github.com/MohitPopli"><img src="https://avatars.githubusercontent.com/u/17976072?v=4?s=100" width="100px;" alt="Mohit"/><br /><sub><b>Mohit</b></sub></a><br /><a href="https://github.com/OpenSourceRaidGuild/babel-vite/commits?author=MohitPopli" title="Code">💻</a></td>
      <td align="center" valign="top" width="12.5%"><a href="https://rubenmoya.dev/"><img src="https://avatars.githubusercontent.com/u/905225?v=4?s=100" width="100px;" alt="Rubén Moya"/><br /><sub><b>Rubén Moya</b></sub></a><br /><a href="https://github.com/OpenSourceRaidGuild/babel-vite/commits?author=rubenmoya" title="Code">💻</a></td>
      <td align="center" valign="top" width="12.5%"><a href="https://github.com/mitchelvanbever"><img src="https://avatars.githubusercontent.com/u/10127707?v=4?s=100" width="100px;" alt="Mitchel van Bever"/><br /><sub><b>Mitchel van Bever</b></sub></a><br /><a href="#ideas-mitchelvanbever" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="12.5%"><a href="https://github.com/vctqs1"><img src="https://avatars.githubusercontent.com/u/30227910?v=4?s=100" width="100px;" alt="vctqs1"/><br /><sub><b>vctqs1</b></sub></a><br /><a href="https://github.com/OpenSourceRaidGuild/babel-vite/commits?author=vctqs1" title="Code">💻</a></td>
      <td align="center" valign="top" width="12.5%"><a href="https://github.com/DesselBane"><img src="https://avatars.githubusercontent.com/u/12199480?v=4?s=100" width="100px;" alt="DesselBane"/><br /><sub><b>DesselBane</b></sub></a><br /><a href="https://github.com/OpenSourceRaidGuild/babel-vite/commits?author=DesselBane" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## Issues

_Looking to contribute? Look for the
[Good First Issue](https://github.com/OpenSourceRaidGuild/babel-vite/issues?utf8=✓&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A"good+first+issue"+)
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/OpenSourceRaidGuild/babel-vite/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Acreated-desc)

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding a 👍. This helps
maintainers prioritize what to work on.

[**See Feature Requests**](https://github.com/OpenSourceRaidGuild/babel-vite/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+label%3Aenhancement+is%3Aopen)

### ❓ Questions

For questions related to using the library, you can
[raise issue here](https://github.com/OpenSourceRaidGuild/babel-vite/issues/new), or visit a support
community:

- [Discord](https://discord.gg/grS89HWeYh)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/babeljs+or+vitejs+or+babel-vite)

## LICENSE

MIT
