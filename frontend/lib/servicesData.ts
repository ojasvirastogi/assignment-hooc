// ============================================================
// servicesData.ts — Centralized data config for all Services
// Import what you need in each service page instead of defining
// data inline.
// ============================================================

// -----------------------------------------------------------
// 1. AI Development (/services/ai-development/page.tsx)
// -----------------------------------------------------------
export const aiCaseStudies = [
  {
    title: "MediBot AI",
    tag: "HEALTHCARE",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    desc: "A HIPAA-compliant conversational AI designed to streamline patient intake and symptom checking.",
  },
  {
    title: "FinPredict",
    tag: "FINTECH",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    desc: "Machine learning models achieving 94% accuracy in forecasting market trends for retail investors.",
  },
  {
    title: "EduGenie",
    tag: "EDTECH",
    image: "https://images.unsplash.com/photo-1581291518655-9523bb99d9f6?auto=format&fit=crop&q=80&w=1000",
    desc: "Personalized learning paths generated dynamically using RAG-based Large Language Models.",
  },
  {
    title: "SupplyChain AI",
    tag: "LOGISTICS",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
    desc: "Autonomous inventory management system reducing waste by 30% through demand forecasting.",
  },
];

export const aiTools = [
  { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Google Gemini", img: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304fb62aa258b39.svg" },
  { name: "Claude", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Claude_AI_logo.svg" },
  { name: "Mistral", img: "https://mistral.ai/images/logo_bird.png" },
  { name: "Anthropic", img: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Anthropic_logo.svg" },
  { name: "LangChain", img: "https://cdn.worldvectorlogo.com/logos/langchain.svg" },
  { name: "PyTorch", img: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo.svg" },
  { name: "TensorFlow", img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
];

export const aiSteps = [
  { id: "1", t: "Data Strategy & Discovery", d: "We identify the high-impact AI opportunities within your existing data ecosystem." },
  { id: "2", t: "Model Selection & Architecture", d: "Choosing between fine-tuning LLMs or building custom neural networks for your needs." },
  { id: "3", t: "Integration & API Development", d: "Seamlessly connecting AI power into your web, mobile, or enterprise applications." },
  { id: "4", t: "Testing & Hyperparameter Tuning", d: "Rigorous evaluation to ensure model accuracy, safety, and low latency." },
  { id: "5", t: "Deployment & MLOps", d: "Scalable production release with real-time monitoring and continuous learning loops." },
];

// ============================================================
// SHARED CASE STUDIES 
// Note: Web, UI/UX, Mobile, Marketing, SaaS, and SEO currently
// share the same case studies. You can use this shared array.
// ============================================================
export const sharedCaseStudies = [
  { 
    title: "Waitlisty", 
    category: "Waitlist Landing Page", // Some pages have category, some don't. Kept for compatibility.
    tag: "HEALTHCARE", 
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    desc: "The ideal template for crafting a sleek and efficient waitlist landing page."
  },
  { 
    title: "Clever", 
    category: "Saas Landing Page", 
    tag: "REAL ESTATE", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    desc: "Clever is a modern SaaS landing page template designed to showcase software features effortlessly."
  },
  { 
    title: "Genius", 
    category: "Saas Landing Page", 
    tag: "EDTECH", 
    image: "https://images.unsplash.com/photo-1581291518655-9523bb99d9f6?auto=format&fit=crop&q=80&w=1000",
    desc: "Genius is a minimal SaaS landing page template, designed to be modern and simple."
  },
  { 
    title: "TrendyShop", 
    category: "Online fashion retailer", 
    tag: "E-COMMERCE", 
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
    desc: "A high-performance e-commerce experience built for modern fashion brands."
  },
];


// -----------------------------------------------------------
// 2. Web Development (/services/web-development/page.tsx)
// -----------------------------------------------------------
export const webDesignTools = [
  { name: "Figma", img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Sketch", img: "https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg" },
  { name: "Miro", img: "https://cdn.worldvectorlogo.com/logos/miro-2.svg" },
  { name: "Zeplin", img: "https://cdn.worldvectorlogo.com/logos/zeplin-1.svg" },
  { name: "Photoshop", img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { name: "Illustrator", img: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
  { name: "After Effects", img: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" },
  { name: "ProtoPie", img: "https://cdn.worldvectorlogo.com/logos/protopie.svg" },
];

export const webSteps = [
  { id: "1", t: "Requirement Analysis", d: "We dive deep into your technical requirements, selecting the best technology stack to meet your specific project goals and budget." },
  { id: "2", t: "Architecture & Planning", d: "Setting up the database schema and API structures. We map out the technical blueprint to ensure long-term stability and ease of updates." },
  { id: "3", t: "Development & Coding", d: "Our developers bring designs to life, writing clean, modular code for both the frontend and backend with regular sprint updates." },
  { id: "4", t: "Quality Assurance", d: "Rigorous testing for bugs, performance bottlenecks, and security vulnerabilities to ensure a flawless launch. Continuous improvement ensures success." },
  { id: "5", t: "Deployment & Maintenance", d: "Launching your site to a live server and providing ongoing updates and security patches to keep it running smoothly." },
];

export const sharedWayOfWorking = [
  { t: "User-Centric Design", d: "We put your users first, creating intuitive interfaces that engage and delight. Designs are tailored to solve real user problems." },
  { t: "Business-Focused Outcomes", d: "Every design decision is aligned with your business goals, boosting conversions and revenue." },
  { t: "Cross-Platform Consistency", d: "Your users enjoy a seamless experience across web, mobile, and desktop. Consistent design builds trust." },
  { t: "Data-Driven Optimization", d: "We refine and optimize designs using analytics and user feedback, ensuring maximum performance." },
];


// -----------------------------------------------------------
// 3. UI/UX Design (/services/ui-ux-design/page.tsx)
// -----------------------------------------------------------
export const uiUxDesignTools = webDesignTools; // Exact same tools array as web

export const uiUxSteps = [
  { id: "1", t: "Discovery & Research", d: "We study your users and business goals to uncover key challenges." },
  { id: "2", t: "Wire framing & Prototyping", d: "Early flows and interactive prototypes visualize the solution." },
  { id: "3", t: "Visual & Interaction Design", d: "Crafting interfaces that are intuitive, attractive, and brand-aligned." },
  { id: "4", t: "Testing & Optimization", d: "Designs are validated with real users and feedback is implemented." },
  { id: "5", t: "Delivery & Support", d: "Smooth handoff and guidance for seamless implementation." },
];


// -----------------------------------------------------------
// 4. Mobile App Development (/services/mobile-app-development/page.tsx)
// -----------------------------------------------------------
export const mobileTechStack = [
  { name: "React", img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Android Studio", img: "https://upload.wikimedia.org/wikipedia/commons/9/95/Android_Studio_Icon_3.6.svg" },
  { name: "Expo", img: "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg" },
  { name: "Flutter", img: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" },
  { name: "Figma", img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Swift", img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg" },
  { name: "PostgreSQL", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_classic.svg" },
  { name: "MongoDB", img: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
];

export const mobileSteps = [
  { id: "1", t: "Concept & Strategy", d: "Defining the app's core purpose and choosing the right platform (iOS, Android, or both) based on your target demographic." },
  { id: "2", t: "App Architecture", d: "Designing the backend infrastructure and API integrations that will power your mobile application's data and features." },
  { id: "3", t: "Frontend Development", d: "Building the interactive user interface using modern mobile frameworks, ensuring smooth animations and high responsiveness." },
  { id: "4", t: "Rigorous Testing", d: "Testing across a wide range of real devices and screen sizes to ensure stability, performance, and battery efficiency." },
  { id: "5", t: "Launch & Evolution", d: "Managing the submission process to the stores and providing post-launch monitoring to release updates and new features." },
];


// -----------------------------------------------------------
// 5. Digital Marketing (/services/digital-marketing/page.tsx)
// -----------------------------------------------------------
export const marketingTools = webDesignTools; // Same tool images as web design

export const marketingSteps = [
  { id: "1", t: "Audit & Analysis", d: "Analyzing your current online presence and studying competitor strategies to identify growth opportunities." },
  { id: "2", t: "Strategy Development", d: "Creating a tailored roadmap that aligns your marketing budget with your specific business goals and KPIs." },
  { id: "3", t: "Campaign Execution", d: "Launching highly targeted campaigns across SEO, Social Media, and Email channels with creative excellence." },
  { id: "4", t: "Monitoring & Analytics", d: "Tracking performance in real-time using tools like Google Analytics and Heatmaps to see what resonates with users." },
  { id: "5", t: "Optimization & Scaling", d: "Refining campaigns based on data to lower acquisition costs and scaling the winning strategies for maximum ROI." },
];


// -----------------------------------------------------------
// 6. SaaS Development (/services/saas-development/page.tsx)
// -----------------------------------------------------------
export const saasTools = [
  { name: "React", img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Node.js", img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
  { name: "Express", img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
  { name: "MongoDB", img: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
  { name: "JavaScript", img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.svg" },
  { name: "TypeScript", img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
  { name: "PostgreSQL", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_classic.svg" },
  { name: "Firebase", img: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" },
];

export const saasSteps = [
  { id: "1", t: "SaaS Strategy & MVP", d: "Defining core features for your Minimum Viable Product (MVP) to get you to market faster while validating your business model." },
  { id: "2", t: "Cloud Architecture Design", d: "Setting up the database isolation strategies and serverless or containerized environments (Docker/Kubernetes) for maximum uptime." },
  { id: "3", t: "Development & Integration", d: "Building the core logic and integrating third-party tools for CRM, analytics, and marketing automation to enhance the product." },
  { id: "4", t: "Security & Load Testing", d: "Simulating high-traffic scenarios and conducting penetration tests to ensure the platform remains stable under heavy use." },
  { id: "5", t: "Launch & DevOps", d: "Deploying with CI/CD pipelines for continuous updates and providing 24/7 monitoring to ensure 99.9% service availability." },
];


// -----------------------------------------------------------
// 7. SEO (/services/seo/page.tsx)
// -----------------------------------------------------------
export const seoTools = saasTools; // Same tools used in SEO page

export const seoSteps = [
  { id: "1", t: "Keyword Research & Discovery", d: "Identifying high-volume, low-competition keywords that are most likely to drive qualified leads to your business." },
  { id: "2", t: "Technical Fixes & Speed", d: "Resolving backend issues like 404 errors, slow loading times, and mobile responsiveness to improve user experience." },
  { id: "3", t: "Content Strategy & Creation", d: "Developing a content calendar focused on solving user problems and answering the questions your audience is asking." },
  { id: "4", t: "Link Acquisition", d: "Earning mentions and links from reputable websites in your industry to signal trust and authority to Google." },
  { id: "5", t: "Reporting & Refinement", d: "Providing monthly reports on rankings, traffic, and conversions, and adjusting the strategy based on data insights." },
];
