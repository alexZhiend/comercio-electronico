//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TiendaComida.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ComidaImagen
    {
        public int ComidaImagenId { get; set; }
        public int ComidaId { get; set; }
        public string Imagen { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
    
        public virtual Comida Comida { get; set; }
    }
}
