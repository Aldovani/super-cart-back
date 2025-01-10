import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field({
    nullable: true,
  })
  phoneNumber: string;
}
