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
  // console.log('Initial users:', users.map(user => user.phoneNumber));

  const results = { success: [], failed: [] };

  for (const user of users) {
    console.log(`Processing user: ${user.phoneNumber}`);
    try {
      await sendSMS(user.phoneNumber, message); // Call SMS API
      // console.log(`SMS sent to ${user.phoneNumber}`);
      results.success.push(user.phoneNumber);
    } catch (error) {
      // console.error(`Failed to send SMS to ${user.phoneNumber}:`, error.message);
      results.failed.push({ phoneNumber: user.phoneNumber, error: error.message });
    }
  }

  // Log results for success and failure
  // console.log('Job completed', 'Success: ' + results.success.length, 'Failed: ' + results.failed.length);

  if (results.failed.length > 0) {
    // Update job data to include only failed users for retries
    const failedUsers = job.data.users.filter(user =>
      results.failed.some(failed => failed.phoneNumber === user.phoneNumber)
    );
    
    // Save the updated job data for the next retry
    await job.update({ ...job.data, users: failedUsers });

    throw new Error('Some SMSs failed. Retrying failed ones.');
  }
});

// Export the queue for adding jobs
export default smsQueue;