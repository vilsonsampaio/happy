import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addIsPendingToOrphanages1603427620352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('orphanages', new TableColumn({
      name: 'is_pending',
      type: 'boolean',
      default: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'is_pending');
  }
}
