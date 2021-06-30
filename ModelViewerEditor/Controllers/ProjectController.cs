using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using ModelViewerEditor.Data;
using ModelViewerEditor.Helpers;
using ModelViewerEditor.Models;

namespace ModelViewerEditor.Controllers
{
    [ApiController]
    public class ProjectController : ControllerBase
    {

        private readonly ILogger<ProjectController> _logger;
        private readonly IDataService _dataService;
        public ProjectController(ILogger<ProjectController> logger, IDataService dataService)
        {
            _logger = logger;
            _dataService = dataService;
        }
        
        [HttpGet("get-projects")]
        public IEnumerable<ProjectModel> GetAll()
        {
            return _dataService.GetAll();
        }
        
        [HttpGet("get-project", Name = nameof(GetOne))]
        public ActionResult<ProjectModel> GetOne(string id)
        {
            if (!id.IsObjectId())
                return NotFound();
            
            var result = _dataService.Get(new ObjectId(id));
            return result != default ? Ok(result) : NotFound();
        }
        
        
       
        [HttpPost("add-project")]
        public ActionResult AddProject([FromBody]string name)
        {
            var p = new ProjectModel {Name = name};
            var id = _dataService.Insert(p);
            if (id != default)
                return CreatedAtAction(nameof(GetOne), new { id = id });
               // return NoContent();
            return BadRequest();
        }
        
        [HttpPost("add-section")]
        public ActionResult AddSection(SectionNameRequestDto requestNameRequestDto)
        {
            if (!requestNameRequestDto.ProjectId.IsObjectId())
            {
                return BadRequest("Project not found");
            }
            
            if (requestNameRequestDto.SectionName.IsNullOrWhitespace())
            {
                return BadRequest("Section name missing");
            }
            
            var project = _dataService.Get(new ObjectId(requestNameRequestDto.ProjectId));
            if (project == null)
            {
                return BadRequest("Project not found");
            }   
            
            if(project.Sections.Any(x => string.Equals(x.Name, requestNameRequestDto.SectionName, StringComparison.CurrentCultureIgnoreCase)))
            {
                return BadRequest("There is already a section with this name");
            }
            
            var section = new SectionModel {Name = requestNameRequestDto.SectionName.Trim()};
            project.Sections.Add(section);
            
            _dataService.Update(project);
            
            return NoContent();
        }
        
                
        [HttpPost("add-model")]
        public ActionResult AddModel(AddModelDto dto)
        {
            if (!dto.ProjectId.IsObjectId())
            {
                return BadRequest("Project not found");
            }
            
            if (!dto.SectionId.IsObjectId())
            {
                return BadRequest("Section not found");
            }
            
            if (dto.ModelName.IsNullOrWhitespace())
            {
                return BadRequest("Model name missing");
            }
            
            var project = _dataService.Get(new ObjectId(dto.ProjectId));
            if (project == null)
            {
                return BadRequest("Project not found");
            }

            var section = project.Sections.FirstOrDefault(x => x.Id.ToString() == dto.SectionId);

            if (section == null)
            {
                return BadRequest("Section not found"); 
            }
            
            if(section.Models.Any(x => string.Equals(x.Name, dto.ModelName, StringComparison.CurrentCultureIgnoreCase)))
            {
                return BadRequest("There is already a model with this name");
            }
            
            var model = new ObjectModel() {Name = dto.ModelName.Trim()};
            
            section.Models.Add(model);
            
            _dataService.Update(project);
            
            return NoContent();
        }
                
        [HttpPost("delete-project")]
        public ActionResult DeleteProject([FromBody] string projectId)
        {
            if (!projectId.IsObjectId())
            {
                return BadRequest("Project not found");
            }
            
            _dataService.Delete(new ObjectId(projectId));
            
            return NoContent();
        }
        
