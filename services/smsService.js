import smsQueue from '../jobs/smsQueue.js';

// Service to add a job to the queue
export const sendSMSJob = async ({ users, message }) => {
  // Add job to the queue with retry and backoff settings
  await smsQueue.add(
    { users, message },
    {
      attempts: 5, // Retry 5 times
      backoff: {
        type: 'exponential', // Retry with exponential backoff
        delay: 1000, // Initial delay: 1 second
      },
      removeOnComplete: true, // Remove completed jobs automatically
      removeOnFail: true, // Remove failed jobs automatically
    }
  );
};
