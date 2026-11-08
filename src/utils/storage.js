
const STORAGE_KEY = 'veloop_user_data';

// Default user data
const DEFAULT_USER_DATA = {
  username: 'Jagan',
  xp: 0,
  ves: 0,
  gems: 0,
  level: 1,
  streak: 0,
  tasksDone: 0,
  claimedActivities: [],
  history: [],
};

// Get user data
export const getUserData = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      return {
        ...DEFAULT_USER_DATA,
        ...JSON.parse(savedData),
      };
    }

    return DEFAULT_USER_DATA;
  } catch (error) {
    console.error('Error loading user data:', error);
    return DEFAULT_USER_DATA;
  }
};

// Save user data
export const saveUserData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Update user data
export const updateUserData = (updates) => {
  const currentData = getUserData();

  const updatedData = {
    ...currentData,
    ...updates,
  };

  saveUserData(updatedData);

  return updatedData;
};

// Clear user data
export const clearUserData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
