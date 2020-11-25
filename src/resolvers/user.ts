import { Resolver, Mutation, Arg, InputType, Field, Ctx, Query } from "type-graphql";
import argon2 from 'argon2';
import { MyContext } from "../types";
import { User } from "../entities/User";

@InputType()
class userInputField {
    @Field()
    username: string;

    @Field()
    password: string;
}


@Resolver()
export class UserResolver {
    @Mutation(() => User)
   async registerUser(
        @Arg("options") options: userInputField,
        @Ctx() {em}: MyContext
    ){
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User, {username: options.username, password: hashedPassword});
        await em.persistAndFlush(user);
        return user;
    }


    @Query(() => [User])
    getUsers(
        @Ctx() { em }: MyContext
    ){
        return em.find(User, {});
    }
}