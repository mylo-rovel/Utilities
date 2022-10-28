/* 
todo Implement a Binary Search Tree with this structure:
class Node {
  constructor(value){
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }
  insert(value){
    //Code here
  }
  lookup(value){
    //Code here
  }
  // remove
}
* And save this data:
todo //     9
todo //  4     20
todo //1  6  15  170

*/

class NodeElement<NodeValueType> {
    private value:NodeValueType;
    private right: NodeElement<NodeValueType> | null;
    private left: NodeElement<NodeValueType> | null;

    constructor(value:NodeValueType){
      this.value = value;
      this.right = null;
      this.left = null;
    }
    public getLeft()  {return this.left;}
    public getRight() {return this.right;}
    public getValue() {return this.value;}
    
    public setLeft(value:NodeValueType | null)  {
        if (value === null) this.left = null;
        else this.left = new NodeElement(value);
        return this.left;
    }
    public setRight(value:NodeValueType | null) {
        if (value === null) this.right = null;
        else this.right = new NodeElement(value);
        return this.right;
    }
    public setValue(value:NodeValueType) {
        this.value = value;
        return this.right;
    }
    
    public setNewLeftSubTree(newSubTree: NodeElement<NodeValueType>)  {
      this.left = newSubTree;
      return this.left;
    }
    public setNewRightSubTree(newSubTree: NodeElement<NodeValueType>)  {
        this.right = newSubTree;
        return this.right;
    }
}
  
interface IDo3CaseReplacement<NodeValueType> {
  leftMostNode: NodeElement<NodeValueType> | null ;
  leftMostParent: NodeElement<NodeValueType>; 
  targetNode: NodeElement<NodeValueType>; 
}

class BinarySearchTree<NodeValueType> {
    private root: NodeElement<NodeValueType> | null;

    public constructor(){
        this.root = null;
    }
    public insert(value: NodeValueType){
        // set the root value
        if (this.root === null) {
            this.root = new NodeElement(value);
            return this.root.getValue();
        }
        const parentNode = this.searchParentNode(value);
        if (parentNode === null) return null;

        const nodeValue = parentNode.getValue();
        if (nodeValue < value) parentNode.setRight(value);
        else if (nodeValue > value) parentNode.setLeft(value);
        // if the value is repeated, ignore
        return parentNode.getValue();
        
    }
    public logRootNode() {
      console.log(this.root, '\n\n\n');
    }

    //? THIS FUNCTION IS JUST TO FIND A NODE WHERE THE NEW VALUE CAN BE APPENDED TO
    private searchParentNode(targetValue: NodeValueType) {
        let currentNode: NodeElement<NodeValueType> | null = this.root;
        let currentNodeValue:NodeValueType;
        let nextNode: NodeElement<NodeValueType> | null;
        const nodesPathArr:NodeElement<NodeValueType>[] = [];

        while (currentNode !== null) {
            nodesPathArr.push(currentNode);
            currentNodeValue = currentNode.getValue();
            if ( currentNodeValue < targetValue ) nextNode = currentNode.getRight();
            else if ( currentNodeValue > targetValue ) nextNode = currentNode.getLeft();
            else break; // if the value is the same
            if (nextNode === null) break; // return currentNode
            currentNode = nextNode;
        }
        return currentNode;
    }

    public lookup(value: NodeValueType){
      let currentNode:NodeElement<NodeValueType> | null = this.root;
      const nodesPathArr:NodeElement<NodeValueType>[] = [];
      if (!this.root) return {targetNode: null, nodesPathArr};
      
      while(currentNode){
        nodesPathArr.push(currentNode);
        if (value < currentNode.getValue()) currentNode = currentNode.getLeft();
        else if (value > currentNode.getValue()) currentNode = currentNode.getRight();
        else if (value === currentNode.getValue()) return {targetNode: currentNode, nodesPathArr};
      }
      return {targetNode: null, nodesPathArr};
    }

    private countNodeChildren = (targetNode:NodeElement<NodeValueType>) => {
      const rightChild = (targetNode.getRight() === null) ? 0 : 1;
      const leftChild  = (targetNode.getLeft() === null)  ? 0 : 1;
      return (rightChild + leftChild);
    }

    private firstCaseRemoval(nodesPathArr: NodeElement<NodeValueType>[]) {
      // CASE 1: node has 0 childs (is a leaf)
      const parentNode = nodesPathArr[nodesPathArr.length-2];
      const valueToRemove = nodesPathArr[nodesPathArr.length-1].getValue();
      // if we have to delete the right child 
      if (parentNode.getValue() < valueToRemove) parentNode.setRight(null);
      else {parentNode.setLeft(null);}
    }


