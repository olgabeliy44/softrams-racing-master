import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Router, RouterModule } from '@angular/router';
import { AppService } from '../app.service';

import { of } from 'rxjs';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  let mockAppService;
  let mockRouter;

  beforeEach(async(() => {

    mockAppService = jasmine.createSpyObj(['getMembers', 'setUsername']);
    mockRouter = {navigate: jasmine.createSpy('navigate')};

    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [  
        RouterModule.forRoot([]),
        RouterTestingModule ],
        providers: [
          {provide: Router, useValue: mockRouter},,
          {provide: AppService, useValue: mockAppService}
        ]
    });

    component = new BannerComponent(mockAppService, mockRouter);

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

  it('should create the banner', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.ngOnInit()).toBeUndefined();
  });

  describe('logout', ()=>{
    it('remove', () => {
      component.logout();
      expect (localStorage.removeItem('username')).toBeUndefined('Undefined');
    });

    it('Redirect', () => {
      component.logout();
      expect (mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
