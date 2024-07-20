import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';

export class UserRepository {
    connection: Connection

    save() {
        console.info(`save user connection with ${this.connection.getName()}`);
    }
}

export function CreateUserRepository(connection: Connection): UserRepository{
    const repository = new UserRepository();
    repository.connection = connection;
    return repository;
}
