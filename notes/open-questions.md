# Open questions

Items that public documentation does not settle. Resolve with the Databricks account team or product security, record the answer, date, and source, then update the pages that cite the item.

| # | Question | Why it matters | Status |
|---|---|---|---|
| Q1 | Are query result rows sent to the model in Genie Agents Chat mode, Agent mode, and Genie One? Public data lists omit them; Databricks field material says a sample is sent for answer summarization. | Residency and sensitive-data assessments | Open. Treat as **sent** until confirmed otherwise |
| Q2 | Which Geo processes content when cross-Geo is enabled, per workspace region? | Transfer assessment | Open |
| Q3 | Where is "Anthropic on Databricks" hosted for Azure and GCP workspaces? Azure public docs say Databricks-hosted within the security perimeter; field material describes cross-cloud routing for Azure. | Cross-cloud transfer and sub-processor list | Open |
| Q4 | Prompt Matching is documented as a **per-column** control (Format assistance off also turns off Entity matching), with an older table-level option. Is there a space-wide switch, and does turning it off remove sampled values from prompts entirely, on every cloud and release? | Primary data-minimization lever | Partly resolved by public docs. Verify in the product UI |
| Q5 | Does Databricks hold inputs/outputs for an operational period for abuse prevention (periods such as 30 days have been quoted)? | Retention statement | Open. Get in writing |
| Q6 | Which provider model classes carry abuse-monitoring retention exceptions (Anthropic safety-critical classes, OpenAI coding/routing scenarios)? | Retention statement | Open |
| Q7 | Is any Google Gemini model used by a Genie assistive feature now or planned? | Provider disclosure | Public tables show none as of review |
| Q8 | Customer-managed keys: Azure lists Genie Agents (created after 10 Apr 2025). AWS and GCP CMK pages do not list Genie Agents or conversations. What is covered on each cloud? | Key-custody claims | Open |
| Q9 | Genie-specific SLA, RTO/RPO, and failover behaviour. | Resiliency | Not published in sources reviewed |
| Q10 | Are ABAC policies GA on all three clouds? | Hardening guidance | Varies by cloud and date |
| Q11 | Is Genie Code agentic available with partner-powered features off on any compliance profile? | Regulated workspaces | Public docs: not available |
| Q12 | After 1 Nov 2026, process and lead time for changing the partner-powered setting via account team. | Change control | Open |
| Q13 | Does Databricks publish a per-region list of where each model family is processed for each Genie feature? | Sovereignty evidence | Availability matrix exists; routing detail not published |
| Q14 | Customer-specific content-filter tuning availability by provider route. | Safety configuration | Open |

## Notes on conflicting statements

- Older internal FAQ wording ("Genie does not have access to row-level data") conflicts with current public wording ("relevant data values"). This library follows the public wording.
- "Genie is powered by Azure OpenAI" is true only for Chat mode (and AI/BI dashboards, AI-generated comments). Agent mode and Genie One use Anthropic on Databricks (and OpenAI on Databricks on AWS/GCP).
