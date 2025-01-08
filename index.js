import { Tree } from "./modules/binary-tree.js";

const log = console.log;

const test = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 10, 11]);

const test2 = Tree([]);


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

//log(test.find(68));
//log(null);

//log(returnNull());

//prettyPrint(test.root);

//test.insert(2);

//prettyPrint(test.root);

//prettyPrint(test2.root);

//test2.insert(5);

//prettyPrint(test2.root);