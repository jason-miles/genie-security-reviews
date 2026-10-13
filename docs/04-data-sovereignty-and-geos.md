# 04. Data sovereignty and Geos

## Residency has four layers

| Layer | Question | Typical answer |
|---|---|---|
| **Data at rest** | Where are tables stored? | Customer's own object storage (S3, ADLS Gen2, GCS) in the chosen region |
| **SQL execution** | Where does the query run? | Customer's classic compute, or region-pinned serverless compute |
| **Control-plane state** | Where is conversation history kept? | Databricks control plane for the workspace region; encrypted |
| **Model inference** | Where does the LLM process the prompt? | Depends on provider, feature, region, and the cross-Geo setting |

Inference is the layer that most often differs from the other three.

## Databricks Geos

A **Geo** is a group of regions used to manage residency of Databricks-operated services. Public documentation lists: Americas (US, Brazil, Canada); Asia (Hong Kong, Indonesia, Japan, South Korea, Singapore); Australia and New Zealand; Europe (EEA, Switzerland, UK); India; Mainland China; Middle East and Africa (Qatar, South Africa, UAE). Confirm the current list in the source.

A Geo is not a country. A workspace in one country can be in a Geo that spans several.

## Designated Services

AI features that run on Databricks-operated model endpoints are **Designated Services** (for example Foundation Model APIs, AI Functions, Genie Agents, Genie One chat, Genie Code, AI-generated comments, AI/BI dashboards, Genie App Builder, data classification). Their availability is published per Geo and region.

## The cross-Geo setting

**Setting:** *Enforce data processing within workspace Geography for Designated Services* (Account console, Workspace, Security and compliance).

| Setting value | Effect |
|---|---|
| **ON** (enforce) | Cross-Geo processing **disabled**. Designated Services work only where natively available in the workspace's Geo |
| **OFF** | Cross-Geo processing **enabled**. Content may be processed in another Geo |

The wording is inverted: enforcement ON means cross-Geo OFF.

Documented defaults: cross-Geo is **enabled by default** for workspaces in Geos outside the US and EU that have no compliance security profile. Workspaces with a compliance security profile do not get cross-Geo enabled by default.

Databricks states persistent customer data is **not stored** outside the workspace Geo because of this setting. It is a statement about storage, not processing.

## Processing vs storage: pick the policy first

| Customer policy | Consequence |
|---|---|
| No **storage** outside the country/Geo | Consistent with the documented behaviour |
| No **processing** outside the country | Cannot be met for features lacking native in-country availability; enforcing the Geo makes them unavailable |
| No processing outside a **region bloc** (for example EU) | Use a workspace in a Geo where the feature is native (for example the EU data boundary) |

## Regional availability pattern (illustrative; verify per region)

| Situation | Genie Agents / One / dashboards |
|---|---|
| Workspace in a Geo with native model endpoints (for example US, EU) | Processed in-Geo; enforcement can stay ON |
| Workspace in a Geo without native endpoints (for example some Middle East and Africa regions) | Works only with cross-Geo enabled; enforcement turns the feature off |
| Mainland China, some Middle East and Africa regions | Limited availability |

Public documentation does **not** state which Geo processes the content when cross-Geo is used. Do not assume it is a specific region; ask the account team.

## Frontier-model nuance

- **Databricks-hosted Anthropic endpoints** sit inside the Databricks security perimeter. Documentation for Azure and the other clouds describes them as Databricks-hosted. Field guidance has described cross-cloud routing for some combinations (for example an Azure workspace using Claude hosted on another cloud). See [open questions](../notes/open-questions.md) Q3 and confirm for the exact region.
- **Azure OpenAI** processing follows the Azure OpenAI deployment geography Databricks uses; confirm the region in writing.
- **Google Gemini** is customer-selected through Foundation Model APIs; its region follows the endpoint, not the Genie setting.

## Evidence to request for a sovereignty sign-off

1. Written statement of where inference runs for each feature in the customer's workspace region, with cross-Geo ON and OFF.
2. Sub-processor list including model hosts.
3. Screenshot or API export of the Geo enforcement and partner-powered settings per workspace.
4. Retention terms for control-plane conversation history and any Databricks-side operational storage.
5. Transfer-assessment inputs (what categories of data cross: prompt text, metadata, sampled values, result samples). See [02](02-what-data-reaches-an-llm.md).

## Regulatory framing

No platform grants "compliance" with data-protection law (GDPR, POPIA, UAE and Qatar regimes, and others). Databricks supplies controls (region pinning, Geo enforcement, Unity Catalog masking, customer-managed keys, audit); the customer, as controller, performs the transfer and lawful-basis assessment.
