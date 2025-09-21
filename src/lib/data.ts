export const userProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  age: 34,
  weight: 85, // in kg
  height: 175, // in cm
  gender: 'male' as 'male' | 'female',
  healthIssues: 'High cholesterol, pre-diabetic',
  preferredDiet: 'Low-carb',
};

export const mealLogs = [
  { id: 1, date: '2024-07-28', meal: 'Breakfast', items: '2 eggs, 1 slice of whole wheat toast, 1/2 avocado', calories: 450, protein: 25, carbs: 30, fats: 20 },
  { id: 2, date: '2024-07-28', meal: 'Lunch', items: 'Grilled chicken salad with vinaigrette', calories: 600, protein: 45, carbs: 20, fats: 35 },
  { id: 3, date: '2024-07-28', meal: 'Dinner', items: 'Salmon with quinoa and steamed broccoli', calories: 700, protein: 50, carbs: 40, fats: 38 },
  { id: 4, date: '2024-07-27', meal: 'Breakfast', items: 'Oatmeal with berries and nuts', calories: 400, protein: 15, carbs: 60, fats: 12 },
  { id: 5, date: '2024-07-27', meal: 'Lunch', items: 'Turkey sandwich on whole wheat bread', calories: 550, protein: 35, carbs: 45, fats: 25 },
  { id: 6, date: '2024-07-27', meal: 'Dinner', items: 'Lean beef stir-fry with mixed vegetables', calories: 650, protein: 40, carbs: 35, fats: 30 },
];

export const dailyTotals = {
  calories: 1750,
  protein: 120,
  carbs: 90,
  fats: 93,
};

export const recommendedDailyAllowances = {
  calories: 2200,
  protein: 150,
  carbs: 150,
  fats: 80,
};

export const weightTrackerData = [
    { date: "2024-07-01", weight: 87 },
    { date: "2024-07-08", weight: 86.5 },
    { date: "2024-07-15", weight: 86 },
    { date: "2024-07-22", weight: 85.5 },
    { date: "2024-07-29", weight: 85 },
];
