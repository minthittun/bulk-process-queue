import axios from 'axios';

// Mock SMS sending API call
export const sendSMS = async (phoneNumber, message) => {
  try {
    // Replace with your actual SMS API endpoint and API key
    const response = await axios.post('https://example-sms-api.com/send',
      {
        phoneNumber,
        message,
      },
      {
        headers: {
          Authorization: `Bearer xxxx`,
        },
      }
    );

    if (response.status === 200) {
      return true; // SMS sent successfully
    } else {
      throw new Error(`API Error: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`SMS API failed: ${error.message}`);
  }
};
