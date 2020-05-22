import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppService } from './app.service';

import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('AppService', () => {
  let appService: AppService;
  
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientTestingModule]
    });
    
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    appService = new AppService(httpClient);
    expect(appService).toBeTruthy();
  });

  it('#getMembers should contain column', () => {
    appService = new AppService(httpClient);
    expect(appService.getMembers()).toBeTruthy();
  });

  it('#getMember should be John of first user\'s name', () => {
    appService = new AppService(httpClient);
    expect(appService.getMember('1')).toBeTruthy();
  });

  it('#addMember should contain success', () => {
    let member = {
      firstName: 'test1',
      lastName: 'test2',
      jobTitle: 'test3',
      team: ''
    }
    appService = new AppService(httpClient);
    expect(appService.addMember(member)['success']).toBe(undefined);
  });

  it('#updateMember should contain success', () => {
    let member = {
      firstName: 'test1',
      lastName: 'test2',
      jobTitle: 'test3',
      team: ''
    }
    appService = new AppService(httpClient);
    expect(appService.addMember(member)['success']).toBe(undefined);
  });

  it('#deleteMember should return member array', () => {
    appService = new AppService(httpClient);
    expect(appService.deleteMember('1')).toBeTruthy();
  });

  describe('setUsername', ()=>{
    it('#setUsername should return null', () => {
      let tmp = 'tmpuser';
      appService = new AppService(httpClient);
      expect(appService.setUsername(tmp)).toBe(undefined);
    });  
  });

  describe('getTeams', ()=>{
    it('#getTeams should contain id', () => {
      appService = new AppService(httpClient);
      expect(appService.getTeams()).toBeTruthy();
    });
  });
  
});
