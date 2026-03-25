import type { Chapter } from "./index";

export const chapter13: Chapter = {
  id: "13",
  title: "Markdown - Writing Instructions",
  description: "Markdown structure for AIDD, headings, lists, code blocks, links/images, specification writing, Digital FTE, agent taxonomy, licensing",
  topics: 10,
  questions: [
    {
      id: 1,
      question: "A developer writes project requirements as a long paragraph. An AI agent generates code missing 3 of 7 features. What is the root cause?",
      options: [
        "The AI model was too small",
        "Unstructured text forces AI to guess which items are distinct requirements — no boundaries between features exist",
        "The prompt was too long",
        "The AI had a context window limitation"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Markdown is described as 'structured text.' What precise technical advantage does structure give AI over plain prose?",
      options: [
        "AI reads structured text faster due to fewer characters",
        "Headings and lists create semantic boundaries that help AI attention mechanisms focus on relevant sections rather than treating the entire document as one continuous stream",
        "Structured text uses less context window space",
        "Plain prose is not supported by most AI models"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "CommonMark and GitHub Flavored Markdown (GFM) are both mentioned. What does GFM add that CommonMark base does NOT include?",
      options: [
        "Headings and bullet points",
        "Tables, task lists (- [ ]), and strikethrough (~~text~~)",
        "Code blocks and inline code",
        "Links and images"
      ],
      correct: 1
    },
    {
      id: 4,
      question: "The chapter calls markdown the 'Intent Layer' in AIDD. Why does the spec stay in Layer 1 (Intent) even when AI helps draft it?",
      options: [
        "AI cannot write markdown",
        "The spec represents your authoritative intent — AI helps draft it but you have final approval; implementation must match the spec, not the other way around",
        "Layer 1 is read-only by definition",
        "AI-written specs produce worse code"
      ],
      correct: 1
    },
    {
      id: 5,
      question: "A developer uses Word (.docx) instead of markdown for their project specs. What specific disadvantage does this create for AI-native workflows?",
      options: [
        "Word files are too large",
        "Word requires special software to read; markdown is plain text readable by any tool including AI agents, version control systems, and CI/CD pipelines without conversion",
        "Word doesn't support headings",
        "AI cannot process .docx files at all"
      ],
      correct: 1
    },
    {
      id: 6,
      question: "A spec has this structure: # App / ### Installation Steps. What is wrong and why does it matter?",
      options: [
        "Nothing — heading levels are just visual styles",
        "Level 2 (##) was skipped — this breaks the logical hierarchy that both screen readers and AI use to map document structure; the AI cannot determine what parent section 'Installation Steps' belongs to",
        "The heading text is too vague",
        "Level 3 headings are not allowed in specs"
      ],
      correct: 1
    },
    {
      id: 7,
      question: "How many Level 1 headings (# H1) should a well-formed markdown document have?",
      options: [
        "As many as needed for major sections",
        "Exactly one — used only for the document title; main sections use ## H2",
        "Two — one for the title, one for the conclusion",
        "No limit — H1 is the most important so use it for everything critical"
      ],
      correct: 1
    },
    {
      id: 8,
      question: "When does a Level 3 heading (###) become appropriate in a specification?",
      options: [
        "For every new idea, regardless of nesting level",
        "Only when a Level 2 section contains sub-topics that need their own labels — H3 always requires a parent H2 to exist first",
        "As a substitute for bullet points when there are many items",
        "For any text longer than two sentences"
      ],
      correct: 1
    },
    {
      id: 9,
      question: "Level 5 and Level 6 headings are mentioned as something to 'avoid in specifications.' Why?",
      options: [
        "They don't render in most markdown editors",
        "Deep nesting indicates the document structure is too complex — if you need H5/H6, restructure into separate documents or use nested lists instead",
        "They are deprecated in CommonMark",
        "They conflict with GFM extensions"
      ],
      correct: 1
    },
    {
      id: 10,
      question: "A developer writes #Heading Without Space. What happens?",
      options: [
        "It renders correctly — the space is optional",
        "Most markdown parsers do NOT recognize it as a heading — the space after # is required by CommonMark specification",
        "It creates an H1 heading but with a hash character visible",
        "It creates bold text instead"
      ],
      correct: 1
    },
    {
      id: 11,
      question: "A spec lists installation steps as bullet points (- Install Python / - Run app). What specific problem does this create for AI?",
      options: [
        "Bullet points are harder to read than numbers",
        "Unordered lists communicate 'order doesn't matter' — AI may generate an install script running steps in wrong sequence; ordered lists (1. 2. 3.) communicate sequential dependency",
        "Bullet points use more tokens",
        "AI ignores bullet point lists"
      ],
      correct: 1
    },
    {
      id: 12,
      question: "What does the chapter say about markdown numbering behavior when you write: 11. / 2. / 3. in source?",
      options: [
        "It renders as 11, 2, 3 exactly as written",
        "Markdown auto-numbers from the first item — this renders as 11, 12, 13. However, for AI-native dev, use correct sequential numbers because AI agents often read raw source files, not rendered HTML",
        "It renders as 1, 2, 3 always",
        "Markdown requires all items to start with 1."
      ],
      correct: 1
    },
    {
      id: 13,
      question: "You have these items: 'App must support dark mode', 'App must support light mode', 'User must verify email before login.' Which should be ordered vs unordered?",
      options: [
        "All unordered — these are just requirements",
        "Dark/light mode = unordered (independent features, no sequence). Email verification before login = ordered (login depends on verification completing first)",
        "All ordered — requirements should be numbered",
        "Ordered for all — requirements have priority"
      ],
      correct: 1
    },
    {
      id: 14,
      question: "When should you use nested lists instead of creating more Level 3 headings?",
      options: [
        "Never — nested lists and headings are interchangeable",
        "For sub-requirements within a feature section — use headings for major sections, nested lists (2-space indent) for details within sections. If you'd need 10+ H3 headings, consolidate with nested lists instead",
        "Nested lists are not supported in GFM",
        "Only for items with more than 3 sub-items"
      ],
      correct: 1
    },
    {
      id: 15,
      question: "A specification uses bullet points for everything including installation steps AND feature lists. What does this communicate to an AI agent?",
      options: [
        "Everything is equally important",
        "All items are unordered and independent — installation steps have no required sequence, which is incorrect. AI may generate a setup script that runs steps out of order",
        "Bullet points are the safest choice",
        "Nothing — AI ignores list type"
      ],
      correct: 1
    },
    {
      id: 16,
      question: "A spec says 'The program should greet the user and show the current time.' An AI generates four different valid outputs. What would eliminate this ambiguity?",
      options: [
        "Adding more text description of the format",
        "A fenced code block showing the EXACT expected output — removes all format ambiguity",
        "Using bold to emphasize format requirements",
        "Adding an ordered list of format rules"
      ],
      correct: 1
    },
    {
      id: 17,
      question: "What is the key difference between using a fenced code block versus an ordered list in a specification?",
      options: [
        "Code blocks are only for programming languages",
        "Lists organize ideas into readable items; code blocks preserve EXACT formatting — every space, every character. Use lists to describe WHAT software does; use code blocks to show WHAT IT LOOKS LIKE when running",
        "Fenced blocks use more context window space",
        "Code blocks cannot be nested inside lists"
      ],
      correct: 1
    },
    {
      id: 18,
      question: "A developer uses the language tag 'python' on a code block showing terminal commands (pip install, cd folder). What problem does this create?",
      options: [
        "Terminal commands don't work with the python tag",
        "AI receives conflicting signals — python tag means 'apply Python syntax rules and PEP 8 standards' but the content is shell commands. The correct tag is 'bash'",
        "Language tags are just for syntax highlighting, no functional impact",
        "The code block won't render"
      ],
      correct: 1
    },
    {
      id: 19,
      question: "What is 'semantic anchoring' as described in the code blocks lesson?",
      options: [
        "Using bold text to anchor important requirements",
        "Wrapping commands in backticks (inline code) tells AI 'this is a literal string, not a word to translate or summarize' — preventing hallucination of different command names",
        "Linking code blocks to external documentation",
        "Using language tags to anchor code to a specific runtime"
      ],
      correct: 1
    },
    {
      id: 20,
      question: "Why should edge cases (like empty states) be shown in code blocks within specifications?",
      options: [
        "Edge cases are only for testing documentation",
        "Showing empty state output in a code block hints to AI to handle that scenario in generated code — if you don't show it, AI may not implement graceful empty state handling",
        "Edge cases should be in separate documents",
        "Code blocks cannot show conditional states"
      ],
      correct: 1
    },
    {
      id: 21,
      question: "A developer forgets the closing triple backticks on a code block. What happens to the rest of the document?",
      options: [
        "The code block just ends at the next heading",
        "Everything after the opening backticks becomes part of the code block — the entire rest of the document loses all markdown formatting and renders as raw code",
        "Markdown auto-closes unclosed blocks",
        "An error is displayed"
      ],
      correct: 1
    },
    {
      id: 22,
      question: "When should you use inline code (single backtick) versus a fenced block (triple backticks)?",
      options: [
        "Single backticks for all code, triple for long code",
        "Inline code for short references within sentences (variable names, file names, commands); fenced blocks for multiple lines, expected output, or implementation examples",
        "Triple backticks are always safer",
        "Single backticks are deprecated in GFM"
      ],
      correct: 1
    },
    {
      id: 23,
      question: "What is the purpose of the 'text' language tag in code blocks?",
      options: [
        "It makes the block render in a monospace font",
        "It explicitly signals 'this is plain output text, not a programming language' — useful for showing program output without applying any syntax highlighting rules",
        "It is equivalent to having no language tag",
        "It is used for YAML and configuration files"
      ],
      correct: 1
    },
    {
      id: 24,
      question: "A spec contains [click here](https://docs.python.org/). Why is this a problematic link?",
      options: [
        "The URL is incorrect",
        "'click here' provides zero semantic context — AI agents use link text to understand what the destination provides WITHOUT following the link",
        "Links in specs should not have text",
        "The parentheses format is wrong for markdown"
      ],
      correct: 1
    },
    {
      id: 25,
      question: "What is the key syntax difference between a markdown link and a markdown image?",
      options: [
        "Images use double brackets [[]]",
        "Images use an exclamation mark ! before the opening bracket: ![alt](url) vs [text](url). The ! means 'display inline' rather than 'navigate to'",
        "Images use single quotes around the URL",
        "There is no difference — they use identical syntax"
      ],
      correct: 1
    },
    {
      id: 26,
      question: "In AI-native workflows, markdown specs are often processed as text files (not rendered HTML). What does this mean for images?",
      options: [
        "Images are ignored entirely in AI workflows",
        "AI sees only the alt text and filename, not the actual image — descriptive alt text serves as the image's content for text-based AI processing",
        "AI automatically downloads and views all images",
        "Images must be base64 encoded in markdown"
      ],
      correct: 1
    },
    {
      id: 27,
      question: "A link written as [Documentation](https://docs.python.org/3/ reference guide) won't work. Why?",
      options: [
        "The URL is too long",
        "Spaces in URLs break markdown link parsing — the space causes the parser to treat 'reference guide' as additional attributes, not part of the URL",
        "Python documentation requires authentication",
        "Parentheses cannot contain spaces"
      ],
      correct: 1
    },
    {
      id: 28,
      question: "What is the purpose of reference-style links in markdown?",
      options: [
        "They create links that reference other sections of the same document",
        "They separate link definitions from link usage — define URLs at the bottom of the document, reference them by label in the text. Keeps long docs readable when many links exist",
        "They are required for external URLs",
        "They provide hover-text for links"
      ],
      correct: 1
    },
    {
      id: 29,
      question: "Bold vs italic vs bold-italic — what semantic distinction does the chapter assign to each?",
      options: [
        "They are purely visual with no semantic meaning",
        "Bold for critical requirements/warnings/key terms; italic for optional items/definitions/slight emphasis; bold-italic for absolute requirements or security warnings",
        "Bold for headings, italic for body text",
        "Bold and italic are interchangeable; use either"
      ],
      correct: 1
    },
    {
      id: 30,
      question: "A developer writes ![screenshot](app.png). What should they write instead for AI-readable specs?",
      options: [
        "The syntax is already optimal",
        "![Login screen showing the empty dashboard state with no data loaded](app.png) — descriptive alt text that describes WHAT the image shows, not just what type of image it is",
        "![img](app.png) — shorter alt text is always better",
        "Images cannot be used in AI-readable specs"
      ],
      correct: 1
    },
    {
      id: 31,
      question: "A specification has unstructured text and generates 5 different AI implementations across 5 runs. Adding markdown structure reduces this to 2 variations. What concept does this demonstrate?",
      options: [
        "Markdown reduces LLM temperature",
        "Structured specifications constrain the probability space of valid AI outputs — the structure provides 'attention anchors' that reduce how far probabilistic generation can deviate from intent",
        "Markdown is faster to process than prose",
        "Structure reduces token count"
      ],
      correct: 1
    },
    {
      id: 32,
      question: "AGENTS.md, SPEC.md, and PROJECT_CONTEXT.md are mentioned as solutions to LLM statelessness. What markdown element makes these files effective as persistent context?",
      options: [
        "Bold text for key terms",
        "Headings create navigable sections — AI can efficiently locate 'Build Commands', 'Security Rules', or 'Architecture' without reading every word. Structure enables efficient context injection despite token limits",
        "Inline code for command names",
        "Links to external documentation"
      ],
      correct: 1
    },
    {
      id: 33,
      question: "Which markdown element is most critical for making a specification 'implementation-testable'?",
      options: [
        "Headings — they organize sections",
        "Fenced code blocks with expected output — they define exact acceptance criteria: did the generated code produce THIS specific output? Abstract descriptions cannot serve as acceptance tests",
        "Bold text for requirements",
        "Numbered lists for steps"
      ],
      correct: 1
    },
    {
      id: 34,
      question: "A developer writes all features as a numbered list (1. Dark mode 2. Export to PDF 3. Auto-save). What incorrect signal does this send to an AI agent?",
      options: [
        "No signal — ordered lists work for features too",
        "The numbered list signals 'these features have a required implementation sequence' — AI may implement dark mode before attempting export/auto-save, or treat feature 1 as a dependency for feature 2",
        "Numbered lists are faster to parse",
        "Nothing — AI ignores list ordering for features"
      ],
      correct: 1
    },
    {
      id: 35,
      question: "The chapter says markdown 'creates semantic meaning that AI can parse.' What does 'semantic' mean in this context?",
      options: [
        "Markdown makes text look prettier",
        "Structure communicates MEANING beyond just the words — '## Features' tells AI 'everything below is a capability to implement.' '1. Install Python' communicates 'this must happen before step 2'",
        "Semantic refers to the programming language used",
        "Semantic means the markdown is valid/well-formed"
      ],
      correct: 1
    },
    {
      id: 36,
      question: "A developer escapes a backslash as \\\\ in markdown when they wanted to show a single backslash. How many backslashes will render?",
      options: [
        "Four backslashes",
        "One backslash — \\\\ in source renders as \\ because the first backslash escapes the second",
        "Two backslashes",
        "Zero — backslashes are always invisible in markdown"
      ],
      correct: 1
    },
    {
      id: 37,
      question: "A developer writes two requirements on consecutive lines with a single newline between them, expecting two separate paragraphs. What actually renders?",
      options: [
        "Two separate paragraphs as expected",
        "One paragraph — markdown requires a BLANK LINE (double newline) to separate paragraphs. A single newline within prose joins lines into the same paragraph",
        "An error or broken formatting",
        "A line break but within the same paragraph"
      ],
      correct: 1
    },
    {
      id: 38,
      question: "You want to show the literal text *this is not italic* in your documentation. How do you write this in markdown source?",
      options: [
        "*this is not italic* (no escaping — renders as italic and hides the asterisks)",
        "\\*this is not italic\\* — the backslash escapes the asterisks, preventing markdown from interpreting them as italic markers",
        "Use inline code backticks to wrap it",
        "You cannot show literal asterisks in markdown"
      ],
      correct: 1
    },
    {
      id: 39,
      question: "A specification uses emphasis (bold) for entire paragraphs instead of key words. What problem does this create?",
      options: [
        "Bold text uses more tokens",
        "If everything is bold, nothing stands out — emphasis loses meaning when overused. Reserve bold for truly critical items. Overuse makes the spec harder to scan for what matters most",
        "Bold cannot be used for multi-word phrases",
        "AI ignores bold text in specifications"
      ],
      correct: 1
    },
    {
      id: 40,
      question: "A developer uses *database_name* (italic) to indicate a placeholder in instructions. The chapter says this is a mistake. What should they use instead?",
      options: [
        "**database_name** (bold)",
        "`<database_name>` wrapped in inline code backticks — this is clearer for both humans and AI that this is a variable placeholder, not emphasized text",
        "[database_name] (link syntax without URL)",
        "database_name (no formatting)"
      ],
      correct: 1
    },
    {
      id: 41,
      question: "A spec section says '## Expected Output' but contains only bullet points describing what the output will look like (no code blocks). What is missing and why does it matter?",
      options: [
        "Nothing — bullet descriptions are equivalent to code blocks",
        "The EXACT output format in a code block — bullet descriptions tell AI what to display conceptually; a code block shows precisely how it should look. Without it, AI must guess the format",
        "A numbered list would be more appropriate",
        "The section heading is incorrect"
      ],
      correct: 1
    },
    {
      id: 42,
      question: "Which combination of markdown elements produces the most complete, AI-implementable specification?",
      options: [
        "Headings + prose descriptions",
        "Headings (structure) + unordered lists (features) + ordered lists (steps) + fenced code blocks (expected output) + inline code (commands) + links (external references) — all elements working together",
        "Bold and italic emphasis only",
        "Code blocks alone are sufficient"
      ],
      correct: 1
    },
    {
      id: 43,
      question: "A developer writes a specification but omits the 'Non-Goals' section. An AI generates the feature plus 4 additional related features. What principle explains this?",
      options: [
        "AI always adds extra features",
        "Without explicit scope boundaries, AI fills ambiguity with plausible additions — specifications must explicitly state boundaries to prevent AI from expanding scope beyond intent",
        "The spec was too vague",
        "AI cannot determine scope from feature lists"
      ],
      correct: 1
    },
    {
      id: 44,
      question: "The chapter recommends using a 'Problem' section as a paragraph (not a list). Why is prose appropriate here when lists are recommended elsewhere?",
      options: [
        "Problem sections are optional and format doesn't matter",
        "The problem statement is narrative context explaining WHY the feature exists — it's inherently prose (connected reasoning), not enumerable items. Lists are for discrete items; connected reasoning flows better as a paragraph",
        "Lists and paragraphs are interchangeable",
        "AI cannot process paragraphs"
      ],
      correct: 1
    },
    {
      id: 45,
      question: "After completing all 4 lessons (headings, lists, code blocks, links/images), the chapter says you have 'everything an AI agent needs.' Which element provides the 'acceptance test'?",
      options: [
        "Headings — they define what sections must be implemented",
        "Fenced code blocks in the Expected Output section — they show exactly what correct implementation produces, serving as the testable success criterion",
        "Links — they reference the expected behavior",
        "Ordered lists — they define the implementation sequence"
      ],
      correct: 1
    },
    {
      id: 46,
      question: "A team writes AGENTS.md with 15 sections as paragraphs of text with no headings. What problem does this create?",
      options: [
        "AGENTS.md requires a specific file format",
        "Without headings, AI cannot efficiently navigate to relevant sections — an agent loading AGENTS.md must read everything to find 'Build Commands'. Headed sections allow selective loading of only the relevant part, saving context window space",
        "Paragraphs are not allowed in AGENTS.md",
        "The file is too large"
      ],
      correct: 1
    },
    {
      id: 47,
      question: "You have: (a) user stories, (b) acceptance criteria, (c) installation steps, (d) expected output. Which list type is correct for each?",
      options: [
        "All ordered lists",
        "User stories = unordered; acceptance criteria = unordered; installation steps = ORDERED (sequential dependencies); expected output = fenced code block (exact format)",
        "All unordered lists except expected output",
        "All ordered lists to show priority"
      ],
      correct: 1
    },
    {
      id: 48,
      question: "A spec shows `pip install requests` in both a fenced bash code block AND as inline code within installation step text. Is this redundant?",
      options: [
        "Redundant — use one or the other",
        "Not redundant — fenced block is for copy-paste execution; inline code within a sentence is for semantic anchoring in prose context. Both serve different reading contexts",
        "Redundant — inline code is deprecated when code blocks exist",
        "The fenced block should be removed"
      ],
      correct: 1
    },
    {
      id: 49,
      question: "A developer writes a full specification in markdown with headings and lists but NO code blocks in the Expected Output section. AI still produces incomplete code. What is the most likely cause?",
      options: [
        "The AI had a context window issue",
        "Absence of expected output code blocks means AI has no concrete acceptance criteria — it knows WHAT to build but not exactly WHAT the result should look like. It fills the format gap with guesses",
        "The headings were at wrong levels",
        "The specification was too long"
      ],
      correct: 1
    },
    {
      id: 50,
      question: "You want a specification readable by BOTH humans (rendered HTML) AND AI agents processing raw .md files. Which practice is MOST important for ensuring both audiences get equal value?",
      options: [
        "Use the most visually attractive formatting",
        "Write descriptive alt text for images, use semantic link text (not 'click here'), use correct list types consistently, and include language tags on all code blocks — all four practices ensure raw markdown source carries as much meaning as the rendered version",
        "Use only headings and lists — images and links don't add value for AI",
        "Bold all important text so AI prioritizes it"
      ],
      correct: 1
    },
    {
      id: 51,
      question: "'Spec Kit Plus' is presented as providing:",
      options: [
        "A monitoring stack that replaces observability requirements",
        "A proprietary model that replaces SDKs and removes tooling",
        "A cloud platform that replaces Kubernetes and container runtime",
        "Templates and standards that turn ideas into AI-executable specs"
      ],
      correct: 3
    },
    {
      id: 52,
      question: "The security and compliance framework includes as core layers:",
      options: [
        "Theming, localization, A/B testing, feature flags",
        "Vector search, reranking, chunking, summarization",
        "Encryption, access control, audit logging, input validation",
        "GPU autoscaling, model caching, batching, speculative decoding"
      ],
      correct: 2
    },
    {
      id: 53,
      question: "According to the Final Summary, what is the sequence for turning knowledge into revenue?",
      options: [
        "Build agents → Test performance → Find customers → Negotiate contracts",
        "Research market → Design product → Develop MVP → Scale to enterprise customers",
        "Start with Spec → Build with Claude → Deploy for ROI using License or FTE models",
        "Hire team → Raise funding → Build infrastructure → Launch go-to-market campaign"
      ],
      correct: 2
    },
    {
      id: 54,
      question: "'Agent Evals' are framed as the 'exam' for digital employees because:",
      options: [
        "They test GPU throughput beyond latency and cost metrics",
        "They test UI usability beyond adoption and training needs",
        "They test reasoning quality beyond code pass/fail outcomes",
        "They test cloud uptime beyond redundancy and failover design"
      ],
      correct: 2
    },
    {
      id: 55,
      question: "What cost per task reduction does the Digital FTE model typically achieve compared to Human FTEs?",
      options: [
        "From approximately $10.00 per task down to approximately $2.00 per task",
        "From approximately $5.00 per task down to approximately $0.50 per task",
        "From approximately $3.00 per task down to approximately $1.50 per task",
        "From approximately $1.50 per task down to approximately $0.75 per task"
      ],
      correct: 0
    },
    {
      id: 56,
      question: "Pre-Built AI Employees come in two flavors: Horizontal and Vertical. A law firm evaluating Harvey (legal AI) alongside OpenClaw (general-purpose AI) is comparing:",
      options: [
        "Two Horizontal AI Employees with different pricing models",
        "A Vertical AI Employee versus a Horizontal AI Employee",
        "Two Custom-Built AI Employees with different orchestration frameworks",
        "A General Agent versus a Custom-Built Agent with legal guardrails"
      ],
      correct: 1
    },
    {
      id: 57,
      question: "According to the Technical Engine concept, how does Claude Code handle business questions like 'Why did sales drop in Q3?'",
      options: [
        "It writes SQL queries and Python scripts to analyze data and derive answers",
        "It retrieves pre-written reports from a knowledge base and summarizes them",
        "It generates hypothetical scenarios based on general economic patterns",
        "It forwards the question to human analysts for investigation and response"
      ],
      correct: 0
    },
    {
      id: 58,
      question: "What distinguishes the White-Label license type from the Enterprise Site License?",
      options: [
        "White-Label is usage-based while Enterprise Site License requires upfront payment only",
        "White-Label allows rebranding while Enterprise Site License enables unlimited organizational use",
        "White-Label is perpetual while Enterprise Site License requires annual renewal always",
        "White-Label restricts modifications while Enterprise Site License permits customization"
      ],
      correct: 1
    },
    {
      id: 59,
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
      id: 60,
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
      id: 61,
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
      id: 62,
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
      id: 63,
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
      id: 64,
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
      id: 65,
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
      id: 66,
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
      id: 67,
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
      id: 68,
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
      id: 69,
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
      id: 70,
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
      id: 71,
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
      id: 72,
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
      id: 73,
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
      id: 74,
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
      id: 75,
      question: "You're writing a spec for an AI agent that will handle customer complaints for a luxury hotel brand. The 'Blueprint for a Perfect Agent Spec' includes as the first dimension:",
      options: [
        "The MCP servers it will connect to for booking data",
        "The role identity (e.g., 'Senior Guest Relations Manager') and tone (e.g., 'Empathetic, professional, luxury-focused')",
        "The error handling protocols for system downtime",
        "The output format templates for complaint resolutions"
      ],
      correct: 1
    },
    {
      id: 76,
      question: "A company has deployed 12 production AI agents and is experiencing reliability issues. Their team consists of 1 AI Product Owner and 1 Agent Engineer. According to the 'Team Structure' rule of thumb, what is likely the problem?",
      options: [
        "They need more AI Product Owners to manage the roadmap",
        "They are understaffed on Agent Engineers; the ratio should be approximately 1 engineer per 3-5 agents",
        "They should have hired an MLOps Engineer before an Agent Engineer",
        "12 agents is above the maximum recommended for any team size"
      ],
      correct: 1
    },
    {
      id: 77,
      question: "The presentation defines a 'Digital FTE' as:",
      options: [
        "An agent priced and managed like a human employee role",
        "A SaaS user license priced by seats and feature tiers",
        "A database job scheduled nightly for batch reporting tasks",
        "A microservice endpoint that returns deterministic JSON only"
      ],
      correct: 0
    }
  ]
};
