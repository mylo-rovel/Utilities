function mergeSort<T> (array: T[]) {
  if (array.length === 1) {
    return array
  }
  let half = Math.floor(array.length/2);

  let left = array.slice(0, half);
  let right = array.slice(half);

  return innerMerge(
    mergeSort(left),
    mergeSort(right)
  )  //this is needed because we have to have a way to recall the function and compare the arrays
    //this approach will lead us to the very array's components: each element
    //comparing those we will go back to larger arrays
    //recursivity is kind of debt; we have to return something at some point
}

function innerMerge<T>(left: T[], right: T[]){
  let merged_arr: T[] = [];

  let [i, j] = [0,0]; //not an array. just destructuring to initialize those vars
  while (true) {  // SIMPLEMENTE COMPARO LOS VALORES HASTA QUE ALGUN ARRAY DÉ UNDEFINED
    if (left[i] < right[j]) {
      merged_arr.push(left[i]);
      i++;
    }
    else if (left[i] >= right[j]) {
      merged_arr.push(right[j]);
      j++;
    }
    else { // concateno lo que me sobra => ojo YA VIENE ORDENADO
      if (!left[i]) { //! si se me acaba primero la lista izquierda
        merged_arr = merged_arr.concat(right.slice(j));
        break
      }
      else{  //! si se me acaba primero la lista derecha
        merged_arr = merged_arr.concat(left.slice(i));
        break
      }
    }

  }
  return merged_arr; //lista con todos los valores ordenados
}

/* const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
const answer = mergeSort(numbers);
console.log(answer); */