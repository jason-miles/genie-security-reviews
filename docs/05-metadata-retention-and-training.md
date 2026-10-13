# 05. Metadata, retention, and training

## Three separate questions

| Question | Documented answer (public) |
|---|---|
| Do model partners retain prompts or responses? | No. Databricks states partner endpoints are zero-data-retention, "even for abuse monitoring" |
| Is customer data used to train models? | No. Databricks does not use these inputs or outputs to train generative foundation models it makes available to third parties |
| Does Databricks itself store anything? | Yes. Conversation history and Genie metadata are stored (below) |

"Zero retention at the partner" is a statement about the **model provider**. It is not a claim that nothing is stored anywhere.

## What Databricks stores

| Item | Where | Notes |
|---|---|---|
| Genie Agents / Genie One conversations and responses | Control-plane database, AES-256 encrypted | Kept while the Genie Agent exists; visible to the user and, per sharing settings, to others with access |
| Genie Agent configuration (instructions, example SQL, descriptions, feedback) | Control-plane database | Visible to anyone with view access to the Agent; keep secrets and PII out |
| Genie Code chat history | Same location as notebook content | Follows notebook storage and permissions |
| Query results (row-level data) | **Not** stored or cached in the control plane | Held in the SQL result cache on the compute plane and retrieved or recomputed |
| Table data | Customer storage | Never copied to Databricks-owned storage by Genie |

## Provider-specific notes

| Provider route | Retention statement (as documented) | Caveats |
|---|---|---|
| Azure OpenAI service (via Databricks) | Zero-retention; Databricks states it has opted out of Microsoft abuse-monitoring storage and human review | Applies to the Databricks-managed deployment, not to a customer's own Azure OpenAI resource. Content filtering still runs |
| Anthropic on Databricks | Zero-retention; Databricks-hosted | Databricks field guidance notes some safety-critical model classes carry an abuse-monitoring retention term; confirm for the exact model |
| OpenAI on Databricks | Zero-retention | Field guidance notes possible retention in specified coding or routing scenarios; confirm |
| Google Gemini (customer-selected) | Per the Foundation Model APIs terms and the Google endpoint agreement | Not part of the Genie assistive path |
| Customer-provided external model | Per the customer's own contract | Customer manages the agreement |

Some Databricks field material states that Databricks may keep inputs and outputs for a limited operational period (figures such as 30 days have been quoted) in-region for abuse prevention, never for training. This is not a public-doc statement; **get it in writing** (open question Q5).

## Encryption

- In transit: TLS between Databricks and model partners and throughout the platform.
- At rest: AES-256 for the control-plane database and workspace data.
- Customer-managed keys (CMK) for **managed services** cover control-plane data. The **Azure** page lists Genie Agents and states only agents created after **10 April 2025** are CMK-compatible. The **AWS and GCP** CMK pages do not list Genie Agents, and AI/BI dashboards are compatible only if created after 1 Nov 2024. Whether conversation data is covered is not stated on any cloud; confirm (Q8). See the [cloud pages](clouds/aws.md).
- CMK does not extend to a model provider's own hosted weights or infrastructure.

## What "metadata" means here

Metadata sent to a model includes table, column, and schema names, descriptions, comments, tags in descriptions, example SQL, instructions, and sometimes sampled values. Treat these strings as **data** for classification purposes. Many reviews miss that:

- Column names can encode sensitive concepts (`hiv_status`, `salary_band`).
- Descriptions written by humans can contain customer names, internal project codes, or credentials.
- Example SQL can contain literal values.

## Deletion and subject rights

- Deleting a Genie Agent removes its stored metadata and conversations from the control plane (confirm retention of backups with the account team).
- Genie Code chat history follows notebook deletion.
- For data-subject requests, map Genie artifacts (conversations, instructions) to the same process used for other workspace content.

## Questions to put in writing

See [questionnaire](10-security-review-questionnaire.md), sections C and D.
