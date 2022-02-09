import { ImageService } from './../../../../services/Image.service';
import { PostValidationService } from './../../../../services/PostValidation.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/Post.service';


@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  @Output() StageOUT = new EventEmitter<number>();
  @Output() PostObjForFather = new EventEmitter<Post>();
  @Input() postId:number;
  public Response:Array<ResponseValidation>=[{Isok:true,Message:''},{Isok:true,Message:''}];
  public ObjToUpdatePost:Post={};
  constructor(private HttpPost:PostService,private PostValidation:PostValidationService) { }

  async ngOnInit(): Promise<void> {
    await this.GetPostById();
  }

  async GetPostById()
  {
    this.ObjToUpdatePost = await this.HttpPost.GetPostById(this.postId);
  }

  async OnClickUpdatePost()
  {
    this.Response[0] = await this.PostValidation.CheckHedaer(this.ObjToUpdatePost.Header);
    this.Response[1] = await this.PostValidation.CheckAbout(this.ObjToUpdatePost.About);
    if(!this.Response[0].Isok || !this.Response[1].Isok)
    {
      return;
    }
    this.PostObjForFather.emit(this.ObjToUpdatePost);//שליחת המודעה החדשה
    this.StageOUT.emit(2);// המשך לשלב הבא
  }
  
}
