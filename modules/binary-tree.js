import { Node } from "./node.js";

const log = console.log;

export function Tree(array) {

    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    const root = buildTree(sortedArray);

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
        }
    }
}