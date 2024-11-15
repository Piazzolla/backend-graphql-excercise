import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items'})
@ObjectType()
export class Item {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  
  @Column()
  @Field(() => String)
  name: string;
  
  @Field(() => Float)
  @Column()
  quantity: number;
  
  @Field(() => String, {nullable: true})
  @Column({ nullable: true})
  quantityUnits?: string; // g, ml, kg, tsp
 
}
