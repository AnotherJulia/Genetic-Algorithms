fetch('data.json').then(response => {
    console.log(response); 
    return response.json();
}).then (response => {
    console.log(response);
})