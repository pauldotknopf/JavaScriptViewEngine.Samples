using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Sample.MvcCore1.ReactHotModuleReloading.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View("js-{auto}");
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View("js-{auto}");
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View("js-{auto}");
        }

        public IActionResult Error()
        {
            return View("js-{auto}");
        }
    }
}
