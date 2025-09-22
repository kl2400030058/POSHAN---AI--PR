export const userProfile = {
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  age: 28,
  weight: 65, // in kg
  height: 160, // in cm
  gender: 'female' as 'male' | 'female',
  healthIssues: 'Anemia, Vitamin D deficiency',
  preferredDiet: 'Vegetarian',
};

export const mealLogs = [
  { id: 1, date: '2024-07-28', meal: 'Breakfast', items: '2 parathas with curd', calories: 450, protein: 12, carbs: 60, fats: 18, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop', imageHint: 'paratha curd' },
  { id: 2, date: '2024-07-28', meal: 'Lunch', items: 'Rajma chawal with a side of salad', calories: 600, protein: 20, carbs: 90, fats: 15, imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f39791e8?w=300&h=200&fit=crop', imageHint: 'rajma chawal' },
  { id: 3, date: '2024-07-28', meal: 'Dinner', items: 'Paneer butter masala with 2 rotis', calories: 700, protein: 25, carbs: 65, fats: 38, imageUrl: 'https://images.unsplash.com/photo-1565557623262-b9a32c3d5216?w=300&h=200&fit=crop', imageHint: 'paneer butter masala' },
  { id: 4, date: '2024-07-27', meal: 'Breakfast', items: 'Poha with peanuts and sev', calories: 400, protein: 10, carbs: 70, fats: 10, imageUrl: 'https://images.unsplash.com/photo-1602351447937-745cb72061e0?w=300&h=200&fit=crop', imageHint: 'poha breakfast' },
  { id: 5, date: '2024-07-27', meal: 'Lunch', items: 'Dal makhani with rice and cucumber raita', calories: 550, protein: 18, carbs: 85, fats: 15, imageUrl: 'https://images.unsplash.com/photo-1631452180515-9a853761a2c3?w=300&h=200&fit=crop', imageHint: 'dal makhani' },
  { id: 6, date: '2024-07-27', meal: 'Dinner', items: 'Mixed vegetable curry with 2 multigrain rotis', calories: 650, protein: 15, carbs: 75, fats: 30, imageUrl: 'https://images.unsplash.com/photo-1586959223932-c2c34942911b?w=300&h=200&fit=crop', imageHint: 'vegetable curry' },
];

export const dailyTotals = {
  calories: 1750,
  protein: 47,
  carbs: 215,
  fats: 71,
};

export const recommendedDailyAllowances = {
  calories: 2000,
  protein: 55,
  carbs: 250,
  fats: 60,
};

export const weightTrackerData = [
    { date: "2024-07-01", weight: 67 },
    { date: "2024-07-08", weight: 66.5 },
    { date: "2024-07-15", weight: 66 },
    { date: "2024-07-22", weight: 65.5 },
    { date: "2024-07-29", weight: 65 },
];
