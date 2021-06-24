using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ModelViewerEditor.Data;
using ModelViewerEditor.Models;

namespace ModelViewerEditor.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {

        private readonly ILogger<ProjectController> _logger;
        private readonly DataService _dataService;
        public ProjectController(ILogger<ProjectController> logger, DataService dataService)
        {
            _logger = logger;
            _dataService = dataService;
        }
        
        [HttpGet]
        public IEnumerable<ProjectModel> Get()
        {
            return _dataService.FindAll();
        }
        
        [HttpGet("{id}", Name = "FindOne")]
        public ActionResult<WeatherForecast> Get(ObjectId id)
        {
            var result = _dataService.FindOne(id);
            if (result != default)
                return Ok(result);
            else
                return NotFound();
        }
        
        [HttpPost]
        public ActionResult<WeatherForecast> Insert(ProjectModel dto)
        {
            var id = _dataService.Insert(dto);
            if (id != default)
                return CreatedAtRoute("FindOne", new { id = id }, dto);
            else
                return BadRequest();
        }

        [HttpPut]
        public ActionResult<WeatherForecast> Update(ProjectModel dto)
        {
            var result = _dataService.Update(dto);
            if (result)
                return NoContent();
            else
                return NotFound();
        }

        [HttpDelete("{id}")]
        public ActionResult<ProjectModel> Delete(ObjectId id)
        {
            var result = _dataService.Delete(id);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }
    }
}