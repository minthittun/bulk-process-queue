# SMS Bulk Sending Backend Service

This project is a backend service designed for running bulk processes in the background using a queue system. While it is currently implemented for sending bulk SMS messages, the core design is meant for handling any bulk processing task that requires background job management, retries, and queueing.

The system utilizes **Bull** for queue management and **Redis** to store and manage the jobs. It handles retries with exponential backoff, ensuring that failed tasks are retried automatically. Once the task completes (whether successfully or with failure), the associated data is removed from Redis.

**Redis** is required to run this service, as it is used for managing the job queue.

## Features
- Add bulk processing jobs to the queue.
- Manage retries of failed jobs with exponential backoff.
- Remove processed data from Redis once the job succeeds or fails.
- Currently implemented for bulk SMS sending, but can be adapted for other use cases.
- API endpoint for adding jobs to the queue.

## Tech Stack
- **Node.js**
- **Express**: Web framework for Node.js
- **Bull**: A library for managing background jobs and queues
- **Redis**: Key-value store used for managing the job queue (required)
- **Axios**: For making HTTP requests to an external API (currently used for sending SMS)

## Installation

### 1. Clone the repository
```
git clone https://github.com/yourusername/bulk-process-queue.git
cd bulk-process-queue
```

### 2. Install dependencies
```
npm install
```

### 3. Run the server
```
npm start

