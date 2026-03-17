import { OpenAI } from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { goal, level, duration } = req.body;
    if (!goal || !level || !duration) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY || "";
    if (!apiKey) {
      return res.status(500).json({ error: "DeepSeek API Key not configured on server" });
    }

    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: apiKey
    });

    const systemPrompt = `You are an expert learning consultant. Create a highly detailed and structured learning path for a user.
    You must return strictly valid JSON matching the requested schema.`;

    const userPrompt = `
      Goal: ${goal}
      Current Level: ${level}
      Target Duration: ${duration}
  
      The learning path should be broken down into major skill modules. 
      For each module:
      1. Provide a clear title and description.
      2. Estimate the time needed (use field "estimatedTime").
      3. Provide a "learningSteps" array containing 3-5 highly professional, actionable, and specific steps.
      4. Recommend at least 2 HIGHLY RELEVANT resources. 
      5. Provide stable, well-known URLs (official docs, popular courses) or specific search URLs if unsure.
      6. Resources can be Bilibili videos, YouTube videos, Coursera courses, or professional blogs.
      
      Return the result in this exact JSON structure:
      {
        "skills": [
          {
            "id": "unique_id_1",
            "title": "Module Title",
            "description": "Module Description",
            "estimatedTime": "e.g. 2 weeks",
            "learningSteps": ["Step 1", "Step 2", "Step 3"],
            "resources": [
              { "title": "Resource Title", "url": "URL", "platform": "Bilibili/YouTube/Coursera/Blog" }
            ],
            "subSkills": [
               { "title": "Sub Skill 1" }
            ]
          }
        ]
      }
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "deepseek-chat",
      response_format: { type: "json_object" },
      temperature: 1.3
    });

    const content = completion.choices[0].message.content || "{}";
    const result = JSON.parse(content);

    let skills = [];
    if (result.skills && Array.isArray(result.skills)) {
      skills = result.skills;
    } else if (result.learningPath && result.learningPath.skills && Array.isArray(result.learningPath.skills)) {
      skills = result.learningPath.skills;
    } else {
       // Try to find any array in the object that looks like skills
       const keys = Object.keys(result);
       for (const key of keys) {
         if (Array.isArray(result[key]) && result[key].length > 0 && result[key][0].title) {
           skills = result[key];
           break;
         }
       }
    }
    
    // Normalize data
    skills = skills.map((skill: any, index: number) => ({
      id: skill.id || `skill-${Date.now()}-${index}`,
      title: skill.title || "Untitled Skill",
      description: skill.description || "",
      estimatedTime: skill.estimatedTime || skill.timeEstimate || "Unknown duration",
      learningSteps: Array.isArray(skill.learningSteps) ? skill.learningSteps : [],
      resources: Array.isArray(skill.resources) ? skill.resources.map((r: any) => ({
        title: r.title || "Resource",
        url: r.url || "#",
        platform: r.platform || r.type || "Web",
        description: r.description || ""
      })) : [],
      subSkills: Array.isArray(skill.subSkills) ? skill.subSkills : []
    }));

    res.json({
      goal,
      level,
      duration,
      skills: skills,
    });

  } catch (error: any) {
    console.error("DeepSeek API error:", error);
    return res.status(500).json({ error: error.message || "AI Service Error" });
  }
}
