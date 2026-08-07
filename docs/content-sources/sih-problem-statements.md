# SIH Problem Statement Research — Healthcare, AI/ML, Cybersecurity, Spacetech, Edutech

Compiled for: third-year students attending SIH for the first time. Selection filter applied to every candidate: **real-world problem, medium difficulty (not a trivial CRUD app, not a research-lab-grade challenge), and buildable as a working prototype in a hackathon window.**

## Scope & method

- Reviewed the official theme-wise problem-statement sets for **SIH 2022, 2023, and 2025** (2024 excluded from selection per your brief, though it exists in the same portal history).
- Primary sources: `sih.gov.in` portal exports/mirrors, ISRO/SAC's own SIH pages (`vedas.sac.gov.in`, `sac.gov.in`) for the Space Technology set, and nodal-institute PDFs that republish the official theme-wise tables.
- The live `sih.gov.in` detail pages block automated fetching and are typically taken offline once an edition's cycle ends, so **"Expected Solution" and some background context below are reconstructed from the official title/theme/organization plus corroborating public team submissions** (GitHub repos, slide decks) for that exact PS code — not copy-pasted portal text. Treat the "Expected Solution" fields as informed guidance, not a verbatim SIH quote.
- **Verify PS numbers, exact wording, and dataset links directly on the current portal before locking a team's choice** — SIH re-numbers and occasionally re-opens/edits statements between the announcement and submission windows.
- SIH has no official "AI/ML" theme — it's a cross-cutting technique, not a portal category. The two AI/ML picks below are chosen for their AI/ML-centric *technical core*, from whichever official theme they were actually filed under.

## Quick-reference index

| Domain | Year | PS Code | Title | Official Theme | Dataset on portal? |
|---|---|---|---|---|---|
| Healthcare | 2023 | SIH1343 | Medicinal plant/raw-material ID via image processing + ML | MedTech/BioTech/HealthTech | No — source public leaf datasets |
| Healthcare | 2025 | SIH25092 | Digital mental health & psychological support system for HE students | MedTech/BioTech/HealthTech | No — build synthetic/open corpora |
| AI/ML | 2023 | SIH1401 | App-based crop/plant disease identification | Agriculture, FoodTech & Rural Dev. | No — PlantVillage is the de facto set |
| AI/ML | 2025 | SIH25035 | Sentiment analysis of E-consultation comments | Miscellaneous | Likely yes (verify on portal) |
| Cybersecurity | 2022 | LC1076 | Server-side spoofed-email detection | Blockchain & Cybersecurity | No — source spam/phishing corpora |
| Cybersecurity | 2023 | SIH1454 | AI/ML detection of look-alike phishing domains | Blockchain & Cybersecurity | No — PhishTank/OpenPhish/UCI set |
| Spacetech | 2022 | SS597 | Flood inundation probability mapping | ISRO/Dept. of Space set | **Yes** — flagged "Download" |
| Spacetech | 2025 | *(unconfirmed — see entry)* | Short-term forecast of ground-level O3/NO2 using satellite + reanalysis data | ISRO/Dept. of Space set | **Yes** — flagged "Dataset" |
| Edutech | 2022 | RK979 | Identify slow learners for remedial teaching | Smart Education | No — simulate a gradebook |
| Edutech | 2023 | SIH1362 | Student dropout analysis for school education | Smart Education | No — UDISE+ public stats as proxy |

---

## 1. Healthcare (MedTech / BioTech / HealthTech)

### 1.1 — Medicinal Plant / Raw-Material Identification (2023, SIH1343)

| Field | Detail |
|---|---|
| Organization | Ministry of AYUSH |
| Theme | MedTech / BioTech / HealthTech |
| Category | Software |
| PS Number | SIH1343 |

**Full problem description.** AYUSH (Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homoeopathy) systems depend on correctly identifying raw herbal material and medicinal plants. Manual identification by practitioners is slow, subjective, and vulnerable to error where species look alike or where adulteration has occurred in the herbal supply chain — a genuine quality-control gap for AYUSH manufacturers and practitioners.

