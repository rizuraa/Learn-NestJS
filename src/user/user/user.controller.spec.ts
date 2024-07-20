import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { title } from 'process';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // test with user service as provider
  it('should be say hello', async() => {
    const respone = await controller.sayHello('Fariz');
    expect(respone).toBe("Hello Fariz");
  })

  // unit test using htpp mock
  it('should can view template', async() => {
    const respone = httpMock.createResponse();
    controller.viewHello('Fariz', respone);

    expect(respone._getRenderView()).toBe('index.html');
    expect(respone._getRenderData()).toEqual({
      name: 'Fariz',
      title: 'Template Engine'
    })
  })

});
