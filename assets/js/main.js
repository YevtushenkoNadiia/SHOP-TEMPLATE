const cartCounterLabel = document.querySelector('#cart-counter-label'); //получили кнопку корзины
const buttonsContainer = document.querySelector('#content-container'); //получили кнопку добавить в корзину

let cartCounter = 0;
let priceCounter = 0;

let btnClickHandler = (e) => {
  const target = e.target;
  let restoreHTML;
  
  if (target && target.matches('.item-actions__cart')) {
    cartCounterLabel.innerHTML = `${++cartCounter}`;
    if (cartCounter === 1) cartCounterLabel.style.display = 'block';

    //получили кнопку корзины target = то, на что кликаем
    //parentElement - чтобы выйти на родителя
    //previousElementSibling - подняться на уровень выше

    const mockData = +target
    .parentElement
    .previousElementSibling
    .innerHTML
    .replace(/\$(\d+)\s\D+(\d+).*$/, '$1.$2');

    priceCounter = Math.round((priceCounter + mockData) * 100) / 100;

    restoreHTML = target.innerHTML;
    target.innerHTML =  `Added ${priceCounter.toFixed(2)}`;
    target.disabled = true;
    buttonsContainer.removeEventListener('click', btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML; //вернуть текст
      target.disabled = false;
      buttonsContainer.addEventListener('click', btnClickHandler);
      }, 2000);
    }
  };

buttonsContainer.addEventListener('click', btnClickHandler);

