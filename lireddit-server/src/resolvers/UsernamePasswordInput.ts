import { InputType, Field } from "type-graphql";
// TYPES
@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
