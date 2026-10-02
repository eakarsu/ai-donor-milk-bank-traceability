-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'ANALYST');

-- CreateTable
CREATE TABLE "User" (
    "active" BOOLEAN NOT NULL DEFAULT true,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ANALYST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowAnalysis" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "workflow" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "evidence" JSONB NOT NULL,
    "evidenceHash" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "model" TEXT NOT NULL,
    "receipt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordReview" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageBucket" (
    "id" TEXT NOT NULL,
    "calls" INTEGER NOT NULL,

    CONSTRAINT "UsageBucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssuedCredential" (
    "token" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "assertion" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "IssuedCredential_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "DomainArtifact" (
    "id" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DomainArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordApproval" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "RecordApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainExecution" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "connectorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "result" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DomainExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSession" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "respondentId" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "currentQuestion" TEXT,
    "status" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionMedia" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "bytes" BYTEA NOT NULL,
    "contentHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppSetting" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilkBankProgram" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "facility" TEXT NOT NULL,
    "licenseReference" TEXT NOT NULL,
    "coordinator" TEXT NOT NULL,
    "reportingStart" TIMESTAMP(3) NOT NULL,
    "reportingEnd" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MilkBankProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilkDonor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "donorCode" TEXT NOT NULL,
    "consentAt" TIMESTAMP(3) NOT NULL,
    "screeningEvidence" TEXT NOT NULL,
    "reviewDueAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MilkDonor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilkDonation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "milkDonorId" TEXT NOT NULL,
    "collectedAt" TIMESTAMP(3) NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "volumeMl" DOUBLE PRECISION NOT NULL,
    "containerNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MilkDonation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilkPool" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poolNumber" TEXT NOT NULL,
    "pooledAt" TIMESTAMP(3) NOT NULL,
    "volumeMl" DOUBLE PRECISION NOT NULL,
    "operator" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MilkPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoolContribution" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "milkDonationId" TEXT NOT NULL,
    "milkPoolId" TEXT NOT NULL,
    "volumeMl" DOUBLE PRECISION NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PoolContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasteurizationRun" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "milkPoolId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "equipment" TEXT NOT NULL,
    "cycleEvidence" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasteurizationRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilkLabCheck" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "milkPoolId" TEXT NOT NULL,
    "sampledAt" TIMESTAMP(3) NOT NULL,
    "laboratory" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "resultText" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MilkLabCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilkDistribution" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "milkPoolId" TEXT NOT NULL,
    "dispatchedAt" TIMESTAMP(3) NOT NULL,
    "recipient" TEXT NOT NULL,
    "volumeMl" DOUBLE PRECISION NOT NULL,
    "receipt" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MilkDistribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MilkRecall" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "milkPoolId" TEXT NOT NULL,
    "initiatedAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "coordinator" TEXT NOT NULL,
    "responseEvidence" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MilkRecall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationalTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationalTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleVersion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "jurisdiction" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "sourceUrl" TEXT NOT NULL,
    "requirementText" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuleVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRequirement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "requiredBy" TIMESTAMP(3) NOT NULL,
    "sourceReference" TEXT NOT NULL,
    "evidenceReference" TEXT,
    "reviewNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "milkBankProgramId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "WorkflowAnalysis_workflow_createdAt_idx" ON "WorkflowAnalysis"("workflow", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RecordReview_entity_entityId_version_actorId_key" ON "RecordReview"("entity", "entityId", "version", "actorId");

-- CreateIndex
CREATE INDEX "IssuedCredential_entity_entityId_createdAt_idx" ON "IssuedCredential"("entity", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "DomainArtifact_subjectEntity_subjectId_idx" ON "DomainArtifact"("subjectEntity", "subjectId");

-- CreateIndex
CREATE INDEX "WorkSession_respondentId_createdAt_idx" ON "WorkSession"("respondentId", "createdAt");

-- CreateIndex
CREATE INDEX "SessionMedia_sessionId_idx" ON "SessionMedia"("sessionId");

-- CreateIndex
CREATE INDEX "MilkBankProgram_createdAt_idx" ON "MilkBankProgram"("createdAt");

-- CreateIndex
CREATE INDEX "MilkDonor_createdAt_idx" ON "MilkDonor"("createdAt");

-- CreateIndex
CREATE INDEX "MilkDonor_milkBankProgramId_idx" ON "MilkDonor"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "MilkDonation_createdAt_idx" ON "MilkDonation"("createdAt");

-- CreateIndex
CREATE INDEX "MilkDonation_milkBankProgramId_idx" ON "MilkDonation"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "MilkPool_createdAt_idx" ON "MilkPool"("createdAt");

-- CreateIndex
CREATE INDEX "MilkPool_milkBankProgramId_idx" ON "MilkPool"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "PoolContribution_createdAt_idx" ON "PoolContribution"("createdAt");

-- CreateIndex
CREATE INDEX "PoolContribution_milkBankProgramId_idx" ON "PoolContribution"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "PasteurizationRun_createdAt_idx" ON "PasteurizationRun"("createdAt");

-- CreateIndex
CREATE INDEX "PasteurizationRun_milkBankProgramId_idx" ON "PasteurizationRun"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "MilkLabCheck_createdAt_idx" ON "MilkLabCheck"("createdAt");

-- CreateIndex
CREATE INDEX "MilkLabCheck_milkBankProgramId_idx" ON "MilkLabCheck"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "MilkDistribution_createdAt_idx" ON "MilkDistribution"("createdAt");

-- CreateIndex
CREATE INDEX "MilkDistribution_milkBankProgramId_idx" ON "MilkDistribution"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "MilkRecall_createdAt_idx" ON "MilkRecall"("createdAt");

-- CreateIndex
CREATE INDEX "MilkRecall_milkBankProgramId_idx" ON "MilkRecall"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "OperationalTask_createdAt_idx" ON "OperationalTask"("createdAt");

-- CreateIndex
CREATE INDEX "OperationalTask_milkBankProgramId_idx" ON "OperationalTask"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "RuleVersion_createdAt_idx" ON "RuleVersion"("createdAt");

-- CreateIndex
CREATE INDEX "RuleVersion_milkBankProgramId_idx" ON "RuleVersion"("milkBankProgramId");

-- CreateIndex
CREATE INDEX "DocumentRequirement_createdAt_idx" ON "DocumentRequirement"("createdAt");

-- CreateIndex
CREATE INDEX "DocumentRequirement_milkBankProgramId_idx" ON "DocumentRequirement"("milkBankProgramId");

-- AddForeignKey
ALTER TABLE "MilkDonor" ADD CONSTRAINT "MilkDonor_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkDonation" ADD CONSTRAINT "MilkDonation_milkDonorId_fkey" FOREIGN KEY ("milkDonorId") REFERENCES "MilkDonor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkDonation" ADD CONSTRAINT "MilkDonation_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkPool" ADD CONSTRAINT "MilkPool_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolContribution" ADD CONSTRAINT "PoolContribution_milkDonationId_fkey" FOREIGN KEY ("milkDonationId") REFERENCES "MilkDonation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolContribution" ADD CONSTRAINT "PoolContribution_milkPoolId_fkey" FOREIGN KEY ("milkPoolId") REFERENCES "MilkPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolContribution" ADD CONSTRAINT "PoolContribution_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasteurizationRun" ADD CONSTRAINT "PasteurizationRun_milkPoolId_fkey" FOREIGN KEY ("milkPoolId") REFERENCES "MilkPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasteurizationRun" ADD CONSTRAINT "PasteurizationRun_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkLabCheck" ADD CONSTRAINT "MilkLabCheck_milkPoolId_fkey" FOREIGN KEY ("milkPoolId") REFERENCES "MilkPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkLabCheck" ADD CONSTRAINT "MilkLabCheck_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkDistribution" ADD CONSTRAINT "MilkDistribution_milkPoolId_fkey" FOREIGN KEY ("milkPoolId") REFERENCES "MilkPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkDistribution" ADD CONSTRAINT "MilkDistribution_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkRecall" ADD CONSTRAINT "MilkRecall_milkPoolId_fkey" FOREIGN KEY ("milkPoolId") REFERENCES "MilkPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MilkRecall" ADD CONSTRAINT "MilkRecall_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalTask" ADD CONSTRAINT "OperationalTask_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleVersion" ADD CONSTRAINT "RuleVersion_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRequirement" ADD CONSTRAINT "DocumentRequirement_milkBankProgramId_fkey" FOREIGN KEY ("milkBankProgramId") REFERENCES "MilkBankProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

