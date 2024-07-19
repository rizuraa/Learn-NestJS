import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('api/users')
export class UserController {
    // use cookie
    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() response: Response){
        response.cookie('name', name);
        response.status(200).send('success set cookie');
    }

    @Get('/get-cookie')
    getCookie(@Req() request: Request): string {
        return request.cookies['name'];
    }

     // use http response 
     @Get('json-response')
     @Header('Content-Type', 'application/json')
     @HttpCode(200)
     getJson(): Record<string, string> {
         return {
             data: "JSON DATA"
         }
     }

    //  use redirect 
    @Get('redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            url: '/api/users/json-response',
            statusCode: 301
        }
    }

    // use query
    @Get('/query')
    getById(@Query('name') name: string): string {
        return `kau ${name || 'kau' }`; 
    }

    // use param
    @Get('/:id')
    getByParam(@Param('id') id: string): string {
        return `Get Param ${id}`; 
    }

    @Post()
    post(): string {
        return "test post";
    }

    @Get('/sample')
    get(): string {
        return "test get";
    }

}
