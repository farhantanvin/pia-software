using pia_server_side_app.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pia_server_side_app.Models.Contexts;

namespace pia_server_side_app.Repositories
{
    public class AccountTypeRepository : IAccountTypeRepository
    {
        private readonly ApplicationDbContext _context;

        public AccountTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<AccountType> Create(AccountType accountType)
        {
            _context.AccountTypes.Add(accountType);
            await _context.SaveChangesAsync();
            return accountType;
        }

        public async Task Delete(int id)
        {
            var accountTypeToDelete = await _context.AccountTypes.FindAsync(id);
            _context.AccountTypes.Remove(accountTypeToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<AccountType>> Get()
        {
            return await _context.AccountTypes.ToListAsync();
        }

        public async Task<AccountType> Get(int id)
        {
            return await _context.AccountTypes.FindAsync(id);
        }

        public async Task Upadate(AccountType accountType)
        {
            _context.Entry(accountType).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
