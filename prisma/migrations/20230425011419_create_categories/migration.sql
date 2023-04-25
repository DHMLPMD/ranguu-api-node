-- CreateTable
CREATE TABLE "Categories" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(350) NOT NULL,
    "image" VARCHAR(650),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);