    private getReplacementNode (toReplaceNode: NodeElement<NodeValueType>) {
      if (toReplaceNode.getLeft() !== null) return toReplaceNode.getLeft(); 
      else return toReplaceNode.getRight();
    }
    private secondCaseRemoval(nodesPathArr: NodeElement<NodeValueType>[]) {
      // CASE 2: node has 1 child
      const toReplaceNode = nodesPathArr[nodesPathArr.length-1];
      let replacementNode = this.getReplacementNode(toReplaceNode);
      if (replacementNode === null) return;

      const parentNode = nodesPathArr[nodesPathArr.length-2];
      if (parentNode.getValue() > toReplaceNode.getValue()) parentNode.setNewLeftSubTree(replacementNode);
      else parentNode.setNewRightSubTree(replacementNode);
    }


    private traverseLeftChilds(rootNode: NodeElement<NodeValueType>) {
      let currNode: typeof rootNode | null = rootNode;
      let parentCurrNode: typeof rootNode | null = rootNode;
      while (true) {
        //* this never happens but is for ts madness
        if (currNode === null) return {leftMostNode: currNode, leftMostParent: parentCurrNode};
        
        if (currNode.getLeft() === null) return { leftMostNode: currNode, leftMostParent: parentCurrNode };
        else {
          parentCurrNode = currNode;
          currNode = currNode.getLeft();
        }
      }
    }
    private thirdCaseRemoval(nodesPathArr: NodeElement<NodeValueType>[]) {
      // CASE 3: node has 2 childs
      const targetNode = nodesPathArr[nodesPathArr.length-1];
      const targetRightChild = targetNode.getRight();
      if (targetRightChild === null) return;
      // if the right child is a leaf => we can use it as replacement
      if (this.countNodeChildren(targetRightChild) === 0) {
        targetNode.setValue(targetRightChild.getValue());
        targetNode.setRight(null);
        return;
      }
      // otherwise, we would have to traverse through left childs
      const {leftMostNode, leftMostParent} = this.traverseLeftChilds(targetRightChild);
      return this.do3CaseReplacement({leftMostNode, leftMostParent, targetNode});
    }
    private do3CaseReplacement({leftMostNode, leftMostParent, targetNode}: IDo3CaseReplacement<NodeValueType>) {
      if (leftMostNode === null) return;
      //* 1st, replace targetNode value with leftMostNode one
      targetNode.setValue(leftMostNode.getValue());
      //* 2nd, replace leftMostParent left child with leftMostNode right child
      const newLeftChild = leftMostNode.getRight();
      if (newLeftChild !== null) leftMostParent.setNewLeftSubTree(newLeftChild);
      else leftMostParent.setLeft(null);
      return;
    }
    

    private removeByCases(childAmount: number, nodesPathArr: NodeElement<NodeValueType>[]) {
      switch (childAmount) {
        case 0: // CASE 1: node has 0 childs (is a leaf)
          return this.firstCaseRemoval(nodesPathArr);
        case 1: // CASE 2: node has 1 child
          return this.secondCaseRemoval(nodesPathArr);
        case 2: // CASE 3: node has 2 childs
          return this.thirdCaseRemoval(nodesPathArr);
        default:
          return;
      }
    }
    public remove(value: NodeValueType) {
      // first: find the node
      const {targetNode, nodesPathArr} = this.lookup(value);
      if (targetNode === null) return null;
      // at this point, the node exists
      const childAmount = this.countNodeChildren(targetNode);
      return this.removeByCases(childAmount, nodesPathArr);
    }


    private recursiveReverseTree(root: NodeElement<NodeValueType> | null) {
      if (root === null) return;
      this.recursiveReverseTree(root.getLeft());
      this.recursiveReverseTree(root.getRight());
      const leftSubTree = root.getLeft();
      const rightSubTree = root.getRight()
      if (rightSubTree !== null) root.setNewLeftSubTree(rightSubTree);
      if (leftSubTree !== null) root.setNewRightSubTree(leftSubTree);
    }
    public reverseTree() {
      const root = this.root;
      this.recursiveReverseTree(root);
    }
}

const tree = new BinarySearchTree<number>();
tree.insert(9);
tree.insert(9);
tree.insert(4);
tree.insert(20);
tree.insert(1);
tree.insert(6);
tree.insert(15);
tree.insert(170);
// tree.insert(10);
// tree.insert(17);
// tree.insert(125);
// tree.insert(195);
//todo //        9
//todo //  4          20
//todo //1  6     15      170
//todo //      10   17  125  195

tree.logRootNode();
// tree.remove(9);
tree.reverseTree();
tree.logRootNode();