# Provider matrix (compact)

Reviewed 13 Oct 2026. Source: partner-powered AI features pages for AWS, Azure, GCP. "On" = partner-powered AI features enabled. Verify before use.

| Feature | AWS (On) | Azure (On) | GCP (On) | Off |
|---|---|---|---|---|
| Genie Code autocomplete | Databricks | Databricks | Databricks | Databricks |
| Genie Code non-agentic | Azure OpenAI, OpenAI on Databricks | Azure OpenAI | Azure OpenAI, OpenAI on Databricks | Databricks (non-CSP); CSP by standard |
| Genie Code agentic | Azure OpenAI, OpenAI, Anthropic on Databricks | Azure OpenAI, Anthropic on Databricks | Azure OpenAI, OpenAI, Anthropic on Databricks | N/A |
| Genie Agents Chat | Azure OpenAI, OpenAI on Databricks | Azure OpenAI | Azure OpenAI, OpenAI on Databricks | N/A |
| Genie Agents Agent mode | OpenAI, Anthropic on Databricks | Anthropic on Databricks | OpenAI, Anthropic on Databricks | N/A |
| Genie One | OpenAI, Anthropic on Databricks | Anthropic on Databricks | OpenAI, Anthropic on Databricks | Chat N/A; data access stays |
| Genie App Builder | OpenAI, Anthropic on Databricks | Azure OpenAI, Anthropic on Databricks | Not available | N/A |
| AI/BI dashboard assistive | Azure OpenAI | Azure OpenAI | Azure OpenAI | N/A |
| AI-generated comments | Azure OpenAI | Azure OpenAI | Azure OpenAI | Databricks |

Provider families outside this table (Google Gemini, Meta, Qwen, xAI, DeepSeek, others) appear in Databricks-hosted inference as customer-selected models, not as Genie assistive providers.

Footnote: Anthropic on Databricks is described as hosted by Databricks within its security perimeter. Q3 in [open questions](open-questions.md) tracks cross-cloud hosting.

The GCP column was checked row by row against https://docs.databricks.com/gcp/en/databricks-ai/partner-powered on 13 Oct 2026. Re-check all columns when features change.
