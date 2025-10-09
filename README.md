# PoshanAI: Your AI-Powered Pocket Dietician

![PoshanAI Banner](https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=400&fit=crop)

---

## 🚀 Overview

PoshanAI is an intelligent web application designed to act as a personal dietician in your pocket. Specifically tailored for the Indian context, it leverages the power of Generative AI to provide personalized dietary analysis, nutrient deficiency detection, and customized meal and fitness plans. By simply taking a picture of their meal, users get an instant analysis of its contents and caloric value. The app aims to combat malnutrition and promote healthier lifestyles by making expert nutritional guidance accessible and affordable for everyone.

---

## 🎯 Problem Statement

In India, a significant portion of the population suffers from nutritional deficiencies due to a lack of awareness about balanced diets, reliance on staple-heavy meals, and limited access to professional dieticians. This leads to widespread health issues like anemia, vitamin deficiencies, and an increased risk of chronic diseases. There is a pressing need for a scalable, personalized, and culturally relevant solution to help individuals understand and improve their nutritional intake.

---

## 💡 Solution / Vision

PoshanAI is envisioned as a holistic health and wellness companion that empowers users to take control of their diet. By simply taking a picture of their meal, users can get an instant analysis of its contents and caloric value. The AI analyzes this data, along with the user's health profile and medical reports, to identify potential nutrient gaps and generate a dynamic, day-by-day plan for diet, hydration, and fitness. Our vision is to make personalized health management a simple and integrated part of daily life.

---

## 🎯 In Short: The Impact of PoshanAI

| Stakeholder         | Problem Today                                    | PoshanAI's Impact                                  |
| ------------------- | ------------------------------------------------ | -------------------------------------------------- |
| **Anganwadi Worker**  | Manual recordkeeping, limited nutrition knowledge | AI-based instant analysis + auto logging           |
| **ICDS Supervisor**   | Delayed, inconsistent data from centers          | Live dashboards + real-time tracking               |
| **Mother / Child**    | Lack of personalized guidance                    | Customized, local diet and wellness plan           |
| **Government / NGO**  | Hard to measure actual progress                  | Data-driven insights for targeted interventions    |

---

## 🆚 Competitive Landscape: PoshanAI vs. Other Apps

| Feature                      | Generic Health Apps                                | **PoshanAI (The Winner)**                                                                |
| ---------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Meal Logging**             | Manual search from a generic database              | **AI-powered image recognition** of Indian & global dishes                               |
| **Cultural Context**         | Western-centric food databases and units           | **Hyper-local focus** on Indian cuisine, regional diets, and local ingredients           |
| **Nutritional Analysis**     | Basic calorie and macro tracking                   | **Advanced deficiency detection** (Iron, Vitamin D, etc.) based on dietary patterns      |
| **Personalization**          | Based on simple goals like weight loss             | **Holistic personalization** using meal data, health reports, and lifestyle              |
| **Recommendations**          | Generic food suggestions (e.g., "eat more salad") | **Culturally relevant suggestions** (e.g., "add spinach to your dal," "try ragi dosa")   |
| **Ecosystem Integration**    | Individual use only                                | **Multi-role platform** connecting users, doctors, and public health workers             |
| **Data-Driven Insights**     | Limited to personal trends                         | **Analyzes medical reports (PDF/image)** for deeper, more accurate health recommendations |

---

## ⚙️ System Architecture

PoshanAI is built on a modern, serverless architecture designed for scalability and performance.

-   **Frontend**: A responsive web application built with **Next.js** and **React**, providing a seamless user experience on both desktop and mobile devices.
-   **Backend & Database**: **Firebase** serves as the backend, handling user authentication (Firebase Auth) and data storage (Firestore) for user profiles, meal logs, and health reports.
-   **AI Integration**: **Google's Genkit** orchestrates calls to the **Gemini** large language models, which power all AI-driven features, including image analysis, deficiency detection, and plan generation.
-   **Hosting**: The application is deployed on **Firebase App Hosting**, ensuring reliability and scalability.

```mermaid
graph TD
    subgraph "User Device"
        A[Browser / Next.js Client]
    end

    subgraph "Firebase Platform"
        B[Firebase App Hosting]
        C[Firebase Auth]
        D[Firestore Database]
    end

    subgraph "Google AI"
        E[Genkit Flows]
        F[Gemini Models]
    end

    A -- HTTP Requests --> B
    B -- Renders & Serves --> A
    A -- Auth Requests --> C
    A -- Database Queries --> D
    B -- Invokes --> E
    E -- Calls --> F
    F -- Returns Results --> E
    E -- Returns Data --> B
```

---

## 🧠 Tech Stack

-   **Framework**: Next.js (App Router)
-   **Language**: JavaScript
-   **UI**: React, ShadCN UI, Tailwind CSS
-   **AI Toolkit**: Genkit
-   **AI Model**: Google Gemini
-   **Backend**: Firebase (Authentication, Firestore)
-   **Form Management**: React Hook Form, Zod
-   **Data Visualization**: Recharts

---

## 🧩 Features

