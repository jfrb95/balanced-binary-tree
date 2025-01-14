export function Node(data=null, left=null, right=null) {

    //node values are unique, so two nodes are equal if data is equal
    function isEqual(node) {
        return data === node.data;
    }

    return {
        get data() {
            return data;
        },
        set data(value) {
            data = value;
        },
        get left() {
            return left;
        },
        set left(value) {
            left = value;
        },
        get right() {
            return right;
        },
        set right(value) {
            right = value;
        },
        isEqual
    }
}