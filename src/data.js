export const EMAIL = 'ssempa3666@gmail.com'
export const GITHUB = 'https://github.com/harrison-maps'
export const LINKEDIN = 'https://www.linkedin.com/in/ssempala-undefined-a829813a7'
export const PHONE = '+256 750 937 488'
export const WHATSAPP = 'https://wa.me/256750937488'

const mail = (subject) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`

// Statuses stay conservative on purpose: only verified public repositories are linked.
export const projects = [
  {
    id: 'mamasave', number: '01', title: 'MamaSave', category: 'Health & agriculture', eyebrow: 'Maternal health · Risk prediction',
    description: 'A maternal health monitoring concept bringing physiological signals, risk prediction, and timely alerts together to support earlier attention for mothers and babies.',
    contribution: 'Model experimentation, API integration, and prototype development. The model is a prototype, not a clinically validated diagnostic tool.',
    stack: ['Python', 'XGBoost', 'FastAPI', 'Mobile app'], status: 'Prototype', href: mail('MamaSave project inquiry'), linkLabel: 'Ask about the project', publicRepo: false,
  },
  {
    id: 'jinja-fire', number: '02', title: 'Jinja Fire Detection', category: 'AI & data', eyebrow: 'IoT · Public safety',
    description: 'An IoT based smoke detection and notification concept designed to alert building occupants and fire responders in Jinja.',
    contribution: 'Project concept and implementation work around sensing, detection, and alerting. The repository documents the prototype direction and intended workflow.',
    stack: ['IoT', 'Sensors', 'HTML', 'JavaScript'], status: 'Public repository', href: `${GITHUB}/fire_project`, linkLabel: 'View repository', publicRepo: true,
  },
  {
    id: 'fire-ml', number: '03', title: 'Fire Incident Prediction', category: 'AI & data', eyebrow: 'Machine learning · Jinja',
    description: 'An exploratory data analysis and machine learning project investigating incident patterns and the factors associated with fire severity.',
    contribution: 'Data exploration, visualisation, feature preparation, and model experiments. The public README flags evaluation results for further verification, so no performance claim is made here.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost'], status: 'Public repository', href: `${GITHUB}/fire_incident_prediction`, linkLabel: 'View repository', publicRepo: true,
  },
  {
    id: 'simplybridge', number: '04', title: 'SimplyBridge', category: 'Web & tools', eyebrow: 'Web platform · Developer community',
    description: 'A platform concept helping developers in Uganda and across Africa showcase their skills, make projects discoverable, and connect with clients and collaborators.',
    contribution: 'Backend API and product planning, with a focus on developer profiles, authentication, and discovery.',
    stack: ['FastAPI', 'SQLAlchemy', 'SQLite', 'JWT'], status: 'In development', href: mail('SimplyBridge collaboration'), linkLabel: 'Discuss collaboration', publicRepo: false,
  },
  {
    id: 'livestock', number: '05', title: 'Livestock Health Risk Predictor', category: 'Health & agriculture', eyebrow: 'AgriTech · Machine learning',
    description: 'A machine learning project direction for helping farmers identify potential livestock health risks, developed in the context of the AYuTe Africa Challenge Uganda.',
    contribution: 'Problem framing and model focused prototype work. Predictions should be treated as decision support, not veterinary diagnosis.',
    stack: ['Python', 'Machine learning', 'Agriculture'], status: 'Challenge project', href: mail('Livestock Health Risk Predictor inquiry'), linkLabel: 'Ask about the project', publicRepo: false,
  },
  {
    id: 'aibos', number: '06', title: 'AIBOS Todo', category: 'Web & tools', eyebrow: 'Full stack · Productivity',
    description: 'A lightweight task manager that connects a Streamlit interface with a FastAPI backend, exploring practical CRUD workflows and persistence.',
    contribution: 'API routes, task operations, and application structure. The public repository includes setup instructions and the implementation.',
    stack: ['Python', 'FastAPI', 'Streamlit', 'SQLite'], status: 'Public repository', href: `${GITHUB}/aibos_todo_app`, linkLabel: 'View repository', publicRepo: true,
  },
]

export const filters = ['All projects', 'Health & agriculture', 'AI & data', 'Web & tools']

export const capabilities = [
  { title: 'Software development', text: 'Building APIs, interfaces, and small end to end applications with an emphasis on clarity and usefulness.' },
  { title: 'Machine learning & data', text: 'Exploring datasets, preparing features, testing models, and communicating what results can and cannot say.' },
  { title: 'Prototyping products', text: 'Connecting web or mobile interfaces to backend services to turn an idea into something people can try.' },
  { title: 'Learning in public', text: 'Improving fundamentals through project work, documentation, collaboration, and honest iteration.' },
]

export const chapters = [
  { title: 'See the problem', text: 'The data that matters is rarely where the software is. It sits in a clinic, a farm, or a building that needs a fire alert.' },
  { title: 'Gather the signal', text: 'Sensors, public records, and datasets become something a model can read, after careful cleaning and feature work.' },
  { title: 'Predict, honestly', text: 'Scikit-learn, XGBoost and TensorFlow turn inputs into a risk estimate. Every result is labelled as a prototype until it is validated.' },
  { title: 'Put it in a hand', text: 'A FastAPI backend and a web or mobile interface deliver the answer to the person who needs it.' },
]

export const journey = [
  { label: 'Education', title: 'Makerere University', text: 'Third year Computer Science at the College of Computing and Information Sciences, strengthening fundamentals in programming, software, and computing.' },
  { label: 'Experience', title: 'Judiciary of Uganda', text: 'Completed an internship at the Judiciary of Uganda, and built InternTrack, an ICT internship management system.' },
  { label: 'Project work', title: 'From ideas to prototypes', text: 'Exploring maternal health, fire safety, agriculture, data analysis, and community platforms.' },
  { label: 'Community', title: 'BoldHer Foundation Uganda', text: 'Co-founder of a nonprofit focused on girls and youth empowerment, with a belief in technology that widens access to opportunity.' },
]
