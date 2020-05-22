import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Member } from '../model/member';


@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    team: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  getId: any;

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {   
      this.getId = params.get('id');
    });
  }

  ngOnInit() {
    this.alertMessage = '';
    
    this.getCTeams();

    this.getCMember(this.getId);
  }

  initForm() {
    this.memberForm.setValue({
      _id: -1,
      firstName: '',
      lastName: '',
      jobTitle: '',
      team: '',
      status: ''
    });
  }

  getCTeams() {
    this.appService.getTeams().subscribe(teams => {
      if(teams != null && teams != undefined)
      {
        this.teams = teams;
      }
      else this.teams = [];
    });
  }

  getCMember(id: string) {
    this.appService.getMember(id).subscribe(member => {
     
      if(member._id != null && member._id != undefined)
      {
        this.memberModel = {
          _id: member._id,
          firstName: member.firstName,
          lastName: member.lastName,
          jobTitle: member.jobTitle,
          team: member.team,
          status: member.status
        };
        this.memberForm.setValue({
          _id: member._id,
          firstName: member.firstName,
          lastName: member.lastName,
          jobTitle: member.jobTitle,
          team: member.team,
          status: member.status
        });
      }
    });
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.submitted = true;
    if(this.memberForm.valid){
      if(this.memberForm.value._id == -1){
        this.addCMember();
      }
      else{
       this.updateCMember(); 
      }
    }
    else return;
    
  }

  addCMember() {
    this.appService.addMember(this.memberForm.value).subscribe(res => {
      if(res.success){
        this.router.navigate(['/members']);
      }
      else{
        this.alertMessage = res.message;
      }
    });
  }

  updateCMember() {
    this.appService.updateMember(this.memberForm.value).subscribe(res => {
      if(res.success){
        this.router.navigate(['/members']);
      }
      else{
        this.alertMessage = res.message;
      }
    });
  }

}
