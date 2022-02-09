using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Data.Entities
{
    [Table("User")]
    public class User
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }
        [MaxLength(50)]
        [Column("FirstName")]
        public string FirstName { get; set; }
        [MaxLength(50)]
        [Column("LastName")]
        public string LastName { get; set; }
        [MaxLength(50)]
        [Column("Password")]
        public string Password { get; set; }
        [MaxLength(50)]
        [Column("Email")]
        public string Email { get; set; }
        [MaxLength(50)]
        [Column("Role")]
        public string Role { get; set; }
    }
}
