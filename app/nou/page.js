"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mascotasService } from "@/services/mascotasService";

export default function Noumascotas() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    tipus: "",
    raza: "",
    foto: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await mascotasService.create(form);

      if (res.ok) {
        // 1. Volvemos a la home
        router.push("/");
        // 2. IMPORTANTÍSIMO: Refresca los datos del servidor sin recargar la pestaña
        router.refresh();
      } else {
        alert("Error al guardar en el servidor");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Afegir Varietat</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Nom del Animal"
          required
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Raza"
          required
          onChange={(e) => setForm({ ...form, raza: e.target.value })}
        />
        <select
          className="w-full p-3 border rounded-lg outline-none"
          onChange={(e) => setForm({ ...form, tipus: e.target.value })}
          required
        >
          <option value="">Selecciona tipus...</option>
          <option value="Salat">Perro</option>
          <option value="Fresc">Gato</option>
          <option value="Esqueixat">Otro</option>
        </select>
        <input
          className="w-full p-3 border rounded-lg outline-none"
          placeholder="Imatge Animal"
          onChange={(e) => setForm({ ...form, foto: e.target.value })}
        ></input>

        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold text-white transition ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Guardant..." : "Crear i Publicar"}
        </button>
      </form>
    </div>
  );
}