### Core Features:
-   **AI Meal Analyzer**: Just snap a photo of your meal. Our powerful AI instantly recognizes food items, including a wide variety of Indian dishes, and provides a detailed breakdown of its nutritional content and estimated calories.
-   **Nutrient Deficiency Detection**: Go beyond calorie counting. The app analyzes your meal patterns and health profile to pinpoint potential nutrient gaps, helping you address deficiencies like iron, Vitamin D, and B12.
-   **Personalized Recommendations**: Receive hyper-personalized food and fitness suggestions that are tailored to your unique body type, lifestyle, and dietary preferences.
-   **Daily Progress Dashboard**: Your interactive dashboard provides an at-a-glance overview of your day. Easily track your intake of calories, macronutrients (protein, carbs, fats), and water.
-   **Health Report with BMI**: Generate an AI-powered health report that includes your Body Mass Index (BMI) and an analysis of potential dietary deficiencies.
-   **Progress Tracker**: Monitor your weight journey and track your intake of key vitamins and minerals over time with intuitive charts and graphs.
-   **Dual User Roles**: Separate, tailored dashboards for regular users and registered doctors/dieticians.

### Future Features:
-   **PDF/Image Health Report Analysis**: Gain deeper insights by uploading your existing medical reports. Our AI can extract key biomarkers to further customize your recommendations.
-   **Dynamic Meal & Fitness Plans**: AI-generated daily plans for meals, workouts, and hydration, which adapt based on your progress.
-   **Doctor-Patient Linking**: Allow doctors to monitor patient progress and create/assign plans directly within the app.

---

## 🔍 How It Works

1.  **Onboarding**: The user signs up and completes their health profile, providing key metrics, health goals, and dietary preferences.
2.  **Daily Logging**: The user logs their meals, either manually or by simply taking a picture. The AI Meal Analyzer processes the image and logs the nutritional data automatically.
3.  **AI Analysis & Reporting**: Genkit flows process the logged data against the user's profile. The user can generate a Health Report to see their BMI and have the Gemini model identify nutrient deficiencies.
4.  **Personalized Plan**: Based on the analysis, the system generates a daily plan, including recommendations for the next meal, a water intake schedule, and a simple workout routine.
5.  **Dashboard View**: The user's dashboard provides an at-a-glance summary of their daily progress against goals for calories, macros, and hydration.
6.  **Progress Monitoring**: The Progress Tracker page allows users to visualize trends in their weight and intake of essential vitamins and minerals, providing reports to show health improvements.

---

## 🧰 Setup / Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/poshan-ai.git
    cd poshan-ai
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Firebase and Gemini API keys.
    ```env
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
    NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

    # Google AI (Gemini)
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) to view it in the browser.

---

## 📊 Database Design

We use Firestore, a NoSQL document database, to store our application data. The primary collections are:

-   **`users`**: Stores user profile information, including their role (user or doctor), personal details, and health metrics.
    -   `uid` (string)
    -   `email` (string)
    -   `displayName` (string)
    -   `role` (string: 'user' | 'doctor')
    -   `age`, `weight`, `height` (number)
    -   `healthIssues`, `preferredDiet` (string)
-   **`mealLogs`**: A sub-collection under each user, containing a log of all their meals.
    -   `mealId` (string)
    -   `timestamp` (date)
    -   `contents` (string)
    -   `calories` (number)
    -   `macronutrients` (object)
    -   `imageUrl` (string, optional)
-   **`healthReports`**: A sub-collection under each user for storing uploaded medical reports.
    -   `reportId` (string)
    -   `uploadDate` (date)
    -   `fileUrl` (string)
    -   `analysis` (object, generated by AI)

---

## 🤖 AI / ML Integration

The core intelligence of PoshanAI is powered by Google's Gemini model, orchestrated via **Genkit**. We use Genkit flows defined in `src/ai/flows/` to handle specific AI tasks:

-   **`ai-meal-analysis.ts`**: Takes a meal image (as a Data URI) and returns an estimated calorie count and a description of the meal's contents.
-   **`ai-deficiency-detection.ts`**: Analyzes a user's profile and meal logs to identify potential nutrient deficiencies.
-   **`personalized-food-recommendations.ts`**: Generates personalized food suggestions based on identified deficiencies and user preferences.

These flows are designed to be modular and can be easily extended. For instance, a future flow could analyze uploaded health report PDFs to extract key biomarkers.

---

## 🧾 API References

The application does not expose a traditional REST or GraphQL API. Instead, frontend components interact directly with the backend-for-frontend (BFF) layer provided by Next.js Server Actions and Genkit flows. All data fetching and AI processing logic is encapsulated within server-side functions located in the `src/app/` and `src/ai/` directories.

---

## 🧑‍💻 Contributors

A huge thanks to everyone who contributes to making PoshanAI a reality.

-   [Your Name](https://github.com/your-username) - Project Lead & Developer

We welcome contributions! Please see our `CONTRIBUTING.md` file to get started.

---

## 📈 Future Roadmap

-   **Q4 2024**: Implement full PDF/image health report analysis and integrate it into the personalized plan generation. Launch dynamic daily meal and fitness plans.
-   **Q1 2025**: Develop the doctor-patient management features, allowing doctors to oversee patient progress.
-   **Q2 2025**: Introduce multi-language support to cater to a broader audience across India.
-   **Q3 2025**: Release a progressive web app (PWA) for an enhanced mobile experience with offline capabilities and push notifications.

---

## 🛠️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
# poshan-ai
# poshan-ai
# POSHAN---AI--PR
