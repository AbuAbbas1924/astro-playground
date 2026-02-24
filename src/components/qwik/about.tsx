import { component$ } from "@builder.io/qwik";
// import { Link } from "@builder.io/qwik-city";

export const About = component$(() => {
    return (<div>
        <h1>About Page</h1>
        <p>This is the about page of our Qwik application.</p>
        <a href="/">Go to Home</a>
    </div>);
});
