import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("portfolio.db");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Allow images and documents (pdf, doc, docx)
    const allowedMimeTypes = [
      "image/jpeg", "image/png", "image/webp", "image/gif",
      "application/pdf", "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images and PDF/DOC are allowed."));
    }
  }
});

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    image TEXT,
    tags TEXT,
    demo_url TEXT,
    github_url TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    role TEXT,
    company TEXT,
    points TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    icon TEXT,
    color TEXT,
    category TEXT,
    level INTEGER,
    description TEXT
  );
`);

// Seed data if empty
const projectCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
if (projectCount.count === 0) {
  const insert = db.prepare("INSERT INTO projects (title, description, image, tags, demo_url, github_url, category) VALUES (?, ?, ?, ?, ?, ?, ?)");
  insert.run(
    "Cloud Analytics SaaS",
    "A complex data processing engine providing real-time visualization for multi-tenant enterprise clients.",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "React,Node.js,MongoDB",
    "#",
    "#",
    "Full Stack"
  );
  insert.run(
    "Marketplace Engine",
    "Full-featured e-commerce platform with inventory management, custom checkout flow and secure payments.",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    "Redux,Express,Stripe",
    "#",
    "#",
    "Full Stack"
  );
  insert.run(
    "StreamTalk Messenger",
    "A real-time communication platform supporting video calls, instant messaging, and screen sharing.",
    "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800",
    "Socket.io,MERN,WebRTC",
    "#",
    "#",
    "Real-time"
  );
  insert.run(
    "Nexus E-Commerce",
    "A premium shopping experience with real-time inventory, Stripe Connect integration.",
    "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
    "MERN Stack",
    "#",
    "#",
    "Full Stack"
  );
  insert.run(
    "Analytics Pro",
    "Collaborative business intelligence platform featuring dynamic data visualization.",
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800",
    "React & Node",
    "#",
    "#",
    "Full Stack"
  );
  insert.run(
    "CryptoPulse",
    "Real-time cryptocurrency monitoring with price alerts, portfolio tracking.",
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800",
    "Full Stack",
    "#",
    "#",
    "Full Stack"
  );
}

const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  const insert = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  insert.run("dev_name", "SaddamDev");
  insert.run("dev_email", "f.saddam319@gmail.com");
  insert.run("dev_phone", "+92(302) 852-2319");
  insert.run("dev_location", "Islamabad, Pakistan");
  insert.run("dev_photo", "/saddam.jpg");
  insert.run("github_url", "https://github.com/saddam-khan-dev");
  insert.run("linkedin_url", "https://www.linkedin.com/in/saddam-hussain-4285793b2/");
  insert.run("years_exp", "2+");
  insert.run("projects_done", "20+");
  insert.run("happy_clients", "10+");
  insert.run("copyright_year", "2026");
  insert.run("resume_url", "/resume/resume.pdf");
  
  // New Dynamic Content Settings
  insert.run("hero_title", "Building Scalable Web Apps");
  insert.run("hero_subtitle", "Full Stack MERN Specialist crafting high-performance digital experiences with MongoDB, Express, React, and Node.js.");
  insert.run("hero_badge", "Available for Hire");
  insert.run("hero_tech_stack_label", "Expertise in modern tech stacks");
  insert.run("projects_title", "Featured Projects");
  insert.run("projects_subtitle", "Portfolio");
  insert.run("skills_title", "The Modern Tech Stack");
  insert.run("skills_subtitle", "Specialized in the MERN stack with a strong focus on clean architecture, performance optimization, and scalable backend services.");
  insert.run("about_title", "About & Skills");
  insert.run("about_journey_title", "My Journey");
  insert.run("about_journey_text1", "I am a passionate Full Stack Developer with over 2+ years of experience in the MERN stack. My journey started with a curiosity for how the web works, which evolved into a professional career building robust and user-centric applications.");
  insert.run("about_journey_text2", "Over the years, I've worked with startups and established enterprises to deliver high-performance solutions. My approach combines technical excellence with a deep understanding of business goals.");
  insert.run("contact_title", "Let's build something extraordinary.");
  insert.run("contact_subtitle", "I'm currently available for freelance work and full-time opportunities. Send me a message and let's discuss your vision.");
}

const skillsCount = db.prepare("SELECT COUNT(*) as count FROM skills").get() as { count: number };
if (skillsCount.count === 0) {
  const insert = db.prepare("INSERT INTO skills (name, icon, color, category, level, description) VALUES (?, ?, ?, ?, ?, ?)");
  insert.run('React', 'Terminal', 'text-primary', 'Frontend', 95, 'Advanced hooks, State management (Redux/Zustand), and SSR with Next.js.');
  insert.run('Node.js', 'Code', 'text-accent-cyan', 'Backend', 88, 'Server-side logic, performance optimization, and real-time features with Socket.io.');
  insert.run('MongoDB', 'Database', 'text-primary', 'Database', 90, 'Expertise in schema design, aggregation pipelines, and indexing strategies.');
  insert.run('Express.js', 'Zap', 'text-accent-purple', 'Backend', 85, 'Building robust REST APIs, middleware management, and security implementations.');
  insert.run('Tailwind', 'Brush', 'text-white', 'Frontend', 92, 'Utility-first CSS framework for rapid UI development and responsive design.');
  insert.run('AWS', 'Cloud', 'text-accent-cyan', 'Cloud', 75, 'Deployment, S3 storage, and basic serverless functions.');
}

const experienceCount = db.prepare("SELECT COUNT(*) as count FROM experience").get() as { count: number };
if (experienceCount.count === 0) {
  const insert = db.prepare("INSERT INTO experience (date, role, company, points) VALUES (?, ?, ?, ?)");
  insert.run(
    '2024 — PRESENT',
    'Full Stack MERN Developer',
    'Freelance / SaddamDev',
    'Developing end-to-end web applications using MongoDB, Express, React, and Node.js.,Implementing real-time features and secure authentication systems.,Focusing on scalable architecture and performance optimization.'
  );
  insert.run(
    '2023 — 2024',
    'Frontend Developer',
    'Creative Tech Solutions',
    'Built responsive and interactive user interfaces using React and Tailwind CSS.,Collaborated with designers to translate Figma mockups into functional code.,Optimized frontend performance and accessibility.'
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // API Routes
  app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects").all();
    console.log("Raw projects from DB:", projects);
    res.json(projects.map((p: any) => ({
      ...p,
      tags: p.tags ? p.tags.split(",") : []
    })));
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsObj = (settings as any[]).reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  });

  app.get("/api/experience", (req, res) => {
    const experience = db.prepare("SELECT * FROM experience").all();
    res.json(experience.map((e: any) => ({
      ...e,
      points: e.points ? e.points.split(",") : []
    })));
  });

  app.get("/api/skills", (req, res) => {
    const skills = db.prepare("SELECT * FROM skills").all();
    res.json(skills);
  });

  // Admin Routes (Simple Auth for demo)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, token: "dummy-token" });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.post("/api/settings", (req, res) => {
    const settings = req.body;
    const upsert = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    const transaction = db.transaction((data) => {
      for (const [key, value] of Object.entries(data)) {
        upsert.run(key, value);
      }
    });
    transaction(settings);
    res.json({ success: true });
  });

  app.post("/api/projects", (req, res) => {
    const { title, description, image, tags, demo_url, github_url, category } = req.body;
    const insert = db.prepare("INSERT INTO projects (title, description, image, tags, demo_url, github_url, category) VALUES (?, ?, ?, ?, ?, ?, ?)");
    const result = insert.run(title, description, image, tags, demo_url, github_url, category);
    res.json({ id: result.lastInsertRowid });
  });

  app.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, image, tags, demo_url, github_url, category } = req.body;
    const update = db.prepare("UPDATE projects SET title = ?, description = ?, image = ?, tags = ?, demo_url = ?, github_url = ?, category = ? WHERE id = ?");
    update.run(title, description, image, tags, demo_url, github_url, category, Number(id));
    res.json({ success: true });
  });

  app.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    console.log(`[DELETE Project] ID: ${id}`);
    
    try {
      // Check if exists first
      const project = db.prepare("SELECT id FROM projects WHERE id = ?").get(id);
      
      const del = db.prepare("DELETE FROM projects WHERE id = ?");
      const result = del.run(Number(id));
      
      console.log(`[DELETE Project] Result:`, result);
      res.json({ 
        success: true, 
        changes: result.changes, 
        existed: !!project,
        id 
      });
    } catch (err: any) {
      console.error(`[DELETE Project] Error:`, err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/experience", (req, res) => {
    const { date, role, company, points } = req.body;
    const insert = db.prepare("INSERT INTO experience (date, role, company, points) VALUES (?, ?, ?, ?)");
    const result = insert.run(date, role, company, Array.isArray(points) ? points.join(",") : points);
    res.json({ id: result.lastInsertRowid });
  });

  app.put("/api/experience/:id", (req, res) => {
    const { id } = req.params;
    const { date, role, company, points } = req.body;
    const update = db.prepare("UPDATE experience SET date = ?, role = ?, company = ?, points = ? WHERE id = ?");
    update.run(date, role, company, Array.isArray(points) ? points.join(",") : points, Number(id));
    res.json({ success: true });
  });

  app.delete("/api/experience/:id", (req, res) => {
    const { id } = req.params;
    console.log(`[DELETE Experience] ID: ${id}`);
    
    try {
      // Check if exists first
      const exp = db.prepare("SELECT id FROM experience WHERE id = ?").get(id);
      
      const del = db.prepare("DELETE FROM experience WHERE id = ?");
      const result = del.run(Number(id));
      
      console.log(`[DELETE Experience] Result:`, result);
      res.json({ 
        success: true, 
        changes: result.changes, 
        existed: !!exp,
        id 
      });
    } catch (err: any) {
      console.error(`[DELETE Experience] Error:`, err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/skills", (req, res) => {
    const { name, icon, color, category, level, description } = req.body;
    const insert = db.prepare("INSERT INTO skills (name, icon, color, category, level, description) VALUES (?, ?, ?, ?, ?, ?)");
    const result = insert.run(name, icon, color, category, level, description);
    res.json({ id: result.lastInsertRowid });
  });

  app.put("/api/skills/:id", (req, res) => {
    const { id } = req.params;
    const { name, icon, color, category, level, description } = req.body;
    const update = db.prepare("UPDATE skills SET name = ?, icon = ?, color = ?, category = ?, level = ?, description = ? WHERE id = ?");
    update.run(name, icon, color, category, level, Number(id));
    res.json({ success: true });
  });

  app.delete("/api/skills/:id", (req, res) => {
    const { id } = req.params;
    const del = db.prepare("DELETE FROM skills WHERE id = ?");
    del.run(Number(id));
    res.json({ success: true });
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Store in database
    const insert = db.prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
    insert.run(name, email, message);

    // Attempt to send email if configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      console.log("Attempting to send email to f.saddam319@gmail.com...");
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const info = await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: 'f.saddam319@gmail.com',
          subject: `New Portfolio Message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          replyTo: email
        });
        console.log("Email sent successfully:", info.messageId);
      } catch (error) {
        console.error("Email sending failed. Error details:", error);
      }
    } else {
      console.warn("SMTP_USER or SMTP_PASS not set. Skipping email sending.");
    }

    res.json({ success: true, message: "Message sent successfully" });
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
