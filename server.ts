import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI-Powered Personalized Recommendations & Vibe Search
  app.post('/api/ai/recommendations', async (req, res) => {
    try {
      const { userPrompt, profileName, preferredGenres, viewingHistory, currentMood } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Fallback intelligent heuristic recommendation if GEMINI_API_KEY is not set
        return res.json({
          source: 'heuristic_engine',
          vibeSummary: `Curated personalized recommendations based on ${preferredGenres?.join(', ') || 'your favorite genres'} and ${currentMood || 'trending vibes'}.`,
          matchInsights: [
            {
              theme: 'High Adrenaline & Suspense',
              reason: 'Matches your frequent evening binge habits and preference for non-linear storytelling.',
              tags: ['#BingeWorthy', '#NeonNoir', '#PlotTwists']
            }
          ],
          aiCuratedQuote: 'Here are hand-picked cinematic masterpieces tailored for your session.'
        });
      }

      const prompt = `You are CineAI, an ultra-smart Netflix recommendation engine and cinematic sommelier.
User Profile: ${profileName || 'Binge Viewer'}
Preferred Genres: ${preferredGenres ? preferredGenres.join(', ') : 'Sci-Fi, Thriller, Action, Drama'}
Recent Viewing History: ${viewingHistory ? JSON.stringify(viewingHistory) : 'High-stakes sci-fi thrillers, cyberpunk mysteries, deep mysteries'}
User Query / Mood: "${userPrompt || currentMood || 'Suggest an incredible mind-bending binge experience'}"

Provide a concise, stylish JSON response with:
1. "vibeSummary": A 1-2 sentence compelling summary of the viewer's current aesthetic vibe.
2. "aiCuratedQuote": A punchy cinema quote or personalized tagline tailored to their mood.
3. "matchedVibes": An array of 3-4 catchy hashtag keywords (e.g. "#MindBending", "#NeonNoir", "#AdrenalineRush").
4. "recommendedGenres": Array of 3 recommended genre categories.
5. "personalizedReason": 1-2 sentences explaining why these titles will satisfy their mood.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);

      return res.json({
        source: 'gemini_ai',
        ...parsed
      });
    } catch (error: any) {
      console.error('Error in /api/ai/recommendations:', error);
      res.status(200).json({
        source: 'fallback',
        vibeSummary: 'Curated recommendation stream tailored for deep immersion and uninterrupted streaming.',
        aiCuratedQuote: 'Every great binge begins with the right story.',
        matchedVibes: ['#BingeWorthy', '#Cinematic', '#TrendingNow'],
        personalizedReason: 'Selected based on your top-rated preferences and popular platform trends.'
      });
    }
  });

  // AI Movie Synopsis & "Why You'll Love This" Pitch
  app.post('/api/ai/pitch', async (req, res) => {
    try {
      const { title, genre, synopsis } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          pitch: `A tour-de-force ${genre || 'cinematic'} experience with breathtaking visual mastery and an unforgettable climax.`
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Create a captivating 2-sentence Netflix "Why You'll Love This" binge pitch for the title "${title}" (${genre}). Synopsis: "${synopsis}". Focus on atmospheric tone, pacing, and emotional hook. Return plain text only.`,
        config: {
          temperature: 0.8,
        }
      });

      res.json({
        pitch: response.text?.trim() || `An unmissable masterclass in ${genre} storytelling.`
      });
    } catch (error) {
      res.json({
        pitch: 'A thrilling, binge-worthy addition to your watchlist with exceptional cinematography.'
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StreamFlix server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
