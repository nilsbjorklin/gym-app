import { createSignal, type Component, For, createEffect } from 'solid-js';
import { createStore } from "solid-js/store";

type Exercise = {
    name: string
    weight: string
}

const App: Component = () => {
    const [exercise, setExercise] = createSignal<Exercise[]>([])
    const [fields, setFields] = createStore<Record<string, any>>()

    function addExercise(e: Event) {
        console.log(fields);

        e.preventDefault()
        setExercise((prev) => {
            return [...prev, { name: fields.name, weight: fields.weight }]
        })
        setFields(Object.keys(fields), undefined);
    }

    function removeExercise(index: number) {

        setExercise((prev) => {
            return [...prev.filter((exercise, i) => i !== index)]
        })
        setFields(Object.keys(fields), undefined);
    }

    return (
        <div>
            <div>
                <For each={exercise()}>{(exercise, index) =>
                    <p>{exercise.name}: {exercise.name}kg
                        <button
                            type='submit'
                            class='bg-red-600 rounded text-white py-1 px-4 hover:bg-white hover:text-gray-700'
                            onclick={() => removeExercise(index())}>
                                ta bort
                        </button></p>
                }</For>
            </div>
            <div class='bg-gray-300'>
                <form onSubmit={addExercise}>
                    <input class='bg-inherit' value={fields.name ?? ''} placeholder='exercise name' onInput={(e) => setFields('name', e.target.value)} />
                    <input class='bg-inherit' value={fields.weight ?? ''} placeholder='weight' onInput={(e) => setFields('weight', e.target.value)} />
                    <button type='submit' class='bg-gray-700 rounded text-white py-1 px-4 hover:bg-white hover:text-gray-700'>submit</button>
                </form>
            </div>
        </div>
    );
};

export default App;
