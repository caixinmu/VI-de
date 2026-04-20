import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for submitting VI selection
  app.post('/api/submit', async (req, res) => {
    try {
      const { selections, timestamp, additionalNotes } = req.body;
      
      let content = `LIGHTING VI SYSTEM SELECTION REPORT\n`;
      content += `Generated at: ${timestamp}\n`;
      content += `----------------------------------\n\n`;

      if (additionalNotes) {
        content += `[SUPPLEMENTARY ITEMS / NOTES]\n`;
        content += `${additionalNotes}\n\n`;
        content += `----------------------------------\n\n`;
      }

      for (const category in selections) {
        content += `[${category}]\n`;
        selections[category].forEach((item: string) => {
          content += `- ${item}\n`;
        });
        content += `\n`;
      }

      const outputDir = path.join(__dirname, 'caixinmu');
      try {
        await fs.access(outputDir);
      } catch {
        await fs.mkdir(outputDir, { recursive: true });
      }

      const fileName = `vi_selection_${Date.now()}.txt`;
      const filePath = path.join(outputDir, fileName);
      
      await fs.writeFile(filePath, content);
      
      console.log(`Selection saved to ${filePath}`);
      res.json({ success: true, fileName: `caixinmu/${fileName}` });
    } catch (error) {
      console.error('Failed to save selection:', error);
      res.status(500).json({ error: 'Failed to save selection' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
