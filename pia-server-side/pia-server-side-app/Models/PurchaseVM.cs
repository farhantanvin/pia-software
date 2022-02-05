using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Models
{
    public class PurchaseVM
    {
        public int BranchId { get; set; }
        ///public DateTime RequisitionDate { get; set; }
        public int DepartmentTypeId { get; set; }

        [StringLength(200)]
       public string Remarks { get; set; }

       // public DateTime DeliveryDate { get; set; }

       public Boolean Status { get; set; }

        public List<Detail> PurchaseRequisitionDetails { get; set; }
    }
    public class Detail
    {
        
        public int quantity { get; set; }
        public int requisitionPrice { get; set; }
        public int unit { get; set; }
        public int brandId { get; set; }
    }
}
