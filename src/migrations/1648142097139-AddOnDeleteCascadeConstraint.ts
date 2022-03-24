import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOnDeleteCascadeConstraint1648142097139 implements MigrationInterface {
    name = 'AddOnDeleteCascadeConstraint1648142097139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1"`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1"`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
