//In memory Storage
let activities = [];

// Get all activities
export const getActivities = () => activities;

// Get activities by date
export const getActivitiesByDate = (dateStr) => {
  return activities.filter((a) => a.dateTime.startsWith(dateStr));
};

// Add a new activity on Array.
export const addActivity = (activity) => {
  const newActivity = { id: Date.now().toString(), ...activity };
  activities.push(newActivity);
  return newActivity;
};

//Clear the activities array
export const clearActivities = () => {
  activities = [];
};

//Reminder for walks
export const checkWalkReminder = (dateStr, cutoffHour = 18) => {
  const walksToday = activities.filter(
    (a) => a.type === "walk" && a.dateTime.startsWith(dateStr)
  );
  const currentHour = new Date().getHours();
  if (currentHour >= cutoffHour && walksToday.length === 0) {
    return "Your pet still needs exercise today! ";
  }
  return null;
};