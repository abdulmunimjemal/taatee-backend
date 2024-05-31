// seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { Event } from '../event/entities/event.entity';
import * as dotenv from 'dotenv';
import { userData, eventData } from './seeder.data-source';

dotenv.config();
const salt = parseInt(process.env.SALT, 10);

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    console.log('Seeding data...')
    await this.seedData(userData, User);
    await this.seedData(eventData, Event);
  }

  private async seedData(data: any[], entityClass: any) {
    const repository = this.connection.getRepository(entityClass);
    if (!repository) {
      console.error(`Repository ${entityClass.name} not found!`);
      return;
    }

    if (entityClass === User)
        console.log(`[CREATING] ${data.length} ${entityClass.name} entities...`);
        console.log('STATUS    [ROLE] TYPE [ EMAIL | PASSWORD]')
    for (const item of data) {
      
      let existingEntity;
      if (entityClass == User) {
         existingEntity = await repository.findOne({ where: { email: item.email } });
      }
      else {
         let entityy = await repository.find()
         if (entityy.length > 0) continue;
        }

      if (!existingEntity) {
        // Create entity
        const newEntity = new entityClass();
        Object.assign(newEntity, item);
        if (entityClass === User)
          newEntity.password = await bcrypt.hash(newEntity.password, salt);
        await repository.save(newEntity);

        if (entityClass === User)
            console.log(`[CREATED] USER [${newEntity.role}] [${newEntity.email} | ${item.password}]`);
      } else {
        // Update existing entity
        Object.assign(existingEntity, item);
        if (entityClass === User)
            existingEntity.password = await bcrypt.hash(existingEntity.password, salt);
        await repository.save(existingEntity);

        if (entityClass === User) // Skip logging for events
            console.log(`[CREATED] [${existingEntity.role}] User [${existingEntity.email} | ${item.password}]`);
      }
    }
  }
}
