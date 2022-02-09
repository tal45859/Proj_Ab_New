import { Post } from './../../../../model/Post';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-post-home',
  templateUrl: './update-post-home.component.html',
  styleUrls: ['./update-post-home.component.css']
})
export class UpdatePostHomeComponent implements OnInit {
  @Input() PostId:number;
  public PostObj:Post={};
  public Stage = 1;
  constructor() { }

  ngOnInit(): void {
  }

  public ChangeStage(stg:number)
  {
      this.Stage = stg;
  }

  public ChangePostObj(post:Post)
  {
    this.PostObj=post;
  }
}
