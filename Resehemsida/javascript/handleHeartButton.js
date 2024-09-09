document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed'); 

    
    const heartButton = document.querySelector('.heart-button');
    let isLiked = localStorage.getItem('isLiked') === 'true';

    if (heartButton) {
        
        heartButton.style.color = isLiked ? 'red' : 'white';

        
        heartButton.addEventListener('click', function () {
            isLiked = !isLiked;
            heartButton.style.color = isLiked ? 'red' : 'white';
            localStorage.setItem('isLiked', isLiked);
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
            .catch(error => {
                console.error('Error loading JSON data:', error);
                
            });
    }

    
    const profileButton = document.querySelector('.profile-button');
const userNameSpan = document.getElementById('user-name');


let userName = localStorage.getItem('userName');
if (userName) {
    userNameSpan.textContent = userName;
}

if (profileButton) {
    profileButton.addEventListener('click', function (event) {
        event.preventDefault();

        let isValid = false;
        let name = '';

        
        while (!isValid) {
            name = prompt('Please enter your name (letters only, max 20 characters):');
            
            if (name) {
                const nameRegex = /^[A-Za-z\s]+$/; 
                if (!nameRegex.test(name)) {
                    alert('Name can only contain letters and spaces.');
                } else if (name.length > 20) {
                    alert('Name must be 20 characters or less.');
                } else {
                    isValid = true; 
                }
            } else {
                
                break;
            }
        }

        
        if (isValid) {
            localStorage.setItem('userName', name);
            userNameSpan.textContent = name;
        }
    });
}
});
