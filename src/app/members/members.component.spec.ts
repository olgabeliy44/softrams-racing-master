import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import {  Router, RouterModule } from '@angular/router';

import { MembersComponent } from './members.component';
import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { of } from 'rxjs';
import { async } from 'q';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { HttpClientTestingModule } from '../../../node_modules/@angular/common/http/testing';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';


describe('MembersComponent', () => {
  let comp: MembersComponent;
  let MEMBERS;
  let mockAppService;
  let mockRouter;


  beforeEach(() => {

    MEMBERS = [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "jobTitle": "Driver",
        "team": "Formula 1 - Car 77",
        "status": "Active"
      },
      {
        "id": 2,
        "firstName": "Alex",
        "lastName": "Sainz",
        "jobTitle": "Driver",
        "team": "Formula 1 - Car 8",
        "status": "Active"
      },
      {
        "id": 3,
        "firstName": "Jeb",
        "lastName": "Jackson",
        "jobTitle": "Reserve Driver",
        "team": "Formula 1 - Car 77",
        "status": "Inactive"
      }
    ];


    mockAppService = jasmine.createSpyObj(['getMembers', 'deleteMember']);
    mockRouter = {navigate: jasmine.createSpy('navigate')};

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [MembersComponent],
      providers: [
        {provide: Router, useValue: mockRouter},,
        {provide: AppService, useValue: mockAppService}
      ]
    });

    comp = new MembersComponent(mockAppService, mockRouter);
  });

  // afterAll(() => {
  //   TestBed.resetTestingModule();
  // });

  it('should...', ()=>{
    expect(comp).toBeDefined();
    expect(comp.members.length).toBe(0);
  });

  it('Should get all members first', () => {
    mockAppService.getMembers.and.returnValue(of(MEMBERS));
    comp.members = MEMBERS;
    comp.ngOnInit();
    expect(comp.members.length).toBe(3);
  });

  it('When Clicking goToAddMemberForm', ()=>{
    comp.goToAddMemberForm();
    expect (mockRouter.navigate).toHaveBeenCalledWith(['/add_member/']);
  });

  it('When Clicking editMemberById', ()=>{
    let tmpId = '1';
    comp.editMemberById(tmpId);
    expect (mockRouter.navigate).toHaveBeenCalledWith(['/edit_member/', tmpId]);
  });

  it('When Clicking viewMemberById', ()=>{
    let tmpId = '1';
    comp.viewMemberById(tmpId);
    expect (mockRouter.navigate).toHaveBeenCalledWith(['/view_member/', tmpId]);
  });
  
  describe('getCMembers', () => {
    it('Should get all members when call getCMembers', () => {
      mockAppService.getMembers.and.returnValue(of(MEMBERS));
      comp.members = MEMBERS;
      comp.getCMembers();
      expect(comp.members.length).toBe(3);
    });

    it('should call getCMembers', () => {
      mockAppService.getMembers.and.returnValue(of(MEMBERS));
      comp.members = MEMBERS;
      comp.getCMembers();
      expect(mockAppService.getMembers).toHaveBeenCalled();
    });

  });
  describe('delete', () => {
    it('should remove the indicated member from the members list', () => {
      mockAppService.deleteMember.and.returnValue(of(MEMBERS));
      comp.members = MEMBERS;
      comp.deleteMemberById('3');
      expect(comp.members.length).toBe(3);
    });

    it('should call deleteMemberById', () => {
      mockAppService.deleteMember.and.returnValue(of(MEMBERS));
      comp.members = MEMBERS;
      // comp.ngOnInit();
      comp.deleteMemberById('3');
      expect(mockAppService.deleteMember).toHaveBeenCalledWith('3');
    });
  });

  

});
