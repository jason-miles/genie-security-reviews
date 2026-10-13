# 03. Model providers by cloud

Provider, host, location, and retention are four separate questions ([00](00-how-to-use.md)). This page covers provider and host.

## The "partner-powered AI features" setting

Controls whether certain features use partner-hosted models or Databricks-hosted models.

- Enabled by default for workspaces **without** a compliance security profile (CSP); disabled by default for CSP workspaces.
- Can be set at account level (with an optional *Enforce* to block workspace overrides) or at workspace level. Account-level changes are recorded as an account audit event.
- "Anthropic on Databricks" means endpoints hosted by Databricks **within the Databricks security perimeter**, so partner-powered does not always mean traffic leaves Databricks.

## Provider by feature

Reviewed 13 Oct 2026. Rows marked with a cloud list differences; unmarked rows are the same on AWS, Azure, and GCP.

| Feature | Setting **enabled** | Setting **disabled** |
|---|---|---|
| Genie Code autocomplete | Databricks-hosted | Databricks-hosted |
| Genie Code non-agentic (chat, cell actions) | **AWS/GCP:** Azure OpenAI service and OpenAI on Databricks. **Azure:** Azure OpenAI service | Databricks-hosted for non-CSP. On CSP workspaces: **AWS** HIPAA (all supported regions), FedRAMP Moderate (US), PCI-DSS and HITRUST (US, Australia and New Zealand); **Azure** HIPAA only; other standards unsupported |
| Genie Code agentic | **AWS/GCP:** Azure OpenAI, OpenAI on Databricks, Anthropic on Databricks. **Azure:** Azure OpenAI and Anthropic on Databricks | Not available |
| Genie Agents Chat mode | **AWS/GCP:** Azure OpenAI service and OpenAI on Databricks. **Azure:** Azure OpenAI service | Not available |
| Genie Agents Agent mode | **AWS/GCP:** OpenAI on Databricks and Anthropic on Databricks. **Azure:** Anthropic on Databricks | Not available |
| Genie One | **AWS/GCP:** OpenAI on Databricks and Anthropic on Databricks. **Azure:** Anthropic on Databricks | Chat unavailable; data-asset access retained |
| Genie App Builder | **AWS:** OpenAI and Anthropic on Databricks. **Azure:** Azure OpenAI and Anthropic on Databricks. **GCP:** not available | Not available |
| AI/BI dashboard assistive visualizations | Azure OpenAI service | Not available |
| AI-generated comments | Azure OpenAI service | Databricks-hosted |
| LLMs as judges, synthetic data generation | Azure OpenAI service | User must specify a model / not available |

## Provider families

| Family | Role in Genie features | Notes |
|---|---|---|
| **OpenAI** | "OpenAI on Databricks" (AWS/GCP tables) and the Azure OpenAI service | Azure OpenAI is Microsoft-operated; Databricks states partner zero-data-retention endpoints, including no retention for abuse monitoring |
| **Anthropic** | "Anthropic on Databricks" for agentic features, Genie Agents Agent mode, Genie One | Hosted by Databricks within its security perimeter; Anthropic built-in safety mechanisms apply |
| **Google (Gemini)** | **Not listed as a provider for Genie assistive features** in the partner-powered tables on AWS, Azure, or GCP as reviewed. Gemini models are available as **customer-selected** models through Databricks-hosted inference (Foundation Model APIs / AI Gateway), which is a different path from the assistive features above | Do not assume Genie uses Gemini on GCP. To confirm for future releases |
| **Databricks-hosted** | Autocomplete, AI-generated comments (setting off), non-agentic Genie Code (setting off), data classification, AI Search reranker | Cross-Geo processing may be needed outside the US and EU data boundary |
| **Other open-weight and proprietary families** (Meta, Qwen, xAI, DeepSeek, and others) | Offered as selectable models in Databricks-hosted inference. The inference overview states the listed models are hosted by Databricks, that "listing a model does not send customer data to it for inference," and that availability depends on workspace region and cross-Geo settings | Not used by the Genie assistive features in the tables above |

## Clouds

| Cloud | Notes |
|---|---|
| **AWS** | Tables include OpenAI on Databricks in addition to the Azure OpenAI service |
| **Azure** | Azure OpenAI service is the OpenAI path; Azure customers keep Microsoft Learn as the documentation home |
| **GCP** | Same feature matrix as AWS; no Google-hosted model for the assistive features |

## Upcoming setting change

Public documentation (12 Oct 2026) states the partner-powered AI features setting is being removed:

- Workspaces with it enabled can no longer disable it via the settings-page toggle.
- Until **1 Nov 2026** the Settings API can still enable or disable it.
- From **1 Nov 2026** the toggle and API setting are removed; existing values remain; later changes go through the Databricks account team.

Action for security teams: record the current value per workspace **before** 1 Nov 2026 and decide whether the account team should change it.

## Bring-your-own-model alternatives

Where a customer cannot accept any partner or cross-Geo model path, options include building agents on a customer-selected model through AI Gateway / model serving, or disabling the partner-powered features and using only Databricks-hosted capabilities. Both trade functionality for control and should be scoped with the account team.
