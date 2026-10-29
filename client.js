window.__ModuleLoader__.load({
	id: '@local/dsh-team-fishbone',
	factory(require) {
		const React = require('react');
		const reactDom = require('react-dom');
		const h = React.createElement;
		const useEffect = React.useEffect;
		const useRef = React.useRef;
		const useState = React.useState;

		const NS = 'team-fishbone';

		/* ------------------------------------------------------------------ *
		 * Copy                                                               *
		 * ------------------------------------------------------------------ */

		const zh = {
			trigger: '团队鱼骨',
			title: '团队鱼骨图',
			subtitle: '主 Agent 与子 Agent 的分工、实时状态与产出结果',
			lead: '主 Agent',
			agent: '子 Agent',
			pool: '未分配任务',
			back: '返回鱼骨图',
			close: '关闭',
			model: '模型',
			owner: '负责人',
			unowned: '未分配',
			blockedBy: '依赖',
			writeScopes: '写入范围',
			noAgents: '还没有子 Agent',
			noAgentsHint: '主 Agent 派活之后，每个子 Agent 会在这里长出一根鱼骨。',
			noCatalog: '子 Agent 记录尚未就绪',
			noTasks: '暂无共享任务板条目',
			emptyAssignment: '未记录任务描述',
			teamSummary: '共 {agents} 个子 Agent',
			taskSummary: '共享任务 {done}/{total}',
			doneOf: '{done}/{total}',
			openSession: '打开子会话 · 查看完整过程',
			processHint: '点击按钮可跳转到该子 Agent 的独立会话，查看每一步思考、工具调用与文件修改。',
			hint: '点击任意节点卡片查看分工详情、产出摘要与执行过程',
			legendRunning: '运行中',
			legendCompleted: '已完成',
			legendEnded: '已结束',
			legendIdle: '未运行',
			legendFailed: '失败',
			resultsSection: '共享任务板',
			childrenSection: '下一级子 Agent',
			detailTask: '派发任务与职责',
			latestStep: '过程与产出摘要',
			stepInput: '接收指令',
			stepResult: '最新产出',
			metricDuration: '执行耗时',
			metricTokens: 'Token 消耗',
			metricSteps: '执行步数',
			metricMode: '会话模式',
			stepsValue: '{turns} 轮 · {steps} 步',
			loading: '正在同步团队状态…',
			failure: '记录异常：{message}',
			catalogError: '子 Agent 目录读取失败',
			'status.pending': '待处理',
			'status.in_progress': '进行中',
			'status.completed': '已完成',
			'agentStatus.running': '运行中',
			'agentStatus.completed': '已完成',
			'agentStatus.ended': '已结束',
			'agentStatus.idle': '未运行',
			'agentStatus.provisioning': '准备中',
			'agentStatus.failed': '失败',
			'mode.one-shot': '一次性',
			'mode.continuable': '可续聊',
			'mode.external': '外部',
			'mode.unknown': '默认',
		};

		const en = {
			trigger: 'Team fishbone',
			title: 'Team Fishbone',
			subtitle: 'Lead and sub-agents: assignments, live status, and deliverables',
			lead: 'Lead Agent',
			agent: 'Sub-agent',
			pool: 'Unclaimed tasks',
			back: 'Back to fishbone',
			close: 'Close',
			model: 'Model',
			owner: 'Owner',
			unowned: 'Unowned',
			blockedBy: 'Blocked by',
			writeScopes: 'Write scopes',
			noAgents: 'No sub-agents yet',
			noAgentsHint: 'Once the lead delegates work, each sub-agent grows a bone on this spine.',
			noCatalog: 'Sub-agent catalog is not ready',
			noTasks: 'No shared task-board items',
			emptyAssignment: 'No recorded assignment',
			teamSummary: '{agents} sub-agents',
			taskSummary: 'Shared tasks {done}/{total}',
			doneOf: '{done}/{total}',
			openSession: 'Open sub-agent session · Full trace',
			processHint: 'Jump to this sub-agent’s session to inspect every reasoning step and tool call.',
			hint: 'Click any node card to inspect assignments, output summary, and trace',
			legendRunning: 'Running',
			legendCompleted: 'Completed',
			legendEnded: 'Ended',
			legendIdle: 'Idle',
			legendFailed: 'Failed',
			resultsSection: 'Shared Task Board',
			childrenSection: 'Nested Sub-agents',
			detailTask: 'Assigned Responsibility',
			latestStep: 'Process & Output Summary',
			stepInput: 'Prompt',
			stepResult: 'Latest Output',
			metricDuration: 'Duration',
			metricTokens: 'Tokens',
			metricSteps: 'Steps',
			metricMode: 'Mode',
			stepsValue: '{turns} turns · {steps} steps',
			loading: 'Syncing team status…',
			failure: 'Record issue: {message}',
			catalogError: 'Could not read the sub-agent catalog',
			'status.pending': 'Pending',
			'status.in_progress': 'In progress',
			'status.completed': 'Completed',
			'agentStatus.running': 'Running',
			'agentStatus.completed': 'Completed',
			'agentStatus.ended': 'Ended',
			'agentStatus.idle': 'Idle',
			'agentStatus.provisioning': 'Provisioning',
			'agentStatus.failed': 'Failed',
			'mode.one-shot': 'One-shot',
			'mode.continuable': 'Continuable',
			'mode.external': 'External',
			'mode.unknown': 'Standard',
		};

		/* ------------------------------------------------------------------ *
		 * Style                                                              *
		 * ------------------------------------------------------------------ */

		const CSS = `
@keyframes tfb-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--dsw-alias-brand-primary) 0%, transparent); }
  100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 0%, transparent); }
}
@keyframes tfb-dash {
  to { stroke-dashoffset: -20; }
}
@keyframes tfb-pop {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

.tfb-root { display: inline-flex; }
.tfb-trigger {
  display: inline-flex; align-items: center; gap: 6px; min-height: 28px;
  padding: 3px 9px; border: 1px solid transparent; border-radius: 7px; background: transparent;
  color: var(--dsw-alias-label-secondary); font: inherit; font-size: 12px; font-weight: 500;
  cursor: pointer; transition: all 140ms ease;
}
.tfb-trigger:hover, .tfb-trigger:focus-visible, .tfb-trigger[aria-expanded="true"] {
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-2);
  border-color: var(--dsw-alias-border-l1);
}
.tfb-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 16px; height: 16px; padding: 0 5px; border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, var(--dsw-alias-bg-layer-2));
  color: var(--dsw-alias-brand-primary); font-size: 11px; font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.tfb-backdrop {
  position: fixed; inset: 0; z-index: 120;
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(3px);
}
.tfb-panel {
  position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 121;
  display: flex; flex-direction: column; box-sizing: border-box;
  width: min(1060px, calc(100vw - 48px)); max-height: min(800px, calc(100vh - 48px));
  background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary);
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 16px; overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.28);
  font-size: 13px; line-height: 18px;
  animation: tfb-pop 160ms cubic-bezier(0.16, 1, 0.3, 1);
}
.tfb-panel:focus { outline: none; }

.tfb-header {
  display: flex; align-items: center; gap: 12px; padding: 14px 18px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1);
}
.tfb-headerIcon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 10px; flex: none;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, var(--dsw-alias-bg-layer-2));
  color: var(--dsw-alias-brand-primary);
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 28%, transparent);
}
.tfb-heading { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.tfb-title { font-size: 15px; font-weight: 600; line-height: 20px; letter-spacing: -0.01em; }
.tfb-subtitle { font-size: 12px; color: var(--dsw-alias-label-secondary); }
.tfb-spacer { flex: 1 1 auto; }

.tfb-kpis { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.tfb-kpi {
  display: inline-flex; align-items: center; gap: 6px; height: 24px; padding: 0 9px;
  border-radius: 999px; font-size: 11px; font-weight: 500;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary);
  border: 1px solid var(--dsw-alias-border-l1); font-variant-numeric: tabular-nums;
}
.tfb-kpi[data-tone="running"] {
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, var(--dsw-alias-bg-layer-2));
  color: var(--dsw-alias-brand-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, transparent);
}
.tfb-kpi[data-tone="completed"] {
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 14%, var(--dsw-alias-bg-layer-2));
  color: var(--dsw-alias-state-success-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 35%, transparent);
}
.tfb-kpi[data-tone="ended"] {
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, var(--dsw-alias-bg-layer-2));
  color: var(--dsw-alias-state-warn-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 35%, transparent);
}

.tfb-iconbtn {
  display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px;
  padding: 0; border: 1px solid transparent; border-radius: 8px; background: transparent;
  color: var(--dsw-alias-label-secondary); cursor: pointer; transition: all 120ms ease;
}
.tfb-iconbtn:hover, .tfb-iconbtn:focus-visible {
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-2);
  border-color: var(--dsw-alias-border-l1);
}

.tfb-body { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 16px 18px 18px; }

.tfb-stage {
  overflow: auto; padding: 14px 16px; border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 14px;
  background-color: var(--dsw-alias-bg-layer-1);
  background-image: radial-gradient(color-mix(in srgb, var(--dsw-alias-border-l2) 65%, transparent) 1px, transparent 1px);
  background-size: 18px 18px;
}
.tfb-canvas { position: relative; margin: 0 auto; }
.tfb-rib-running { stroke-dasharray: 6 4; animation: tfb-dash 0.9s linear infinite; }

.tfb-card {
  position: absolute; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;
  padding: 10px 12px 9px 14px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 12px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary);
  font: inherit; text-align: left; cursor: pointer; overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
}
.tfb-card::before {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
  background: var(--dsw-alias-state-idle-primary);
}
.tfb-card[data-status="running"] {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, var(--dsw-alias-border-l2));
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 5%, var(--dsw-alias-bg-layer-2));
}
.tfb-card[data-status="running"]::before { background: var(--dsw-alias-brand-primary); }
.tfb-card[data-status="completed"] {
  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 45%, var(--dsw-alias-border-l2));
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 4%, var(--dsw-alias-bg-layer-2));
}
.tfb-card[data-status="completed"]::before { background: var(--dsw-alias-state-success-primary); }
.tfb-card[data-status="ended"] {
  border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, var(--dsw-alias-border-l2));
}
.tfb-card[data-status="ended"]::before { background: var(--dsw-alias-state-warn-primary); }
.tfb-card[data-status="provisioning"]::before { background: var(--dsw-alias-state-warn-primary); }
.tfb-card[data-status="failed"] {
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 55%, var(--dsw-alias-border-l2));
}
.tfb-card[data-status="failed"]::before { background: var(--dsw-alias-state-error-primary); }

.tfb-card:hover, .tfb-card:focus-visible {
  transform: translateY(-2px);
  border-color: var(--dsw-alias-brand-primary);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.15);
  outline: none;
}

.tfb-cardHead {
  border-width: 1.5px;
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, var(--dsw-alias-bg-layer-1));
}
.tfb-cardHead::before { width: 5px; background: var(--dsw-alias-brand-primary); }

.tfb-nameRow { display: flex; align-items: center; justify-content: space-between; gap: 6px; min-width: 0; }
.tfb-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.tfb-badge {
  flex: none; display: inline-flex; align-items: center; gap: 5px;
  padding: 1px 7px; border-radius: 999px; font-size: 10px; font-weight: 600; line-height: 16px;
  background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-secondary);
  border: 1px solid var(--dsw-alias-border-l1);
}
.tfb-badge[data-status="running"] {
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, var(--dsw-alias-bg-base));
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, transparent);
}
.tfb-badge[data-status="completed"] {
  color: var(--dsw-alias-state-success-primary);
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 14%, var(--dsw-alias-bg-base));
  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 35%, transparent);
}
.tfb-badge[data-status="ended"], .tfb-badge[data-status="provisioning"] {
  color: var(--dsw-alias-state-warn-primary);
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, var(--dsw-alias-bg-base));
  border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 35%, transparent);
}
.tfb-badge[data-status="failed"] {
  color: var(--dsw-alias-state-error-primary);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, var(--dsw-alias-bg-base));
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 35%, transparent);
}

.tfb-descClamp {
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; font-size: 11px; line-height: 15px;
  color: var(--dsw-alias-label-secondary); margin: 2px 0;
}

.tfb-cardFoot {
  display: flex; align-items: center; justify-content: space-between; gap: 6px;
  padding-top: 4px; border-top: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 70%, transparent);
  font-size: 10.5px; color: var(--dsw-alias-label-secondary); min-width: 0;
}
.tfb-tag {
  flex: none; padding: 0 5px; border-radius: 4px; font-size: 10px; line-height: 15px;
  color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-base);
  border: 1px solid var(--dsw-alias-border-l1);
}
.tfb-line { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--dsw-alias-label-secondary); min-width: 0; }
.tfb-ellipsis { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }

.tfb-dot { flex: none; width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
.tfb-dot-running { animation: tfb-pulse 1.6s infinite; }

.tfb-bar { height: 5px; border-radius: 999px; background: var(--dsw-alias-border-l1); overflow: hidden; }
.tfb-barFill { height: 100%; border-radius: 999px; background: var(--dsw-alias-state-success-primary); transition: width 200ms ease; }

.tfb-legend {
  display: flex; flex-wrap: wrap; align-items: center; gap: 16px;
  margin-top: 12px; padding: 0 4px; font-size: 11.5px; color: var(--dsw-alias-label-secondary);
}
.tfb-legendItem { display: inline-flex; align-items: center; gap: 6px; }
.tfb-notice {
  display: flex; flex-direction: column; gap: 4px; padding: 18px;
  border: 1px dashed var(--dsw-alias-border-l2); border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary);
}
.tfb-notice strong { color: var(--dsw-alias-label-primary); font-size: 13px; }
.tfb-error { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; color: var(--dsw-alias-state-error-primary); font-size: 12px; }

/* Detail view */
.tfb-switcher {
  display: flex; align-items: center; gap: 6px; overflow-x: auto;
  padding-bottom: 12px; margin-bottom: 14px; border-bottom: 1px solid var(--dsw-alias-border-l1);
}
.tfb-switchPill {
  display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 11px;
  border-radius: 8px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 12px; font-weight: 500; cursor: pointer; flex: none;
  transition: all 120ms ease;
}
.tfb-switchPill:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l2); }
.tfb-switchPill[data-active="true"] {
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-2);
  border-color: var(--dsw-alias-brand-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tfb-detailHero {
  display: flex; flex-direction: column; gap: 12px; padding: 14px 16px;
  border-radius: 12px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1); margin-bottom: 14px;
}
.tfb-detailHead { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.tfb-detailName { font-size: 16px; font-weight: 600; }
.tfb-chip {
  display: inline-flex; align-items: center; gap: 5px; padding: 2px 8px; border-radius: 999px;
  background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1);
  font-size: 11px; color: var(--dsw-alias-label-secondary);
}

.tfb-metricGrid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;
}
.tfb-metricCard {
  display: flex; flex-direction: column; gap: 2px; padding: 9px 12px;
  border-radius: 10px; background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l1);
}
.tfb-metricLabel { font-size: 11px; color: var(--dsw-alias-label-secondary); }
.tfb-metricValue { font-size: 13px; font-weight: 600; color: var(--dsw-alias-label-primary); font-variant-numeric: tabular-nums; }

.tfb-section {
  display: flex; flex-direction: column; gap: 8px; padding: 13px 15px;
  border-radius: 12px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1); margin-bottom: 12px;
}
.tfb-sectionTitle { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: var(--dsw-alias-label-primary); }
.tfb-para {
  margin: 0; font-size: 12.5px; line-height: 19px; color: var(--dsw-alias-label-primary);
  white-space: pre-wrap; word-break: break-word;
}
.tfb-stepBox {
  display: flex; flex-direction: column; gap: 4px; padding: 10px 12px;
  border-radius: 9px; background: var(--dsw-alias-bg-layer-2);
  border-left: 3px solid var(--dsw-alias-brand-primary);
}
.tfb-stepBox[data-kind="result"] {
  border-left-color: var(--dsw-alias-state-success-primary);
}
.tfb-stepLabel { font-size: 11px; font-weight: 600; color: var(--dsw-alias-label-secondary); }

.tfb-tasks { display: flex; flex-direction: column; gap: 8px; }
.tfb-task { padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; background: var(--dsw-alias-bg-layer-2); }
.tfb-taskTop { display: flex; align-items: center; gap: 8px; min-width: 0; }
.tfb-taskSubject { font-size: 12.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tfb-taskState { margin-left: auto; flex: none; display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: var(--dsw-alias-label-secondary); }
.tfb-taskDesc { margin: 5px 0 0; font-size: 11.5px; line-height: 17px; color: var(--dsw-alias-label-secondary); white-space: pre-wrap; }
.tfb-taskMeta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 6px; font-size: 11px; color: var(--dsw-alias-label-secondary); }
.tfb-warn { color: var(--dsw-alias-state-warn-primary); }

.tfb-childRow {
  display: flex; align-items: center; gap: 8px; width: 100%; box-sizing: border-box;
  padding: 8px 11px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 9px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 12px; text-align: left; cursor: pointer; transition: border-color 120ms ease;
}
.tfb-childRow:hover, .tfb-childRow:focus-visible { border-color: var(--dsw-alias-brand-primary); outline: none; }

.tfb-footer {
  display: flex; align-items: center; gap: 12px; padding: 12px 18px;
  border-top: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1);
}
.tfb-primary {
  display: inline-flex; align-items: center; gap: 6px; box-sizing: border-box; height: 32px; padding: 0 14px;
  border: 0; border-radius: 8px; background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-bg-base); font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer;
  transition: filter 120ms ease, transform 120ms ease;
}
.tfb-primary:hover, .tfb-primary:focus-visible { filter: brightness(1.08); transform: translateY(-1px); outline: none; }
.tfb-ghost {
  display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 11px;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; font-weight: 500; cursor: pointer;
  transition: all 120ms ease;
}
.tfb-ghost:hover, .tfb-ghost:focus-visible { border-color: var(--dsw-alias-brand-primary); outline: none; }
.tfb-hint { font-size: 11.5px; color: var(--dsw-alias-label-secondary); margin-left: auto; }

@media (max-width: 720px) {
  .tfb-panel { width: calc(100vw - 20px); max-height: calc(100vh - 24px); }
  .tfb-trigger span:not(.tfb-count) { display: none; }
  .tfb-kpis { display: none; }
}
`;

		/* ------------------------------------------------------------------ *
		 * Geometry                                                           *
		 * ------------------------------------------------------------------ */

		const HEAD_W = 212;
		const HEAD_H = 112;
		const CARD_W = 216;
		const CARD_H = 110;
		const HEAD_GAP = 34;
		const FIRST_OFFSET = 54;
		const STEP = 242;
		const LANE = 50;
		const PAD = 24;
		const MIN_TAIL = 260;

		function computeLayout(ribCount) {
			const groups = Math.max(1, Math.ceil(ribCount / 2));
			const width = HEAD_W + HEAD_GAP + FIRST_OFFSET + (groups - 1) * STEP + CARD_W + PAD + 36;
			const height = (LANE + CARD_H) * 2 + 44;
			return { width: Math.max(width, HEAD_W + MIN_TAIL), height, centerY: height / 2 };
		}

		function ribPosition(index, layout) {
			const top = index % 2 === 0;
			const group = Math.floor(index / 2);
			const left = HEAD_W + HEAD_GAP + FIRST_OFFSET + group * STEP;
			return {
				left,
				top: top ? layout.centerY - LANE - CARD_H : layout.centerY + LANE,
				topSide: top,
				anchorX: left + CARD_W / 2,
			};
		}

		/* ------------------------------------------------------------------ *
		 * Formatting                                                         *
		 * ------------------------------------------------------------------ */

		function formatTokens(value) {
			if (typeof value !== 'number' || !isFinite(value)) return '';
			if (value < 1000) return String(Math.round(value));
			if (value < 1e6) return (Math.round((value / 1e3) * 10) / 10) + 'k';
			return (Math.round((value / 1e6) * 10) / 10) + 'M';
		}

		function tokenTotal(usage) {
			if (!usage) return undefined;
			const buckets = usage.totals && typeof usage.totals === 'object' ? usage.totals : usage;
			const sum = (buckets.uncachedInputTokens || 0) + (buckets.outputTokens || 0) + (buckets.cacheReadTokens || 0) + (buckets.cacheWriteTokens || 0);
			return sum > 0 ? sum : undefined;
		}

		function formatDuration(ms) {
			if (typeof ms !== 'number' || !isFinite(ms) || ms <= 0) return '';
			const totalSeconds = Math.floor(ms / 1000);
			const seconds = totalSeconds % 60;
			const minutes = Math.floor(totalSeconds / 60) % 60;
			const hours = Math.floor(totalSeconds / 3600);
			const pad = (n) => String(n).padStart(2, '0');
			if (hours > 0) return hours + 'h' + pad(minutes) + 'm';
			if (minutes > 0) return minutes + 'm' + pad(seconds) + 's';
			return seconds + 's';
		}

		function activityDuration(summary, running, now) {
			if (!summary || !summary.projectionValues) return undefined;
			const timing = summary.projectionValues.subagentTiming;
			if (!timing) return undefined;
			const settled = typeof timing.settledMs === 'number' ? timing.settledMs : 0;
			if (!timing.active) return settled || undefined;
			const end = running ? now : (typeof timing.active.through === 'number' ? timing.active.through : now);
			const live = Math.max(0, end - timing.active.since);
			return (settled + live) || undefined;
		}

		/* ------------------------------------------------------------------ *
		 * Status colors (Distinct Running vs Completed vs Ended)             *
		 * ------------------------------------------------------------------ */

		const AGENT_COLOR = {
			running: 'var(--dsw-alias-brand-primary)',
			completed: 'var(--dsw-alias-state-success-primary)',
			ended: 'var(--dsw-alias-state-warn-primary)',
			idle: 'var(--dsw-alias-state-idle-primary)',
			provisioning: 'var(--dsw-alias-state-warn-primary)',
			failed: 'var(--dsw-alias-state-error-primary)',
		};

		const TASK_COLOR = {
			pending: 'var(--dsw-alias-state-idle-primary)',
			in_progress: 'var(--dsw-alias-brand-primary)',
			completed: 'var(--dsw-alias-state-success-primary)',
		};

		/* ------------------------------------------------------------------ *
		 * Derived data                                                       *
		 * ------------------------------------------------------------------ */

		function tasksOf(name, tasks) {
			if (!name) return [];
			return tasks.filter((task) => task && task.ownerName === name);
		}

		function progressOf(list) {
			let total = 0;
			let done = 0;
			let active = null;
			for (const task of list) {
				total += 1;
				if (task.status === 'completed') done += 1;
				else if (task.status === 'in_progress' && active === null) active = task;
			}
			return { total, done, active };
		}

		function taskTitle(task) {
			return task.subject || task.title || task.id || '';
		}

		function buildAgentRow(entry, parentSessionId, summaries, statuses, team, now, projections) {
			const id = entry && (entry.id || entry.childId);
			if (!id) return null;
			const summary = summaries ? summaries[id] : undefined;
			const live = statuses && typeof statuses.get === 'function' ? statuses.get(id) : undefined;
			const running = (live && live.running === true) || (summary && summary.running === true);
			const timing = summary && summary.projectionValues ? summary.projectionValues.subagentTiming : undefined;
			const closed = !!(timing && timing.active && typeof timing.active.through === 'number');
			const completed = !running && !!(timing && timing.lastTurnCompleted === true);
			const ended = !running && !completed && closed;
			const member = team && Array.isArray(team.members) ? team.members.find((item) => item && item.id === id) : undefined;
			let status = running ? 'running' : completed ? 'completed' : ended ? 'ended' : 'idle';
			if (member) {
				if (member.phase === 'provisioning') status = 'provisioning';
				else if (member.phase === 'failed') status = 'failed';
				else if (member.phase === 'active' && running) status = 'running';
			}
			const projection = projections ? projections[id] : undefined;
			const projValues = projection && projection.values ? projection.values : undefined;
			const label = (member && member.name) || (summary && summary.title) || String(id).slice(0, 8);
			const assignment = (member && member.description) || (entry && entry.label) || (summary && summary.title) || '';
			return {
				key: 'agent:' + id,
				kind: 'agent',
				id,
				parentSessionId,
				label,
				title: assignment,
				memberName: member ? member.name : '',
				shortId: String(id).slice(0, 8),
				mode: entry && entry.mode ? entry.mode : 'unknown',
				external: !!entry && entry.mode === 'external',
				status,
				running: !!running,
				completed,
				ended,
				tokens: tokenTotal(
					(summary && summary.projectionValues ? summary.projectionValues.tokenUsage : undefined)
					|| (projValues ? projValues.tokenUsage : undefined),
				),
				durationMs: activityDuration(summary, running, now),
				error: member && member.error ? member.error : '',
				tasks: member ? tasksOf(member.name, team.tasks || []) : [],
				children: [],
				outline: projValues ? projValues.turnOutline : undefined,
				stats: projValues ? projValues.sessionStats : undefined,
			};
		}

		/* ------------------------------------------------------------------ *
		 * Small pieces                                                       *
		 * ------------------------------------------------------------------ */

		function Dot({ color, pulse }) {
			return h('span', {
				className: pulse ? 'tfb-dot tfb-dot-running' : 'tfb-dot',
				style: { background: color },
			});
		}

		function StatusBadge({ status, t }) {
			const color = AGENT_COLOR[status] || AGENT_COLOR.idle;
			const pulse = status === 'running' || status === 'provisioning';
			return h('span', { className: 'tfb-badge', 'data-status': status },
				h(Dot, { color, pulse }),
				t('agentStatus.' + status));
		}

		function Bar({ done, total }) {
			const pct = total > 0 ? Math.max(0, Math.min(100, Math.round((done / total) * 100))) : 0;
			return h('div', { className: 'tfb-bar', role: 'presentation' },
				h('div', { className: 'tfb-barFill', style: { width: pct + '%' } }));
		}

		function Legend({ t }) {
			const items = [
				[t('legendRunning'), AGENT_COLOR.running, true],
				[t('legendCompleted'), AGENT_COLOR.completed, false],
				[t('legendEnded'), AGENT_COLOR.ended, false],
				[t('legendIdle'), AGENT_COLOR.idle, false],
				[t('legendFailed'), AGENT_COLOR.failed, false],
			];
			return h('div', { className: 'tfb-legend' },
				items.map(([label, color, pulse]) => h('span', { className: 'tfb-legendItem', key: label },
					h(Dot, { color, pulse }), label)),
				h('span', { className: 'tfb-hint' }, t('hint')));
		}

		function metricsText(row) {
			const parts = [];
			if (row.tokens) parts.push(formatTokens(row.tokens) + ' tok');
			const duration = formatDuration(row.durationMs);
			if (duration) parts.push(duration);
			return parts.join(' · ');
		}

		/* ------------------------------------------------------------------ *
		 * Diagram                                                            *
		 * ------------------------------------------------------------------ */

		function RibCard({ rib, position, t, onOpen }) {
			const tasks = rib.tasks || [];
			const { total, done, active } = progressOf(tasks);
			const assignment = rib.title || (active ? taskTitle(active) : '') || (tasks.length > 0 ? taskTitle(tasks.find((task) => task.status === 'pending') || tasks[0]) : '');
			const metrics = metricsText(rib);
			return h('button', {
				type: 'button',
				className: 'tfb-card',
				'data-status': rib.status,
				style: { left: position.left, top: position.top, width: CARD_W, height: CARD_H },
				onClick: () => onOpen(rib.key),
				title: rib.label + (assignment ? '\n' + assignment : ''),
			},
				h('div', { className: 'tfb-nameRow' },
					h('span', { className: 'tfb-name' }, rib.label),
					rib.kind === 'pool'
						? h('span', { className: 'tfb-badge' }, t('unowned'))
						: h(StatusBadge, { status: rib.status, t })),
				h('div', { className: 'tfb-descClamp' }, assignment || t('emptyAssignment')),
				h('div', { className: 'tfb-cardFoot' },
					rib.kind !== 'pool' && rib.mode !== 'unknown' && rib.mode !== 'external'
						? h('span', { className: 'tfb-tag' }, t('mode.' + rib.mode))
						: h('span', { className: 'tfb-tag' }, rib.shortId || t('agent')),
					total > 0
						? h('span', { className: 'tfb-ellipsis' }, done + '/' + total + ' (' + Math.round((done / total) * 100) + '%)')
						: h('span', { className: 'tfb-ellipsis' }, metrics || t('agentStatus.' + rib.status))));
		}

		function HeadCard({ leadLabel, status, agents, tasks, position, t, onOpen }) {
			const { total, done } = progressOf(tasks);
			const completedStyle = status === 'running' ? 'running' : 'completed';
			return h('button', {
				type: 'button',
				className: 'tfb-card tfb-cardHead',
				'data-status': completedStyle,
				style: { left: 0, top: position, width: HEAD_W, height: HEAD_H },
				onClick: () => onOpen('lead'),
				title: leadLabel,
			},
				h('div', { className: 'tfb-nameRow' },
					h('span', { className: 'tfb-name' }, leadLabel),
					h('span', { className: 'tfb-badge', 'data-status': completedStyle },
						h(Dot, { color: AGENT_COLOR[completedStyle], pulse: status === 'running' }),
						t('lead'))),
				h('div', { className: 'tfb-descClamp' },
					t('teamSummary', { agents }) + (total > 0 ? ' · ' + t('taskSummary', { done, total }) : '')),
				total > 0
					? h(Bar, { done, total })
					: h('div', { className: 'tfb-cardFoot' },
						h('span', { className: 'tfb-ellipsis' }, t('agentStatus.' + status)),
						h('span', { className: 'tfb-tag' }, agents + ' ' + t('agent'))));
		}

		function Diagram({ leadLabel, leadStatus, agents, tasks, ribs, layout, t, onOpen }) {
			const { width, height, centerY } = layout;
			const spineStart = HEAD_W;
			const spineEnd = width - PAD;
			const parts = [];

			// Spine glow & main track
			parts.push(h('line', {
				key: 'spine-glow', x1: spineStart, y1: centerY, x2: spineEnd - 18, y2: centerY,
				stroke: 'var(--dsw-alias-border-l1)', strokeWidth: 6, strokeLinecap: 'round',
			}));
			parts.push(h('line', {
				key: 'spine', x1: spineStart, y1: centerY, x2: spineEnd - 18, y2: centerY,
				stroke: 'var(--dsw-alias-brand-primary)', strokeWidth: 2.2, strokeLinecap: 'round', opacity: 0.75,
			}));

			// Fish tail fin
			parts.push(h('path', {
				key: 'tail',
				d: `M${spineEnd - 22} ${centerY} L${spineEnd - 4} ${centerY - 11} L${spineEnd - 9} ${centerY} L${spineEnd - 4} ${centerY + 11} Z`,
				fill: 'var(--dsw-alias-brand-primary)',
				opacity: 0.75,
			}));

			ribs.forEach((rib, index) => {
				const p = ribPosition(index, layout);
				const nearY = p.topSide ? centerY - LANE : centerY + LANE;
				const color = AGENT_COLOR[rib.status] || 'var(--dsw-alias-border-l2)';
				const spineJointX = p.anchorX + 26;
				const cardJointX = p.anchorX - 18;

				// Base rib bone
				parts.push(h('line', {
					key: 'rib-base-' + index,
					x1: spineJointX, y1: centerY, x2: cardJointX, y2: nearY,
					stroke: color, strokeWidth: 2, strokeLinecap: 'round', opacity: rib.status === 'idle' ? 0.45 : 0.85,
				}));

				// Flowing animated dash for running sub-agents
				if (rib.status === 'running') {
					parts.push(h('line', {
						key: 'rib-flow-' + index,
						className: 'tfb-rib-running',
						x1: spineJointX, y1: centerY, x2: cardJointX, y2: nearY,
						stroke: 'var(--dsw-alias-bg-base)', strokeWidth: 1.6, strokeLinecap: 'round',
					}));
				}

				// Spine joint ring + center dot
				parts.push(h('circle', {
					key: 'joint-ring-' + index, cx: spineJointX, cy: centerY, r: 4.5,
					fill: 'var(--dsw-alias-bg-layer-1)', stroke: color, strokeWidth: 1.8,
				}));
				parts.push(h('circle', {
					key: 'joint-dot-' + index, cx: cardJointX, cy: nearY, r: 2.6,
					fill: color,
				}));
			});

			return h('div', { className: 'tfb-canvas', style: { width, height } },
				h('svg', {
					width, height, viewBox: `0 0 ${width} ${height}`,
					style: { position: 'absolute', left: 0, top: 0, pointerEvents: 'none' },
					'aria-hidden': true,
				}, parts),
				h(HeadCard, { leadLabel, status: leadStatus, agents, tasks, position: centerY - HEAD_H / 2, t, onOpen }),
				ribs.map((rib, index) => h(RibCard, {
					key: rib.key, rib, position: ribPosition(index, layout), t, onOpen,
				})));
		}

		/* ------------------------------------------------------------------ *
		 * Detail                                                             *
		 * ------------------------------------------------------------------ */

		function TaskItem({ task, t }) {
			const status = task.status || 'pending';
			const blockedBy = Array.isArray(task.blockedBy) ? task.blockedBy : [];
			const writeScopes = Array.isArray(task.writeScopes) ? task.writeScopes : [];
			const warnings = Array.isArray(task.writeScopeWarnings) ? task.writeScopeWarnings : [];
			return h('article', { className: 'tfb-task' },
				h('div', { className: 'tfb-taskTop' },
					h('span', { className: 'tfb-taskSubject' }, taskTitle(task)),
					h('span', { className: 'tfb-taskState' },
						h(Dot, { color: TASK_COLOR[status] || TASK_COLOR.pending, pulse: status === 'in_progress' }),
						t('status.' + status))),
				task.description ? h('p', { className: 'tfb-taskDesc' }, task.description) : null,
				h('div', { className: 'tfb-taskMeta' },
					task.id ? h('span', null, task.id) : null,
					h('span', null, t('owner') + ': ' + (task.ownerName || t('unowned'))),
					blockedBy.length > 0 ? h('span', null, t('blockedBy') + ': ' + blockedBy.join(', ')) : null,
					writeScopes.length > 0 ? h('span', null, t('writeScopes') + ': ' + writeScopes.join(', ')) : null,
					warnings.map((warning) => h('span', { className: 'tfb-warn', key: warning }, warning))));
		}

		function ChildRow({ row, t, onOpen }) {
			return h('button', { type: 'button', className: 'tfb-childRow', onClick: () => onOpen(row.key) },
				h(StatusBadge, { status: row.status, t }),
				h('span', { className: 'tfb-ellipsis', style: { flex: '1 1 auto', fontWeight: 500 } }, row.label),
				row.title ? h('span', { className: 'tfb-ellipsis', style: { maxWidth: '45%', color: 'var(--dsw-alias-label-secondary)' } }, row.title) : null,
				row.tokens ? h('span', { className: 'tfb-tag' }, formatTokens(row.tokens) + ' tok') : null);
		}

		function Detail({ selection, selectedKey, agents, leadLabel, t, onSelectKey }) {
			const tasks = selection.tasks || [];
			const { total, done } = progressOf(tasks);
			const turns = selection.outline && Array.isArray(selection.outline.turns) ? selection.outline.turns : [];
			const lastTurn = turns.length > 0 ? turns[turns.length - 1] : undefined;
			const shorten = (text, limit) => {
				if (typeof text !== 'string' || text === '') return '';
				const flat = text.replace(/\s+/g, ' ').trim();
				return flat.length > limit ? flat.slice(0, limit) + '…' : flat;
			};
			const latestStep = lastTurn
				? {
					prompt: shorten(lastTurn.prompt, 260),
					response: shorten(lastTurn.response, 900),
				}
				: undefined;

			const durationText = formatDuration(selection.durationMs) || '—';
			const tokenText = selection.tokens ? formatTokens(selection.tokens) : '—';
			const stepsText = selection.stats && typeof selection.stats.steps === 'number'
				? t('stepsValue', { turns: selection.stats.turns || 1, steps: selection.stats.steps })
				: (turns.length > 0 ? turns.length + ' turns' : '—');

			return h('div', null,
				// Quick switcher bar
				agents.length > 0 ? h('div', { className: 'tfb-switcher' },
					h('button', {
						type: 'button',
						className: 'tfb-switchPill',
						'data-active': selectedKey === 'lead',
						onClick: () => onSelectKey('lead'),
					},
						h(Dot, { color: 'var(--dsw-alias-brand-primary)' }),
						leadLabel),
					agents.map((row) => h('button', {
						type: 'button',
						key: row.key,
						className: 'tfb-switchPill',
						'data-active': selectedKey === row.key,
						onClick: () => onSelectKey(row.key),
					},
						h(Dot, { color: AGENT_COLOR[row.status] || AGENT_COLOR.idle, pulse: row.status === 'running' }),
						row.label))) : null,

				// Hero card
				h('div', { className: 'tfb-detailHero' },
					h('div', { className: 'tfb-detailHead' },
						h('span', { className: 'tfb-detailName' }, selection.label),
						selection.kind === 'agent' ? h(StatusBadge, { status: selection.status, t }) : null,
						selection.kind === 'agent' ? h('span', { className: 'tfb-chip' }, t('mode.' + selection.mode)) : null,
						selection.shortId ? h('span', { className: 'tfb-chip' }, '#' + selection.shortId) : null),
					selection.kind === 'agent' ? h('div', { className: 'tfb-metricGrid' },
						h('div', { className: 'tfb-metricCard' },
							h('span', { className: 'tfb-metricLabel' }, t('metricDuration')),
							h('span', { className: 'tfb-metricValue' }, durationText)),
						h('div', { className: 'tfb-metricCard' },
							h('span', { className: 'tfb-metricLabel' }, t('metricTokens')),
							h('span', { className: 'tfb-metricValue' }, tokenText)),
						h('div', { className: 'tfb-metricCard' },
							h('span', { className: 'tfb-metricLabel' }, t('metricSteps')),
							h('span', { className: 'tfb-metricValue' }, stepsText)),
						h('div', { className: 'tfb-metricCard' },
							h('span', { className: 'tfb-metricLabel' }, t('metricMode')),
							h('span', { className: 'tfb-metricValue' }, t('mode.' + selection.mode)))) : null),

				// Assignment section
				selection.kind === 'agent' && selection.title
					? h('div', { className: 'tfb-section' },
						h('div', { className: 'tfb-sectionTitle' }, t('detailTask')),
						h('p', { className: 'tfb-para' }, selection.title))
					: null,

				// Latest step & output preview
				selection.kind === 'agent' && latestStep && (latestStep.prompt || latestStep.response)
					? h('div', { className: 'tfb-section' },
						h('div', { className: 'tfb-sectionTitle' }, t('latestStep')),
						latestStep.prompt
							? h('div', { className: 'tfb-stepBox', 'data-kind': 'prompt' },
								h('span', { className: 'tfb-stepLabel' }, t('stepInput')),
								h('p', { className: 'tfb-para' }, latestStep.prompt))
							: null,
						latestStep.response
							? h('div', { className: 'tfb-stepBox', 'data-kind': 'result' },
								h('span', { className: 'tfb-stepLabel' }, t('stepResult')),
								h('p', { className: 'tfb-para' }, latestStep.response))
							: null)
					: null,

				selection.kind === 'agent' && selection.error
					? h('div', { className: 'tfb-error', style: { marginTop: '8px' } },
						h(Dot, { color: AGENT_COLOR.failed }), selection.error)
					: null,

				// Nested children
				selection.children && selection.children.length > 0
					? h('div', { className: 'tfb-section' },
						h('div', { className: 'tfb-sectionTitle' },
							t('childrenSection'),
							h('span', { className: 'tfb-chip' }, String(selection.children.length))),
						h('div', { className: 'tfb-tasks' },
							selection.children.map((row) => h(ChildRow, { key: row.key, row, t, onOpen: onSelectKey }))))
					: null,

				// Shared tasks
				tasks.length > 0
					? h('div', { className: 'tfb-section' },
						h('div', { className: 'tfb-sectionTitle' },
							t('resultsSection'),
							h('span', { className: 'tfb-chip' }, t('doneOf', { done, total }))),
						h('div', { className: 'tfb-progressRow', style: { marginBottom: '6px' } }, h(Bar, { done, total })),
						h('div', { className: 'tfb-tasks' },
							tasks.map((task, index) => h(TaskItem, { key: task.id || String(index), task, t }))))
					: null);
		}

		/* ------------------------------------------------------------------ *
		 * Panel                                                              *
		 * ------------------------------------------------------------------ */

		function Panel(props) {
			const { t, leadLabel, leadStatus, agents, allAgents, tasks, catalogState, catalogError, failure, onOpenSession, onRefreshSession, onClose } = props;
			const panelRef = useRef(null);
			const [selectedKey, setSelectedKey] = useState(null);

			useEffect(() => {
				if (panelRef.current) panelRef.current.focus();
			}, []);

			// Auto-refresh child projections so turnOutline & sessionStats populate
			useEffect(() => {
				if (typeof onRefreshSession !== 'function') return;
				for (const row of agents) {
					if (!row.outline) onRefreshSession(row.id);
				}
			}, [agents.length]);

			const unowned = tasks.filter((task) => !task.ownerName);
			const ribs = agents.map((row) => ({
				...row,
				tasks: row.tasks || [],
			}));
			if (unowned.length > 0) {
				ribs.push({
					key: 'pool',
					kind: 'pool',
					label: t('pool'),
					title: '',
					status: 'idle',
					tasks: unowned,
					mode: 'unknown',
				});
			}

			const hasContent = agents.length > 0 || tasks.length > 0;
			const layout = computeLayout(hasContent ? ribs.length : 0);

			const selection = (() => {
				if (!selectedKey) return null;
				if (selectedKey === 'lead') {
					return {
						kind: 'lead',
						label: leadLabel,
						title: '',
						tasks,
						children: agents,
					};
				}
				if (selectedKey === 'pool') {
					return { kind: 'pool', label: t('pool'), title: '', tasks: unowned, children: [] };
				}
				const row = allAgents[selectedKey];
				if (!row) return null;
				return row;
			})();

			const openSession = () => {
				if (selection && selection.kind === 'agent' && !selection.external) {
					onOpenSession(selection.parentSessionId, selection.id, selection.mode);
					onClose();
				}
			};

			const runningCount = agents.filter((row) => row.running).length;
			const completedCount = agents.filter((row) => row.completed).length;
			const endedCount = agents.filter((row) => row.ended).length;

			return h('div', { className: 'tfb-panel', ref: panelRef, role: 'dialog', 'aria-modal': 'true', 'aria-label': t('title'), tabIndex: -1, 'data-team-fishbone': true },
				h('div', { className: 'tfb-header' },
					h('div', { className: 'tfb-headerIcon', 'aria-hidden': true },
						h('svg', { width: 18, height: 18, viewBox: '0 0 16 16', fill: 'none' },
							h('path', { d: 'M1.6 8h10.2', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
							h('path', { d: 'M5.2 8 3.4 4.2M8.4 8 6.6 11.8M11.4 8 9.6 4.2', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
							h('circle', { cx: 13.4, cy: 8, r: 1.8, fill: 'currentColor' }))),
					h('div', { className: 'tfb-heading' },
						h('div', { className: 'tfb-title' }, t('title')),
						h('div', { className: 'tfb-subtitle' },
							catalogState === 'loading' ? t('loading') : t('subtitle'))),
					h('div', { className: 'tfb-spacer' }),
					agents.length > 0 ? h('div', { className: 'tfb-kpis' },
						h('span', { className: 'tfb-kpi' }, t('teamSummary', { agents: agents.length })),
						runningCount > 0 ? h('span', { className: 'tfb-kpi', 'data-tone': 'running' },
							h(Dot, { color: AGENT_COLOR.running, pulse: true }),
							t('legendRunning') + ' ' + runningCount) : null,
						completedCount > 0 ? h('span', { className: 'tfb-kpi', 'data-tone': 'completed' },
							h(Dot, { color: AGENT_COLOR.completed }),
							t('legendCompleted') + ' ' + completedCount) : null,
						endedCount > 0 ? h('span', { className: 'tfb-kpi', 'data-tone': 'ended' },
							h(Dot, { color: AGENT_COLOR.ended }),
							t('legendEnded') + ' ' + endedCount) : null) : null,
					selection
						? h('button', { type: 'button', className: 'tfb-ghost', onClick: () => setSelectedKey(null) }, '← ' + t('back'))
						: null,
					h('button', { type: 'button', className: 'tfb-iconbtn', onClick: onClose, 'aria-label': t('close'), title: t('close') },
						h('svg', { width: 14, height: 14, viewBox: '0 0 14 14', 'aria-hidden': true },
							h('path', { d: 'M2 2l10 10M12 2L2 12', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' })))),
				h('div', { className: 'tfb-body' },
					failure ? h('div', { className: 'tfb-error' }, h(Dot, { color: AGENT_COLOR.failed }), t('failure', { message: failure })) : null,
					catalogError ? h('div', { className: 'tfb-error' }, h(Dot, { color: AGENT_COLOR.failed }), catalogError) : null,
					!hasContent
						? h('div', { className: 'tfb-notice', role: 'status' },
							h('strong', null, catalogState === 'loading' ? t('noCatalog') : t('noAgents')),
							h('span', null, t('noAgentsHint')))
						: selection
							? h(Detail, {
								selection, selectedKey, agents, leadLabel, t,
								onSelectKey: (key) => setSelectedKey(key),
							})
							: h('div', null,
								h('div', { className: 'tfb-stage' },
									h(Diagram, {
										leadLabel, leadStatus, agents: agents.length, tasks, ribs, layout, t,
										onOpen: (key) => setSelectedKey(key),
									})),
								h(Legend, { t }))),
				selection && selection.kind === 'agent' && !selection.external
					? h('div', { className: 'tfb-footer' },
						h('button', { type: 'button', className: 'tfb-primary', onClick: openSession }, t('openSession')),
						h('span', { className: 'tfb-hint' }, t('processHint')))
					: null);
		}

		/* ------------------------------------------------------------------ *
		 * Trigger + portal                                                   *
		 * ------------------------------------------------------------------ */

		function TeamFishbone(props) {
			const { sessionId, useSession, useSessions, useSessionStatus, t, openTeamSession, refreshTeamSession } = props;
			const [open, setOpen] = useState(false);
			const [now, setNow] = useState(() => Date.now());

			const leadSessionId = useSession((snapshot) => (snapshot.subagent && snapshot.subagent.address ? snapshot.subagent.address.parentSessionId : undefined)) || sessionId;

			const projections = useSessions((state) => state.projectionsBySession);
			const summaries = useSessions((state) => state.byId);
			const statusesHook = typeof useSessionStatus === 'function' ? useSessionStatus : (selector) => selector(undefined);
			const statuses = statusesHook((value) => value);

			const teams = (() => {
				const entry = projections && projections[leadSessionId];
				return entry && entry.values ? entry.values.agentTeam : undefined;
			})();
			const members = teams && Array.isArray(teams.members) ? teams.members : [];
			const tasks = teams && Array.isArray(teams.tasks) ? teams.tasks : [];

			const leadProjection = projections && projections[leadSessionId];
			const leadSummary = summaries && summaries[leadSessionId];

			const built = (() => {
				const index = {};
				const walk = (parentSessionId, depth) => {
					const projection = projections && projections[parentSessionId];
					const catalog = projection && projection.values ? projection.values.subagentCatalog : undefined;
					if (!Array.isArray(catalog) || depth > 3) return [];
					const rows = [];
					for (const entry of catalog) {
						const row = buildAgentRow(entry, parentSessionId, summaries, statuses, teams, now, projections);
						if (!row) continue;
						index[row.key] = row;
						row.children = walk(row.id, depth + 1);
						rows.push(row);
					}
					return rows;
				};
				const agents = walk(leadSessionId, 0);
				if (agents.length === 0 && members.length > 0) {
					for (const member of members) {
						if (!member || !member.id) continue;
						const row = buildAgentRow(
							{ id: member.id, label: member.description, mode: 'unknown' },
							leadSessionId, summaries, statuses, teams, now, projections,
						);
						if (!row) continue;
						index[row.key] = row;
						agents.push(row);
					}
				}
				return { agents, index };
			})();

			const agents = built.agents;
			const allAgents = built.index;

			const runningAny = agents.some((row) => row.running)
				|| Object.keys(allAgents).some((key) => allAgents[key].running);

			useEffect(() => {
				if (!open || !runningAny) return undefined;
				const timer = setInterval(() => setNow(Date.now()), 1000);
				return () => clearInterval(timer);
			}, [open, runningAny]);

			useEffect(() => {
				if (!open) return undefined;
				const onKeyDown = (event) => {
					if (event.key === 'Escape') {
						event.preventDefault();
						setOpen(false);
					}
				};
				document.addEventListener('keydown', onKeyDown);
				return () => document.removeEventListener('keydown', onKeyDown);
			}, [open]);

			useEffect(() => {
				setOpen(false);
			}, [leadSessionId]);

			const catalogKnown = !!(leadProjection && leadProjection.values && Array.isArray(leadProjection.values.subagentCatalog));
			const catalogState = leadProjection && leadProjection.state === 'error'
				? 'error'
				: catalogKnown
					? 'ready'
					: leadProjection && (leadProjection.state === 'idle' || leadProjection.state === 'loading')
						? 'loading'
						: 'absent';
			const catalogError = leadProjection && leadProjection.state === 'error'
				? String((leadProjection.error && leadProjection.error.message) || leadProjection.error || t('catalogError'))
				: '';
			const leadLabel = leadSummary && leadSummary.title ? leadSummary.title : t('lead');
			const leadRunning = !!(leadSummary && leadSummary.running === true);

			const agentCount = agents.length;

			return h('div', { className: 'tfb-root' },
				h('style', null, CSS),
				h('button', {
					type: 'button',
					className: 'tfb-trigger',
					'aria-haspopup': 'dialog',
					'aria-expanded': open,
					'aria-label': t('trigger'),
					title: t('subtitle'),
					onClick: () => setOpen((current) => !current),
				},
					h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', 'aria-hidden': true },
						h('path', { d: 'M1.6 8h10.2', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }),
						h('path', { d: 'M5.2 8 3.6 4.4M8.4 8 6.8 11.6M11.4 8 9.8 4.4', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }),
						h('circle', { cx: 13.4, cy: 8, r: 1.7, fill: 'currentColor' })),
					h('span', null, t('trigger')),
					agentCount > 0 ? h('span', { className: 'tfb-count' }, String(agentCount)) : null),
				open ? reactDom.createPortal(
					h(React.Fragment, null,
						h('div', { className: 'tfb-backdrop', onClick: () => setOpen(false) }),
						h(Panel, {
							t, leadLabel, leadStatus: leadRunning ? 'running' : 'idle',
							agents, allAgents, tasks, now, catalogState, catalogError,
							failure: teams && teams.failure ? teams.failure : '',
							onOpenSession: typeof openTeamSession === 'function' ? openTeamSession : () => {},
							onRefreshSession: typeof refreshTeamSession === 'function' ? refreshTeamSession : undefined,
							onClose: () => setOpen(false),
						})),
					document.body) : null);
		}

		/* ------------------------------------------------------------------ *
		 * Client plugin                                                      *
		 * ------------------------------------------------------------------ */

		const inject = ['sessions', 'uiWorkspace', 'slots', 'locale'];

		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'team-fishbone: dictionaries');

			const actions = {
				openTeamSession(parentSessionId, childSessionId, mode) {
					if (mode === 'external') return;
					ctx.uiWorkspace.openSession({ parentSessionId, childSessionId, mode: mode === 'one-shot' ? 'one-shot' : 'continuable' });
				},
				refreshTeamSession(targetSessionId) {
					if (!targetSessionId || !ctx.sessions || typeof ctx.sessions.refreshProjections !== 'function') return;
					ctx.sessions.refreshProjections(targetSessionId).catch(() => {});
				},
			};

			ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({
				name: 'conversation.session.header.actions',
				id: 'team-fishbone',
				order: -25,
				locale: NS,
				inject: () => actions,
			}, TeamFishbone));
		}

		return { inject, apply };
	},
});
