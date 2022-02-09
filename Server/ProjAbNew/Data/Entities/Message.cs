using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Data.Entities
{
    [Table("Message")]
    public class Message
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [StringLength(50)]
        [Column("FirstName")]
        public string FirstName { get; set; }

        [StringLength(50)]
        [Column("LastName")]
        public string LastName { get; set; }

        [StringLength(50)]
        [Column("Email")]
        public string Email { get; set; }

        [Column(TypeName = "date")]
        public DateTime DateSend { get; set; } = DateTime.Now;

        [StringLength(150)]
        [Column("Header")]
        public string Header { get; set; }

        [StringLength(50)]
        [Column("Phone")]
        public string Phone { get; set; }

        [Column("Body")]
        public string Body { get; set; }
    }
}


