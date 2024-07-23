import { Controller, Get, Header, HttpCode, HttpException, HttpRedirectResponse, Inject, Param, Post, Query, Redirect, Req, Res, UseFilters } from '@nestjs/common';
import { Request, response, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { user } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';

@Controller('api/users')
export class UserController {
    // provider use constructure 
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService,
        // use alias provider
        @Inject('EmailService') private emailService: MailService,
        private userRepository: UserRepository,
        // modulRef
        private memberService: MemberService,
    ){}

    // provider use Inject decorator 
    // @Inject()
    // private service: UserService;

    // get Connection
    @Get('/connection')
    async getConnection(): Promise<string> {        
        this.mailService.send();
        this.emailService.send();

        // use modulRef 
        console.info(this.memberService.getConnectionName())
        this.memberService.sendEmail();

        return this.connection.getName(); 

    }

    @Get('/create')
    async create(
        @Query('first_name')firstName: string,
        @Query('last_name')lastName: string, 
    ): Promise<user> {
        // nest http exception
        if (!firstName) {
            throw new HttpException({
                code: 400,
                errors: 'first name required',
            }, 400);
        }
        return this.userRepository.save(
            firstName, lastName
        ) 
    }

    @Get('/hello')
    // @UseFilters(ValidationFilter)
    async sayHello(@Query('name')name: string): Promise<string> {
        return this.service.sayHello(name); 
    }

    // use template engine
    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
    }

    //set cookie
    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() response: Response) {
        response.cookie('name', name);
        response.status(200).send('Success Set Cookie');
    }

    // get cookie
    @Get('/get-cookie')
    getCookie(@Req() requet: Request): string {
        return requet.cookies['name'];
    }

    // use respone | http code
    @Get('/sample-response')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    sampleResponse(): Record<string, string> {
        return {
        data: 'Hello JSON',
        };
    }

    // use redirect
    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
        url: '/api/users/sample-response',
        statusCode: 301,
        };
    }

    // get id params 
    @Get('/:id')
    getByParam(@Param('id') id: string): string {
        return `Get Param ${id}`; 
    }

    // use post
    @Post()
    post(): string {
        return 'POST';
    }

    // use get 
    @Get('/sample')
    get(): string {
        return 'Hello NestJS';
    }
}