**Problem statement.** Build a system that identifies different medicinal plants and raw herbal materials from images, using image processing and machine learning.

**Expected solution.** A mobile or web app where a user photographs a leaf/raw material sample; a trained image classifier (transfer learning on a CNN backbone such as MobileNet/EfficientNet is more than sufficient) returns the species name, its Ayurvedic/AYUSH reference name, common uses, and — as a stretch goal — an adulteration/look-alike warning.

**Dataset.** Not bundled on the portal. Teams source their own: public "Indian Medicinal Leaf" image sets on Kaggle/Mendeley are the standard substitute, sometimes combined with AYUSH's own published reference photographs.

**Why it fits third-year, first-SIH teams.** A bounded supervised image-classification task with abundant tutorials and pretrained models — a working baseline is achievable inside a hackathon, and it's not a diagnostic/life-critical tool, which keeps the ethical and liability surface small.

---

### 1.2 — Digital Mental Health & Psychological Support System for Students (2025, SIH25092)

| Field | Detail |
|---|---|
| Organization | Government of Jammu & Kashmir |
| Theme | MedTech / BioTech / HealthTech |
| Category | Software |
| PS Number | SIH25092 |

**Full problem description.** Higher-education institutions are seeing rising stress, anxiety, and low mood among students, but most campuses lack an early-detection mechanism, and stigma discourages students from seeking help through conventional channels. There is no widely available, private, adaptive support platform built specifically for the student population.

**Problem statement.** Develop a digital mental health and psychological support system for students in higher education.

**Expected solution.** A web/mobile platform combining validated self-assessment questionnaires, mood/journal tracking, a curated resource library (guided relaxation, helpline directory), and a confidential escalation path to a counsellor. Stronger submissions add a lightweight sentiment-trend model over journal entries to flag deteriorating patterns — but the system should be framed as a **support and triage tool, not a diagnostic one**, with a clear "talk to a professional" pathway built in.

**Dataset.** Not supplied on the portal. Teams typically prototype with public validated screening-instrument question banks (PHQ-9, GAD-7 style item sets) and open mental-health FAQ/chat corpora; use synthetic data for any demo involving personal entries — real student data shouldn't be collected for a hackathon prototype.

**Why it fits third-year, first-SIH teams.** Directly relatable subject matter, no exotic infrastructure (plain web/mobile stack), and most of the build effort is UX and content design rather than deep ML — a good "medium" calibration that still reads as a real institutional need.

---

## 2. AI/ML

### 2.1 — App-Based Crop/Plant Disease Identification (2023, SIH1401)

| Field | Detail |
|---|---|
| Organization | Ministry of Micro, Small and Medium Enterprises (MSME) |
| Theme | Agriculture, FoodTech & Rural Development |
| Category | Software |
| PS Number | SIH1401 |

**Full problem description.** Smallholder farmers often have no fast, affordable way to diagnose crop disease in the field. Delayed or wrong diagnosis leads to yield loss and, frequently, pesticide misuse from guessing at treatment.

**Problem statement.** Build an app-based solution to identify and help solve disease in plants/crops.

**Expected solution.** A mobile app where a farmer photographs an affected leaf; a CNN classifies the disease and returns plain-language treatment/agronomy guidance. Bonus points for working offline or on low bandwidth, since target users are rural.

**Dataset.** No proprietary set from the portal — the **PlantVillage dataset** (54,000+ labelled leaf images across 38 disease classes) is the dataset almost every team uses for this exact class of SIH problem, and it's well documented with existing baselines.

**Why it fits third-year, first-SIH teams.** One of the best-trodden CV classification tasks in the whole SIH problem set — enough public reference material to get a real baseline running fast, while still being a genuinely used class of tool in Indian agritech.

---

