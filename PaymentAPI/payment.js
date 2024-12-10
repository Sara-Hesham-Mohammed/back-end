async function checkout() {
    try {
      const adyenPaymentMethods = await callServer("/api/getPaymentMethods");
      const request = new PaymentRequest(buildSupportedPaymentMethodData(adyenPaymentMethods), buildShoppingCartDetails());
      const payment = await request.show();
  
      if (payment.details.bobpay_token_id) {
        await payment.complete("success");
        window.location.href = "/result/success";
        return false;
      }
      const response = await callServer("/api/initiatePayment", {

        paymentMethod: {
          type: "scheme",
          number: payment.details.cardNumber,
          expiryMonth: payment.details.expiryMonth,
          expiryYear: payment.details.expiryYear,
          holderName: payment.details.cardholderName,
          cvc: payment.details.cardSecurityCode,
        },
      });
      switch (response.resultCode) {
        case "Authorised":
          await payment.complete("success");
          window.location.href = "/result/success";
          break;
        case "Pending":
        case "Received":
          await payment.complete("unknown");
          window.location.href = "/result/pending";
          break;
        case "Refused":
          await payment.complete("fail");
          window.location.href = "/result/failed";
          break;
        default:
          await payment.complete("fail");
          window.location.href = "/result/error";
          break;
      }
    } catch (error) {
      console.error(error);
      alert(`Error occurred: ${error.message}`);
    }
    return false;
  }
  
  function buildShoppingCartDetails() {
    return {
      id: "order-123",
      displayItems: [
        {
          label: "Sunglasses",
          amount: { currency: "EUR", value: "5.00" },
        },
        {
          label: "Headphones",
          amount: { currency: "EUR", value: "5.00" },
        },
      ],
      total: {
        label: "Total",
        amount: { currency: "EUR", value: "10.00" },
      },
    };
  }
  
  function buildSupportedPaymentMethodData(adyenPaymentMethods) {
    return [
      {
        supportedMethods: "basic-card",
        data: {
          supportedNetworks: getSupportedNetworksFromAdyen(adyenPaymentMethods),
          supportedTypes: ["credit"],
        },
      },
      {
        supportedMethods: "https://bobpay.xyz/pay",
      },
    ];
  }
  
  function getSupportedNetworksFromAdyen(adyenPaymentMethods) {
    const supportedByPaymentAPI = ["amex", "cartebancaire", "diners", "discover", "jcb", "mc", "mir", "unionpay", "visa"];
    const supportedByAdyen = adyenPaymentMethods.paymentMethods.filter((v) => v.type === "scheme")[0].brands;
    return supportedByPaymentAPI.reduce((acc, curr) => (supportedByAdyen.includes(curr) ? [...acc, fixMasterCard(curr)] : acc), []);
  }
  
  function fixMasterCard(v) {
    return v === "mc" ? "mastercard" : v;
  }
  
  async function callServer(url, data) {
    const res = await fetch(url, {
      method: "POST",
      body: data ? JSON.stringify(data) : "",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return await res.json();
  }