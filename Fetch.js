fetch('https://localhost:3000/api/signin/user', {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify ({
        name: 'user1'
    })
})
    .then((res) =>{
        return res.json()})
    .then((data) => console.log(data))
    .catch((error) => console.log('error'));