import { ObjectType, Field, Int } from "type-graphql";
import Joi from "joi";
import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  // Keep it secret => No @Field()
  @Column()
  password!: string;

  @OneToMany(() => Post, post => post.creator)
  posts: Post[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export const validateUser = (
  user: UsernamePasswordInput
): Joi.ValidationResult => {
  return Joi.object({
    username: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(5).max(1055).required(),
    email: Joi.string().email().required()
  }).validate(user);
};

export const validateNewPassword = (
  newPassword: string
): Joi.ValidationResult => {
  return Joi.string().min(5).max(1055).required().validate(newPassword);
};
