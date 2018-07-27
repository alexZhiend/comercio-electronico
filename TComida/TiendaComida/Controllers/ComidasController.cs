using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TiendaComida.Models;

namespace TiendaComida.Controllers
{
    public class ComidasController : Controller
    {
        // GET: Comida
        public ActionResult Buscar(string id = "")
        {
            //el resultado de la busqueda de comidas
            ViewBag.Clave = id;
            var comidas = new List<Comida>();
            using (var bd = new ComidaDBEntities3()) {
                comidas = bd.Comida.Include("ComidaImagen").Where(x => x.Denominacion.Contains(id)).ToList();

            }

                return View(comidas);
        }

        public ActionResult MiProceso(string par1, string par2)
        {
            // el resultado de la busqueda de productos
            ViewBag.par1 = par1;
            ViewBag.par2 = par2;
            return View();
        }
    }
}