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
    public class MessageController : ControllerBase
    {
        //תקציר
        ///////////
        //בנאי
        //הוספת הודעה
        //קבלת כל ההודעות
        //קבלת הודעה לפי מייל
        //מחיקת הודעה

        private readonly MessageService _service;

        //בנאי
        public MessageController(MessageService service)
        {
            _service = service;
        }

        //הוספת הודעה
        [Route("AddMessage")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Add([FromBody] MessageDTO Message)
        {
            bool Ok = _service.AddMessage(Message);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }


        //קבלת כל ההודעות
        [Route("GetAllMessages")]
        [HttpGet]
        public ActionResult GetAllMessages()
        {
            List<Message> LMessages = _service.GeAlltMessages();
            return Ok(LMessages);
        }

        //קבלת הודעה לפי מייל
        [Route("GetSingleMessageByMail/{Mail}")]
        [HttpGet]
        public ActionResult GetSingleMessageByMail(string Mail)
        {
            Message message = _service.GetSingleMessageByMail(Mail);
            return Ok(message);
        }


        //מחיקת הודעה
        [Route("DeleteMessage/{id}")]
        [HttpDelete]
        public ActionResult DeleteMessage(int id)
        {
            ResponseDTO res = _service.DeleteMessage(id);
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