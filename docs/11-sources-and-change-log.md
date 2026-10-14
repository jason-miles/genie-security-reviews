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
| 2026-10-14 | Home-page tracer gains a workspace-region selector (processed in your Geo, needs cross-Geo, or not available) driven by the verified availability tables; Asia footnote and GCP cells resolved |
| 2026-10-14 | Autocomplete availability filled in for AWS and GCP (raw rows); tracer no longer shows "Not checked" for it |
| 2026-10-14 | AWS deep dive model-path table now lists App Builder, AI/BI assistive visualizations, and AI-generated comments, matching page 03 |
| 2026-10-14 | GCP deep dive Regions section now states example availability results (Chat, autocomplete) instead of only pointing to page 04 |
| 2026-10-14 | README merged with the site's home-page content: thesis, path of a question, six reviewer questions with short answers, evidence grades |
| 2026-10-14 | README and home page: Agent mode and Genie One provider sentence now includes OpenAI on Databricks on AWS and GCP, matching page 03 |
| 2026-10-14 | Leave-behind: Genie Code row separates chat (Azure OpenAI, plus OpenAI on Databricks on AWS/GCP) from agentic (adds Anthropic on Databricks) |
