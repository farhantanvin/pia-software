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
    public class ConditionRepository: IConditionRepository
    {
        private readonly ApplicationDbContext _context;

        public ConditionRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Condition> Create(Condition condition)
        {
            _context.Conditions.Add(condition);
            await _context.SaveChangesAsync();
            return condition;
        }

        public async Task Delete(int id)
        {
            var conditionToDelete = await _context.Conditions.FindAsync(id);
            _context.Conditions.Remove(conditionToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Condition>> Get()
        {
            return await _context.Conditions.ToListAsync();
        }

        public async Task<Condition> Get(int id)
        {
            return await _context.Conditions.FindAsync(id);
        }

        public async Task Upadate(Condition condition)
        {
            _context.Entry(condition).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
