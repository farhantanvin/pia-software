using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Models
{
    public class AccountLedgerVM
    {
        public int Id { get; set; }
        public string AccountLedgerName { get; set; }
        public string AccountTypeName { get; set; }
        public string GroupLedgerName { get; set; }
        public string SubGroupLedgerName { get; set; }
        public string ControlLedgerName { get; set; }
    }
}
