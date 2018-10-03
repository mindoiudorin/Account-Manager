using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AccountManager.App_Start
{
    public static class WebHelpers
    {
        public static string CurrentAction(this UrlHelper urlHelper)
        {
            var routeValueDictionary = urlHelper.RequestContext.RouteData.Values;
            // in case using virtual dirctory 
            var rootUrl = urlHelper.Content("~/");
            return string.Format("{0}{1}/{2}/", rootUrl, routeValueDictionary["controller"], routeValueDictionary["action"]);
        }

        public static string CurrentController(this UrlHelper urlHelper)
        {
            var routeValueDictionary = urlHelper.RequestContext.RouteData.Values;
            // in case using virtual dirctory 
            var rootUrl = urlHelper.Content("~/");
            return string.Format("{0}{1}/", rootUrl, routeValueDictionary["controller"]);
        }

        public static string RootUrl(this UrlHelper urlHelper)
        {
            // in case using virtual dirctory 
            return urlHelper.Content("~/");
        }
    }
}