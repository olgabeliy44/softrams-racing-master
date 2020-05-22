import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.getCMembers();
  }

  getCMembers() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    // console.log(`Hmmm...we didn't navigate anywhere`);
    this.router.navigate(['/add_member/']);
  }

  editMemberById(_id: string) {
    this.router.navigate(['/edit_member/', _id]);
  }

  deleteMemberById(_id: string) {
    this.appService.deleteMember(_id).subscribe(members => (this.members = members));
  }

  viewMemberById(_id: string) {
    this.router.navigate(['/view_member/', _id]);
  }
}
