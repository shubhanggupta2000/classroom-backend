import { db } from "../db/index.js";
import { departments, subjects } from "../db/schema/app.js";
import { user } from "../db/schema/auth.js";

async function seed() {
  // Departments
  const [cs, math, eng] = await Promise.all([
    db
      .insert(departments)
      .values({ code: "CS", name: "Computer Science", description: "CS Dept" })
      .returning(),
    db
      .insert(departments)
      .values({ code: "MATH", name: "Mathematics", description: "Math Dept" })
      .returning(),
    db
      .insert(departments)
      .values({ code: "ENG", name: "English", description: "English Dept" })
      .returning(),
  ]).then((res) => res.map((r) => r[0]));

  // Subjects
  await db.insert(subjects).values([
    {
      code: "CS101",
      name: "Intro to Computer Science",
      description: "Basics of CS",
      departmentId: cs.id,
    },
    {
      code: "MATH101",
      name: "Calculus I",
      description: "Differential calculus",
      departmentId: math.id,
    },
    {
      code: "ENG101",
      name: "English Literature",
      description: "Intro to English Lit",
      departmentId: eng.id,
    },
  ]);

  // Users (teachers)
  await db.insert(user).values([
    {
      id: "t1",
      name: "Ada Lovelace",
      email: "ada@school.com",
      emailVerified: true,
      role: "teacher",
    },
    {
      id: "t2",
      name: "Alan Turing",
      email: "alan@school.com",
      emailVerified: true,
      role: "teacher",
    },
    {
      id: "t3",
      name: "Grace Hopper",
      email: "grace@school.com",
      emailVerified: true,
      role: "teacher",
    },
  ]);

  console.log("Seeded departments, subjects, and teachers.");
  process.exit(0);
}

seed();
