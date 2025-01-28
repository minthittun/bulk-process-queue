import { sendSMSJob } from '../services/smsService.js';

// Controller to handle the SMS sending request
export const sendSMSController = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    // Dummy data for users (replace with actual DB query logic)
    const users = [
      { phoneNumber: '1234567890' },
      { phoneNumber: '0987654321' },
      { phoneNumber: '1122334455' },
    ];

    // Add the job to the SMS queue
    await sendSMSJob({ users, message });
    res.status(200).json({ message: 'SMS job added to the queue.' });
  } catch (error) {
    console.error('Error adding job to queue:', error.message);
    res.status(500).json({ error: 'Failed to add SMS job to the queue.' });
  }
};
