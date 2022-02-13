using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pia_server_side_app.Models;
using pia_server_side_app.Models.Contexts;
using pia_server_side_app.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Repositories
{
    public class AccountLedgerRepository : IAccountLedgerRepository
    {
        private readonly ApplicationDbContext _context;

        public AccountLedgerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AccountLedger> Create(AccountLedger accountLedger)
        {
            _context.AccountLedgers.Add(accountLedger);
            await _context.SaveChangesAsync();
            return accountLedger;
        }

        public async Task Delete(int id)
        {
            var AccountLedgerToDelete = await _context.AccountLedgers.FindAsync(id);
            _context.AccountLedgers.Remove(AccountLedgerToDelete);
            await _context.SaveChangesAsync();
        }


       
        public async Task<IEnumerable<AccountLedgerVM>> Get()
        {

            var AccountLedger = (from a in _context.AccountLedgers
                                 join at in _context.AccountTypes on a.AccountTypeId equals at.Id
                                 join gl in _context.GroupLedgers on a.GroupLedgerId equals gl.Id
                                 join sgl in _context.SubGroupLedgers on a.SubGroupLedgerId equals sgl.Id
                                 join cl in _context.ControlLedgers on a.ControlLedgerId equals cl.Id

                                 select new AccountLedgerVM()
                                 {
                                     Id = a.Id,
                                     AccountLedgerName = a.AccountLedgerName,
                                     AccountTypeName = at.AccountTypeName,
                                     GroupLedgerName = gl.GroupLedgerName,
                                     SubGroupLedgerName = sgl.SubGroupLedgerName,
                                     ControlLedgerName = cl.ControlLedgerName

                                 }
                ).ToListAsync();

            return await AccountLedger;
        }
        

        public async Task<AccountLedger> Get(int id)
        {
            return await _context.AccountLedgers.FindAsync(id);
        }

        public async Task Upadate(AccountLedger accountLedger)
        {
            _context.Entry(accountLedger).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }
   }

    

