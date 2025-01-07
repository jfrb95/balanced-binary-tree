export function Node(data=null, left=null, right=null) {

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
        }
    }
}