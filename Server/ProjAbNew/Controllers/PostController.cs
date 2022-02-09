using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjAbNew.Data.DTO;
using ProjAbNew.Data.Entities;
using ProjAbNew.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        //תקציר
        /////////
        //הוספת מודעה
        //קבלת המודעה האחרונה שהועלתה
        //קבלת כל המודעות
        //קבלת מודעה פי מזהה מודעה
        //עדכון מודעה לפי מזהה מודעה
        //מחיקת מודעה לפי מזהה מודעה

        private readonly PostService _service;

        public PostController(PostService service)
        {
            _service = service;
        }

        //הוספת מודעה
        [Route("AddPost")]
        [HttpPost]
        public ActionResult AddPost([FromBody] PostDTO PostToSave)
        {
            bool isok = _service.AddPost(PostToSave);
            if (isok)
            {
                return Created("", null);
            }
            return BadRequest("לא הצלחנו לשמור את המוצר");
        }

        //קבלת המודעה האחרונה שהועלתה
        [Route("GetLastPost")]
        [HttpGet]
        public ActionResult GetLastPost()
        {
            Post post = _service.GetLastPost();
            if (post != null) 
            {
                return Ok(post);
            }
            return BadRequest();
        }

        //קבלת כל המודעות
        [AllowAnonymous]
        [Route("GetAllPost")]
        [HttpGet]
        public ActionResult GetAllPost()
        {
            List<Post> Lpost = _service.GetAllPost().ToList();
            if (Lpost != null)
            {
                return Ok(Lpost);
            }
            return BadRequest("לא נמצאה רשימת מודעות");
        }

        //קבלת מודעה פי מזהה מודעה
        [AllowAnonymous]
        [Route("GetPostById/{id}")]
        [HttpGet]
        public ActionResult GetPostById(int id)
        {
            Post post = _service.GetPostById(id);
            if (post != null)
            {
                return Ok(post);
            }
            return BadRequest("לא נמצא מודעה בעלת מזהה זה");
        }

        //עדכון מודעה לפי מזהה מודעה
        [Route("UpdatePost/{id}")]
        [HttpPut]
        public ActionResult UpdatePost([FromBody] PostDTO PostToUpdate, int id)
        {
            ResponseDTO res = _service.UpdatePost(PostToUpdate, id);
            //if (res.Status == Data.DTO.StatusCode.Success)
            //{
            //    return Ok(res);
            //}
            //return BadRequest(res);
            return Ok(res);
        }

        //מחיקת מודעה לפי מזהה מודעה
        [Route("DeletePostById/{id}")]
        [HttpDelete]
        public ActionResult DeletePostById( int id)
        {
            ResponseDTO res = _service.DeletePost(id);
            if (res.Status == Data.DTO.StatusCode.Success)
            {
                return Ok();
            }
            return BadRequest(res);
        }

    }
}
