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
    public class GroupLedgersController : ControllerBase
    {
            private readonly IGroupLedgerRepository _groupLedgerRepository;

            public GroupLedgersController(IGroupLedgerRepository groupLedgerRepository)
            {
                _groupLedgerRepository = groupLedgerRepository;
            }

            [HttpGet]
            public async Task<IEnumerable<GroupLedger>> GetGroupLedgers()
            {
                return await _groupLedgerRepository.Get();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<GroupLedger>> GetGroupLedgers(int id) => await _groupLedgerRepository.Get(id);

            [HttpPost]
            public async Task<ActionResult<GroupLedger>> PostGroupLedgers([FromBody] GroupLedger groupLedger)
            {
                var newGroupLedger = await _groupLedgerRepository.Create(groupLedger);
                return CreatedAtAction(nameof(GetGroupLedgers), new { id = newGroupLedger.Id }, newGroupLedger);

            }

            [HttpPut]
            public async Task<ActionResult<GroupLedger>> PutGroupLedgers([FromBody] GroupLedger groupLedger)
            {
                //if (id != groupLedger.Id)
               // {
                //    return BadRequest();
               // }

                await _groupLedgerRepository.Upadate(groupLedger);

                return NoContent();
            }

            [HttpDelete("{id}")]
            public async Task<ActionResult> Delete(int id)
            {
                var groupLedgerToDelete = await _groupLedgerRepository.Get(id);
                if (groupLedgerToDelete == null)
                    return NotFound();

                await _groupLedgerRepository.Delete(groupLedgerToDelete.Id);
                return NoContent();

            }

            [HttpGet("CategorySelect/{x}")]
            public async Task<IEnumerable<GroupLedger>> GetCategorySelect(int x)
            {
                return await _groupLedgerRepository.CategorySelect(x);
            }
    }   
}
