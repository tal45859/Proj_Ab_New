using ProjAbNew.Data;
using ProjAbNew.Data.DTO;
using ProjAbNew.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Services
{
    public class MessageService
    {
        //תקציר 
        ///////
        //בנאי
        //הוספת הודעה
        //החזרת רשימת הודעות
        //החזרת הודעה אחת על פי מזהה לשימוש פנימי
        //החזרת הודעה אחת לפי מייל
        //מחיקת הודעה


        private readonly ProjABDBCotext m_db;

        //בנאי
        public MessageService(ProjABDBCotext db)
        {
            m_db = db;
        }

        //הוספת הודעה
        public bool AddMessage(MessageDTO Message)
        {
            Message newMessage = new Message();
            newMessage.FirstName = Message.FirstName;
            newMessage.LastName = Message.LastName;
            newMessage.Email = Message.Email;
            newMessage.DateSend = Message.DateSend;
            newMessage.Header = Message.Header;
            newMessage.Phone = Message.Phone;
            newMessage.Body = Message.Body;
            m_db.Message.Add(newMessage); 
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //החזרת רשימת הודעות
        public List<Message> GeAlltMessages()
        {
            return m_db.Message.ToList();
        }

        //החזרת הודעה אחת על פי מזהה לשימוש פנימי
        public Message GetSingleMessage(int id)
        {

            return m_db.Message.Where(Message => Message.Id == id).FirstOrDefault();
        }

        //החזרת הודעה אחת לפי מייל
        public Message GetSingleMessageByMail(string mail)
        {

            return m_db.Message.Where(Message => Message.Email == mail).FirstOrDefault();
        }

        //מחיקת הודעה
        public ResponseDTO DeleteMessage(int id)
        {
            Message MessageToDelete = GetSingleMessage(id);
            ResponseDTO response = new ResponseDTO();
            if (MessageToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Message with id:{id} not found in DB"
                };
            }
            m_db.Message.Remove(MessageToDelete);
            m_db.SaveChanges();
            response.StatusText = $"ההודעה נמחקה בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }

     
    }
}
