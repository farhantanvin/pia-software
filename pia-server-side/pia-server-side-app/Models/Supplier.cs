using pia_server_side_app.Models.common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Models
{
    public class Supplier : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(200)]
        public string SupplierName { get; set; }

        [StringLength(50)]
        public string SupplierPhone { get; set; }

        [StringLength(200)]
        public string SupplierEmail { get; set; }

        [StringLength(100)]
        public string SupplierWebsite { get; set; }

    
        [StringLength(250)]
        public string SupplierAddress { get; set; }

        public DateTime Date { get; set; }

        public int SupplierServiceTypes { get; set; }


    }
}
