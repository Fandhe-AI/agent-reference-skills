# Payment Flow

PaymentIntents と Payment Element を使って1回払いの決済を受け付ける。

```javascript
// server: Node.js + Express
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000, // amount in smallest currency unit (cents)
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(4242);
```

```html
<!-- client: HTML + Stripe.js -->
<script src="https://js.stripe.com/v3/"></script>
<form id="payment-form">
  <div id="payment-element"></div>
  <button id="submit">Pay now</button>
  <div id="error-message"></div>
</form>
<script>
  const stripe = Stripe("pk_test_...");
  let elements;

  async function initialize() {
    const { clientSecret } = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then((r) => r.json());

    elements = stripe.elements({ clientSecret });
    elements.create("payment").mount("#payment-element");
  }

  document.getElementById("payment-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "https://example.com/success" },
    });
    if (error) {
      document.getElementById("error-message").textContent = error.message;
    }
  });

  initialize();
</script>
```

## Notes

- `amount` は最小通貨単位（USD なら cents）で指定する
- `automatic_payment_methods: { enabled: true }` でカード・Apple Pay 等を自動的に有効化できる
- `client_secret` はサーバーサイドで生成し、クライアントに渡す。秘密鍵をフロントエンドに公開しない
- 支払い完了後の `return_url` ページで `payment_intent_client_secret` クエリパラメータを確認して結果を処理する
