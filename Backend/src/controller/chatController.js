// controllers/chatbotController.js

import { checkWalkReminder, getActivitiesByDate } from "../model/activityModel.js";
import { addMessage, getChatHistory } from "../model/chatModel.js";



/**
 * POST /api/chatbot
 * Handles chatbot conversation
 */
export const handleChat = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Save user message
  addMessage("user", message);

  const today = new Date().toISOString().split("T")[0];
  const todayActivities = getActivitiesByDate(today);

  let botReply = "I'm not sure I understand. Can you tell me more?";

  // ---- Basic "AI" logic (keyword matching) ----
  if (message.toLowerCase().includes("walk")) {
    const walkTime = todayActivities
      .filter((a) => a.type === "walk")
      .reduce((sum, a) => sum + a.quantity, 0);
    botReply = walkTime > 0 ? `Your pet has walked for ${walkTime} minutes today.` : "No walk logged yet today. Don’t forget!";
   } else if (message.toLowerCase().includes("meal")) {
    const meals = todayActivities.filter((a) => a.type === "meal").length;
    botReply = `Your pet has had ${meals} meals today.`;
  } else if (message.toLowerCase().includes("med")) {
    const meds = todayActivities.filter((a) => a.type === "medication").length;
    botReply = `Your pet has had ${meds} medications today.`;
  } else if (message.toLowerCase().includes("summary")) {
    const summary = {
      walk: todayActivities
        .filter((a) => a.type === "walk")
        .reduce((sum, a) => sum + a.quantity, 0),
      meals: todayActivities.filter((a) => a.type === "meal").length,
      meds: todayActivities.filter((a) => a.type === "medication").length,
    };
    botReply = `Summary: Walked ${summary.walk} mins, ${summary.meals} meals, ${summary.meds} meds.`;
  } else if (
    message.toLowerCase().includes("exercise") ||
    message.toLowerCase().includes("reminder")
  ) {
    const reminderMsg = checkWalkReminder(today, 18);
    botReply = reminderMsg || "No reminder needed right now.";
  }

  // Save bot reply
  addMessage("bot", botReply);

  return res.json({ 
    reply: botReply, 
    history: getChatHistory() });
};
