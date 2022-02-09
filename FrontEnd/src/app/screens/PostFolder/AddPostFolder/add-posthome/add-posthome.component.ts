import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-posthome',
  templateUrl: './add-posthome.component.html',
  styleUrls: ['./add-posthome.component.css']
})
export class AddPosthomeComponent implements OnInit {
  public Stage=1;
  public PostId:number;
  constructor() { }

  ngOnInit(): void {
  }


  ChangeStage(stage:number)
  {
    this.Stage=stage;
  }

  ChangePostId(id:number)
  {
    this.PostId=id;
  }

}
