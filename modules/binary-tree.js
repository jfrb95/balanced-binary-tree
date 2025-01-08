import { Node } from "./node.js";

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
            //const node = find(value);

        },
        find(value, node=root) {
            if (node === null) {
                return null;
            }
            if (node.data === value) {
                return node;
            } else if (value < node.data) {
                this.find(value, node.left);
            } else if (value > node.data) {
                this.find(value, node.right);
            } else {
                throw new Error('Search value is not equal to, bigger than, or smaller than node.data');
            }
        }
    }
}