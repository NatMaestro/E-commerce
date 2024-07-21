// pages/api/paystack.js

const handler = async (req, res) => {
    if (req.method === 'POST') {
      const { email, amount } = req.body;
  
      // Here you would integrate with Paystack API to create a transaction
      // For simplicity, let's assume you have a function that does this and returns the transaction data
  
      const paystackResponse = await createPaystackTransaction(email, amount);
  
      if (paystackResponse.success) {
        res.status(200).json({ data: paystackResponse.data });
      } else {
        res.status(500).json({ error: 'Failed to create Paystack transaction' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  };
  
  export default handler;
  
  // Function to create Paystack transaction
  const createPaystackTransaction = async (email, amount) => {
    // Your logic to create Paystack transaction here
    // This could be a call to Paystack API or any other method you use
    // For now, let's just return a dummy response
    return {
      success: true,
      data: {
        authorization_url: 'https://paystack.com/pay/your-unique-transaction-id',
      },
    };
  };
  