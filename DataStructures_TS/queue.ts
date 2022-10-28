class NodeElement<NodeValueType> {
    public value: NodeValueType;
    public below: NodeElement<NodeValueType> | null;
    public above: NodeElement<NodeValueType> | null;

    constructor(value:NodeValueType){
        this.value = value;
        this.below = null;
        this.above = null;
    }

}

class Queue<NodeValueType> {
    public size:number;
    public topNodeElement: NodeElement<NodeValueType> | null;
    public botNodeElement: NodeElement<NodeValueType> | null;
    public stringValues: string;

    constructor(){
        this.size = 0;
        this.botNodeElement = null
        this.topNodeElement = this.botNodeElement;
        this.stringValues = "";
    }
    
    public appendNodeElement(newValue: NodeValueType): string {
        const newNodeElement = new NodeElement(newValue);
        if (this.size === 0 || this.topNodeElement === null) {
            this.botNodeElement = newNodeElement;
            this.topNodeElement = newNodeElement;
            this.stringValues = `${newValue}`;
            this.size ++;
            return this.stringValues;
        }
        // chaining up the elements so we can go from bot to top => iterate using .above with each node
        this.topNodeElement.above = newNodeElement;
        // chaining down the elements so we can go from top to bot => iterate using .below with each node
        newNodeElement.below = this.topNodeElement;
        // setting the new top element
        this.topNodeElement = newNodeElement;

        this.stringValues += ` => ${newValue}`;
        this.size ++;
        return this.stringValues;
    }

    public getBotNodeValue(): NodeValueType | null {
        return (this.botNodeElement) ? this.botNodeElement.value : null;
    }

    public getTopNodeValue(): NodeValueType | null {
        return (this.topNodeElement) ? this.topNodeElement.value : null;
    }

    public traverseNodesTopToBot():void {
        let currentNode = this.topNodeElement;
        while (currentNode) {
            console.log(currentNode.value);
            currentNode = currentNode.below;
        }
    }

    public traverseNodesBotToTop():void {
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
        this.stringValues = "";
        return false;
    }

    public removeFromBot(): boolean {
        if (this.size < 2 || this.botNodeElement === null){
            return this.resetStructure();
        }
        const newBotNode = this.botNodeElement.above;
        this.botNodeElement = newBotNode;
        if (this.botNodeElement !== null) {
            this.botNodeElement.below = null;
        }
        this.stringValues = this.stringValues.slice(7, this.stringValues.length);
        this.size --;
        return true;
    }
}

const myQueue = new Queue();

console.log(myQueue.appendNodeElement("aaa"));

console.log(myQueue.appendNodeElement("bbb"));

console.log(myQueue.appendNodeElement("ccc"));

console.log(myQueue.appendNodeElement("ddd"));

console.log(myQueue.appendNodeElement("eee"),'\n\n');
