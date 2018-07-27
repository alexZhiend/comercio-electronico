using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TiendaComida.Models;

namespace TiendaComida.Areas.Admin.Controllers
{
    public class ComidaController : Controller
    {
        private ComidaDBEntities3 db = new ComidaDBEntities3();

        // GET: Admin/Comida
        public ActionResult Index()
        {
            return View(db.Comida.ToList());
        }

        // GET: Admin/Comida/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Comida comida = db.Comida.Find(id);
            if (comida == null)
            {
                return HttpNotFound();
            }
            return View(comida);
        }

        // GET: Admin/Comida/Create
        public ActionResult Create()
        {
            return View();
        }

       
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ComidaId,Denominacion,Descripcion,Precio,Existencias,ValorNutricional,Activo")] Comida comida)
        {
            if (ModelState.IsValid)
            {
                db.Comida.Add(comida);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(comida);
        }


        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Comida comida = db.Comida.Find(id);
            if (comida == null)
            {
                return HttpNotFound();
            }
            return View(comida);
        }

      
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ComidaId,Denominacion,Descripcion,Precio,Existencias,ValorNutricional,Activo")] Comida comida)
        {
            if (ModelState.IsValid)
            {
                db.Entry(comida).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(comida);
        }

        // GET: Admin/Comida/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Comida comida = db.Comida.Find(id);
            if (comida == null)
            {
                return HttpNotFound();
            }
            return View(comida);
        }

        // POST: Admin/Comida/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Comida comida = db.Comida.Find(id);
            db.Comida.Remove(comida);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }








        public JsonResult Adjuntar(int ComidaId, HttpPostedFileBase documento)
        {
            var respuesta = new ResponseModel
            {
                respuesta = true,
                error = ""
            };

            if (documento != null)
            {
                string adjunto = DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(documento.FileName);
                documento.SaveAs(Server.MapPath("~/ImgProductos/" + adjunto));

                db.ComidaImagen.Add(new ComidaImagen { ComidaId = ComidaId, Imagen = adjunto, Titulo = "Ejemplo", Descripcion = "Ejemplo" });
                db.SaveChanges();

            }
            else
            {
                respuesta.respuesta = false;
                respuesta.error = "Debe adjuntar un documento";
            }

            return Json(respuesta);
        }

        public PartialViewResult Adjuntos(int ComidaId)
        {
            return PartialView(db.ComidaImagen.Where(x => x.ComidaId == ComidaId).ToList());
        }



        public JsonResult EliminarImagen(int ComidaImagenId)
        {
            var rpt = new ResponseModel()
            {
                respuesta = true,
                error = ""
            };
            var img = db.ComidaImagen.Find(ComidaImagenId);

            if (System.IO.File.Exists(Server.MapPath("~/ImgProductos/" + img.Imagen)))
                System.IO.File.Delete(Server.MapPath("~/ImgProductos/" + img.Imagen));

            db.ComidaImagen.Remove(img);
            db.SaveChanges();

            return Json(rpt);
        }



    }
}
