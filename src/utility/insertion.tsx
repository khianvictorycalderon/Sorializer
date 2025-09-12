type Arrangement = "desc" | "asc" | null;

export default function recursiveInsertionSort(
  array: string[],
  steps: React.ReactNode[],
  order: Arrangement,
  stepIndex: number = 1,
  i: number = 1,
  j: number | null = null
) {
  // Fixed hardcoded step 1
  if (stepIndex === 1) {
    steps.push(
      array.map((val, idx) => (idx === 0 ? `${val} |` : val)).join("   ")
    );
    recursiveInsertionSort(array, steps, order, 2, i, j);
    return;
  }

  // Fixed hardcoded step 2
  if (stepIndex === 2) {
    steps.push(
      array.map((val, idx) => (idx === 1 ? `${val} |` : val)).join("   ")
    );
    recursiveInsertionSort(array, steps, order, 3, i, j);
    return;
  }

  // Base case: if i reaches array length, sorting is done
  if (i >= array.length) {
    const lastStep = array.map((val, idx) => (idx === array.length - 1 ? `${val} |` : val)).join("   ");
    if (steps[steps.length - 1] !== lastStep) {
      steps.push(lastStep);
    }
    return;
  }

  // Initialize j on first call for this i
  if (j === null) {
    const currentStep = array.map((val, idx) => (idx === i ? `${val} |` : val)).join("   ");
    if (steps[steps.length - 1] !== currentStep) {
      steps.push(currentStep);
    }
    recursiveInsertionSort(array, steps, order, stepIndex + 1, i, i - 1);
    return;
  }

  // If j < 0 or no more swaps needed, move to next i
  if (j < 0) {
    const currentStep = array.map((val, idx) => (idx === i ? `${val} |` : val)).join("   ");
    if (steps[steps.length - 1] !== currentStep) {
      steps.push(currentStep);
    }
    recursiveInsertionSort(array, steps, order, stepIndex + 1, i + 1, null);
    return;
  }

  // Compare and swap if needed based on order
  const current = Number(array[j + 1]);
  const previous = Number(array[j]);

  let shouldSwap = false;
  if (order === "asc" && previous > current) {
    shouldSwap = true;
  } else if (order === "desc" && previous < current) {
    shouldSwap = true;
  }

  if (shouldSwap) {
    // Swap elements behind the separator, but keep separator at i
    [array[j], array[j + 1]] = [array[j + 1], array[j]];

    // Always mark the separator at i, not at j
    const currentStep = array.map((val, idx) => (idx === i ? `${val} |` : val)).join("   ");
    if (steps[steps.length - 1] !== currentStep) {
      steps.push(currentStep);
    }

    recursiveInsertionSort(array, steps, order, stepIndex + 1, i, j - 1);
  } else {
    // No swap needed, move to next i
    const currentStep = array.map((val, idx) => (idx === i ? `${val} |` : val)).join("   ");
    if (steps[steps.length - 1] !== currentStep) {
      steps.push(currentStep);
    }
    recursiveInsertionSort(array, steps, order, stepIndex + 1, i + 1, null);
  }
}