using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using final.Services;
using final.Services.impl;
using final.Models;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;

namespace final
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc().AddJsonOptions(opt =>
            {
                opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
            services.AddTransient<IToDoService, MemoryOnlyToDoService>();
            services.AddSingleton(typeof(IDictionary<Guid, ToDo>), createTodoRepo());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseMvc();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(@"C:\projects\angularjs-talk"),
            });
        }

        private IDictionary<Guid, ToDo> createTodoRepo()
        {
            var idThanksgiving = Guid.NewGuid();
            var idChristmas = Guid.NewGuid();
            var idNewYears = Guid.NewGuid();

            var testData = new List<Models.ToDo>
            {
                new ToDo
                {
                    Id = idThanksgiving,
                    Title = "Celebrate Thanksgiving",
                    Description = "just a test ToDo item. #1",
                    StartDate = DateTime.Parse("11/26/2015"),
                    StopDate = DateTime.Parse("11/27/2015")
                },
                new ToDo
                {
                    Id = idChristmas,
                    Title = "Celebrate Christmas",
                    Description = "just a test ToDo item. #2",
                    StartDate = DateTime.Parse("12/24/2015"),
                    StopDate = DateTime.Parse("12/25/2015")
                },
                new ToDo
                {
                    Id = idNewYears,
                    Title = "Celebrate New Year",
                    Description = "just a test ToDo item. #3",
                    StartDate = DateTime.Parse("12/31/2015"),
                    StopDate = DateTime.Parse("01/01/2016")
                },
            };
            return testData.ToDictionary(t => t.Id, t => t);
        }
    }
}
