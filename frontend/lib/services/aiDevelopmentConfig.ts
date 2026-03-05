// ============================================================
// aiDevelopmentConfig.ts — Data config for AI Development page
// (/services/ai-development/page.tsx)
// ============================================================

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

export const aiExpertiseCards = [
  { t: "Custom LLM Solutions", d: "We build private, secure large language models tailored to your business data." },
  { t: "Predictive Modeling", d: "Harness historical data to forecast trends and stay ahead of the market." },
  { t: "Process Automation", d: "Replace manual data entry and repetitive tasks with intelligent agents." },
  { t: "Computer Vision", d: "Extract meaningful information from digital images and videos automatically." },
];

export const aiStats = [
  { v: 45, l: "Custom Models" },
  { v: 120, l: "API Integrations" },
  { v: 6, l: "Years Research" },
  { v: 15, l: "AI Engineers" },
];
