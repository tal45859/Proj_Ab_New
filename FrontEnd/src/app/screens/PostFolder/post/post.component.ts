import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public StageNumber=1;
  public Auth = this.HttpLogin.ShareAuth;
  constructor(private HttpLogin:LoginService) { }

  ngOnInit(): void {
  }

}
