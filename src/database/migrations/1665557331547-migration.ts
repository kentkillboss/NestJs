import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1665557331547 implements MigrationInterface {
  name = 'migration1665557331547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp" ADD "token" numeric NOT NULL`);
    await queryRunner.query(`ALTER TABLE "otp" ADD "userId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD CONSTRAINT "UQ_db724db1bc3d94ad5ba38518433" UNIQUE ("userId")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "email" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "otp" DROP CONSTRAINT "UQ_db724db1bc3d94ad5ba38518433"`,
    );
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "token"`);
  }
}
