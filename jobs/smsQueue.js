import Queue from 'bull';
import { sendSMS } from '../utils/smsHelper.js';

const smsQueue = new Queue('smsQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

// Job processing logic
smsQueue.process(async (job) => {
  const { users, message } = job.data;

  console.log(`Processing job ID: ${job.id}, Attempt: ${job.attemptsMade}`);

  const results = { success: [], failed: [] };

  for (const user of users) {
    try {
      await sendSMS(user.phoneNumber, message); // Call SMS API
      console.log(`SMS sent to ${user.phoneNumber}`);
      results.success.push(user.phoneNumber);
    } catch (error) {
      console.error(`Failed to send SMS to ${user.phoneNumber}:`, error.message);
      results.failed.push({ phoneNumber: user.phoneNumber, error: error.message });
    }
  }

  // Log results for success and failure
  console.log('Job completed', 'Success: ' + results.success.length, 'Failed: ' + results.failed.length);

  if (results.failed.length > 0) {
    throw new Error('Some SMSs failed.'); // Retrying only for failed ones
  }
});

// Export the queue for adding jobs
export default smsQueue;
