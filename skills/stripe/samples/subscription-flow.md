# Subscription Flow

顧客を作成し、月額サブスクリプションを開始・変更・キャンセルする。

```javascript
// server: Node.js + Express
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
app.use(express.json());

// 1. Create customer
app.post("/create-customer", async (req, res) => {
  const customer = await stripe.customers.create({ email: req.body.email });
  res.json({ customerId: customer.id });
});

// 2. Create subscription (returns clientSecret to confirm payment on frontend)
app.post("/create-subscription", async (req, res) => {
  const { customerId, priceId } = req.body;

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
  });

  res.json({
    subscriptionId: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
  });
});

// 3. Update subscription (plan change)
app.post("/update-subscription", async (req, res) => {
  const { subscriptionId, newPriceId } = req.body;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const updated = await stripe.subscriptions.update(subscriptionId, {
    items: [{ id: subscription.items.data[0].id, price: newPriceId }],
  });
  res.json(updated);
});

// 4. Cancel subscription
app.post("/cancel-subscription", async (req, res) => {
  const canceled = await stripe.subscriptions.cancel(req.body.subscriptionId);
  res.json(canceled);
});

app.listen(4242);
```

```javascript
// client: confirm payment after subscription creation
const stripe = Stripe("pk_test_...");

async function subscribe(email, priceId) {
  // Step 1: create customer
  const { customerId } = await fetch("/create-customer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).then((r) => r.json());

  // Step 2: create subscription and get clientSecret
  const { clientSecret } = await fetch("/create-subscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, priceId }),
  }).then((r) => r.json());

  // Step 3: confirm payment with Payment Element
  const elements = stripe.elements({ clientSecret });
  elements.create("payment").mount("#payment-element");

  // On form submit:
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: { return_url: "https://example.com/subscription/success" },
  });
  if (error) console.error(error.message);
}
```

## Notes

- `payment_behavior: "default_incomplete"` でサブスクリプションを未完了状態で作成し、フロントエンドで支払いを確定させる
- `expand: ["latest_invoice.payment_intent"]` で `client_secret` を1リクエストで取得できる
- サブスクリプションのプロビジョニングは Webhook の `invoice.paid` イベントで制御する（フロントエンドの `return_url` だけに頼らない）
- プラン変更時は既存 subscription item の `id` を指定して更新する
