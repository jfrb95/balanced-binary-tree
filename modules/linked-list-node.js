export function Node(value=null, next=null) {
    
    
    return {
        get value() {
            return value;
        },
        set value(val) {
            value = val;
        },
        get next() {
            return next;
        },
        set next(node) {
            next = node;
        }
    }
}