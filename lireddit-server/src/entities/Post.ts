import { ObjectType, Field, Int } from "type-graphql";
import {
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import Joi from "joi";
import { PostInput } from "../resolvers/post";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field()
  @Column()
  creatorid: number;

  @ManyToOne(() => User, user => user.posts)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export const validatePost = (post: PostInput): Joi.ValidationResult => {
  return Joi.object({
    title: Joi.string().min(1).max(255).required(),
    text: Joi.string().min(1).max(1055).required()
  }).validate(post);
};
