import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';

// dynamic module for validation 
@Module({})
export class ValidationModule {
  static forRoot(isGlobal: boolean): DynamicModule {
    return {
      global: isGlobal,
      module: ValidationModule,
      providers: [ValidationService],
      exports: [ValidationService],
    }
  }
}
