using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pia_server_side_app.Models;
using pia_server_side_app.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubGroupLedgersController : ControllerBase
    {
        private readonly ISubGroupLedgerRepository _subGroupLedgerRepository;

        public SubGroupLedgersController(ISubGroupLedgerRepository subGroupLedgerRepository)
        {
            _subGroupLedgerRepository = subGroupLedgerRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<SubGroupLedger>> GetSubGroupLedgers()
        {
            return await _subGroupLedgerRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubGroupLedger>> GetSubGroupLedgers(int id) => await _subGroupLedgerRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<SubGroupLedger>> PostSubGroupLedgers([FromBody] SubGroupLedger subGroupLedger)
        {
            var newSubGroupLedger = await _subGroupLedgerRepository.Create(subGroupLedger);
            return CreatedAtAction(nameof(GetSubGroupLedgers), new { id = newSubGroupLedger.Id }, newSubGroupLedger);

        }

        [HttpPut]
        public async Task<ActionResult<SubGroupLedger>> PutSubGroupLedgers([FromBody] SubGroupLedger subGroupLedger)
        {
           // if (id != subGroupLedger.Id)
           // {
            //    return BadRequest();
           // }

            await _subGroupLedgerRepository.Upadate(subGroupLedger);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var subGroupLedgerToDelete = await _subGroupLedgerRepository.Get(id);
            if (subGroupLedgerToDelete == null)
                return NotFound();

            await _subGroupLedgerRepository.Delete(subGroupLedgerToDelete.Id);
            return NoContent();

        }

        [HttpGet("CategorySelect/{x}")]
        public async Task<IEnumerable<SubGroupLedger>> GetCategorySelect(int x)
        {
            return await _subGroupLedgerRepository.CategorySelect(x);
        }
    }
}

