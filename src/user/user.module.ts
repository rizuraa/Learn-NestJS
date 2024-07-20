import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { CreateUserRepository, UserRepository } from './user-repository/user-repository';
import * as process from 'process';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    {
      provide: Connection,
      useClass: process.env.DATABASE == 'MySQL  ' ? MySQLConnection : MongoDBConnection,
    },
    {
      provide: MailService,
      useValue: mailService,
    },
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
    {
      provide: UserRepository,
      useFactory: CreateUserRepository,
      inject: [Connection],
    }
  ]
})
export class UserModule {}
