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

export type ValueType = "String" | "Int" | "Float" | "Date" | "String(optional)";

export interface PayloadDefinition {
  name: string;
  valueType: ValueType;
}

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

export const SUBCATEGORY_TO_PAYLOADS: Record<string, PayloadDefinition[]> = {
  session_started: [{ name: "session_id", valueType: "String" }],
  session_ended: [
    { name: "session_id", valueType: "String" },
    { name: "session_duration_seconds", valueType: "Int" }
  ],
  app_open: [{ name: "source", valueType: "String" }],
  app_uninstall: [{ name: "device_id", valueType: "String" }],
  game_completed: [
    { name: "game_id", valueType: "String" },
    { name: "game_type", valueType: "String" },
    { name: "duration_seconds", valueType: "Int" },
    { name: "outcome", valueType: "String" }
  ],
  level_progressed: [
    { name: "progress_node_id", valueType: "String" },
    { name: "progress_type", valueType: "String" },
    { name: "delta", valueType: "Int" }
  ],
  feature_used: [
    { name: "feature_name", valueType: "String" },
    { name: "interaction_type", valueType: "String" }
  ],
  guild_joined: [
    { name: "guild_id", valueType: "String" },
    { name: "guild_size", valueType: "Int" },
    { name: "guild_level", valueType: "Int" }
  ],
  guild_left: [
    { name: "guild_id", valueType: "String" },
    { name: "leave_reason", valueType: "String" }
  ],
  chat_sent: [
    { name: "channel", valueType: "String" },
    { name: "length", valueType: "Int" }
  ],
  friend_added: [{ name: "friend_id", valueType: "String" }],
  subscription_billed: [
    { name: "plan_id", valueType: "String" },
    { name: "subscription_term", valueType: "String" },
    { name: "renewal_count", valueType: "Int" },
    { name: "gross_revenue", valueType: "Float" },
    { name: "platform_fee", valueType: "Float" },
    { name: "taxes", valueType: "Float" },
    { name: "net_revenue", valueType: "Float" },
    { name: "payment_provider", valueType: "String" },
    { name: "transaction_id", valueType: "String" },
    { name: "billing_cycle_start", valueType: "Date" },
    { name: "billing_cycle_end", valueType: "Date" }
  ],
  subscription_plan_changed: [
    { name: "previous_plan_id", valueType: "String" },
    { name: "new_plan_id", valueType: "String" },
    { name: "change_type", valueType: "String" },
    { name: "new_term_net_revenue", valueType: "Float" }
  ],
  subscription_cancel_intent: [{ name: "days_until_renewal", valueType: "Int" }],
  subscription_churned_voluntary: [
    { name: "plan_id", valueType: "String" },
    { name: "subscription_lifetime_days", valueType: "Int" },
    { name: "reason_for_leaving", valueType: "String(optional)" }
  ],
  subscription_churned_involuntary: [
    { name: "plan_id", valueType: "String" },
    { name: "subscription_lifetime_days", valueType: "Int" },
    { name: "final_failure_reason_code", valueType: "String" }
  ],
  trial_started: [
    { name: "trial_id", valueType: "String" },
    { name: "trial_term", valueType: "String" }
  ],
  trial_converted: [
    { name: "plan_id", valueType: "String" },
    { name: "subscription_term", valueType: "String" },
    { name: "net_revenue", valueType: "Float" }
  ],
  trial_cancelled: [
    { name: "trial_id", valueType: "String" },
    { name: "cancel_reason", valueType: "String" }
  ],
  payment_retry_attempted: [
    { name: "attempt_number", valueType: "Int" },
    { name: "failure_reason", valueType: "String" }
  ],
  payment_retry_success: [
    { name: "attempt_number", valueType: "Int" },
    { name: "amount_net", valueType: "Float" }
  ],
  "refund_issued / chargeback_received": [
    { name: "transaction_id", valueType: "String" },
    { name: "refund_amount_net", valueType: "Float" },
    { name: "refund_reason", valueType: "String" }
  ],
  iap_purchase_initiated: [
    { name: "item_id", valueType: "String" },
    { name: "item_category", valueType: "String" },
    { name: "listed_price", valueType: "Float" },
    { name: "currency", valueType: "String" }
  ],
  iap_purchase_success: [
    { name: "item_id", valueType: "String" },
    { name: "item_category", valueType: "String" },
    { name: "gross_revenue", valueType: "Float" },
    { name: "taxes", valueType: "Float" },
    { name: "platform_fee", valueType: "Float" },
    { name: "net_revenue", valueType: "Float" },
    { name: "payment_provider", valueType: "String" },
    { name: "transaction_id", valueType: "String" }
  ],
  iap_purchase_failed: [
    { name: "item_id", valueType: "String" },
    { name: "failure_reason", valueType: "String" }
  ],
  "iap_refund_issued / chargeback_received": [
    { name: "transaction_id", valueType: "String" },
    { name: "refund_amount_net", valueType: "String" },
    { name: "refund_reason", valueType: "String" }
  ],
  virtual_currency_purchased: [
    { name: "package_id", valueType: "String" },
    { name: "gross_revenue", valueType: "Float" },
    { name: "net_revenue", valueType: "Float" },
    { name: "amount_virtual_currency", valueType: "Int" }
  ],
  virtual_currency_spent: [
    { name: "currency_type", valueType: "String" },
    { name: "amount_spent", valueType: "Int" },
    { name: "item_id", valueType: "String" },
    { name: "item_category", valueType: "String" },
    { name: "current_balance", valueType: "Int" }
  ],
  ad_impression: [
    { name: "ad_unit_id", valueType: "String" },
    { name: "ad_type", valueType: "String" },
    { name: "placement", valueType: "String" },
    { name: "revenue_per_impression", valueType: "Float" }
  ],
  ad_click: [
    { name: "ad_unit_id", valueType: "String" },
    { name: "ad_type", valueType: "String" },
    { name: "placement", valueType: "String" },
    { name: "click_id", valueType: "String" }
  ],
  ad_reward_claimed: [
    { name: "ad_unit_id", valueType: "String" },
    { name: "reward_type", valueType: "String" },
    { name: "reward_amount", valueType: "Int" }
  ],
  ad_skipped: [
    { name: "ad_unit_id", valueType: "String" },
    { name: "ad_type", valueType: "String" },
    { name: "skip_timestamp", valueType: "Int" }
  ],
  ad_revenue_reported: [
    { name: "ad_network", valueType: "String" },
    { name: "ad_unit_id", valueType: "String" },
    { name: "impressions", valueType: "Int" },
    { name: "gross_revenue", valueType: "Float" },
    { name: "net_revenue", valueType: "Float" },
    { name: "currency", valueType: "String" }
  ],
  support_ticket_created: [
    { name: "ticket_id", valueType: "String" },
    { name: "ticket_category", valueType: "String" },
    { name: "severity", valueType: "String" }
  ],
  support_ticket_updated: [
    { name: "ticket_id", valueType: "String" },
    { name: "status", valueType: "String" },
    { name: "resolution_code", valueType: "String" }
  ],
  account_created: [{ name: "method", valueType: "String" }],
  account_deleted: [{ name: "reason", valueType: "String" }],
  ban_issued: [
    { name: "reason", valueType: "String" },
    { name: "duration", valueType: "Int" }
  ],
  compensation_credit: [
    { name: "amount", valueType: "Float" },
    { name: "currency", valueType: "String" },
    { name: "reason", valueType: "String" }
  ],
};

// Sample GTM data for mock import
export const SAMPLE_GTM_DATA: Array<{
  tagName: string;
  category: EventCategory;
  subcategory: string;
  payloads: PayloadDefinition[];
}> = [
  {
    tagName: "gtm_subscription_billed",
    category: "Subscription & Financials",
    subcategory: "subscription_billed",
    payloads: [
      { name: "plan_id", valueType: "String" },
      { name: "net_revenue", valueType: "Float" },
      { name: "transaction_id", valueType: "String" }
    ]
  },
  {
    tagName: "gtm_game_completed",
    category: "Core Gameplay Engagement",
    subcategory: "game_completed",
    payloads: [
      { name: "game_id", valueType: "String" },
      { name: "duration_seconds", valueType: "Int" },
      { name: "outcome", valueType: "String" }
    ]
  },
  {
    tagName: "gtm_session_started",
    category: "Sessions & Activity",
    subcategory: "session_started",
    payloads: [
      { name: "session_id", valueType: "String" }
    ]
  }
];

export const DEFAULT_EVENT_TAGS_STORAGE_KEY = "ltv:dataLayer:eventTags"; 