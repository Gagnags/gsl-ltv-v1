export type EventCategory =
  | "Sessions & Activity"
  | "Core Gameplay Engagement"
  | "Social & Community Interaction"
  | "Subscription & Financials"
  | "IAP & Economy"
  | "Ads & Monetization"
  | "Service & Account Management"
  | "Other";

export type EventSubcategory = string;

export const CATEGORY_TO_SUBCATEGORIES: Record<EventCategory, EventSubcategory[]> = {
  "Sessions & Activity": [
    "session_started",
    "session_ended",
    "app_open",
    "app_uninstall",
  ],
  "Core Gameplay Engagement": [
    "game_completed",
    "level_progressed",
    "feature_used",
  ],
  "Social & Community Interaction": [
    "guild_joined",
    "guild_left",
    "chat_sent",
    "friend_added",
  ],
  "Subscription & Financials": [
    "subscription_billed",
    "subscription_plan_changed",
    "subscription_cancel_intent",
    "subscription_churned_voluntary",
    "subscription_churned_involuntary",
    "trial_started",
    "trial_converted",
    "trial_cancelled",
    "payment_retry_attempted",
    "payment_retry_success",
    "refund_issued / chargeback_received",
  ],
  "IAP & Economy": [
    "iap_purchase_initiated",
    "iap_purchase_success",
    "iap_purchase_failed",
    "iap_refund_issued / chargeback_received",
    "virtual_currency_purchased",
    "virtual_currency_spent",
  ],
  "Ads & Monetization": [
    "ad_impression",
    "ad_click",
    "ad_reward_claimed",
    "ad_skipped",
    "ad_revenue_reported",
  ],
  "Service & Account Management": [
    "support_ticket_created",
    "support_ticket_updated",
    "account_created",
    "account_deleted",
    "ban_issued",
    "compensation_credit",
  ],
  Other: [],
};

export const SUBCATEGORY_TO_PAYLOADS: Record<string, string[]> = {
  session_started: ["session_id"],
  session_ended: ["session_id", "session_duration_seconds"],
  app_open: ["source"],
  app_uninstall: ["device_id"],
  game_completed: ["game_id", "game_type", "duration_seconds", "outcome"],
  level_progressed: ["progress_node_id", "progress_type", "delta"],
  feature_used: ["feature_name", "interaction_type"],
  guild_joined: ["guild_id", "guild_size", "guild_level"],
  guild_left: ["guild_id", "leave_reason"],
  chat_sent: ["channel", "length"],
  friend_added: ["friend_id"],
  subscription_billed: [
    "plan_id",
    "subscription_term",
    "renewal_count",
    "gross_revenue",
    "platform_fee",
    "taxes",
    "net_revenue",
    "payment_provider",
    "transaction_id",
    "billing_cycle_start",
    "billing_cycle_end",
  ],
  subscription_plan_changed: [
    "previous_plan_id",
    "new_plan_id",
    "change_type",
    "new_term_net_revenue",
  ],
  subscription_cancel_intent: ["days_until_renewal"],
  subscription_churned_voluntary: [
    "plan_id",
    "subscription_lifetime_days",
    "reason_for_leaving",
  ],
  subscription_churned_involuntary: [
    "plan_id",
    "subscription_lifetime_days",
    "final_failure_reason_code",
  ],
  trial_started: ["trial_id", "trial_term"],
  trial_converted: ["plan_id", "subscription_term", "net_revenue"],
  trial_cancelled: ["trial_id", "cancel_reason"],
  payment_retry_attempted: ["attempt_number", "failure_reason"],
  payment_retry_success: ["attempt_number", "amount_net"],
  "refund_issued / chargeback_received": [
    "transaction_id",
    "refund_amount_net",
    "refund_reason",
  ],
  iap_purchase_initiated: ["item_id", "item_category", "listed_price", "currency"],
  iap_purchase_success: [
    "item_id",
    "item_category",
    "gross_revenue",
    "taxes",
    "platform_fee",
    "net_revenue",
    "payment_provider",
    "transaction_id",
  ],
  iap_purchase_failed: ["item_id", "failure_reason"],
  "iap_refund_issued / chargeback_received": [
    "transaction_id",
    "refund_amount_net",
    "refund_reason",
  ],
  virtual_currency_purchased: [
    "package_id",
    "gross_revenue",
    "net_revenue",
    "amount_virtual_currency",
  ],
  virtual_currency_spent: [
    "currency_type",
    "amount_spent",
    "item_id",
    "item_category",
    "current_balance",
  ],
  ad_impression: ["ad_unit_id", "ad_type", "placement", "revenue_per_impression"],
  ad_click: ["ad_unit_id", "ad_type", "placement", "click_id"],
  ad_reward_claimed: ["ad_unit_id", "reward_type", "reward_amount"],
  ad_skipped: ["ad_unit_id", "ad_type", "skip_timestamp"],
  ad_revenue_reported: [
    "ad_network",
    "ad_unit_id",
    "impressions",
    "gross_revenue",
    "net_revenue",
    "currency",
  ],
  support_ticket_created: ["ticket_id", "ticket_category", "severity"],
  support_ticket_updated: ["ticket_id", "status", "resolution_code"],
  account_created: ["method"],
  account_deleted: ["reason"],
  ban_issued: ["reason", "duration"],
  compensation_credit: ["amount", "currency", "reason"],
};

export const DEFAULT_EVENT_TAGS_STORAGE_KEY = "ltv:dataLayer:eventTags"; 