import { Injectable } from '@nestjs/common';

export class Connection {
    getName(): string {
        return null
    }
}

@Injectable()
export class MySQLConnection extends Connection{
    getName(): string {
        return 'MySQL';
    }
}

export class MongoDBConnection extends Connection{
    getName(): string {
        return 'MongoDB';
    }
}