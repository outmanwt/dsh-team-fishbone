# Publishing plugins as outmanwt

## This plugin

1. Edit and manually test in DSH. Never include session logs, credentials or local profile files.
2. Run `npm test` and `npm pack --dry-run --ignore-scripts`.
3. Update `package.json` version and commit your reviewed changes.
4. Push `main`, then tag that exact revision, e.g. `git tag v0.2.1` and `git push origin v0.2.1`.
5. Check `gh run list` and `gh release view v0.2.1`. The release action generates the stable-name asset `dsh-team-fishbone.tgz` and `SHA256SUMS.txt`.
6. Test the release archive separately before recommending it. Do not silently replace your current local installation.

## Future plugins

Use one public repository per independently installable plugin, topic `dsh-plugin`, bilingual accurate metadata, a real `dsh.bundle.patch`, README, license, and a no-build release archive. Keep package name, client module id and patch name aligned. Use a unique name per plugin.

Git is configured globally with the GitHub noreply identity for outmanwt; GitHub CLI uses the existing keyring login. Do not copy tokens into files or Actions secrets. The release workflow uses the repository-scoped `github.token` only.

## Market submission

The target is `awesome-dsh-plugin/awesome-dsh-plugin`, not `dsh-market/dsh-market`. Submit only `data/plugins/outmanwt__dsh-team-fishbone.yml`, using the entry under `marketplace/` here. Never hand-edit the catalog's generated READMEs.

The catalog requires the public repository to be at least 24 hours old. After that, fork the catalog, add the single YAML file on a new branch, push it and open a PR. Maintainers review functionality and accuracy; merging and catalog refresh are external steps, not guaranteed publication.

GitHub topics improve GitHub discovery but do not replace catalog review. npm is optional. A later npm publication needs a publicly owned package name plus coordinated runtime-id/patch changes; this repository currently keeps its installed `@local` identifier and ships through GitHub Releases.
