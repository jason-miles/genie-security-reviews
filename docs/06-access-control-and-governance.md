# 06. Access control and governance

## Core principle

A Genie Agent (space) is a **curation layer, not a permission boundary**. Unity Catalog (UC) decides who can see what. Interactive Genie queries run as the asking user, so a user cannot retrieve through Genie what they cannot query directly.

## Whose identity runs the query

| Access path | Data authorization | Notes |
|---|---|---|
| Genie UI | Querying user (OAuth user-to-machine) | Full per-user grants, filters, masks |
| Conversation API with user token | Querying user | Full per-user |
| Genie in dashboards | Viewer's UC grants for data | Per-viewer |
| Published / embedded | User for data; a service principal may hold the warehouse connection | Data authorization remains per-user |
| Conversation API with a service principal (machine-to-machine) | **Shared service principal** | All callers share its grants. Scope it to least privilege, or use user tokens |

## Enforcement mechanics

1. Privilege chain per query: `USE CATALOG`, `USE SCHEMA`, `SELECT`. A missing privilege returns empty results.
2. Row filters and column masks are UDF-backed and applied by the SQL engine **before** rows exist to be sampled or summarized.
3. Attribute-based access control (governed tags and policies) applies to Genie like any other SQL. Availability by cloud has varied between GA and preview; check current status.
4. Genie generates **read-only SQL**. Data-modifying statements are not executed.

## Known limits (state them to reviewers)

- If a user truly holds `SELECT`, Genie will answer about that data. UC governs access, not use.
- Agent instructions and example SQL are visible to anyone with view access; no secrets or PII in them.
- Conversation history is visible to users with access to the space; treat it as semi-shared.
- **Prompt Matching values use the author's permissions, not the asker's.** Public documentation states representative values for prompt matching "are generated using the author's data permissions." If the author can see unmasked values, those values can be offered to the model for every user of the space, including users who could not query them. Mitigations: a least-privilege author or owner; mask at the base table; turn Prompt Matching off on sensitive columns.
- **Views over masked tables, and dynamic views:** field material describes the same owner-permission behaviour for views. Genie blocks enabling entity matching on tables with row filters or column masks, but a view over such a table is not covered by that block. Use base tables that carry masks, or exclude the view's columns.

## Prompt Matching (value sampling)

Prompt Matching lets Genie match columns and values to the question and correct spelling. **Format assistance** supplies representative values for eligible columns and is applied automatically when tables are added to a Genie Agent. **Entity matching** keeps curated lists of distinct values (up to 120 columns, up to 1,024 values per column, each up to 127 characters). Values are generated with the author's permissions (see above). Public documentation describes the control **per column**, not as one space-wide switch: in the Genie Agent, go to Configure, Sources, select a table, edit a column, expand Advanced, and turn **Format assistance** off (this also turns off **Entity matching** for that column). Entity matching can be turned off alone, keeping format assistance. Some UI versions offer a table-level "disable value sampling for all columns" option ("value sampling" is the older name). Repeat for every sensitive column or table in the agent. Recommended default for agents over sensitive columns: **disable on those columns**, and verify the result in your UI.

## Genie Code and agentic execution

- Genie Code acts with the authenticated user's identity and Unity Catalog permissions. No separate or elevated agent identity.
- Side-effecting actions pass layered checks: tool classification, deterministic policy (hard blocks for destructive categories), AI safety inspection, then approval.
- Approval modes: the public trust page states that by default Genie Code uses **auto-approve**, where an AI classifier approves actions that carry out the request and is designed to block actions beyond it; the approval mode can be changed so Genie Code asks before running code. Field material describes ask-every-time as the default, so check the setting in your workspace. Auto-approve does not override deterministic blocks, Unity Catalog, or network controls.
- Retrieved documents and tool outputs are treated as untrusted content; the auto-approve classifier receives a constrained view that excludes retrieved content.
- Serverless egress control and network policies apply to code Genie Code proposes exactly as they do to hand-written code.
- Extension surfaces (instructions, skills, MCP servers and connectors) enlarge the trust boundary. Admins control which servers are available; executable skills run with the user's permissions. Review them like any workspace integration.

## Threat view: ways to get more, and what stops each

| Attempt | Control | Type |
|---|---|---|
| Prompt-inject Genie to rewrite the SQL | Run-as user plus UC | Automatic |
| Get added to a broad space | Space membership confers no data privilege | Automatic |
| Exfiltrate PII via the result-summary call | In-engine masking before sampling | Automatic |
| Read secrets in space instructions | Configuration hygiene | Customer-owned |
| Over-scoped machine-to-machine token | Least-privilege service principal | Customer-owned |
| Bypass a mask via a dynamic view | Base-table rule | Customer-owned |
| Agentic action with excessive blast radius | Deterministic block, AI inspection, human approval, UC | Automatic plus config |
| Hostile content from an external connector | Treat as untrusted; limit connectors; egress control | Customer-owned |

## Model-safety posture

Genie's controls are primarily architectural (read-only SQL, user-scoped execution, topic and schema grounding, restricted egress from the SQL environment) rather than a bolted-on external guardrail product. Provider-level filters (Azure content filtering, Anthropic built-in safety mechanisms) apply per route. Databricks applies feature-level policy uniformly; customer-specific filter tuning is not uniformly available across providers. Ask the account team for the current position on your route.

## Audit and monitoring

| Source | What it shows |
|---|---|
| `system.access.audit`, `service_name = 'aibiGenie'` | Genie events; `request_params.space_id` identifies the space |
| `system.query_history` | Genie-originated SQL (client application tagged as Genie space) |
| `system.access.assistant_events` | Genie Code user messages (account, workspace, time, user) |
| Account audit log | Changes to account-level settings such as partner-powered AI features |

Confirm system-table retention for your workspace and export to your SIEM.

## Network and keys

Front-end and back-end Private Link (AWS, Azure, GCP equivalents), VPC or VNet isolation, serverless network connectivity configuration and egress policies, CMK for managed services and storage. Identity federation with the customer's IdP (SSO, SCIM, MFA).
