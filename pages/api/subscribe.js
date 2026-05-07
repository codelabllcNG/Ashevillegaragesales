// pages/api/subscribe.js
import mailchimp from 'mailchimp-api-v3';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const apiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
    const listId = process.env.NEXT_PUBLIC_LIST_ID;

    const mailchimpClient = new mailchimp(apiKey);

    try {
      const response = await mailchimpClient.post(`/lists/${listId}/members`, {
        email_address: email,
        status: 'subscribed',
      });

    //   console.log('User subscribed:', response);
      res.status(200).json({ success: true, message: 'Subscription successful' });
    } catch (error) {
    //   console.error('Subscription failed:', error.response.body);
      res.status(500).json({ success: false, message: error.response.body.title });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
