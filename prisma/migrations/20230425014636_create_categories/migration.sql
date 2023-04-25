-- CreateTable
CREATE TABLE "categories" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(350) NOT NULL,
    "image" VARCHAR(650),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_description_key" ON "categories"("description");
