import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <h1>Counter: {count()}</h1>
      <button onClick={() => setCount(count() + 1)}>Increment</button>
    </div>
  );
}
