import { Node } from "./node.js";
import { LinkedList } from "./linked-list.js";

const log = console.log;

export function Tree(array) {

    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    let root = buildTree(sortedArray);

    function buildTree(array) {

        if (array.length === 0) {
            return null;
        }

        if (array.length === 1) {
            return Node(array[0]);
        }

        const start = 0;
        const end = array.length - 1;
        const rootIndex = Math.floor((start + end) / 2);
        const rootData = array[rootIndex];

        const leftEnd = 
            array.length % 2 === 0
                ? Math.floor(array.length / 2) - 1
                : Math.floor(array.length / 2);
        const leftArray = array.slice(0, leftEnd);

        const rightArray = array.slice(rootIndex + 1, array.length);

        const root = Node(rootData, buildTree(leftArray), buildTree(rightArray));

        return root;
    }

    function deleteNode(value, node=root) {
        if (node === null) {
            return node;
        }

        if (node.data > value) {
            node.left = deleteNode(value, node.left);
        } else if (node.data < value) {
            node.right = deleteNode(value, node.right);
        } else if (node.data === value) {
            
            if (node.left === null) {
                return node.right;
            }

            if (node.right === null) {
                return node.left;
            }

            const successor = getLowestSuccessor(node);
            node.data = successor.data;
            node.right = deleteNode(successor.data, node.right);
        } else {
            throw new Error('node.data is not equal to, greater than, or smaller than the search value.');
        }

        return node;
    }

    function getLowestSuccessor(node) {
        let successor = node.right;
        while (successor !== null && successor.left !== null) {
            successor = successor.left;
        }
        return successor;
    }


    return {
        get root() {
            return root;
        },
        insert(value, node=root, parent=null, side=null) {
            if (!root) {
                root = Node(value);
                return;
            }
            if (!node) {
                node = Node(value);

                (function updateParent(parent) {
                    if (side === 'left') {
                        parent.left = node;
                    } else if (side === 'right') {
                        parent.right = node;
                    } else {
                        throw new Error('Side is not left or right.');
                    }
                })(parent);

            } else if (value < node.data) {
                this.insert(value, node.left, node, 'left');
            } else if (value > node.data) {
                this.insert(value, node.right, node, 'right');
            } else if (value === node.data) {
                log('Value already exists in the tree');
                return;
            } else {
                throw new Error('Something went wrong with value and node.data.')
            }
        },
        deleteItem(value) {
            root = deleteNode(value);
        },
        find(value, node=root) {
            if (node === null) {
                return null;
            }
            if (node.data === value) {
                return node;
            }
            else if (value < node.data) {
                this.find(value, node.left);
            }
            else if (value > node.data) {
                this.find(value, node.right);
            }
            else {
                throw new Error('Search value is not equal to, bigger than, or smaller than node.data');
            }
        },
        levelOrder(callback) {
            //traverses tree breadth first and call callback on each node
            //  as it traverses, passes whole node into callback as argument.
            
            if (typeof callback !== 'function') {
                throw new Error('levelOrder must have a function as an argument.');
            }

            const queue = LinkedList();

            queue.append(root);
            
            while (queue.size > 0) {
                const currentNode = queue.removeAt(0).value;
                
                callback(currentNode);

                if (currentNode.left) {
                    queue.append(currentNode.left);
                }
                if(currentNode.right) {
                    queue.append(currentNode.right);
                }
            }

        }
    }
}