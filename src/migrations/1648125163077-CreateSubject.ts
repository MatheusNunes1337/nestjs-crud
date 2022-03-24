import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubject1648125163077 implements MigrationInterface {
  name = 'CreateSubject1648125163077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subject" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "teacherId" integer, CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977" UNIQUE ("name"), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "teacher_id_seq" OWNED BY "teacher"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "id" SET DEFAULT nextval('"teacher_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD CONSTRAINT "UQ_2e44b25f34bf682a4bd602d48fd" UNIQUE ("cpf")`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" ADD CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject" DROP CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" DROP CONSTRAINT "UQ_2e44b25f34bf682a4bd602d48fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "teacher_id_seq"`);
    await queryRunner.query(`DROP TABLE "subject"`);
  }
}
