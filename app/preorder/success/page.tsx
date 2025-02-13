import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PreorderSuccess() {
  return (
    <main className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-6">
            ¡Gracias por tu Reserva!
          </h1>
          <p className="text-lg text-zinc-600">
            Conntactaremos contigo pronto con más detalles.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
} 