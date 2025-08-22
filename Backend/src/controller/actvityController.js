import { addActivity, getActivitiesByDate } from "../model/activityModel.js";

/**
 * POST /api/v1/activities/create
 * Add a new activity
 */
export const createActivity = (req, res) => {
  const { petName, type, quantity, dateTime } = req.body;
  if (!petName || !type || !quantity) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }
  const newActivity = {
    petName,
    type,
    quantity,
    dateTime: dateTime || new Date().toISOString(),
  };
  const savedActivity = addActivity(newActivity);
  return res.status(201).json({
    message: "Activity created successfully",
    success: true,
    data: savedActivity,
  });
};

/**
 * GET /api/v1/activities/today
 * Get today's summary (walk, meals, meds)
 */
export const getTodaySummary = (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const activities = getActivitiesByDate(today);

  if (activities.length === 0) {
    return res.status(404).json({
      message: "No activities found for today",
      success: false,
    });
  }

  const summary = {
    walk: activities
      .filter((a) => a.type === "walk")
      .reduce((sum, a) => sum + a.quantity, 0),
    meals: activities.filter((a) => a.type === "meal").length,
    meds: activities.filter((a) => a.type === "medication").length,
  };

  return res.status(200).json({
    message: "Today's activity summary",
    success: true,
    data: summary,
  });
};

/**
 * GET /api/v1/activities/reminder
 * Check if pet needs a walk (after 6 PM)
 */

export const getReminder = (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const reminderMsg = checkWalkReminder(today, 18); // cutoff = 6 PM

  if (reminderMsg) {
    return res.json({
      reminder: reminderMsg,
      success: true,
    });
  }
  return res.json({ reminder: null });
};

