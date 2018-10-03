using System.Web;
using System.Web.Optimization;

namespace AccountManager
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/bower_components/toastr/toastr.min.js",
                        "~/Scripts/jquery.unobtrusive-ajax.min.js",
                        "~/Scripts/app.shared.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*",
                        "~/bower_components/webshim/js-webshim/minified/polyfiller.js",
                        "~/bower_components/combodate/src/combodate.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/bower_components/bootstrap/dist/js/bootstrap.min.js",
                      "~/Scripts/respond.js",
                        "~/bower_components/moment/moment.js",
                        "~/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/bower_components/bootstrap/dist/css/bootstrap.min.css",
                      "~/Content/site.css",
                      "~/Content/app.layout.css",
                      "~/bower_components/toastr/toastr.min.css",
                      "~/bower_components/font-awesome/css/font-awesome.min.css",
                      "~/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css"));
        }
    }
}
