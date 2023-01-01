import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { of } from 'rxjs';

describe('UsersService', () => {
  let usersService: UsersService; // Add this

  beforeEach(() => {
    // 테스트할 컴포넌트와 의존성으로 주입될 서비스를 프로바이더에 등록
    TestBed.configureTestingModule({
      providers: [UsersService]
    });
    // TestBed를 사용해서 컴포넌트 인스턴스와 서비스 인스턴스를 참조
    usersService = TestBed.inject(UsersService); // Add this
  });

  it('should be created', () => { // Remove inject()
    expect(usersService).toBeTruthy();
  });

  describe('all', () => {
    it('should return a collection of users', () => {
      const userResponse = [
        {
          id: '1',
          name: 'Jane',
          role: 'Designer',
          pokemon: 'Blastoise'
        },
        {
          id: '2',
          name: 'Bob',
          role: 'Developer',
          pokemon: 'Charizard'
        }
      ];
      let response : any;
      spyOn(usersService, 'all').and.returnValue(of(userResponse));

      usersService.all().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single user', () => {
      const userResponse :any = {
        id: '2',
        name: 'Bob',
        role: 'Developer',
        pokemon: 'Charizard'
      };
      let response;
      spyOn(usersService, 'findOne').and.returnValue(of(userResponse));
  
      usersService.findOne('2').subscribe(res => {
        response = res;
      });
  
      expect(response).toEqual(userResponse);
    });
  });




  describe('adder', () => {
    // A jasmine spec
    it('should be able to add two whole numbers', () => {
      expect(usersService.adder(2, 2)).toEqual(4);
    });
  
    it('should be able to add a whole number and a negative number', () => {
      expect(usersService.adder(2, -1)).toEqual(1);
    });
  
    it('should be able to add a whole number and a zero', () => {
      expect(usersService.adder(2, 0)).toEqual(2);
    });
  });
});