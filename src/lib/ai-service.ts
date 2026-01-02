import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY
});


const MODEL = "deepseek/deepseek-r1-0528:free";


async function fetchFromOpenRouter(prompt: string) {
    try {
        const completion = await openrouter.chat.send({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const messageContent = completion.choices?.[0]?.message?.content;

        if (!messageContent) {
            throw new Error("Empty response from OpenRouter");
        }

        if (typeof messageContent === "string") {
            return messageContent;
        }

        const text = messageContent
            .filter((item): item is { type: "text"; text: string } => item.type === "text")
            .map(item => item.text)
            .join("");

        if (!text) {
            throw new Error("No text content in OpenRouter response");
        }

        return text;
    } catch (error) {
        console.error("OpenRouter API Error:", error);
        throw error;
    }
}

export async function generateProjects(preferences: {
    environment: string;
    resources: string[];
    timeCommitment: string;
    energy: string;
    goal: string;
}) {
    const prompt = `
    You are a creative project recommender system. 
    Suggest 5 to 10 DIY/Coding/Craft projects based on these user preferences:
    - Environment: ${preferences.environment}
    - Available Resources: ${preferences.resources.join(", ")}
    - Time Commitment: ${preferences.timeCommitment}
    - Energy Level: ${preferences.energy}
    - Goal: ${preferences.goal}

    IMPORTANT: Return ONLY a valid JSON array. Do not wrap in markdown code blocks.
    Strictly follow this JSON structure for the objects:
    [
      {
        "id": "string (unique)",
        "title": "string (project name)",
        "matchReason": "string (short punchy reason why it matches, max 10 words)",
        "difficulty": "Beginner" | "Intermediate" | "Advanced",
        "environment": "string",
        "energy": "string",
        "timeCommitment": "string",
        "requiredResources": ["string", "string"],
        "goal": "string"
      }
    ]
  `;

    try {
        const text = await fetchFromOpenRouter(prompt);

        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export interface ProjectGuide {
    introduction: string;
    steps: { title: string; description: string }[];
    tips: string[];
    youtubeQueries: string[];
}

export async function getProjectDetails(title: string, resources: string[], environment: string) {
    const prompt = `
    Create a detailed "Get Started" guide for a project titled: "${title}".
    Context:
    - User Environment: ${environment}
    - Available Resources: ${resources.join(", ")}

    Return ONLY valid JSON. Structure:
    {
        "introduction": "A 2-sentence encouraging intro.",
        "steps": [
            { "title": "Step 1 Title", "description": "Detailed instruction." },
            { "title": "Step 2 Title", "description": "Detailed instruction." }
        ],
        "tips": ["Safety tip or pro-tip 1", "Tip 2"],
        "youtubeQueries": [
            "Specific youtube search query to find a tutorial for ${title}",
            "Another specific query for a technique used in this project"
        ]
    }
    `;

    try {
        const text = await fetchFromOpenRouter(prompt);
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanedText) as ProjectGuide;
    } catch (error) {
        console.error("Error fetching guide:", error);
        throw error
    }
}