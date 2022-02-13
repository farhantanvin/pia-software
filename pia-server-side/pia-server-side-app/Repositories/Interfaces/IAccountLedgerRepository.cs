using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories.Interfaces
{
    public interface IAccountLedgerRepository
    {
        Task<IEnumerable<AccountLedgerVM>> Get();
        Task<AccountLedger> Get(int id);
        Task<AccountLedger> Create(AccountLedger accountLedger);
        Task Upadate(AccountLedger accountLedger);
        Task Delete(int id);

    }
}
