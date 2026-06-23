# Webhook Handling

Stripe から送信される Webhook を受信し、署名を検証してイベントを処理する。

```javascript
// server: Node.js + Express
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();

// Webhook ルートには raw body が必要 — express.json() より先に登録する
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        // fulfill order here
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent ${paymentIntent.id} failed`);
        // notify customer
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object;
        // activate or extend subscription access
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        // notify customer to update payment method
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        // revoke access
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

app.listen(4242);
```

```bash
# ローカル開発: Stripe CLI でイベントを転送
stripe listen --forward-to localhost:4242/webhook
# 出力される whsec_... を STRIPE_WEBHOOK_SECRET に設定する

# テストイベントの送信
stripe trigger payment_intent.succeeded
```

## Notes

- `express.raw({ type: "application/json" })` で raw body を保持する。`express.json()` を先に適用すると署名検証が失敗する
- `constructEvent` は署名・タイムスタンプ（デフォルト300秒以内）を検証し、リプレイ攻撃を防ぐ
- Webhook ハンドラーは必ず早期に `200` を返す。処理の失敗は別途ログ・キューで対処する
- 冪等性を保つため、`event.id` をDBに記録し重複受信を検知する
