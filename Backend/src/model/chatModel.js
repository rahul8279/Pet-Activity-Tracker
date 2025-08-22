//All chatHistory.
let chatHistory = [];

// Get chat history
export const getChatHistory = () => chatHistory;


// Add a message to the chat history.
export const addMessage = (role, text) => {
  const message = { role, text, timestamp: new Date().toISOString() };
  chatHistory.push(message);
  return message;
};

// Clear the chat history.
export const clearChatHistory = () => {
  chatHistory = [];
};