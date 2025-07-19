// Sorting algorithm generators for visualization
// Each yields { array, comparing, finalIndices }

export type SortStep = {
  array: number[];
  comparing: number[];
  finalIndices: number[];
};

export function* bubbleSort(arr: number[]): Generator<SortStep> {
  const a = arr.slice();
  const n = a.length;
  let final: number[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { array: a.slice(), comparing: [j, j + 1], finalIndices: final };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { array: a.slice(), comparing: [j, j + 1], finalIndices: final };
      }
    }
    final = [n - i - 1, ...final];
    yield { array: a.slice(), comparing: [], finalIndices: final };
  }
  yield { array: a.slice(), comparing: [], finalIndices: Array.from({ length: n }, (_, i) => i) };
}

export function* insertionSort(arr: number[]): Generator<SortStep> {
  const a = arr.slice();
  const n = a.length;
  let final: number[] = [];
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && a[j] < a[j - 1]) {
      yield { array: a.slice(), comparing: [j, j - 1], finalIndices: final };
      [a[j], a[j - 1]] = [a[j - 1], a[j]];
      j--;
      yield { array: a.slice(), comparing: [j, j + 1], finalIndices: final };
    }
  }
  yield { array: a.slice(), comparing: [], finalIndices: Array.from({ length: n }, (_, i) => i) };
}

export function* selectionSort(arr: number[]): Generator<SortStep> {
  const a = arr.slice();
  const n = a.length;
  let final: number[] = [];
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { array: a.slice(), comparing: [minIdx, j], finalIndices: final };
      if (a[j] < a[minIdx]) minIdx = j;
    }
    [a[i], a[minIdx]] = [a[minIdx], a[i]];
    final = [i, ...final];
    yield { array: a.slice(), comparing: [], finalIndices: final };
  }
  yield { array: a.slice(), comparing: [], finalIndices: Array.from({ length: n }, (_, i) => i) };
}

export function* quickSort(arr: number[]): Generator<SortStep> {
  const a = arr.slice();
  const n = a.length;
  let final: number[] = [];
  function* qs(l: number, r: number): Generator<SortStep> {
    if (l >= r) return;
    let pivot = a[r];
    let i = l;
    for (let j = l; j < r; j++) {
      yield { array: a.slice(), comparing: [j, r], finalIndices: final };
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        yield { array: a.slice(), comparing: [i, j], finalIndices: final };
        i++;
      }
    }
    [a[i], a[r]] = [a[r], a[i]];
    final = [i, ...final];
    yield { array: a.slice(), comparing: [], finalIndices: final };
    yield* qs(l, i - 1);
    yield* qs(i + 1, r);
  }
  yield* qs(0, n - 1);
  yield { array: a.slice(), comparing: [], finalIndices: Array.from({ length: n }, (_, i) => i) };
}

export function* mergeSort(arr: number[]): Generator<SortStep> {
  const a = arr.slice();
  const n = a.length;
  let final: number[] = [];
  const aux = a.slice();
  function* merge(l: number, m: number, r: number): Generator<SortStep> {
    let i = l, j = m + 1, k = l;
    while (i <= m && j <= r) {
      yield { array: a.slice(), comparing: [i, j], finalIndices: final };
      if (aux[i] <= aux[j]) a[k++] = aux[i++];
      else a[k++] = aux[j++];
    }
    while (i <= m) a[k++] = aux[i++];
    while (j <= r) a[k++] = aux[j++];
    for (let t = l; t <= r; t++) aux[t] = a[t];
    yield { array: a.slice(), comparing: [], finalIndices: final };
  }
  function* ms(l: number, r: number): Generator<SortStep> {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    yield* ms(l, m);
    yield* ms(m + 1, r);
    yield* merge(l, m, r);
  }
  yield* ms(0, n - 1);
  yield { array: a.slice(), comparing: [], finalIndices: Array.from({ length: n }, (_, i) => i) };
}

export function* heapSort(arr: number[]): Generator<SortStep> {
  const a = arr.slice();
  const n = a.length;
  let final: number[] = [];
  function* heapify(n: number, i: number): Generator<SortStep> {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    if (l < n) yield { array: a.slice(), comparing: [i, l], finalIndices: final };
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n) yield { array: a.slice(), comparing: [i, r], finalIndices: final };
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      yield { array: a.slice(), comparing: [i, largest], finalIndices: final };
      yield* heapify(n, largest);
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    final = [i, ...final];
    yield { array: a.slice(), comparing: [0, i], finalIndices: final };
    yield* heapify(i, 0);
  }
  yield { array: a.slice(), comparing: [], finalIndices: Array.from({ length: n }, (_, i) => i) };
} 