CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "admins" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "document" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "short_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255),
    "ibge_code" VARCHAR(255),
    "is_enabled" BOOLEAN DEFAULT false,
    "state_id" VARCHAR(50),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_addresses" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "address" VARCHAR(300) NOT NULL,
    "number" VARCHAR(255),
    "neighborhood" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "zip_code" VARCHAR(8) NOT NULL,
    "restaurant_id" VARCHAR(50),
    "city_id" VARCHAR(50),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "restaurant_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_onboarding_status" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "step_key" VARCHAR(255) NOT NULL,
    "status" BOOLEAN DEFAULT false,
    "completed_at" TIMESTAMPTZ(6),
    "restaurant_id" VARCHAR(50),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "restaurant_onboarding_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "document_number" VARCHAR(255) NOT NULL,
    "commom_name" VARCHAR(350) NOT NULL,
    "social_name" VARCHAR(350) NOT NULL,
    "description" VARCHAR(255),
    "email" VARCHAR(300) NOT NULL,
    "password_hash" VARCHAR(255),
    "phone" VARCHAR(12),
    "is_active" BOOLEAN DEFAULT true,
    "is_email_verified" BOOLEAN DEFAULT false,
    "is_enabled" BOOLEAN DEFAULT false,
    "tax_regime" VARCHAR(255) NOT NULL,
    "responsible_name" VARCHAR(255) NOT NULL,
    "responsible_document" VARCHAR(255) NOT NULL,
    "logo" VARCHAR(650),
    "wallpaper" VARCHAR(650),
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
    "entity" VARCHAR(255) NOT NULL,
    "entity_id" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_addresses_restaurant_id_index" ON "restaurant_addresses"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_document_number_index" ON "restaurants"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_email_index" ON "restaurants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_entity_entity_id_token_index" ON "tokens"("entity", "entity_id", "token");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant_addresses" ADD CONSTRAINT "restaurant_addresses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant_addresses" ADD CONSTRAINT "restaurant_addresses_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant_onboarding_status" ADD CONSTRAINT "restaurant_onboarding_status_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
