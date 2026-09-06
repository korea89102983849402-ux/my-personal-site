import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("learning_planner.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT DEFAULT 'User'
  );

  CREATE TABLE IF NOT EXISTS learning_paths (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    goal TEXT,
    level TEXT,
    duration TEXT,
    path_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    platform TEXT,
    url TEXT,
    description TEXT,
    tags TEXT
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3003;

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/generate-path", async (req, res) => {
    try {
      const { goal, level, duration } = req.body;
      if (!goal || !level || !duration) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Dynamic import to support ESM
      const { OpenAI } = await import("openai");
      
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

      try {
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
        
        // Normalize data to prevent frontend crashes
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

    } catch (error: any) {
      console.error("Generate path error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/paths", (req, res) => {
    try {
      const { goal, level, duration, pathJson } = req.body;
      if (!goal || !pathJson) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const stmt = db.prepare("INSERT INTO learning_paths (user_id, goal, level, duration, path_json) VALUES (?, ?, ?, ?, ?)");
      const info = stmt.run(1, goal, level, duration, JSON.stringify(pathJson));
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error saving path" });
    }
  });

  app.get("/api/paths", (req, res) => {
    const paths = db.prepare("SELECT * FROM learning_paths ORDER BY created_at DESC").all();
    res.json(paths.map(p => ({ ...p, path_json: JSON.parse(p.path_json as string) })));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();
