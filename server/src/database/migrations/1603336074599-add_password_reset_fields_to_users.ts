import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addPasswordResetFieldsToUsers1603336074599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'password_reset_token',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'password_reset_expires',
        type: 'timestamp',
        isNullable: true,
      }
    )]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'password_reset_token',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'password_reset_expires',
        type: 'timestamp',
      }
    )]);
  }
}
