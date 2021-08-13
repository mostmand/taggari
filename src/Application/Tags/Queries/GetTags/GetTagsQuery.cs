using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Taggari.Application.Tags.Queries.GetTags
{
    public class GetTagsQuery : IRequest<IEnumerable<Tag>>
    {
    }

    public class GetWeatherForecastsQueryHandler : IRequestHandler<GetTagsQuery, IEnumerable<Tag>>
    {
        private static readonly Tag[] Tags = {
            new()
            {
                Name = "Person",
                Abbreviation = "PER"
            },
            new()
            {
                Name = "Organization",
                Abbreviation = "ORG"
            },
            new()
            {
                Name = "Location",
                Abbreviation = "LOC"
            },
            new()
            {
                Name = "Date",
                Abbreviation = "DAT"
            }
        };

        public Task<IEnumerable<Tag>> Handle(GetTagsQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(Tags.AsEnumerable());
        }
    }
}