### 2.2 — Sentiment Analysis of E-Consultation Comments (2025, SIH25035)

| Field | Detail |
|---|---|
| Organization | Ministry of Corporate Affairs |
| Theme | Miscellaneous |
| Category | Software |
| PS Number | SIH25035 |

**Full problem description.** MCA's e-consultation module invites public comments on draft policy and legislative changes. Officials currently have to read through a large, growing volume of free-text comments manually to gauge public sentiment and surface substantive points — slow and inconsistent at scale.

**Problem statement.** Build a system for sentiment analysis of comments received through the e-consultation module.

**Expected solution.** An NLP pipeline that ingests the comment corpus, classifies sentiment (positive/negative/neutral, and ideally stance on specific clauses), clusters recurring themes/topics, and renders a dashboard for policy officers to triage by sentiment and volume.

**Dataset.** MCA-style "sentiment analysis" problem statements have historically shipped a sample comment corpus through the SIH portal for registered teams — **confirm the exact dataset link on the live 2025 portal**, since this wasn't independently verifiable outside the login-gated portal at research time. If unavailable, public multilingual sentiment/text-classification corpora are a reasonable substitute for prototyping.

**Why it fits third-year, first-SIH teams.** A standard text-classification-plus-topic-modelling task buildable with off-the-shelf libraries (scikit-learn or a small HuggingFace model) in the hackathon window — no specialised domain knowledge required beyond basic NLP.

---

## 3. Cybersecurity (Blockchain & Cybersecurity)

### 3.1 — Server-Side Spoofed-Email Detection (2022, LC1076)

| Field | Detail |
|---|---|
| Organization | Ministry of External Affairs (MEA) |
| Theme | Blockchain & Cybersecurity |
| Category | Software |
| PS Number | LC1076 |

**Full problem description.** A spoofed email — sender address and sometimes IP swapped to impersonate a trusted party — can land directly in a victim's inbox when the receiving server doesn't verify sender authenticity. MEA, which handles sensitive official correspondence, wanted filtering enforced server-side rather than relying on end-user vigilance.

**Problem statement.** Suggest a mechanism to filter spoofed email at the server, before it reaches the inbox.

**Expected solution.** A server-side mail filter that implements/extends **SPF, DKIM, and DMARC** verification, layered with header-anomaly heuristics (Return-Path vs. From mismatch, sender-IP reputation, domain age) to flag or quarantine spoofed mail pre-delivery.

**Dataset.** Not provided on the portal. Teams built their own spoofed-vs-legitimate header sample sets, commonly drawing on public spam/phishing email corpora (e.g., Enron, SpamAssassin) plus synthetically spoofed headers for the "attack" class.

**Why it fits third-year, first-SIH teams.** Tightly bounded scope (protocol-level header analysis, not large-scale ML), buildable with a small mail-relay/sandbox setup, and grounded in standard undergraduate networking/security concepts (SPF/DKIM/DMARC) — a strong first cybersecurity pick precisely because it doesn't require prior red-team experience.

---

### 3.2 — AI/ML Detection of Look-Alike Phishing Domains (2023, SIH1454)

| Field | Detail |
|---|---|
| Organization | National Technical Research Organisation (NTRO) |
| Theme | Blockchain & Cybersecurity |
| Category | Software |
| PS Number | SIH1454 |

**Full problem description.** Attackers register look-alike domains — typosquats, homoglyphs, subtly altered brand names — that mimic a genuine site's look and feel to harvest credentials. Manual blacklisting can't keep pace with the volume of newly registered malicious domains.

**Problem statement.** Create an intelligent system using AI/ML to detect phishing domains that imitate the look and feel of genuine domains.

**Expected solution.** A classifier combining lexical URL features (edit-distance to known brand domains, string length, special-character ratio), WHOIS/domain-age signals, and — for stronger submissions — a visual-similarity check (screenshot comparison or perceptual hashing) against a reference set of genuine sites, exposed through an API or a simple browser-extension-style demo.

