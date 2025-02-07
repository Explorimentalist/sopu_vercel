"use client";

// app/preorder/form/page.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  quantity: number;
  message: string;
}

export default function PreorderForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    quantity: 1,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log(formData);
    window.location.href = "/preorder/success";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-6">
        <Link href="/preorder">
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold mb-8">Reserva Dina</h1>
        
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Cantidad</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            required
            value={formData.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setFormData({ ...formData, quantity: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensaje (Opcional)</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
              setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button 
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white transition-colors"
          >
            Enviar Reserva
          </Button>
        </div>
      </form>
    </div>
  );
} 