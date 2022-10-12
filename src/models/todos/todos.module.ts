import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
