using Microsoft.EntityFrameworkCore;
using ProjAbNew.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjAbNew.Data
{
    public class ProjABDBCotext: DbContext
    {

        public ProjABDBCotext(DbContextOptions<ProjABDBCotext> options) : base(options)
        {

        }
        public virtual DbSet<Message> Message { get; set; }//map Message table
        public virtual DbSet<User> User { get; set; }//map users table`
        public virtual DbSet<Image> Image { get; set; }//map Image table`
        public virtual DbSet<Post> Post { get; set; }//map Post table`
    }
}
