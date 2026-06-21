/** Placeholder billing module for future paid features. */

export type SubscriptionPlan = "free" | "employer_pro" | "seeker_pro";

export interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: "active" | "cancelled" | "past_due";
  currentPeriodEnd: Date;
}

export interface Invoice {
  id: string;
  userId: string;
  amount: number;
  currency: "NGN";
  status: "draft" | "paid" | "void";
  createdAt: Date;
}

export const PLANS: Record<
  SubscriptionPlan,
  { name: string; price: number; features: string[] }
> = {
  free: {
    name: "Free",
    price: 0,
    features: ["Post up to 3 jobs", "Basic applications"],
  },
  employer_pro: {
    name: "Employer Pro",
    price: 15000,
    features: ["Unlimited jobs", "Featured listings", "Analytics"],
  },
  seeker_pro: {
    name: "Seeker Pro",
    price: 5000,
    features: ["Profile boost", "Application insights"],
  },
};

export function getPlan(plan: SubscriptionPlan) {
  return PLANS[plan];
}

/** Future: integrate payment gateway here */
export async function createCheckoutSession(_plan: SubscriptionPlan): Promise<never> {
  throw new Error("Billing not yet implemented");
}
