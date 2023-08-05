import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../users/entities/user/user.entity';

@Entity('private_uploads')
export class PrivateUploadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({
    name: 'original_file_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  original_file_name: string;

  @Column({ type: 'int', nullable: true })
  ttl: number;

  @Column({ type: 'int', nullable: true })
  size: number;

  @Column({ name: 'uploaded_file_name', type: 'text', nullable: true })
  uploaded_file_name: string;

  @Column({ type: 'boolean', nullable: true })
  is_deleted: boolean;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
