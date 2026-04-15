# AI-Powered ATS Resume Analyzer

A premium, full-stack web application that analyzes a candidate's resume against a target job description and simulates how a modern Applicant Tracking System (ATS) might score it.

## Tech Stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express (single-file API)

## Features

- Paste Resume and Job Description
- Overall match score and ATS compatibility score
- Matched and missing keywords, color-highlighted
- Skill categorization by Technical, Soft Skills, and Tools
- Smart improvement suggestions
- Resume quality checker (length, action verbs, metrics)

## Getting Started

Open two terminals from the project root (`resume-analyzer`).

### 1. Backend (API)

```bash
cd server
npm install
npm run dev
```

The API will run on `http://localhost:5000` with a POST endpoint at `/analyze`.

### 2. Frontend (Client)

```bash
cd client
npm install
npm run dev
```

Then open the Vite URL shown in the terminal (typically `http://localhost:5173`).

## API Contract

**Endpoint**: `POST /analyze`

**Body**:

```json
{
	"resumeText": "...",
	"jobDescription": "..."
}
```

**Response**:

```json
{
	"score": 82,
	"atsScore": 78,
	"matchedKeywords": ["react", "node", "api"],
	"missingKeywords": ["typescript"],
	"categorizedSkills": {
		"technical": { "matched": [], "missing": [], "matchPercentage": 0 },
		"soft": { "matched": [], "missing": [], "matchPercentage": 0 },
		"tools": { "matched": [], "missing": [], "matchPercentage": 0 }
	},
	"suggestions": ["..."],
	"resumeQuality": {
		"length": { "wordCount": 600, "assessment": "Balanced length for most roles" },
		"actionVerbs": { "present": true, "verbsFound": ["developed", "led"] },
		"metrics": { "hasMetrics": true },
		"overallTips": ["..."]
	}
}
```
