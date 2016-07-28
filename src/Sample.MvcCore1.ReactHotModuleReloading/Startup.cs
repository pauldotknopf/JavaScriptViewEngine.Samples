using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JavaScriptViewEngine;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Proxy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Sample.MvcCore1.ReactHotModuleReloading
{
    public class Startup
    {
        private readonly IHostingEnvironment _env;

        public Startup(IHostingEnvironment env)
        {
            _env = env;
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
            services.AddJsEngine(builder =>
            {
                builder.UseNodeRenderEngine(options =>
                {
                    // in the "Node" directory, always invoke "server.js" to render your content.
                    options.ProjectDirectory = Path.Combine(_env.ContentRootPath, "App", "dist");
                    options.GetModuleName = (path, model, bag, values, area, type) => "server";
                });
                builder.UseSingletonEngineFactory();
            });
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseStaticFiles();

            // For any requests coming in from '/dist/**/*' or '__webpack_hmr', we wan't to proxy those requests
            // to our webpack dev server that is running.
            // Make sure you have 'gulp dev-server' running before starting the .NET web stuff.
            // NOTE: You may want to configure this to only run on a dev environment, and not production.
            var proxyOptions = new OptionsWrapper<ProxyOptions>(new ProxyOptions
            {
                Host = "localhost",
                Port = "5001"
            });
            app.Use(async (context, next) =>
            {
                if(!context.Request.Path.StartsWithSegments("/dist") 
                    && !context.Request.Path.StartsWithSegments("/__webpack_hmr"))
                {
                    await next();
                    return;
                }
                var proxyMiddleware = new ProxyMiddleware(httpContext => next.Invoke(), proxyOptions);
                await proxyMiddleware.Invoke(context);
            });

            app.UseJsEngine(); // this needs to be before MVC

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