**Dataset.** No dataset bundled with the PS. **PhishTank, OpenPhish, and the UCI "Phishing Websites" dataset** are the standard public substitutes — confirmed as the datasets multiple public teams actually used for this exact SIH1454 statement.

**Why it fits third-year, first-SIH teams.** A popular AI+security crossover with plenty of public notebooks/baselines to start from (Random Forest or XGBoost on lexical features gets you a working demo fast), then room to add polish — good difficulty calibration for a first attempt.

---

## 4. Spacetech (ISRO / Department of Space problem set)

### 4.1 — Flood Inundation Probability Mapping (2022, SS597)

| Field | Detail |
|---|---|
| Organization | ISRO — Space Applications Centre (SAC) / NRSC |
| Theme | ISRO/Dept. of Space set |
| Category | Software |
| PS Number | SS597 |

**Full problem description.** India experiences recurring monsoon flooding, and NRSC/ISRO has mapped flood *extent* from satellite imagery for two decades. What this PS asked for was different: turning historical multi-date imagery into a **probability** surface — how likely a given area is to flood — rather than a single-event snapshot.

**Problem statement.** Develop an image-processing-based approach to estimate flood inundation probability.

**Expected solution.** A pipeline that ingests multi-temporal satellite imagery (optical or SAR) plus a Digital Elevation Model (DEM), extracts historical flood-extent layers, and computes a per-grid-cell flood probability — either a simple frequency-based approach or an ML classifier using elevation, slope, and distance-to-drainage as features — rendered as a map layer.

**Dataset.** Explicitly flagged **"Download"** (i.e., provided) on ISRO/SAC's own SIH problem page — one of the few SIH datasets confirmed as directly supplied. Publicly, ISRO's Bhoonidhi/NRSC flood archives and open DEM sources (Copernicus DEM, SRTM) are the standard supplementary material for this class of problem.

**Why it fits third-year, first-SIH teams.** A geospatial data-science task with a clearly interpretable output (a map), doable with Python (rasterio/geopandas) plus a lightweight model — no satellite-operations background required, and it's a realistic first ISRO problem statement rather than one of the mission-hardware-grade challenges in the same set.

---

### 4.2 — Short-Term Forecast of Ground-Level O3/NO2 Using Satellite + Reanalysis Data (2025, PS number unconfirmed)

| Field | Detail |
|---|---|
| Organization | ISRO — Space Applications Centre (SAC) |
| Theme | ISRO/Dept. of Space set |
| Category | Software |
| PS Number | Listed on SAC's official SIH 2025 page; exact SIH25xxx code not independently confirmed here — verify on `sac.gov.in/sih2025` or `sih.gov.in` before finalising |

**Full problem description.** Ground-level ozone and NO2 are key urban air-quality pollutants, but ground monitoring stations are sparse across Indian cities. Fusing satellite trace-gas retrievals with atmospheric reanalysis data can fill monitoring gaps for cities without dense sensor networks.

**Problem statement.** Produce a short-term forecast of gaseous air pollutants (ground-level O3 and NO2) using satellite and reanalysis data.

**Expected solution.** A time-series/ML forecasting model (gradient boosting on lag features, or an LSTM) that fuses satellite trace-gas column data with reanalysis meteorology to predict next-day (or next-few-hour) ground-level O3/NO2 at a given location, surfaced through a simple dashboard or alert.

**Dataset.** Explicitly flagged **"Dataset"** (provided) on ISRO/SAC's official SIH 2025 problem page — likely drawn from open satellite trace-gas products (e.g., Sentinel-5P/TROPOMI) and reanalysis archives (MERRA-2/ERA5); confirm the exact bundled files on the portal.

**Why it fits third-year, first-SIH teams.** A contained regression/forecasting problem with a genuine public-health angle, using openly documented atmospheric datasets — a step up from PS 4.1 in modelling complexity but nowhere near the difficulty of the same year's lunar-robotics or cryptography-heavy ISRO statements, making it a good "second" space-tech pick.

