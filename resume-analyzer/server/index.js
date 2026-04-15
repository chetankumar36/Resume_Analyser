const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const STOP_WORDS = new Set([
	'the',
	'and',
	'a',
	'an',
	'to',
	'of',
	'in',
	'for',
	'on',
	'with',
	'at',
	'by',
	'from',
	'as',
	'is',
	'are',
	'was',
	'were',
	'be',
	'this',
	'that',
	'it',
	'or',
	'such',
	'into',
	'within',
]);

const TECHNICAL_SKILLS = [
	'javascript',
	'typescript',
	'react',
	'node',
	'nodejs',
	'express',
	'python',
	'java',
	'spring',
	'docker',
	'kubernetes',
	'sql',
	'nosql',
	'mongodb',
	'postgresql',
	'aws',
	'azure',
	'gcp',
	'microservices',
	'rest',
	'api',
	'graphql',
	'html',
	'css',
	'tailwind',
	'devops',
	'ci',
	'cd',
	'git',
];

const SOFT_SKILLS = [
	'communication',
	'leadership',
	'collaboration',
	'teamwork',
	'problem-solving',
	'problem',
	'ownership',
	'adaptability',
	'critical',
	'thinking',
	'mentoring',
	'coaching',
	'stakeholder',
	'management',
	'presentation',
];

const TOOLS = [
	'jira',
	'confluence',
	'github',
	'gitlab',
	'bitbucket',
	'jenkins',
	'circleci',
	'figma',
	'postman',
	'slack',
	'teams',
];

const ACTION_VERBS = [
	'developed',
	'built',
	'designed',
	'implemented',
	'led',
	'optimized',
	'improved',
	'delivered',
	'created',
	'architected',
	'owned',
	'launched',
	'executed',
	'scaled',
	'automated',
	'streamlined',
];

