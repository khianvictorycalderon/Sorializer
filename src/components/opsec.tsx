import { useState } from "react";
import recursiveInsertionSort from "../utility/insertion";

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

      if (sortingAlgorithm === "insertion") {
        const filteredInput = input
        .replace(/[^0-9\-,]/g, "")
        .split(",")
        .filter((s) => s !== "");
        recursiveInsertionSort(filteredInput, newSteps, arrangement, 1);
      }

      setSteps(newSteps); // <- important!
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

            // Allow only digits, commas, and minus signs
            value = value.replace(/[^0-9\-,]/g, "");

            // Prevent multiple commas in a row
            value = value.replace(/,{2,}/g, ",");

            // Prevent multiple minus signs and enforce minus only at start of number
            value = value
              .split(",")
              .map((part) => {
                // Keep only first "-" if at the start
                if (part.startsWith("-")) {
                  return "-" + part.slice(1).replace(/-/g, "");
                }
                return part.replace(/-/g, "");
              })
              .join(",");

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
