class NodeElement <NodeValue> {
    public value: NodeValue;
    public below: NodeElement<NodeValue> | null;
    public above: NodeElement<NodeValue> | null;

    constructor(value:NodeValue){
        this.value = value;
        this.below = null;
        this.above = null;
    }

}

class DoublyLinkedList<NodeValue> {
    public size:number;
    public topNodeElement: NodeElement<NodeValue> | null;
    public botNodeElement: NodeElement<NodeValue> | null;

    constructor(){
        this.size = 0;
        this.botNodeElement = null
        this.topNodeElement = this.botNodeElement;
    }
    
    public appendNodeElement(newValue:NodeValue): NodeValue {
        const newNodeElement = new NodeElement(newValue);
        if (this.size === 0 || this.topNodeElement === null) {
            this.botNodeElement = newNodeElement;
            this.topNodeElement = newNodeElement;
            this.size ++;
            return newValue;
        }
        // chaining up the elements so we can go from bot to top => iterate using .above with each node
        this.topNodeElement.above = newNodeElement;
        // chaining down the elements so we can go from top to bot => iterate using .below with each node
        newNodeElement.below = this.topNodeElement;
        this.topNodeElement = newNodeElement;

        this.size ++;
        return newValue;
    }

    public getBotNodeValue(): NodeValue | null {
        return (this.botNodeElement) ? this.botNodeElement.value : null;
    }

    public getTopNodeValue(): NodeValue | null {
        return (this.topNodeElement) ? this.topNodeElement.value : null;
    }

    public logTraverseNodesTopToBot():void {
        let currentNode = this.topNodeElement;
        while (currentNode) {
            console.log(currentNode.value);
            currentNode = currentNode.below;
        }
    }

    public logTraverseNodesBotToTop():void {
        let currentNode = this.botNodeElement;
        while (currentNode) {
            console.log(currentNode.value);
            currentNode = currentNode.above;
        }
    }

    private resetStructure():boolean {
        this.size = 0;
        this.botNodeElement = null
        this.topNodeElement = this.botNodeElement;
        return false;
    }

    public removeFromTop(): NodeValue | null {
        if (this.size < 2 || this.topNodeElement === null){
            this.resetStructure();
            return null;
        }
        const deletedValue = this.topNodeElement.value;
        const newTopNode = this.topNodeElement.below;
        this.topNodeElement = newTopNode;
        if (this.topNodeElement !== null) {
            this.topNodeElement.above = null;
        }
        this.size--;
        return deletedValue;
    }

    public removeFromBot(): NodeValue | null {
        if (this.size < 2 || this.botNodeElement === null){
            this.resetStructure();
            return null;
        }
        const deletedValue = this.botNodeElement.value;
        const newBotNode = this.botNodeElement.above;
        this.botNodeElement = newBotNode;
        if (this.botNodeElement !== null) {
            this.botNodeElement.below = null;
        }
        this.size--;
        return deletedValue;
    }
    
    //! making sure a certain string is key of another object
    private isKeyOfNodeElement(keyToTest: string, targetNode: NodeElement<NodeValue>): keyToTest is keyof typeof targetNode {
        return targetNode.hasOwnProperty(keyToTest);
    }
    private traverseUntilIndex(targetIndex:number, startNode: NodeElement<NodeValue>, propToGo: 'above' | 'below') {
        let currentNode: NodeElement<NodeValue> | null = startNode;
        //? currentIndex is this.size-1 (so we start from last) or 0 (so we start from beginning)
        //? variation is -1 (so we can go from last to start) or 1 (so we can go from start to last)
        //? below => go from last to start           above => go from start to last
        let [currentIndex, variation] = (propToGo === 'below') ? [this.size-1, -1] : [0, 1];
        while (currentNode) {
            console.log(`current value: ${currentNode['value']}`);
            if (currentIndex === targetIndex) return currentNode;
            currentNode = currentNode[propToGo];
            currentIndex += variation;
        }
        return null;
    }
    private innerGetNodeAtIndex(targetIndex:number) {
        type traverSetupValues = ['below' | 'above', NodeElement<NodeValue> | null];

        const [propToGo, startNode]: traverSetupValues = (targetIndex > Math.floor(this.size/2)) 
            ? ['below', this.topNodeElement] : ['above', this.botNodeElement];
        
        if (startNode === null) return null;
        if (this.size <= targetIndex || targetIndex < 0) return null;
        if (!this.isKeyOfNodeElement(propToGo, startNode)) {
            throw new Error("Key not owned by nodeElements");
        };
        return this.traverseUntilIndex(targetIndex, startNode, propToGo);
    }

    public getElementAtIndex(targetIndex:number): NodeValue | null {
        const traverseResult = this.innerGetNodeAtIndex(targetIndex);
        return (traverseResult === null) ? null : traverseResult.value;
    }
    public removeElementAtIndex(targetIndex:number): NodeValue | null {
        const traverseResult = this.innerGetNodeAtIndex(targetIndex);
        if (traverseResult === null) return null;
        const newAboveNode = traverseResult.above;
        const newBelowNode = traverseResult.below;
        if (newAboveNode !== null) newAboveNode.below = newBelowNode;
        if (newBelowNode !== null) newBelowNode.above = newAboveNode;
        return traverseResult.value;;
    }
}

const myDoublyLinkedList = new DoublyLinkedList();

console.log(myDoublyLinkedList.appendNodeElement("aaa"));
console.log(myDoublyLinkedList.appendNodeElement("bbb"));
console.log(myDoublyLinkedList.appendNodeElement("ccc"));
console.log(myDoublyLinkedList.appendNodeElement("ddd"));
console.log(myDoublyLinkedList.appendNodeElement("eee"));
console.log(myDoublyLinkedList.appendNodeElement("fff"));
console.log(myDoublyLinkedList.appendNodeElement("ggg"));

console.log('\n\n');
console.log(myDoublyLinkedList.getElementAtIndex(4));
console.log(myDoublyLinkedList.removeElementAtIndex(4));
console.log(myDoublyLinkedList.getElementAtIndex(4));