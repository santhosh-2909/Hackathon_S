import type { ProblemStatement } from '@/types/problem';

/**
 * Ten researched SIH problem statements compiled for third-year, first-time
 * teams. Selection filter: real-world problem, medium difficulty, buildable as a
 * working prototype inside a hackathon window.
 *
 * Source: docs/content-sources/sih-problem-statements.md. Treat "expected
 * solution" as informed guidance reconstructed from the official title, theme
 * and organisation — not verbatim portal text. Verify PS numbers and dataset
 * links on the live portal before a team locks a choice.
 */
export const PROBLEM_STATEMENTS: readonly ProblemStatement[] = [
  {
    slug: 'medicinal-plant-identification',
    code: 'SIH1343',
    year: 2023,
    title: 'Medicinal plant and raw-material identification from images',
    summary:
      'AYUSH practitioners identify raw herbal material by eye — slow, subjective, and blind to look-alike species and adulteration.',
    domain: 'healthcare',
    organization: 'Ministry of AYUSH',
    theme: 'MedTech / BioTech / HealthTech',
    category: 'Software',
    difficulty: 'approachable',
    dataset: 'public-substitute',
    datasetNote:
      'Not bundled on the portal. Public "Indian Medicinal Leaf" image sets on Kaggle and Mendeley are the standard substitute, sometimes combined with AYUSH reference photographs.',
    background:
      'AYUSH systems — Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homoeopathy — depend on correctly identifying raw herbal material and medicinal plants. Manual identification is slow, subjective, and vulnerable to error where species look alike or where adulteration has occurred in the supply chain. That is a genuine quality-control gap for AYUSH manufacturers and practitioners.',
    statement:
      'Build a system that identifies different medicinal plants and raw herbal materials from images, using image processing and machine learning.',
    expectedSolution:
      'A mobile or web app where a user photographs a leaf or raw-material sample. A transfer-learned image classifier on a MobileNet or EfficientNet backbone returns the species name, its AYUSH reference name, and common uses. Stretch goal: an adulteration and look-alike warning.',
    whyItFits:
      'A bounded supervised image-classification task with abundant tutorials and pretrained weights. A working baseline is achievable inside the window, and because it is not a diagnostic or life-critical tool, the ethical and liability surface stays small.',
    stack: ['Next.js', 'FastAPI', 'PyTorch / MobileNet', 'Supabase', 'Vercel'],
    image: '/imagery/ps-healthcare-1.png',
    sliceHours: 6,
  },
  {
    slug: 'student-mental-health-support',
    code: 'SIH25092',
    year: 2025,
    title: 'Digital mental health and psychological support for students',
    summary:
      'Campuses have no early-detection mechanism for student distress, and stigma keeps students away from the channels that do exist.',
    domain: 'healthcare',
    organization: 'Government of Jammu & Kashmir',
    theme: 'MedTech / BioTech / HealthTech',
    category: 'Software',
    difficulty: 'approachable',
    dataset: 'self-sourced',
    datasetNote:
      'Not supplied. Prototype with public validated screening-instrument item banks (PHQ-9, GAD-7 style) and open mental-health FAQ corpora. Use synthetic data for anything involving personal entries — do not collect real student data for a hackathon prototype.',
    background:
      'Higher-education institutions are seeing rising stress, anxiety and low mood among students, but most campuses lack an early-detection mechanism, and stigma discourages students from seeking help through conventional channels. There is no widely available, private, adaptive support platform built specifically for the student population.',
    statement:
      'Develop a digital mental health and psychological support system for students in higher education.',
    expectedSolution:
      'A web or mobile platform combining validated self-assessment questionnaires, mood and journal tracking, a curated resource library, and a confidential escalation path to a counsellor. Stronger submissions add a lightweight sentiment-trend model over journal entries to flag deteriorating patterns — framed as a support and triage tool, never a diagnostic one, with an explicit "talk to a professional" pathway.',
    whyItFits:
      'Directly relatable subject matter, no exotic infrastructure, and most of the build effort is UX and content design rather than deep ML. A good medium calibration that still reads as a real institutional need.',
    stack: ['Next.js', 'Supabase', 'Postgres RLS', 'Recharts', 'Vercel'],
    image: '/imagery/ps-healthcare-2.png',
    sliceHours: 5,
  },
  {
    slug: 'crop-disease-identification',
    code: 'SIH1401',
    year: 2023,
    title: 'App-based crop and plant disease identification',
    summary:
      'Smallholder farmers have no fast, affordable way to diagnose crop disease in the field, so they guess — and misuse pesticide.',
    domain: 'aiml',
    organization: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    theme: 'Agriculture, FoodTech & Rural Development',
    category: 'Software',
    difficulty: 'approachable',
    dataset: 'public-substitute',
    datasetNote:
      'No proprietary set from the portal. PlantVillage — 54,000+ labelled leaf images across 38 disease classes — is the dataset almost every team uses for this exact class of problem, and it is well documented with existing baselines.',
    background:
      'Smallholder farmers often have no fast, affordable way to diagnose crop disease in the field. Delayed or wrong diagnosis leads to yield loss and, frequently, pesticide misuse from guessing at treatment.',
    statement:
      'Build an app-based solution to identify and help solve disease in plants and crops.',
    expectedSolution:
      'A mobile app where a farmer photographs an affected leaf; a CNN classifies the disease and returns plain-language treatment and agronomy guidance. Bonus points for working offline or on low bandwidth, since the target users are rural.',
    whyItFits:
      'One of the best-trodden computer-vision classification tasks in the whole SIH set — enough public reference material to get a real baseline running fast, while still being a genuinely used class of tool in Indian agritech.',
    stack: ['React Native / PWA', 'FastAPI', 'TensorFlow Lite', 'SQLite', 'Render'],
    image: '/imagery/ps-aiml-1.png',
    sliceHours: 6,
  },
  {
    slug: 'e-consultation-sentiment-analysis',
    code: 'SIH25035',
    year: 2025,
    title: 'Sentiment analysis of e-consultation comments',
    summary:
      'Policy officers read every public comment on a draft law by hand — slow, inconsistent, and impossible to scale.',
    domain: 'aiml',
    organization: 'Ministry of Corporate Affairs',
    theme: 'Miscellaneous',
    category: 'Software',
    difficulty: 'medium',
    dataset: 'provided',
    datasetNote:
      'MCA sentiment statements have historically shipped a sample comment corpus through the portal for registered teams. Confirm the exact dataset link on the live portal — this was not independently verifiable outside the login gate at research time.',
    background:
      "MCA's e-consultation module invites public comments on draft policy and legislative changes. Officials currently have to read through a large, growing volume of free-text comments manually to gauge public sentiment and surface substantive points — slow and inconsistent at scale.",
    statement:
      'Build a system for sentiment analysis of comments received through the e-consultation module.',
    expectedSolution:
      'An NLP pipeline that ingests the comment corpus, classifies sentiment — positive, negative, neutral, and ideally stance on specific clauses — clusters recurring themes, and renders a dashboard for policy officers to triage by sentiment and volume.',
    whyItFits:
      'A standard text-classification-plus-topic-modelling task buildable with off-the-shelf libraries in the hackathon window. No specialised domain knowledge required beyond basic NLP.',
    stack: ['Next.js', 'FastAPI', 'scikit-learn / HuggingFace', 'Postgres', 'Render'],
    image: '/imagery/ps-aiml-2.png',
    sliceHours: 7,
  },
  {
    slug: 'server-side-spoofed-email-detection',
    code: 'LC1076',
    year: 2022,
    title: 'Server-side spoofed-email detection',
    summary:
      'A spoofed sender lands straight in the inbox when the receiving server never verifies who actually sent it.',
    domain: 'cybersecurity',
    organization: 'Ministry of External Affairs (MEA)',
    theme: 'Blockchain & Cybersecurity',
    category: 'Software',
    difficulty: 'approachable',
    dataset: 'self-sourced',
    datasetNote:
      'Not provided. Teams build their own spoofed-vs-legitimate header sample sets, commonly drawing on public spam and phishing corpora such as Enron and SpamAssassin, plus synthetically spoofed headers for the attack class.',
    background:
      "A spoofed email — sender address and sometimes IP swapped to impersonate a trusted party — can land directly in a victim's inbox when the receiving server does not verify sender authenticity. MEA, which handles sensitive official correspondence, wanted filtering enforced server-side rather than relying on end-user vigilance.",
    statement:
      'Suggest a mechanism to filter spoofed email at the server, before it reaches the inbox.',
    expectedSolution:
      'A server-side mail filter implementing and extending SPF, DKIM and DMARC verification, layered with header-anomaly heuristics — Return-Path vs. From mismatch, sender-IP reputation, domain age — to flag or quarantine spoofed mail pre-delivery.',
    whyItFits:
      'Tightly bounded scope: protocol-level header analysis, not large-scale ML. Buildable with a small mail-relay sandbox and grounded in standard undergraduate networking and security concepts — a strong first cybersecurity pick precisely because it needs no prior red-team experience.',
    stack: ['Node.js', 'Postfix / Haraka sandbox', 'SPF-DKIM-DMARC libs', 'Next.js console'],
    image: '/imagery/ps-cyber-1.png',
    sliceHours: 5,
  },
  {
    slug: 'lookalike-phishing-domain-detection',
    code: 'SIH1454',
    year: 2023,
    title: 'AI/ML detection of look-alike phishing domains',
    summary:
      'Attackers register typosquats and homoglyph domains faster than any blacklist can be maintained by hand.',
    domain: 'cybersecurity',
    organization: 'National Technical Research Organisation (NTRO)',
    theme: 'Blockchain & Cybersecurity',
    category: 'Software',
    difficulty: 'medium',
    dataset: 'public-substitute',
    datasetNote:
      'No dataset bundled with the statement. PhishTank, OpenPhish and the UCI "Phishing Websites" dataset are the standard public substitutes — confirmed as the sets multiple public teams actually used for this exact PS.',
    background:
      "Attackers register look-alike domains — typosquats, homoglyphs, subtly altered brand names — that mimic a genuine site's look and feel to harvest credentials. Manual blacklisting cannot keep pace with the volume of newly registered malicious domains.",
    statement:
      'Create an intelligent system using AI/ML to detect phishing domains that imitate the look and feel of genuine domains.',
    expectedSolution:
      'A classifier combining lexical URL features — edit distance to known brand domains, string length, special-character ratio — with WHOIS and domain-age signals. Stronger submissions add a visual-similarity check via screenshot comparison or perceptual hashing, exposed through an API or a browser-extension-style demo.',
    whyItFits:
      'A popular AI-plus-security crossover with plenty of public notebooks to start from. Random Forest or XGBoost on lexical features gets a working demo fast, then leaves room for polish — good difficulty calibration for a first attempt.',
    stack: ['FastAPI', 'XGBoost', 'python-whois', 'Playwright + pHash', 'Next.js'],
    image: '/imagery/ps-cyber-2.png',
    sliceHours: 7,
  },
  {
    slug: 'flood-inundation-probability-mapping',
    code: 'SS597',
    year: 2022,
    title: 'Flood inundation probability mapping',
    summary:
      'Two decades of satellite flood maps tell you where water went — not how likely a given place is to flood next monsoon.',
    domain: 'spacetech',
    organization: 'ISRO — Space Applications Centre (SAC) / NRSC',
    theme: 'ISRO / Department of Space set',
    category: 'Software',
    difficulty: 'medium',
    dataset: 'provided',
    datasetNote:
      'Explicitly flagged "Download" on ISRO/SAC\'s own problem page — one of the few SIH datasets confirmed as directly supplied. ISRO Bhoonidhi/NRSC flood archives and open DEM sources (Copernicus DEM, SRTM) are the standard supplementary material.',
    background:
      'India experiences recurring monsoon flooding, and NRSC/ISRO has mapped flood extent from satellite imagery for two decades. This statement asked for something different: turning historical multi-date imagery into a probability surface — how likely a given area is to flood — rather than a single-event snapshot.',
    statement:
      'Develop an image-processing-based approach to estimate flood inundation probability.',
    expectedSolution:
      'A pipeline that ingests multi-temporal satellite imagery (optical or SAR) plus a Digital Elevation Model, extracts historical flood-extent layers, and computes a per-grid-cell flood probability — either frequency-based or an ML classifier over elevation, slope and distance-to-drainage — rendered as a map layer.',
    whyItFits:
      'A geospatial data-science task with a clearly interpretable output — a map. Doable with Python plus a lightweight model, no satellite-operations background required, and a realistic first ISRO statement rather than one of the mission-hardware-grade challenges in the same set.',
    stack: ['Python', 'rasterio / geopandas', 'scikit-learn', 'Leaflet', 'Render'],
    image: '/imagery/ps-space-1.png',
    sliceHours: 8,
  },
  {
    slug: 'ground-level-ozone-no2-forecast',
    code: null,
    year: 2025,
    title: 'Short-term forecast of ground-level O₃ and NO₂',
    summary:
      'Ground monitoring stations are sparse across Indian cities, so most neighbourhoods have no air-quality signal at all.',
    domain: 'spacetech',
    organization: 'ISRO — Space Applications Centre (SAC)',
    theme: 'ISRO / Department of Space set',
    category: 'Software',
    difficulty: 'stretch',
    dataset: 'provided',
    datasetNote:
      'Flagged "Dataset" (provided) on SAC\'s official 2025 problem page — likely drawn from open satellite trace-gas products such as Sentinel-5P/TROPOMI and reanalysis archives (MERRA-2, ERA5). Confirm the exact bundled files on the portal.',
    background:
      'Ground-level ozone and NO₂ are key urban air-quality pollutants, but ground monitoring stations are sparse across Indian cities. Fusing satellite trace-gas retrievals with atmospheric reanalysis data can fill monitoring gaps for cities without dense sensor networks.',
    statement:
      'Produce a short-term forecast of gaseous air pollutants — ground-level O₃ and NO₂ — using satellite and reanalysis data.',
    expectedSolution:
      'A time-series or ML forecasting model — gradient boosting on lag features, or an LSTM — that fuses satellite trace-gas column data with reanalysis meteorology to predict next-day or next-few-hour ground-level O₃ and NO₂ at a location, surfaced through a dashboard or an alert.',
    whyItFits:
      "A contained regression and forecasting problem with a genuine public-health angle, using openly documented atmospheric datasets. A step up in modelling complexity from flood mapping, but nowhere near the same year's lunar-robotics or cryptography-heavy statements.",
    stack: ['Python', 'xarray', 'LightGBM', 'FastAPI', 'Next.js dashboard'],
    image: '/imagery/ps-space-2.png',
    sliceHours: 9,
  },
  {
    slug: 'identify-slow-learners',
    code: 'RK979',
    year: 2022,
    title: 'Identify slow learners for remedial teaching',
    summary:
      'Teachers spot students falling behind informally and late, so remedial support arrives after the gaps have compounded.',
    domain: 'edutech',
    organization: 'Department of School Education & Literacy, Ministry of Education',
    theme: 'Smart Education',
    category: 'Hardware',
    difficulty: 'approachable',
    dataset: 'self-sourced',
    datasetNote:
      'Not bundled on the 2022 portal. Teams typically simulate a gradebook — subject-wise scores across terms — or borrow UCI\'s "Student Performance" set as a stand-in for prototyping and demoing.',
    background:
      'Teachers in under-resourced schools struggle to systematically spot students falling behind early enough to intervene. Identification today is largely informal and subjective, which delays remedial support until problems compound.',
    statement:
      'Build a system to identify slow learners for remedial teaching, and support capacity-building for innovative teaching methods.',
    expectedSolution:
      'A tool that ingests periodic assessment scores, attendance and engagement signals, flags at-risk students early, and gives teachers a dashboard plus suggested remedial activities per identified gap — weak in fractions versus weak in reading comprehension.',
    whyItFits:
      'A tabular classification and clustering problem rather than a CV- or NLP-heavy one. Approachable with basic ML plus a web dashboard, and easy to demo convincingly even with synthetic data. Note the portal listed this under Hardware — functionally it is a software and data problem.',
    stack: ['Next.js', 'Server Actions', 'Postgres', 'scikit-learn', 'Vercel'],
    image: '/imagery/ps-edu-1.png',
    sliceHours: 5,
  },
  {
    slug: 'student-dropout-analysis',
    code: 'SIH1362',
    year: 2023,
    title: 'Student dropout analysis for school education',
    summary:
      'Dropout is handled case by case, after a student has already left — with no pattern view to target scholarships or intervention.',
    domain: 'edutech',
    organization: 'Government of Gujarat',
    theme: 'Smart Education',
    category: 'Software',
    difficulty: 'medium',
    dataset: 'public-substitute',
    datasetNote:
      "Not shipped by the 2023 portal. Teams commonly used India's public UDISE+ dropout statistics, supplemented with synthetic student-level records for any predictive-model demo.",
    background:
      "Gujarat's school system needed a systematic way to study dropout patterns — extended unexplained absence — so interventions and scholarships could be targeted by school, region, gender and age group rather than reacting case by case after a student has already left.",
    statement: 'Analyse student dropout for school education.',
    expectedSolution:
      'A platform where dropout-related data is registered and an analytics layer surfaces regional and demographic patterns — a district choropleth, for instance — feeding policy and scholarship targeting. Stronger submissions add a predictive layer that flags at-risk students before they actually drop out.',
    whyItFits:
      'A classic applied-analytics build — EDA, a simple predictive model, a dashboard — grounded in genuinely public government data (UDISE+), which raises the real-world credibility of the pitch without requiring exotic techniques.',
    stack: ['Next.js', 'Postgres', 'pandas', 'D3 choropleth', 'Vercel'],
    image: '/imagery/ps-edu-2.png',
    sliceHours: 6,
  },
] as const;
