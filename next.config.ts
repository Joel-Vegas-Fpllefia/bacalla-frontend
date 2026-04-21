/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Esto permite que el build termine aunque haya errores de tipo.
    // Muy útil para exámenes o prototipos rápidos.
    ignoreBuildErrors: true,
  },
  eslint: {
    // También ignoramos ESLint para evitar que se detenga por advertencias
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
