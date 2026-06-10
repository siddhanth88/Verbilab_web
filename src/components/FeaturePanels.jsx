const WAVE_HEIGHTS = [
  35, 55, 40, 70, 50, 80, 45, 65, 90, 55, 75, 48, 62, 85, 52, 78, 44, 68, 92, 58, 72, 46, 88, 54,
  76, 42, 82, 60, 74, 38, 66, 94, 50, 70, 45, 80, 55, 68, 72, 48,
]

const TRANSCRIPT = [
  'Agent: Thank you for calling Verbilab support.',
  'Customer: I need help with my account.',
  'System: Compliance check passed.',
  'Flag: Script deviation at 02:14.',
  'Audit: Score updated to 94.',
]

function AuditVisual() {
  return (
    <div className="scene-panel glass-panel glow-border scene-audit">
      <div className="scene-header">
        <span className="mono-label accent">CALL AUDIT ENGINE</span>
        <span className="scene-status">LIVE</span>
      </div>

      <div className="waveform-row">
        {WAVE_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="wave-bar"
            style={{ height: `${h}%`, animationDelay: `${i * 0.04}s` }}
          />
        ))}
      </div>

      <div className="scene-grid-2">
        <div className="mini-card glow-border">
          <p className="mono-label subtle">AUDIT SCORE</p>
          <p className="scene-stat">94 / 100</p>
        </div>
        <div className="mini-card mini-card-warn">
          <p className="mono-label subtle">COMPLIANCE</p>
          <p className="body-short !text-[0.8rem]">Flag raised · Review queued</p>
        </div>
      </div>

      <div className="transcript-box">
        <p className="transcript-label mono-label subtle">LIVE TRANSCRIPT</p>
        <div className="transcript-scroll">
          {[...TRANSCRIPT, ...TRANSCRIPT].map((line, i) => (
            <p key={i} className="transcript-line">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="scene-footer">
        <div className="pulse-dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="pulse-dot" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
        <span className="mono-label subtle">2,847 calls scored today</span>
      </div>
    </div>
  )
}

function ChatVisual() {
  return (
    <div className="scene-panel glass-panel glow-border scene-chat">
      <div className="scene-header">
        <span className="mono-label accent">CONVERSATIONAL INTELLIGENCE</span>
        <span className="scene-status">AI</span>
      </div>

      <div className="chat-stack">
        <div className="chat-bubble chat-in anim-chat" style={{ animationDelay: '0s' }}>
          Why did QA scores drop this week?
        </div>
        <div className="ai-answer-panel anim-chat" style={{ animationDelay: '0.5s' }}>
          <p className="mono-label accent !text-[0.55rem] mb-1">AI ANSWER</p>
          <p className="body-short !text-[0.8rem] !text-[var(--white)]">
            Hold time and script gaps on 12% of calls drove the decline. Coaching on
            escalation handling is recommended.
          </p>
        </div>
      </div>

      <div className="graph-wrap">
        <svg viewBox="0 0 240 100" className="h-full w-full" aria-hidden>
          <line x1="30" y1="50" x2="90" y2="25" stroke="rgba(91,192,222,0.3)" />
          <line x1="90" y1="25" x2="150" y2="55" stroke="rgba(91,192,222,0.3)" />
          <line x1="150" y1="55" x2="210" y2="40" stroke="rgba(91,192,222,0.3)" />
          {[
            [30, 50],
            [90, 25],
            [150, 55],
            [210, 40],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="rgba(91,192,222,0.9)" className="graph-node" />
          ))}
        </svg>
        <div className="graph-labels">
          <span>ROOT CAUSE</span>
          <span>POLICY</span>
          <span>QA SCORE</span>
        </div>
      </div>
    </div>
  )
}

function FlowVisual() {
  const stages = ['INGEST', 'ROUTE', 'ACT', 'REPORT']
  return (
    <div className="scene-panel glass-panel glow-border scene-flow">
      <div className="scene-header">
        <span className="mono-label accent">WORKFLOW AUTOMATION</span>
        <span className="scene-status">RUNNING</span>
      </div>

      <div className="pipeline">
        {stages.map((s, i) => (
          <div key={s} className={`pipeline-stage ${i === 2 ? 'is-hot' : ''}`}>
            <span className="pipeline-dot" />
            <span className="mono-label subtle !text-[0.55rem]">{s}</span>
            {i < stages.length - 1 && (
              <span className="pipeline-connector">
                <span className="pipeline-line anim-flow-particle" />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flow-agents-row">
        <div className="agent-nodes">
          {['Router', 'Scorer', 'Reporter'].map((label, i) => (
            <div key={label} className="agent-node" style={{ animationDelay: `${i * 0.4}s` }}>
              <span className="agent-core" />
              <span className="mono-label subtle !text-[0.5rem]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="task-cards">
        {['Call routed', 'Risk scored', 'Report sent'].map((t, i) => (
          <div key={t} className="task-card anim-task" style={{ animationDelay: `${i * 0.5}s` }}>
            <span className="mono-label accent !text-[0.55rem]">COMPLETE</span>
            <span className="body-short !text-[0.75rem]">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const FEATURE_VISUALS = {
  audit: AuditVisual,
  chat: ChatVisual,
  flow: FlowVisual,
}
