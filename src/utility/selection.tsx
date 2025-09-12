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
  separatorIndex: number,
  swappedIndices: [number, number] | null = null
) {
  const sorted = array.slice(0, separatorIndex + 1);
  const unsorted = array.slice(separatorIndex + 1);

  const renderValue = (val: string, idx: number) => {
    if (swappedIndices) {
      const [fromIdx, toIdx] = swappedIndices;

      if (idx === fromIdx) {
        // Element moving out of sorted (left) → red
        return <span key={idx} className="text-red-600 font-extrabold">{val}</span>;
      }
      if (idx === toIdx) {
        // Element moving into sorted (right) → green
        return <span key={idx} className="text-green-600 font-extrabold">{val}</span>;
      }
    }
    return <span key={idx}>{val}</span>;
  };

  return (
    <span className="inline-flex items-baseline">
      {/* Sorted portion */}
      <span className="inline-flex gap-4">
        {sorted.map((val, idx) => renderValue(val, idx))}
      </span>

      {/* Separator */}
      <span className="text-blue-600 font-bold ml-2">|</span>

      {/* Unsorted portion */}
      <span className="inline-flex gap-4 ml-2">
        {unsorted.map((val, idx) => renderValue(val, idx + separatorIndex + 1))}
      </span>
    </span>
  );
}

function buildStepText(array: string[], separatorIndex: number) {
  return array
    .map((val, idx) => (idx === separatorIndex ? `${val} |` : val))
    .join("   ");
}

export default function recursiveSelectionSort(
  array: string[],
  steps: React.ReactNode[],
  order: Arrangement,
  stepIndex: number = 1,
  i: number = 0,
  j: number | null = null,
  minIndex: number | null = null,
  lastText: string | null = null
) {
  // Step 1: fixed initial step with separator at 0 (before any sorting)
  if (stepIndex === 1) {
    const text = buildStepText(array, 0);
    if (lastText !== text) {
      steps.push(buildStepNode(array, 0));
      lastText = text;
    }
    recursiveSelectionSort(array, steps, order, 2, i, j, minIndex, lastText);
    return;
  }

  // Base case: if i reaches array.length - 1, sorting done
  if (i >= array.length - 1) {
    const text = buildStepText(array, array.length - 1);
    if (lastText !== text) {
      steps.push(buildStepNode(array, array.length - 1));
      lastText = text;
    }
    return;
  }

  // Initialize j and minIndex on first call for this i
  if (j === null || minIndex === null) {
    const text = buildStepText(array, i);
    if (lastText !== text) {
      steps.push(buildStepNode(array, i));
      lastText = text;
    }
    recursiveSelectionSort(array, steps, order, stepIndex + 1, i, i + 1, i, lastText);
    return;
  }

  // If j reached end of array, swap minIndex and i if needed, then move to next i
  if (j >= array.length) {
    // Determine if swap needed
    if (minIndex !== i) {
      // Swap with coloring
      const swappedIndices: [number, number] = [minIndex, i];
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      const text = buildStepText(array, i);
      if (lastText !== text) {
        steps.push(buildStepNode(array, i, swappedIndices));
        lastText = text;
      }
    } else {
      // No swap, just show step
      const text = buildStepText(array, i);
      if (lastText !== text) {
        steps.push(buildStepNode(array, i));
        lastText = text;
      }
    }
    recursiveSelectionSort(array, steps, order, stepIndex + 1, i + 1, null, null, lastText);
    return;
  }

  // Compare current j element with minIndex element to find min/max based on order
  const currentVal = getComparableValue(array[j]);
  const minVal = getComparableValue(array[minIndex]);

  let newMinIndex = minIndex;
  if (order === "asc" && currentVal < minVal) {
    newMinIndex = j;
  } else if (order === "desc" && currentVal > minVal) {
    newMinIndex = j;
  }

  // Show step with separator at i, no swap yet
  const text = buildStepText(array, i);
  if (lastText !== text) {
    steps.push(buildStepNode(array, i));
    lastText = text;
  }

  // Recurse with next j and updated minIndex
  recursiveSelectionSort(array, steps, order, stepIndex + 1, i, j + 1, newMinIndex, lastText);
}