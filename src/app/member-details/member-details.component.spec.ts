import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, RouterModule, ActivatedRoute, convertToParamMap } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../app.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { Member } from '../model/member';


// Bonus points!
describe('MemberDetailsComponent', () => {
  let comp: MemberDetailsComponent;

  let MEMBERS;
  let TEAMS;

  let mockAppService;
  let mockActivetedRoute;
  const mockFormBuilder: FormBuilder = new FormBuilder();
  let mockRouter_;

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

    TEAMS = [
      {
        "id": 1,
        "teamName": "Formula 1 - Car 77"
      },
      {
        "id": 2,
        "teamName": "Formula 1 - Car 8"
      },
      {
        "id": 3,
        "teamName": "Formula 2 - Car 54"
      },
      {
        "id": 4,
        "teamName": "Formula 2 - Car 63"
      },
      {
        "id": 5,
        "teamName": "Deutsche Tourenwagen Masters - Car 117"
      },
      {
        "id": 6,
        "teamName": "Deutsche Tourenwagen Masters - Car 118"
      },
      {
        "id": 7,
        "teamName": "World Endurance Championship - Car 99"
      },
      {
        "id": 8,
        "teamName": "World Endurance Championship - Car 5"
      },
      {
        "id": 9,
        "teamName": "World Rally Championship - Car 77"
      },
      {
        "id": 10,
        "teamName": "World Rally Championship - Car 90"
      }
    ];

    mockRouter_ = {navigate: jasmine.createSpy('navigate')};  
    mockAppService = jasmine.createSpyObj(['getMembers', 'getMember', 'getTeams', 'addMember', 'updateMember']);
    mockActivetedRoute = { paramMap: of(convertToParamMap({id: '1'})) };

    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule
      ],
      providers: [
        {provide: Router, useValue: mockRouter_},
        {provide: FormBuilder, useValue: mockFormBuilder},
        {provide: ActivatedRoute, useValue:
          { paramMap: of(convertToParamMap({id: '1'})) }
        },
        {provide: AppService, useValue: mockAppService}
      ]
    }).compileComponents();
    
    comp = new MemberDetailsComponent(mockFormBuilder, mockAppService, mockRouter_, mockActivetedRoute);

    comp.memberForm = mockFormBuilder.group({
      _id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required]
    });
    comp.submitted = false;
    comp.memberModel = new Member();
    });

  describe('creator', ()=>{
    it('should create member-details', ()=>{
      comp = new MemberDetailsComponent(mockFormBuilder, mockAppService, mockRouter_, mockActivetedRoute);
      expect(comp).toBeTruthy();
      expect(comp.alertMessage).toBe(undefined);
    });
  });


  describe('Should get Null when calling ngOnChanges', ()=>{
    it('ngOnChange', () => {
      comp = new MemberDetailsComponent(mockFormBuilder, mockAppService, mockRouter_, mockActivetedRoute);
      expect(comp.ngOnChanges()).toBe(undefined);
    });
  });

  describe('getCTeams', () => {
    it('Should get all members when call getCTeams', () => {
      mockAppService.getTeams.and.returnValue(of(TEAMS));
      comp.teams = TEAMS;
      comp.getCTeams();
      expect(comp.teams.length).toBe(10);
    });

    it('should call getCTeams', () => {
      mockAppService.getTeams.and.returnValue(of(TEAMS));
      comp.teams = TEAMS;
      comp.getCTeams();
      expect(mockAppService.getTeams).toHaveBeenCalled();
    });

    it('Return Null', () => {
      mockAppService.getTeams.and.returnValue(of(null));
      comp.teams = [];
      comp.getCTeams();
      expect(comp.teams.length).toBe(0);
    });
  });

  describe('getCMember', () => {

    it('should call getCMember', () => {
      comp.memberForm.value._id = '1';
      comp.memberForm.value.firstName = 'f';
      comp.memberForm.value.lastName = 'l';
      comp.memberForm.value.jobTitle = 'j';
      comp.memberForm.value.team = 't';
      comp.memberForm.value.status = 's';
      mockAppService.getMember.and.returnValue(of(comp.memberForm));
      comp.getCMember('1');
      expect(mockAppService.getMember).toHaveBeenCalledTimes(1);
      expect(comp.memberForm.value._id).toEqual('1');
    });
  });

  describe('Click ngOnInit', () => {
    
    it('start ', ()=>{
     mockAppService.getTeams.and.returnValue(of(TEAMS));
     comp.memberModel._id = "1";
     comp.memberModel.firstName = MEMBERS[0].firstName;
     comp.memberModel.lastName = MEMBERS[0].lastName;
     comp.memberModel.jobTitle = MEMBERS[0].jobTitle;
     comp.memberModel.team = MEMBERS[0].team;
     comp.memberModel.status = MEMBERS[0].status;

     mockAppService.getMember.and.returnValue(of(comp.memberModel));
     comp.teams = TEAMS;
     comp.ngOnInit();
      expect(mockAppService.getTeams).toHaveBeenCalledTimes(1);
      expect(mockAppService.getMember).toHaveBeenCalledTimes(1);
    });

    it('start ', ()=>{
      mockAppService.getTeams.and.returnValue(of(TEAMS));
      comp.memberModel._id = "1";
      comp.memberModel.firstName = MEMBERS[0].firstName;
      comp.memberModel.lastName = MEMBERS[0].lastName;
      comp.memberModel.jobTitle = MEMBERS[0].jobTitle;
      comp.memberModel.team = MEMBERS[0].team;
      comp.memberModel.status = MEMBERS[0].status;
      mockAppService.getMember.and.returnValue(of(comp.memberModel));
      comp.teams = TEAMS;
      comp.ngOnInit();
      expect(comp.teams.length).toBe(10);
     });

     it('start ', ()=>{
      mockAppService.getTeams.and.returnValue(of(TEAMS));
      comp.memberModel._id = "1";
      comp.memberModel.firstName = MEMBERS[0].firstName;
      comp.memberModel.lastName = MEMBERS[0].lastName;
      comp.memberModel.jobTitle = MEMBERS[0].jobTitle;
      comp.memberModel.team = MEMBERS[0].team;
      comp.memberModel.status = MEMBERS[0].status;
      mockAppService.getMember.and.returnValue(of(comp.memberModel));
      comp.teams = TEAMS;
      comp.ngOnInit();
      expect(mockAppService.getMember).toHaveBeenCalledWith('1');
     });
    
  });

  //Branch
  describe('addCMember', () => {

    it('run addCMember', ()=>{
      let res = { success: true, message: 'successfully'};
      mockAppService.addMember.and.returnValue(of(res));
      comp.addCMember();
      expect(mockAppService.addMember).toHaveBeenCalledTimes(1);
    })
    
    it('should call addCMember', () => {
      let res = { success: true, message: 'successfully'};
      mockAppService.addMember.and.returnValue(of(res));
      comp.addCMember();
      expect(mockAppService.addMember).toHaveBeenCalledWith(comp.memberForm.value);
    });

    it('should call addCMember', () => {
      let res = { success: true, message: 'successfully'};
      mockAppService.addMember.and.returnValue(of(res));
      comp.addCMember();
      expect(mockRouter_.navigate).toHaveBeenCalledWith(['/members']);
    });

    it('should call addCMember', () => {
      let res = { success: false, message: 'error'};
      mockAppService.addMember.and.returnValue(of(res));
      comp.addCMember();
      expect(comp.alertMessage).toBeDefined();
    });
  });

  // // Branch
  describe('updateCMember', () => {
    
    it('should call updateCMember', () => {
      let res = { success: true, message: 'successfully'};
      mockAppService.updateMember.and.returnValue(of(res));
      comp.updateCMember();
      expect(mockAppService.updateMember).toHaveBeenCalledWith(comp.memberForm.value);
    });

    it('should call updateCMember', () => {
      let res = { success: true, message: 'successfully'};
      mockAppService.updateMember.and.returnValue(of(res));
      comp.updateCMember();
      expect(mockRouter_.navigate).toHaveBeenCalledWith(['/members']);
    });

    it('should call updateCMember', () => {
      let res = { success: false, message: 'error'};
      mockAppService.updateMember.and.returnValue(of(res));
      comp.updateCMember();
      expect(comp.alertMessage).toBeDefined();
    });

  });

  describe('initForm', () => {
    
    it('_id should be -1', () => {
      comp.initForm();
      expect(comp.memberForm.value._id).toBe(-1);
    });
    
  });

  describe('Onsubmit', ()=>{

    it('Valid true', ()=>{
      let res = { success: false, message: 'error'};
      mockAppService.addMember.and.returnValue(of(res));
      comp.alertMessage = res.message;
      comp.memberForm.value._id = '-1';
      comp.memberForm.value.firstName = 'f';
      comp.memberForm.value.lastName = 'l';
      comp.memberForm.value.jobTitle = 'j';
      comp.memberForm.value.team = 't';
      comp.memberForm.value.status = 's';
      comp.onSubmit(comp.memberForm);
      comp.addCMember();
      expect(comp.alertMessage).toBe(res.message);
    });

    it('should run addCMember', ()=>{
      let res = { success: true, message: 'successfully'};
      mockAppService.addMember.and.returnValue(of(res));
      comp.memberForm.value._id = '-1';
      comp.memberForm.value.firstName = 'f';
      comp.memberForm.value.lastName = 'l';
      comp.memberForm.value.jobTitle = 'j';
      comp.memberForm.value.team = 't';
      comp.memberForm.value.status = 's';
      comp.onSubmit(comp.memberForm);
      comp.addCMember();
      
      expect(mockAppService.addMember).toHaveBeenCalledTimes(1);
      expect(comp.memberForm).toBeDefined();
    });

    it('should call addCMember', () => {
      let res = { success: false, message: 'error'};
      mockAppService.addMember.and.returnValue(of(res));
      comp.onSubmit(comp.memberForm);
      comp.addCMember();
      expect(comp.alertMessage).toBeDefined();
    });

    it('should run updateCMember', ()=>{
      let res = { success: true, message: 'successfully'};
      mockAppService.updateMember.and.returnValue(of(res));
      
      comp.memberForm.value._id = '1';
      comp.memberForm.value.firstName = 'f';
      comp.memberForm.value.lastName = 'l';
      comp.memberForm.value.jobTitle = 'j';
      comp.memberForm.value.team = 't';
      comp.memberForm.value.status = 's';
      comp.onSubmit(comp.memberForm);
      comp.updateCMember();
      
      expect(mockAppService.updateMember).toHaveBeenCalledTimes(1);
      expect(mockRouter_.navigate).toHaveBeenCalledWith(['/members']);
    });

    it('should call updateCMember', () => {
      let res = { success: false, message: 'error'};
      mockAppService.updateMember.and.returnValue(of(res));
      comp.onSubmit(comp.memberForm);
      comp.updateCMember();
      expect(comp.alertMessage).toBeDefined();
    });

    it('memberForm Invalid', ()=>{
      let res = { success: true, message: 'successfully'};
      mockAppService.addMember.and.returnValue(of(res));
      comp.memberForm.value._id = null;
      
      expect(comp.onSubmit(comp.memberForm)).toBeUndefined();
    });
  });

});
