import { Type } from "@google/genai";

export interface Course {
  title: string;
  platform: string;
  url: string;
  description: string;
}

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  status: "pending" | "in-progress" | "completed";
  resources: Course[];
  learningSteps: string[];
  subSkills?: SkillNode[];
}

export interface LearningPath {
  id?: number;
  goal: string;
  level: string;
  duration: string;
  skills: SkillNode[];
  createdAt?: string;
}

export const learningPathSchema = {
  type: Type.OBJECT,
  properties: {
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          estimatedTime: { type: Type.STRING },
          learningSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 specific, actionable steps to master this skill module."
          },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                platform: { type: Type.STRING },
                url: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "platform", "url"]
            }
          },
          subSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                estimatedTime: { type: Type.STRING }
              }
            }
          }
        },
        required: ["id", "title", "description", "estimatedTime", "resources", "learningSteps"]
      }
    }
  },
  required: ["skills"]
};
