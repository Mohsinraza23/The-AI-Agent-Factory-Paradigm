import { Chapter } from "./index";

export const chapter56: Chapter = {
  id: "56",
  title: "OpenClaw — AI Employee System",
  description: "Complete MCQ set covering all 15 lessons: AI Employee, Install & Connect, Agent Loop, Brain Customization, Memory, Skills, MCP, Proactive, TTS, Multi-Agent, Google Workspace, Orchestration, Security Gates, Production Deployment, and NemoClaw.",
  topics: 16,
  questions: [
    // LESSON 1: The AI Employee Moment
    {
      id: 1,
      question: "Which characteristic BEST differentiates an AI Employee from a traditional chatbot?",
      options: [
        "It uses natural language processing",
        "It requires internet access",
        "It can autonomously perform tasks and use tools",
        "It responds to user prompts"
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Why is OpenClaw considered a major shift in AI systems?",
      options: [
        "It improves text generation quality",
        "It introduces AI as an autonomous worker instead of a reactive tool",
        "It replaces cloud computing",
        "It removes the need for APIs"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "An AI system replies only when a user sends a message. What is it lacking?",
      options: [
        "Intelligence",
        "Memory",
        "Autonomy",
        "Security"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "Why are security gates important in AI Employees?",
      options: [
        "To increase response speed",
        "To prevent unauthorized or sensitive actions by the agent",
        "To reduce memory usage",
        "To improve UI design"
      ],
      correct: 1
    },
    {
      id: 5,
      question: "An AI agent that schedules tasks every 30 minutes without user input is demonstrating:",
      options: [
        "Passive behavior",
        "Reactive intelligence",
        "Proactive autonomy",
        "Static execution"
      ],
      correct: 2
    },
    {
      id: 6,
      question: "An AI system runs 24/7 but only responds when a user sends a message. What dimension is missing?",
      options: [
        "Multi-channel",
        "Proactive",
        "Extensible",
        "Ownership"
      ],
      correct: 1
    },
    {
      id: 7,
      question: "A company uses an AI system that has all five capabilities but is fully controlled by the vendor. What is it lacking?",
      options: [
        "Multi-agent",
        "Proactive ability",
        "Ownership",
        "Extensibility"
      ],
      correct: 2
    },
    {
      id: 8,
      question: "Why is 'Always-On' considered a foundational requirement?",
      options: [
        "It improves UI responsiveness",
        "It allows multi-channel communication",
        "It enables proactive behavior to exist",
        "It reduces API costs"
      ],
      correct: 2
    },
    {
      id: 9,
      question: "Which scenario BEST represents a Personal AI Employee?",
      options: [
        "AI responding to prompts in a browser",
        "AI generating images on request",
        "AI running locally, managing tasks, and controlling its own schedule under user ownership",
        "AI summarizing documents"
      ],
      correct: 2
    },
    {
      id: 10,
      question: "In the Agent OS analogy, what role does the Gateway play?",
      options: [
        "Plugin manager",
        "User interface",
        "Central coordinator (kernel-like behavior)",
        "Memory storage"
      ],
      correct: 2
    },
    {
      id: 11,
      question: "Why is the Agent OS analogy useful but not perfect?",
      options: [
        "Because it is technically incorrect",
        "Because OpenClaw is not software",
        "Because mental models help understanding but do not map exactly to reality",
        "Because OS concepts are outdated"
      ],
      correct: 2
    },
    {
      id: 12,
      question: "TRICKY — An AI system can: work across platforms, run continuously, schedule tasks, use plugins, coordinate sub-agents. But it runs on vendor servers. What is the correct classification?",
      options: [
        "Personal AI Employee",
        "Chatbot",
        "Enterprise AI Employee (not personal)",
        "Static automation system"
      ],
      correct: 2
    },
    {
      id: 13,
      question: "OpenClaw has 350,000+ GitHub stars. What does this prove?",
      options: [
        "The software is production-ready and stable",
        "OpenClaw has no bugs",
        "Popularity proves interest, not polish or maturity",
        "Every enterprise should adopt it immediately"
      ],
      correct: 2
    },
    {
      id: 14,
      question: "In the Agent OS analogy, workspace files like SOUL.md are compared to which OS component?",
      options: [
        "Kernel",
        "Device drivers",
        "Firmware",
        "Process memory"
      ],
      correct: 2
    },
    {
      id: 15,
      question: "James compares a Personal AI Employee to hiring a personal cook. A chatbot is like a restaurant. What is the KEY difference in this analogy?",
      options: [
        "The cook is cheaper",
        "The cook lives in your environment, remembers everything, and works under your control",
        "The restaurant has more options",
        "The cook is faster"
      ],
      correct: 1
    },
    // LESSON 2: Install & Connect
    {
      id: 16,
      question: "What is the PRIMARY purpose of connecting a messaging channel like WhatsApp?",
      options: [
        "To improve model accuracy",
        "To provide an interface for communication and interaction with the agent",
        "To store memory",
        "To reduce API cost"
      ],
      correct: 1
    },
    {
      id: 17,
      question: "An OpenClaw system crashes repeatedly with 'gateway.mode not configured'. What is the root issue?",
      options: [
        "Network failure",
        "Missing dependency",
        "Incomplete configuration before service start",
        "API quota exceeded"
      ],
      correct: 2
    },
    {
      id: 18,
      question: "Why is the gateway log considered the 'source of truth'?",
      options: [
        "It shows UI design",
        "It contains summarized data",
        "It records all system events, errors, and actions in detail",
        "It reduces latency"
      ],
      correct: 2
    },
    {
      id: 19,
      question: "A developer updates their API key but the system still uses the old one. What is the MOST likely cause?",
      options: [
        "Wrong model selection",
        "Network caching",
        "Credential cache overriding environment variables",
        "Plugin conflict"
      ],
      correct: 2
    },
    {
      id: 20,
      question: "What is the purpose of 'Pairing mode' in DM policy?",
      options: [
        "Increase speed",
        "Allow public access",
        "Restrict access with manual approval for new users",
        "Enable multi-agent support"
      ],
      correct: 2
    },
    {
      id: 21,
      question: "Why is Option A (dedicated number) recommended over Option B (personal number)?",
      options: [
        "It improves performance",
        "It reduces API usage",
        "It avoids security risks and potential bans from unofficial automation",
        "It enables multi-channel support"
      ],
      correct: 2
    },
    {
      id: 22,
      question: "TRICKY — Which sequence correctly represents the 'Activation Dance'?",
      options: [
        "Configure → Enable → Install → Restart",
        "Install → Restart → Enable → Configure",
        "Plugin exists → Enable → Configure → Restart",
        "Enable → Install → Restart → Configure"
      ],
      correct: 2
    },
    {
      id: 23,
      question: "Why is end-to-end testing important after installation?",
      options: [
        "To improve UI",
        "To verify that all system components (LLM, channel, agent) work together",
        "To reduce memory usage",
        "To enable plugins"
      ],
      correct: 1
    },
    // LESSON 3: Delegate Real Work
    {
      id: 24,
      question: "An AI agent answers a question without invoking any tool. Which step of the agent loop was skipped?",
      options: [
        "Intake",
        "Context Assembly",
        "Tool Execution",
        "Reply"
      ],
      correct: 2
    },
    {
      id: 25,
      question: "Why did the agent use the 'Exec' tool in Task B (listing files)?",
      options: [
        "To improve response speed",
        "To access local system data not available in training data or internet",
        "To reduce token usage",
        "To validate user input"
      ],
      correct: 1
    },
    {
      id: 26,
      question: "What determines whether an agent is ALLOWED to execute a command?",
      options: [
        "Model intelligence",
        "Training data",
        "Tool profile configuration",
        "Token limit"
      ],
      correct: 2
    },
    {
      id: 27,
      question: "An agent knows how to list files but fails to do so. What is the MOST likely reason?",
      options: [
        "Model is outdated",
        "Network failure",
        "Tool access is restricted by profile",
        "Context assembly failed"
      ],
      correct: 2
    },
    {
      id: 28,
      question: "Which statement BEST describes the difference between knowledge and access?",
      options: [
        "Knowledge is external, access is internal",
        "Knowledge is what the agent knows; access is what it is allowed to do",
        "Knowledge requires tools; access does not",
        "They are the same"
      ],
      correct: 1
    },
    {
      id: 29,
      question: "What is the role of 'Model Inference' in the agent loop?",
      options: [
        "Execute commands",
        "Store memory",
        "Decide whether tools are needed and which to use",
        "Send response"
      ],
      correct: 2
    },
    {
      id: 30,
      question: "TRICKY — An agent successfully answers knowledge questions but fails when asked to access files. What does this indicate?",
      options: [
        "Model failure",
        "Missing memory",
        "Tool restriction or incorrect profile configuration",
        "API key issue"
      ],
      correct: 2
    },
    {
      id: 31,
      question: "Why is the agent loop important?",
      options: [
        "It improves UI",
        "It defines how messages are processed from input to response including tool decisions",
        "It reduces API cost",
        "It stores memory"
      ],
      correct: 1
    },
    // LESSON 4: Customize Your Employee's Brain
    {
      id: 32,
      question: "Why did the agent ignore the instruction 'keep responses short' given in chat?",
      options: [
        "Model limitation",
        "Tool restriction",
        "Session memory is temporary and does not persist across interactions",
        "API issue"
      ],
      correct: 2
    },
    {
      id: 33,
      question: "Which file is responsible for defining the agent's personality and tone?",
      options: [
        "USER.md",
        "AGENTS.md",
        "SOUL.md",
        "TOOLS.md"
      ],
      correct: 2
    },
    {
      id: 34,
      question: "TRICKY — Which workspace file controls tool availability?",
      options: [
        "TOOLS.md",
        "AGENTS.md",
        "None — tool profiles control access",
        "SOUL.md"
      ],
      correct: 2
    },
    {
      id: 35,
      question: "Why is it recommended to keep workspace files short?",
      options: [
        "To reduce storage",
        "To improve UI",
        "Long instructions may exceed attention limits and reduce reliability",
        "To improve API speed"
      ],
      correct: 2
    },
    {
      id: 36,
      question: "What is the purpose of IDENTITY.md?",
      options: [
        "Store user data",
        "Define agent's name and identity",
        "Control tools",
        "Store logs"
      ],
      correct: 1
    },
    {
      id: 37,
      question: "Which statement BEST describes the BOOTSTRAP pattern?",
      options: [
        "Manual configuration method",
        "AI configures itself through conversation and generates its own workspace files",
        "System restart mechanism",
        "Memory storage process"
      ],
      correct: 1
    },
    {
      id: 38,
      question: "TRICKY — An agent behaves the same even after adding multiple instructions in SOUL.md. What is the MOST likely issue?",
      options: [
        "Tool failure",
        "Instructions do not meaningfully change behavior compared to base model",
        "API key expired",
        "Memory corruption"
      ],
      correct: 1
    },
    {
      id: 39,
      question: "Which files load on EVERY message?",
      options: [
        "SOUL.md, IDENTITY.md, AGENTS.md, TOOLS.md, USER.md",
        "MEMORY.md, BOOT.md",
        "skills/, memory/",
        "BOOTSTRAP.md only"
      ],
      correct: 0
    },
    {
      id: 40,
      question: "TRICKY — What is the difference between BOOT.md and BOOTSTRAP.md?",
      options: [
        "They are the same file with different names",
        "BOOT.md runs on every gateway restart; BOOTSTRAP.md runs once during first setup then gets deleted",
        "BOOTSTRAP.md runs every restart; BOOT.md runs only once",
        "Both run on every message"
      ],
      correct: 1
    },
    // LESSON 5: Memory & Commands
    {
      id: 41,
      question: "You say 'Remember this: I prefer bullet points.' Agent replies 'Got it!' But next session it forgot. What went wrong?",
      options: [
        "MEMORY.md was deleted",
        "The agent responded verbally without actually writing to the file — no tool badge appeared",
        "Session memory is permanent",
        "Bullet point preference can't be saved"
      ],
      correct: 1
    },
    {
      id: 42,
      question: "What is the difference between MEMORY.md and the memory/ directory?",
      options: [
        "MEMORY.md is deleted daily; memory/ is permanent",
        "MEMORY.md is curated long-term memory that loads every session; memory/ holds daily logs where only today and yesterday load automatically",
        "They are the same thing",
        "memory/ only works on paid plans"
      ],
      correct: 1
    },
    {
      id: 43,
      question: "You send /status to your agent. Response arrives in under 1 second with no thinking indicator. Why?",
      options: [
        "Your internet is very fast",
        "The model is very small",
        "Slash commands are intercepted by the gateway before reaching the model — zero tokens spent",
        "The agent cached the answer"
      ],
      correct: 2
    },
    {
      id: 44,
      question: "What is the correct command to trigger an actual file write to memory?",
      options: [
        "\"Remember this:\"",
        "\"Note this:\"",
        "\"Save in memory:\"",
        "\"Store this:\""
      ],
      correct: 2
    },
    {
      id: 45,
      question: "What happens when a conversation runs too long and the gateway compacts it?",
      options: [
        "All conversation history is permanently deleted",
        "Older turns are summarized; important context is saved to memory files first",
        "The session restarts from scratch",
        "The agent loses all skills"
      ],
      correct: 1
    },
    {
      id: 46,
      question: "TRICKY — You verify memory was saved by asking the agent 'Do you remember my preference?' Agent says yes. Is this enough proof?",
      options: [
        "Yes, if the agent says it, it's saved",
        "No — you must check the actual file on disk with cat ~/.openclaw/workspace/MEMORY.md",
        "Yes, the dashboard confirms it automatically",
        "No, you need to restart first"
      ],
      correct: 1
    },
    {
      id: 47,
      question: "memory_search uses what type of retrieval for older logs?",
      options: [
        "Alphabetical keyword search only",
        "Hybrid retrieval combining vector similarity and keyword matching",
        "Manual search by date",
        "Full reload of all logs"
      ],
      correct: 1
    },
    // LESSON 6: Install Skills & Discover the Ecosystem
    {
      id: 48,
      question: "What is a Skill in OpenClaw?",
      options: [
        "A TypeScript plugin that modifies the gateway",
        "A SKILL.md file that teaches the agent how to handle a specific task",
        "An MCP server connection",
        "A tool profile configuration"
      ],
      correct: 1
    },
    {
      id: 49,
      question: "What is the correct escalation path when you need a new capability?",
      options: [
        "Plugin → MCP Server → Skill",
        "Skill → MCP Server → Plugin (bundle first, then native)",
        "MCP Server → Skill → Plugin",
        "Native Plugin → Bundle Plugin → Skill"
      ],
      correct: 1
    },
    {
      id: 50,
      question: "TRICKY — Your agent needs to ACCESS an external API (like a booking service). Which extension type should you use?",
      options: [
        "Skill (SKILL.md)",
        "Native Plugin (TypeScript)",
        "MCP Server",
        "Bundle Plugin"
      ],
      correct: 2
    },
    {
      id: 51,
      question: "What is the difference between a Native Plugin and a Bundle Plugin?",
      options: [
        "Native runs on mobile; Bundle runs on desktop",
        "Native is TypeScript code inside gateway process; Bundle is file-based with no code required",
        "They are identical formats",
        "Bundle requires paid ClawHub subscription"
      ],
      correct: 1
    },
    {
      id: 52,
      question: "After installing a skill from ClawHub, you test it but the agent doesn't use it. What did you forget?",
      options: [
        "API key setup",
        "Restart the gateway — skills are snapshotted at session start",
        "Enable it in tool profiles",
        "Write custom SOUL.md instructions"
      ],
      correct: 1
    },
    {
      id: 53,
      question: "ClawHub is best described as:",
      options: [
        "OpenClaw's admin dashboard",
        "A public registry for Agent Skills bundles — like npm for agent capabilities",
        "A cloud hosting provider",
        "A model provider marketplace"
      ],
      correct: 1
    },
    // LESSON 7: Connect External Tools (MCP)
    {
      id: 54,
      question: "An MCP server is configured but the agent responds with training data instead of live tool results. No error in chat. What should you check FIRST?",
      options: [
        "Restart WhatsApp",
        "Check the gateway log — MCP failures are silent in chat",
        "Change the model provider",
        "Reinstall OpenClaw"
      ],
      correct: 1
    },
    {
      id: 55,
      question: "What is the difference between gateway-level and workspace-level MCP config?",
      options: [
        "Gateway config is faster; workspace config is slower",
        "Gateway-level shares tools across all agents; workspace-level scopes tools to one agent",
        "They are identical",
        "Workspace-level requires paid subscription"
      ],
      correct: 1
    },
    {
      id: 56,
      question: "TRICKY — You change an MCP server config but the agent still uses old behavior. What did you forget?",
      options: [
        "Update SOUL.md",
        "Restart the gateway — config changes require restart to take effect",
        "Re-authorize WhatsApp",
        "Clear MEMORY.md"
      ],
      correct: 1
    },
    {
      id: 57,
      question: "Which transport should you use for a LOCAL MCP server (running on your machine)?",
      options: [
        "SSE (Server-Sent Events)",
        "streamable-http",
        "stdio (command + args)",
        "WebSocket"
      ],
      correct: 2
    },
    {
      id: 58,
      question: "What is MCP's most counterintuitive behavior?",
      options: [
        "It costs double tokens",
        "It requires restart after every use",
        "Failures produce NO error in chat — agent responds normally without the tools",
        "It only works on paid plans"
      ],
      correct: 2
    },
    // LESSON 8: Make It Proactive
    {
      id: 59,
      question: "You want 5 daily checks: email, calendar, tasks, weather, and news. You create 5 separate cron jobs running every 30 minutes. What is the cost problem?",
      options: [
        "Cron jobs cannot run in parallel",
        "The gateway blocks more than 3 cron jobs",
        "Each cron creates a full agent session with token costs — 240 turns/day vs 48 with heartbeat",
        "Cron output cannot be delivered to channels"
      ],
      correct: 2
    },
    {
      id: 60,
      question: "What does HEARTBEAT_OK do when the agent sends it?",
      options: [
        "Triggers an alert to the operator",
        "The gateway drops the message silently — nothing reaches your phone",
        "Saves the heartbeat result to memory",
        "Restarts the gateway"
      ],
      correct: 1
    },
    {
      id: 61,
      question: "TRICKY — What is the difference between a heartbeat and a cron job?",
      options: [
        "Heartbeats are paid; cron jobs are free",
        "Heartbeats are periodic awareness checks (batch multiple items); cron jobs fire at exact times for precise delivery",
        "They are the same thing",
        "Cron jobs only work on VPS"
      ],
      correct: 1
    },
    {
      id: 62,
      question: "Why should quiet hours be enforced at BOTH prompt level AND infrastructure level?",
      options: [
        "One method is always enough",
        "Defense in depth — the model might ignore prompt instructions, but config cannot be overridden by the model",
        "Infrastructure level doesn't work for WhatsApp",
        "Prompt level is only for advanced users"
      ],
      correct: 1
    },
    {
      id: 63,
      question: "In the Agent OS expanded mental model, heartbeat + cron maps to which OS concept?",
      options: [
        "Kernel",
        "Device drivers",
        "Process scheduler / Cron daemon",
        "Network stack"
      ],
      correct: 2
    },
    // LESSON 9: Give It a Voice
    {
      id: 64,
      question: "You enable messages.tts.auto = always. After a few messages you get annoyed. Why?",
      options: [
        "Voice quality is poor",
        "Every reply becomes audio — even one-word confirmations and reference numbers you need to copy",
        "WhatsApp doesn't support audio",
        "The model speaks too slowly"
      ],
      correct: 1
    },
    {
      id: 65,
      question: "Which TTS mode is the recommended production default?",
      options: [
        "always",
        "tagged",
        "inbound",
        "off"
      ],
      correct: 2
    },
    {
      id: 66,
      question: "In tagged mode, how does the agent decide when to use voice?",
      options: [
        "Randomly",
        "Based on message length",
        "By including [[tts]] tag in its reply based on SOUL.md instructions",
        "Based on time of day"
      ],
      correct: 2
    },
    {
      id: 67,
      question: "What is the 1,500 character limit related to in TTS?",
      options: [
        "Maximum WhatsApp message length",
        "Replies longer than this are auto-summarized or skipped before voice synthesis",
        "Maximum SOUL.md instruction length",
        "Gateway buffer size"
      ],
      correct: 1
    },
    {
      id: 68,
      question: "Which TTS provider requires NO API key and is recommended to start with?",
      options: [
        "OpenAI TTS",
        "ElevenLabs",
        "Microsoft Edge TTS",
        "MiniMax"
      ],
      correct: 2
    },
    // LESSON 10: Add a Second Agent
    {
      id: 69,
      question: "You update IDENTITY.md for your helper agent and immediately test it. It still uses the old name. Why?",
      options: [
        "IDENTITY.md was not saved correctly",
        "Identity changes take effect on new sessions only — use /new to start a fresh session",
        "Helper agents don't support IDENTITY.md",
        "You need to reinstall the agent"
      ],
      correct: 1
    },
    {
      id: 70,
      question: "What is the difference between gateway config and workspace config in multi-agent setup?",
      options: [
        "They are identical",
        "Gateway config (plugins, TTS, model) is shared across all agents; workspace config (SOUL.md, skills) is per-agent",
        "Gateway config is read-only",
        "Workspace config requires paid subscription"
      ],
      correct: 1
    },
    {
      id: 71,
      question: "TRICKY — You bind helper-agent to WhatsApp. Now ALL WhatsApp messages go to helper-agent. How do you make specific phone numbers go to main agent instead?",
      options: [
        "Delete helper-agent",
        "Add per-sender routing rules in openclaw.json with peer.id matching",
        "Change the tool profile",
        "Create a new WhatsApp number"
      ],
      correct: 1
    },
    {
      id: 72,
      question: "What happens to messages that don't match any agent binding?",
      options: [
        "They are dropped silently",
        "They go to the main agent as fallback",
        "They trigger an error",
        "They are queued indefinitely"
      ],
      correct: 1
    },
    // LESSON 11: Connecting Google Workspace
    {
      id: 73,
      question: "You connect Gmail via gog with full scope. What security principle should you apply?",
      options: [
        "Full access is always better",
        "Least privilege — grant only the OAuth scopes the agent actually needs",
        "Read-only access is completely safe",
        "Security settings don't matter for personal accounts"
      ],
      correct: 1
    },
    {
      id: 74,
      question: "TRICKY — You grant read-only Gmail access. Is this completely safe?",
      options: [
        "Yes, read-only means the agent cannot do anything harmful",
        "No — read-only Gmail means the agent can see every email including password resets and financial statements",
        "Yes, because it cannot send emails",
        "Yes, read-only is always the safest setting"
      ],
      correct: 1
    },
    {
      id: 75,
      question: "What is the OAuth pattern that repeats for every SaaS integration?",
      options: [
        "Download → Install → Run",
        "Register credentials → Authorize access → Scope permissions",
        "Configure → Test → Deploy",
        "Generate key → Paste → Restart"
      ],
      correct: 1
    },
    {
      id: 76,
      question: "After adding any integration with real credentials, what command should you run?",
      options: [
        "openclaw gateway restart",
        "openclaw doctor",
        "openclaw secrets audit",
        "openclaw channels status"
      ],
      correct: 2
    },
    // LESSON 12: Orchestrate Other Agents
    {
      id: 77,
      question: "You ask agent to use sessions_spawn. It refuses saying 'I don't have permission.' What is actually happening?",
      options: [
        "The tool doesn't exist",
        "You need to pay for orchestration features",
        "The free-tier model is hallucinating restrictions — the tool works, the model is reluctant",
        "The gateway is misconfigured"
      ],
      correct: 2
    },
    {
      id: 78,
      question: "You have maxConcurrent=4 and 7 customers message at the same second. Customer 7 waits how long approximately?",
      options: [
        "30 seconds",
        "The time it takes for the fastest of the first 4 to finish (~3-8 seconds)",
        "No wait — all 7 process simultaneously",
        "Customer 7's message is dropped"
      ],
      correct: 1
    },
    {
      id: 79,
      question: "A customer sends 3 messages in rapid succession. In their session lane, what happens?",
      options: [
        "All 3 process simultaneously",
        "Only the last message is processed",
        "First processes, then second and third queue sequentially to maintain conversation order",
        "All 3 are merged into one message"
      ],
      correct: 2
    },
    {
      id: 80,
      question: "TRICKY — You build a requireApproval hook for exec tool. A customer triggers an MCP tool that contacts an external API. Does the approval fire?",
      options: [
        "Yes, all tools go through the hook",
        "No — MCP tools bypass the before_tool_call hook pipeline",
        "Yes, but only for external APIs",
        "Only if the MCP server is remote"
      ],
      correct: 1
    },
    {
      id: 81,
      question: "What is the key difference between sessions_spawn and sessions_yield?",
      options: [
        "spawn costs more tokens",
        "spawn blocks until subagent finishes; yield responds immediately with 'I'll get back to you'",
        "yield only works on Telegram",
        "They are identical"
      ],
      correct: 1
    },
    // LESSON 13: Gate Your Agent's Tools
    {
      id: 82,
      question: "What is the PRIMARY purpose of Tier 2 in the OpenClaw safety model?",
      options: [
        "Block all tool usage",
        "Provide kernel-level isolation",
        "Require human approval before tool execution",
        "Replace tool profiles entirely"
      ],
      correct: 2
    },
    {
      id: 83,
      question: "What happens if a plugin uses api.registerHook() instead of api.on()?",
      options: [
        "It runs faster",
        "It triggers warnings",
        "It silently fails without execution",
        "It auto-fixes itself"
      ],
      correct: 2
    },
    {
      id: 84,
      question: "The correct three-tier security model order is:",
      options: [
        "Tool profiles → requireApproval hooks → NemoClaw out-of-process sandbox",
        "Security audit → password rotation → firewall configuration",
        "NemoClaw sandbox → requireApproval hooks → tool profiles",
        "Encryption at rest → encryption in transit → access control lists"
      ],
      correct: 0
    },
    {
      id: 85,
      question: "What is the default timeout behavior if no approval is received within 120 seconds?",
      options: [
        "allow",
        "retry",
        "deny (fail closed)",
        "ignore"
      ],
      correct: 2
    },
    {
      id: 86,
      question: "What is the biggest risk of silent failure in plugins?",
      options: [
        "System crash",
        "No error message but no execution either — code compiles, plugin loads, nothing happens",
        "Slow performance",
        "Memory leak"
      ],
      correct: 1
    },
    {
      id: 87,
      question: "What is the correct mental model for OpenClaw plugin development?",
      options: [
        "Write code manually",
        "Specify constraints precisely and let AI build the code",
        "Disable all tools",
        "Hardcode all permissions"
      ],
      correct: 1
    },
    {
      id: 88,
      question: "The tool's DISPLAY name is 'bash.' What is the INTERNAL name used in hooks?",
      options: [
        "bash",
        "shell",
        "exec",
        "run"
      ],
      correct: 2
    },
    {
      id: 89,
      question: "The Activation Dance is first taught in Lesson 2. By Lesson 13, what has changed?",
      options: [
        "The student writes a plugin that others activate through the same dance",
        "The student disables the dance for faster development",
        "The student replaces it with direct API calls",
        "The student automates it with a shell script"
      ],
      correct: 0
    },
    // LESSON 14: Deploy to Production
    {
      id: 90,
      question: "What is the main purpose of deploying an AI agent to a VPS?",
      options: [
        "Increase coding speed",
        "Enable 24/7 availability — agent runs even when laptop is closed",
        "Reduce memory usage",
        "Replace SSH"
      ],
      correct: 1
    },
    {
      id: 91,
      question: "What does SSH tunneling primarily provide?",
      options: [
        "UI rendering",
        "Encrypted and secure access to the gateway",
        "Database storage",
        "Load balancing"
      ],
      correct: 1
    },
    {
      id: 92,
      question: "Why is the gateway bound to 127.0.0.1?",
      options: [
        "For performance optimization",
        "To enable public access",
        "To prevent direct external access — nothing external can reach it",
        "To increase RAM usage"
      ],
      correct: 2
    },
    {
      id: 93,
      question: "Which component acts as authentication in this system?",
      options: [
        "TLS certificate",
        "SSH key",
        "Firewall rules",
        "DNS record"
      ],
      correct: 1
    },
    {
      id: 94,
      question: "What happens if allowedOrigins is not configured correctly when using port 19000?",
      options: [
        "Faster response",
        "UI page loads but no data appears",
        "Server crashes",
        "SSH fails"
      ],
      correct: 1
    },
    {
      id: 95,
      question: "Which deployment path is best for beginners?",
      options: [
        "VPS Docker",
        "VPS Native",
        "Managed Server (Alibaba Cloud)",
        "Kubernetes cluster"
      ],
      correct: 2
    },
    {
      id: 96,
      question: "What is the biggest cost driver in production AI systems?",
      options: [
        "VPS hardware ($5/month)",
        "Model/API usage ($50-100/month)",
        "SSH tunneling",
        "DNS configuration"
      ],
      correct: 1
    },
    {
      id: 97,
      question: "The gateway binds to 0.0.0.0 without a gateway auth token. What security risk does this create?",
      options: [
        "Anyone on the network can access the agent's admin interface",
        "The agent's responses become slower due to network overhead",
        "The WhatsApp connection drops due to port conflicts",
        "The agent loses access to its workspace files"
      ],
      correct: 0
    },
    {
      id: 98,
      question: "For production, which DM policy is recommended?",
      options: [
        "open",
        "pairing",
        "allowlist",
        "disabled"
      ],
      correct: 2
    },
    {
      id: 99,
      question: "How many commands does it take to reach zero critical security findings after openclaw security audit?",
      options: [
        "Two commands: groupPolicy allowlist + credentials chmod 700",
        "One command that auto-fixes everything",
        "Five commands covering each security layer",
        "Zero commands because criticals resolve on restart"
      ],
      correct: 0
    },
    {
      id: 100,
      question: "The setup.sh script's core flow stripped to essentials is:",
      options: [
        "Build image → run wizard → pin config → start gateway",
        "Pull image → expose ports → set DNS → start monitoring",
        "Clone repo → install dependencies → compile source → run tests",
        "Provision VPS → install Docker → configure firewall → deploy container"
      ],
      correct: 0
    },
    // LESSON 15: Isolate with NemoClaw
    {
      id: 101,
      question: "What is the main security improvement in NemoClaw over Docker Compose?",
      options: [
        "Faster execution",
        "Better UI",
        "API keys moved to a separate process/pod that the agent cannot access",
        "Reduced RAM usage"
      ],
      correct: 2
    },
    {
      id: 102,
      question: "What is the role of the Privacy Router?",
      options: [
        "Run AI agent",
        "Store logs",
        "Hold API keys and inject them outside the sandbox when forwarding inference requests",
        "Execute shell commands"
      ],
      correct: 2
    },
    {
      id: 103,
      question: "What happens if an attacker runs printenv inside the NemoClaw sandbox?",
      options: [
        "API keys are exposed",
        "System crashes",
        "No API keys are found — they don't exist in the sandbox environment",
        "Router is compromised"
      ],
      correct: 2
    },
    {
      id: 104,
      question: "Which pod in the 4-pod architecture contains the API keys?",
      options: [
        "Gateway",
        "Sandbox",
        "Policy Engine",
        "Privacy Router"
      ],
      correct: 3
    },
    {
      id: 105,
      question: "What is the main difference between in-process and out-of-process security?",
      options: [
        "Speed difference",
        "UI design difference",
        "In-process = agent promises to follow rules; out-of-process = agent physically cannot break rules",
        "Database type difference"
      ],
      correct: 2
    },
    {
      id: 106,
      question: "Which Linux kernel feature is used to restrict system calls in NemoClaw?",
      options: [
        "DNS",
        "seccomp",
        "SSH",
        "Docker Compose"
      ],
      correct: 1
    },
    {
      id: 107,
      question: "What is the biggest REMAINING risk even in NemoClaw?",
      options: [
        "API key theft",
        "Model failure",
        "Resource abuse — attacker can make excessive inference calls through inference.local",
        "SSH failure"
      ],
      correct: 2
    },
    {
      id: 108,
      question: "When should you upgrade from Docker Compose to NemoClaw?",
      options: [
        "When you need more speed",
        "When trust model changes — customers, second operators, or compliance requirements enter",
        "When the VPS runs out of storage",
        "After 6 months of usage"
      ],
      correct: 1
    },
    {
      id: 109,
      question: "The agent calls inference.local with no credentials. Who adds the real API key?",
      options: [
        "The gateway pod",
        "The sandbox pod",
        "The privacy router — it intercepts the call and adds the Authorization header",
        "The policy engine"
      ],
      correct: 2
    },
    {
      id: 110,
      question: "What is NemoClaw exactly?",
      options: [
        "A competitor that replaces OpenClaw",
        "A newer version of OpenClaw with better performance",
        "OpenClaw + OpenShell + Privacy Router + Policy Engine — a deployment pattern, not a new product",
        "A mobile app for managing OpenClaw agents"
      ],
      correct: 2
    },
    // BONUS — Cross-Lesson Scenario Questions
    {
      id: 111,
      question: "Your custom plugin has plugins.load.paths configured for discovery but NOT plugins.entries.<id>.enabled. What happens?",
      options: [
        "Plugin loads and works immediately",
        "Gateway crashes with missing configuration error",
        "Plugin is discovered but never activates — with no error message",
        "Plugin loads in read-only safe mode"
      ],
      correct: 2
    },
    {
      id: 112,
      question: "You rotate Anthropic API key, set new environment variable. Agent still uses old key. What should you do?",
      options: [
        "Restart the gateway process",
        "Reinstall OpenClaw from scratch",
        "Clear WhatsApp session cache",
        "Delete auth-profiles.json and reconfigure"
      ],
      correct: 3
    },
    {
      id: 113,
      question: "Your plugin uses api.registerHook('before_tool_call', handler). It compiles. Hook never fires. What should you use instead?",
      options: [
        "api.addHook('before_tool_call', handler)",
        "api.registerHook with internal.enabled config flag",
        "api.on('before_tool_call', handler) — the typed hook system",
        "api.createHook('before_tool_call', handler)"
      ],
      correct: 2
    },
    {
      id: 114,
      question: "After deploying to VPS, you access Control UI via SSH tunnel on port 19000. Page loads but no data shows. Most likely cause?",
      options: [
        "Gateway is in crash loop",
        "SSH tunnel not forwarding correctly",
        "Gateway's allowedOrigins does not include localhost:19000",
        "Docker container needs to expose port 19000"
      ],
      correct: 2
    },
    {
      id: 115,
      question: "In Agent OS mental model, what maps to the 'cron daemon'?",
      options: [
        "Gateway process",
        "Plugin system",
        "Session manager",
        "Heartbeat scheduler that triggers periodic agent actions"
      ],
      correct: 3
    },
    {
      id: 116,
      question: "Your agent has zero critical security findings and messaging tool profile. A user sends a prompt trying to make agent reconfigure itself. Can this work?",
      options: [
        "No, messaging profile completely prevents all reconfiguration",
        "Yes, if the prompt bypasses tool profiles through a plugin vulnerability",
        "No, security audit locks all configuration permanently",
        "Yes, but only with admin channel permissions"
      ],
      correct: 1
    },
    {
      id: 117,
      question: "What is the relationship between NemoClaw and OpenClaw?",
      options: [
        "NemoClaw is a competitor",
        "NemoClaw is a newer version",
        "NemoClaw is a deployment pattern wrapping OpenClaw in NVIDIA's OpenShell sandbox",
        "NemoClaw is a mobile app"
      ],
      correct: 2
    },
    {
      id: 118,
      question: "MOST IMPORTANT — In the Agent OS analogy, what is the correct mapping? Gateway=?, Workspace files=?, Plugins=?, Sessions=?",
      options: [
        "Gateway=Firmware, Workspace=Kernel, Plugins=Process Memory, Sessions=Device Drivers",
        "Gateway=Kernel, Workspace=Firmware, Plugins=Device Drivers, Sessions=Process Memory",
        "Gateway=Device Drivers, Workspace=Process Memory, Plugins=Kernel, Sessions=Firmware",
        "All are equivalent to the Kernel"
      ],
      correct: 1
    }
  ]
};
