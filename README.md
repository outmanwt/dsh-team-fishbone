# DSH Team Fishbone · 团队鱼骨图

[![Check plugin](https://github.com/outmanwt/dsh-team-fishbone/actions/workflows/ci.yml/badge.svg)](https://github.com/outmanwt/dsh-team-fishbone/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A session-header panel for DeepSeek Harness (DSH): visualize sub-agents as an interactive fishbone diagram, inspect assignments and live state, then open the child session for its full execution trace.

DSH 会话标题栏的团队看板：用鱼骨图展示主 Agent 与子 Agent 的分配关系、任务描述、运行状态和可用的用时/Token 指标，点击节点查看详情并进入子会话。

## Features / 功能

- Direct sub-agent fishbone nodes plus nested child navigation when their catalog projections are loaded.
- 运行中使用主题品牌色与动态连接线；已完成使用成功色；已结束使用警告色；空闲和失败分别使用中性及错误色。
- Assignments come from sub-agent catalog labels and teammate descriptions; shared task-board entries are optional, not required for nodes to appear.
- 子节点详情含快捷切换、任务说明、可用的轮次/步骤/Token/用时指标；过程摘要仅在宿主下发对应投影时展示。
- One click opens the native sub-agent session; the plugin does not create agents or change shared tasks.
- 中英双语，跟随宿主主题，无第三方运行时依赖，无安装脚本。

## Install / 安装

In DSH, ask your agent / 在 DSH 中对 AI 说：

> 安装插件 https://github.com/outmanwt/dsh-team-fishbone/releases/latest/download/dsh-team-fishbone.tgz

Or use the plugin-manager tool with these arguments / 也可调用插件管理工具，参数：

```json
{
  "action": "install_bundle",
  "target": "https://github.com/outmanwt/dsh-team-fishbone/releases/latest/download/dsh-team-fishbone.tgz"
}
```

For CLI-managed profiles / 对于自行管理的 CLI profile：

```sh
dsh plugin --profile YOUR_PROFILE add https://github.com/outmanwt/dsh-team-fishbone/releases/latest/download/dsh-team-fishbone.tgz
```

Desktop users should install through their running app's plugin manager, not an unrelated `web` profile. Follow the installation result for refresh/restart instructions.

桌面版请通过正在使用的应用安装到当前 profile；不要另建 `web` profile。安装后按宿主提示刷新或重启，再点击会话标题旁的「团队鱼骨」。

### Local development / 本地开发

```sh
git clone https://github.com/outmanwt/dsh-team-fishbone.git
cd dsh-team-fishbone
npm test
npm pack --dry-run --ignore-scripts
```

Install the absolute directory through `plugin_manager` with `action: install_bundle`. There is no build step: the checked-in client file is the browser artifact.

## Compatibility / 兼容说明

Developed and manually tried on DSH 0.2.1-rc.3. Uses the native conversation header slot, sub-agent catalog, session-status hooks, and optional experimental Agent Teams projections. Older versions are not verified; experimental projection contracts may change. Missing summary data is displayed as unavailable rather than invented.

已在 DSH 0.2.1-rc.3 环境中开发并人工试用。依赖原生会话标题栏 slot、子代理目录及状态 hooks；Agent Teams 共享任务板是可选数据源。其他版本尚未完成兼容测试。

## Privacy / 数据

The plugin reads projections already available to the local DSH client and requests native child-session projection refreshes. It adds no external network endpoint, analytics, or credential storage. It does not bundle session transcripts, personal paths, or tokens.

## Releases / 持续发布

See [RELEASING.md](RELEASING.md). Tags matching the package version trigger GitHub Actions to check the bundle and attach a fixed-name `dsh-team-fishbone.tgz` plus SHA-256 checksums to a GitHub Release. The package is distributed through GitHub; it is **not published to npm**.

The `@local/dsh-team-fishbone` name is retained to preserve existing installations. It is a package identifier, not a claim of npm availability.

## Community market / 市场收录

The market application reads the [Awesome DSH Plugin catalog](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin). Listing requires a separate catalog PR and maintainer acceptance; a public repository alone does not make the plugin searchable there. See [marketplace/outmanwt__dsh-team-fishbone.yml](marketplace/outmanwt__dsh-team-fishbone.yml) for the proposed entry.

## Credits / 致谢

Uses the DSH/Cordis extension APIs. Some projection-reading and native-session-navigation patterns were adapted from the MIT-licensed DeepSeek Harness built-in Agent Teams and sub-agent UI packages. See [NOTICE](NOTICE).

## License

[MIT](LICENSE) © 2026 outmanwt.
