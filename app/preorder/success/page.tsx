import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PreorderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">¡Gracias por tu Reserva!</h1>
        <p className="text-lg">Te contactaremos pronto con más detalles.</p>
        <Link href="/">
          <Button>Volver al Inicio</Button>
        </Link>
      </div>
    </div>
  );
} 