        [HttpPost("delete-section")]
        public ActionResult DeleteSection(DeleteSectionDto dto)
        {
            if (!dto.ProjectId.IsObjectId())
            {
                return BadRequest("Project not found");
            }
            
            if (!dto.SectionId.IsObjectId())
            {
                return BadRequest("Section not found");
            }
            
            var project = _dataService.Get(new ObjectId(dto.ProjectId));
            if (project == null)
            {
                return BadRequest("Project not found");
            }   
            
            var section= project.Sections.FirstOrDefault(x => string.Equals(x.Id.ToString(), dto.SectionId, StringComparison.CurrentCultureIgnoreCase));

            if (section != null)
            {
                project.Sections.Remove(section);
            }
            
            _dataService.Update(project);
            
            return NoContent();
        }
        
        [HttpPost("delete-model")]
        public ActionResult DeleteModel(DeleteModelDto dto)
        {
            if (!dto.ProjectId.IsObjectId())
            {
                return BadRequest("Project not found");
            }
            
            if (!dto.SectionId.IsObjectId())
            {
                return BadRequest("Section not found");
            }
            
            if (!dto.ModelId.IsObjectId())
            {
                return BadRequest("Model not found");
            }
            
            var project = _dataService.Get(new ObjectId(dto.ProjectId));
            if (project == null)
            {
                return BadRequest("Project not found");
            }   
            
            var section= project.Sections.FirstOrDefault(x => string.Equals(x.Id.ToString(), dto.SectionId, StringComparison.CurrentCultureIgnoreCase));
            if (section == null)
            {
                return BadRequest("Section not found");
            }  
            
            var model= section.Models.FirstOrDefault(x => string.Equals(x.Id.ToString(), dto.ModelId, StringComparison.CurrentCultureIgnoreCase));

            if (model != null)
            {
                section.Models.Remove(model);
            }
            
            _dataService.Update(project);
            
            return NoContent();
        }


        [HttpGet("project-exists")]
        public ActionResult<bool> ProjectExists(string name)
        {
            var result = _dataService.Exists(x => x.Name.ToLower() == name.ToLower());
            return Ok(result);
        }

        
        [HttpGet("section-exists")]
        public ActionResult<bool> SectionExists(SectionNameRequestDto requestNameRequestDto)
        {
            if (!requestNameRequestDto.ProjectId.IsObjectId())
            {
                return BadRequest("Project not found");
            }

            if (requestNameRequestDto.SectionName.IsNullOrWhitespace())
            {
                return BadRequest("Section name missing");
            }

            var project = _dataService.Get(new ObjectId(requestNameRequestDto.ProjectId));
            if (project == null)
            {
                return BadRequest("Project not found");
            }

            return project.Sections.Any(x =>
                string.Equals(x.Name, requestNameRequestDto.SectionName, StringComparison.CurrentCultureIgnoreCase));
          

        }
        
        
        


        [HttpGet("model-exists")]
        public ActionResult<bool> ModelExists(AddModelDto dto)
        {
            if (!dto.ProjectId.IsObjectId())
            {
                return BadRequest("Project not found");
            }
            
            if (!dto.SectionId.IsObjectId())
            {
                return BadRequest("Section not found");
            }
            
            if (dto.ModelName.IsNullOrWhitespace())
            {
                return BadRequest("Model name missing");
            }
            
            var project = _dataService.Get(new ObjectId(dto.ProjectId));
            if (project == null)
            {
                return BadRequest("Project not found");
            }

            var section = project.Sections.FirstOrDefault(x => x.Id.ToString() == dto.SectionId);

            if (section == null)
            {
                return BadRequest("Section not found"); 
            }
            
            return section.Models.Any(x => string.Equals(x.Name, dto.ModelName, StringComparison.CurrentCultureIgnoreCase));

        }

        [HttpPut("update-project")]
        public ActionResult Put(ProjectModel dto)
        {
            var result = _dataService.Update(dto);
            if (result)
                return NoContent();
            else
                return NotFound();
        }

        [HttpDelete("delete-project")]
        public ActionResult Delete(ObjectId id)
        {
            var result = _dataService.Delete(id);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }
    }
}