using Newtonsoft.Json;

namespace Sample.MvcCore1.ReactWebpackSass.ViewModels
{
    public class GreetingViewModel
    {
        [JsonProperty("greeting")]
        public string Greeting { get; set; }
    }
}
