# JD Analyzer

An AI-powered job description analyzer that extracts important keywords, skills, and suggestions. Ready for Vercel deployment.

## How it works

- Paste a job description into the web form.
- Get a summary of top keywords, detected skills, and actionable suggestions.

## Local Development

1. Install dependencies for Next.js frontend:
   ```
   npm install
   ```

2. Install dependencies for Python API:
   ```
   cd api
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   ```

3. Run Next.js dev server:
   ```
   npm run dev
   ```

## Deploy on Vercel

1. [Connect to Vercel](https://vercel.com/import) and import your repo.
2. Add a Vercel build step to ensure spaCy model is available:
   - In `api/postinstall` (make executable), add:
     ```
     #!/bin/bash
     python -m spacy download en_core_web_sm
     ```
   - Or add a Vercel "Build Command": `python -m spacy download en_core_web_sm`
3. Deploy!

> For more advanced NLP (like GPT/OpenAI integration), you can swap out the Python logic in `analyze_jd.py` for OpenAI API calls.

## License

MIT
