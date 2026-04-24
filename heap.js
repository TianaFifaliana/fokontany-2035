class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Ajouter un élément
    insert(element) {
        this.heap.push(element);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[parentIndex].priority >= this.heap[index].priority) break;

            [this.heap[parentIndex], this.heap[index]] =
            [this.heap[index], this.heap[parentIndex]];

            index = parentIndex;
        }
    }

    // Retirer le plus prioritaire
    extractMax() {
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown();

        return max;
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < length && this.heap[left].priority > this.heap[largest].priority)
                largest = left;

            if (right < length && this.heap[right].priority > this.heap[largest].priority)
                largest = right;

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] =
            [this.heap[largest], this.heap[index]];

            index = largest;
        }
    }

    getAll() {
        return this.heap;
    }
}

module.exports = MaxHeap;