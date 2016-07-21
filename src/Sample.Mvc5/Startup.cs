using Microsoft.Owin;
using Owin;
using JavaScriptViewEngine;
using JavaScriptViewEngine.Pool;

[assembly: OwinStartupAttribute(typeof(Sample.Mvc5.Startup))]
namespace Sample.Mvc5
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var nodeRenderOptions = new Options<NodeRenderEngineOptions>(new NodeRenderEngineOptions());
            app.UseJsEngine(new SingletonRenderEngineFactory(new NodeRenderEngineBuilder(nodeRenderOptions)));
        }
    }
}
