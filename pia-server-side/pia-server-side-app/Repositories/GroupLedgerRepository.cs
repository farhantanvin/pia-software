using pia_server_side_app.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pia_server_side_app.Models.Contexts;
using pia_server_side_app.Models;

namespace pia_server_side_app.Repositories
{
    public class GroupLedgerRepository : IGroupLedgerRepository
    {
        private readonly ApplicationDbContext _context;

        public GroupLedgerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<GroupLedger> Create(GroupLedger groupLedger)
        {
            _context.GroupLedgers.Add(groupLedger);
            await _context.SaveChangesAsync();
            return groupLedger;
        }

        public async Task Delete(int id)
        {
            var GroupLedgerToDelete = await _context.GroupLedgers.FindAsync(id);
            _context.GroupLedgers.Remove(GroupLedgerToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<GroupLedger>> Get()
        {
            return await _context.GroupLedgers.ToListAsync();
        }

        public async Task<GroupLedger> Get(int id)
        {
            return await _context.GroupLedgers.FindAsync(id);
        }

        public async Task Upadate(GroupLedger groupLedger)
        {
            _context.Entry(groupLedger).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<GroupLedger>> CategorySelect(int id)
        {
            return await _context.GroupLedgers.Where(s => s.AccountTypeId == id).ToListAsync();
        }
    }
}
