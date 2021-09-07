// 

const inputField = document.getElementById('input')
const container = document.getElementById('photo-container')
const header = document.getElementById('header')
const sliderMaker = document.getElementById('sliderMaker')
const slider = document.getElementById('slider')
const sliderImg = document.getElementById('slider-img')
const duration = document.getElementById('duration')
let selectedImg = []

inputField.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        const inputValue = inputField.value;
        if (!inputValue) {
            alert('Input filed is empty ⚠️ ')
        } else {
            const apiUrl = `https://pixabay.com/api/?key=23278526-ccebb0144e3fe9e60ffa4a455&q=${inputValue}`
            fetch(apiUrl)
                .then(res => res.json())
                .then(data => {
                    if (data.hits.length == 0) {
                        alert('Please search with a valid name!')
                    } else {
                        container.innerHTML = ''
                        slider.classList.replace('d-block', 'd-none')
                        showData(data);
                        selectedImg = []
                        header.classList.replace('d-none', 'd-flex')
                    }

                })
        }

        inputField.value = ''
    }
})


function showData(data) {
    const photos = data.hits;
    photos.forEach(photo => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-5 overflow-hidden" style="width: 250px; height:150px;">
        <img onclick="getImg('${photo.largeImageURL}', event)" src="${photo.largeImageURL}" class="card-img-top" alt="...">
         </div>`
        container.appendChild(div)
    })

}




function getImg(url, event) {
    event.target.parentElement.classList.add('selected')
    if (selectedImg.includes(url)) {
        alert("image has already been selected")
    } else {
        selectedImg.push(url)
    }
}



sliderMaker.addEventListener('click', () => {
    const time = Number(duration.value) || 1000;
    duration.value = ''
    if (selectedImg.length > 2) {
        container.innerHTML = "";
        slider.classList.replace('d-none', 'd-block')
        let lengthValue = 1;
        sliderImg.src = selectedImg[0];
        setInterval(() => {

            if (!(lengthValue == selectedImg.length)) {
                sliderImg.src = selectedImg[lengthValue];
                lengthValue++
            } else {
                lengthValue = 0
            }
        }, time)

    } else {
        alert('Please select some image more than 2!')
    }
})