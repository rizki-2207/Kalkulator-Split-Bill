"use client";

import { useState } from "react";

export default function SplitBill() {
  const [subtotal, setSubtotal] = useState<string>("");
  const [taxService, setTaxService] = useState<string>("10"); // Default 10%
  const [people, setPeople] = useState<string>("2"); // Default 2 orang

  const numSubtotal = parseFloat(subtotal) || 0;
  const numTax = parseFloat(taxService) || 0;
  const numPeople = parseInt(people) || 1;

  const taxAmount = numSubtotal * (numTax / 100);
  const totalAkhir = numSubtotal + taxAmount;
  const splitAmount = totalAkhir / numPeople;

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden p-6">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-white mb-1">Kalkulator Patungan</h1>
          <p className="text-sm text-neutral-400">Bagi tagihan makan dengan adil dan cepat.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Total Tagihan (Rp)</label>
            <input type="number" value={subtotal} onChange={(e) => setSubtotal(e.target.value)} placeholder="Cth: 150000" className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white transition-colors" />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm text-neutral-400 mb-1">Pajak / Layanan (%)</label>
              <input type="number" value={taxService} onChange={(e) => setTaxService(e.target.value)} className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white transition-colors" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-neutral-400 mb-1">Jumlah Orang</label>
              <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} min="1" className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white transition-colors" />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-neutral-950 border border-neutral-800 rounded-lg p-4">
          <div className="flex justify-between text-sm text-neutral-400 mb-2">
            <span>Tagihan Dasar</span>
            <span>{formatRupiah(numSubtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-neutral-400 mb-4">
            <span>Pajak & Layanan ({taxService}%)</span>
            <span>+ {formatRupiah(taxAmount)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-neutral-800 pt-4 mb-2">
            <span className="text-sm text-white font-medium">Total Keseluruhan</span>
            <span className="text-lg text-white font-bold">{formatRupiah(totalAkhir)}</span>
          </div>
        </div>

        <div className="mt-4 bg-white text-black rounded-lg p-5 text-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <p className="text-xs font-medium uppercase tracking-wider mb-1 text-neutral-600">Patungan Per Orang</p>
          <h2 className="text-3xl font-bold">{formatRupiah(splitAmount)}</h2>
        </div>

      </div>
    </main>
  );
}