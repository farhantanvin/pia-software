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
    public class SubGroupLedgerRepository : ISubGroupLedgerRepository
    {
        private readonly ApplicationDbContext _context;

        public SubGroupLedgerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SubGroupLedger> Create(SubGroupLedger subGroupLedger)
        {
            _context.SubGroupLedgers.Add(subGroupLedger);
            await _context.SaveChangesAsync();
            return subGroupLedger;
        }

        public async Task Delete(int id)
        {
            var SubGroupLedgerToDelete = await _context.SubGroupLedgers.FindAsync(id);
            _context.SubGroupLedgers.Remove(SubGroupLedgerToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<SubGroupLedger>> Get()
        {
            return await _context.SubGroupLedgers.ToListAsync();
        }

        public async Task<SubGroupLedger> Get(int id)
        {
            return await _context.SubGroupLedgers.FindAsync(id);
        }

        public async Task Upadate(SubGroupLedger subGroupLedger)
        {
            _context.Entry(subGroupLedger).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<SubGroupLedger>> CategorySelect(int id)
        {
            return await _context.SubGroupLedgers.Where(s => s.GroupLedgerId == id).ToListAsync();
        }

    }
}
