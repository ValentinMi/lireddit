import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";
import Joi from "joi";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  // Keep it secret => No @Field()
  @Property({ type: "text" })
  password!: string;
}

export const validateUser = (user: {
  username: String;
  password: String;
}): Joi.ValidationResult => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(5).max(1055).required()
  });

  return schema.validate(user);
};
