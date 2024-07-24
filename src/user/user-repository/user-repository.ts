import { Inject, Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UserRepository {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    ) {
        this.logger.info('create user repository')
    }

    async save(firstName: string, lastName?:string): Promise<User>{
        this.logger.info(
            `create user with firstname ${firstName} lastname ${lastName}`,
        );
        return  this.prismaService.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        })
    }
}


