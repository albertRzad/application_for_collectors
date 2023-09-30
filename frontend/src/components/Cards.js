import React from 'react';
import "../css/Cards.css"
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Bron co hitler sie nią zajebal znaleziona zobacz jak'
              label='Bron'
              path='/login'
              
            />
            <CardItem
              src='images/img-2.jpg'
              text='Listy gonciarza do 16 latek. *Kryształ za gałe?!* H I T'
              label='Listy'
              path='/login'
              
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Ksiazki a moze Ksiaze Nieporzadek - Kaz Bałagane o tym jakie ksiazki czyta'
              label='Ksiazki'
              path='/login'
              
            />
            <CardItem
              src='images/img-4.jpg'
              text='ZNACZKI FAGATY BO LIZAL JE KAZDY'
              label='Znaczki'
              path='/login'
              
            />
            <CardItem
              src='images/img-8.jpg'
              text='NIE ZBIERAM KURCZE MONET NA STOLE LEZY SZTO$$$$'
              label='Monety'
              path='/login'
              
            />
          </ul>
        </div>
      </div>
    </div>
    
  );
}

export default Cards;