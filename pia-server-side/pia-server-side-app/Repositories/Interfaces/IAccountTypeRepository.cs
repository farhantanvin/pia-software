using pia_server_side_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories
{
    public interface IAccountTypeRepository
    {
        Task<IEnumerable<AccountType>> Get();
        Task<AccountType> Get(int id);
        Task<AccountType> Create(AccountType accountType);
        Task Upadate(AccountType accountType);
        Task Delete(int id);
    }
}
