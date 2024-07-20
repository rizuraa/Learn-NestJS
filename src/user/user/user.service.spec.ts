import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // test service sayHello
  it('should be able say hello', () => {
    const response = service.sayHello('Fariz');
    expect(response).toBe('Hello Fariz')
  });
});
