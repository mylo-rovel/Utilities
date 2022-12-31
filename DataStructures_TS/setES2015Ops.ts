function unionSets<T>(setA: Set<T>, setB: Set<T>) {
    const unionSet = new Set<T>();
    setA.forEach(value => unionSet.add(value));
    setB.forEach(value => unionSet.add(value));
    return unionSet;
}

function intersectionSets<T>(setA: Set<T>, setB: Set<T>) {
    const intersectionSet = new Set<T>();
    let smallestSet = setA;
    let biggestSet = setB;
    if (smallestSet.size > biggestSet.size) {
        smallestSet = setB;
        biggestSet = setA;
    }
    const smallestIterator = smallestSet.values();
    for (const element of smallestIterator) {
        if (biggestSet.has(element)) intersectionSet.add(element);
    }
    return intersectionSet;
}

function differenceSets<T>(setA: Set<T>, setB: Set<T>) {
    const diffSet = new Set<T>();
    const mainSetIterator = setA.values();
    for (const element of mainSetIterator) {
        if (!setB.has(element)) diffSet.add(element);
    }
    return diffSet;
}


const set1 = new Set();
set1.add(1);
set1.add(2);
const set2 = new Set();
set2.add(1);
set2.add(2);
set2.add(3);
const set3 = new Set();
set3.add(2);
set3.add(3);
set3.add(4);