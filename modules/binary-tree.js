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
                return this.find(value, node.left);
            }
            else if (value > node.data) {
                return this.find(value, node.right);
            }
            else {
                throw new Error('Search value is not equal to, bigger than, or smaller than node.data');
            }
        },
        levelOrder(callback, node=root) {
            
            if (typeof callback !== 'function') {
                throw new Error('levelOrder must have a function as an argument.');
            }

            //RECURSIVE APPROACH, DOES NOT VISIT IN CORRECT ORDER
            /*
            callback(node);

            if (node.left) {
                this.levelOrder(callback, node.left);
            }
            if (node.right) {
                this.levelOrder(callback, node.right);
            }
            */

            //ITERATIVE APPROACH:
            
            const queue = LinkedList();

            queue.append(root);
            
            while (queue.size > 0) {
                const currentNode = queue.removeAt(0).value;
                
                callback(currentNode);

                if (currentNode.left) {
                    queue.append(currentNode.left);
                }
                if (currentNode.right) {
                    queue.append(currentNode.right);
                }
            }
                

        },
        inOrder(callback, node=root) {
            if (typeof callback !== 'function') {
                throw new Error('inOrder must have a function as an argument.');
            }

            if (node === null) {
                return;
            }

            this.inOrder(callback, node.left);
            callback(node);
            this.inOrder(callback, node.right);

        },
        preOrder(callback, node=root) {
            if (typeof callback !== 'function') {
                throw new Error('preOrder must have a function as an argument.');
            }

            if (node === null) {
                return;
            }

            callback(node);
            this.preOrder(callback, node.left);
            this.preOrder(callback, node.right);

        },
        postOrder(callback, node=root) {
            if (typeof callback !== 'function') {
                throw new Error('postOrder must have a function as an argument.');
            }

            if (node === null) {
                return;
            }

            this.postOrder(callback, node.left);
            this.postOrder(callback, node.right);
            callback(node);
        },
        height(node) {
            if (!node) {
                return -1;
            }
            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);

            const nodeHeight = Math.max(leftHeight, rightHeight) + 1;

            return nodeHeight
        },
        depth(node, origin=root) {
            if (!node) {
                return null;
            }
            if (!origin) {
                return null;
            }

            let distance = 0;

            if (origin.data === node.data) {
                return distance;
            }
            else if (origin.data < node.data) {
                return this.depth(node, origin.right) + 1;
            }
            else if (origin.data > node.data) {
                return this.depth(node, origin.left) + 1;
            }
            else {
                throw new Error('node and origin values are not equal or different.')
            }
        },
        isBalanced(node=root) {
            if (!node) {
                return true;
            }

            if (!this.isBalanced(node.left)) {
                return false;
            }

            if (!this.isBalanced(node.right)) {
                return false;
            }

            if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
                return false;
            }

            return true;
        },
        rebalance() {
            const newArray = [];

            this.inOrder((node) => {
                newArray.push(node.data);
            });

            root = buildTree(newArray);
        }
    }
}