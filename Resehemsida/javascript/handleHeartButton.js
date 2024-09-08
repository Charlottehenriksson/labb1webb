document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed'); 

    
    const heartButton = document.querySelector('.heart-button');
    let isLiked = false;

    if (heartButton) {
        heartButton.addEventListener('click', function () {
            isLiked = !isLiked;
            heartButton.style.color = isLiked ? 'red' : 'white';
        });
    }



    
    if (window.location.pathname.includes('hemsida.html')) {
        fetch('../data/index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            if (Array.isArray(data.cities)) {
                const navContainer = document.createElement('div');
                navContainer.classList.add('nav-container'); 

                data.cities.forEach(city => {
                    console.log('Adding city:', city);

                    const cityElement = document.createElement('div');
                    cityElement.classList.add('nav');
                    
                    cityElement.innerHTML = `
                        <a href="${city.link}" class="nav-link">
                            <img src="${city.image}" alt="View of ${city.name}" class="nav-image">
                            <div class="nav-text">
                                <div class="city-name">${city.name}</div>
                                <div class="city-description">${city.description}</div>
                            </div>
                        </a>
                    `;

                    navContainer.appendChild(cityElement);
                });

                
                const gridContainer = document.querySelector('.grid-container');
                gridContainer.insertBefore(navContainer, document.querySelector('.footer'));
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
    }
});