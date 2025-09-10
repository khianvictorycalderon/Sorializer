import { useState } from "react";

interface InputSectionProps {
  input: string;
  arrangement: "desc" | "asc" | null;
  sortingAlgorithm: "insertion" | "selection" | null;
  setInput: (value: string) => void;
  setArrangement: (value: "desc" | "asc" | null) => void;
  setSortingAlgorithm: (value: "insertion" | "selection" | null) => void;
  onArrange: () => void;
  error: string | null;
}

type Arrangement = "desc" | "asc" | null;
type SortingAlgorithm = "insertion" | "selection" | null;

export default function OpSec() {
  const [input, setInput] = useState<string>("");
  const [arrangement, setArrangement] = useState<Arrangement>(null);
  const [sortingAlgorithm, setSortingAlgorithm] = useState<SortingAlgorithm>(null);
  const [error, setError] = useState<string | null>(null);

  const handleArrange = () => {
    // Validation
    if (!input.trim()) {
      setError("Input cannot be empty.");
      return;
    }
    if (!arrangement) {
      setError("Please select an arrangement.");
      return;
    }
    if (!sortingAlgorithm) {
      setError("Please select a sorting algorithm.");
      return;
    }

    // Clear error if validation passes
    setError(null);

    // Placeholder for sorting logic
    console.log("Input:", input);
    console.log("Arrangement:", arrangement);
    console.log("Algorithm:", sortingAlgorithm);
  };

  return (
    <>
      <InputSection
        input={input}
        arrangement={arrangement}
        sortingAlgorithm={sortingAlgorithm}
        setInput={setInput}
        setArrangement={setArrangement}
        setSortingAlgorithm={setSortingAlgorithm}
        onArrange={handleArrange}
        error={error}
      />
      <OutputSection />
    </>
  );
}

const InputSection = ({
  input,
  arrangement,
  sortingAlgorithm,
  setInput,
  setArrangement,
  setSortingAlgorithm,
  onArrange,
  error,
}: InputSectionProps) => {
  return (
    <div className="px-8">
      <div className="max-w-4xl mx-auto space-y-4">

        <label className="block text-base font-semibold text-gray-700">
          Input <span className="italic text-gray-500">(Separated by comma)</span>
        </label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition
            ${error && !input.trim() ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"}`}
          placeholder="7,1,A,8,10,C,..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arrangement
            </label>
            <select
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition
                ${error && !arrangement ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"}`}
              value={arrangement || ""}
              onChange={(e) =>
                setArrangement(
                  e.target.value === "asc"
                    ? "asc"
                    : e.target.value === "desc"
                    ? "desc"
                    : null
                )
              }
            >
              <option value="">Select Arrangement</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sorting Algorithm
            </label>
            <select
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition
                ${error && !sortingAlgorithm ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"}`}
              value={sortingAlgorithm || ""}
              onChange={(e) =>
                setSortingAlgorithm(
                  e.target.value === "insertion"
                    ? "insertion"
                    : e.target.value === "selection"
                    ? "selection"
                    : null
                )
              }
            >
              <option value="">Select Algorithm</option>
              <option value="insertion">Insertion</option>
              <option value="selection">Selection</option>
            </select>
          </div>

        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <div className="mt-4">
          <button
            onClick={onArrange}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-cyan-600 transition w-full cursor-pointer"
          >
            Arrange
          </button>
        </div>

      </div>
    </div>
  );
};

const OutputSection = () => {
  return (
    <div className="px-8 py-4">
        <div className="max-w-4xl mx-auto">
            Output here...
        </div>
    </div>
  );
};
