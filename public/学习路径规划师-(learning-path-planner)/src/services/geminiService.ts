import { LearningPath } from "../types";

export async function generateLearningPath(goal: string, level: string, duration: string): Promise<LearningPath> {
  const response = await fetch("/api/generate-path", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goal, level, duration }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "请求失败");
  }

  return response.json();
}
