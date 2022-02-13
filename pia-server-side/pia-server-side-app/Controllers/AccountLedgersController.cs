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
    public class AccountLedgersController : ControllerBase
    {
        private readonly IAccountLedgerRepository _accountLedgerRepository;

        public AccountLedgersController(IAccountLedgerRepository accountLedgerRepository)
        {
            _accountLedgerRepository = accountLedgerRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<AccountLedgerVM>> GetAccountLedgers()
        {
            return await _accountLedgerRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AccountLedger>> GetAccountLedgers(int id)
        {
            return await _accountLedgerRepository.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult<AccountLedger>> PostAccountLedgers([FromBody] AccountLedger accountLedger)
        {
            var newAccountLedger = await _accountLedgerRepository.Create(accountLedger);
            return CreatedAtAction(nameof(GetAccountLedgers), new { id = newAccountLedger.Id }, newAccountLedger);

        }

        [HttpPut]
        public async Task<ActionResult<AccountLedger>> PutAccountLedgers([FromBody] AccountLedger accountLedger)
        {
            //if (id != accountLedger.Id)
           // {
             //   return BadRequest();
          //  }

            await _accountLedgerRepository.Upadate(accountLedger);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var accountLedgerToDelete = await _accountLedgerRepository.Get(id);
            if (accountLedgerToDelete == null)
                return NotFound();

            await _accountLedgerRepository.Delete(accountLedgerToDelete.Id);
            return NoContent();

        }

    }
}
