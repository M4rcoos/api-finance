-- CreateTable
CREATE TABLE "owners" (
    "id" SERIAL NOT NULL,
    "establishmentName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "payment_method" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "owners_email_key" ON "owners"("email");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
