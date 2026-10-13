# 09. FAQ

Short answers. Sources in [11](11-sources-and-change-log.md); depth in the linked pages.

### Does Genie send my data to an LLM?
It sends what is needed: the question, table and column names and descriptions, instructions, example SQL, and relevant data values. Agent mode, Genie One, and Genie Code can also send query results, cell outputs, or table samples. All of it is bounded by the user's Unity Catalog permissions. See [02](02-what-data-reaches-an-llm.md).

### Is it only metadata?
No. Data values can reach the model. Older material that says Genie has "no access to row-level data" predates current documentation; treat values as in scope.

### Which LLM does Genie use? Is it OpenAI, Anthropic, or Google?
It depends on the feature, mode, and cloud. Chat mode: Azure OpenAI (plus OpenAI on Databricks on AWS/GCP). Agent mode and Genie One: Anthropic on Databricks (plus OpenAI on Databricks on AWS/GCP). Genie Code autocomplete: Databricks-hosted. Google Gemini is not part of the documented Genie assistive path; it is a customer-selectable model elsewhere. There is no user model picker. See [03](03-model-providers-by-cloud.md).

### Do model providers keep or train on our data?
Databricks states partners use zero-data-retention endpoints, including no retention for abuse monitoring, and that Databricks does not use inputs or outputs to train generative foundation models offered to third parties. Databricks still stores conversation history. See [05](05-metadata-retention-and-training.md).

### Where is data processed? Can we keep it in our country?
Data at rest and SQL execution stay in your chosen region. Model inference may run in another Geo when cross-Geo processing is enabled, which is required in Geos that lack native endpoints. Enforcing the Geo setting turns those features off. See [04](04-data-sovereignty-and-geos.md).

### What does "partner-powered AI features" actually switch?
Whether features use partner-hosted models (Azure OpenAI, OpenAI/Anthropic on Databricks) or Databricks-hosted ones. Turning it off removes Genie Agents, Genie One chat, agentic Genie Code, and some others rather than substituting another model. It is being locked on 1 Nov 2026. See [03](03-model-providers-by-cloud.md#upcoming-setting-change).

### Can Genie change or delete data?
Genie generates read-only SQL. Genie Code can run code as the user; destructive categories are hard-blocked and other side-effecting actions pass safety checks and approval, always under the user's permissions. See [06](06-access-control-and-governance.md).

### Can a user see data through Genie that they cannot see otherwise?
Not through interactive use: queries run as the user. Exceptions are customer configuration choices: a shared service principal on machine-to-machine API access, secrets placed in instructions, and views over masked tables sampled with owner permissions.

### Does masking protect what the LLM sees?
Row filters and column masks apply in the SQL engine before rows are sampled or summarized, so masked values are not sent. Use base-table masks and review dynamic views.

### How do we audit it?
`system.access.audit` (`aibiGenie`), `system.query_history`, and `system.access.assistant_events`. Export to your SIEM.

### Is Genie HIPAA / PCI / FedRAMP compliant?
Databricks states regulated workloads are supported on a compliance security profile with the relevant standard, with conditions on feature and cloud. Partner features are disabled by default on such workspaces; some Databricks-hosted fallbacks are supported only for specific standards. Confirm per feature, region, and standard.

### What about prompt injection?
Controls are layered: user-scoped execution, read-only SQL, topic and schema grounding, provider content filters, server-side abuse protection, and for Genie Code, untrusted treatment of retrieved content and constrained approval classifiers. No control makes injection impossible; limit what a user can already reach and what connectors are enabled.

### Is Genie available if the workspace is in a smaller or less common region?
Check the designated-services availability matrix for your region. Some regions rely on cross-Geo processing or have limited availability.

### What if we cannot accept any partner or cross-Geo path?
Disable partner-powered features and enforce the Geo, accepting reduced functionality, or build agents on a model you select via model serving and AI Gateway. See [03](03-model-providers-by-cloud.md#bring-your-own-model-alternatives).

### Is the Conversation API covered by the same controls?
Yes for data authorization if used with user tokens. A service principal collapses authorization to its grants. Prefer OAuth user tokens over a shared PAT.
