interface BirdFilterCardProps {
  onChangeOrder: (value: string) => void;
  onChangeFamily: (value: string) => void;
  onChangeSeen: (value: string) => void;
  onChangeDateFrom: (value: string) => void;
  onChangeDateTo: (value: string) => void;
  order: string;
  family: string;
  seen: string;
  dateFrom: string;
  dateTo: string;
  uniqueOrders: string[];
  uniqueFamilies: string[];
}

export function BirdFilterCard({
  onChangeOrder,
  onChangeFamily,
  onChangeDateFrom,
  onChangeDateTo,
  onChangeSeen,
  order,
  family,
  seen,
  dateFrom,
  dateTo,
  uniqueOrders,
  uniqueFamilies,
}: BirdFilterCardProps) {
  return (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 w-56 self-start">
    <h2 className="text-green-400 font-bold mb-4">Filtry</h2>

    <div className="flex flex-col gap-4">
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Řád</label>
        <select
          value={order}
          onChange={(e) => onChangeOrder(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm"
        >
          <option value="">Všechny</option>
          {uniqueOrders.map((order) => (
            <option key={order} value={order}>{order}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-1 block">Čeleď</label>
        <select
          value={family}
          onChange={(e) => onChangeFamily(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm"
        >
          <option value="">Všechny</option>
          {uniqueFamilies.map((family) => (
            <option key={family} value={family}>{family}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-1 block">Stav</label>
        <select
          value={seen}
          onChange={(e) => onChangeSeen(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm"
        >
          <option value="">Vše</option>
          <option value="true">Viděno</option>
          <option value="false">Neviděno</option>
        </select>
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-1 block">Od</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onChangeDateFrom(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm"
        />
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-1 block">Do</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onChangeDateTo(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 text-sm"
        />
      </div>
    </div>
  </div>
);
}
