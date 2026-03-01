import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/book", (req, res) => {
    const { name, email, phone, destination, package: pkg, city } = req.body;
    
    console.log("--- NEW BOOKING REQUEST ---");
    console.log(`To: hamnawatravels@gmail.com`);
    console.log(`From: ${name} (${email})`);
    console.log(`Phone: ${phone}`);
    console.log(`City: ${city}`);
    console.log(`Destination: ${destination}`);
    console.log(`Package: ${pkg}`);
    console.log("---------------------------");

    // In a real app, you'd use nodemailer or a service like Resend/SendGrid here.
    // Since we don't have SMTP credentials, we simulate success.
    
    res.json({ 
      success: true, 
      message: "Booking request sent successfully! We will contact you soon." 
    });
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
