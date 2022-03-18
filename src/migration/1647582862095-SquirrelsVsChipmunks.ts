import { MigrationInterface, QueryRunner } from 'typeorm';

export class SquirrelsVsChipmunks1647582862095 implements MigrationInterface {
    name = 'SquirrelsVsChipmunks1647582862095';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`run_num\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`obstacle\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`difficulty\` float NOT NULL, INDEX \`IDX_2196aee632fe16c9cb7a899855\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`week\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`start\` int NOT NULL, \`end\` int NOT NULL, \`obstacleId\` int UNSIGNED NOT NULL, UNIQUE INDEX \`REL_01c788d33113d8583f2c3d9e2d\` (\`obstacleId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`day\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`weekId\` int UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`traversal\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`start\` datetime(6) NULL, \`end\` datetime(6) NULL, \`runId\` int UNSIGNED NULL, \`dayId\` int UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`run\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`participantId\` int UNSIGNED NULL, \`runNumId\` int UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`participant\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, INDEX \`IDX_58b30c45d7b61c4cc2d731100b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`chipmunk\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`fk_participant_id\` int UNSIGNED NOT NULL, UNIQUE INDEX \`REL_f647eeac4ea48803a34a0737b2\` (\`fk_participant_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`squirrel\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`fk_participant_id\` int UNSIGNED NOT NULL, UNIQUE INDEX \`REL_7a9e1c3df5226144a6fcb10c37\` (\`fk_participant_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`week\` ADD CONSTRAINT \`FK_01c788d33113d8583f2c3d9e2d2\` FOREIGN KEY (\`obstacleId\`) REFERENCES \`obstacle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`day\` ADD CONSTRAINT \`FK_2728c59e4ee0663747838c13021\` FOREIGN KEY (\`weekId\`) REFERENCES \`week\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`traversal\` ADD CONSTRAINT \`FK_2b34fd0567a6907462047720fcf\` FOREIGN KEY (\`runId\`) REFERENCES \`run\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`traversal\` ADD CONSTRAINT \`FK_9f4c165da3d81850d8747af0594\` FOREIGN KEY (\`dayId\`) REFERENCES \`day\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`run\` ADD CONSTRAINT \`FK_c72f65eb8cdbe9c5f75b544c335\` FOREIGN KEY (\`participantId\`) REFERENCES \`participant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`run\` ADD CONSTRAINT \`FK_9af008f2925778b590c63265fe3\` FOREIGN KEY (\`runNumId\`) REFERENCES \`run_num\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`chipmunk\` ADD CONSTRAINT \`FK_f647eeac4ea48803a34a0737b25\` FOREIGN KEY (\`fk_participant_id\`) REFERENCES \`participant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`squirrel\` ADD CONSTRAINT \`FK_7a9e1c3df5226144a6fcb10c370\` FOREIGN KEY (\`fk_participant_id\`) REFERENCES \`participant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`squirrel\` DROP FOREIGN KEY \`FK_7a9e1c3df5226144a6fcb10c370\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`chipmunk\` DROP FOREIGN KEY \`FK_f647eeac4ea48803a34a0737b25\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`run\` DROP FOREIGN KEY \`FK_9af008f2925778b590c63265fe3\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`run\` DROP FOREIGN KEY \`FK_c72f65eb8cdbe9c5f75b544c335\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`traversal\` DROP FOREIGN KEY \`FK_9f4c165da3d81850d8747af0594\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`traversal\` DROP FOREIGN KEY \`FK_2b34fd0567a6907462047720fcf\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`day\` DROP FOREIGN KEY \`FK_2728c59e4ee0663747838c13021\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`week\` DROP FOREIGN KEY \`FK_01c788d33113d8583f2c3d9e2d2\``,
        );
        await queryRunner.query(
            `DROP INDEX \`REL_7a9e1c3df5226144a6fcb10c37\` ON \`squirrel\``,
        );
        await queryRunner.query(`DROP TABLE \`squirrel\``);
        await queryRunner.query(
            `DROP INDEX \`REL_f647eeac4ea48803a34a0737b2\` ON \`chipmunk\``,
        );
        await queryRunner.query(`DROP TABLE \`chipmunk\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_58b30c45d7b61c4cc2d731100b\` ON \`participant\``,
        );
        await queryRunner.query(`DROP TABLE \`participant\``);
        await queryRunner.query(`DROP TABLE \`run\``);
        await queryRunner.query(`DROP TABLE \`traversal\``);
        await queryRunner.query(`DROP TABLE \`day\``);
        await queryRunner.query(
            `DROP INDEX \`REL_01c788d33113d8583f2c3d9e2d\` ON \`week\``,
        );
        await queryRunner.query(`DROP TABLE \`week\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_2196aee632fe16c9cb7a899855\` ON \`obstacle\``,
        );
        await queryRunner.query(`DROP TABLE \`obstacle\``);
        await queryRunner.query(`DROP TABLE \`run_num\``);
    }
}
