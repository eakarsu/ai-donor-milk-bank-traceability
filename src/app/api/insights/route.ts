import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorize } from "@/lib/api-auth";
import { records, errorResponse } from "@/lib/record-store";
import { buildInsights } from "@/lib/insights";
export const dynamic = "force-dynamic";
// Deterministic offline insights over own records. Never calls a provider.
export async function GET(_request: NextRequest) {
  try {
    await authorize();
    const take = { take: 1000, orderBy: [{ createdAt: "desc" }, { id: "desc" }] } as never;
    const [donors, donations, pools, contributions, runs, recalls, distributions, labChecks] = await Promise.all([
      records(prisma, "MilkDonor").findMany(take), records(prisma, "MilkDonation").findMany(take),
      records(prisma, "MilkPool").findMany(take), records(prisma, "PoolContribution").findMany(take),
      records(prisma, "PasteurizationRun").findMany(take), records(prisma, "MilkRecall").findMany(take),
      records(prisma, "MilkDistribution").findMany(take), records(prisma, "MilkLabCheck").findMany(take),
    ]);
    return Response.json(buildInsights({ donors, donations, pools, contributions, runs, recalls, distributions, labChecks }));
  } catch (error) { return errorResponse(error); }
}
