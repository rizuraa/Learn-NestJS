import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[
    PrismaModule
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    // factory provider
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },

    // value provider
    {
      provide: MailService,
      useValue: mailService,
    },

    // alias provider
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
    UserRepository,
    MemberService
  ],
  // shared provider/service
  exports: [UserService],
})
export class UserModule {}
