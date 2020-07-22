import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToOne((type) => Company, (company) => company.employees)
  // company: Company;
  // @ManyToOne((type) => Hobby, (hobby) => hobby.employees)
  // hobbies: Hobby[];
}
