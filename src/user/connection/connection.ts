import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

// factory method for connection after implement ConfigModule 
export function createConnection(configService: ConfigService): Connection{
    if (configService.get('DATABASE') == 'mysql') {
        return new MySQLConnection();
    }else{
        return new MongoDBConnection(); 
    }
}