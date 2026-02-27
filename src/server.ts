import { serve } from "bun";
import path from "path";
import { existsSync, readFileSync } from "fs";

const dist = path.join(import.meta.dir, "dist");
const publicDir = path.join(import.meta.dir, "public");

serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    let filePath = path.join(dist, url.pathname);

    // Serve files from dist
    if (existsSync(filePath) && !filePath.endsWith("/")) {
      try {
        const file = readFileSync(filePath);
        const ext = path.extname(filePath);
        const contentTypes: Record<string, string> = {
          ".js": "application/javascript",
          ".css": "text/css",
          ".html": "text/html",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".gif": "image/gif",
          ".svg": "image/svg+xml",
        };

        return new Response(file, {
          headers: {
            "Content-Type": contentTypes[ext] || "application/octet-stream",
            "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
          },
        });
      } catch {
        return new Response("Error reading file", { status: 500 });
      }
    }

    // Serve index.html for all other routes (SPA routing)
    const indexPath = path.join(dist, "index.html");
    if (existsSync(indexPath)) {
      try {
        const html = readFileSync(indexPath, "utf-8");
        return new Response(html, {
          headers: { "Content-Type": "text/html", "Cache-Control": "no-cache" },
        });
      } catch {
        return new Response("Error reading index.html", { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log("Server running at http://localhost:3000");
