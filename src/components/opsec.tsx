import { useState } from "react";
import recursiveInsertionSort from "../utility/insertion";

type Arrangement = "desc" | "asc" | null;
type SortingAlgorithm = "insertion" | "selection" | null;

interface InputSectionProps {
  input: string;
  arrangement: "desc" | "asc" | null;
  sortingAlgorithm: SortingAlgorithm;
  setInput: (value: string) => void;
  setArrangement: (value: "desc" | "asc" | null) => void;
  setSortingAlgorithm: (value: SortingAlgorithm) => void;
  onArrange: () => void;
  error: string | null;
}

interface OutputSectionProps {
    steps: React.ReactNode[];
}

export default function OpSec() {

    // Input section
    const [input, setInput] = useState<string>("");
    const [arrangement, setArrangement] = useState<Arrangement>(null);
    const [sortingAlgorithm, setSortingAlgorithm] = useState<SortingAlgorithm>(null);
    const [error, setError] = useState<string | null>(null);

    // Output section
    const [steps, setSteps] = useState<React.ReactNode[]>([]);

    const sortingStrategies = {
      insertion: (arr: string[], steps: React.ReactNode[], order: Arrangement) =>
        recursiveInsertionSort(arr, steps, order, 1),

      selection: (arr: string[], steps: React.ReactNode[], order: Arrangement) =>
        {}, // Mock function only, will edit this later
    };

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

      setError(null);

      // Reset steps
      const newSteps: React.ReactNode[] = [];

      // Sanitize input once
      const filteredInput = input
        .replace(/[^0-9A-Za-z\-,]/g, "") // allow digits, letters, minus, comma
        .split(",")
        .filter((s) => s !== "");

      // Run chosen algorithm dynamically
      const strategy = sortingStrategies[sortingAlgorithm];
      if (strategy) {
        strategy(filteredInput, newSteps, arrangement);
      }

      setSteps(newSteps);
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
          <OutputSection steps={steps} />
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
    <div className="px-8 mt-16">
      <div className="max-w-4xl mx-auto space-y-4">

        <label className="block text-base font-semibold text-gray-700">
          Input <span className="italic text-gray-500">(Separated by comma)</span>
        </label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition
            ${error && !input.trim() ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"}`}
          placeholder="7,1,9,8,10,2..."
          value={input}
          onChange={(e) => {
            let value = e.target.value;

            // Allow only digits, commas, minus signs, and letters A-Z (case-insensitive)
            value = value.replace(/[^0-9a-zA-Z\-,]/g, "");

            value = value
              .split(",")
              .map((part) => {
                let hasMinus = part.startsWith("-");
                let core = hasMinus ? part.slice(1) : part;

                // If it's numeric, keep it
                if (/^\d+$/.test(core)) {
                  return (hasMinus ? "-" : "") + core;
                }

                // If it's a single letter, capitalize it
                if (/^[a-zA-Z]$/.test(core)) {
                  return (hasMinus ? "-" : "") + core.toUpperCase();
                }

                // If it's empty, keep empty (so commas remain)
                if (core === "") return "";

                // Otherwise, invalid → drop
                return "";
              })
              .join(",");

            // Prevent multiple commas in a row
            value = value.replace(/,{2,}/g, ",");

            setInput(value);
          }}
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
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-400 transition w-full cursor-pointer"
          >
            Arrange
          </button>
        </div>

      </div>
    </div>
  );
};

const OutputSection = ({ steps }: OutputSectionProps) => {
  return (
    <div className="px-8 py-4 mb-16">
        <div className="max-w-4xl mx-auto">
            {steps.length > 0 ? (
                <>
                    {steps.map((item, index) => (
                        <div 
                            className="bg-neutral-200 p-2 my-2 rounded-md overflow-x-auto" 
                            key={`${item}-${index}`}
                        >
                            {index + 1}.{")"} {item}
                        </div>
                    ))}
                </>
            ) : (
                <span>
                    Output here...
                </span>
            )}
        </div>
    </div>
  );
};
