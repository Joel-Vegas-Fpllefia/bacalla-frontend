import Link from "next/link";
import { mascotasService } from "@/services/mascotasService";

export default async function HomePage() {
  let variedades = [];

  try {
    const response = await mascotasService.getAll();
    // Accedemos a 'dades' según el formato de tu API
    variedades =
      response && Array.isArray(response.dades) ? response.dades : [];
  } catch (error) {
    console.error("Error cargando bacalaos:", error);
  }

  return (
    <div className="max-w-6xl mx-auto p-8 text-black">
      {/* CABECERA CON EL BOTÓN DE CREAR */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-black text-blue-900 tracking-tight">
            MASCOTAS App 🐟
          </h1>
          <p className="text-gray-500">Gestió de varietats i presentacions</p>
        </div>

        <Link
          href="/nou"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <span className="text-xl">+</span> Afegir nova varietat
        </Link>
      </header>
      {/* JOEL VEGAS ROMERO  */}
      {/* REJILLA DE TARJETAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {variedades.length > 0 ? (
          variedades.map((item: any) => (
            <article
              key={item._id}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-md uppercase">
                    {item.tipus}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {item.nom}
                </h2>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {item.raza}
                </p>
                <img src={item.foto} alt="" />
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                <span className="text-sm text-gray-400 font-medium">
                  📍 {item.raza}
                </span>
                <Link
                  href={`/detall/${item._id}`}
                  className="text-blue-600 font-bold hover:text-blue-800 transition"
                >
                  Detalls →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
            <p className="text-gray-400 text-lg">
              No s'han trobat dades a la base de dades.
            </p>
            <Link
              href="/nou"
              className="text-blue-600 font-bold hover:underline"
            >
              Crear la primera ara mismo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
