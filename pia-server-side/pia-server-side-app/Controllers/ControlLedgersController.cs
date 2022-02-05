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
    public class ControlLedgersController : ControllerBase
    {
        private readonly IControlLedgerRepository _controlLedgerRepository;

        public ControlLedgersController(IControlLedgerRepository controlLedgerRepository)
        {
            _controlLedgerRepository = controlLedgerRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ControlLedger>> GetControlLedgers()
        {
            return await _controlLedgerRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ControlLedger>> GetControlLedgers(int id) => await _controlLedgerRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<ControlLedger>> PostControlLedgers([FromBody] ControlLedger controlLedger)
        {
            var newControlLedger = await _controlLedgerRepository.Create(controlLedger);
            return CreatedAtAction(nameof(GetControlLedgers), new { id = newControlLedger.Id }, newControlLedger);

        }

        [HttpPut]
        public async Task<ActionResult<ControlLedger>> PutControlLedgers([FromBody] ControlLedger controlLedger)
        {
            //if (id != controlLedger.Id)
           // {
             //   return BadRequest();
           // }

            await _controlLedgerRepository.Upadate(controlLedger);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var controlLedgerToDelete = await _controlLedgerRepository.Get(id);
            if (controlLedgerToDelete == null)
                return NotFound();

            await _controlLedgerRepository.Delete(controlLedgerToDelete.Id);
            return NoContent();
        }

        [HttpGet("CategorySelect/{x}")]
        public async Task<IEnumerable<ControlLedger>> GetCategorySelect(int x)
        {
            return await _controlLedgerRepository.CategorySelect(x);
        }
    }
}
