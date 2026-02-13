import express from "express";
import { departments } from "../db/schema/app.js";
import { db } from "../db/index.js";
import { getTableColumns, desc, sql, eq } from "drizzle-orm";

const router = express.Router();

// Get all departments with optional search and pagination
router.get("/", async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    const currentPage = Math.max(1, parseInt(String(page), 10) || 1);
    const limitPerPage = Math.min(
      Math.max(1, parseInt(String(limit), 10) || 10),
      100,
    );
    const offset = (currentPage - 1) * limitPerPage;

    let whereClause = undefined;
    if (search) {
      whereClause = sql`${departments.name} ILIKE '%' || ${search} || '%'`;
    }

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(departments)
      .where(whereClause);

    const totalCount = countResult[0]?.count ?? 0;

    const departmentsList = await db
      .select(getTableColumns(departments))
      .from(departments)
      .where(whereClause)
      .orderBy(desc(departments.createdAt))
      .limit(limitPerPage)
      .offset(offset);

    res.status(200).json({
      data: departmentsList,
      pagination: {
        page: currentPage,
        limit: limitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitPerPage),
      },
    });
  } catch (e) {
    console.error(`GET /departments error: ${e}`);
    res.status(500).json({ error: "Failed to get departments" });
  }
});

export default router;
