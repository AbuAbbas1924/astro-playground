import { component$, useSignal } from "@qwik.dev/core";
import "@tw";
export const Counter = component$(() => {
    const count = useSignal(0);

    return (
        <button
            onClick$={() => count.value++}
            class="bg-blue-500 px-4 py-2 rounded text-white"
        >
            Count: {count.value}
        </button>
    );
});
