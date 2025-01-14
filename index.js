import { Tree } from "./modules/binary-tree.js";

const log = console.log;

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

function printNodeCallback(node) {
  log(node.data);
}

const array = [...Array(100)].map(() => Math.floor(Math.random()*100));

const tree = Tree(array);

prettyPrint(tree.root);

// log(tree.isBalanced());

//log('preOrder print');
//tree.preOrder(printNodeCallback);

// log('postOrder print');
// tree.postOrder(printNodeCallback)

// log('inOrder print');
// tree.inOrder(printNodeCallback)

for (let i = 100; i < 200; i+=1) {
    const chance = Math.random();

    if (chance > 0.4) {
        tree.insert(i);
    }
}

// log(tree.isBalanced());

tree.rebalance();

// log('preOrder print');
// tree.preOrder(printNodeCallback);

// log('postOrder print');
// tree.postOrder(printNodeCallback)

log('inOrder print');
tree.inOrder(printNodeCallback)