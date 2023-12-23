import { writable } from 'svelte/store';

const functionsList = writable([{
    id: "uuid1",
    name: "lol"
}]);



export default functionsList;