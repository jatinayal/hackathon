import React, { useState } from 'react';
import { Play, Code2, Terminal as TerminalIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('assistant');
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'welcome', text: 'Welcome to Strike Terminal! ✨' },
    { type: 'prompt', text: '$ |' }
  ]);

  const handleRunCode = () => {
    setIsRunning(true);
    setTerminalOutput((prev) => [
      ...prev.filter(item => item.type !== 'prompt'),
      { type: 'cmd', text: '$ node strike.js' },
      { type: 'info', text: 'Running welcome function...' },
      { type: 'log', text: 'Welcome Guest User!' },
      { type: 'log', text: 'Level: Beginner' },
      { type: 'success', text: '✅ Program executed successfully! (exit code 0)' },
      { type: 'prompt', text: '$ |' }
    ]);

    setTimeout(() => {
      setIsRunning(false);
    }, 450);
  };

  const suggestions = [
    {
      title: 'Refactor welcome()',
      desc: 'Extract user fetch and logging into separate utils for better testability.'
    },
    {
      title: 'Add input validation',
      desc: 'Validate user.level against enum: Beginner | Advanced | Expert.'
    },
    {
      title: 'Improve typing',
      desc: 'Define User type and return type for getUser and welcome functions.'
    },
    {
      title: 'Implement error handling',
      desc: 'Add try-catch blocks and custom error messages for async operations.'
    },
    {
      title: 'Add loading states',
      desc: 'Show skeleton loaders while fetching user data for better UX.'
    },
    {
      title: 'Optimize re-renders',
      desc: 'Wrap components with React.memo and use useMemo for expensive calculations.'
    }
  ];

  const bugShots = [
    {
      title: 'Unhandled Promise Rejection',
      desc: 'Async call to getUser() lacks try/catch boundary. May fail silently under network errors.'
    },
    {
      title: 'Missing Type Guard',
      desc: 'Property access user.name and user.level assumes successful payload object.'
    },
    {
      title: 'Implicit Global Invocation',
      desc: 'Top-level welcome() execution without lifecycle hook in component context.'
    }
  ];

  const thoughts = [
    '• Consider debouncing setDisplayedCode typing to save renders.',
    '• Memoize highlightCode with code length as key for performance.',
    '• Split regex patterns into precompiled list outside component.'
  ];

  return (
    <section id="hero" className="hero-section">
      {/* Background glow behind title */}
      <div className="hero-glow-backdrop" />

      {/* Hero Headline */}
      <div className="hero-content">
        <h2 className="hero-prefix">Take control of your</h2>
        <h1 className="hero-title-main">Future With Strike</h1>
        <p className="hero-subtitle">
          Master DSA, System Design &amp; AI with interactive coding environments
        </p>
        <a href="#membership" className="btn-hero-join">
          Join Us
        </a>
      </div>

      {/* Interactive Code Editor Card */}
      <div id="hero-editor" className="editor-wrapper">
        <div className="editor-card">
          {/* Editor Header Bar */}
          <div className="editor-header">
            <div className="editor-header-left">
              <div className="window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="editor-tab">
                <Code2 size={14} color="#f59e0b" />
                <span>strike.js</span>
                <span className="tab-indicator" />
              </div>
            </div>

            <div className="editor-header-right">
              <span className="status-badge">
                {isRunning ? 'RUNNING' : 'READY'}
              </span>
              <button
                className="btn-run-code"
                onClick={handleRunCode}
                disabled={isRunning}
              >
                <Play size={14} fill="#ffffff" />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          {/* Editor Body: Left Editor, Right AI Panel */}
          <div className="editor-body">
            {/* Left Pane: Code & Terminal */}
            <div className="editor-left-pane">
              <div className="code-content-wrapper">
                <div className="code-line">
                  <span className="line-num">1</span>
                  <span className="line-code token-comment">// Strike Platform - Welcome Code</span>
                </div>
                <div className="code-line">
                  <span className="line-num">2</span>
                  <span className="line-code">
                    <span className="token-keyword">const</span> welcome = <span className="token-keyword">async</span> () =&gt; &#123;
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-num">3</span>
                  <span className="line-code">
                    &nbsp;&nbsp;<span className="token-keyword">const</span> user = <span className="token-keyword">await</span> <span className="token-fn">getUser</span>();
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-num">4</span>
                  <span className="line-code">
                    &nbsp;&nbsp;console.<span className="token-fn">log</span>(<span className="token-string">`Welcome $&#123;user.name&#125;!`</span>);
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-num">5</span>
                  <span className="line-code">
                    &nbsp;&nbsp;console.<span className="token-fn">log</span>(<span className="token-string">`Level: $&#123;user.level&#125;`</span>);
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-num">6</span>
                  <span className="line-code">
                    &nbsp;&nbsp;<span className="token-keyword">return</span> &#123; status: <span className="token-string">"success"</span> &#125;;
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-num">7</span>
                  <span className="line-code">&#125;;</span>
                </div>
                <div className="code-line">
                  <span className="line-num">8</span>
                  <span className="line-code">&nbsp;</span>
                </div>
                <div className="code-line">
                  <span className="line-num">9</span>
                  <span className="line-code">
                    <span className="token-keyword">const</span> getUser = <span className="token-keyword">async</span> () =&gt; (&#123;
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-num">10</span>
                  <span className="line-code">
                    &nbsp;&nbsp;name: <span className="token-string">"Guest User"</span>,
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-num">11</span>
                  <span className="line-code">
                    &nbsp;&nbsp;level: <span className="token-string">"Beginner"</span>
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-num">12</span>
                  <span className="line-code">&#125;);</span>
                </div>
                <div className="code-line">
                  <span className="line-num">13</span>
                  <span className="line-code">&nbsp;</span>
                </div>
                <div className="code-line">
                  <span className="line-num">14</span>
                  <span className="line-code">
                    <span className="token-fn">welcome</span>();
                    <span className="cursor-blink" />
                  </span>
                </div>
              </div>

              {/* Integrated Terminal */}
              <div className="terminal-panel">
                <div className="terminal-header">
                  <TerminalIcon size={14} />
                  <span>TERMINAL</span>
                </div>
                <div className="terminal-logs">
                  {terminalOutput.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        item.type === 'welcome'
                          ? 'terminal-welcome'
                          : item.type === 'cmd'
                          ? 'terminal-cmd'
                          : item.type === 'success'
                          ? 'terminal-success'
                          : ''
                      }
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pane: AI Assistant Suggestions & Thoughts */}
            <div className="editor-right-pane">
              <div className="assistant-tab-bar">
                <div className="tab-buttons">
                  <button
                    className={`assistant-tab-btn ${activeTab === 'assistant' ? 'active' : ''}`}
                    onClick={() => setActiveTab('assistant')}
                  >
                    AI Assistant
                  </button>
                  <button
                    className={`assistant-tab-btn ${activeTab === 'bugs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bugs')}
                  >
                    Bug Shots
                  </button>
                </div>
                <span className="assistant-badge-static">Static</span>
              </div>

              {activeTab === 'assistant' ? (
                <>
                  <div>
                    <h4 className="panel-subheading">QUICK SUGGESTIONS</h4>
                    <div className="suggestions-list">
                      {suggestions.map((item, index) => (
                        <div key={index} className="suggestion-card">
                          <h5 className="suggestion-title">{item.title}</h5>
                          <p className="suggestion-desc">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="panel-subheading">THOUGHTS</h4>
                    <div>
                      {thoughts.map((thought, idx) => (
                        <div key={idx} className="thoughts-card">
                          {thought}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h4 className="panel-subheading">STATIC BUG DETECTION</h4>
                  <div className="suggestions-list">
                    {bugShots.map((bug, index) => (
                      <div key={index} className="suggestion-card">
                        <h5 className="suggestion-title" style={{ color: '#f87171' }}>
                          {bug.title}
                        </h5>
                        <p className="suggestion-desc">{bug.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
