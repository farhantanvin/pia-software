using pia_server_side_app.Models.common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Models
{
    public class DepartmentType : BaseEntity
    {
        public int Id { get; set; }
        
        [StringLength(200)]
        public string DepartmentTypeName { get; set; }
        public Boolean Status { get; set; }
    }
}
