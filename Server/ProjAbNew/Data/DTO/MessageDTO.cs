using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Data.DTO
{
    public class MessageDTO
    {


        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public DateTime DateSend { get; set; } = DateTime.Now;

        public string Header { get; set; }

        public string Phone { get; set; }

        public string Body { get; set; }
    }
}
