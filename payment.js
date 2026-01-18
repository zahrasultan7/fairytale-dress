<script src="https://js.stripe.com/v3/"></script>
<script>
const stripe = Stripe("pk_live_YOUR_PUBLISHABLE_KEY");

async function payNow() {
  const response = await fetch("http://localhost:4242/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: document.getElementById("finalTotal").innerText
    })
  });

  const data = await response.json();

  const result = await stripe.confirmCardPayment(data.clientSecret, {
    payment_method: {
      card: {
        // Stripe Checkout handles this automatically later
      }
    }
  });

  if (result.error) {
    alert(result.error.message);
  } else {
    window.location.href = "success.html";
  }
}
</script>
