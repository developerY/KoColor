interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1d]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fcf8fb] text-[#1c1b1d] max-w-2xl w-full p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto border border-[#c3c6d7]">
        <div className="flex items-center justify-between border-b border-[#c3c6d7] pb-4">
          <h3 className="font-headline-sm uppercase tracking-tight text-xl">Atelier Sizing &amp; Dimensional Chart</h3>
          <button
            onClick={onClose}
            className="text-[#434655] hover:text-[#1c1b1d] transition-colors p-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <p className="font-body-md text-[#434655] text-sm">
          The Chromatic Scuba Trench is engineered with an exaggerated sculptural cut. If you prefer a tailored, classical posture, we recommend taking one size smaller than your standard size.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-sm border-collapse">
            <thead>
              <tr className="bg-[#f0edf0] text-[#1c1b1d] font-label-sm uppercase tracking-wider">
                <th className="p-3">Size</th>
                <th className="p-3">Chest (in/cm)</th>
                <th className="p-3">Shoulder (in/cm)</th>
                <th className="p-3">Length (in/cm)</th>
                <th className="p-3">Sleeve (in/cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/30">
              <tr>
                <td className="p-3 font-bold">XS</td>
                <td className="p-3 text-[#434655]">38" / 96cm</td>
                <td className="p-3 text-[#434655]">18.5" / 47cm</td>
                <td className="p-3 text-[#434655]">47.2" / 120cm</td>
                <td className="p-3 text-[#434655]">33.0" / 84cm</td>
              </tr>
              <tr className="bg-[#f6f2f5]">
                <td className="p-3 font-bold">S</td>
                <td className="p-3 text-[#434655]">40" / 102cm</td>
                <td className="p-3 text-[#434655]">19.2" / 49cm</td>
                <td className="p-3 text-[#434655]">48.0" / 122cm</td>
                <td className="p-3 text-[#434655]">33.8" / 86cm</td>
              </tr>
              <tr className="bg-[#004ac6]/10 text-[#004ac6] font-bold">
                <td className="p-3">M (Selected)</td>
                <td className="p-3">42" / 108cm</td>
                <td className="p-3">20.0" / 51cm</td>
                <td className="p-3">48.8" / 124cm</td>
                <td className="p-3">34.6" / 88cm</td>
              </tr>
              <tr className="bg-[#f6f2f5]">
                <td className="p-3 font-bold">L</td>
                <td className="p-3 text-[#434655]">45" / 114cm</td>
                <td className="p-3 text-[#434655]">20.8" / 53cm</td>
                <td className="p-3 text-[#434655]">49.6" / 126cm</td>
                <td className="p-3 text-[#434655]">35.4" / 90cm</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">XL</td>
                <td className="p-3 text-[#434655]">48" / 122cm</td>
                <td className="p-3 text-[#434655]">21.6" / 55cm</td>
                <td className="p-3 text-[#434655]">50.4" / 128cm</td>
                <td className="p-3 text-[#434655]">36.2" / 92cm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2">
          <button
            className="px-6 py-2.5 bg-[#1c1b1d] text-white font-label-lg uppercase hover:bg-[#004ac6] transition-colors"
            onClick={onClose}
            type="button"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
