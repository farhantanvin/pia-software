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
    public class ControlLedgerRepository : IControlLedgerRepository
    {
        private readonly ApplicationDbContext _context;

        public ControlLedgerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ControlLedger> Create(ControlLedger controlLedger)
        {
            _context.ControlLedgers.Add(controlLedger);
            await _context.SaveChangesAsync();
            return controlLedger;
        }

        public async Task Delete(int id)
        {
            var ControlLedgerToDelete = await _context.ControlLedgers.FindAsync(id);
            _context.ControlLedgers.Remove(ControlLedgerToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ControlLedger>> Get()
        {
            return await _context.ControlLedgers.ToListAsync();
        }

        public async Task<ControlLedger> Get(int id)
        {
            return await _context.ControlLedgers.FindAsync(id);
        }

        public async Task Upadate(ControlLedger controlLedger)
        {
            _context.Entry(controlLedger).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ControlLedger>> CategorySelect(int id)
        {
            return await _context.ControlLedgers.Where(s => s.SubGroupLedgerId == id).ToListAsync();
        }
    }
}
