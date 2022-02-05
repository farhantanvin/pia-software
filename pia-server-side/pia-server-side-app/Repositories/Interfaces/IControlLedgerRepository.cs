using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface IControlLedgerRepository
    {
        Task<IEnumerable<ControlLedger>> Get();
        Task<ControlLedger> Get(int id);
        Task<ControlLedger> Create(ControlLedger controlLedger);
        Task Upadate(ControlLedger controlLedger);
        Task Delete(int id);
        Task<IEnumerable<ControlLedger>> CategorySelect(int id);
    }
}
