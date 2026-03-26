import type { Chapter } from "./index";

export const chapter14: Chapter = {
  id: "14",
  title: "Working with General Agents: Claude Code and Cowork",
  description: "Agent architecture, Skills + MCP, context engineering, orchestrator mindset, Digital FTE, poly-agentic workflows, hooks, shadow mode, convergent validation",
  topics: 10,
  questions: [
    {
      id: 1,
      question: "A law firm uses a rotating pool of paralegals to handle a complex, multi-week litigation case. Each paralegal works a single shift and has no memory of previous shifts. The case file is the only continuity mechanism. Which AI constraint does this workflow mirror, and what is the key mitigation?",
      options: [
        "Probabilistic output — each paralegal interprets the case differently",
        "Statelessness — the case file serves as persistent external memory, compensating for each paralegal's lack of inter-shift memory",
        "Context window limits — the case file is too large for any single paralegal",
        "Non-determinism — the firm cannot predict which paralegal will be assigned"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "A hospital gives a new surgeon both a surgical manual (procedures, techniques, decision frameworks) and a fully equipped operating room (instruments, monitors, lighting). Without either component, the surgeon cannot operate effectively. What AI architecture principle does this illustrate?",
      options: [
        "Agent Factory — the surgeon is a General Agent in the incubation phase",
        "The Three Roles Framework — the manual teaches, the surgeon practices",
        "Progressive disclosure — the surgeon learns instruments gradually",
        "Skills + MCP complementarity — skills provide expertise (the manual), MCP provides connectivity to tools (the operating room). Both are needed"
      ],
      correct: 3
    },
    {
      id: 3,
      question: "A developer writes a feature request as a single paragraph covering login page requirements. An AI agent generates the page missing input validation and the remember-me feature. What concept relationship explains why structured text would have produced a better result?",
      options: [
        "Structured text enables specification writing — markdown headings, lists, and code blocks create parseable requirements that AI attention mechanisms can process item by item, reducing the chance of missing any requirement",
        "Prose paragraphs overwhelm AI attention mechanisms beyond a certain sentence count",
        "Structured text enables longer specifications — headings and lists allow more content to fit",
        "Plain text specifications always produce worse AI output because of training data bias"
      ],
      correct: 0
    },
    {
      id: 4,
      question: "A hotel guest currently navigates a 12-step process on a touchscreen kiosk to order room service. A new voice-based system lets the guest say: 'I'd like a club sandwich with no mayo, delivered to room 412 in 30 minutes.' What paradigm shift does this represent?",
      options: [
        "UX-to-Intent — the voice system collapses the kiosk's 12-step navigation workflow into a single conversational statement of intent, eliminating the interface entirely",
        "Agent Factory — the voice system is a Custom Agent that specialized from the kiosk's General Agent phase",
        "Progressive disclosure — the voice system hides the kiosk's 12-step complexity behind a simpler interface",
        "MCP integration — the voice system uses Model Context Protocol to route the guest's request"
      ],
      correct: 0
    },
    {
      id: 5,
      question: "Two analysts on an agent team are both assigned to update ANALYSIS.md with their findings. Neither is given explicit section ownership. The team lead expects both analysts to contribute to the same document without coordination instructions. What is the PRIMARY risk of this approach?",
      options: [
        "The shared file will exceed the context window limit as both analysts append",
        "Both analysts will produce nearly identical findings because they share the same underlying AI model",
        "One analyst's write operation overwrites the other's findings — without explicit section ownership, concurrent file edits cause data loss that neither the agents nor the lead detect until review",
        "The ANALYSIS.md file will contain contradictory conclusions forcing the team lead to arbitrate"
      ],
      correct: 2
    },
    {
      id: 6,
      question: "A developer works on three independent features simultaneously using a single Claude session. By the third switch, Claude confuses Feature A's database schema with Feature C's API endpoints. What architectural improvement prevents this?",
      options: [
        "Create separate skills for each feature so Claude loads the correct context when switching",
        "Use the /clear command between each feature switch to reset Claude's context completely",
        "Use parallel sessions via git worktrees — each feature gets its own session with isolated context, preventing cross-feature contamination",
        "Prefix every message with the feature name so Claude can distinguish which feature context to apply"
      ],
      correct: 2
    },
    {
      id: 7,
      question: "A team lead creates an agent team to evaluate three acquisition targets. Instead of delegating, the lead starts analyzing the first target itself. Its context window fills with financial data from Target A, and it struggles to compare all three. Teammates sit idle. What control would have prevented this outcome?",
      options: [
        "Configuring a larger context window for the lead",
        "Adding a PostToolUse hook that blocks the lead from reading any files containing financial data",
        "Assigning all three targets to a single high-capability teammate",
        "Delegate mode — prevents the lead from conducting analysis directly, restricting it to task creation, messaging, and review so teammates do all investigative work"
      ],
      correct: 3
    },
    {
      id: 8,
      question: "A project manager lists four installation steps using bullet points (unordered list). The AI agent generates an installer that runs all four steps in parallel, causing dependency failures. What caused the problem?",
      options: [
        "The AI agent optimized for execution speed and ran all listed actions in parallel by default",
        "The AI agent's markdown parser is broken and cannot distinguish between ordered and unordered lists",
        "Bullet points signal independent, parallel items; numbered steps would have communicated sequential dependency",
        "The project manager should have wrapped each step in a fenced code block"
      ],
      correct: 2
    },
    {
      id: 9,
      question: "An accounting firm assigns three independent auditors to review different divisions. Each auditor works without knowledge of the others' findings. Only the engagement partner sees all three reports and synthesizes the final opinion. What AI architecture does this mirror?",
      options: [
        "MCP integration — each auditor connects to a different external data source",
        "Parallel sessions — three Claude Code sessions running simultaneously on the same shared codebase",
        "Subagent context isolation — each auditor (subagent) works in an isolated context; the partner (orchestrator) synthesizes without cross-contamination",
        "Progressive disclosure — auditors share their findings in carefully staged phases"
      ],
      correct: 2
    },
    {
      id: 10,
      question: "A developer writes a spec for a report generator describing the output format in prose. The AI produces a report with a completely different structure. What would have most effectively prevented this outcome?",
      options: [
        "Writing the format description in bold text to signal its importance",
        "Including a concrete example of the expected output in a fenced code block — specification by example creates an implicit acceptance test",
        "Adding more descriptive adjectives to each section requirement",
        "Using Level 1 headings for each section name so the AI treats them as structural requirements"
      ],
      correct: 1
    },
    {
      id: 11,
      question: "A developer creates a skill for code review. The description reads: 'A helpful skill for development tasks.' The skill never activates automatically — the developer must always invoke it by name. What is wrong with the description?",
      options: [
        "The SKILL.md file has a YAML syntax error in the metadata header",
        "It lacks specificity — the Description Formula requires action + input + output + trigger conditions for automatic activation",
        "Skills are architecturally incapable of activating automatically",
        "The skill's name conflicts with a built-in Claude Code feature"
      ],
      correct: 1
    },
    {
      id: 12,
      question: "A museum curator can write a narrative essay describing 200 artifacts OR create a structured catalog with standardized fields (era, material, origin, significance). Which approach better serves a scholar searching for Bronze Age pottery from Mesopotamia?",
      options: [
        "The scholar should ask a curator for help rather than searching independently",
        "The narrative essay — richer context helps the scholar understand connections",
        "Either approach works equally well",
        "The structured catalog — standardized fields enable precise filtering, just as structured markdown enables AI to parse specific requirements"
      ],
      correct: 3
    },
    {
      id: 13,
      question: "A CTO mandates Claude Code exclusively, arguing: 'Standardizing on one tool reduces complexity and training costs.' What is the PRIMARY weakness of this mandate?",
      options: [
        "Claude Code's subscription pricing is significantly higher than free tiers",
        "Different tools excel at different tasks — Claude Code for deep reasoning, Codex for parallel async delegation, Gemini CLI for large codebases. A single-tool mandate sacrifices complementary strengths that poly-agentic workflows exploit",
        "Industry standards like MCP, AGENTS.md, and Agent Skills ensure switching has low friction",
        "Open source tools evolve faster through community contributions"
      ],
      correct: 1
    },
    {
      id: 14,
      question: "A journalist has one anonymous source claiming a drug is ineffective. Her editor requires at least three independent data points before publishing. What validation approach does the editor require?",
      options: [
        "Shadow mode — publishing a limited version first to gauge reader reaction",
        "Peer review — having other journalists review the article for quality",
        "Convergent validation — multiple independent signals confirming the same thesis before acting on it",
        "Specification writing — documenting the investigation methodology in a structured format"
      ],
      correct: 2
    },
    {
      id: 15,
      question: "A flight school installs a physical interlock — the engine won't start without a completed checklist card inserted into a slot. Previously, the instructor just verbally reminded students. What AI pattern does the interlock represent vs the verbal reminder?",
      options: [
        "Shadow mode vs direct deployment",
        "Skills vs subagents",
        "Hooks (guaranteed execution via mechanical enforcement) vs prompting (hopeful compliance via verbal instruction)",
        "Context engineering vs CLAUDE.md"
      ],
      correct: 2
    },
    {
      id: 16,
      question: "A developer asks an AI to refactor a 2,000-line module. Midway through, the AI starts contradicting earlier decisions — using a different naming convention and ignoring agreed architecture choices. Which constraint best explains this?",
      options: [
        "Statelessness — the AI re-processes the full conversation each turn, and earlier decisions progressively lose influence as newer messages receive more attention weight",
        "Probabilistic output — the AI's random sampling produces a different coding style",
        "Context window limits — the conversation exceeded the model's maximum token capacity",
        "Conflicting coding standards in the training data"
      ],
      correct: 0
    },
    {
      id: 17,
      question: "A mentor suggests a solo developer build an AI agent for veterinary clinic scheduling rather than a general-purpose chatbot competing with ChatGPT. Why is the mentor's advice strategically sound?",
      options: [
        "The mentor has personal industry connections",
        "Veterinary software faces lower regulatory requirements",
        "General-purpose chatbots are technically simpler to build",
        "Vertical markets (Layer 3) offer defensible positions with domain expertise; Consumer AI (Layer 1) is dominated by well-funded hyperscalers"
      ],
      correct: 3
    },
    {
      id: 18,
      question: "Two developers build AI legal document analyzers. Developer A focuses on speed and cost. Developer B embeds 15 years of contract negotiation expertise into the agent's skills. Which has a more sustainable competitive advantage?",
      options: [
        "Developer A — speed and cost advantages compound faster than domain knowledge",
        "Developer B — domain expertise encoded in skills is the 20% moat that competitors cannot easily replicate",
        "Both equally — the underlying AI model provides the same core capability",
        "Developer A — enterprise buyers prioritize total cost of ownership above all other factors"
      ],
      correct: 1
    },
    {
      id: 19,
      question: "A solo developer lists her specialized tax preparation agent alongside 10,000 others in a marketplace at $29/month, expecting volume sales. What is the PRIMARY risk of this strategy?",
      options: [
        "Discovery is brutally competitive in marketplaces — with 10,000 alternatives, her specialized agent may never surface. Direct vertical sales would better leverage her domain expertise advantage",
        "The $29/month price point is too high for marketplace buyers",
        "Tax preparation agents require professional liability insurance",
        "Marketplace platforms take 30-40% commission"
      ],
      correct: 0
    },
    {
      id: 20,
      question: "A marketing team uses Claude Cowork with Connectors to pull data from Google Sheets and Slack. Their engineering team uses Claude Code with custom MCP servers for the same data sources. What is the relationship between MCP and Connectors?",
      options: [
        "MCP and Connectors use entirely different protocols designed for different user audiences",
        "Connectors replace MCP as a newer, improved technology",
        "Connectors are pre-packaged MCP servers — same protocol, no coding required. They extend MCP's reach to non-technical users by handling server setup and maintenance",
        "Connectors are functionally slower than custom MCP servers because the abstraction layer adds latency"
      ],
      correct: 2
    },
    {
      id: 21,
      question: "A fintech startup deploys an AI trading agent directly into production with full autonomous trading permissions. The CEO argues: 'Our backtesting shows 95% accuracy. Shadow mode would just delay our competitive advantage.' What is the PRIMARY weakness of this approach?",
      options: [
        "Backtesting doesn't capture real-world conditions — market dynamics, latency, and edge cases differ from historical data. Shadow mode would reveal these gaps before real money is at risk",
        "The team needs regulatory approval for autonomous trading",
        "A 95% accuracy rate means 5% of all trades will lose money",
        "The CEO made a unilateral decision without consulting the engineering team"
      ],
      correct: 0
    },
    {
      id: 22,
      question: "A consulting firm builds Digital FTEs for three clients each using a different AI platform (Claude, GPT, Gemini). Without standards, they'd rebuild each agent from scratch. Which combination of standards addresses their portability challenge?",
      options: [
        "Platform-specific SDKs with a custom translation layer",
        "CLAUDE.md for context, proprietary APIs for each platform",
        "A single monolithic configuration file",
        "MCP for tool connectivity, AGENTS.md for behavioral rules, and Agent Skills for expertise — all platform-independent"
      ],
      correct: 3
    },
    {
      id: 23,
      question: "A consulting firm builds a compliance auditing agent using AAIF standards (MCP, AGENTS.md, Skills). A new client requires it on a different AI platform and it deploys with minimal changes. What would happen WITHOUT AAIF standards?",
      options: [
        "The firm would be forced to use a single AI platform for all clients",
        "The agent would automatically work on any platform because modern AI platforms share compatible architectures",
        "The firm would need to rebuild the agent from scratch for each platform — proprietary integrations create vendor lock-in and multiply development costs",
        "The agent's performance would actually improve because standards introduce processing overhead"
      ],
      correct: 2
    },
    {
      id: 24,
      question: "A team lead adds 'Always run Prettier after editing files' to CLAUDE.md but Claude sometimes forgets. What is the reliable solution?",
      options: [
        "Create a skill that reminds Claude to check for formatting after each file edit",
        "Rewrite the CLAUDE.md instruction in bold, uppercase text",
        "Create a PostToolUse hook that triggers on Write/Edit events — hooks execute guaranteed, unlike CLAUDE.md instructions which Claude may not follow",
        "Ask Claude to run Prettier manually at the end of every coding session"
      ],
      correct: 2
    },
    {
      id: 25,
      question: "An AI agent can query a financial database and generate perfectly formatted reports, but consistently misclassifies transactions because it doesn't understand the client's industry-specific accounting rules. What gap does this illustrate?",
      options: [
        "A context window limitation — the accounting rules document is too large",
        "A training data gap — the foundation model was never trained on financial data",
        "A tool access gap — the agent needs additional database permissions",
        "The expertise gap — the agent has intelligence and execution capability but lacks domain-specific knowledge that only a domain expert can provide"
      ],
      correct: 3
    },
    {
      id: 26,
      question: "A project manager creates a 4-agent team to produce four independent summaries of quarterly reports — one agent per department. Agents write to separate files and never communicate. The manager chose teams because 'teams are more powerful.' What is the PRIMARY problem?",
      options: [
        "Agent teams require a minimum of five members to function correctly",
        "The team structure introduces scheduling latency",
        "The four agents will produce conflicting summaries because context is polluted by inter-agent messages",
        "Agent teams cost 3-5x more than subagents and exist for cross-agent discussion. Independent summaries with no communication is the exact use case subagents handle better at a fraction of the cost"
      ],
      correct: 3
    },
    {
      id: 27,
      question: "A publishing house separates editor and proofreader roles. The editor shapes narrative and structure. A different person proofreads for grammar and accuracy. The same person never does both. What AI quality pattern does this reflect?",
      options: [
        "Claude-Reviews-Claude — separate writer and reviewer sessions provide independent quality gates, preventing self-validation bias",
        "Convergent validation — two independent sources confirm the same conclusion",
        "Shadow mode — the proofreader observes the editor's work before acting independently",
        "Backpressure — the proofreader intentionally slows the publication pipeline"
      ],
      correct: 0
    },
    {
      id: 28,
      question: "A senior developer prompts 'Build me a dashboard' and gets a generic result. A junior developer writes a two-page specification with data sources, chart types, user roles, and success criteria — her dashboard matches requirements precisely. What relationship does this demonstrate?",
      options: [
        "The orchestrator mindset requires specification writing — effective delegation depends on clear specifications; orchestrating without specs is just vibe coding with delegation",
        "Specification writing requires the orchestrator mindset",
        "The junior developer has superior AI prompting skills",
        "The senior developer should have selected a more capable AI model"
      ],
      correct: 0
    },
    {
      id: 29,
      question: "A startup builds a General Agent for customer support triage, discovers 70% of tickets are billing disputes, encodes billing expertise into skills, and deploys a 24/7 autonomous billing agent. What relationship between concepts does this progression demonstrate?",
      options: [
        "The Agent Factory paradigm enables the Digital FTE — General Agents discover patterns that inform Custom Agent specialization, which becomes a Digital FTE when deployed autonomously",
        "Digital FTE enables the Agent Factory",
        "MCP enables the Digital FTE",
        "The two concepts are independent"
      ],
      correct: 0
    },
    {
      id: 30,
      question: "A marketing manager manually copies spreadsheet data into a chatbot, gets analysis, copies the response back, then updates her dashboard — 15 times per day. What fundamental limitation does this workflow expose?",
      options: [
        "Spreadsheet data with complex formulas is too nuanced for current AI models",
        "The chatbot needs more sophisticated prompt engineering",
        "A different, more advanced AI model would eliminate the manual steps",
        "The chatbot is passive AI — it can only respond to pasted content, not access files, systems, or dashboards directly"
      ],
      correct: 3
    },
    {
      id: 31,
      question: "A developer's agent has 150 MCP tools configured. At session start, all tool definitions load into context, consuming 45,000 tokens, crowding out actual task context. What optimization should they apply?",
      options: [
        "Upgrade to a model with a larger context window",
        "Remove 100 of the 150 tools to reduce token consumption",
        "MCP Tool Search — automatically defers tool definitions until needed, loading only when the agent determines a tool is relevant (~85% token savings)",
        "Move all tool definitions into the CLAUDE.md file"
      ],
      correct: 2
    },
    {
      id: 32,
      question: "A hiring manager eliminates Vendor B (56.8% on SWE-bench Pro) in favor of Vendor A (80.9% on SWE-bench Verified). A colleague objects. Why is the colleague's objection valid?",
      options: [
        "SWE-bench Verified and Pro are different variants with different difficulty levels — 56.8% on the harder Pro variant may represent stronger capability than 80.9% on Verified. Cross-variant comparison is invalid",
        "Benchmark scores fluctuate by several percentage points due to non-determinism",
        "SWE-bench scores only measure code generation ability, not broader capabilities",
        "Vendor B may have deliberately chosen the harder benchmark variant to appear more capable"
      ],
      correct: 0
    },
    {
      id: 33,
      question: "An AI agent detects unusual memory consumption, reads deployment logs, correlates the spike with a specific commit, identifies the problematic function, and drafts a rollback plan. Which reasoning framework does this behavior demonstrate?",
      options: [
        "SDD — the agent followed a pre-written specification for incident response",
        "OODA Loop — Observe (detect spike), Orient (correlate with commit), Decide (identify root cause), Act (draft rollback)",
        "Five Powers — the agent exercised all five capabilities simultaneously",
        "Convergent validation — the agent confirmed the issue by triangulating evidence"
      ],
      correct: 1
    },
    {
      id: 34,
      question: "A developer concludes: 'Since Anthropic, OpenAI, and Google all share MCP and AGENTS.md standards, the three coding agents are now functionally identical.' What is the PRIMARY flaw in this reasoning?",
      options: [
        "Shared standards govern interoperability — tool connectivity and project instructions — but execution models differ fundamentally: local terminal vs cloud sandbox vs free-tier inference. Standards create portability, not equivalence",
        "The Agentic AI Foundation has not yet finalized the shared standards",
        "Pricing models differ so dramatically that cost alone makes them non-interchangeable",
        "Subagents, hooks, agent teams, and IDE integration are all vendor-specific features"
      ],
      correct: 0
    },
    {
      id: 35,
      question: "A CTO has one analyst report showing 40% productivity gains from AI coding tools. Her VP pushes for immediate adoption. What approach best reduces the risk of a premature investment?",
      options: [
        "Adopt the tool on a trial basis, limit it to one team, and measure results after a full year",
        "Delay the decision until the analyst publishes an updated version",
        "Commission a deeper custom study from the same analyst firm",
        "Seek multiple independent signals — developer surveys, pilot project metrics, and industry benchmark data — before committing"
      ],
      correct: 3
    },
    {
      id: 36,
      question: "A restaurant chain considers having all chefs first use a shared experimental kitchen to test ingredient combinations before developing signature dishes for their location. What agent development principle does this parallel?",
      options: [
        "MCP standardization — the shared kitchen standardizes equipment and tools",
        "The Agent Factory paradigm — use a general-purpose exploration phase (experimental kitchen) to discover patterns before specializing (signature dishes)",
        "Progressive disclosure — chefs learn recipes in carefully staged phases",
        "Context isolation — each chef works independently to prevent cross-contamination"
      ],
      correct: 1
    },
    {
      id: 37,
      question: "A construction company replaces manual screwdrivers with power drills. Experienced carpenters work faster with precision. Untrained workers strip screws and cause more damage than with hand tools. What AI development principle does this illustrate?",
      options: [
        "Shadow mode — untrained workers should observe experienced users before operating drills",
        "The orchestrator mindset — carpenters should direct the drills rather than use them directly",
        "AI amplification — power tools amplify both skill and carelessness; discipline matters more with powerful tools, not less",
        "The 80/20 moat — 80% of drilling is commodity work that anyone can perform"
      ],
      correct: 2
    },
    {
      id: 38,
      question: "A team lead configures a TaskCompleted hook (rejects deliverables under 100 words) but NOT a TeammateIdle hook. After one teammate finishes with a 500-word analysis, it goes idle even though two open action items remain. What gap does the missing hook create?",
      options: [
        "The teammate's 500-word deliverable will not be accepted because the TaskCompleted hook only fires when ALL teammates finish",
        "Without TeammateIdle, the lead has no way to communicate with idle teammates",
        "TaskCompleted ensures quality of finished work, but TeammateIdle ensures idle teammates pick up remaining work. Without both hooks, quality is enforced but team capacity is wasted",
        "The TeammateIdle hook would have automatically assigned one of the two remaining action items"
      ],
      correct: 2
    },
    {
      id: 39,
      question: "A developer writes a specification with skipped heading levels: # App Name → ### Features → ## Installation → #### API Details. She argues heading levels don't matter 'because the AI reads all the text anyway.' What is the PRIMARY weakness of this argument?",
      options: [
        "Skipped heading levels break the AI's logical map — the hierarchy signals containment and parent-child relationships. Inconsistent levels miscommunicate document structure and harm accessibility",
        "The document won't render properly in markdown viewers",
        "AI agents completely ignore content placed under incorrectly leveled headings",
        "Higher-level headings consume significantly more tokens than lower-level ones"
      ],
      correct: 0
    },
    {
      id: 40,
      question: "A domain expert building a Digital FTE chooses between $2,000/month subscription and 15% of each successful claim recovery. Her typical client processes 500 claims/month averaging $800 each. What is the primary trade-off between these models?",
      options: [
        "Subscription provides predictable revenue but no upside; success fee aligns incentives but creates measurement and variability challenges",
        "Subscription is always more profitable than success fees at any client volume",
        "Success fee models require transparent outcome tracking infrastructure that costs more to build",
        "Both models produce identical long-term revenue"
      ],
      correct: 0
    },
    {
      id: 41,
      question: "Developer A uses vibe coding (iterative prompting) and has a working prototype after one day. Developer B uses SDD (specification first) and has a partial but well-documented implementation. After one week, which approach produces better outcomes?",
      options: [
        "It depends on the feature complexity — simple features favor vibe coding, complex features favor SDD",
        "Developer A's approach — the early prototype provides a compounding head start",
        "Both produce equivalent outcomes because the AI model generates the same quality of code",
        "Developer B's SDD approach always wins — specifications prevent drift in every scenario without exception"
      ],
      correct: 0
    },
    {
      id: 42,
      question: "Dev A writes detailed code herself using AI only for autocompletion. Dev B writes a specification and delegates implementation to an AI agent. After five features, which developer likely has better outcomes and why?",
      options: [
        "Dev B — specification-first delegation produces documented, validated features that compound in quality over time",
        "Dev A — hands-on coding builds deeper understanding of the codebase",
        "Both achieve similar outcomes since the same underlying AI model powers both",
        "Dev A — autocompletion introduces fewer errors because the developer maintains direct control"
      ],
      correct: 0
    },
    {
      id: 43,
      question: "An agent has 200 available skills. Loading all definitions at session start would consume 60,000 tokens — nearly a third of the context window. All skills must be available but the team can't afford the token cost. What architectural pattern solves this?",
      options: [
        "Randomly select 20 skills per session and rotate the selection daily",
        "Three-level progressive disclosure — load only metadata (~30 tokens each) at start, full skill content on-demand when invoked",
        "Compress all 200 skill definitions into a single summary document",
        "Split skills across multiple independent agents"
      ],
      correct: 1
    },
    {
      id: 44,
      question: "A product manager needs to analyze 50 customer feedback documents and produce a summary report. She has access to both Claude Code (terminal) and Claude Cowork (desktop). Which is better suited and why?",
      options: [
        "Cowork — document analysis and report generation are its strength; built-in document skills handle docx/pdf natively without terminal commands",
        "Claude Code — the terminal provides faster batch file processing and more control over output formatting",
        "Either works equally well since both interfaces use the same underlying AI model and agent SDK",
        "Neither interface can handle 50 documents in a single workflow"
      ],
      correct: 0
    },
    {
      id: 45,
      question: "A developer spends three months mastering Claude Code — writing CLAUDE.md files, building Skills, configuring MCP servers, and using hooks. A new client requires all work in OpenAI's Codex CLI. How much of her expertise transfers?",
      options: [
        "Almost nothing transfers — Claude Code and Codex use fundamentally different architectures",
        "Most transfers directly — project instructions become AGENTS.md, skills move to .agents/skills/, MCP servers work unchanged, and hooks concepts apply. Only directory paths and minor config differ",
        "Only MCP servers transfer because they follow the open standard governed by AAIF",
        "Everything transfers automatically with zero changes"
      ],
      correct: 1
    },
    {
      id: 46,
      question: "A gym's treadmills have built-in heart rate monitors but data only shows on a small screen. A software update sends the data to a phone app that tracks trends, sets goals, and adjusts workout plans automatically. What principle does this update demonstrate?",
      options: [
        "Skills architecture — the app teaches the treadmill new sensing capabilities",
        "Progressive disclosure — the app reveals the treadmill's data in stages",
        "MCP connectivity — the treadmill uses a standardized protocol to communicate with the phone",
        "Product overhang — the heart rate sensing capability already existed; the app interface unlocked latent value that was previously inaccessible"
      ],
      correct: 3
    },
    {
      id: 47,
      question: "A developer's AI assistant gives excellent advice at the start of a conversation but produces increasingly irrelevant suggestions after 30 minutes of coding. What concept relationship explains this degradation?",
      options: [
        "Statelessness causes the degradation — the AI literally forgets earlier instructions",
        "Context window limits require context engineering — as conversation grows, the limited window fills with earlier content, diluting attention to recent, relevant information",
        "Probabilistic output causes random quality variation that correlates with conversation length by coincidence",
        "The AI model becomes fatigued after processing too many tokens"
      ],
      correct: 1
    },
    {
      id: 48,
      question: "An AI agent has a well-written CLAUDE.md and comprehensive skills but no MCP connections. The team expects it to pull data from their CRM and Slack automatically. Why does the agent fall short?",
      options: [
        "The skills should include hard-coded API call instructions for each external system",
        "The CLAUDE.md file needs to contain the CRM and Slack API credentials",
        "Missing the third pillar — MCP provides external access. Without it, the agent has context and procedures but no way to reach external systems",
        "The agent needs a larger context window to buffer the incoming data from CRM and Slack simultaneously"
      ],
      correct: 2
    },
    {
      id: 49,
      question: "A freelance data analyst's agent automates report generation (replicable by anyone) but includes financial compliance checks developed over 12 years of experience. Which concept relationship makes her agent monetizable?",
      options: [
        "MCP enables monetization — her agent connects to financial data sources",
        "The 80/20 moat enables monetization — the 80% commodity work (report generation) is replicable, but the 20% domain expertise (compliance checks) is the defensible value that justifies pricing",
        "Agent Skills enable monetization — encoding knowledge in a SKILL.md file transforms free expertise into a paid product",
        "The Agent Factory paradigm enables monetization"
      ],
      correct: 1
    },
    {
      id: 50,
      question: "A team of five developers each repeatedly explains project conventions ('camelCase, Jest for tests, Prisma for database') to their AI assistant at session start. What is the most effective solution?",
      options: [
        "Create a shared Slack channel where developers post their conventions",
        "Each developer saves their own prompt template on their desktop and pastes it at the start of every session",
        "Distribute the conventions as code comments throughout the codebase",
        "Create a CLAUDE.md file in the project root with these conventions — it auto-loads at every session start for all team members"
      ],
      correct: 3
    },
    {
      id: 51,
      question: "A team wants all developers to use a specific set of allowed commands, but one developer needs to experiment with a new MCP server locally. The team's settings are committed to Git. How should this be configured?",
      options: [
        "The developer creates a separate Git branch for their experimental settings",
        "Add the experimental MCP server to .claude/settings.json and ask the rest of the team to ignore it",
        "Put the team standards in ~/.claude/settings.json at the user level",
        "Team standards in .claude/settings.json (committed to Git), personal experiment in .claude/settings.local.json (gitignored) — local overrides project"
      ],
      correct: 3
    },
    {
      id: 52,
      question: "A team's agent calls a documentation MCP server 50 times per day. Each call loads the full tool definition (~300 tokens) plus returns large response payloads (~15,000 tokens). What approach achieves the best token savings while keeping the functionality?",
      options: [
        "Reduce the number of documentation lookups from 50 to 10 per day by batching queries",
        "Use MCP Tool Search to defer tool definition loading (~85% savings on definitions only, not on response payloads)",
        "Cache MCP responses in a local file and have the agent read from cache",
        "Compile the MCP workflow into a skill — the skill runs code locally outside the context window, returning only filtered results (~97-98% savings)"
      ],
      correct: 3
    },
    {
      id: 53,
      question: "A developer asks an AI to refactor a function. The AI suggests a new design pattern. She studies it, realizes it doesn't account for her concurrency requirements, explains the constraint, and the AI proposes a modified version that handles both. Which phases of the Three Roles Framework occurred?",
      options: [
        "Only AI as Teacher — the developer accepted the AI's suggestions without contributing domain knowledge",
        "AI as Teacher (suggested new pattern), Student as Teacher (provided concurrency constraint), Convergence (jointly refined the solution)",
        "Only Student as Teacher — the developer corrected the AI's flawed suggestion with her domain knowledge",
        "None — this interaction is standard prompt-response behavior"
      ],
      correct: 1
    },
    {
      id: 54,
      question: "A startup identifies that 70% of support queries involve insurance claims and wants to build a dedicated claims agent — but they skip the general agent phase entirely. What is the most likely consequence?",
      options: [
        "Higher API costs will make the claims agent too expensive to operate",
        "The claims agent lacks the real-world interaction patterns needed to handle edge cases effectively",
        "The startup will permanently lose its general agent capabilities",
        "Without the general agent's codebase as a foundation, the specialized claims agent must be built entirely from scratch"
      ],
      correct: 1
    },
    {
      id: 55,
      question: "A hospital deploys an AI triage agent in phases: first it observes nurses making decisions, then suggests alternatives alongside nurse decisions, and finally handles routine cases independently. What deployment principle does this follow?",
      options: [
        "Waterfall deployment — completing each phase fully before starting the next",
        "A/B testing — comparing AI recommendations against human decisions in randomized controlled groups",
        "Shadow mode — progressive autonomy from observation to augmentation to selective automation",
        "Canary release — deploying to a small random subset of patients first"
      ],
      correct: 2
    },
    {
      id: 56,
      question: "A developer establishes project conventions on Monday. On Tuesday she starts a new Claude Code session — Claude has no knowledge of Monday's conventions and generates code violating all of them. What relationship between concepts explains this and what is the correct mitigation?",
      options: [
        "Statelessness requires CLAUDE.md — the AI has no inter-session memory. CLAUDE.md provides persistent context that auto-loads at every session start, compensating for statelessness",
        "Context rot caused Tuesday's problems — Monday's conventions degraded overnight as the model's context cache expired",
        "Using --continue to resume Monday's session is the correct solution",
        "Claude's training data doesn't include the project's specific conventions, so it would need fine-tuning"
      ],
      correct: 0
    },
    {
      id: 57,
      question: "An orchestrator delegates three research tasks to separate subagents. Each returns a summary. The orchestrator's context stays clean. What would happen if the orchestrator did all three tasks itself?",
      options: [
        "Subagent results are always lower quality because delegation introduces communication overhead",
        "The orchestrator would produce identical results faster since it avoids coordination latency",
        "The orchestrator could selectively remember only relevant findings, keeping its context just as clean",
        "Without subagent isolation, the orchestrator accumulates all exploratory content — dead ends, rejected approaches, intermediate reasoning — diluting attention for later tasks (the dirty slate problem)"
      ],
      correct: 3
    },
    {
      id: 58,
      question: "A consulting team lead creates three analyst teammates with full autonomy — no plan approval required, no quality hooks. One analyst spends its entire token budget on an industry tangent the client never requested. What is the PRIMARY design flaw?",
      options: [
        "The lead should have enabled delegate mode to prevent itself from doing any direct analysis",
        "Three analysts is too many for a single competitive landscape study",
        "The lead failed to configure a TaskCompleted hook that validates deliverables against the client's requirements",
        "Skipping plan approval removed the quality gate where the lead reviews each analyst's proposed approach before resources are spent — the tangent would have been caught at plan review"
      ],
      correct: 3
    },
    {
      id: 59,
      question: "A development team adopts 6 of 9 AIDD pillars — skipping TDD, Linux Dev Environment, and Universal Cloud Deployment. The team lead considers this 'good enough.' What is the PRIMARY risk of partial adoption?",
      options: [
        "Teams using all 9 pillars will ship features approximately 40% faster",
        "System completeness creates competitive advantage — missing quality gates (TDD), standard environments (Linux), and deployment (Cloud) creates gaps where AI-generated code enters production untested and environment-dependent",
        "The missing three pillars are the easiest to adopt, so skipping them represents the largest missed opportunity per unit of effort",
        "Partial adoption violates AAIF compliance requirements"
      ],
      correct: 1
    },
    {
      id: 60,
      question: "A lead developer asks her AI to investigate a bug, write a fix, then update documentation — all in a single conversation. By the documentation step, context is cluttered with debugging logs and abandoned fix attempts. What architectural pattern would prevent this?",
      options: [
        "Ask the AI to ignore all previous messages when beginning each new task phase",
        "Use the /clear command between each task to reset the entire conversation history",
        "Delegate each task to a separate subagent — each starts with a fresh context window, preventing cross-task contamination",
        "Upgrade to a model with a larger context window so all three tasks fit comfortably"
      ],
      correct: 2
    },
    {
      id: 61,
      question: "A developer configures an autonomous iteration loop to migrate a codebase from React 16 to React 19. The completion promise is 'MIGRATION COMPLETE' and max-iterations is 50. After 35 iterations, the agent outputs 'MIGRATION COMPLETE' even though 20% of components are untouched. What is the primary design flaw?",
      options: [
        "The completion promise uses static exact string matching — the agent can emit it prematurely. Max-iterations is the true safety net, not the promise",
        "Fifty iterations is far too many for a migration task",
        "The agent is deliberately generating false completion signals to escape the iteration loop early",
        "Replacing 'MIGRATION COMPLETE' with a shorter string like 'DONE' would fix the premature termination issue"
      ],
      correct: 0
    },
    {
      id: 62,
      question: "What is the key insight about the relationship between General and Custom agents in the ecosystem?",
      options: [
        "General and Custom agents compete for the same use cases in enterprises",
        "General Agents like Claude Code are used to build Custom Agents via SDKs",
        "Custom agents are deprecated in favor of General agents for all use cases",
        "General agents handle consumer markets while Custom agents serve enterprise"
      ],
      correct: 1
    },
    {
      id: 63,
      question: "In the presentation's framing, the '2026 AI Commercial Playbook' is positioned as:",
      options: [
        "A compliance guide from audits to encryption standardization",
        "A roadmap from technical feasibility to market execution",
        "A research summary from benchmarks to model release cycles",
        "A UX manual from interface polish to prompt effectiveness"
      ],
      correct: 1
    },
    {
      id: 64,
      question: "What does 'Human-in-the-Loop (HITL)' pattern ensure in high-stakes agent deployments?",
      options: [
        "Real-time human supervision of all agent activities regardless of risk level",
        "Human backup operators available to take over if agents experience failures",
        "Human review and approval of agent decisions for edge cases and high-stakes scenarios",
        "Continuous training data collection from human interactions for improvement"
      ],
      correct: 2
    },
    {
      id: 65,
      question: "The deck distinguishes 'agent' from 'chatbot' primarily by:",
      options: [
        "Larger context plus better memory plus faster decoding",
        "Goal pursuit plus tool use plus stateful autonomy",
        "Longer outputs plus richer tone plus better paraphrasing",
        "Better UI plus safer filters plus fewer hallucinations"
      ],
      correct: 1
    },
    {
      id: 66,
      question: "What is the purpose of Regression Testing in the Agent Evals framework?",
      options: [
        "To validate that agent responses match exactly with expected templates",
        "To ensure previous skills haven't degraded when SKILL.md is updated",
        "To verify that new features work correctly in isolation from existing ones",
        "To measure the statistical correlation between input and output variables"
      ],
      correct: 1
    },
    {
      id: 67,
      question: "What transformation in developer role does the AI revolution represent according to the presentation?",
      options: [
        "From developer-as-typist to developer-as-orchestrator of AI systems",
        "From developer-as-manager to developer-as-individual-contributor model",
        "From developer-as-generalist to developer-as-specialist in narrow domains",
        "From developer-as-employee to developer-as-entrepreneur running AI startups"
      ],
      correct: 0
    },
    {
      id: 68,
      question: "The Digital SDR case study demonstrates that Digital FTEs achieve faster ROI than human teams primarily because:",
      options: [
        "Human teams require extended ramp-up and training periods before reaching full productivity",
        "Digital agents use more advanced language models with higher accuracy rates than humans",
        "Human sales representatives demand higher base salaries than the market average allows",
        "Digital systems benefit from government subsidies that reduce their operational expenses"
      ],
      correct: 0
    },
    {
      id: 69,
      question: "Why is Cloud Native infrastructure (Kubernetes, Docker, Dapr) essential for the Digital FTE scaling strategy?",
      options: [
        "It reduces licensing costs by using open-source components exclusively",
        "It provides built-in machine learning optimization for agent performance",
        "It simplifies compliance with international data residency regulations",
        "It enables auto-scaling, multi-tenancy, and high availability for 24/7 operation"
      ],
      correct: 3
    },
    {
      id: 70,
      question: "What is the primary function of the SKILL.md file in the Agent Skills framework?",
      options: [
        "To manage version control and deployment pipelines for agents",
        "To log agent activities and performance metrics for auditing",
        "To define modular instructions that teach agents specific workflows",
        "To store API credentials and environment configuration variables"
      ],
      correct: 2
    },
    {
      id: 71,
      question: "The 'Core Strategic Decision' in the Agent Triangle presents three paths to agentic AI automation. Which correctly identifies all three?",
      options: [
        "General Agents (Consultant), Custom-Built AI Employees (Build), Pre-Built AI Employees (Buy)",
        "Predictive Agents (Analyze), Generative Agents (Create), Agentic Agents (Execute)",
        "Incubator Agents (Prototype), Specialist Agents (Scale), Marketplace Agents (Distribute)",
        "Coding Agents (Develop), Reasoning Agents (Plan), Orchestration Agents (Coordinate)"
      ],
      correct: 0
    },
    {
      id: 72,
      question: "The 'AI Revolution in Software' depicts three parallel paths as:",
      options: [
        "Prompt engineering, prompt templating, and prompt caching",
        "Data labeling, data warehousing, and data governance",
        "Fine-tuning models, distilling models, and quantizing models",
        "Coding agents, building agents, and AIOps operations"
      ],
      correct: 3
    },
    {
      id: 73,
      question: "'Manual Prompting vs Agent Skills' treats SKILL.md as:",
      options: [
        "A UI hint with minimal integration and no orchestration",
        "Disposable text with ad-hoc, best-effort repeatability",
        "A training dataset with model-level gradient updates",
        "Reusable IP with deterministic, script-backed reliability"
      ],
      correct: 3
    },
    {
      id: 74,
      question: "According to the pricing structure breakdown, what is the recommended target for ROI payback period?",
      options: [
        "1-2 month payback period for enterprise agent deployments",
        "3-6 month payback period for enterprise agent deployments",
        "12-18 month payback period for enterprise agent deployments",
        "6-12 month payback period for enterprise agent deployments"
      ],
      correct: 1
    },
    {
      id: 75,
      question: "What distribution advantage does the OpenAI Apps Ecosystem provide according to the presentation?",
      options: [
        "Direct pipeline to 800+ million users and 1+ million businesses globally",
        "Access to exclusive enterprise customers with verified purchase intent",
        "Guaranteed placement in featured app collections for maximum visibility",
        "Reduced API costs through volume discounts and preferred pricing tiers"
      ],
      correct: 0
    },
    {
      id: 76,
      question: "The developer economy is being restructured faster than previous technology shifts primarily because:",
      options: [
        "Regulatory pressure from governments is mandating AI adoption across all software companies",
        "AI tools are being used to build better AI tools, creating a self-accelerating improvement cycle",
        "Venture capital has concentrated unprecedented funding into a small number of AI startups",
        "A global shortage of developers has made automation the only viable path for companies"
      ],
      correct: 1
    },
    {
      id: 77,
      question: "When presenting a Digital FTE proposal to executives, why is demonstrating an 85-90% cost reduction strategically important?",
      options: [
        "It matches the exact ROI threshold required by most procurement policies",
        "Cost savings of this magnitude typically exceed the threshold for executive-level approval without extensive committee review",
        "It represents the minimum savings needed to cover the AI platform licensing fees",
        "This percentage aligns with typical enterprise SaaS discount expectations"
      ],
      correct: 1
    },
    {
      id: 78,
      question: "You're writing a spec for an AI agent handling customer complaints for a luxury hotel brand. The 'Blueprint for a Perfect Agent Spec' includes as the first dimension:",
      options: [
        "The MCP servers it will connect to for booking data",
        "The role identity (e.g., 'Senior Guest Relations Manager') and tone (e.g., 'Empathetic, professional, luxury-focused')",
        "The error handling protocols for system downtime",
        "The output format templates for complaint resolutions"
      ],
      correct: 1
    },
    {
      id: 79,
      question: "A company has deployed 12 production AI agents with 1 AI Product Owner and 1 Agent Engineer. According to the 'Team Structure' rule of thumb, what is likely the problem?",
      options: [
        "They need more AI Product Owners to manage the roadmap",
        "They are understaffed on Agent Engineers; the ratio should be approximately 1 engineer per 3-5 agents",
        "They should have hired an MLOps Engineer before an Agent Engineer",
        "12 agents is above the maximum recommended for any team size"
      ],
      correct: 1
    },
    {
      id: 80,
      question: "The presentation defines a 'Digital FTE' as:",
      options: [
        "An agent priced and managed like a human employee role",
        "A SaaS user license priced by seats and feature tiers",
        "A database job scheduled nightly for batch reporting tasks",
        "A microservice endpoint that returns deterministic JSON only"
      ],
      correct: 0
    },
    {
      id: 81,
      question: "The 'Golden Dataset' concept is used to:",
      options: [
        "Benchmark GPUs with standardized inference workloads",
        "Train foundation models with large-scale generic corpora",
        "Validate agents on real-world scenarios before deployment",
        "Store user prompts for future personalization improvements"
      ],
      correct: 2
    },
    {
      id: 82,
      question: "The 'Monetization power-move' of Digital FTE pricing is that it:",
      options: [
        "Shifts spend from payroll budgets to UI design budgets",
        "Shifts spend from IT tools budgets to headcount budgets",
        "Shifts spend from HR budgets to GPU procurement budgets",
        "Shifts spend from product budgets to compliance budgets"
      ],
      correct: 1
    },
    {
      id: 83,
      question: "How does Digital FTE scaling fundamentally differ from Human FTE scaling?",
      options: [
        "Digital FTEs scale quarterly while Human FTEs can scale on weekly cycles",
        "Digital FTEs require proportional infrastructure while Human FTEs need fixed overhead",
        "Digital FTEs scale logarithmically while Human FTEs scale exponentially",
        "Digital FTEs scale exponentially through instant duplication while Human FTEs scale linearly"
      ],
      correct: 3
    },
    {
      id: 84,
      question: "The 'Trojan Horse' argument about Claude Code is that it is:",
      options: [
        "A general agent that uses code as a mechanism",
        "A static linter that enforces style guide compliance",
        "A code autocomplete tool that improves syntax speed",
        "An IDE plugin that enhances editor-only productivity"
      ],
      correct: 0
    },
    {
      id: 85,
      question: "The 'Decision Checklist' implies if any item is 'No,' teams should:",
      options: [
        "Ship immediately and monitor after a production incident",
        "Remove guardrails and increase agent creativity for coverage",
        "Reduce prompts and rely on larger models to compensate",
        "Pause and redesign before proceeding to automation"
      ],
      correct: 3
    },
    {
      id: 86,
      question: "The definition of an AI agent in the deck emphasizes a loop that includes:",
      options: [
        "Observing, deciding, acting, and learning toward a goal",
        "Sampling, decoding, ranking, and formatting a completion",
        "Training, fine-tuning, distilling, and quantizing a model",
        "Indexing, retrieving, reranking, and summarizing documents"
      ],
      correct: 0
    },
    {
      id: 87,
      question: "According to the presentation, how does plugging different MCP servers transform a General Agent?",
      options: [
        "It modifies the agent's security permissions and access control levels",
        "It transforms the agent into different specialist roles like Finance Auditor",
        "It changes the underlying language model the agent uses for inference",
        "It alters the agent's response format from text to structured data only"
      ],
      correct: 1
    },
    {
      id: 88,
      question: "The CoCounsel case study validates the Digital FTE monetization model because the product was:",
      options: [
        "Licensed as enterprise software with annual subscription fees per law firm",
        "Priced as a virtual employee performing billable legal work, not as a productivity tool",
        "Offered free to individual lawyers while charging enterprises for API access volume",
        "Sold through legal technology resellers who bundled it with practice management suites"
      ],
      correct: 1
    },
    {
      id: 89,
      question: "The 'Agent Factory Thesis' primarily reframes the AI business opportunity as:",
      options: [
        "Manufacturing digital employees rather than selling traditional software",
        "Shipping UI features rather than codifying organizational expertise",
        "Selling token bundles rather than selling recurring subscriptions",
        "Optimizing chat workflows rather than deploying autonomous systems"
      ],
      correct: 0
    },
    {
      id: 90,
      question: "A manufacturing company needs AI for quality control (camera defect detection), order processing (customer communications), and assembly (physical automation). According to the 'Future of Work' partnership model, how should responsibilities be distributed?",
      options: [
        "Agents handle everything including physical assembly",
        "People provide judgment on quality decisions, agents handle digital communications, robots handle physical assembly",
        "Robots handle all repetitive tasks including communication",
        "People handle all customer-facing tasks while AI handles internal operations only"
      ],
      correct: 1
    },
    {
      id: 91,
      question: "The deck's 'Infinite Extensibility' claim depends primarily on:",
      options: [
        "More prompts for better tone and better instruction recall",
        "More UI widgets for improved workflow discoverability",
        "Larger models for emergent capabilities and fewer tools",
        "MCP for plugging in new tools and capabilities, enabling agents to connect to any system without model retraining"
      ],
      correct: 3
    }
  ]
};
