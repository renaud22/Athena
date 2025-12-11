<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251211171027 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE commercial_relation (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(50) NOT NULL, siret VARCHAR(50) DEFAULT NULL, tva_intra VARCHAR(50) DEFAULT NULL, website VARCHAR(255) DEFAULT NULL, billing_address VARCHAR(255) DEFAULT NULL, physical_address VARCHAR(255) DEFAULT NULL, sales_status VARCHAR(50) NOT NULL, relation_types JSON NOT NULL, last_contact_date DATETIME DEFAULT NULL, my_benefits LONGTEXT DEFAULT NULL, their_benefits LONGTEXT DEFAULT NULL, comments LONGTEXT DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE commercial_relation_contact (commercial_relation_id INT NOT NULL, contact_id INT NOT NULL, INDEX IDX_EC91CDE3C97C2DA (commercial_relation_id), INDEX IDX_EC91CDEE7A1254A (contact_id), PRIMARY KEY (commercial_relation_id, contact_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE contact (id INT AUTO_INCREMENT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, birthday DATE DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, phone VARCHAR(50) DEFAULT NULL, linkedin_url VARCHAR(255) DEFAULT NULL, personal_address VARCHAR(255) DEFAULT NULL, job_title VARCHAR(255) DEFAULT NULL, hobbies LONGTEXT DEFAULT NULL, bio LONGTEXT DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE commercial_relation_contact ADD CONSTRAINT FK_EC91CDE3C97C2DA FOREIGN KEY (commercial_relation_id) REFERENCES commercial_relation (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE commercial_relation_contact ADD CONSTRAINT FK_EC91CDEE7A1254A FOREIGN KEY (contact_id) REFERENCES contact (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commercial_relation_contact DROP FOREIGN KEY FK_EC91CDE3C97C2DA');
        $this->addSql('ALTER TABLE commercial_relation_contact DROP FOREIGN KEY FK_EC91CDEE7A1254A');
        $this->addSql('DROP TABLE commercial_relation');
        $this->addSql('DROP TABLE commercial_relation_contact');
        $this->addSql('DROP TABLE contact');
    }
}
