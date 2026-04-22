import { mascotasService } from "@/services/mascotasService";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function DetallPage({ params }) {
  // 1. Esperamos a que los parámetros de la URL estén listos
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Llamamos a tu API
  const response = await mascotasService.getById(id);

  if (!response) {
    notFound();
  }

  // Manejo de la estructura de tu API (dades)
  const item = response.dades ? response.dades : response;

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Tornar al llistat
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 p-6 text-white">
            <h1 className="text-3xl font-bold">{item.nom}</h1>
          </div>

          <div className="p-8">
            <div className="flex gap-2 mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                📍 {item.tipus}
              </span>
            </div>

            <p className="text-gray-700 text-lg mb-8">{item.raza}</p>
            <img src={item.foto}></img>
            <div className="border-t pt-4">
              <p className="text-xs text-gray-400 font-mono">
                ID: {item._id || id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
