import { Injectable } from '@nestjs/common';

export class MailService {
    send() {
        console.info('Email Send')
    }
}

export const mailService = new MailService();