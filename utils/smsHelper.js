import axios from 'axios';

// Mock SMS sending API call
export const sendSMS = async (phoneNumber, message) => {
  
  const randomSuccess = Math.random() >= 0.5;
  
  if(randomSuccess) {
    return true;
  } else {
    throw new Error('SMS API failed');
  }

};
