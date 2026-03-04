  function toggleLike(element) {
            element.classList.toggle('liked');
            if(element.classList.contains('liked')) {
                element.innerText = '❤️';
            } else {
                element.innerText = '🤍';
            }
        }
