import { db } from "../db/index.js";
import { departments, subjects } from "../db/schema/app.js";
import { eq } from "drizzle-orm";

// Department and subject data
const departmentSubjects = [
  {
    code: "CS",
    name: "Computer Science",
    description: "Department of Computer Science",
    subjects: [
      {
        code: "CS102",
        name: "Data Structures",
        description: "Arrays, Linked Lists, Stacks, Queues",
      },
      {
        code: "CS201",
        name: "Algorithms",
        description: "Sorting, Searching, Complexity",
      },
      {
        code: "CS202",
        name: "Database Management Systems",
        description: "SQL, Normalization",
      },
      {
        code: "CS301",
        name: "Operating Systems",
        description: "Processes, Threads, Memory",
      },
      {
        code: "CS302",
        name: "Computer Networks",
        description: "TCP/IP, Routing",
      },
      {
        code: "CS303",
        name: "Artificial Intelligence",
        description: "ML Basics, Search Algorithms",
      },
      {
        code: "CS304",
        name: "Web Development",
        description: "Frontend & Backend Basics",
      },
    ],
  },
  {
    code: "MATH",
    name: "Mathematics",
    description: "Department of Mathematics",
    subjects: [
      {
        code: "MATH102",
        name: "Linear Algebra",
        description: "Matrices, Vectors",
      },
      {
        code: "MATH201",
        name: "Probability & Statistics",
        description: "Distributions, Hypothesis Testing",
      },
      {
        code: "MATH202",
        name: "Discrete Mathematics",
        description: "Logic, Graph Theory",
      },
      {
        code: "MATH301",
        name: "Numerical Methods",
        description: "Approximation Techniques",
      },
      {
        code: "MATH302",
        name: "Differential Equations",
        description: "ODE & PDE",
      },
    ],
  },
  {
    code: "PHY",
    name: "Physics",
    description: "Department of Physics",
    subjects: [
      { code: "PHY101", name: "Mechanics", description: "Motion & Forces" },
      {
        code: "PHY102",
        name: "Electromagnetism",
        description: "Fields & Circuits",
      },
      { code: "PHY201", name: "Thermodynamics", description: "Heat & Energy" },
      {
        code: "PHY202",
        name: "Quantum Physics",
        description: "Wave Mechanics",
      },
    ],
  },
  {
    code: "CHEM",
    name: "Chemistry",
    description: "Department of Chemistry",
    subjects: [
      {
        code: "CHEM101",
        name: "Organic Chemistry",
        description: "Hydrocarbons",
      },
      {
        code: "CHEM102",
        name: "Inorganic Chemistry",
        description: "Periodic Trends",
      },
      {
        code: "CHEM201",
        name: "Physical Chemistry",
        description: "Thermodynamics",
      },
      {
        code: "CHEM202",
        name: "Analytical Chemistry",
        description: "Titration & Instrumentation",
      },
    ],
  },
  {
    code: "BIO",
    name: "Biology",
    description: "Department of Biology",
    subjects: [
      {
        code: "BIO101",
        name: "Cell Biology",
        description: "Cell Structure & Function",
      },
      { code: "BIO102", name: "Genetics", description: "DNA & Inheritance" },
      {
        code: "BIO201",
        name: "Microbiology",
        description: "Bacteria & Viruses",
      },
      { code: "BIO202", name: "Human Physiology", description: "Body Systems" },
    ],
  },
  {
    code: "ENG",
    name: "English",
    description: "Department of English",
    subjects: [
      {
        code: "ENG102",
        name: "Creative Writing",
        description: "Fiction & Poetry",
      },
      {
        code: "ENG201",
        name: "Modern Literature",
        description: "20th Century Works",
      },
      {
        code: "ENG202",
        name: "Technical Writing",
        description: "Reports & Documentation",
      },
      {
        code: "ENG203",
        name: "Communication Skills",
        description: "Public Speaking",
      },
    ],
  },
  {
    code: "ECO",
    name: "Economics",
    description: "Department of Economics",
    subjects: [
      {
        code: "ECO101",
        name: "Microeconomics",
        description: "Supply & Demand",
      },
      {
        code: "ECO102",
        name: "Macroeconomics",
        description: "GDP & Inflation",
      },
      {
        code: "ECO201",
        name: "International Economics",
        description: "Trade & Policy",
      },
    ],
  },
  {
    code: "BUS",
    name: "Business Administration",
    description: "Department of Business Administration",
    subjects: [
      {
        code: "BUS101",
        name: "Principles of Management",
        description: "Leadership Basics",
      },
      {
        code: "BUS102",
        name: "Marketing Management",
        description: "Branding & Strategy",
      },
      {
        code: "BUS201",
        name: "Financial Accounting",
        description: "Balance Sheets",
      },
      {
        code: "BUS202",
        name: "Entrepreneurship",
        description: "Startup Fundamentals",
      },
    ],
  },
  {
    code: "ENGG",
    name: "Engineering",
    description: "Department of Engineering",
    subjects: [
      {
        code: "ENGG101",
        name: "Engineering Mechanics",
        description: "Statics & Dynamics",
      },
      {
        code: "ENGG102",
        name: "Basic Electronics",
        description: "Circuits & Components",
      },
      {
        code: "ENGG201",
        name: "Thermodynamics for Engineers",
        description: "Engineering Thermodynamics",
      },
      {
        code: "ENGG202",
        name: "Control Systems",
        description: "Feedback & Stability",
      },
    ],
  },
  {
    code: "PSY",
    name: "Psychology",
    description: "Department of Psychology",
    subjects: [
      {
        code: "PSY101",
        name: "Introduction to Psychology",
        description: "Behavior & Mind",
      },
      {
        code: "PSY102",
        name: "Cognitive Psychology",
        description: "Memory & Thinking",
      },
      {
        code: "PSY201",
        name: "Social Psychology",
        description: "Group Behavior",
      },
    ],
  },
  {
    code: "GEO",
    name: "Geography",
    description: "Department of Geography",
    subjects: [
      {
        code: "GEO101",
        name: "Physical Geography",
        description: "Landforms & Climate",
      },
      {
        code: "GEO102",
        name: "Human Geography",
        description: "Population & Urbanization",
      },
      {
        code: "GEO201",
        name: "GIS Fundamentals",
        description: "Mapping & Spatial Data",
      },
    ],
  },
  {
    code: "POL",
    name: "Political Science",
    description: "Department of Political Science",
    subjects: [
      { code: "POL101", name: "Political Theory", description: "Ideologies" },
      {
        code: "POL102",
        name: "Indian Constitution",
        description: "Structure & Governance",
      },
      {
        code: "POL201",
        name: "International Relations",
        description: "Global Politics",
      },
    ],
  },
  {
    code: "ART",
    name: "Fine Arts",
    description: "Department of Fine Arts",
    subjects: [
      {
        code: "ART101",
        name: "Drawing & Sketching",
        description: "Basic Techniques",
      },
      {
        code: "ART102",
        name: "Art History",
        description: "Classical to Modern",
      },
      {
        code: "ART201",
        name: "Digital Art",
        description: "Graphic Design Basics",
      },
    ],
  },
  {
    code: "MUS",
    name: "Music",
    description: "Department of Music",
    subjects: [
      { code: "MUS101", name: "Music Theory", description: "Notes & Scales" },
      {
        code: "MUS102",
        name: "Instrumental Practice",
        description: "Piano/Guitar",
      },
      {
        code: "MUS201",
        name: "Music Production",
        description: "DAWs & Recording",
      },
    ],
  },
  {
    code: "LAW",
    name: "Law",
    description: "Department of Law",
    subjects: [
      {
        code: "LAW101",
        name: "Constitutional Law",
        description: "Fundamental Rights",
      },
      {
        code: "LAW102",
        name: "Contract Law",
        description: "Agreements & Obligations",
      },
      { code: "LAW201", name: "Criminal Law", description: "IPC Basics" },
    ],
  },
];

async function seed() {
  for (const dept of departmentSubjects) {
    // Upsert department
    let [departmentRow] = await db
      .select({ id: departments.id })
      .from(departments)
      .where(eq(departments.code, dept.code));

    if (!departmentRow) {
      [departmentRow] = await db
        .insert(departments)
        .values({
          code: dept.code,
          name: dept.name,
          description: dept.description,
        })
        .returning({ id: departments.id });
    }

    // Insert subjects for this department
    for (const subj of dept.subjects) {
      await db
        .insert(subjects)
        .values({
          code: subj.code,
          name: subj.name,
          description: subj.description || "No description provided.",
          departmentId: departmentRow.id,
        })
        .onConflictDoNothing(); // Avoid duplicate subjects
    }
  }

  console.log("All departments and subjects seeded!");
  process.exit(0);
}

seed();
