import json
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import spacy
from collections import Counter

app = FastAPI()
nlp = spacy.load("en_core_web_sm")

class JDRequest(BaseModel):
    jd: str

@app.post("/")
async def analyze_jd(request: JDRequest):
    jd_text = request.jd
    doc = nlp(jd_text)
    # Extract keywords (nouns, proper nouns, skills-like words)
    keywords = [token.text for token in doc if token.pos_ in ("NOUN", "PROPN")]
    keyword_freq = Counter(keywords)
    # Example static skill list, you can enhance this
    skill_list = ["python", "java", "sql", "project management", "communication", "teamwork"]
    found_skills = [skill for skill in skill_list if skill in jd_text.lower()]
    suggestions = {
        "keywords": keyword_freq.most_common(15),
        "skills_found": found_skills,
        "suggestions": [
            "Highlight these keywords in your resume/cover letter.",
            "Mention your experience with the listed skills.",
            "Research the most common requirements for this role."
        ]
    }
    return JSONResponse(content=suggestions)

handler = app
