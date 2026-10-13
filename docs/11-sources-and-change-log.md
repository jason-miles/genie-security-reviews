# 11. Sources and change log

## Source tiers

| Tier | Meaning | Use |
|---|---|---|
| **P** Public | Published Databricks or cloud-provider documentation | Cite directly |
| **D** Databricks-provided | Field or product-security material shared under normal customer-relationship terms or NDA; not republished here | Facts re-expressed generically and flagged "confirm in writing". Ask the account team for the original |
| **O** Open | Unconfirmed | Tracked in [open questions](../notes/open-questions.md) |

No Tier D document is reproduced in this repository.

## Tier P: public sources (reviewed 13 Oct 2026)

| Topic | Source |
|---|---|
| AI assistive features trust and safety (AWS) | https://docs.databricks.com/aws/en/databricks-ai/databricks-ai-trust |
| AI assistive features trust and safety (Azure) | https://learn.microsoft.com/en-us/azure/databricks/databricks-ai/databricks-ai-trust |
| Partner-powered AI features (AWS) | https://docs.databricks.com/aws/en/databricks-ai/partner-powered |
| Partner-powered AI features (Azure) | https://learn.microsoft.com/en-us/azure/databricks/databricks-ai/partner-powered |
| Partner-powered AI features (GCP) | https://docs.databricks.com/gcp/en/databricks-ai/partner-powered |
| Databricks Geos | https://docs.databricks.com/aws/en/resources/databricks-geos |
| Designated services | https://docs.databricks.com/aws/en/resources/designated-services |
| Genie Agents concepts | https://docs.databricks.com/aws/en/genie-agents/concepts |
| Databricks-hosted inference overview | https://docs.databricks.com/aws/en/machine-learning/model-serving/foundation-model-overview |
| Customer-managed keys (AWS) | https://docs.databricks.com/aws/en/security/keys/customer-managed-keys |
| Customer-managed keys (Azure) | https://learn.microsoft.com/en-us/azure/databricks/security/keys/customer-managed-keys |
| Customer-managed keys (GCP) | https://docs.databricks.com/gcp/en/security/keys/customer-managed-keys |
| Compliance security profile | https://docs.databricks.com/aws/en/security/privacy/security-profile |
| Azure OpenAI abuse monitoring | https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/abuse-monitoring |
| Databricks Security and Trust Center | https://www.databricks.com/trust |

Genie Agents were previously called Genie Spaces; check older URLs for renamed pages.

## Tier D: Databricks-provided material consulted (not republished)

- Genie and AI-features security FAQ and architecture references.
- Model guardrails assessment for Genie and Genie Code.
- Genie Code Agent Mode security paper.
- Field cross-Geo availability research.

Facts drawn from these and used above: result-summary sampling, Prompt Matching sampling limits, owner-permission sampling for views over masked tables, CMK scope for Genie history, operational retention period, provider exception classes, Genie Code execution-safety design, system-table names. Each is flagged for written confirmation in [10](10-security-review-questionnaire.md).

## Change log

| Date | Change |
|---|---|
| 2026-10-13 | Initial library: pages 00 to 11, provider matrix, open questions |
| 2026-10-13 | Added AWS, Azure, GCP deep dives, one-page leave-behind, fillable questionnaire (xlsx/csv) and generator script; CMK coverage now cites public docs |
| 2026-10-13 | Verbatim re-check of provider, Geo, CMK, Prompt Matching, and trust pages; five corrections (see notes/claims-register.md); added interactive home page (`index.html`) |
