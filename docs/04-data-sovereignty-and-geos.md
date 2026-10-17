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

The designated-services page states: "Your data is not stored outside of your workspace's Geo regardless of this setting." It is a statement about storage, not processing.

With cross-Geo processing **disabled**, the page lists these countries as processing designated services within the same country: Brazil, Canada, Japan, Korea, Singapore, and the United Kingdom (footnote ‡ in the tables below). A feature marked with an asterisk is available only when cross-Geo processing is enabled.

## Processing vs storage: pick the policy first

| Customer policy | Consequence |
|---|---|
| No **storage** outside the country/Geo | Consistent with the documented behaviour |
| No **processing** outside the country | Cannot be met for features lacking native in-country availability; enforcing the Geo makes them unavailable |
| No processing outside a **region bloc** (for example EU) | Use a workspace in a Geo where the feature is native (for example the EU data boundary) |

## Availability by Geo and region (designated-services pages, checked 13 Oct 2026)

Key: **Native** = processed in the workspace's Geo. **Cross-Geo** = available only when cross-Geo processing is enabled (\* in the source). **No** = not available. The footnote markers explain extra routing and are listed below each table.

### AWS and GCP (by Geo)

Both pages were read as raw table cells. For the features below the AWS and GCP cells are identical; GCP has no Genie App Builder row.

| Geo | Genie Agents Chat | Agent mode and Genie One chat | Genie Code agentic | Genie Code chat and cell actions | AI/BI dashboards | AI-generated comments | Genie App Builder (AWS) |
|---|---|---|---|---|---|---|---|
| Americas | Native ‡ | Native | Native | Native ‡ | Native ‡ | Native ‡ | Native |
| Asia | Native § | Native † | Native | Native ‡ | Native ‡ | Native ‡ | Cross-Geo |
| Australia and New Zealand | Native | Native | Native | Native | Native | Cross-Geo | Cross-Geo |
| Europe | Native ‡ | Native | Native | Native ‡ | Native ‡ | Native ‡ | Native |
| India | Native | Cross-Geo | Cross-Geo | Native | Native | Cross-Geo | Cross-Geo |
| Mainland China | No | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | No |
| Middle East and Africa | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | No |

- **‡** When cross-Geo is disabled, traffic is processed within the same country or territory as the workspace for **Brazil, Canada, Japan, Korea, Singapore, and the United Kingdom**. For other countries in the Asia Geo, the feature is supported by models in the Asia Geo.
- **†** Asia Geo traffic can be sent for processing within regions in Japan, South Korea, or Singapore.
- **§** For Genie Agents Chat in Asia: with cross-Geo disabled, traffic is processed in the same country for **Japan and Korea**; **Indonesia** traffic is processed in the Asia Geo; for other Asia countries, **including Singapore and Hong Kong**, the feature requires cross-Geo.
- Foundation Model API requests from Americas workspaces are processed within the United States unless cross-Geo is enabled (footnote on the AWS page).
- Genie App Builder has no row on the GCP page; treat as not available on GCP.

### Azure (by country or region)

Azure's page lists regions individually (and labels the model provider "Azure AI Services" for Chat mode, and "Anthropic on Databricks" for Agent mode and Genie One).

| Region | Genie Agents Chat | Agent mode and Genie One chat | Genie Code agentic | Genie Code chat and cell actions | AI/BI dashboards | AI-generated comments | Genie App Builder |
|---|---|---|---|---|---|---|---|
| United States | Native | Native | Native | Native | Native | Native | Native |
| Canada | Native | Cross-Geo | Cross-Geo | Native | Native | Native | Cross-Geo |
| Brazil | Native | Cross-Geo | Cross-Geo | Native | Native | Native | Cross-Geo |
| Mexico | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | No |
| Asia Pacific | Cross-Geo | Cross-Geo | Cross-Geo | Native | Native | Native | Cross-Geo |
| Japan | Native | Native | Native | Native | Native | Native | Cross-Geo |
| South Korea | Native | Cross-Geo | Cross-Geo | Native | Native | Native | No |
| Australia | Native | Native | Native | Native | Native | Native | Cross-Geo |
| EU Data Boundary | Native | Native | Native | Native | Native | Native | Native |
| United Kingdom | Native | Cross-Geo | Native | Native | Native | Native | Cross-Geo |
| UAE | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | No |
| Qatar | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | No | No | No |
| India | Native | Cross-Geo | Cross-Geo | Native | Native | Native | Cross-Geo |
| South Africa | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | Cross-Geo | No |

Azure states that for AI assistive features in US and EU regions, regardless of the cross-Geo setting, workspaces in the Americas use a US-based model and workspaces in Europe (EU Data Boundary and UK) use a Europe-based model, and Designated Services in the EU Data Boundary rely on EU data centers. It also notes that where several models serve a feature, some may be available only with cross-Geo enabled; see the model-availability-by-region page.

### AI-based autocomplete (Databricks-hosted)

- **AWS and GCP:** native in the Americas (US model) and Europe; cross-Geo required in Asia, Australia and New Zealand, India, Mainland China, and the Middle East and Africa.
- **Azure:** native in the United States and the EU Data Boundary; cross-Geo required in every other listed region except Qatar, where it is not available.

### Reading the tables

- A feature that is **Native** in your Geo or region is processed there with enforcement ON.
- A feature marked **Cross-Geo** stops working if you enforce the Geo. For a policy that forbids processing outside a country, that decides the question.
- **No** means the feature is not offered in that region at all (for example AI/BI dashboards, AI-generated comments, and Genie App Builder in Qatar on Azure).
- The tables differ by cloud. Re-check the page for your cloud and region before any commitment.

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
