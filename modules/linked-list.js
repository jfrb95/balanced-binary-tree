import { Node } from "./linked-list-node.js";

const log = console.log;

export function LinkedList() {
    
    let head = null;
    let size = 0;
    
    return {
        get head() {
            return head;
        },
        get tail() {
            if (!head) {
                return null;
            }
    
            let currentNode = head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
    
            return currentNode;
        },
        get size() {
            return size;
        },
        at(index) {
            if (index > size - 1) {
                return undefined;
            }
            if (!head) {
                return undefined;
            }
            let currentNode = head;
            let pointer = 0;
            while (pointer < index) {
                currentNode = currentNode.next;
                pointer += 1;
            }
            return currentNode;
        },
        append(value) {
            const newNode = Node(value);

            if (!head) {
                head = newNode;
            } else {
                this.tail.next = newNode;
            }

            size += 1;
        },
        prepend(value) {
            const newNode = Node(value, head);

            head = newNode;

            size += 1;
        },
        toString() {
            if (!head) {
                return null;
            }

            let str = '';
            let currentNode = head;
            while (currentNode) {
                str = str.concat('', '( ' + currentNode.value + ' ) -> ');
                currentNode = currentNode.next;
            }

            str = str.concat('', null);

            return str;
        },
        pop() {
            if (!head) {
                return null;
            } else if (size === 1) {
                const tailNode = head;
                head = null;

                size -= 1;

                return tailNode;
            } else {
                let currentNode = head;
                while (currentNode.next.next) {
                    currentNode = currentNode.next;
                }
                const tailNode = currentNode.next;
                currentNode.next = null;

                size -= 1;
                return tailNode;
            }
        },
        contains(value) {
            if (!head) {
                return false;
            }

            let currentNode = head;
            while (currentNode) {
                if (currentNode.value === value) {
                    return true
                }
                currentNode = currentNode.next;
                
            }

            return false;
        },
        find(value) {
            if (!head) {
                return null;
            }

            let index = 0;

            let currentNode = head;
            while (currentNode) {
                if (currentNode.value === value) {
                    return index;
                }
                index += 1;
                currentNode = currentNode.next;
            }

            return null;
        },
        insertAt(value, index) {
            if (index > size) {
                throw new Error('Index is larger than list size');
            }
            
            if (!head) {
                head = Node(value);
                size += 1;
                return;
            }
            if (index === size) {
                this.tail.next = Node(value);
                size += 1;
                return;
            }
            if (index === 0) {
                head = Node(value, head);
                size += 1;
                return;
            }

            let previousNode = head;
            while (index > 1) {
                index -= 1;
                previousNode = previousNode.next;
            }

            const newNode = Node(value, previousNode.next);
            previousNode.next = newNode;

            size += 1;
        },
        removeAt(index) {
            if (index > size - 1) {
                throw new Error("Index is larger than list size")
            }
            if (!head) {
                return;
            }
            if (index === 0) {
                const oldHead = head;
                head = head.next;
                size -= 1;
                return oldHead;
            }

            let previousNode = head;
            while (index > 1) {
                previousNode = previousNode.next;
                index -= 1;
            }
            const deleteThisNode = previousNode.next;
            previousNode.next = previousNode.next.next;
            size -= 1;

            return deleteThisNode;
        }
    }
}