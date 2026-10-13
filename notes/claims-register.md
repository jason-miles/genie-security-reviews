# Claims register

Each load-bearing claim, where it appears, and how it was checked. Checked **13 Oct 2026**.

**Verification levels**

| Level | Meaning |
|---|---|
| **V** Verbatim | Compared against the source's own text (full page fetch or raw table) |
| **S** Summary | Taken from a summarized read or web-search answer; re-check before relying |
| **D** Databricks-provided | From non-public material; confirm in writing; see [open questions](open-questions.md) |

| # | Claim | Pages | Source | Level |
|---|---|---|---|---|
| 1 | Partner-powered provider table, AWS | 03, aws, matrix | docs.databricks.com/aws/.../partner-powered | V |
| 2 | Partner-powered provider table, Azure | 03, azure, matrix | learn.microsoft.com/.../partner-powered | V |
| 3 | Partner-powered provider table, GCP (App Builder not available) | 03, gcp, matrix | docs.databricks.com/gcp/.../partner-powered | V |
| 4 | CSP fallback standards for Genie Code non-agentic (AWS list; Azure HIPAA only) | 03 | AWS and Azure partner-powered footnotes | V |
| 5 | Anthropic on Databricks hosted inside the Databricks security perimeter | 03, 04, clouds | partner-powered footnote | V |
| 6 | Setting removed 1 Nov 2026; value stays; later changes via account team | 03, 07, 08 | partner-powered (Azure) | V |
| 7 | Partners do not retain data, even for abuse monitoring; no training on third-party models | 05, 09, leave-behind | AI trust (Azure, AWS) | V |
| 8 | Data sent per feature (Agents, One, Code, comments) | 02 | AI trust (Azure) | V |
| 9 | Responses stored in control-plane DB, AES-256; Code chat with notebook content | 05 | AI trust (Azure) | V |
| 10 | Genie Agents read-only SQL; Code default is auto-approve | 06, 08 | AI trust (Azure) | V |
| 11 | Geos and member regions | 04 | Databricks Geos (AWS) | V |
| 12 | Enforcement setting name; cross-Geo default outside US/EU without CSP | 04 | Databricks Geos | V |
| 13 | Data not stored outside workspace Geo; local-processing countries when disabled | 04 | Designated services (AWS) | V |
| 14 | Prompt Matching: per-column controls, author's permissions, limits 120/1,024/127, blocked with masks | 02, 06 | Genie tune-quality (AWS) | V |
| 15 | CMK: Azure lists Genie Agents (after 10 Apr 2025); AWS and GCP do not list them | 05, clouds | CMK pages (Azure, AWS, GCP) | V |
| 16 | Statement_text empty in query history until system-catalog key set | clouds | CMK pages (AWS, GCP) | V |
| 17 | Data access is evaluated as the end user; row filters and column masks enforced per user; compute uses the author's embedded credentials; inaccessible data returns an empty response | 06 | Genie Agents concepts (AWS) | V |
| 18a | Chat mode: single SQL query, no unstructured files or MCP; Agent mode: multi-step, can use attached volume files and MCP connectors | 02 | Genie Agents concepts (AWS) | V |
| 18b | Agent mode sends intermediate query results back to the model (inferred from multi-step behavior; the page does not state it) | 02, tracer | Inference | S |
| 19 | CSP standards list and enforcement (CIS Level 1, FIPS 140, Nitro, TLS 1.2+); account-level Genie One does not aggregate CSP workspaces | 08, aws | Compliance security profile (AWS) | V |
| 20 | Designated-services list; availability by Geo for Genie Agents Chat, Genie Code chat, AI/BI dashboards, comments (Agent mode, One, App Builder pattern not itemized) | 04 | Designated services (AWS) | V |
| 21 | Foundation-model families hosted by Databricks; listing does not send data; availability depends on region and cross-Geo | 03 | Hosted inference overview (AWS) | V |
| 22 | Result-row sample sent for summarization | 02, Q1 | Field material | D |
| 23 | Operational retention period (about 30 days quoted) | 05, Q5 | Field material | D |
| 24 | Provider retention exceptions (Anthropic classes, OpenAI scenarios) | 05, Q6 | Field material | D |
| 25 | Genie Code execution-safety design, system tables, assistant_events | 06 | Field material | D |
| 26 | Claude cross-cloud serving for Azure | 04, azure, Q3 | Field material (conflicts with #5) | D |
| 27 | System table names `aibiGenie`, `query_history` client tag | 06 | Field material | D |
| 28 | Prompt Matching "up to 24 values in prompt" | 02 | Field material (conflicts partly with #14) | D |

## Corrections made by this pass

1. Prompt Matching values use the **author's** permissions (not the asker's); the library had said "only values the user can see."
2. Genie Code default approval is **auto-approve** per the public trust page; the library had said ask-every-time.
3. AWS and GCP CMK pages do **not** list Genie Agents; the library had implied coverage.
4. Genie App Builder is **not available on GCP**.
5. Entity matching is **blocked** on tables with row filters or masks (not "skipped").

## Second pass (13 Oct 2026)

Items 17 to 21 were re-fetched and compared. Results:

- 17, 19, 20, 21 promoted to V. 18 split: 18a promoted, 18b stays S because the page does not say intermediate results reach the model.
- Changes to the pages: the availability-by-Geo table in 04 is now the verified one (it replaces an illustrative table); 06 now separates compute credentials (the author's) from data authorization (the user's); 08 notes that account-level Genie One does not aggregate data from CSP workspaces.
- Not itemized in the extract reviewed: availability by Geo for Agent mode, Genie One, and App Builder; repeat for Azure and GCP.

## Next to verify

- 18b: ask the account team whether Agent mode sends intermediate results to the model (open question Q1).
- Designated-services availability on the Azure and GCP pages.
