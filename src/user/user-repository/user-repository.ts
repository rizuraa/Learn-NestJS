import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {
        console.info('create user repository')
    }

    async save(firstName: string, lastName?:string): Promise<user>{
        return  this.prismaService.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        })
    }
}


