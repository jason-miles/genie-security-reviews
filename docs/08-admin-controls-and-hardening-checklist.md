# 08. Admin controls and hardening checklist

Use per workspace. Record the value found, the owner, and the date.

## A. Decide the posture first

| Decision | Options |
|---|---|
| Is processing outside the workspace Geo acceptable? | Yes (cross-Geo ON) / No (enforce Geo; some features unavailable) |
| Are partner-powered features acceptable? | Yes / No (Genie Agents, Genie One chat, agentic Genie Code unavailable) |
| Which data classes may reach a model? | Public / internal / confidential / regulated |
| Is value sampling acceptable? | Per Genie Agent |

## B. Account and workspace settings

| # | Control | Where | Recommended review |
|---|---|---|---|
| 1 | Partner-powered AI features | Account console, Settings, Feature enablement; workspace Settings, Advanced | Record value **before 1 Nov 2026**; set Enforce if the account must not be overridden |
| 2 | Enforce data processing within workspace Geography for Designated Services | Account console, Workspace, Security and compliance | Match to the processing policy |
| 3 | Compliance security profile | Workspace | Enable for regulated data (HIPAA, PCI-DSS, and others); changes defaults for cross-Geo and partner features |
| 4 | Region selection | Workspace creation | Choose where data at rest and SQL compute must live |
| 5 | Customer-managed keys | Account console | Cover managed services and storage; check Genie conversation-history coverage |
| 6 | Private Link, network connectivity, serverless egress control | Account/workspace | Lock down data-plane egress, including for serverless |
| 7 | SSO, SCIM, MFA | Identity provider | Joiner-mover-leaver governs Genie access |
| 8 | Genie Code approval policy | Workspace/user settings | Default ask-every-time; review auto-approve use for production workspaces |
| 9 | MCP servers and skills | Workspace admin | Allow-list; treat as software entering the trust boundary |
| 10 | Genie One external connectors | Workspace admin | Disable for restricted workloads |

## C. Unity Catalog hygiene before enabling Genie

- [ ] Least-privilege grants on catalogs, schemas, tables.
- [ ] Column masks and row filters on PII/regulated columns (base tables).
- [ ] Governed tags and policies for sensitive classes.
- [ ] No sensitive strings in table/column names, comments, or descriptions.
- [ ] Views over masked tables reviewed (owner permissions).
- [ ] Data classification run to find unknown sensitive columns.

## D. Per Genie Agent

- [ ] Minimum tables and columns only.
- [ ] Prompt Matching / value sampling disabled for sensitive spaces.
- [ ] Instructions and example SQL contain no secrets, PII, or customer names.
- [ ] Permissions: business users get run-only; manage rights tightly held.
- [ ] Space owner is a least-privilege identity.
- [ ] Conversation API uses user tokens, or a service principal scoped to least privilege.
- [ ] Benchmarks configured; changes reviewed.
- [ ] Definition exported and stored in source control.

## E. Monitoring

- [ ] Alert on `system.access.audit` where `service_name = 'aibiGenie'`.
- [ ] Review `system.access.assistant_events` for Genie Code adoption and anomalies.
- [ ] Export audit and query history to a SIEM.
- [ ] Alert on changes to partner-powered and Geo-enforcement settings (account audit events).
- [ ] Quarterly review of settings and sub-processor changes.

## F. Governance

- [ ] Data-protection impact / transfer assessment documented using the data categories in [02](02-what-data-reaches-an-llm.md).
- [ ] Written provider and retention terms filed (MSA, DPA, provider addenda).
- [ ] Pilot on non-sensitive data with SOC watching audit tables before production.
- [ ] Exit plan: how to disable features and purge conversations.

## Baseline for regulated data (example, adapt to your regime)

| Area | Setting |
|---|---|
| Region | In-country or approved region |
| Cross-Geo | As required; documented as a transfer where ON |
| Value sampling | Off on sensitive spaces |
| Masks/filters | On base tables for all regulated columns |
| Keys | CMK |
| Network | Private Link; egress locked |
| Audit | System tables to SIEM |
| Genie Code | Ask-every-time; MCP/skills allow-listed |