---

## 5. Edutech (Smart Education)

### 5.1 — Identify Slow Learners for Remedial Teaching (2022, RK979)

| Field | Detail |
|---|---|
| Organization | Department of School Education & Literacy, Ministry of Education |
| Theme | Smart Education |
| Category | Hardware (per 2022 portal listing — functionally a software/data problem; note the mismatch) |
| PS Number | RK979 |

**Full problem description.** Teachers in under-resourced schools struggle to systematically spot students falling behind early enough to intervene. Identification today is largely informal and subjective, which delays remedial support until problems compound.

**Problem statement.** Build a system to identify slow learners for remedial teaching, and support capacity-building for innovative teaching methods.

**Expected solution.** A tool that ingests periodic assessment scores, attendance, and engagement signals, flags at-risk students early, and gives teachers a simple dashboard plus suggested remedial activities per identified gap (e.g., weak in fractions vs. weak in reading comprehension).

**Dataset.** Not bundled on the 2022 portal. Teams typically simulate a gradebook (subject-wise scores across terms) or borrow a public open dataset such as UCI's "Student Performance" set as a stand-in for prototyping and demoing.

**Why it fits third-year, first-SIH teams.** A tabular classification/clustering problem rather than a CV/NLP-heavy one — approachable with basic ML plus a web dashboard, and easy to demo convincingly even with synthetic data.

---

### 5.2 — Student Dropout Analysis for School Education (2023, SIH1362)

| Field | Detail |
|---|---|
| Organization | Government of Gujarat |
| Theme | Smart Education |
| Category | Software |
| PS Number | SIH1362 |

**Full problem description.** Gujarat's school system needed a systematic way to study dropout patterns (extended unexplained absence) so interventions and scholarships could be targeted by school, region, gender, and age group rather than reacting case by case after a student has already left.

**Problem statement.** Analyse student dropout for school education.

**Expected solution.** A platform where dropout-related data is registered and an analytics layer surfaces regional/demographic dropout patterns (e.g., a choropleth map by district), feeding policy and scholarship targeting. Stronger submissions add a predictive layer that flags at-risk students before they actually drop out.

**Dataset.** Not shipped by the 2023 portal. Teams commonly used India's public **UDISE+ (Unified District Information System for Education)** dropout statistics, supplemented with synthetic student-level records for any predictive-model demo.

**Why it fits third-year, first-SIH teams.** A classic applied-analytics build (EDA + a simple predictive model + a dashboard) grounded in genuinely public government data (UDISE+), which raises the "real-world" credibility of the pitch without requiring exotic techniques — a solid, less ML-heavy complement to PS 5.1.

---

## Sources consulted

- `sih.gov.in` (official portal — theme filters, 2022/2023/2025 problem tables; direct automated fetch blocked, worked around via cached/republished mirrors)
- `vedas.sac.gov.in/en/sih2022.html`, `/sih2023.html` — ISRO/SAC's own SIH problem pages with dataset-availability flags
- `sac.gov.in/sih2025` and `sac.gov.in/files/sih/*` — ISRO/SAC 2025 problem list and per-statement dataset notes
- `tcetmumbai.in/SIH/2023/Software Problem Statements.pdf` — full 2023 software theme-wise table
- Nodal-institute PDF mirrors (DRIEMS, JECRC, St. Mother Theresa Engineering College, etc.) republishing official 2022/2023/2025 tables
- Public team submissions/repos (GitHub, SlideShare, Prezi) for specific PS codes, used only to corroborate expected-solution shape — not treated as official portal text

**Caveat:** SIH problem-statement detail pages are only reliably accessible while that edition's portal is open, and older editions get taken down afterward. Re-verify PS numbers, themes, and dataset links on the live portal before a team commits to one of these.
