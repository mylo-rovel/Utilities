function quickSort(arrayToSort: number[], leftIndex:number, rightIndex:number){
  let pivotIndex: number;
  let partitionIndex: number;

  if(leftIndex < rightIndex) {
    pivotIndex = rightIndex;
    partitionIndex = partition(arrayToSort, pivotIndex, leftIndex, rightIndex);
    
    //? DIVIDE AND CONQUER => IS QUICKER IF WE WORK WITH HALF OF THE INPUT
    quickSort(arrayToSort, leftIndex, partitionIndex - 1);
    quickSort(arrayToSort, partitionIndex + 1, rightIndex);
  }
  return arrayToSort;
}
   
function partition(arrayToSort: number[], pivotIndex: number, leftIndex: number, rightIndex: number){
  let pivotValue = arrayToSort[pivotIndex];
  let partitionIndex = leftIndex;

  for(let i = leftIndex; i < rightIndex; i++) {
    if(arrayToSort[i] < pivotValue){
      swap(arrayToSort, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(arrayToSort, rightIndex, partitionIndex);
  return partitionIndex;
}

function swap(arrayToSort: number[], firstIndex: number, secondIndex: number){
    const tempAuxElement = arrayToSort[firstIndex];
    arrayToSort[firstIndex] = arrayToSort[secondIndex];
    arrayToSort[secondIndex] = tempAuxElement;
}

const numbers =   [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
//Select first and last index as 2nd and 3rd parameters
quickSort(numbers, 0, numbers.length - 1);
console.log(numbers);