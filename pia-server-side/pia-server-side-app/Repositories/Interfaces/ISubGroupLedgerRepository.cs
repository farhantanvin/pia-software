using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface ISubGroupLedgerRepository
    {
        Task<IEnumerable<SubGroupLedger>> Get();
        Task<SubGroupLedger> Get(int id);
        Task<SubGroupLedger> Create(SubGroupLedger subGroupLedger);
        Task Upadate(SubGroupLedger subGroupLedger);
        Task Delete(int id);
        Task<IEnumerable<SubGroupLedger>> CategorySelect(int id);
    }
}
