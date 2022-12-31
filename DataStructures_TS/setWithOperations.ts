
class SetCustom <valueType> {
    private items: Map<valueType, 1>;
    private setSize: number;

    public constructor() {
        this.items = new Map<valueType, 1>();
        this.setSize = 0;
    }

    public has(targetValue: valueType) {
        return this.items.has(targetValue);
    }

    public add(newValue: valueType) {
        if (this.has(newValue)) return false;
        this.items.set(newValue,1);
        this.setSize ++;
        return true;
    }

    public delete(newValue: valueType) {
        if (!this.has(newValue)) return false;
        this.items.delete(newValue);
        this.setSize --;
        return true;
    }

    public clear(){
        this.items = new Map<valueType, 1>();
    }

    public size() {
        return this.setSize;
    }

    public values() {
        const keysIterator = this.items.keys();
        const values: valueType[] = [];
        for (const key of keysIterator) {
            values.push(key);
        }
        return values;
    }

    public union(otherSet: SetCustom<valueType>) {
        const unionSet = new SetCustom<valueType>();
        const mainSetIterator = this.items.keys();
        const otherSetIterator = otherSet.items.keys();
        for (const elementMain of mainSetIterator) {
            unionSet.add(elementMain);
        }
        for (const elementOther of otherSetIterator) {
            unionSet.add(elementOther);
        }
        return unionSet;
    }

    public intersection(otherSet: SetCustom<valueType>) {
        const intersectionSet = new SetCustom<valueType>();
        let smallestSet:SetCustom<valueType> = this;
        let biggestSet: SetCustom<valueType> = otherSet;
        if (smallestSet.size > biggestSet.size) {
            smallestSet = otherSet;
            biggestSet = this;
        }
        const smallestIterator = smallestSet.items.keys();
        for (const element of smallestIterator) {
            if (biggestSet.has(element)) intersectionSet.add(element);
        }
        return intersectionSet;
    }

    public difference(otherSet: SetCustom<valueType>) {
        const diffSet = new SetCustom<valueType>();
        const mainSetIterator = this.items.keys();
        for (const element of mainSetIterator) {
            if (!otherSet.has(element)) diffSet.add(element);
        }
        return diffSet;
    }

    public isSubsetOf(otherSet: SetCustom<valueType>) {
        // if the current set is bigger, obviously is not a subset
        if (this.size > otherSet.size) return false;

        const mainSetIterator = this.items.keys();
        for (const elementMain of mainSetIterator) {
            // if a element is not found in otherSet, this is not superSet
            if (!otherSet.has(elementMain)) return false;
        }
        return true;
    }
}

const setA = new SetCustom();
setA.add(1);
setA.add(2);
const setB = new SetCustom();
setB.add(1);
setB.add(2);
setB.add(3);
const setC = new SetCustom();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.isSubsetOf(setB));
console.log(setA.isSubsetOf(setC));
