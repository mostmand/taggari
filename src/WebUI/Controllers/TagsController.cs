using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CleanArchitecture.WebUI.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Taggari.Application.Tags.Queries.GetTags;

namespace ASP.NETCoreWebApplication.Controllers
{
    public class TagsController : ApiControllerBase
    {
        private readonly ILogger<TagsController> _logger;

        public TagsController(ILogger<TagsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Tag>> Get()
        {
            return await Mediator.Send(new GetTagsQuery());
        }
    }
}