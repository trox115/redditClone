import { Resolver, Query } from 'type-graphql';

@Resolver()
 export class SecondHello{
     @Query(() => String)
     second(){
         return "second Hello"
     }
 }