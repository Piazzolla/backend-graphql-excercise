import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {

  constructor (
    @InjectRepository( Item )
    private readonly itemsRepository: Repository<Item>,
  ) {
  }
  
  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create( createItemInput);
    return await this.itemsRepository.save( newItem );
  }

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });
    if(!item) throw new NotFoundException(`Item with id ${id} not found.`)
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput):Promise<Item> {

    const item = await this.itemsRepository.preload(updateItemInput)
    return this.itemsRepository.save(item);
  }

  async remove(id: string):Promise<Item> {
    
    // TODO: soft delet, verify reference integrity
    const item = await this.findOne(id);
    await this.itemsRepository.remove(item);
    return {...item, id};

  }
}
