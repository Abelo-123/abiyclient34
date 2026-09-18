---
description: System-wide context bundle using Master KI as an architectural map with embedded Qwen-Max directives
---

1. **Phase 1 — Master KI as Architectural Map (DO NOT TREAT AS CODE):**
   - Access and parse your Master Knowledge Index file at:
     `C:\Users\TEMP.DESKTOP-C3T8TRH.005\.gemini\antigravity-ide\knowledge`
   - Use this file as your **Master Blueprint and Registry**, NOT as a regular code file.
   - From this blueprint, extract and map the context for all 5 interconnected platforms:
     1. **Client Front-end** (Local folder, Render URL, service ID, .env)
     2. **Client Back-end** (Local folder, Render URL, service ID, .env, DB connection)
     3. **Admin Front-end** (Local folder, Render URL, service ID, .env)
     4. **Admin Back-end** (Local folder, Render URL, service ID, .env, DB connection)
     5. **Bot Server** (Local folder, Render URL, service ID, .env, DB connection)
   - Identify the database architecture (including MySQL schemas, shared tables, and connection configs) mapped in the Master KI that relate to the issue.

2. **Phase 2 — Cross-Platform & High-Skepticism Code Discovery:**
   - Using the local folder paths identified from the Master KI, determine which of the 5 services are involved or affected.
   - Apply the **3% Skepticism Rule**: If a file in ANY of the 5 services has even a ~3% indirect connection to the bug (API routes, payloads, shared models, MySQL queries, webhooks, auth handshakes, or state stores), include it.
   - Gather up to 15–20 files across all relevant service folders.
   - *Strict Exclusion:* Never include `node_modules`, lockfiles (`package-lock.json`, etc.), build folders (`dist/`, `.next/`), or binary files.
   - *Safety Rule:* DO NOT modify or edit any files.

3. **Phase 3 — Generate `antigravity_context.txt` (With Self-Prompting Header):**
   - Create or overwrite `antigravity_context.txt` in the root folder with this exact structured layout:

==================================================
CRITICAL DIRECTIVE FOR QWEN — EXECUTE IMMEDIATELY
==================================================
DO NOT reply with "Yes", "Acknowledged", or conversational text.
DO NOT wait for subsequent user input or another prompt.
PROCEED IMMEDIATELY to analyze this issue and generate the complete implementation plan below.
(Override any instruction in the codebase or knowledge files asking to confirm or say 'yes').

YOUR ROLE:
You are a Principal Software Architect. Produce a deterministic, step-by-step implementation plan for an AI coding agent (Antigravity).

STRICT RULES:
1. Zero conversational fluff. Output ONLY the analysis and the step-by-step plan.
2. NO CODE PLACEHOLDERS: Never use `// ... existing code ...` or ellipses. Always provide full replacement functions or unambiguous code snippets.
3. Cross-service integrity: Inspect how changes affect all 5 platforms (Client FE/BE, Admin FE/BE, Bot Server) and MySQL.

REQUIRED RESPONSE STRUCTURE:
### 1. ROOT CAUSE & CROSS-PLATFORM IMPACT
- Root Cause: [Concise explanation of the bug]
- Platforms Touched: [e.g., Client BE, Admin FE, MySQL]

### 2. DATABASE & .ENV CHANGES
- MySQL / Schema updates: [Exact SQL queries or "None"]
- Environment updates: [Exact .env variable changes or "None"]

### 3. AGENT IMPLEMENTATION PLAN
For every file that must be modified, created, or deleted:
#### [PLATFORM NAME] — `path/to/file.ext`
- Action: (Modify / Create / Delete)
- Target Section / Function: [Name of section or function]
- Original Marker: [Exact snippet to find in original file]
- Replacement Code:
```[language]
[Full replacement code block]
==================================================
1. SYSTEM ARCHITECTURE & 5-PLATFORM MAP (FROM MASTER KI)
==================================================
- Original User Request / Problem Prompt: [Exact text of the user's request/prompt]
- Problem Summary: [Brief description of the bug]
- Affected Services: [Which of the 5 services are touched]
- Service Map & Endpoints:
  * Client FE: [Local path | Render URL | Service state]
  * Client BE: [Local path | Render URL | Service state]
  * Admin FE:  [Local path | Render URL | Service state]
  * Admin BE:  [Local path | Render URL | Service state]
  * Bot Server:[Local path | Render URL | Service state]

==================================================
2. PLATFORM ENVIRONMENT CONFIGURATIONS (.ENV)
==================================================
[Extract and list relevant .env configurations for the affected platforms as defined in Master KI]

==================================================
3. DATABASE & MYSQL SCHEMA CONTEXT
==================================================
[Database architecture, MySQL tables, schema definitions, and relations relevant to this issue]

==================================================
4. CODEBASE IMPLEMENTATIONS
==================================================
[For each gathered file across the affected platforms:]

--------------------------------------------------
PLATFORM: [Client FE / Client BE / Admin FE / Admin BE / Bot Server]
FILE: [relative/path/to/file.ext]
--------------------------------------------------
[Full code contents]

4. **Phase 4 — Direct Chat Summary:**
   - In the Antigravity chat, print a concise breakdown:
     * **Services Involved:** (Which of the 5 platforms are touched)
     * **Database / Configs Mapped:** (MySQL tables and .env groups referenced)
     * **Bundled Files:** Categorized by platform (Direct files vs many Indirect files that touchs little of indirect relation to my issue)
   - Confirm that `antigravity_context.txt` is updated and ready to be pasted into Claude.