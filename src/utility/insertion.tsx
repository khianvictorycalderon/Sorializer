type Arrangement = "desc" | "asc" | null;

function getComparableValue(val: string): number {
  // If it's a number
  if (!isNaN(Number(val))) {
    return Number(val);
  }

  // If it's a single letter A-Z
  if (/^[A-Z]$/.test(val)) {
    return val.charCodeAt(0) - 64; // A=1, B=2, ..., Z=26
  }

  // Fallback for invalid cases
  return Number.MAX_SAFE_INTEGER;
}

function buildStepNode(array: string[], separatorIndex: number) {
  const sorted = array.slice(0, separatorIndex + 1);
  const unsorted = array.slice(separatorIndex + 1);

  return (
    <span className="inline-flex items-baseline">
      {/* Sorted portion */}
      <span className="inline-flex gap-4">
        {sorted.map((val, idx) => (
          <span key={idx}>{val}</span>
        ))}
      </span>

      {/* Separator */}
      <span className="text-green-600 font-bold ml-2">|</span>

      {/* Unsorted portion */}
      <span className="inline-flex gap-4 ml-2">
        {unsorted.map((val, idx) => (
          <span key={idx}>{val}</span>
        ))}
      </span>
    </span>
  );
}

function buildStepText(array: string[], separatorIndex: number) {
  return array.map((val, idx) => (idx === separatorIndex ? `${val} |` : val)).join("   ");
}

export default function recursiveInsertionSort(
  array: string[],
  steps: React.ReactNode[],
  order: Arrangement,
  stepIndex: number = 1,
  i: number = 1,
  j: number | null = null,
  lastText: string | null = null
) {
  // Fixed hardcoded step 1
  if (stepIndex === 1) {
    const text = buildStepText(array, 0);
    if (lastText !== text) {
      steps.push(buildStepNode(array, 0));
      lastText = text;
    }
    recursiveInsertionSort(array, steps, order, 2, i, j, lastText);
    return;
  }

  // Fixed hardcoded step 2
  if (stepIndex === 2) {
    const text = buildStepText(array, 1);
    if (lastText !== text) {
      steps.push(buildStepNode(array, 1));
      lastText = text;
    }
    recursiveInsertionSort(array, steps, order, 3, i, j, lastText);
    return;
  }

  // Base case: if i reaches array length, sorting is done
  if (i >= array.length) {
    const text = buildStepText(array, array.length - 1);
    if (lastText !== text) {
      steps.push(buildStepNode(array, array.length - 1));
      lastText = text;
    }
    return;
  }

  // Initialize j on first call for this i
  if (j === null) {
    const text = buildStepText(array, i);
    if (lastText !== text) {
      steps.push(buildStepNode(array, i));
      lastText = text;
    }
    recursiveInsertionSort(array, steps, order, stepIndex + 1, i, i - 1, lastText);
    return;
  }

  // If j < 0 or no more swaps needed, move to next i
  if (j < 0) {
    const text = buildStepText(array, i);
    if (lastText !== text) {
      steps.push(buildStepNode(array, i));
      lastText = text;
    }
    recursiveInsertionSort(array, steps, order, stepIndex + 1, i + 1, null, lastText);
    return;
  }

  // Compare and swap if needed based on order
  const current = getComparableValue(array[j + 1]);
  const previous = getComparableValue(array[j]);

  let shouldSwap = false;
  if (order === "asc" && previous > current) {
    shouldSwap = true;
  } else if (order === "desc" && previous < current) {
    shouldSwap = true;
  }

  if (shouldSwap) {
    // Swap elements behind the separator, but keep separator at i
    [array[j], array[j + 1]] = [array[j + 1], array[j]];

    const text = buildStepText(array, i);
    if (lastText !== text) {
      steps.push(buildStepNode(array, i));
      lastText = text;
    }

    recursiveInsertionSort(array, steps, order, stepIndex + 1, i, j - 1, lastText);
  } else {
    // No swap needed, move to next i
    const text = buildStepText(array, i);
    if (lastText !== text) {
      steps.push(buildStepNode(array, i));
      lastText = text;
    }
    recursiveInsertionSort(array, steps, order, stepIndex + 1, i + 1, null, lastText);
  }
}