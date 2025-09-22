
export type MealLog = {
    id: string;
    meal: string;
    items: string;
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    imageUrl: string;
    imageHint: string;
};

export const mealLogs: MealLog[] = [
    {
      id: '1',
      meal: 'Breakfast',
      items: '2 Aloo Parathas with a bowl of Curd',
      date: '2024-07-29',
      calories: 450,
      protein: 12,
      carbs: 60,
      fats: 18,
      imageUrl: 'https://images.unsplash.com/photo-1603530948356-d41azzi8def4?w=600&h=400&fit=crop',
      imageHint: 'aloo paratha',
    },
    {
      id: '2',
      meal: 'Lunch',
      items: 'Rajma Chawal with a side of cucumber-tomato salad',
      date: '2024-07-29',
      calories: 600,
      protein: 20,
      carbs: 90,
      fats: 15,
      imageUrl: 'https://images.unsplash.com/photo-1603530948356-d41azzi8def4?w=600&h=400&fit=crop',
      imageHint: 'rajma chawal',
    },
    {
      id: '3',
      meal: 'Dinner',
      items: 'Paneer Butter Masala with 2 Rotis',
      date: '2024-07-29',
      calories: 550,
      protein: 18,
      carbs: 50,
      fats: 30,
      imageUrl: 'https://images.unsplash.com/photo-1565557623262-b9a32c3d5216?w=600&h=400&fit=crop',
      imageHint: 'paneer butter masala',
    },
    {
      id: '4',
      meal: 'Snack',
      items: 'A bowl of fruit salad (Apple, Banana, Orange)',
      date: '2024-07-29',
      calories: 150,
      protein: 2,
      carbs: 35,
      fats: 1,
      imageUrl: 'https://images.unsplash.com/photo-1592804923793-12a1c0a09a54?w=600&h=400&fit=crop',
      imageHint: 'fruit salad',
    },
];
