let img1 = document.querySelectorAll('.item > img')[0];
let img2 = document.querySelectorAll('.item > img')[1];
let img3 = document.querySelectorAll('.item > img')[2];
let search = document.getElementById('search');
let btn_search = document.querySelector('div button');
let anime_genres = document.getElementById('animeGenres');
let recentes = document.getElementById('recentes');
let carrinho = document.getElementById('carrinho');
let menu_fav = document.getElementById('menufav');
let menu_fav_mob = document.getElementById('menufavmob');
let fechar_it = document.getElementById('fechar_it');
const menu_symbol = document.querySelector('span');
const menu = document.getElementById('menu');
let favmob = document.querySelector('#menu');
let stu = document.querySelector('#studio > input');
let ano = document.querySelector('#ano > input');
let rate = document.querySelector('#rate > input');
let qtd_rate = document.querySelector('#qtd_rate > input');
let genre = document.querySelector('#genero > input');
let section_detalhes = document.getElementById('detalhes');
let fechar_det = document.getElementById('fechar_det');


function listar_favoritos(){
    carrinho = document.createElement('section');
    carrinho.setAttribute('id', 'carrinho');
    carrinho.innerHTML = '';
    let span = document.createElement('span');
    span.setAttribute('class', 'material-symbols-outlined')
    span.setAttribute('id', 'fechar_it')
    span.innerText = 'close'
    fechar_it = span;
    carrinho.appendChild(span)
    let h1 = document.createElement('h1');
    h1.innerText = 'Seus animes favoritos'
    h1.style.fontSize = '1.7em';
    carrinho.appendChild(h1);
    for (let cont = 0; cont < localStorage.length; cont+=1){
        let div = document.createElement('div');
        div.setAttribute('class', 'item_fav');
        let div2 = document.createElement('div');
        let image = document.createElement('img');
        image.src =  localStorage.getItem(localStorage.key(cont));
        let div_info = document.createElement('div');
        div_info.setAttribute('id', 'info');
        let h1 = document.createElement('h1');
        h1.innerText = localStorage.key(cont);
        

        let desfavorito = document.createElement('button');
        desfavorito.innerText = 'desfavoritar'
        desfavorito.setAttribute('class', 'botao');
        desfavorito.classList.add('desfav');



        div_info.appendChild(h1)
        
        div_info.appendChild(desfavorito)


        desfavorito.addEventListener('click', ()=>{
            let chave = desfavorito.parentElement.children[0].innerText
            localStorage.removeItem(chave)
            carrinho.style.display = 'none';
        })


        div2.appendChild(image);
        div2.appendChild(div_info);
        div.appendChild(div2);

        carrinho.appendChild(div)

        recentes.appendChild(carrinho)

    }

    carrinho.style.display = 'flex';

    carrinho.style.top = window.scrollY + 35 + '%';

    fechar_it.addEventListener('click', ()=>{
        console.log('funcionou')
        carrinho.style.display = 'none'
    })
}

function criar_img(url, titulo, sinopse, studio, genero, score, scored_by, year){
    let div = document.createElement('div');
    div.setAttribute('class', 'item');
    let img = document.createElement('img');
    img.src = url
    div.appendChild(img);
    let h2 = document.createElement('h2');
    h2.innerText = titulo
    div.appendChild(h2);
    let p = document.createElement('p');
    p.innerText = sinopse
    div.appendChild(p);
    let favorito = document.createElement('button');
    favorito.innerText = 'Favoritar'
    favorito.setAttribute('class', 'botao');
    favorito.classList.add('fav');
    div.appendChild(favorito);
    let detalhes = document.createElement('button');
    detalhes.innerText = 'Ver mais detalhes'
    detalhes.setAttribute('class', 'botao');
    detalhes.classList.add('detalhes');
    div.appendChild(detalhes);
    recentes.appendChild(div);


    favorito.addEventListener('click', (evt)=>{
            let url = favorito.parentElement.children[0].src
            let titulo = favorito.parentElement.children[1].innerText
            localStorage.setItem(titulo, url)
    })


    detalhes.addEventListener('click', ()=>{
        stu.value = studio;
        ano.value = year;
        rate.value = score;
        qtd_rate.value = scored_by;
        genre.value = ''
        genero.map((g, i)=>{
            genre.value += g.name + ' '
        })
        section_detalhes.style.display = 'flex';
        
    })
    section_detalhes.style.top =  30 + 'vh';
    
}


fetch('https://api.jikan.moe/v4/anime?genres=4', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
  .then(response => response.json())
  .then((d) => {
    console.log(d)
    d.data.map((el)=>{
        criar_img(el.images.webp.image_url, el.title, el.synopsis, el.studios[0].name, el.genres, el.score, el.scored_by, el.year)
    })
});

btn_search.addEventListener('click', ()=>{
    fetch(`https://api.jikan.moe/v4/anime?q=${search.value}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then((d) => {
        console.log(d)
        recentes.innerHTML = ''
        d.data.map((el)=>{
            criar_img(el.images.webp.image_url, el.title, el.synopsis, el.studios[0].name, el.genres, el.score, el.scored_by, el.year)
        })
    });
})

anime_genres.addEventListener('change', (evt)=>{
    fetch(`https://api.jikan.moe/v4/anime?genres=${evt.target.value}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then((d) => {
        console.log(d)
        recentes.innerHTML = ''
        d.data.map((el)=>{
            criar_img(el.images.webp.image_url, el.title, el.synopsis, el.studios[0].name, el.genres, el.score, el.scored_by, el.year)
        })
    });
})


menu_fav.addEventListener('click', ()=>{
    listar_favoritos()
})

menu_fav_mob.addEventListener('click', ()=>{
    listar_favoritos()
})


fechar_det.addEventListener('click', ()=>{
    section_detalhes.style.display = 'none';
})



menu_symbol.addEventListener('click', ()=>{
    if(menu_symbol.innerText == 'menu'){
        menu_symbol.innerText = 'close';
        menu.style.display = 'flex';
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }else{
        menu_symbol.innerText = 'menu'
        menu.style.display = 'none';
        document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    }
    
})