function normalize(text = '') {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9+\-\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function tokenize(text = '') {
	const normalized = normalize(text);
	if (!normalized) return [];
	return normalized.split(' ');
}

function extractKeywords(text = '') {
	const tokens = tokenize(text);
	return tokens.filter((t) => t && !STOP_WORDS.has(t));
}

function buildCategory(jobKeywords, resumeSet, dictionary) {
	const jobCategoryKeywords = jobKeywords.filter((k) => dictionary.includes(k));
	const uniqueJobCategory = [...new Set(jobCategoryKeywords)];
	const matched = uniqueJobCategory.filter((k) => resumeSet.has(k));
	const missing = uniqueJobCategory.filter((k) => !resumeSet.has(k));
	const denominator = uniqueJobCategory.length || 1;
	const matchPercentage = (matched.length / denominator) * 100;

	return {
		matched,
		missing,
		matchPercentage,
	};
}

function analyzeResumeQuality(resumeText) {
	const tokens = tokenize(resumeText);
	const wordCount = tokens.length;
	const hasMetrics = /\d/.test(resumeText);
	const lower = resumeText.toLowerCase();
	const verbsFound = ACTION_VERBS.filter((v) => lower.includes(v));
	const hasActionVerbs = verbsFound.length > 0;

	let lengthAssessment = 'Balanced length for most roles';
	if (wordCount < 200) {
		lengthAssessment = 'Very short – consider adding more depth and context';
	} else if (wordCount > 1000) {
		lengthAssessment = 'Quite long – consider tightening to the most relevant impact';
	}

	const overallTips = [];
	if (wordCount < 250) {
		overallTips.push('Add more detail about your responsibilities and measurable outcomes for each role.');
	}
	if (wordCount > 900) {
		overallTips.push('Trim older or less relevant experience to keep the resume focused.');
	}
	if (!hasActionVerbs) {
		overallTips.push('Introduce strong action verbs (Developed, Built, Designed, Led) at the start of bullet points.');
	}
	if (!hasMetrics) {
		overallTips.push('Incorporate concrete numbers (%, revenue, time saved, scale) to quantify impact.');
	}

	return {
		length: {
			wordCount,
			assessment: lengthAssessment,
		},
		actionVerbs: {
			present: hasActionVerbs,
			verbsFound,
		},
		metrics: {
			hasMetrics,
		},
		overallTips,
	};
}

function buildSuggestions({ score, atsScore, missingKeywords, categorizedSkills, resumeQuality }) {
	const suggestions = [];

	if (score < 70) {
		suggestions.push(
			'Tailor the resume language to mirror the job description more closely, especially in the top half of the page.',
		);
	}

	if (missingKeywords.length) {
		suggestions.push(
			`Naturally weave missing high-value keywords like ${missingKeywords
				.slice(0, 6)
				.join(', ')} into your summary and recent experience, where they genuinely apply.`,
		);
	}

	if (categorizedSkills.technical?.missing?.length) {
		suggestions.push(
			'Strengthen your technical section by explicitly listing the tools, languages, and frameworks required in the job description.',
		);
	}

	if (categorizedSkills.soft?.missing?.length) {
		suggestions.push(
			'Highlight soft skills such as collaboration, leadership, and stakeholder management in the context of real projects.',
		);
	}

	if (categorizedSkills.tools?.missing?.length) {
		suggestions.push(
			'Add a dedicated “Tools & Platforms” line that calls out key systems like Jira, Git, and CI/CD platforms if you actively use them.',
		);
	}

	if (resumeQuality && !resumeQuality.metrics.hasMetrics) {
		suggestions.push('Introduce measurable achievements (e.g. “reduced latency by 35%” or “improved conversion by 12%”).');
	}

	if (resumeQuality && !resumeQuality.actionVerbs.present) {
		suggestions.push('Rewrite bullets to start with dynamic action verbs instead of passive descriptions.');
	}

	if (atsScore < 65) {
		suggestions.push(
			'Avoid heavy graphics, tables, or columns; keep formatting ATS-friendly with simple headings and bullet lists.',
		);
	}

	return [...new Set(suggestions)];
}

app.post('/analyze', (req, res) => {
	const { resumeText, jobDescription } = req.body || {};

	if (!resumeText || !jobDescription) {
		return res.status(400).json({ message: 'Both resumeText and jobDescription are required.' });
	}

	const resumeTokens = extractKeywords(resumeText);
	const jobKeywords = extractKeywords(jobDescription);

	const resumeSet = new Set(resumeTokens);
	const jobSet = new Set(jobKeywords);

	const matchedKeywords = [...jobSet].filter((w) => resumeSet.has(w));
	const missingKeywords = [...jobSet].filter((w) => !resumeSet.has(w));

	const score = jobSet.size ? Math.round((matchedKeywords.length / jobSet.size) * 100) : 0;

	const resumeQuality = analyzeResumeQuality(resumeText);

	let atsScore = score;

	if (!resumeQuality.metrics.hasMetrics) {
		atsScore -= 8;
	}
	if (!resumeQuality.actionVerbs.present) {
		atsScore -= 7;
	}
	const wordCount = resumeQuality.length.wordCount;
	if (wordCount < 200 || wordCount > 1000) {
		atsScore -= 10;
	}

	atsScore = Math.max(0, Math.min(100, Math.round(atsScore)));

	const categorizedSkills = {
		technical: buildCategory(jobKeywords, resumeSet, TECHNICAL_SKILLS),
		soft: buildCategory(jobKeywords, resumeSet, SOFT_SKILLS),
		tools: buildCategory(jobKeywords, resumeSet, TOOLS),
	};

	const suggestions = buildSuggestions({ score, atsScore, missingKeywords, categorizedSkills, resumeQuality });

	return res.json({
		score,
		atsScore,
		matchedKeywords,
		missingKeywords,
		categorizedSkills,
		suggestions,
		resumeQuality,
	});
});

app.get('/', (_req, res) => {
	res.send('AI-Powered ATS Resume Analyzer backend is running.');
});

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`ATS Resume Analyzer API listening on port ${PORT}`);
});
