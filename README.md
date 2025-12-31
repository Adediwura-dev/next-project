# NextProject

NextProject is an intelligent project recommendation engine designed to ignite your creativity. By analyzing your current environment, available resources, time commitment, energy levels, and goals, Spark suggests personalized DIY, coding, or craft projects that fit your specific context.

Powered by AI, NextProject not only suggests projects but also generates detailed, step-by-step guides to help you get started immediately.

## 🌟 Features

*   **Personalized Recommendations**: A multi-step wizard gathers details about your context to provide highly relevant suggestions.
*   **AI-Powered Logic**: Utilizes the OpenRouter API (specifically GPT-OSS models) to generate creative project ideas and detailed guides.
*   **Interactive Dashboard**: View, filter, and manage your recommended projects in a beautiful dashboard.
*   **Detailed Guides**: Get instant "Get Started" guides including introductions, step-by-step instructions, safety tips, and relevant YouTube search queries.
*   **Modern UI/UX**: Built with React 19, Tailwind CSS v4, and smooth animations powered by Motion.

## 🛠️ Tech Stack

*   **Framework**: [React](https://react.dev/) 19 (via [Vite](https://vitejs.dev/))
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
*   **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **AI Integration**: [OpenRouter SDK](https://openrouter.ai/)

## 🚀 Getting Started

### Prerequisites

*   Node.js (Latest LTS recommended)
*   npm or yarn
*   An API Key from [OpenRouter](https://openrouter.ai/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd NextProject
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your OpenRouter API key:
    ```env
    VITE_OPENROUTER_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure

```
NextProject/
├── src/
│   ├── app/
│   │   ├── pages/          # Main application screens (Environment, Goal, etc.)
│   │   ├── App.tsx         # Main application component / Router logic
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Base UI elements (buttons, dialogs, etc.)
│   │   ├── ProjectCard.tsx # Displays individual project summaries
│   │   └── ...
│   ├── lib/
│   │   ├── ai-service.ts   # AI integration (OpenRouter)
│   │   └── utils.ts        # Helper functions
│   ├── styles/             # Global styles
│   └── main.tsx            # Entry point
├── guidelines/             # Project guidelines and docs
├── public/                 # Static assets
└── package.json            # Project dependencies and scripts
```

## 🤖 AI Integration

This project uses `src/lib/ai-service.ts` to communicate with OpenRouter.
*   **`generateProjects`**: Takes user inputs (Environment, Resources, etc.) and returns a JSON list of suggested projects.
*   **`getProjectDetails`**: Generates a detailed guide for a specific project on demand.

