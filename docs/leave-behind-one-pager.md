# Genie security at a glance

*Customer leave-behind. Reviewed 13 Oct 2026. Confirm specifics for your cloud and region with your Databricks account team. Not a contractual commitment.*

## Six things to know

1. **Your data stays where you put it.** Tables stay in your cloud storage. SQL runs on your warehouse in your chosen region.
2. **The model sees what the user could already see.** Prompts can include the question, table and column names and descriptions, instructions, example SQL, relevant data values, and for some features result samples or code outputs. Everything is bounded by Unity Catalog permissions, row filters, and column masks.
3. **Queries run as the person asking.** Genie cannot widen access. Genie Agents generate read-only SQL.
4. **Partners do not keep or train on it.** Databricks states model partners use zero-data-retention endpoints, including no retention for abuse monitoring, and that your inputs and outputs are not used to train foundation models offered to third parties. Databricks does store conversation history, encrypted.
5. **Processing location is a setting.** Where native endpoints do not exist in your Geo, features work only with cross-Geo processing on. Turning enforcement on keeps processing in-Geo and disables those features.
6. **It is auditable.** Genie events land in Databricks system tables you can send to your SIEM.

## Which model, for which feature

| Feature | Model host (partner-powered on) |
|---|---|
| Genie Agents Chat | Azure OpenAI (plus OpenAI on Databricks on AWS/GCP) |
| Genie Agents Agent mode, Genie One | Anthropic on Databricks (plus OpenAI on Databricks on AWS/GCP) |
| Genie Code | Autocomplete Databricks-hosted; chat and agentic by Azure OpenAI, OpenAI, Anthropic |
| Google Gemini | Not used by Genie assistive features; available as a model you choose elsewhere |

## Controls you own

| Control | Why |
|---|---|
| Unity Catalog masks and filters on sensitive columns | Redacted before anything is sampled |
| Minimum tables and columns per Genie Agent | Less data in prompts |
| Turn off value sampling on sensitive spaces | Schema-only prompts |
| No secrets or PII in instructions and descriptions | Visible to viewers and sent to the model |
| Geo enforcement and partner-powered settings | Residency and provider choice |
| Customer-managed keys, Private Link, egress control | Key custody and network |
| Audit alerts and quarterly settings review | Detect drift |

## Date to remember

The partner-powered AI features setting is removed on **1 Nov 2026**. Record your current value before then; later changes go through your account team.

## Next steps

1. Run the verification queries in the questionnaire in your workspace.
2. Get provider terms, sub-processors, and regional processing in writing.
3. Pilot on non-sensitive data with your SOC watching the audit tables.

Full library: https://github.com/jason-miles/genie-security-reviews
