const getData = async url => {
  const res = await fetch(url, {
    headers: {
      'x-rapidapi-key': 'd84e6df453msh64eab075e3763f7p1e6ad8jsn59f98e8b489c',
      'x-rapidapi-host': 'basketball-data.p.rapidapi.com'
    }
  });

  const data = await res.json();

  return data;
}

const writeData = data => {
  const list = document.querySelector('.rows');
  const modalWindow = document.querySelector('.modal-window');
  const preloader = document.querySelector('.preloader');

  data
    .then(res => {
      preloader.classList.remove('flex');

      res.map(el => {
        const item = `
        <li class="row">
          <div class="row__item">${el.isNational ? 'Да' : 'Нет'}</div>
          <div class="row__item">${el.country.name ? el.country.name : '-'}</div>
          <div class="row__item">${el.name ? el.name : '-'}</div>
          <div class="row__item">${el.shortName ? el.shortName : '-'}</div>
        </li>`;

        list.innerHTML += item;
      });
    })
    .catch(e => {
      showModalWindow();

      preloader.classList.add('flex');

      throw e;
    });

    modalWindow.addEventListener('click', e => {
      if (['modal-window__btn', 'modal-window'].includes(...e.target.className.split(' '))) {
        hideModalWindow();
      }
    });

    function showModalWindow() {
      modalWindow.classList.add('flex');
    }

    function hideModalWindow() {
      modalWindow.classList.remove('flex');
    }
}

writeData(getData('https://basketball-data.p.rapidapi.com/tournament/teams?tournamentId=89'));