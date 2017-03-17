/**
 * @file  LRU - frome zrender
 * @author  pissang
 * @author  chris
 */

/**
 * Simple double linked list. Compared with array, it has O(1) remove operation.
 *
 * @class LinkedList
 */
class LinkedList {

    constructor() {
        /**
         * @type {LRU~Entry}
         */
        this.head = null;

        /**
         * @type {LRU~Entry}
         */
        this.tail = null;

        this._len = 0;
    }

    /**
     * Insert a new value at the tail
     *
     * @param  {*} val new value
     * @return {LRU~Entry}
     */
    insert(val) {
        let entry = new Entry(val);
        this.insertEntry(entry);
        return entry;
    }

    /**
     * Insert an entry at the tail
     *
     * @param  {LRU~Entry} entry entry to insert
     */
    insertEntry(entry) {
        if (!this.head) {
            this.head = this.tail = entry;
        }
        else {
            this.tail.next = entry;
            entry.prev = this.tail;
            entry.next = null;
            this.tail = entry;
        }
        this._len++;
    }

    /**
     * Remove entry.
     *
     * @param  {LRU~Entry} entry entry to remove
     */
    remove(entry) {
        let {prev, next} = entry;
        if (prev) {
            prev.next = next;
        }
        else {
            // Is head
            this.head = next;
        }
        if (next) {
            next.prev = prev;
        }
        else {
            // Is tail
            this.tail = prev;
        }
        entry.next = entry.prev = null;
        this._len--;
    }

    clear() {
        this.head = this.tail = null;
        this._len = 0;
    }

    /**
     * Length of the list
     *
     * @return {number}
     */
    get length() {
        return this._len;
    }
}

/**
 * Entry
 *
 * @class
 */
class Entry {

    /**
     * constructor
     *
     * @param {*} val value
     */
    constructor(val) {

        /**
         * @type {*}
         */
        this.value = val;

        /**
         * @type {LRU~Entry}
         */
        this.next;

        /**
         * @type {LRU~Entry}
         */
        this.prev;
    }
}

/**
 * LRU Cache
 *
 * @class
 */
export default class LRU {

    /**
     * constructor
     *
     * @param {number} maxSize max size to cached
     */
    constructor(maxSize) {

        this._list = new LinkedList();

        this._map = {};

        this._maxSize = maxSize || 10;

        this._lastRemovedEntry = null;
    }


    /**
     * Put new Entry
     *
     * @param  {string} key the key
     * @param  {*} value the value
     * @return {*} Removed value
     */
    put(key, value) {
        let list = this._list;
        let map = this._map;
        let removed = null;
        if (map[key] == null) {
            let len = list.length;
            // Reuse last removed entry
            let entry = this._lastRemovedEntry;

            if (len >= this._maxSize && len > 0) {
                // Remove the least recently used
                let leastUsedEntry = list.head;
                list.remove(leastUsedEntry);
                delete map[leastUsedEntry.key];

                removed = leastUsedEntry.value;
                this._lastRemovedEntry = leastUsedEntry;
            }

            if (entry) {
                entry.value = value;
            }
            else {
                entry = new Entry(value);
            }
            entry.key = key;
            list.insertEntry(entry);
            map[key] = entry;
        }

        return removed;
    }

    /**
     * Get Entry value
     *
     * @param  {string} key the key
     * @return {*}
     */
    get(key) {
        let entry = this._map[key];
        let list = this._list;
        if (entry != null) {
            // Put the latest used entry in the tail
            if (entry !== list.tail) {
                list.remove(entry);
                list.insertEntry(entry);
            }

            return entry.value;
        }

    }

    /**
     * Clear the cache
     */
    clear() {
        this._list.clear();
        this._map = {};
    }
}
