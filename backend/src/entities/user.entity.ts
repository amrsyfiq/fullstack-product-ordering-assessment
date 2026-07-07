import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

/**
 * The brief states no authentication is required, but the submission asks for
 * customer/admin credentials. We therefore seed a users table so credentials
 * exist and the schema is complete, without enforcing any login flow.
 */
@Entity({ name: 'app_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;
}
