import { Chapter } from "./index";

export const chapter57: Chapter = {
  id: "57",
  title: "OpenClaw — Building MCP Servers",
  description: "Complete MCQ set: Knowledge vs Ability, Transport Decision, Spec and Build, Connect to OpenClaw, and Scenario-Based Questions on MCP server development with mcp-builder skill.",
  topics: 5,
  questions: [
    // SET 1: Knowledge vs Ability
    {
      id: 1,
      question: "Your agent can answer questions but fails to retrieve real-time student data from a database. What is the root limitation?",
      options: [
        "The agent lacks memory persistence",
        "The agent lacks external action capability",
        "The agent lacks scheduling ability",
        "The agent lacks language understanding"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "In the Agent OS mental model, what role does an MCP server primarily play?",
      options: [
        "Enhances conversation fluency",
        "Stores long-term memory",
        "Provides tools for real-world interaction",
        "Manages session history"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "You ask your agent to 'verify assignment submission,' but it gives a generic answer instead of checking the system. What is missing?",
      options: [
        "Plugin hook",
        "MCP server tool",
        "Memory file",
        "Gateway restart"
      ],
      correct: 1
    },
    {
      id: 4,
      question: "Why is the mcp-builder skill critical in this chapter?",
      options: [
        "It replaces the agent's brain",
        "It allows manual coding of APIs",
        "It automates MCP server creation via natural language",
        "It stores user preferences"
      ],
      correct: 2
    },
    {
      id: 5,
      question: "Which step ensures that the MCP tool behaves correctly in real-world usage?",
      options: [
        "Describe",
        "Steer",
        "Verify",
        "Install"
      ],
      correct: 2
    },
    {
      id: 6,
      question: "TRICKY — An agent successfully builds an MCP tool but fails during WhatsApp testing. Which phase was most likely incomplete?",
      options: [
        "Describe",
        "Steer",
        "Verify",
        "Memory"
      ],
      correct: 2
    },
    {
      id: 7,
      question: "What fundamentally changes after integrating an MCP server into an agent?",
      options: [
        "The agent becomes faster in conversation",
        "The agent gains persistent memory",
        "The agent gains the ability to act on external systems",
        "The agent reduces token usage"
      ],
      correct: 2
    },
    {
      id: 8,
      question: "SCENARIO — You describe a tool vaguely, and the generated MCP server does not meet requirements. Which step should you revisit?",
      options: [
        "Verify",
        "Steer",
        "Install",
        "Connect"
      ],
      correct: 1
    },
    {
      id: 9,
      question: "Which statement best describes the 'Describe → Steer → Verify' workflow?",
      options: [
        "A debugging pipeline for runtime errors",
        "A structured approach to building and refining tools",
        "A memory optimization strategy",
        "A scheduling mechanism"
      ],
      correct: 1
    },
    {
      id: 10,
      question: "MOST IMPORTANT — Why can't an agent perform API calls without MCP?",
      options: [
        "APIs require memory access",
        "Agents are restricted to internal capabilities without external tools",
        "APIs are handled by plugins only",
        "Agents cannot process JSON"
      ],
      correct: 1
    },
    {
      id: 11,
      question: "An agent explains database schemas perfectly but cannot retrieve a specific user's record. What is the core issue?",
      options: [
        "Lack of memory persistence",
        "Lack of training data",
        "Lack of execution capability",
        "Lack of prompt engineering"
      ],
      correct: 2
    },
    {
      id: 12,
      question: "Why does training data fail to answer real-time questions like 'current time in Tokyo'?",
      options: [
        "It lacks language understanding",
        "It contains outdated or generalized knowledge",
        "It cannot process timezones",
        "It lacks API structure"
      ],
      correct: 1
    },
    {
      id: 13,
      question: "TRICKY — After adding a time MCP server, the agent gives different answers for the same timezone question. Why?",
      options: [
        "The agent is inconsistent",
        "The tool overrides training data with live facts",
        "Memory is corrupted",
        "The prompt changed"
      ],
      correct: 1
    },
    {
      id: 14,
      question: "Which statement best defines the limitation of knowledge-only agents?",
      options: [
        "They cannot respond to users",
        "They rely solely on static understanding without real-world access",
        "They cannot store memory",
        "They cannot follow schedules"
      ],
      correct: 1
    },
    {
      id: 15,
      question: "What changes when an agent moves from knowledge to ability?",
      options: [
        "It becomes faster",
        "It gains real-world execution capability",
        "It reduces token usage",
        "It improves UI"
      ],
      correct: 1
    },
    {
      id: 16,
      question: "SCENARIO — Your agent apologizes instead of verifying assignment submission. What is missing?",
      options: [
        "Better prompting",
        "Memory file",
        "MCP tool integration",
        "Restart"
      ],
      correct: 2
    },
    {
      id: 17,
      question: "In MCP architecture, what remains the same between producer and consumer?",
      options: [
        "Responsibilities",
        "Protocol",
        "Tools",
        "Codebase"
      ],
      correct: 1
    },
    {
      id: 18,
      question: "VERY TRICKY — A developer connects an MCP server successfully but does not understand how tools were designed. What role are they playing?",
      options: [
        "Producer",
        "Consumer",
        "Builder",
        "Verifier"
      ],
      correct: 1
    },
    {
      id: 19,
      question: "What is the primary responsibility shift when becoming an MCP producer?",
      options: [
        "From coding to prompting",
        "From configuration to design",
        "From memory to execution",
        "From UI to backend"
      ],
      correct: 1
    },
    {
      id: 20,
      question: "EXAM KILLER — Why is 'knowledge vs ability' the central concept of this chapter?",
      options: [
        "It explains memory systems",
        "It defines when tools are required instead of better prompts",
        "It improves UI design",
        "It reduces system cost"
      ],
      correct: 1
    },
    // SET 2: Transport Decision
    {
      id: 21,
      question: "Why must the transport decision be made before building an MCP server?",
      options: [
        "To reduce token usage",
        "To avoid reworking server architecture later",
        "To improve UI design",
        "To increase memory capacity"
      ],
      correct: 1
    },
    {
      id: 22,
      question: "Which transport restricts the MCP server to a single machine?",
      options: [
        "SSE",
        "streamable-http",
        "stdio",
        "WebSocket"
      ],
      correct: 2
    },
    {
      id: 23,
      question: "TRICKY — A developer wants global access and minimal complexity. Which transport should they choose?",
      options: [
        "stdio",
        "SSE",
        "streamable-http stateless",
        "Stateful HTTP"
      ],
      correct: 2
    },
    {
      id: 24,
      question: "What is the defining property of a stateless system?",
      options: [
        "It stores session data permanently",
        "Each request is independent and self-contained",
        "It requires memory files",
        "It uses local execution only"
      ],
      correct: 1
    },
    {
      id: 25,
      question: "SCENARIO — Your MCP server fails because sessions expire mid-request. What design choice likely caused this?",
      options: [
        "Stateless HTTP",
        "stdio",
        "Stateful transport",
        "Missing CLAUDE.md"
      ],
      correct: 2
    },
    {
      id: 26,
      question: "Why is stateless HTTP preferred for most MCP tools?",
      options: [
        "It increases intelligence",
        "It reduces code complexity and bugs",
        "It improves UI",
        "It stores long-term memory"
      ],
      correct: 1
    },
    {
      id: 27,
      question: "VERY TRICKY — If the agent already manages conversation context, what should the MCP server avoid?",
      options: [
        "API calls",
        "Stateless design",
        "Session tracking",
        "HTTP transport"
      ],
      correct: 2
    },
    {
      id: 28,
      question: "What is the role of CLAUDE.md in transport selection?",
      options: [
        "It stores API keys",
        "It enforces architectural decisions for every future session",
        "It runs the server",
        "It manages sessions"
      ],
      correct: 1
    },
    {
      id: 29,
      question: "SCENARIO — A developer builds an MCP server using stdio but later needs remote access. What is the consequence?",
      options: [
        "No issue",
        "Minor config change",
        "Full redesign required",
        "Only restart needed"
      ],
      correct: 2
    },
    {
      id: 30,
      question: "EXAM KILLER — Which statement best explains why stateless HTTP aligns with MCP tool design?",
      options: [
        "MCP tools require session persistence",
        "Each tool call is independent and self-contained",
        "MCP servers store long-term memory",
        "HTTP is faster than all protocols"
      ],
      correct: 1
    },
    // SET 3: Spec and Build
    {
      id: 31,
      question: "Why is 'spec before build' critical in MCP development?",
      options: [
        "To reduce token usage",
        "To validate design before implementation",
        "To improve UI",
        "To speed up execution"
      ],
      correct: 1
    },
    {
      id: 32,
      question: "What is the primary role of a tool description?",
      options: [
        "Define code structure",
        "Help the agent decide when to call the tool",
        "Store memory",
        "Improve performance"
      ],
      correct: 1
    },
    {
      id: 33,
      question: "TRICKY — An agent frequently calls the wrong tool despite correct inputs. What is the most likely issue?",
      options: [
        "Bad API",
        "Poor tool description",
        "Missing memory",
        "Server crash"
      ],
      correct: 1
    },
    {
      id: 34,
      question: "Why should implementation details be excluded from the initial prompt?",
      options: [
        "They confuse the agent",
        "They are handled by Claude Code and skills",
        "They increase latency",
        "They break MCP protocol"
      ],
      correct: 1
    },
    {
      id: 35,
      question: "SCENARIO — You receive a spec where the tool description is vague. What should you do?",
      options: [
        "Build immediately",
        "Restart the server",
        "Steer and refine the description",
        "Ignore it"
      ],
      correct: 2
    },
    {
      id: 36,
      question: "What is the developer's main responsibility in the MCP workflow?",
      options: [
        "Writing code",
        "Managing servers",
        "Defining requirements and design",
        "Running tests"
      ],
      correct: 2
    },
    {
      id: 37,
      question: "VERY TRICKY — Why is a vague tool description dangerous in a multi-tool system?",
      options: [
        "It slows execution",
        "It causes incorrect tool selection by the agent",
        "It increases memory usage",
        "It breaks APIs"
      ],
      correct: 1
    },
    {
      id: 38,
      question: "Which step ensures that the MCP tool actually works correctly?",
      options: [
        "Describe",
        "Steer",
        "Verify",
        "Install"
      ],
      correct: 2
    },
    {
      id: 39,
      question: "SCENARIO — A tool works correctly but lacks useful output fields like timestamps. What phase was insufficient?",
      options: [
        "Describe",
        "Steer",
        "Verify",
        "Connect"
      ],
      correct: 1
    },
    {
      id: 40,
      question: "EXAM KILLER — What is the biggest shift introduced by the mcp-builder workflow?",
      options: [
        "From coding to debugging",
        "From manual coding to spec-driven development",
        "From APIs to UI",
        "From memory to scheduling"
      ],
      correct: 1
    },
    // SET 4: Connect to OpenClaw
    {
      id: 41,
      question: "Why is starting the MCP server before connection necessary?",
      options: [
        "To load memory",
        "To allow OpenClaw to communicate with it",
        "To initialize UI",
        "To reduce latency"
      ],
      correct: 1
    },
    {
      id: 42,
      question: "What is the purpose of the openclaw gateway restart command after adding MCP?",
      options: [
        "Restart server",
        "Reload MCP configurations into the gateway",
        "Clear memory",
        "Reset agent"
      ],
      correct: 1
    },
    {
      id: 43,
      question: "TRICKY — Your MCP server is correctly built but not responding in WhatsApp. What is the most likely issue?",
      options: [
        "Tool description",
        "Server not running or gateway not restarted",
        "Memory issue",
        "Prompt issue"
      ],
      correct: 1
    },
    {
      id: 44,
      question: "What does the tool badge in the dashboard confirm?",
      options: [
        "The agent responded correctly",
        "The tool was actually executed",
        "The UI loaded",
        "The server started"
      ],
      correct: 1
    },
    {
      id: 45,
      question: "SCENARIO — You receive a correct-looking response but no tool badge appears. What does this indicate?",
      options: [
        "Tool executed successfully",
        "Agent generated response without actually calling the tool",
        "Server crashed",
        "Gateway restarted"
      ],
      correct: 1
    },
    {
      id: 46,
      question: "What is the key similarity between connecting a time server and a custom MCP server?",
      options: [
        "Same codebase",
        "Same protocol and connection pattern",
        "Same UI",
        "Same data"
      ],
      correct: 1
    },
    {
      id: 47,
      question: "VERY TRICKY — A developer enters the correct URL but forgets /mcp at the end. What happens?",
      options: [
        "Explicit error appears",
        "Silent failure — no tool usage, no error message",
        "Server crashes",
        "Agent stops working"
      ],
      correct: 1
    },
    {
      id: 48,
      question: "Why are two terminals required when testing MCP locally?",
      options: [
        "Performance improvement",
        "One for running the server, one for OpenClaw commands",
        "Memory separation",
        "UI rendering"
      ],
      correct: 1
    },
    {
      id: 49,
      question: "SCENARIO — Your server appears in mcp list but tools are not used. What should you check next?",
      options: [
        "UI",
        "Tool description and dashboard logs",
        "Memory",
        "API keys"
      ],
      correct: 1
    },
    {
      id: 50,
      question: "EXAM KILLER — What proves the full end-to-end MCP workflow is functioning?",
      options: [
        "Server logs",
        "WhatsApp response alone",
        "Tool badge in dashboard confirming tool execution",
        "Command output"
      ],
      correct: 2
    },
    // SET 5: Scenario-Based Deep Questions
    {
      id: 51,
      question: "Maya says: 'I was a consumer when I connected the time server. Now I am a producer.' What new responsibility does being a producer add?",
      options: [
        "Learning every section of the MCP protocol specification from scratch before registering tools",
        "Designing what tools to expose, what inputs they accept, and how errors are handled",
        "Writing a custom gateway to replace the OpenClaw gateway before the first tool ships",
        "Purchasing a commercial server hosting plan before building anything or running tests"
      ],
      correct: 1
    },
    {
      id: 52,
      question: "Diego has two tools: register_learner and get_learner_progress. Both have vague, overlapping descriptions. What problem will this cause?",
      options: [
        "The transport will switch from stateless to stateful when both tools share overlapping descriptions",
        "The server will crash when both tools are loaded because FastMCP rejects ambiguous descriptions",
        "The agent will not know which tool to call and may select the wrong one",
        "Only the first tool loaded will remain available and the second gets silently dropped"
      ],
      correct: 2
    },
    {
      id: 53,
      question: "James describes stateless transport: 'Every label has the complete destination address. The warehouse does not need to remember which dock you used last time.' What concept does this illustrate?",
      options: [
        "Labels are encrypted end to end for security across the shipping network",
        "The server stores every label and scan record for future auditing and tracing",
        "Each request is self-contained with all the information the server needs",
        "Shipping requires a persistent connection between sender and warehouse for the whole trip"
      ],
      correct: 2
    },
    {
      id: 54,
      question: "The describe-steer-verify cycle maps to an earlier pattern from Part 1. Which one?",
      options: [
        "Spec-driven development from Chapter 16: own the requirements, let the agent own the code",
        "The OODA loop: observe, orient, decide, act",
        "The agile sprint cycle: plan, develop, test, release",
        "The waterfall model: requirements, design, implementation, testing"
      ],
      correct: 0
    },
    {
      id: 55,
      question: "MCP Inspector lets you interact with the server manually. When is it most useful?",
      options: [
        "It replaces the need for uv run pytest on the generated test suite",
        "It is required to be running before any pytest suite can execute",
        "When you want to call individual tools and see inputs/outputs before connecting to the agent",
        "It must be running before openclaw mcp set will accept the server configuration"
      ],
      correct: 2
    },
    {
      id: 56,
      question: "After verifying from WhatsApp, James takes a screenshot. Emma then mentions Chapter 58. What does this suggest about the build cycle?",
      options: [
        "The FastMCP server from Chapter 57 will be discarded and replaced at the start of Chapter 58",
        "Chapter 58 introduces a completely different server architecture and new transport layer",
        "The describe-build-test-connect-verify cycle from Lessons 2 through 5 repeats for every new tool and server",
        "Chapter 58 requires learning a new tool protocol before existing server code can be reused"
      ],
      correct: 2
    },
    {
      id: 57,
      question: "Anika runs the install command for mcp-builder skill. Where do the skill files end up?",
      options: [
        "A global Claude Code plugins folder in her home directory, shared across every project",
        ".claude/skills/mcp-builder/ inside her project directory",
        "The node_modules directory, alongside other npm dependencies",
        "A temporary cache that reloads each Claude Code session from scratch"
      ],
      correct: 1
    },
    {
      id: 58,
      question: "The dashboard shows a tool badge for register_learner. This badge proves four things happened in sequence. What are they?",
      options: [
        "MCP server started, tool registered with gateway, test suite passed, connection verified",
        "User typed the message, gateway processed it, dashboard logged the event, push notification fired",
        "Message received from WhatsApp, agent selected tool, tool executed on MCP server, result returned through gateway",
        "WhatsApp channel connected, mcp-builder skill loaded, CLAUDE.md was read, tool compiled"
      ],
      correct: 2
    },
    {
      id: 59,
      question: "Priya asks 'What time is it in Tokyo?' Before MCP: 'Japan is UTC+9, so likely around 2pm.' After MCP: 'It is 2:07:43 PM JST.' What changed?",
      options: [
        "The system prompt was rewritten so the agent hedges less on numeric answers",
        "The agent received a training data refresh covering Japanese timezone shifts",
        "The source shifted from training data (the rule) to a live tool (the fact)",
        "The context window was expanded so the agent can recall real-time weather data"
      ],
      correct: 2
    },
    {
      id: 60,
      question: "Noor reviews Claude Code's spec and notices the tool description is too vague. What should she do?",
      options: [
        "Start over with a completely new project and fresh mcp-builder skill installation",
        "Accept the spec as-is and fix the description manually in the generated code later",
        "Steer Claude Code by asking it to make the description more specific about when to call this tool",
        "Add more input parameters to compensate for the vague selection description"
      ],
      correct: 2
    },
    {
      id: 61,
      question: "The CLAUDE.md rule 'Write tests for every tool' prevents which outcome?",
      options: [
        "Claude Code shipping untested tools that break silently when connected to the agent",
        "Claude Code writing too many test files per tool and slowing down the build loop",
        "Claude Code picking the wrong test framework for the runtime",
        "Claude Code running generated tests before the tool code is fully ready"
      ],
      correct: 0
    },
    {
      id: 62,
      question: "Before connecting to OpenClaw, the student starts the MCP server and keeps it running. What happens if they close that terminal?",
      options: [
        "The server keeps running automatically thanks to FastMCP's daemon mode",
        "The server process stops, the connection breaks, and the tool disappears from the agent",
        "OpenClaw takes over the server process and keeps it alive behind the gateway",
        "The gateway caches the server response schema and continues serving requests"
      ],
      correct: 1
    },
    {
      id: 63,
      question: "Chen runs openclaw mcp list and sees URL http://localhost:8001/mcp. But his server is running on port 8000. What should he do?",
      options: [
        "Delete the tutorclaw MCP entry entirely and reinstall the mcp-builder skill before registering again",
        "Change his FastMCP server to start on port 8001 so it matches the gateway's cached URL",
        "The one-character port difference does not matter because the gateway tolerates small URL drift",
        "Run openclaw mcp set again with the correct URL (port 8000) and restart the gateway"
      ],
      correct: 3
    },
    {
      id: 64,
      question: "Amara approves the spec and tells Claude Code 'Build this.' Claude Code creates everything. What is Amara's next step?",
      options: [
        "Delete the generated tests and write her own pytest suite from scratch",
        "Immediately connect the server to OpenClaw and test end-to-end from WhatsApp",
        "Read every line of generated server code to check for bugs before testing",
        "Run the tests with uv run pytest to verify the implementation matches the spec"
      ],
      correct: 3
    },
    {
      id: 65,
      question: "The mcp-builder skill supports Python (FastMCP) and TypeScript (TypeScript MCP SDK). Which factor helps a student choose between them?",
      options: [
        "TypeScript is required by the MCP specification for any production server build",
        "Python is faster than TypeScript for MCP servers across every realistic workload",
        "Their existing language background and ecosystem familiarity",
        "The transport decision determines the server's language automatically during scaffolding"
      ],
      correct: 2
    }
  ]
};
