import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Uploads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  original_file_name: string;
}
