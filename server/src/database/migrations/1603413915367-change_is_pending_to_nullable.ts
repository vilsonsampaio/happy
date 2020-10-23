import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class changeIsPendingToNullable1603413915367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'is_pending');
    
    await queryRunner.addColumn('orphanages', new TableColumn({
      name: 'is_pending',
      type: 'boolean',
      isNullable: true,
      default: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'is_pending');

    await queryRunner.addColumn('orphanages', new TableColumn({
      name: 'is_pending',
      type: 'boolean',
      default: true,
    }));
  }
}
