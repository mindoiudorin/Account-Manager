﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AccountManager.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "controller";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "controller";

            return View();
        }
    }
}