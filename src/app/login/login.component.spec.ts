import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { of } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAppService;
  let mockRouter;
  const mockFormBuilder: FormBuilder = new FormBuilder();

  // const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  // const appService = jasmine.createSpyObj('AppService', ['getMembers']);

  beforeEach(async(() => {

    mockAppService = jasmine.createSpyObj(['getMembers', 'setUsername']);
    mockRouter = {navigate: jasmine.createSpy('navigate')};

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, 
        RouterModule.forRoot([]), 
        RouterTestingModule
      ],
      providers: [
        {provide: FormBuilder, useValue: mockFormBuilder},
        {provide: Router, useValue: mockRouter},,
        {provide: AppService, useValue: mockAppService}
      ]
    });

    component = new LoginComponent(mockFormBuilder, mockRouter, mockAppService);

    component.loginForm = mockFormBuilder.group({
      username:['', Validators.required],
      password: ['', Validators.required]
    });

    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
      return store[key] || null;
     });
     spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
       delete store[key];
     });
     spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
       return store[key] = <string>value;
     });
     spyOn(localStorage, 'clear').and.callFake(() =>  {
         store = {};
     });
  }));


  it('should create the login', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
  });

  describe('delete', () => {
    let tmpUsername = 'John';
    it('login: localstorage', () => {
      component.login();
      localStorage.setItem('username', tmpUsername);
      expect(localStorage.getItem('username')).toBe(tmpUsername);
    });

    it('login: setUserName', () => {
      mockAppService.setUsername.and.returnValue(of(tmpUsername));
      component.login();
      expect(mockAppService.setUsername).toHaveBeenCalledWith('');
    });

    it('login: Navicate', () => {
      component.login();
      expect (mockRouter.navigate).toHaveBeenCalledWith(['/members']);
    });
  });
});
