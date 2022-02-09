import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/model/Image';
import { Post } from 'src/app/model/Post';
import { ImageService } from 'src/app/services/Image.service';
import { PostService } from 'src/app/services/Post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  @Output() StageOUT = new EventEmitter<number>();
  @Input() PostId:number;
  public ObjToUpdatePost:Post={};
  public ImageArr:Array<Image>=[];
  constructor(private HttpPost:PostService,private HttpImage:ImageService) { }

  async ngOnInit(): Promise<void> {
    await this.GetPostById();
    await this.GetAllImageByPostId();
  }
// ObjToUpdatePost.Header {{ObjToUpdatePost.About}}
  async GetPostById()
  {
    this.ObjToUpdatePost = await this.HttpPost.GetPostById(this.PostId);
  }

  async GetAllImageByPostId()
  {
    this.ImageArr = await this.HttpImage.GetAllImageByPostId(this.PostId);
  }

  public ChangeStage()
  {
    this.StageOUT.emit(1);
  }

}
