const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = weatherForm.location.value.trim();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then(response => {
    response.json().then( data => {
        if(data.error) {
            messageOne.textContent = data.error;
        } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
    }
    });
});
    weatherForm.reset();
});

 