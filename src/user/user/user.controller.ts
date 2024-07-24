import { Body, Controller, Get, Header, HttpCode, HttpException, HttpRedirectResponse, Inject, Param, ParseIntPipe, Post, Query, Redirect, Req, Res, UseFilters, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import { Request, response, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import { loginUserRequest, loginUserRequestValidation } from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { string } from 'zod';
import { TimeInterceptor } from 'src/time/time.interceptor';
import { Auth } from 'src/auth/auth.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';

@UseGuards(RoleGuard)
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

    // implement guards 
    @Get('/current')    
    @Roles(['admin', 'operator'])    
    current(@Auth() user: User): Record<string, any> {
        return {
            data: `Hello ${user.first_name} ${user.last_name}`
        }
    }

    // provider use Inject decorator 
    // @Inject()
    // private service: UserService;

    @UsePipes(new ValidationPipe(loginUserRequestValidation))
    @UseFilters(ValidationFilter)
    @Post('/login')
    @Header('Content-Type', 'application/json')
    @UseInterceptors(TimeInterceptor)
    login(
        @Query('name') name: string,
        @Body() request: loginUserRequest
    ){        
        return {
            data: `Hello ${request.username}`
        };
    }

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
    ): Promise<User> {
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
    // implement pipe 
    @Get('/:id')
    getByParam(@Param('id', ParseIntPipe) id: number): string {
        // console.info(id * 10);
        return `Get ${id}`; 
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
