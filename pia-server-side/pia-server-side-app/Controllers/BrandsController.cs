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
    public class BrandsController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;

        public BrandsController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Brand>> GetBrands()
        {
            return await _brandRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrands(int id) => await _brandRepository.Get(id);

        [HttpPost]
        public async Task<ActionResult<Brand>> PostAccountTypes([FromBody] Brand brand)
        {
            var newBrand = await _brandRepository.Create(brand);
            return CreatedAtAction(nameof(GetBrands), new { id = newBrand.Id }, newBrand);

        }

        [HttpPut]
        public async Task<ActionResult<Brand>> PutBrands([FromBody] Brand brand)
        {
            //if (id != brand.Id)
            // {
            //    return BadRequest();
            //  }

            await _brandRepository.Upadate(brand);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var brandToDelete = await _brandRepository.Get(id);
            if (brandToDelete == null)
                return NotFound();

            await _brandRepository.Delete(brandToDelete.Id);
            return NoContent();
        }
    }
}

