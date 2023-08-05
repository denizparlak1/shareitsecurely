import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PasswordReset } from '../reset-password/password.reset.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  is_active: boolean;

  @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
  password_resets: PasswordReset[];
}
