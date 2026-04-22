const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const mascotasService = {
  // GET: Listado completo
  async getAll() {
    const res = await fetch(`${API_URL}/mascotas`, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener los datos");
    return res.json();
  },

  // GET: Detalle por ID
  async getById(id) {
    const res = await fetch(`${API_URL}/mascotas/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  },

  // POST: Crear nuevo (Nivel Superior)
  async create(data) {
    const res = await fetch(`${API_URL}/mascotas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res;
  },
};
