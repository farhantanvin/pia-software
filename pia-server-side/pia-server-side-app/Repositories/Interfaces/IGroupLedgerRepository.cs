using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface IGroupLedgerRepository
    {
        Task<IEnumerable<GroupLedger>> Get();
        Task<GroupLedger> Get(int id);
        Task<GroupLedger> Create(GroupLedger groupLedger);
        Task Upadate(GroupLedger groupLedger);
        Task Delete(int id);
        Task<IEnumerable<GroupLedger>> CategorySelect(int id);
    }
}
