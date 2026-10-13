# 10. Security review questionnaire

A question bank for customers to send, or for Databricks teams to pre-answer. "Evidence" is what to attach. Answers should cite the cloud, region, and date.

## A. Scope

| # | Question | Evidence |
|---|---|---|
| A1 | Which products are in scope (Genie Agents, Genie One, Genie Code, App Builder, AI/BI assistive)? Which modes (Chat, Agent, autocomplete)? | Product list |
| A2 | Cloud, region, and compliance security profile status of each workspace? | Workspace inventory |
| A3 | Data classes the in-scope tables hold? | Classification report |

## B. Models and hosting

| # | Question | Evidence |
|---|---|---|
| B1 | For each feature and mode, which model families and hosts process requests (OpenAI, Azure OpenAI, Anthropic, Databricks-hosted, other)? | Provider table for this region |
| B2 | Which of them are hosted inside the Databricks security perimeter? | Written statement |
| B3 | What changes if partner-powered AI features is disabled, per feature? | Feature matrix |
| B4 | How are model versions changed, and is there notice? | Change policy |
| B5 | Is any Google (Gemini) model used by any assistive feature? | Written statement |

## C. Data handling

| # | Question | Evidence |
|---|---|---|
| C1 | Exact categories of data sent per call (prompt, names, descriptions, values, result samples, cell outputs, file uploads)? | Data inventory ([02](02-what-data-reaches-an-llm.md)) |
| C2 | Can Prompt Matching (value sampling) be disabled on every sensitive column, and does it fully remove sampled values from prompts? Are result samples sent in Chat and Agent modes? | Product confirmation |
| C3 | How are masked tables, row filters, and views over them treated in sampling? | Product confirmation |
| C4 | What is stored by Databricks, where, for how long, encrypted how? | Retention statement |
| C5 | Are conversations covered by customer-managed keys? | CMK scope |
| C6 | Any Databricks-side operational retention of inputs/outputs (period, purpose, region)? | Written statement |

## D. Provider terms

| # | Question | Evidence |
|---|---|---|
| D1 | Do providers retain prompts or responses, including for abuse monitoring or human review? | DPA / provider addenda |
| D2 | Are any model classes subject to exceptions (safety-critical retention, coding/routing scenarios)? | Written list |
| D3 | Are inputs or outputs used for training by Databricks or any provider? | Contract clause |
| D4 | Sub-processor list including model hosts and regions? | Sub-processor page |

## E. Sovereignty

| # | Question | Evidence |
|---|---|---|
| E1 | Where does inference run for each feature, with cross-Geo ON and OFF? | Written statement per region |
| E2 | Which Geo processes content when cross-Geo is used? | Written statement |
| E3 | What is stored outside the workspace Geo, if anything? | Statement |
| E4 | Which Geo enforcement and partner settings are set now, by whom, and who may change them? | Settings export, audit events |
| E5 | Does the processing policy prohibit processing or only storage outside the country? | Policy |

## F. Resiliency

| # | Question | Evidence |
|---|---|---|
| F1 | Published availability targets for the control plane and each Genie feature? | SLA |
| F2 | Behaviour on provider or regional capacity failure; fallback? | Statement |
| F3 | RTO/RPO for Genie configuration and conversation data? | DR statement |
| F4 | Notice period for provider or architecture changes? | Policy |

## G. Access and governance

| # | Question | Evidence |
|---|---|---|
| G1 | Under which identity do queries run for UI, API (user and service principal), dashboards, embedding? | Run-as matrix ([06](06-access-control-and-governance.md)) |
| G2 | Are row filters and column masks enforced before sampling? | Test result from your workspace |
| G3 | Controls on agentic execution: approvals, hard blocks, egress? | Genie Code security paper |
| G4 | MCP, skills, external connectors: who approves, what runs with user rights? | Admin config |

## H. Monitoring and incident response

| # | Question | Evidence |
|---|---|---|
| H1 | Which audit tables record Genie and Genie Code activity, with what retention? | Table schema, retention |
| H2 | Can settings changes be alerted on? | Audit event names |
| H3 | Incident notification process and timelines for AI features? | Contract |

## I. Compliance

| # | Question | Evidence |
|---|---|---|
| I1 | Certifications and attestations covering the AI features, per cloud? | SOC 2, ISO 27001/27017/27018, HIPAA, PCI-DSS, HITRUST, FedRAMP reports |
| I2 | Conditions under which a compliance security profile restricts or alters AI features? | Feature matrix |
| I3 | Support for transfer assessments under GDPR, POPIA, and local regimes? | DPA, transfer assessment inputs |

## Verification runbook (run in your workspace)

```sql
-- Identity used for authorization
SELECT current_user(), is_account_group_member('<group>');

-- Prove a mask: run as two personas
SELECT <masked_col> FROM <catalog>.<schema>.<table> LIMIT 5;

-- Masks and row filters on a table
DESCRIBE EXTENDED <catalog>.<schema>.<table>;

-- Every Genie event, who, which space
SELECT event_time, user_identity.email, action_name, request_params.space_id
FROM system.access.audit
WHERE service_name = 'aibiGenie'
ORDER BY event_time DESC;
```

Confirm region, compliance security profile, CMK, Geo enforcement, and partner-powered setting in the account console and workspace settings.
