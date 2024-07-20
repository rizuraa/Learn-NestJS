import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    // say hello service
    sayHello(name: string): string {
        return `Hello ${name}`
    }
}
