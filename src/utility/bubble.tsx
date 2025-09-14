import React from "react";

type Arrangement = "desc" | "asc";

function getComparableValue(val: string): number {
  if (!isNaN(Number(val))) {
    return Number(val);
  }
  if (/^[A-Z]$/.test(val)) {
    return val.charCodeAt(0) - 64;
  }
  return Number.MAX_SAFE_INTEGER;
}

function buildStepNode(
  array: string[],
  currentIndex: number,
  iteration: number | null = null
) {
  return (
    <span className="inline-flex items-baseline gap-1">
      {array.map((val, idx) => {
        const content = idx === currentIndex ? `(${val})` : val;
        return (
          <span
            key={idx}
            className={idx === currentIndex ? "font-extrabold text-blue-600" : ""}
          >
            {content}
          </span>
        );
      })}
      {iteration !== null && (
        <span className="ml-2 font-semibold text-green-600">{`-> Iteration ${iteration}`}</span>
      )}
    </span>
  );
}

function buildStepText(array: string[], currentIndex: number, iteration: number | null) {
  const arrText = array
    .map((val, idx) => (idx === currentIndex ? `(${val})` : val))
    .join(" ");
  return iteration !== null ? `${arrText} -> Iteration ${iteration}` : arrText;
}

export default function recursiveBubbleSort(
  array: string[],
  steps: React.ReactNode[],
  order: Arrangement,
  stepIndex: number = 1,
  i: number = 0, // iteration count (pass)
  j: number = 0, // current index in pass
  swappedInIteration: boolean = false, // track if swap happened in current iteration
  lastText: string | null = null
) {
  const n = array.length;

  // Base case: if i reached n, stop
  if (i >= n) {
    return;
  }

  // We want exactly n steps per iteration (j from 0 to n-1)
  if (j >= n) {
    // End of iteration: if no swaps, stop; else go to next iteration
    if (!swappedInIteration) {
      return;
    }
    recursiveBubbleSort(array, steps, order, stepIndex + 1, i + 1, 0, false, lastText);
    return;
  }

  // Determine if this step is the last step of the iteration to add iteration label
  const isLastStepOfIteration = j === n - 1;
  const iterationLabel = isLastStepOfIteration ? i + 1 : null;

  const text = buildStepText(array, j, iterationLabel);
  if (lastText !== text) {
    steps.push(buildStepNode(array, j, iterationLabel));
    lastText = text;
  }

  let swapped = swappedInIteration;

  // Only compare and swap if j < n - 1 - i (bubble sort reduces comparisons each iteration)
  if (j < n - 1 - i) {
    const currentVal = getComparableValue(array[j]);
    const nextVal = getComparableValue(array[j + 1]);

    let shouldSwap = false;
    if (order === "asc" && currentVal > nextVal) {
      shouldSwap = true;
    } else if (order === "desc" && currentVal < nextVal) {
      shouldSwap = true;
    }

    if (shouldSwap) {
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      swapped = true;
    }
  }

  // Recurse to next j with updated swapped flag
  recursiveBubbleSort(array, steps, order, stepIndex + 1, i, j + 1, swapped, lastText);
}