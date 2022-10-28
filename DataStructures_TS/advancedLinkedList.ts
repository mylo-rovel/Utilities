class NodeElement {
    public value: string;
    public below: NodeElement | null;
    public above: NodeElement | null;

    constructor(value:string){
        this.value = value;
        this.below = null;
        this.above = null;
    }

}

class FlexLinkedList {
    public size:number;
    public topNodeElement: NodeElement | null;
    public botNodeElement: NodeElement | null;
    public stringValues: string;

    constructor(){
        this.size = 0;
        this.botNodeElement = null
        this.topNodeElement = this.botNodeElement;
        this.stringValues = "";
    }
    
    public appendNodeElement(newValue:string): string {
        const newNodeElement = new NodeElement(newValue);
        if (this.size === 0 || this.topNodeElement === null) {
            this.botNodeElement = newNodeElement;
            this.topNodeElement = newNodeElement;
            this.stringValues = newValue;
            this.size ++;
            return this.stringValues;
        }
        // chaining up the elements so we can go from bot to top => iterate using .above with each node
        this.topNodeElement.above = newNodeElement;
        // chaining down the elements so we can go from top to bot => iterate using .below with each node
        newNodeElement.below = this.topNodeElement;
        this.topNodeElement = newNodeElement;

        this.stringValues += ` => ${newValue}`;
        this.size ++;
        return this.stringValues;
    }

    public getBotNodeValue(): string | null {
        return (this.botNodeElement) ? this.botNodeElement.value : null;
    }

    public getTopNodeValue(): string | null {
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

    public removeFromTop(): boolean {
        if (this.size < 2 || this.topNodeElement === null){
            return this.resetStructure();
        }
        const newTopNode = this.topNodeElement.below;
        this.topNodeElement = newTopNode;
        if (this.topNodeElement !== null) {
            this.topNodeElement.above = null;
        }
        this.stringValues = this.stringValues.slice(0, this.stringValues.length-7);
        this.size --;
        return true;
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

const myStack = new FlexLinkedList();

console.log(myStack.appendNodeElement("aaa"));

console.log(myStack.appendNodeElement("bbb"));

console.log(myStack.appendNodeElement("ccc"));

console.log(myStack.appendNodeElement("ddd"));

console.log(myStack.appendNodeElement("eee"),'\n\n');
// console.log(`bot:${myStack.getBotNodeValue()} - top:${myStack.getTopNodeValue()}\n`);

myStack.removeFromBot();
myStack.traverseNodesBotToTop();
console.log('\n\n');
myStack.traverseNodesTopToBot();

// console.log(myStack.stringValues);
// myStack.removeFromTop();
// console.log(myStack.stringValues);
// myStack.removeFromTop();
// console.log(myStack.stringValues);
// myStack.removeFromTop();
// console.log(myStack.stringValues);

