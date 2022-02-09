using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjAbNew.Data.DTO;
using ProjAbNew.Data.Entities;
using ProjAbNew.Services;

namespace ProjAbNew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        //תקציר
        /////////
        //בנאי
        //הזדאות
        //הוספת משתמש
        //בדיקה האם קיים מייל במערכת
        //JWT קבלת מי אותו משתמש על פי
        //קבלת כל המשתמשים
        //קבלת משתמש בודד לפי מייל
        //JWT עדכון משתמש על פי
        //JWT מחיקת משתמש על פי
        //מחיקת משתמש מוגבל למנהל

        private readonly UserService _service;
        private readonly JwtService _jwService;

        //בנאי
        public UserController(UserService service, JwtService jwService)//JwtService jwService
        {
            _service = service;
           _jwService = jwService;
        }

        //הזדאות
       [Route("{auth}")]
       [HttpPost] 
       [AllowAnonymous]
        public IActionResult Auth([FromBody]AuthRequestDTO request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("יש להזין אימל וסיסמה");
            }
            User UserFoundinDb = _service.GetUser(request.Email, request.Password);
            if (UserFoundinDb != null)
            {
                string token = _jwService.GenerateToken(UserFoundinDb.Id.ToString(),UserFoundinDb.Role);
                return Ok(token);
            }
            return Unauthorized("משתמש לא מזוהה במערכת");
        }

        //הוספת משתמש
        [Authorize(Roles ="Admin")]
        [Route("AddUser")]
        [HttpPost]
        public ActionResult AddUser([FromBody] UserDTO user)
        {
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("שדות אימייל וסיסמה הינם חובם");
            }
            bool Ok = _service.AddUser(user);
            if (Ok)
            {
                return Created("", null);
            }
            throw new Exception("problem when trying add user to db");
        }

        //בדיקה האם קיים מייל במערכת
        [Authorize(Roles = "Admin")]
        [Route("CheckEmail/{Email}")]
        [HttpGet]
        public ActionResult CheckEmail(string Email)
        {
            return Ok(_service.CheckEmail(Email));
        }

        //JWT קבלת מי אותו משתמש על פי
        [Route("GetUserByJWT")]
        [HttpGet]
        public ActionResult GetUserByJWT()
        {
            User User = _service.GetUserByJWT();
            return Ok(User);
        }

        //קבלת כל המשתמשים
        [Authorize(Roles = "Admin")]
        [Route("GetAllUsers")]
        [HttpGet]
        public ActionResult GetAllUsers()
        {
            List<User> LUser = _service.GetAllUsers();
            LUser.ForEach(u => u.Password = null);
            return Ok(LUser);
        }

        //קבלת משתמש בודד לפי מייל
        [Authorize(Roles = "Admin")]
        [Route("GetSingleUserByMail/{mail}")]
        [HttpGet]
        public ActionResult GetSingleUserByMail(string mail)
        {
            User User = _service.GetSingleUserByMail(mail);
            User.Password = null;
            return Ok(User);
        }


        //JWT עדכון משתמש על פי
        [Route("UpdateUserByJWT")]
        [HttpPut]
        public ActionResult UpdateUserByJWT( [FromBody] UserDTO user)
        {
            ResponseDTO res = _service.UpdateUser(user);
            return Ok(res);
        }


        //JWT מחיקת משתמש על פי
        [Route("DeleteUserByJWT")]
        [HttpDelete]
        public ActionResult DeleteUserByJWT()
        {
            ResponseDTO res = _service.DeleteUser();
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        //מחיקת משתמש מוגבל למנהל
        [Authorize(Roles = "Admin")]
        [Route("DeleteUserForAdmin/{id}")]
        [HttpDelete]
        public ActionResult DeleteUserForAdmin(int id)
        {
            ResponseDTO res = _service.DeleteUserForAdmin(id);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }
    }
}