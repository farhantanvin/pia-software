using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pia_server_side_app.Models;
using pia_server_side_app.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AccountTypesController : ControllerBase
    {

        private readonly IAccountTypeRepository _accountTypeRepository;

        public AccountTypesController(IAccountTypeRepository accounTypeRepository)
        {
            _accountTypeRepository = accounTypeRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<AccountType>> GetAccountTypes()
        {
            return await _accountTypeRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AccountType>> GetAccountTypes(int id) => await _accountTypeRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<AccountType>> PostAccountTypes([FromBody] AccountType accountType)
        {
            var newAccountType = await _accountTypeRepository.Create(accountType);
            return CreatedAtAction(nameof(GetAccountTypes), new { id = newAccountType.Id }, newAccountType);

        }

        [HttpPut]
        public async Task<ActionResult<AccountType >> PutAccountTypes([FromBody] AccountType accountType)
        {
            //if (id != accountType.Id)
           // {
            //    return BadRequest();
          //  }

            await _accountTypeRepository.Upadate(accountType);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var accountTypeToDelete = await _accountTypeRepository.Get(id);
            if (accountTypeToDelete == null)
                return NotFound();

            await _accountTypeRepository.Delete(accountTypeToDelete.Id);
            return NoContent();
        }
    }
}
